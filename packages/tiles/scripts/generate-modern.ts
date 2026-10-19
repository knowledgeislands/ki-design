/**
 * Writes the Modern tile set's SVGs and updates its manifest from parametric shapes.
 *
 *   bun scripts/generate-modern.ts
 *
 * Every tile is drawn in cell coordinates: the anchor hex's cell is `0 0 256 196` and its anchor, the centre of the
 * top face at ground level, is (128, 74). Taller or wider art widens the view box, so the anchor in canvas pixels is
 * recorded per tile as `art.anchor`. Structures carry their thriving-only marks (lit windows, smoke, lamps,
 * pennants) in a `<g data-state="thriving">` group, so the quiet state is the same file with that group hidden.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { terrainNames } from '@knowledgeislands/tokens'
import { type TileEntry, type TileManifest, tileAliases, validateTileSet } from '../src/index.ts'
import { highlightDef, Iso, svgDoc } from './modern/iso.ts'
import { connectorDrawers, decalDrawers } from './modern/overlays.ts'
import { structureDrawers } from './modern/structures.ts'
import { terrainDrawers } from './modern/terrain.ts'

const root = join(import.meta.dir, '..', 'sets', 'modern')
const manifestPath = join(root, 'manifest.json')

export const thrivingOpen = '<g data-state="thriving">'
export const thrivingClose = '</g><!--/thriving-->'

type Vb = { x: number; y: number; w: number; h: number }
const art = new Map<string, { path: string; vb: Vb }>()

function write(rel: string, vb: Vb, body: string, defs = ''): void {
  const file = join(root, rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, svgDoc(vb, body, defs))
}

const iso = new Iso()
for (const name of terrainNames) {
  const t = terrainDrawers[name](iso)
  const vb = { x: 0, y: -t.up, w: 256, h: 196 + t.up }
  const rel = `terrain/${name}.svg`
  write(rel, vb, t.svg, highlightDef)
  art.set(`terrain/${name}`, { path: rel, vb })
}
for (const [id, draw] of Object.entries(structureDrawers)) {
  const s = draw()
  const rel = `structures/${id}.svg`
  write(rel, s.vb, `${s.body}${s.lit ? `${thrivingOpen}${s.lit}${thrivingClose}` : ''}`)
  art.set(`structure/${id}`, { path: rel, vb: s.vb })
}
for (const [id, draw] of Object.entries(decalDrawers)) {
  const d = draw()
  const rel = `decals/${id}.svg`
  write(rel, d.vb, d.svg)
  art.set(`decal/${id}`, { path: rel, vb: d.vb })
}
for (const [id, draw] of Object.entries(connectorDrawers)) {
  const c = draw()
  const rel = `connectors/${id}.svg`
  write(rel, c.vb, c.svg)
  art.set(`connector/${id}`, { path: rel, vb: c.vb })
}

// ---------------------------------------------------------------------------------------------------------------
// Manifest: keep the contract's fields, mark drawn tiles as draft, and record where each drawing lives.

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as TileManifest & Record<string, unknown>
const orientation: Record<string, number> = { 'connector/quay': 5 }
const tiles = manifest.tiles.map((tile): TileEntry & Record<string, unknown> => {
  const key = `${tile.kind}/${tile.id}`
  const drawn = art.get(key)
  if (!drawn) return tile as TileEntry & Record<string, unknown>
  const { vb } = drawn
  return {
    ...tile,
    orientation: (orientation[key] ?? tile.orientation) as TileEntry['orientation'],
    status: 'draft',
    art: {
      path: drawn.path,
      width: vb.w,
      height: vb.h,
      anchor: { x: 128 - vb.x, y: 74 - vb.y },
      framesDrawn: 1
    }
  }
})

const next = {
  schema: manifest.schema,
  id: manifest.id,
  name: manifest.name,
  description:
    'Clean, engraved tiles: deep-ink linework over flat token fills, light from the top-left. The default set for the apps, docs, diagrams and print.',
  licence: manifest.licence,
  art: {
    version: '0.1.0',
    generator: 'packages/tiles/scripts/generate-modern.ts',
    format: 'svg',
    anchorNote:
      '`anchor` is in cell pixels (the 256 × 196 cell of the anchor hex); `art.anchor` is the same point in the canvas pixels of the SVG, whose view box extends above (and, for pair and flower footprints, beside) the cell.',
    themeNote:
      'Fills are CSS custom properties with token fallbacks: --terrain-<name>, --tile-water (the ocean and coastal water, from color.tile.water), --tile-ink, --tile-paper, --tile-plinth, --tile-deep, --tile-pine, --tile-leaf, --bld-limestone, --bld-slate, --bld-timber, --bld-brick, --bld-thatch, --bld-brass, --bld-stone.',
    aliasesNote:
      '`aliases` maps deprecated tile keys to their replacements (`structure/citadel` is `structure/capital`, `structure/bridge` is `structure/causeway`); renderers resolve them so older maps keep working.',
    framesNote: 'v0 draws frame 0 (the still) only; animated loops are declared in `frames` and not yet drawn.'
  },
  aliases: { ...tileAliases },
  conditions: {
    note: 'Every structure is drawn once (thriving). The other states are compositions of that drawing and the decals, under the same light.',
    thriving: { hide: [], decals: [] },
    quiet: { hide: ['[data-state="thriving"]'], decals: [] },
    weathered: { hide: ['[data-state="thriving"]'], decals: ['moss', 'cracks'] },
    ruined: { hide: ['[data-state="thriving"]'], decals: ['ivy', 'moss', 'cracks', 'fallen-roof'] }
  },
  tiles
}

writeFileSync(manifestPath, `${JSON.stringify(next, null, 2)}\n`)
const report = validateTileSet(next)
console.log(
  `wrote ${art.size} tiles; manifest ok=${report.ok} complete=${report.complete} errors=${report.errors.length}`
)
if (!report.ok) {
  console.error(report.errors.join('\n'))
  process.exit(1)
}
