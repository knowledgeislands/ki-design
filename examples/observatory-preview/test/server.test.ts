import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { type Assets, createHandler, OBSERVATORY_HOST, tokensCss } from '../server.ts'

const assets: Assets = { page: '<!doctype html>', script: '/* app */', styles: '/* styles */', tokens: ':root{}' }

interface Seen {
  method: string
  path: string
  host: string | null
}

let stub: ReturnType<typeof Bun.serve>
const seen: Seen[] = []

beforeAll(() => {
  // A stand-in Observatory that, like the real one, answers only requests addressed to 127.0.0.1:1675.
  stub = Bun.serve({
    hostname: '127.0.0.1',
    port: 0,
    fetch(request) {
      const url = new URL(request.url)
      const host = request.headers.get('host')
      seen.push({ method: request.method, path: `${url.pathname}${url.search}`, host })
      if (host !== OBSERVATORY_HOST) return new Response('wrong host', { status: 421 })
      if (url.pathname === '/api/beacon') {
        return Response.json({ schema: 'observatory/beacon/v1', scope: url.searchParams.get('scope'), signals: [] })
      }
      if (url.pathname === '/api/html') return new Response('<p>hi</p>', { headers: { 'content-type': 'text/html' } })
      return Response.json({ schema: 'observatory/unavailable/v1', reason: 'no such route' }, { status: 404 })
    }
  })
})

afterAll(() => stub.stop(true))

const live = () => createHandler({ mode: 'live', upstream: new URL(`http://127.0.0.1:${stub.port}`), assets })
const get = (path: string, init?: RequestInit) => new Request(`http://127.0.0.1:1676${path}`, init)

describe('proxy rules', () => {
  test.each(['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'])('%s is refused with 405', async (method) => {
    const before = seen.length
    const response = await live()(get('/api/beacon', { method }))
    expect(response.status).toBe(405)
    expect(response.headers.get('allow')).toBe('GET')
    expect(seen.length).toBe(before)
  })

  test.each([
    '/api/repositories/execute',
    '/api/machine/plan',
    '/api/mcp/probe',
    '/api/mcp/servers/x/call',
    '/api/repositories/EXECUTE',
    '/api/repositories%2Fexecute'
  ])('acting path %s is answered 404 without reaching the Observatory', async (path) => {
    const before = seen.length
    const response = await live()(get(path))
    expect(response.status).toBe(404)
    expect(((await response.json()) as { schema: string }).schema).toBe('preview/unavailable/v1')
    expect(seen.length).toBe(before)
  })

  test('paths that only contain an acting word are not refused', async () => {
    const response = await live()(get('/api/planning-notes'))
    expect(response.status).toBe(404)
    expect(seen.at(-1)?.path).toBe('/api/planning-notes')
  })

  test('GET /api/beacon is proxied with the Host the Observatory checks', async () => {
    const response = await live()(get('/api/beacon?scope=estate'))
    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(await response.json()).toEqual({ schema: 'observatory/beacon/v1', scope: 'estate', signals: [] })
    expect(seen.at(-1)).toEqual({ method: 'GET', path: '/api/beacon?scope=estate', host: OBSERVATORY_HOST })
  })

  test('a non-JSON answer becomes an unavailable 502', async () => {
    const response = await live()(get('/api/html'))
    expect(response.status).toBe(502)
    expect(((await response.json()) as { reason: string }).reason).toContain('text/html')
  })

  test('an unreachable Observatory is a 502, not a throw', async () => {
    const handler = createHandler({ mode: 'live', upstream: new URL('http://127.0.0.1:9'), assets })
    const response = await handler(get('/api/beacon'))
    expect(response.status).toBe(502)
  })

  test('only /api/* leaves the process; everything else is local', async () => {
    const before = seen.length
    const handler = live()
    expect(await (await handler(get('/'))).text()).toBe(assets.page)
    expect((await handler(get('/tokens.css'))).headers.get('content-type')).toContain('text/css')
    expect((await handler(get('/elsewhere'))).status).toBe(404)
    expect(seen.length).toBe(before)
  })
})

describe('fixture mode', () => {
  let dir: string
  beforeAll(async () => {
    dir = await mkdtemp(join(tmpdir(), 'obs-fixtures-'))
    await writeFile(
      join(dir, 'lands.json'),
      JSON.stringify({
        schema: 'preview/lands/v1',
        observedAt: '2026-10-18T03:00:00.000Z',
        territories: [{ id: 'territory:one', label: 'One', repositories: ['a/one'], reason: null }]
      })
    )
    await writeFile(
      join(dir, 'repositories.json'),
      JSON.stringify({
        schema: 'observatory/repositories/v1',
        repositories: [{ identity: 'a/one' }, { identity: 'b/two' }],
        operations: [{ id: 'fetch' }]
      })
    )
  })

  const fixtures = () =>
    createHandler({ mode: 'fixtures', upstream: new URL(`http://127.0.0.1:${stub.port}`), fixtures: dir, assets })

  test('serves a route from its fixture without touching the Observatory', async () => {
    const before = seen.length
    const response = await fixtures()(get('/api/repositories?scope=estate'))
    expect(response.status).toBe(200)
    expect(((await response.json()) as { repositories: unknown[] }).repositories).toHaveLength(2)
    expect(seen.length).toBe(before)
  })

  test('a territory scope narrows lists by membership and keeps operations', async () => {
    const body = (await (await fixtures()(get('/api/repositories?scope=territory:one'))).json()) as {
      repositories: { identity: string }[]
      operations: unknown[]
    }
    expect(body.repositories.map((r) => r.identity)).toEqual(['a/one'])
    expect(body.operations).toHaveLength(1)
  })

  test('a missing fixture is an unavailable 404', async () => {
    const response = await fixtures()(get('/api/nothing-here'))
    expect(response.status).toBe(404)
    expect(((await response.json()) as { schema: string }).schema).toBe('preview/unavailable/v1')
  })

  test('fixture names cannot climb out of the folder', async () => {
    expect((await fixtures()(get('/api/..%2Flands'))).status).toBe(404)
  })

  test('/preview/lands and /preview/meta report fixtures', async () => {
    const handler = fixtures()
    expect(((await (await handler(get('/preview/lands'))).json()) as { territories: unknown[] }).territories).toHaveLength(1)
    expect(await (await handler(get('/preview/meta'))).json()).toMatchObject({ mode: 'fixtures' })
  })

  test('the safety rules hold in fixture mode too', async () => {
    const handler = fixtures()
    expect((await handler(get('/api/repositories', { method: 'POST' }))).status).toBe(405)
    expect((await handler(get('/api/repositories/execute'))).status).toBe(404)
  })
})

describe('tokens', () => {
  test('falls back to CSS rendered from tokens.json when dist is not built', async () => {
    const { css, source } = await tokensCss('/nowhere/tokens.css')
    expect(source).toBe('source')
    expect(css).toContain('--paper:')
    expect(css).toContain('[data-theme="night"]')
  })
})
