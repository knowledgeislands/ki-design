/** Renders every `examples/*.islandmap.json` to sibling day and night SVGs. Run with `bun run build`. */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { exampleOptions } from './example-options.ts'
import { assertIslandMap } from './model.ts'
import { flatThemes, renderFlatSvg } from './render.ts'

const dir = new URL('../examples/', import.meta.url)
for (const file of (await readdir(dir)).filter((f) => f.endsWith('.islandmap.json')).sort()) {
  const map = assertIslandMap(JSON.parse(await readFile(new URL(file, dir), 'utf8')))
  const base = file.replace(/\.islandmap\.json$/, '')
  for (const theme of flatThemes) {
    const out = `${base}${theme === 'day' ? '' : `-${theme}`}.svg`
    await writeFile(new URL(out, dir), renderFlatSvg(map, exampleOptions(theme)))
    console.log(`hexmap: wrote examples/${out}`)
  }
}
