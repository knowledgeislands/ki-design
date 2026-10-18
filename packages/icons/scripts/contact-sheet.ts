/**
 * Draws every glyph at 64, 24, 20 and 16 px on parchment, then the whole set at 24 px on navy, and writes
 * `contact-sheet.png` beside the package README. Glyphs named with `--new a,b` get a brass border.
 *
 *   bun scripts/contact-sheet.ts [--new capital]
 *
 * Rasterising uses the tiles package's Playwright helper, which imports Chromium on demand.
 */
import { rasterise } from '../../tiles/scripts/rasterise.ts'
import { iconBodies, iconNames } from '../src/index.ts'

const flag = process.argv.indexOf('--new')
const fresh = new Set(flag > 0 ? (process.argv[flag + 1] ?? '').split(',').filter(Boolean) : [])

const ink = '#1a2030'
const paper = '#f5efe0'
const card = '#fbf6ea'
const rule = '#e4dccb'
const brass = '#c8963c'
const navy = '#13213a'

const columns = 9
const margin = 25
const cell = { width: 124, height: 130, gap: 10 }
const rows = Math.ceil(iconNames.length / columns)
const width = margin * 2 + columns * cell.width + (columns - 1) * cell.gap
const strip = { perRow: 32, size: 24, step: 35.5 }
const stripRows = Math.ceil(iconNames.length / strip.perRow)
const gridTop = 85
const gridBottom = gridTop + rows * (cell.height + cell.gap)
const stripHeight = 30 + stripRows * strip.step
const height = gridBottom + stripHeight + margin

const glyph = (name: (typeof iconNames)[number], x: number, y: number, size: number, colour: string): string =>
  `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${colour}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${iconBodies[name]}</svg>`

const parts: string[] = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
  `<rect width="${width}" height="${height}" fill="${paper}"/>`,
  `<text x="${margin}" y="44" font-family="Georgia, serif" font-weight="700" font-size="19" fill="${ink}">@knowledgeislands/icons — ${iconNames.length} glyphs</text>`,
  `<text x="${margin}" y="66" font-family="Georgia, serif" font-size="11.5" fill="#5a4a2a">64 / 24 / 20 / 16 px${fresh.size > 0 ? `. Brass border: new in this revision (${[...fresh].join(', ')})` : ''}.</text>`
]

iconNames.forEach((name, i) => {
  const x = margin + (i % columns) * (cell.width + cell.gap)
  const y = gridTop + Math.floor(i / columns) * (cell.height + cell.gap)
  const isNew = fresh.has(name)
  parts.push(
    `<rect x="${x + 0.5}" y="${y + 0.5}" width="${cell.width - 1}" height="${cell.height - 1}" rx="4" fill="${card}" stroke="${isNew ? brass : rule}" stroke-width="${isNew ? 2 : 1}"/>`
  )
  // A faint 24-unit grid behind the 64 px drawing.
  const gx = x + (cell.width - 64) / 2
  const gy = y + 10
  for (let k = 0; k <= 8; k++) {
    const d = (k * 64) / 8
    parts.push(
      `<path d="M${gx + d} ${gy} V${gy + 64} M${gx} ${gy + d} H${gx + 64}" stroke="${rule}" stroke-width="0.5"/>`
    )
  }
  parts.push(glyph(name, gx, gy, 64, ink))
  const small = [24, 20, 16]
  const total = small.reduce((n, s) => n + s, 0) + 2 * 6
  let sx = x + (cell.width - total) / 2
  for (const s of small) {
    parts.push(glyph(name, sx, y + 86 + (24 - s) / 2, s, ink))
    sx += s + 6
  }
  parts.push(
    `<text x="${x + cell.width / 2}" y="${y + cell.height - 8}" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="10.5" fill="${ink}">${name}</text>`
  )
})

parts.push(
  `<rect x="${margin}" y="${gridBottom}" width="${width - 2 * margin}" height="${stripHeight}" rx="5" fill="${navy}"/>`
)
iconNames.forEach((name, i) => {
  const x = margin + 15 + (i % strip.perRow) * strip.step
  const y = gridBottom + 15 + Math.floor(i / strip.perRow) * strip.step
  parts.push(glyph(name, x, y, strip.size, paper))
})
parts.push('</svg>')

const out = new URL('../contact-sheet.png', import.meta.url).pathname
await rasterise(parts.join(''), out, 2, paper)
console.log(`icons: wrote ${out}`)
