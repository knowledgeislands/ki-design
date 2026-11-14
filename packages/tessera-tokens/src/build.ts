/** Writes `dist/tokens.css`, `dist/theme.css`, `dist/tokens.ts` and `dist/digest.txt`. Run with `bun run build`. */
import { mkdir, writeFile } from 'node:fs/promises'
import { cssBlocks, cssDigest, renderCss, renderTailwindTheme, renderTokensModule } from './css.ts'

const dist = new URL('../dist/', import.meta.url)
await mkdir(dist, { recursive: true })

const blocks = cssBlocks()
const digest = cssDigest(blocks)
await Promise.all([
  writeFile(new URL('tokens.css', dist), renderCss(blocks)),
  writeFile(new URL('theme.css', dist), renderTailwindTheme()),
  writeFile(new URL('tokens.ts', dist), renderTokensModule()),
  writeFile(new URL('digest.txt', dist), `${digest}\n`)
])
console.log(`tokens: wrote dist/ (sha256 ${digest})`)
