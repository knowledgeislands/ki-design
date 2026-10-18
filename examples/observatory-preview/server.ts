/**
 * Observatory preview server.
 *
 * Serves a reskinned, read-only front end for the local Observatory and proxies only `GET /api/*`
 * to it. Nothing here can act: every other method is refused with 405, and the Observatory's
 * acting routes are answered with 404 before any request leaves this process.
 *
 *   bun examples/observatory-preview/server.ts [--fixtures] [--port 1676]
 *
 * OBSERVATORY_URL (default http://127.0.0.1:1675) names the Observatory to read.
 */
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import { cssBlocks, renderCss } from '../../packages/tokens/src/index.ts'

export type Mode = 'live' | 'fixtures'

export interface Assets {
  readonly page: string
  readonly script: string
  readonly styles: string
  readonly tokens: string
}

export interface PreviewOptions {
  readonly mode: Mode
  /** The Observatory to read. */
  readonly upstream: URL
  /** The `Host` the Observatory checks; it answers only requests addressed to its own authority. */
  readonly upstreamHost?: string
  /** Folder of `<route>.json` samples for fixture mode. */
  readonly fixtures?: string
  readonly assets: Assets
}

const ROOT = import.meta.dir
const DEFAULT_FIXTURES = join(ROOT, 'fixtures')
export const OBSERVATORY_HOST = '127.0.0.1:1675'
const LANDS_TTL_MS = 30_000
const UPSTREAM_TIMEOUT_MS = 20_000
const TOKENS_CSS = join(ROOT, '..', '..', 'packages', 'tokens', 'dist', 'tokens.css')

/** Path segments the Observatory uses for routes that act. The preview never forwards them. */
export const ACTING = /(^|\/)(execute|plan|probe|call)(\/|$)/i

type Json = Record<string, unknown>

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  })

const unavailable = (reason: string, status: number): Response =>
  json({ schema: 'preview/unavailable/v1', reason, observedAt: new Date().toISOString() }, status)

// ---------------------------------------------------------------------------------------------
// Assets: the client bundle, page, styles and the design tokens, built once at start-up.

async function bundle(): Promise<string> {
  const result = await Bun.build({
    entrypoints: [join(ROOT, 'client', 'main.ts')],
    target: 'browser',
    format: 'esm',
    minify: false,
    sourcemap: 'inline'
  })
  if (!result.success) {
    for (const log of result.logs) console.error(log)
    throw new Error('the client bundle did not build')
  }
  const [output] = result.outputs
  if (!output) throw new Error('the client bundle produced no output')
  return output.text()
}

/** `packages/tokens/dist/tokens.css` when it has been built, otherwise the same CSS rendered in memory. */
export async function tokensCss(file = TOKENS_CSS): Promise<{ css: string; source: 'dist' | 'source' }> {
  if (existsSync(file)) return { css: await Bun.file(file).text(), source: 'dist' }
  return { css: renderCss(cssBlocks()), source: 'source' }
}

export async function buildAssets(): Promise<Assets & { tokensSource: 'dist' | 'source' }> {
  const [script, page, styles, tokens] = await Promise.all([
    bundle(),
    Bun.file(join(ROOT, 'client', 'index.html')).text(),
    Bun.file(join(ROOT, 'client', 'styles.css')).text(),
    tokensCss()
  ])
  return { script, page, styles, tokens: tokens.css, tokensSource: tokens.source }
}

interface Territory {
  id: string
  label: string
  repositories: string[]
  reason: string | null
}
interface Lands {
  schema: 'preview/lands/v1'
  observedAt: string
  territories: Territory[]
}

interface ScopeOption {
  id: string
  kind: string
  label: string
}

function within(value: unknown, members: Set<string>): unknown {
  if (!Array.isArray(value)) return value
  return value.filter((item) => {
    if (!item || typeof item !== 'object') return true
    const record = item as Json
    const owner = typeof record['identity'] === 'string' ? record['identity'] : record['repository']
    return typeof owner !== 'string' || members.has(owner)
  })
}

/** The preview's request handler: read-only, `GET` only, `/api/*` proxied or answered from fixtures. */
export function createHandler(options: PreviewOptions): (request: Request) => Promise<Response> {
  const { mode, upstream: UPSTREAM, assets } = options
  const HOST = options.upstreamHost ?? OBSERVATORY_HOST
  const FIXTURES = options.fixtures ?? DEFAULT_FIXTURES
  let fixtureNames: Promise<Set<string>> | null = null
  let landsCache: { at: number; value: Promise<Lands> } | null = null

  // -------------------------------------------------------------------------------------------
  // Upstream reads.

  async function upstream(pathAndQuery: string): Promise<Response> {
    const target = new URL(pathAndQuery, UPSTREAM)
    const response = await fetch(target, {
      method: 'GET',
      headers: { host: HOST, accept: 'application/json' },
      redirect: 'manual',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
    })
    const type = response.headers.get('content-type') ?? ''
    if (!type.includes('application/json')) {
      await response.body?.cancel()
      return unavailable(
        `the Observatory answered ${target.pathname} with ${response.status} ${type || 'no body type'}`,
        502
      )
    }
    return new Response(response.body, {
      status: response.status,
      headers: { 'content-type': type, 'cache-control': 'no-store' }
    })
  }

  async function upstreamJson<T>(pathAndQuery: string): Promise<T> {
    const response = await upstream(pathAndQuery)
    return (await response.json()) as T
  }

  // -------------------------------------------------------------------------------------------
  // Fixtures: one JSON file per route, filtered to the requested scope where the fixture can tell.

  async function fixture<T = Json>(name: string): Promise<T | null> {
    fixtureNames ??= readdir(FIXTURES).then((files) => new Set(files.filter((f) => f.endsWith('.json'))))
    const file = `${name}.json`
    if (!(await fixtureNames).has(file)) return null
    return (await Bun.file(join(FIXTURES, file)).json()) as T
  }

  async function membersOf(scope: string | null): Promise<Set<string> | null> {
    if (!scope || scope === 'estate') return null
    if (scope === 'repo') return new Set(['knowledgeislands/apps-observatory.local'])
    const lands = await fixture<Lands>('lands')
    const territory = lands?.territories.find((t) => t.id === scope)
    return new Set(territory?.repositories ?? [])
  }

  async function fromFixtures(url: URL): Promise<Response> {
    const name = url.pathname.slice('/api/'.length).replaceAll('/', '__')
    // Fixture names are plain route names; anything else (dots, encoded separators) is simply absent.
    const body = /^[a-z0-9_-]+$/i.test(name) ? await fixture<Json>(name) : null
    if (!body) return unavailable(`no fixture for ${url.pathname}`, 404)
    const members = await membersOf(url.searchParams.get('scope'))
    if (!members) return json(body)
    const scoped: Json = {}
    for (const [key, value] of Object.entries(body)) scoped[key] = key === 'operations' ? value : within(value, members)
    return json(scoped)
  }

  // -------------------------------------------------------------------------------------------
  // Known Lands: territory membership, composed server-side and cached briefly.

  async function composeLands(): Promise<Lands> {
    const scopes = await upstreamJson<{ options?: ScopeOption[] }>('/api/scopes')
    const territories = (scopes.options ?? []).filter((o) => o.kind === 'territory')
    const read = territories.map(async (t): Promise<Territory> => {
      try {
        const query = new URLSearchParams({ scope: t.id, source: 'git' })
        const body = await upstreamJson<{ repositories?: { identity: string }[]; reason?: string }>(
          `/api/repositories?${query}`
        )
        return {
          id: t.id,
          label: t.label,
          repositories: (body.repositories ?? []).map((r) => r.identity),
          reason: body.repositories ? null : (body.reason ?? 'the Observatory did not list this territory')
        }
      } catch (error) {
        return { id: t.id, label: t.label, repositories: [], reason: String(error) }
      }
    })
    return { schema: 'preview/lands/v1', observedAt: new Date().toISOString(), territories: await Promise.all(read) }
  }

  async function lands(): Promise<Response> {
    if (mode === 'fixtures') {
      const body = await fixture<Lands>('lands')
      return body ? json(body) : unavailable('no fixture for /preview/lands', 404)
    }
    const now = Date.now()
    if (!landsCache || now - landsCache.at > LANDS_TTL_MS) {
      const entry = { at: now, value: composeLands() }
      landsCache = entry
      entry.value.catch(() => {
        if (landsCache === entry) landsCache = null
      })
    }
    return json(await landsCache.value)
  }

  // -------------------------------------------------------------------------------------------

  const text = (body: string, type: string): Response =>
    new Response(body, { headers: { 'content-type': `${type}; charset=utf-8`, 'cache-control': 'no-store' } })

  return async function handle(request: Request): Promise<Response> {
    if (request.method !== 'GET') {
      return new Response('This preview is read-only.\n', { status: 405, headers: { allow: 'GET' } })
    }
    const url = new URL(request.url)
    const path = url.pathname

    if (path === '/' || path === '/index.html') return text(assets.page, 'text/html')
    if (path === '/app.js') return text(assets.script, 'text/javascript')
    if (path === '/styles.css') return text(assets.styles, 'text/css')
    if (path === '/tokens.css') return text(assets.tokens, 'text/css')
    if (path === '/preview/meta') return json({ schema: 'preview/meta/v1', mode, upstream: UPSTREAM.origin })
    if (path === '/preview/lands') {
      try {
        return await lands()
      } catch (error) {
        return unavailable(`the territories could not be read: ${String(error)}`, 502)
      }
    }
    if (path.startsWith('/api/')) {
      // Test the decoded path too, so `%2F`-style spellings cannot slip an acting route past the rule.
      let decoded = path
      try {
        decoded = decodeURIComponent(path)
      } catch {
        return unavailable('the path could not be decoded', 400)
      }
      if (ACTING.test(path) || ACTING.test(decoded)) return unavailable('the preview never forwards routes that act', 404)
      if (mode === 'fixtures') return fromFixtures(url)
      try {
        return await upstream(`${path}${url.search}`)
      } catch (error) {
        return unavailable(`the Observatory at ${UPSTREAM.origin} did not answer: ${String(error)}`, 502)
      }
    }
    return new Response('Not found\n', { status: 404 })
  }
}

// ---------------------------------------------------------------------------------------------

if (import.meta.main) {
  const { values: flags } = parseArgs({
    args: Bun.argv.slice(2),
    options: {
      fixtures: { type: 'boolean', default: false },
      port: { type: 'string' }
    },
    strict: true
  })
  const mode: Mode = flags.fixtures ? 'fixtures' : 'live'
  const upstream = new URL(process.env['OBSERVATORY_URL'] ?? `http://${OBSERVATORY_HOST}`)
  const assets = await buildAssets()
  const server = Bun.serve({
    hostname: '127.0.0.1',
    port: Number(flags.port ?? process.env['PORT'] ?? 1676),
    fetch: createHandler({ mode, upstream, assets })
  })
  if (assets.tokensSource === 'source') {
    console.log('tokens: packages/tokens/dist/tokens.css is not built; serving the same CSS rendered from tokens.json')
  }
  console.log(
    `Observatory preview (${mode}) at http://${server.hostname}:${server.port}/ reading ${mode === 'live' ? upstream.origin : DEFAULT_FIXTURES}`
  )
}
