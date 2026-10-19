/**
 * Draws a labelled contact sheet of a tile set: terrain, structures on a typical terrain, the four condition states,
 * decals and connectors.
 *
 *   bun scripts/contact-sheet.ts [--set sets/modern] [--png]
 *
 * Writes `contact-sheet.svg` (and `contact-sheet.png` with `--png`) in the set's folder.
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { terrainNames } from '@knowledgeislands/tokens'
import { type Condition, isoAnchor, TileSet } from './compose.ts'

const args = process.argv.slice(2)
const setIndex = args.indexOf('--set')
const setDir = setIndex >= 0 ? (args[setIndex + 1] as string) : join(import.meta.dir, '..', 'sets', 'modern')
const wantPng = args.includes('--png')

const set = new TileSet(setDir)
const ink = '#1a2030'
const font = "'Cormorant SC', 'Cormorant Garamond', Georgia, serif"
const W = 1880
const COL = 300
const COLS = 6
const parts: string[] = []
let y = 40

const heading = (text: string) => {
  y += 30
  parts.push(
    `<text x="40" y="${y}" font-family="${font}" font-size="26" letter-spacing="2" fill="${ink}" font-variant="small-caps">${text}</text>`
  )
  parts.push(`<line x1="40" y1="${y + 10}" x2="${W - 40}" y2="${y + 10}" stroke="#9a8358" stroke-width="0.75"/>`)
  y += 24
}
const label = (x: number, ly: number, text: string, sub = '') => {
  parts.push(
    `<text x="${x}" y="${ly}" text-anchor="middle" font-family="${font}" font-size="17" letter-spacing="1" fill="${ink}" font-variant="small-caps">${text}</text>`
  )
  if (sub)
    parts.push(
      `<text x="${x}" y="${ly + 17}" text-anchor="middle" font-family="${font}" font-size="13" fill="#4a5568" font-style="italic">${sub}</text>`
    )
}

/** A row of cells; each cell draws itself with its anchor at (cx, anchorY). */
const row = (cells: { draw: (cx: number, ay: number) => void; name: string; sub?: string }[], headroom: number) => {
  for (let start = 0; start < cells.length; start += COLS) {
    const chunk = cells.slice(start, start + COLS)
    const anchorY = y + headroom + 74
    chunk.forEach((c, i) => {
      const cx = 40 + COL / 2 + i * COL
      c.draw(cx, anchorY)
      label(cx, anchorY + 122 + 26, c.name, c.sub)
    })
    y = anchorY + 122 + 56
  }
}

heading('Terrain')
row(
  terrainNames.map((name) => ({ name, draw: (cx, ay) => parts.push(set.place('terrain', name, cx, ay)) })),
  92
)

const homes: Record<string, string> = {
  library: 'grassland',
  'council-hall': 'grassland',
  tower: 'hills',
  observatory: 'hills',
  lighthouse: 'cliffs',
  dock: 'coastal',
  'rail-depot': 'grassland',
  airport: 'grassland',
  'customs-house': 'grassland',
  causeway: 'river',
  workshop: 'grassland',
  mill: 'river',
  ruins: 'hills',
  'ancient-forest': 'forest',
  cottage: 'grassland'
}
heading('Structures (thriving), each on a typical terrain')
row(
  Object.entries(homes).map(([id, terrain]) => ({
    name: id.replace('-', ' '),
    sub: `on ${terrain}`,
    draw: (cx, ay) => {
      parts.push(set.place('terrain', terrain, cx, ay))
      parts.push(set.place('structure', id, cx, ay))
    }
  })),
  150
)

// The two multi-hex structures, laid out on their footprints.
heading('Port (pair) and Capital (flower)')
{
  const ay = y + 230
  const portX = 40 + 150
  parts.push(set.place('terrain', 'coastal', portX, ay))
  parts.push(set.place('terrain', 'sand', portX + 256, ay))
  parts.push(set.place('structure', 'port', portX, ay))
  label(portX + 128, ay + 122 + 26, 'port', 'pair, on coastal and sand')
  const cx = 1180
  const ring: [number, number, string][] = [
    [0, -1, 'mountain'],
    [1, -1, 'snow'],
    [-1, 0, 'forest'],
    [0, 0, 'hills'],
    [1, 0, 'grassland'],
    [-1, 1, 'grassland'],
    [0, 1, 'river']
  ]
  const origin = isoAnchor(0, 0)
  for (const [q, r, t] of ring) {
    const a = isoAnchor(q, r)
    parts.push(set.place('terrain', t, cx + a.x - origin.x, ay + a.y - origin.y))
  }
  parts.push(set.place('structure', 'capital', cx, ay))
  label(cx, ay + 111 + 122 + 26, 'capital', 'flower: library and council hall around an open square')
  y = ay + 111 + 122 + 60
}

heading('Condition states: the thriving drawing with decals')
const states: Condition[] = ['thriving', 'quiet', 'weathered', 'ruined']
row(
  [
    ...states.map((s) => ['cottage', s] as const),
    ...(['thriving', 'ruined'] as const).map((s) => ['library', s] as const)
  ].map(([id, s]) => ({
    name: s,
    sub: id,
    draw: (cx, ay) => {
      parts.push(set.place('terrain', 'grassland', cx, ay))
      parts.push(set.place('structure', id, cx, ay, s))
    }
  })),
  90
)

heading('Decals and connectors')
const ghost = (cx: number, ay: number) =>
  `<polygon points="${[
    [0, -74],
    [128, -37],
    [128, 37],
    [0, 74],
    [-128, 37],
    [-128, -37]
  ]
    .map(([dx, dy]) => `${cx + (dx as number)},${ay + (dy as number)}`)
    .join(' ')}" fill="#e8e0d0" stroke="#9a8358" stroke-width="0.75" stroke-dasharray="4 4"/>`
row(
  [
    ...['ivy', 'cracks', 'moss', 'fallen-roof'].map((id) => ({
      name: id.replace('-', ' '),
      sub: 'decal',
      draw: (cx: number, ay: number) => {
        parts.push(ghost(cx, ay))
        parts.push(set.place('decal', id, cx, ay))
      }
    })),
    ...['road', 'river', 'bridge-span', 'quay'].map((id) => ({
      name: id.replace('-', ' '),
      sub: 'connector',
      draw: (cx: number, ay: number) => {
        parts.push(set.place('terrain', id === 'bridge-span' ? 'river' : 'grassland', cx, ay))
        parts.push(set.place('connector', id, cx, ay))
      }
    }))
  ],
  60
)

const H = y + 20
const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
  `<defs>${set.allDefs()}</defs><rect width="${W}" height="${H}" fill="#f5efe0"/>` +
  `<text x="40" y="44" font-family="${font}" font-size="34" letter-spacing="3" fill="${ink}" font-variant="small-caps">Knowledge Islands · Modern tile set · v0</text>` +
  parts.join('') +
  '</svg>\n'
writeFileSync(join(setDir, 'contact-sheet.svg'), svg)
console.log(`wrote ${join(setDir, 'contact-sheet.svg')}`)
if (wantPng) {
  const { rasterise } = await import('./rasterise.ts')
  await rasterise(svg, join(setDir, 'contact-sheet.png'), 1, '#f5efe0')
  console.log(`wrote ${join(setDir, 'contact-sheet.png')}`)
}
