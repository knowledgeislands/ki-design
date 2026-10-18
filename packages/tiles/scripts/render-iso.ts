/**
 * Renders an island map isometrically with a tile set, in painter's order (back row to front, west to east):
 * per cell its terrain, then its structure in the hex's condition. A structure with a pair or flower footprint is
 * drawn after the last of its hexes' terrain, and structures on the other hexes of its footprint are left out.
 *
 *   bun scripts/render-iso.ts [map.json] [out.svg] [--png out.png] [--set sets/modern]
 *
 * Defaults to Arcadia (`packages/hexmap/examples/arcadia.islandmap.json`) and writes
 * `sets/modern/arcadia-iso.svg`. `--png` rasterises with Playwright's Chromium (see `rasterise.ts`).
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { type Condition, directions, isoAnchor, offset, TileSet } from './compose.ts'

interface MapHex {
  readonly q: number
  readonly r: number
  readonly terrain: string
  readonly structure?: string
  readonly condition?: Condition
}
interface IslandMap {
  readonly name: string
  readonly hexes: readonly MapHex[]
  readonly labels?: readonly { readonly q: number; readonly r: number; readonly text: string }[]
}

const here = import.meta.dir
const args = process.argv.slice(2)
const flag = (name: string): string | undefined => {
  const i = args.indexOf(name)
  if (i < 0) return undefined
  const value = args[i + 1]
  args.splice(i, 2)
  return value
}
const png = flag('--png')
const setDir = flag('--set') ?? join(here, '..', 'sets', 'modern')
const mapPath = args[0] ?? join(here, '..', '..', 'hexmap', 'examples', 'arcadia.islandmap.json')
const out = args[1] ?? join(setDir, 'arcadia-iso.svg')

export function renderIso(
  map: IslandMap,
  set: TileSet,
  opts: { margin?: number; labels?: boolean } = {}
): { svg: string; hidden: MapHex[] } {
  const margin = opts.margin ?? 40
  const key = (q: number, r: number) => `${q},${r}`
  const order = [...map.hexes].sort((a, b) => a.r - b.r || offset(a.q, a.r).col - offset(b.q, b.r).col)
  const index = new Map(order.map((h, i) => [key(h.q, h.r), i]))

  // Footprints: which hexes each structure covers, and where it is drawn.
  const covered = new Set<string>()
  const drawAfter = new Map<number, MapHex[]>()
  for (const h of order) {
    if (!h.structure || covered.has(key(h.q, h.r))) continue
    const tile = set.tile('structure', h.structure)
    if (!tile) continue
    const cells: [number, number][] = [[h.q, h.r]]
    if (tile.footprint === 'pair') {
      const [dq, dr] = directions[tile.orientation % 6] as [number, number]
      cells.push([h.q + dq, h.r + dr])
    } else if (tile.footprint === 'flower') {
      for (const [dq, dr] of directions) cells.push([h.q + dq, h.r + dr])
    }
    for (const [q, r] of cells.slice(1)) covered.add(key(q, r))
    const last = Math.max(...cells.map(([q, r]) => index.get(key(q, r)) ?? -1))
    drawAfter.set(last, [...(drawAfter.get(last) ?? []), h])
  }

  const layers: string[] = []
  order.forEach((h, i) => {
    const a = isoAnchor(h.q, h.r)
    layers.push(set.place('terrain', h.terrain, a.x, a.y))
    for (const s of drawAfter.get(i) ?? []) {
      const sa = isoAnchor(s.q, s.r)
      layers.push(set.place('structure', s.structure as string, sa.x, sa.y, s.condition ?? 'thriving'))
    }
  })
  const hidden = order.filter((h) => h.structure && covered.has(key(h.q, h.r)))

  // Bounds: every hex's cell plus headroom for tall art.
  const anchors = map.hexes.map((h) => isoAnchor(h.q, h.r))
  const minX = Math.min(...anchors.map((a) => a.x)) - 128 - margin
  const maxX = Math.max(...anchors.map((a) => a.x)) + 128 + margin
  const minY = Math.min(...anchors.map((a) => a.y)) - 74 - 120 - margin
  const maxY = Math.max(...anchors.map((a) => a.y)) + 122 + margin
  const w = Math.ceil(maxX - minX)
  const hgt = Math.ceil(maxY - minY)

  const labels =
    opts.labels === false
      ? ''
      : (map.labels ?? [])
          .map((l) => {
            const a = isoAnchor(l.q, l.r)
            return `<text x="${a.x}" y="${a.y + 52}" text-anchor="middle" font-family="'Cormorant SC', 'Cormorant Garamond', Georgia, serif" font-variant="small-caps" font-size="22" letter-spacing="1.5" fill="#1a2030" stroke="#f5efe0" stroke-width="5" stroke-opacity="0.85" paint-order="stroke" stroke-linejoin="round">${escapeXml(l.text)}</text>`
          })
          .join('')

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${hgt}" viewBox="${Math.floor(minX)} ${Math.floor(minY)} ${w} ${hgt}">` +
    `<defs>${set.allDefs()}</defs>` +
    `<rect x="${Math.floor(minX)}" y="${Math.floor(minY)}" width="${w}" height="${hgt}" fill="#f5efe0"/>` +
    layers.join('') +
    labels +
    '</svg>\n'
  return { svg, hidden }
}

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

if (import.meta.main) {
  const map = JSON.parse(readFileSync(mapPath, 'utf8')) as IslandMap
  const set = new TileSet(setDir)
  const { svg: final, hidden } = renderIso(map, set)
  writeFileSync(out, final)
  for (const h of hidden) console.log(`${h.structure} at ${h.q},${h.r} lies inside a larger footprint and is not drawn`)
  const skipped = map.hexes.filter((h) => h.structure && !set.tile('structure', h.structure))
  if (skipped.length) console.warn(`no art for: ${skipped.map((h) => h.structure).join(', ')}`)
  console.log(`wrote ${out}`)
  if (png) {
    const { rasterise } = await import('./rasterise.ts')
    await rasterise(final, png, 1, '#f5efe0')
    console.log(`wrote ${png}`)
  }
}
