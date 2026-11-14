/**
 * Renders every `examples/*.islandmap.json` and `examples/*.archipelago.json` to sibling day and night SVGs. Run with
 * `bun run build`.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { renderArchipelagoSvg } from './archipelago.ts'
import { archipelagoExampleOptions, exampleOptions } from './example-options.ts'
import { assertIslandMap } from './model.ts'
import { flatThemes, renderFlatSvg } from './render.ts'

const dir = new URL('../examples/', import.meta.url)
const files = (await readdir(dir)).sort()
const out = (base: string, theme: string): string => `${base}${theme === 'day' ? '' : `-${theme}`}.svg`

for (const file of files.filter((f) => f.endsWith('.islandmap.json'))) {
  const map = assertIslandMap(JSON.parse(await readFile(new URL(file, dir), 'utf8')))
  const base = file.replace(/\.islandmap\.json$/, '')
  for (const theme of flatThemes) {
    await writeFile(new URL(out(base, theme), dir), renderFlatSvg(map, exampleOptions(theme)))
    console.log(`hexmap: wrote examples/${out(base, theme)}`)
  }
}

for (const file of files.filter((f) => f.endsWith('.archipelago.json'))) {
  const archipelago = JSON.parse(await readFile(new URL(file, dir), 'utf8'))
  const base = file.replace(/\.archipelago\.json$/, '')
  for (const theme of flatThemes) {
    await writeFile(new URL(out(base, theme), dir), renderArchipelagoSvg(archipelago, archipelagoExampleOptions(theme)))
    console.log(`hexmap: wrote examples/${out(base, theme)}`)
  }
}
