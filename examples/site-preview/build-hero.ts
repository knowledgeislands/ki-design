/**
 * Renders Arcadia (packages/hexmap/examples/arcadia.islandmap.json) as an isometric, Modern-set SVG for the
 * site preview's hero, and splices it into index.html between the `hero:start` / `hero:end` markers.
 *
 *   bun examples/site-preview/build-hero.ts
 *
 * Geometry comes from @knowledgeislands/hexmap (pointy-top hexes, 2:1 dimetric: top face 256 x 148 at the
 * reference width, rows stepping 111, odd rows shifted 128), scaled down to `w`. Glyphs come from
 * @knowledgeislands/icons; terrain colours from @knowledgeislands/tokens. Imports are relative source paths so the
 * script runs without a workspace install.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { type Axial, axialToOffset, distance, hexKey, neighbours } from '../../packages/hexmap/src/coords.ts'
import { iso, isoPosition, isoProject, isoSort, type Point } from '../../packages/hexmap/src/geometry.ts'
import { iconBodies, type IconName } from '../../packages/icons/src/icons.generated.ts'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')

// ---------------------------------------------------------------------------------------------------------------
// Data

interface Hex extends Axial {
  terrain: string
  structure?: string
  condition?: 'thriving' | 'quiet' | 'weathered' | 'ruined'
}
interface IslandMap {
  id: string
  name: string
  hexes: Hex[]
  routes?: { from: Axial; to: Axial; kind: 'active' | 'pending' }[]
}

export const arcadia: IslandMap = JSON.parse(
  readFileSync(join(root, 'packages/hexmap/examples/arcadia.islandmap.json'), 'utf8')
)
const tokens = JSON.parse(readFileSync(join(root, 'packages/tokens/tokens.json'), 'utf8'))
const terrainFill: Record<string, string> = Object.fromEntries(
  Object.entries(tokens.color.terrain as Record<string, { $value: string }>).map(([k, v]) => [k, v.$value])
)
const core = (name: string): string => tokens.color.core[name].$value as string

const C = {
  navy: core('navy'),
  ocean: core('ocean'),
  teal: core('teal'),
  parchment: core('parchment'),
  ink: core('ink'),
  gold: core('gold'),
  textGold: core('text-gold'),
  sandstone: core('sandstone'),
  forest: core('forest'),
  moss: core('moss'),
  muted: '#a9b4c4' // night muted (docs/spec/colour.md)
}

// ---------------------------------------------------------------------------------------------------------------
// Colour helpers

const hexToRgb = (h: string): number[] => [1, 3, 5].map((i) => Number.parseInt(h.slice(i, i + 2), 16))
const rgbToHex = (c: number[]): string => `#${c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`
/** `t` of `b` mixed into `a`. */
export const mix = (a: string, b: string, t: number): string => {
  const x = hexToRgb(a)
  const y = hexToRgb(b)
  return rgbToHex(x.map((v, i) => v + ((y[i] as number) - v) * t))
}

// ---------------------------------------------------------------------------------------------------------------
// Deterministic noise, so the output is byte-stable

function rng(seed: number): () => number {
  let s = seed >>> 0 || 1
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return ((s >>> 0) % 10000) / 10000
  }
}
const seedOf = (h: Axial, salt = 0): number => (h.q + 11) * 7919 + (h.r + 13) * 104729 + salt * 31

const f = (n: number): string => (Math.round(n * 100) / 100).toString()
const pts = (p: Point[]): string => p.map((v) => `${f(v.x)},${f(v.y)}`).join(' ')

// ---------------------------------------------------------------------------------------------------------------
// Elevation: the islandmap/v1 example carries no elevation yet, so it is derived from terrain (docs/spec/world.md:
// higher ground reads as more mature knowledge).

const elevationOf: Record<string, number> = {
  ocean: 0,
  coastal: 0,
  sand: 0,
  marsh: 0,
  river: 1,
  grassland: 1,
  forest: 1,
  cliffs: 2,
  hills: 2,
  mountain: 3,
  snow: 4,
  volcanic: 3
}

// ---------------------------------------------------------------------------------------------------------------
// Options

export interface IsoOptions {
  /** Tile width in px; geometry scales from the 256 reference. */
  w?: number
  /** Sea colours and theme for the frame. */
  theme?: 'night' | 'day'
  glyphs?: boolean
  lamps?: boolean
  routes?: boolean
  lanes?: boolean
  cartouches?: boolean
  lattice?: boolean
  /** Extra padding around the island, in px: [top, right, bottom, left]. */
  pad?: [number, number, number, number]
  /** id prefix, so two renders can share a page. */
  id?: string
  title?: string
  desc?: string
}

interface District {
  name: string
  sub: string
  at: Axial
  /** Cartouche placement relative to the place, in px. */
  dx: number
  dy: number
  anchor: 'start' | 'end'
}

/** The five districts called out on the hero. Subtitles keep to four words (docs/spec/components.md). */
export const districts: District[] = [
  { name: 'The Observatory', sub: 'Reflect · insight', at: { q: 2, r: -1 }, dx: 150, dy: -150, anchor: 'start' },
  { name: 'The Ancient Forest', sub: 'Wisdom · never built on', at: { q: -1, r: -1 }, dx: -30, dy: -150, anchor: 'end' },
  { name: 'The Capital', sub: 'Library · Council Hall', at: { q: 0, r: 0 }, dx: 300, dy: -6, anchor: 'start' },
  { name: 'The Streams', sub: 'Knowledge in motion', at: { q: 0, r: 1 }, dx: 260, dy: 130, anchor: 'start' },
  { name: 'The Port', sub: 'Capture · entry & exchange', at: { q: -1, r: 3 }, dx: -170, dy: 70, anchor: 'end' }
]

/** `citadel` is the Capital's deprecated tile id (hexmap's `structureAliases`, inlined to keep this script install-free). */
const resolveStructure = (id: string): string => (id === 'citadel' ? 'capital' : id)

const structureGlyph: Record<string, IconName> = {
  capital: 'capital', // the Capital's compound: the Library's dome beside the Council Hall's colonnade
  library: 'library',
  observatory: 'observatory',
  lighthouse: 'lighthouse',
  port: 'port',
  workshop: 'workshop',
  mill: 'mill',
  ruins: 'ruins',
  'ancient-forest': 'ancient-forest',
  cottage: 'tower' // no cottage glyph yet; never drawn on the hero (see below)
}

// ---------------------------------------------------------------------------------------------------------------
// Renderer

export function renderIso(map: IslandMap, opts: IsoOptions = {}): string {
  const w = opts.w ?? 88
  const k = w / iso.width
  const night = (opts.theme ?? 'night') === 'night'
  const id = opts.id ?? 'arc'
  const lift = 13 * (w / 88) // px per elevation level: 13 px at w = 88
  const plinth = 48 * k
  const top = (iso.height * k) / 2
  const shoulder = top - iso.shoulder * k

  const sea = night ? C.navy : '#d6e3e1'
  const seaShallow = night ? '#17345a' : '#e4ece4'
  const seaLine = night ? C.parchment : C.ocean
  const outline = mix(C.ink, night ? C.navy : C.ink, 0.3)

  const byKey = new Map(map.hexes.map((h) => [hexKey(h), h]))
  const isLand = (h: Axial): boolean => {
    const x = byKey.get(hexKey(h))
    return !!x && x.terrain !== 'ocean'
  }
  const land = isoSort(map.hexes.filter((h) => h.terrain !== 'ocean'))

  const height = (h: Hex): number => (elevationOf[h.terrain] ?? 0) * lift
  const centre = (h: Axial): Point => isoPosition(h, w)
  const topCentre = (h: Hex): Point => {
    const c = centre(h)
    return { x: c.x, y: c.y - height(h) }
  }
  const face = (h: Hex): Point[] => isoProject(h, w).map((p) => ({ x: p.x, y: p.y - height(h) }))

  // Bounds: island plus a sea margin of two hexes.
  const seaHexes: Axial[] = []
  for (let q = -9; q <= 9; q++)
    for (let r = -7; r <= 7; r++) {
      const h = { q, r }
      if (distance(h, { q: 0, r: 0 }) <= 6) seaHexes.push(h)
    }
  const allPts = map.hexes.flatMap((h) => isoProject(h, w))
  const minX = Math.min(...allPts.map((p) => p.x))
  const maxX = Math.max(...allPts.map((p) => p.x))
  const minY = Math.min(...allPts.map((p) => p.y))
  const maxY = Math.max(...allPts.map((p) => p.y))
  const [pt, pr, pb, pl] = opts.pad ?? [40, 40, 40, 40]
  const vb = { x: minX - pl, y: minY - pt - 4 * lift, w: maxX - minX + pl + pr, h: maxY - minY + pt + pb + 4 * lift }

  const out: string[] = []
  const title = opts.title ?? `${map.name}, drawn in the Modern tile set`
  const desc =
    opts.desc ??
    'An isometric hex map of Arcadia: the Capital on the central hills above the river, the Port on the south coast, the Observatory and Lighthouse on the eastern heights, the ancient forest in the west, ruins on the north-west ridge.'
  out.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(vb.x)} ${f(vb.y)} ${f(vb.w)} ${f(vb.h)}" role="img" aria-labelledby="${id}-t ${id}-d" class="iso-map">`,
    `<title id="${id}-t">${title}</title>`,
    `<desc id="${id}-d">${desc}</desc>`
  )

  // Glyph symbols used in this render.
  const used = new Set<IconName>()
  for (const h of land) {
    const name = h.structure && structureGlyph[resolveStructure(h.structure)]
    if (name) used.add(name)
  }
  used.add('vessel')
  used.add('compass')
  out.push('<defs>')
  for (const name of used) out.push(`<symbol id="${id}-g-${name}" viewBox="0 0 24 24">${iconBodies[name]}</symbol>`)
  out.push(
    `<radialGradient id="${id}-moon" cx="0.42" cy="0.4" r="0.62"><stop offset="0" stop-color="${night ? C.ocean : '#e4ece4'}" stop-opacity="${night ? 0.95 : 1}"/><stop offset="1" stop-color="${sea}" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="${id}-fog" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${night ? '#657384' : '#cfd3d6'}" stop-opacity="0.32"/><stop offset="1" stop-color="${night ? '#657384' : '#cfd3d6'}" stop-opacity="0"/></radialGradient>`
  )
  out.push('</defs>')

  // Sea.
  out.push(`<rect x="${f(vb.x)}" y="${f(vb.y)}" width="${f(vb.w)}" height="${f(vb.h)}" fill="${sea}"/>`)
  out.push(
    `<ellipse cx="${f((minX + maxX) / 2)}" cy="${f((minY + maxY) / 2)}" rx="${f((maxX - minX) * 0.72)}" ry="${f((maxY - minY) * 0.7)}" fill="url(#${id}-moon)"/>`
  )

  // Sea lattice: the hex grid shows faintly in the water, fading with distance from land.
  if (opts.lattice !== false) {
    const g: string[] = []
    for (const h of seaHexes) {
      if (isLand(h)) continue
      const nearLand = neighbours(h).some(isLand)
      const d = distance(h, { q: 0, r: 0 })
      const op = nearLand ? 0.16 : Math.max(0.03, 0.12 - (d - 4) * 0.03)
      const p = isoProject(h, w)
      if (nearLand)
        g.push(`<polygon points="${pts(p)}" fill="${seaShallow}" stroke="${seaLine}" stroke-opacity="${op}" stroke-width="0.8"/>`)
      else g.push(`<polygon points="${pts(p)}" fill="none" stroke="${seaLine}" stroke-opacity="${f(op)}" stroke-width="0.7"/>`)
    }
    out.push(`<g class="sea-lattice">${g.join('')}</g>`)
  }

  // Wave strokes.
  {
    const r = rng(42)
    const g: string[] = []
    for (let i = 0; i < 46; i++) {
      const x = vb.x + r() * vb.w
      const y = vb.y + r() * vb.h
      const near = land.some((h) => {
        const c = centre(h)
        return Math.abs(c.x - x) < w * 0.75 && Math.abs(c.y - y) < w * 0.55
      })
      if (near) continue
      const l = 8 + r() * 10
      g.push(`<path d="M${f(x)} ${f(y)} q${f(l / 2)} -3 ${f(l)} 0" />`)
    }
    out.push(
      `<g class="waves" fill="none" stroke="${seaLine}" stroke-opacity="${night ? 0.16 : 0.22}" stroke-width="1" stroke-linecap="round">${g.join('')}</g>`
    )
  }

  // Sea lanes leaving the Port and the east coast: trade routes to other islands (solid = active, dashed = awaiting).
  if (opts.lanes) {
    const port = centre({ q: -1, r: 3 })
    const east = centre({ q: 3, r: 0 })
    const north = centre({ q: 2, r: -3 })
    const lanes = [
      { d: `M${f(port.x - 10)} ${f(port.y + 22)} C ${f(port.x - 110)} ${f(port.y + 90)}, ${f(vb.x + 80)} ${f(port.y + 60)}, ${f(vb.x - 10)} ${f(port.y + 130)}`, dash: '1 5', v: 0.55 },
      { d: `M${f(east.x + 40)} ${f(east.y + 20)} C ${f(east.x + 150)} ${f(east.y + 40)}, ${f(east.x + 200)} ${f(east.y + 160)}, ${f(vb.x + vb.w + 10)} ${f(east.y + 210)}`, dash: '1 5', v: 0.6 },
      { d: `M${f(north.x + 20)} ${f(north.y - 16)} C ${f(north.x + 90)} ${f(north.y - 90)}, ${f(north.x + 180)} ${f(vb.y + 60)}, ${f(vb.x + vb.w + 10)} ${f(vb.y + 30)}`, dash: '7 7', v: -1 }
    ]
    const g: string[] = []
    for (const l of lanes)
      g.push(
        `<path d="${l.d}" fill="none" stroke="${C.gold}" stroke-opacity="0.7" stroke-width="1.4" stroke-dasharray="${l.dash}" stroke-linecap="round"/>`
      )
    // Small vessels on the active lanes: AI work drawn as infrastructure (docs/spec/illustration.md).
    const vessels = [
      { x: port.x - 128, y: port.y + 78 },
      { x: east.x + 168, y: east.y + 108 }
    ]
    for (const v of vessels)
      g.push(
        `<use href="#${id}-g-vessel" x="${f(v.x - 9)}" y="${f(v.y - 15)}" width="18" height="18" fill="none" stroke="${night ? C.parchment : C.ink}" stroke-opacity="0.75" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`
      )
    out.push(`<g class="lanes">${g.join('')}</g>`)
  }

  // Land: back rows to front, west to east.
  const g: string[] = []
  for (const h of land) {
    const fill = terrainFill[h.terrain] ?? terrainFill['grassland'] ?? '#a9b97c'
    const ht = height(h)
    const fc = face(h)
    const [t0, ur, lr, bt, ll, ul] = fc as [Point, Point, Point, Point, Point, Point]
    const depth = plinth + ht
    // Plinth: the two front faces (SW lit, SE in shade), stratified rock under a turf lip.
    const rockLit = mix(C.sandstone, C.ink, 0.38)
    const rockShade = mix(C.sandstone, C.ink, 0.58)
    const sw = [ll, bt, { x: bt.x, y: bt.y + depth }, { x: ll.x, y: ll.y + depth }]
    const se = [bt, lr, { x: lr.x, y: lr.y + depth }, { x: bt.x, y: bt.y + depth }]
    const isWater = h.terrain === 'river' || h.terrain === 'marsh'
    g.push(`<g class="hex t-${h.terrain}">`)
    g.push(`<polygon points="${pts(sw)}" fill="${rockLit}"/>`)
    g.push(`<polygon points="${pts(se)}" fill="${rockShade}"/>`)
    // Strata bands every ~11 px.
    const bands: string[] = []
    for (let y = 8 * k * 2.9; y < depth - 3; y += 11 * k * 2.9) {
      bands.push(`M${f(ll.x)} ${f(ll.y + y)} L${f(bt.x)} ${f(bt.y + y)} L${f(lr.x)} ${f(lr.y + y)}`)
    }
    if (bands.length)
      g.push(`<path d="${bands.join(' ')}" fill="none" stroke="${C.ink}" stroke-opacity="0.22" stroke-width="0.8"/>`)
    // Turf lip.
    const lip = 3.2 * k * 2.9
    const lipCol = mix(fill, C.ink, 0.28)
    g.push(
      `<polygon points="${pts([ll, bt, lr, { x: lr.x, y: lr.y + lip }, { x: bt.x, y: bt.y + lip }, { x: ll.x, y: ll.y + lip }])}" fill="${isWater ? mix(terrainFill['grassland'] ?? fill, C.ink, 0.3) : lipCol}"/>`
    )
    g.push(`<path d="M${pts(sw.concat())}Z M${pts(se)}Z" fill="none" stroke="${outline}" stroke-width="0.9" stroke-opacity="0.7"/>`)
    // Foam where the plinth meets the sea.
    const coast = neighbours(h).some((n) => !isLand(n))
    if (coast)
      g.push(
        `<path d="M${f(ll.x - 2)} ${f(ll.y + depth + 1)} L${f(bt.x)} ${f(bt.y + depth + 1)} L${f(lr.x + 2)} ${f(lr.y + depth + 1)}" fill="none" stroke="${night ? '#9fbbd8' : C.parchment}" stroke-opacity="0.55" stroke-width="1.6" stroke-linecap="round"/>`
      )
    // Top face, faceted for light from the top-left.
    const c = topCentre(h)
    g.push(`<polygon points="${pts(fc)}" fill="${fill}"/>`)
    g.push(`<polygon points="${pts([t0, ul, ll, c])}" fill="${C.parchment}" fill-opacity="0.13"/>`)
    g.push(`<polygon points="${pts([ur, lr, bt, c])}" fill="${C.ink}" fill-opacity="0.07"/>`)
    // Edges: lit edges pale, shaded edges ink.
    g.push(
      `<path d="M${f(ll.x)} ${f(ll.y)} L${f(ul.x)} ${f(ul.y)} L${f(t0.x)} ${f(t0.y)}" fill="none" stroke="${C.parchment}" stroke-opacity="0.55" stroke-width="1"/>`
    )
    g.push(`<polygon points="${pts(fc)}" fill="none" stroke="${outline}" stroke-width="0.8" stroke-opacity="0.55"/>`)
    g.push(terrainMotif(h, c, w, fill))
    g.push('</g>')
  }
  out.push(`<g class="land" stroke-linejoin="round">${g.join('')}</g>`)

  // Routes on land: dotted brass paths between places (dashed where awaiting).
  if (opts.routes !== false && map.routes) {
    const r: string[] = []
    for (const route of map.routes) {
      const a = byKey.get(hexKey(route.from))
      const b = byKey.get(hexKey(route.to))
      if (!a || !b) continue
      const p = topCentre(a)
      const q = topCentre(b)
      const mx = (p.x + q.x) / 2 + (q.y - p.y) * 0.18
      const my = (p.y + q.y) / 2 - (q.x - p.x) * 0.12
      r.push(
        `<path d="M${f(p.x)} ${f(p.y)} Q${f(mx)} ${f(my)} ${f(q.x)} ${f(q.y)}" fill="none" stroke="${night ? C.gold : C.textGold}" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="${route.kind === 'active' ? '0.1 4.5' : '5 4'}"/>`
      )
    }
    out.push(`<g class="routes">${r.join('')}</g>`)
  }

  // Structures: line glyphs standing on their hexes, on a paper halo so they read over any terrain.
  if (opts.glyphs !== false) {
    const s: string[] = []
    for (const h of land) {
      if (!h.structure || h.structure === 'cottage') continue
      const name = structureGlyph[resolveStructure(h.structure)]
      if (!name) continue
      const c = topCentre(h)
      const big = resolveStructure(h.structure) === 'capital'
      const size = (big ? 54 : h.structure === 'ancient-forest' ? 42 : 38) * (w / 88)
      const x = c.x - size / 2
      const y = c.y - size * 0.86
      const ruined = h.condition === 'ruined' || h.condition === 'weathered'
      s.push(
        `<ellipse cx="${f(c.x)}" cy="${f(c.y + 1)}" rx="${f(size * 0.42)}" ry="${f(size * 0.16)}" fill="${C.ink}" fill-opacity="0.22"/>`,
        `<use href="#${id}-g-${name}" x="${f(x)}" y="${f(y)}" width="${f(size)}" height="${f(size)}" fill="none" stroke="${C.parchment}" stroke-opacity="0.92" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>`,
        `<use href="#${id}-g-${name}" x="${f(x)}" y="${f(y)}" width="${f(size)}" height="${f(size)}" fill="none" stroke="${C.ink}" stroke-opacity="${ruined ? 0.7 : 1}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
      )
    }
    out.push(`<g class="structures">${s.join('')}</g>`)
  }

  // Lamps: small brass lights on tended structures and along the roads. Flicker on the shared 8-frame loop.
  if (opts.lamps) {
    const l: string[] = []
    const r = rng(7)
    for (const h of land) {
      if (!h.structure || h.condition !== 'thriving' || h.structure === 'ancient-forest') continue
      const c = topCentre(h)
      const n = resolveStructure(h.structure) === 'capital' ? 6 : h.structure === 'port' ? 5 : 3
      for (let i = 0; i < n; i++) {
        const a = r() * Math.PI * 2
        const rr = 10 + r() * 18
        const x = c.x + Math.cos(a) * rr * (w / 88)
        const y = c.y + Math.sin(a) * rr * 0.5 * (w / 88)
        l.push(lamp(x, y, i % 3))
      }
    }
    if (map.routes)
      for (const route of map.routes) {
        if (route.kind !== 'active') continue
        const a = byKey.get(hexKey(route.from))
        const b = byKey.get(hexKey(route.to))
        if (!a || !b) continue
        const p = topCentre(a)
        const q = topCentre(b)
        for (const t of [0.33, 0.66]) l.push(lamp(p.x + (q.x - p.x) * t, p.y + (q.y - p.y) * t, Math.round(t * 3)))
      }
    // The Lighthouse lamp.
    const lh = byKey.get(hexKey({ q: 3, r: -1 }))
    if (lh) {
      const c = topCentre(lh)
      l.push(lamp(c.x + 1, c.y - 28 * (w / 88), 1, 3.2))
    }
    out.push(`<g class="lamps">${l.join('')}</g>`)
  }

  // Fog at the map's edge: uncharted water (docs/spec/meaning.md).
  out.push(
    `<g class="fog"><ellipse cx="${f(vb.x + vb.w * 0.9)}" cy="${f(vb.y + vb.h * 0.12)}" rx="${f(vb.w * 0.28)}" ry="${f(vb.h * 0.12)}" fill="url(#${id}-fog)"/><ellipse cx="${f(vb.x + vb.w * 0.08)}" cy="${f(vb.y + vb.h * 0.9)}" rx="${f(vb.w * 0.24)}" ry="${f(vb.h * 0.1)}" fill="url(#${id}-fog)"/></g>`
  )

  // Cartouches with leader lines.
  if (opts.cartouches) {
    const cg: string[] = []
    for (const d of districts) {
      const h = byKey.get(hexKey(d.at))
      if (!h) continue
      const p = topCentre(h)
      const tx = p.x + d.dx
      const ty = p.y + d.dy
      const titleW = d.name.length * 11.4 + 6
      const subW = d.sub.length * 7.4
      const bw = Math.max(titleW, subW) + 28
      const bh = 58
      const bx = d.anchor === 'start' ? tx : tx - bw
      const by = ty - bh / 2
      const ex = d.anchor === 'start' ? bx : bx + bw
      cg.push(
        `<g class="cartouche">`,
        `<path d="M${f(p.x)} ${f(p.y)} L${f(ex)} ${f(ty)}" stroke="${C.gold}" stroke-opacity="0.85" stroke-width="1"/>`,
        `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="3.4" fill="${C.gold}" stroke="${C.navy}" stroke-width="1"/>`,
        `<rect x="${f(bx)}" y="${f(by)}" width="${f(bw)}" height="${bh}" rx="4" fill="${C.navy}" fill-opacity="0.86" stroke="${C.gold}" stroke-opacity="0.75" stroke-width="1"/>`,
        `<text x="${f(bx + 14)}" y="${f(by + 26)}" font-family="'Cormorant SC', 'Cormorant Garamond', Georgia, serif" font-size="20" font-weight="600" letter-spacing="2" fill="${C.parchment}">${d.name}</text>`,
        `<text x="${f(bx + 14)}" y="${f(by + 45)}" font-family="Inter, system-ui, sans-serif" font-size="13.5" font-weight="500" fill="${C.muted}">${d.sub.replace('&', '&amp;')}</text>`,
        '</g>'
      )
    }
    out.push(`<g class="cartouches">${cg.join('')}</g>`)
  }

  out.push('</svg>')
  return out.join('\n')

  function lamp(x: number, y: number, phase: number, r = 2.2): string {
    return `<g class="lamp p${phase}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 2.6)}" fill="${C.gold}" fill-opacity="0.18"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${C.gold}"/></g>`
  }
}

/** Small ink motifs per terrain so colour is never the only carrier (docs/spec/colour.md). */
function terrainMotif(h: Hex, c: Point, w: number, fill: string): string {
  const s = w / 88
  const r = rng(seedOf(h))
  const ink = C.ink
  const spots = (n: number, rx = 26, ry = 12): Point[] => {
    const p: Point[] = []
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2
      const d = Math.sqrt(r())
      p.push({ x: c.x + Math.cos(a) * d * rx * s, y: c.y + Math.sin(a) * d * ry * s })
    }
    return p.sort((a, b) => a.y - b.y)
  }
  const o: string[] = []
  switch (h.terrain) {
    case 'grassland':
      for (const p of spots(h.structure ? 3 : 6))
        o.push(`<path d="M${f(p.x - 2.2 * s)} ${f(p.y - 3 * s)} L${f(p.x)} ${f(p.y)} L${f(p.x + 2.2 * s)} ${f(p.y - 3.4 * s)}"/>`)
      return `<g fill="none" stroke="${ink}" stroke-opacity="0.42" stroke-width="0.9" stroke-linecap="round">${o.join('')}</g>`
    case 'forest': {
      const n = h.structure ? 4 : 8
      const lit = mix(fill, C.parchment, 0.18)
      const shade = mix(fill, C.ink, 0.32)
      for (const p of spots(n, 28, 13)) {
        const th = (11 + r() * 5) * s
        const tw = th * 0.62
        o.push(
          `<path d="M${f(p.x)} ${f(p.y)} v${f(2 * s)}" stroke="${mix(C.sandstone, ink, 0.5)}" stroke-width="${f(1.4 * s)}"/>`,
          `<polygon points="${f(p.x)},${f(p.y - th)} ${f(p.x - tw / 2)},${f(p.y)} ${f(p.x)},${f(p.y)}" fill="${lit}"/>`,
          `<polygon points="${f(p.x)},${f(p.y - th)} ${f(p.x + tw / 2)},${f(p.y)} ${f(p.x)},${f(p.y)}" fill="${shade}"/>`,
          `<polygon points="${f(p.x)},${f(p.y - th)} ${f(p.x - tw / 2)},${f(p.y)} ${f(p.x + tw / 2)},${f(p.y)}" fill="none" stroke="${ink}" stroke-opacity="0.6" stroke-width="0.7"/>`
        )
      }
      return `<g stroke-linejoin="round">${o.join('')}</g>`
    }
    case 'hills':
      for (const p of spots(h.structure ? 2 : 4, 24, 11)) {
        const hw = (7 + r() * 4) * s
        o.push(
          `<path d="M${f(p.x - hw)} ${f(p.y)} Q${f(p.x)} ${f(p.y - hw * 1.1)} ${f(p.x + hw)} ${f(p.y)}" fill="${mix(fill, C.ink, 0.12)}" stroke="${ink}" stroke-opacity="0.5" stroke-width="0.8"/>`,
          `<path d="M${f(p.x - hw * 0.2)} ${f(p.y - hw * 0.4)} q${f(hw * 0.35)} ${f(hw * 0.1)} ${f(hw * 0.5)} ${f(hw * 0.4)}" fill="none" stroke="${ink}" stroke-opacity="0.3" stroke-width="0.7"/>`
        )
      }
      return `<g>${o.join('')}</g>`
    case 'mountain':
    case 'snow': {
      const peaks = h.terrain === 'snow' ? [{ x: 0, y: 5, hgt: 50, wd: 56 }] : [{ x: -10, y: 3, hgt: 40, wd: 46 }, { x: 13, y: 8, hgt: 30, wd: 38 }]
      for (const pk of peaks) {
        const bx = c.x + pk.x * s
        const by = c.y + pk.y * s
        const ph = pk.hgt * s
        const pw = pk.wd * s
        const apex = { x: bx - pw * 0.06, y: by - ph }
        const litC = mix(terrainFill['mountain'] ?? '#8c8577', C.parchment, 0.35)
        const shadeC = mix(terrainFill['mountain'] ?? '#8c8577', C.ink, 0.35)
        o.push(
          `<polygon points="${f(apex.x)},${f(apex.y)} ${f(bx - pw / 2)},${f(by)} ${f(bx + pw * 0.05)},${f(by)}" fill="${litC}"/>`,
          `<polygon points="${f(apex.x)},${f(apex.y)} ${f(bx + pw * 0.05)},${f(by)} ${f(bx + pw / 2)},${f(by)}" fill="${shadeC}"/>`
        )
        const capH = h.terrain === 'snow' ? 0.5 : 0.3
        const cy = apex.y + ph * capH
        const t = capH
        o.push(
          `<polygon points="${f(apex.x)},${f(apex.y)} ${f(apex.x + (bx - pw / 2 - apex.x) * t)},${f(cy)} ${f(apex.x + (bx - pw * 0.15 - apex.x) * t)},${f(cy - 2 * s)} ${f(apex.x + (bx + pw * 0.05 - apex.x) * t)},${f(cy + 1 * s)} ${f(apex.x + (bx + pw / 2 - apex.x) * t)},${f(cy)}" fill="${C.parchment}" fill-opacity="${h.terrain === 'snow' ? 1 : 0.85}"/>`,
          `<polygon points="${f(apex.x)},${f(apex.y)} ${f(bx - pw / 2)},${f(by)} ${f(bx + pw / 2)},${f(by)}" fill="none" stroke="${ink}" stroke-opacity="0.7" stroke-width="0.9"/>`,
          `<path d="M${f(apex.x)} ${f(apex.y)} L${f(bx + pw * 0.05)} ${f(by)}" stroke="${ink}" stroke-opacity="0.35" stroke-width="0.7"/>`
        )
      }
      return `<g stroke-linejoin="round">${o.join('')}</g>`
    }
    case 'coastal':
      for (const p of spots(h.structure ? 6 : 12, 30, 13)) o.push(`<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(0.8 * s)}"/>`)
      return `<g fill="${ink}" fill-opacity="0.45">${o.join('')}</g>`
    case 'sand':
      for (const p of spots(4, 26, 11))
        o.push(`<path d="M${f(p.x - 6 * s)} ${f(p.y)} q${f(6 * s)} ${f(-4 * s)} ${f(12 * s)} 0"/>`)
      return `<g fill="none" stroke="${ink}" stroke-opacity="0.38" stroke-width="0.9" stroke-linecap="round">${o.join('')}</g>`
    case 'marsh':
      for (const p of spots(6, 28, 12)) {
        o.push(
          `<path d="M${f(p.x - 4 * s)} ${f(p.y)} h${f(8 * s)}" stroke="${terrainFill['river']}" stroke-width="1.6"/>`,
          `<path d="M${f(p.x - 1 * s)} ${f(p.y)} v${f(-5 * s)} M${f(p.x + 1.4 * s)} ${f(p.y)} v${f(-3.6 * s)}" stroke="${ink}" stroke-opacity="0.55" stroke-width="0.8"/>`
        )
      }
      return `<g fill="none" stroke-linecap="round">${o.join('')}</g>`
    case 'cliffs':
      for (const p of spots(3, 22, 10))
        o.push(`<path d="M${f(p.x - 7 * s)} ${f(p.y)} l${f(4 * s)} ${f(-3 * s)} l${f(4 * s)} ${f(2 * s)} l${f(5 * s)} ${f(-3 * s)}"/>`)
      return `<g fill="none" stroke="${ink}" stroke-opacity="0.5" stroke-width="0.9" stroke-linejoin="round">${o.join('')}</g>`
    case 'river': {
      // Two flowing lines across the face, south-west to north-east.
      const dx = 30 * s
      const dy = 9 * s
      o.push(
        `<path d="M${f(c.x - dx)} ${f(c.y + dy)} C ${f(c.x - 10 * s)} ${f(c.y - 2 * s)}, ${f(c.x + 8 * s)} ${f(c.y + 8 * s)}, ${f(c.x + dx)} ${f(c.y - dy)}"/>`,
        `<path d="M${f(c.x - dx + 8 * s)} ${f(c.y + dy + 4 * s)} C ${f(c.x - 2 * s)} ${f(c.y + 4 * s)}, ${f(c.x + 12 * s)} ${f(c.y + 12 * s)}, ${f(c.x + dx - 2 * s)} ${f(c.y - dy + 7 * s)}"/>`
      )
      return `<g fill="none" stroke="${C.parchment}" stroke-opacity="0.75" stroke-width="1" stroke-linecap="round">${o.join('')}</g>`
    }
    default:
      return ''
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Main: write hero-arcadia.svg and splice it into index.html.

export function splice(html: string, marker: string, content: string): string {
  const start = `<!-- ${marker}:start -->`
  const end = `<!-- ${marker}:end -->`
  const a = html.indexOf(start)
  const b = html.indexOf(end)
  if (a < 0 || b < 0) throw new Error(`markers ${marker} not found`)
  return `${html.slice(0, a + start.length)}\n${content}\n${html.slice(b)}`
}

if (import.meta.main) {
  const svg = renderIso(arcadia, {
    w: 88,
    theme: 'night',
    lamps: true,
    lanes: true,
    cartouches: true,
    pad: [24, 200, 40, 190],
    id: 'hero'
  })
  writeFileSync(join(here, 'hero-arcadia.svg'), `${svg}\n`)
  const indexPath = join(here, 'index.html')
  const html = readFileSync(indexPath, 'utf8')
  writeFileSync(indexPath, splice(html, 'hero', svg))
  console.log(`hero-arcadia.svg: ${(svg.length / 1024).toFixed(1)} KB; spliced into index.html`)
}
