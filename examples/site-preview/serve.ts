/**
 * A tiny static server for the site preview.
 *
 *   bun examples/site-preview/serve.ts      → http://127.0.0.1:1677
 */
import { dirname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const port = Number(process.env.PORT ?? 1677)

Bun.serve({
  hostname: '127.0.0.1',
  port,
  async fetch(req) {
    const url = new URL(req.url)
    let path = decodeURIComponent(url.pathname)
    if (path.endsWith('/')) path += 'index.html'
    const file = normalize(join(here, path))
    if (!file.startsWith(here)) return new Response('Not found', { status: 404 })
    const body = Bun.file(file)
    if (!(await body.exists())) return new Response('Not found', { status: 404 })
    return new Response(body)
  }
})

console.log(`Site preview: http://127.0.0.1:${port}`)
