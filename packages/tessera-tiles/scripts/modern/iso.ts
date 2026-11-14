/**
 * Drawing primitives for the Modern tile set: a 2:1 dimetric projection, faces with flat token fills and
 * light from the top-left, engraved hatching, and a deterministic random source for motifs.
 *
 * Two coordinate systems are used, both relative to an origin (the hex centre at ground level, in canvas pixels):
 * - flat ground `(x, y)`: the top-down hex plane, `y` growing south; the hex has inradius 128 and corner radius
 *   128 / cos 30°. It projects to the screen as `(x, y / 2)`.
 * - building `(u, v, z)`: ground axes along the hex's front edges (`u` runs back to the right, `v` back to the
 *   left) and height `z`. A box's front corner is its smallest `u` and `v`; its `u`-min face is lit (left) and its
 *   `v`-min face is in shade (right), matching the plinth.
 */

export type Pt = readonly [number, number]

const K = Math.cos(Math.PI / 6)
/** Corner radius of the top face in flat ground units. */
export const R = 128 / K
export const INRADIUS = 128

/** Rounds to two decimals and normalises `-0`, so output is byte-stable. */
export const n = (value: number): string => {
  const r = Math.round(value * 100) / 100
  return String(Object.is(r, -0) ? 0 : r)
}
export const pts = (list: readonly Pt[]): string => list.map(([x, y]) => `${n(x)},${n(y)}`).join(' ')

// ---------------------------------------------------------------------------------------------------------------
// Palette: CSS custom properties with token fallbacks, so themes and island palettes can override.

export const ink = 'var(--tile-ink, #1a2030)'
export const paper = 'var(--tile-paper, #f5efe0)'
export const mat = {
  limestone: 'var(--bld-limestone, #e8e0cc)',
  slate: 'var(--bld-slate, #4f6b80)',
  timber: 'var(--bld-timber, #8a6a48)',
  brick: 'var(--bld-brick, #a65e45)',
  thatch: 'var(--bld-thatch, #c9a35e)',
  brass: 'var(--bld-brass, #c8963c)',
  stone: 'var(--bld-stone, #a39a88)',
  plinth: 'var(--tile-plinth, #8e7b61)',
  pine: 'var(--tile-pine, #2d5a3d)',
  leaf: 'var(--tile-leaf, #4a7a5a)',
  water: 'var(--tile-water, #2f5878)',
  sandstone: 'var(--color-sandstone, #c4a882)'
} as const

export interface Paint {
  readonly fill?: string
  /** `false` for no stroke; a colour otherwise. Defaults to the inherited ink. */
  readonly stroke?: string | false
  readonly width?: number
  readonly opacity?: number
  readonly fillOpacity?: number
  readonly strokeOpacity?: number
  readonly dash?: string
  readonly extra?: string
}

const attrs = (p: Paint): string => {
  const out: string[] = []
  out.push(`fill="${p.fill ?? 'none'}"`)
  if (p.stroke === false) out.push('stroke="none"')
  else if (p.stroke) out.push(`stroke="${p.stroke}"`)
  if (p.width !== undefined) out.push(`stroke-width="${n(p.width)}"`)
  if (p.opacity !== undefined) out.push(`opacity="${n(p.opacity)}"`)
  if (p.fillOpacity !== undefined) out.push(`fill-opacity="${n(p.fillOpacity)}"`)
  if (p.strokeOpacity !== undefined) out.push(`stroke-opacity="${n(p.strokeOpacity)}"`)
  if (p.dash) out.push(`stroke-dasharray="${p.dash}"`)
  if (p.extra) out.push(p.extra)
  return out.join(' ')
}

export const polygon = (list: readonly Pt[], p: Paint = {}): string => `<polygon points="${pts(list)}" ${attrs(p)}/>`
export const polyline = (list: readonly Pt[], p: Paint = {}): string => `<polyline points="${pts(list)}" ${attrs(p)}/>`
export const path = (d: string, p: Paint = {}): string => `<path d="${d}" ${attrs(p)}/>`
export const seg = (a: Pt, b: Pt, p: Paint = {}): string =>
  `<line x1="${n(a[0])}" y1="${n(a[1])}" x2="${n(b[0])}" y2="${n(b[1])}" ${attrs(p)}/>`
export const ellipse = (c: Pt, rx: number, ry: number, p: Paint = {}): string =>
  `<ellipse cx="${n(c[0])}" cy="${n(c[1])}" rx="${n(rx)}" ry="${n(ry)}" ${attrs(p)}/>`

/** Light overlays: a face is drawn in its material, then toned. */
export type Tone = 'top' | 'lit' | 'shade' | 'deep' | 'flat'
const toneOverlay: Record<Exclude<Tone, 'flat'>, Paint> = {
  top: { fill: paper, stroke: false, fillOpacity: 0.16 },
  lit: { fill: paper, stroke: false, fillOpacity: 0.06 },
  shade: { fill: ink, stroke: false, fillOpacity: 0.2 },
  deep: { fill: ink, stroke: false, fillOpacity: 0.36 }
}

/** A filled, outlined face, toned for its orientation to the light. */
export function face(list: readonly Pt[], fill: string, tone: Tone = 'flat', width?: number): string {
  const base = polygon(list, width === undefined ? { fill } : { fill, width })
  return tone === 'flat' ? base : base + polygon(list, toneOverlay[tone])
}

export const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]

/** Engraved hatching across a quad: lines from the bottom edge `a→b` to the top edge `d→c`. */
export function hatch(a: Pt, b: Pt, c: Pt, d: Pt, step = 5, opacity = 0.28, inset = 0.08): string {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1])
  const count = Math.max(1, Math.floor(len / step))
  const out: string[] = []
  for (let i = 1; i < count; i++) {
    const t = i / count
    const p0 = lerp(a, b, t)
    const p1 = lerp(d, c, t)
    out.push(
      `M${n(lerp(p0, p1, inset)[0])} ${n(lerp(p0, p1, inset)[1])}L${n(lerp(p0, p1, 1 - inset)[0])} ${n(lerp(p0, p1, 1 - inset)[1])}`
    )
  }
  return out.length ? path(out.join(''), { width: 0.6, strokeOpacity: opacity }) : ''
}

// ---------------------------------------------------------------------------------------------------------------
// Determinism

export function rng(seed: string): () => number {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  let a = h >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** True when flat ground point `(x, y)` lies inside the hex scaled by `s`. */
export const inHex = (x: number, y: number, s = 1): boolean =>
  Math.abs(x) <= INRADIUS * s && Math.abs(x) / 2 + Math.abs(y) * K <= INRADIUS * s

/** Well-spaced random points inside the hex (flat ground), sorted back to front. */
export function scatter(
  random: () => number,
  count: number,
  minDist: number,
  scale = 0.82,
  keep: (x: number, y: number) => boolean = () => true
): Pt[] {
  const out: Pt[] = []
  for (let tries = 0; tries < count * 60 && out.length < count; tries++) {
    const x = (random() * 2 - 1) * INRADIUS
    const y = (random() * 2 - 1) * R
    if (!inHex(x, y, scale) || !keep(x, y)) continue
    if (out.some(([px, py]) => Math.hypot(px - x, py - y) < minDist)) continue
    out.push([x, y])
  }
  return out.sort((a, b) => a[1] - b[1])
}

// ---------------------------------------------------------------------------------------------------------------
// Projection

export class Iso {
  /** `k` scales the drawing about the origin (structures are drawn a little larger than their plan units). */
  constructor(
    readonly ox = 128,
    readonly oy = 74,
    readonly k = 1
  ) {}

  /** Flat ground point to screen. */
  g = (x: number, y: number, z = 0): Pt => [this.ox + x * this.k, this.oy + (y / 2 - z) * this.k]
  /** Building point to screen. */
  p = (u: number, v: number, z = 0): Pt => [this.ox + K * (u - v) * this.k, this.oy - (0.25 * (u + v) + z) * this.k]

  /** Building point to flat ground. */
  static flat(u: number, v: number): [number, number] {
    return [K * (u - v), -0.5 * (u + v)]
  }

  /** Building-space centre that projects to a screen offset `(dx, dy)` from the origin at ground level. */
  static uvAt(dx: number, dy: number): [number, number] {
    const a = dx / K
    const b = -4 * dy
    return [(a + b) / 2, (b - a) / 2]
  }

  /** The hex top face in flat ground, scaled, raised by `z`. */
  hex(scale = 1, z = 0): Pt[] {
    return [90, 30, -30, -90, -150, 150].map((deg) => {
      const a = (-deg * Math.PI) / 180
      return this.g(Math.cos(a) * R * scale, Math.sin(a) * R * scale, z)
    })
  }

  /** A circle on the ground (or at height `z`) as a sampled ellipse, from angle `a0` to `a1` (radians). */
  arc(cx: number, cy: number, r: number, z: number, a0: number, a1: number, steps = 24): Pt[] {
    const out: Pt[] = []
    for (let i = 0; i <= steps; i++) {
      const a = a0 + ((a1 - a0) * i) / steps
      out.push(this.g(cx + Math.cos(a) * r, cy + Math.sin(a) * r, z))
    }
    return out
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Building blocks

export interface BoxOptions {
  readonly u: number
  readonly v: number
  readonly w: number // extent along u
  readonly d: number // extent along v
  readonly h: number
  readonly z?: number
  readonly fill: string
  readonly top?: string | false
  readonly hatchRight?: boolean
}

export interface Box {
  readonly u0: number
  readonly u1: number
  readonly v0: number
  readonly v1: number
  readonly z0: number
  readonly z1: number
}

export function boxOf(o: Pick<BoxOptions, 'u' | 'v' | 'w' | 'd' | 'h' | 'z'>): Box {
  const z0 = o.z ?? 0
  return { u0: o.u - o.w / 2, u1: o.u + o.w / 2, v0: o.v - o.d / 2, v1: o.v + o.d / 2, z0, z1: z0 + o.h }
}

export function box(iso: Iso, o: BoxOptions): string {
  const b = boxOf(o)
  const { p } = iso
  const left = [p(b.u0, b.v0, b.z0), p(b.u0, b.v1, b.z0), p(b.u0, b.v1, b.z1), p(b.u0, b.v0, b.z1)]
  const right: [Pt, Pt, Pt, Pt] = [p(b.u0, b.v0, b.z0), p(b.u1, b.v0, b.z0), p(b.u1, b.v0, b.z1), p(b.u0, b.v0, b.z1)]
  const top = [p(b.u0, b.v0, b.z1), p(b.u1, b.v0, b.z1), p(b.u1, b.v1, b.z1), p(b.u0, b.v1, b.z1)]
  let out = face(left, o.fill, 'lit') + face(right, o.fill, 'shade')
  if (o.hatchRight && o.h > 6) out += hatch(right[0], right[1], right[2], right[3], 6, 0.22, 0.06)
  if (o.top !== false) out += face(top, o.top ?? o.fill, 'top')
  return out
}

/** A point on the box's lit (left, `u`-min) or shaded (right, `v`-min) face, by position along it and height. */
export const onLeft = (iso: Iso, b: Box, v: number, z: number): Pt => iso.p(b.u0, v, z)
export const onRight = (iso: Iso, b: Box, u: number, z: number): Pt => iso.p(u, b.v0, z)

/** An opening (window or door) on a face: `s` is the position along the face, `z` its sill. */
export function opening(
  iso: Iso,
  b: Box,
  side: 'left' | 'right',
  s: number,
  z: number,
  w: number,
  h: number,
  fill: string,
  arch = true,
  opacity = 1
): string {
  const at =
    side === 'left'
      ? (q: number, zz: number) => onLeft(iso, b, q, zz)
      : (q: number, zz: number) => onRight(iso, b, q, zz)
  const a = at(s - w / 2, z)
  const bb = at(s + w / 2, z)
  const c = at(s + w / 2, z + h)
  const d = at(s - w / 2, z + h)
  const list: Pt[] = arch
    ? [a, bb, c, at(s + w / 4, z + h + w * 0.32), at(s, z + h + w * 0.42), at(s - w / 4, z + h + w * 0.32), d]
    : [a, bb, c, d]
  return polygon(list, { fill, width: 0.9, ...(opacity < 1 ? { fillOpacity: opacity } : {}) })
}

/** Gable roof with its ridge along `u` (gable ends face left) or along `v` (gable ends face right). */
export function gable(
  iso: Iso,
  b: Box,
  along: 'u' | 'v',
  rise: number,
  roof: string,
  gableFill: string,
  overhang = 3
): string {
  const { p } = iso
  const z = b.z1
  const o = overhang
  const out: string[] = []
  if (along === 'u') {
    const vm = (b.v0 + b.v1) / 2
    const back = [
      p(b.u0 - o, vm, z + rise),
      p(b.u1 + o, vm, z + rise),
      p(b.u1 + o, b.v1 + o, z - o * 0.6),
      p(b.u0 - o, b.v1 + o, z - o * 0.6)
    ]
    out.push(face(back, roof, 'top'))
    const end = [p(b.u0, b.v0, z), p(b.u0, b.v1, z), p(b.u0, vm, z + rise)]
    out.push(face(end, gableFill, 'lit'))
    const front: [Pt, Pt, Pt, Pt] = [
      p(b.u0 - o, b.v0 - o, z - o * 0.6),
      p(b.u1 + o, b.v0 - o, z - o * 0.6),
      p(b.u1 + o, vm, z + rise),
      p(b.u0 - o, vm, z + rise)
    ]
    out.push(face(front, roof, 'shade'))
    out.push(hatch(front[0], front[1], front[2], front[3], 4.5, 0.3, 0.04))
  } else {
    const um = (b.u0 + b.u1) / 2
    const back = [
      p(um, b.v0 - o, z + rise),
      p(um, b.v1 + o, z + rise),
      p(b.u1 + o, b.v1 + o, z - o * 0.6),
      p(b.u1 + o, b.v0 - o, z - o * 0.6)
    ]
    out.push(face(back, roof, 'shade'))
    const end = [p(b.u0, b.v0, z), p(b.u1, b.v0, z), p(um, b.v0, z + rise)]
    out.push(face(end, gableFill, 'shade'))
    const front: [Pt, Pt, Pt, Pt] = [
      p(b.u0 - o, b.v0 - o, z - o * 0.6),
      p(b.u0 - o, b.v1 + o, z - o * 0.6),
      p(um, b.v1 + o, z + rise),
      p(um, b.v0 - o, z + rise)
    ]
    out.push(face(front, roof, 'lit'))
    out.push(hatch(front[0], front[1], front[2], front[3], 5, 0.18, 0.04))
  }
  return out.join('')
}

/** Pyramid (or hipped, with `ridge` > 0 along `u`) roof. */
export function pyramid(iso: Iso, b: Box, rise: number, roof: string, overhang = 3, ridge = 0): string {
  const { p } = iso
  const o = overhang
  const z = b.z1 - o * 0.5
  const um = (b.u0 + b.u1) / 2
  const vm = (b.v0 + b.v1) / 2
  const a1 = p(um - ridge / 2, vm, b.z1 + rise)
  const a2 = p(um + ridge / 2, vm, b.z1 + rise)
  const c00 = p(b.u0 - o, b.v0 - o, z)
  const c10 = p(b.u1 + o, b.v0 - o, z)
  const c01 = p(b.u0 - o, b.v1 + o, z)
  const left = [c00, c01, a1]
  const right = [c00, c10, a2, a1]
  return face(left, roof, 'lit') + face(right, roof, 'shade') + hatch(c00, c10, a2, a1, 4.5, 0.25, 0.05)
}

/** An upright cylinder: side, then top. Returns the screen centre of the top. */
export function cylinder(
  iso: Iso,
  cx: number,
  cy: number,
  r: number,
  h: number,
  z: number,
  fill: string,
  top: string | false = fill,
  r1 = r
): string {
  const front = iso.arc(cx, cy, r, z, Math.PI, 0, 28) // west → south → east along the front
  const topFront = iso.arc(cx, cy, r1, z + h, 0, Math.PI, 28)
  const side = [...front, ...topFront]
  const out: string[] = [polygon(side, { fill }), polygon(side, toneOverlay.lit)]
  // shade on the right third
  const shadeBottom = iso.arc(cx, cy, r, z, Math.PI * 0.22, 0, 10)
  const shadeTop = iso.arc(cx, cy, r1, z + h, 0, Math.PI * 0.22, 10)
  out.push(polygon([...shadeBottom, ...shadeTop], { fill: ink, stroke: false, fillOpacity: 0.2 }))
  const shadeBottom2 = iso.arc(cx, cy, r, z, Math.PI * 0.1, 0, 6)
  const shadeTop2 = iso.arc(cx, cy, r1, z + h, 0, Math.PI * 0.1, 6)
  out.push(polygon([...shadeBottom2, ...shadeTop2], { fill: ink, stroke: false, fillOpacity: 0.12 }))
  if (top !== false) out.push(face(iso.arc(cx, cy, r1, z + h, 0, Math.PI * 2, 36), top, 'top'))
  return out.join('')
}

/** A hemispherical dome seated at height `z`, with a shaded right flank and ribs. */
export function dome(
  iso: Iso,
  cx: number,
  cy: number,
  r0: number,
  z: number,
  fill: string,
  rise0 = r0,
  ribs = 0
): string {
  const [x, y] = iso.g(cx, cy, z)
  const r = r0 * iso.k
  const rise = rise0 * iso.k
  const d = `M${n(x - r)} ${n(y)}A${n(r)} ${n(rise)} 0 0 1 ${n(x + r)} ${n(y)}A${n(r)} ${n(r / 2)} 0 0 1 ${n(x - r)} ${n(y)}Z`
  const shade = `M${n(x + r * 0.18)} ${n(y - rise * 0.98)}A${n(r)} ${n(rise)} 0 0 1 ${n(x + r)} ${n(y)}A${n(r)} ${n(r / 2)} 0 0 1 ${n(x + r * 0.42)} ${n(y + r * 0.45)}Q${n(x + r * 0.62)} ${n(y - rise * 0.4)} ${n(x + r * 0.18)} ${n(y - rise * 0.98)}Z`
  const glint = `M${n(x - r * 0.72)} ${n(y - rise * 0.35)}Q${n(x - r * 0.62)} ${n(y - rise * 0.8)} ${n(x - r * 0.2)} ${n(y - rise * 0.95)}`
  let out = path(d, { fill }) + path(shade, { fill: ink, stroke: false, fillOpacity: 0.22 })
  for (let i = 1; i <= ribs; i++) {
    const t = -1 + (2 * i) / (ribs + 1)
    const bx = x + r * t
    const by = y + (r / 2) * Math.sqrt(1 - t * t)
    out += path(`M${n(bx)} ${n(by)}Q${n(x + r * t * 0.95)} ${n(y - rise * 0.75)} ${n(x)} ${n(y - rise)}`, {
      width: 0.6,
      strokeOpacity: 0.45
    })
  }
  out += path(glint, { stroke: paper, width: 1.2, strokeOpacity: 0.55 })
  return out
}

/** A slim column standing at a building point, with a small capital. */
export function column(iso: Iso, u: number, v: number, z: number, h: number, fill: string, r = 2.4): string {
  const [x, yb] = iso.p(u, v, z)
  const yt = yb - h
  return (
    polygon(
      [
        [x - r, yb],
        [x + r, yb],
        [x + r, yt],
        [x - r, yt]
      ],
      { fill, width: 0.9 }
    ) +
    polygon(
      [
        [x + r * 0.2, yb],
        [x + r, yb],
        [x + r, yt],
        [x + r * 0.2, yt]
      ],
      { fill: ink, stroke: false, fillOpacity: 0.18 }
    )
  )
}

/** A soft cast shadow to the bottom-right: the hull of a footprint and its offset copy. */
export function shadow(points: readonly Pt[], height: number, opacity = 0.14): string {
  const dx = height * 0.32
  const dy = height * 0.12
  const all = [...points, ...points.map(([x, y]): Pt => [x + dx, y + dy])]
  return polygon(hull(all), { fill: ink, stroke: false, fillOpacity: opacity })
}

export function hull(list: readonly Pt[]): Pt[] {
  const s = [...list].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const cross = (o: Pt, a: Pt, b: Pt) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const lower: Pt[] = []
  for (const q of s) {
    while (lower.length >= 2 && cross(lower[lower.length - 2] as Pt, lower[lower.length - 1] as Pt, q) <= 0) lower.pop()
    lower.push(q)
  }
  const upper: Pt[] = []
  for (const q of [...s].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2] as Pt, upper[upper.length - 1] as Pt, q) <= 0) upper.pop()
    upper.push(q)
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)]
}

/** Footprint corners of a box at ground (or its base height), for shadows. */
export const footprint = (iso: Iso, b: Box): Pt[] => [
  iso.p(b.u0, b.v0, b.z0),
  iso.p(b.u1, b.v0, b.z0),
  iso.p(b.u1, b.v1, b.z0),
  iso.p(b.u0, b.v1, b.z0)
]

/** Smoke: three rising curls of ink, thriving only. */
export function smoke(at: Pt): string {
  const [x, y] = at
  return path(`M${n(x)} ${n(y)}c-4 -5 4 -8 0 -13s4 -8 1 -13M${n(x + 5)} ${n(y - 16)}c-3 -4 3 -6 0 -10`, {
    width: 1,
    strokeOpacity: 0.45
  })
}

/** A small pennant on a pole: brass, wordless. */
export function pennant(top: Pt, pole = 14): string {
  const [x, y] = top
  return (
    seg([x, y], [x, y - pole], { width: 1 }) +
    polygon(
      [
        [x, y - pole],
        [x + 11, y - pole + 2.5],
        [x, y - pole + 5.5]
      ],
      { fill: mat.brass, width: 0.9 }
    )
  )
}

/** An SVG document for a tile: `vb` is the view box in cell coordinates (the cell is `0 0 256 196`). */
export function svgDoc(vb: { x: number; y: number; w: number; h: number }, body: string, defs = ''): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${n(vb.w)}" height="${n(vb.h)}" viewBox="${n(vb.x)} ${n(vb.y)} ${n(vb.w)} ${n(vb.h)}">` +
    (defs ? `<defs>${defs}</defs>` : '') +
    `<g fill="none" stroke="${ink}" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round">${body}</g></svg>\n`
  )
}

/** The one gradient in the set: a faint top-left highlight on top faces. */
export const highlightId = 'ki-modern-highlight'
export const highlightDef = `<linearGradient id="${highlightId}" x1="0" y1="0" x2="0.75" y2="0.9"><stop offset="0" stop-color="#f5efe0" stop-opacity="0.34"/><stop offset="0.55" stop-color="#f5efe0" stop-opacity="0"/></linearGradient>`
