/** The twelve Modern terrain tiles: a top face, a stratified plinth and a small ink motif per terrain. */
import { type TerrainName, tokens } from '@knowledgeislands/tokens'
import {
  ellipse,
  face,
  hatch,
  highlightDef,
  highlightId,
  INRADIUS,
  type Iso,
  inHex,
  ink,
  lerp,
  mat,
  n,
  type Pt,
  paper,
  path,
  polygon,
  pts,
  rng,
  scatter,
  seg
} from './iso.ts'

export const terrainFill = (name: TerrainName): string => `var(--terrain-${name}, ${tokens.terrain[name]})`

/** The isometric tiles' water: `--tile-water`, from `color.tile.water` (never the flat chart's sea). */
export const tileWater = `var(--tile-water, ${tokens.tile.water})`

const CELL_BOTTOM = 196
const SIDE_BOTTOM = 159

export interface Drawn {
  readonly svg: string
  /** Extra canvas above the cell (the cell starts at y = 0). */
  readonly up: number
}

// ---------------------------------------------------------------------------------------------------------------
// Plinth and face

interface BaseOptions {
  /** Face height above ground level (cliffs stand proud; water sits lower). */
  readonly z?: number
  readonly fill: string
  readonly plinth?: string
  /** Colour of the thin lip under the face edge. */
  readonly lip?: string
  readonly water?: boolean
  readonly strata?: 'bands' | 'columns'
  readonly seed: string
}

export function plinth(iso: Iso, o: BaseOptions): string {
  const H = iso.hex(1, o.z ?? 0)
  const [, , r2, f3, l4] = H as [Pt, Pt, Pt, Pt, Pt, Pt]
  const fill = o.plinth ?? mat.plinth
  const leftBottom: Pt = [iso.ox - 128, SIDE_BOTTOM]
  const frontBottom: Pt = [iso.ox, CELL_BOTTOM]
  const rightBottom: Pt = [iso.ox + 128, SIDE_BOTTOM]
  const left = [l4, f3, frontBottom, leftBottom]
  const right = [f3, r2, rightBottom, frontBottom]
  const out: string[] = [face(left, fill, 'lit'), face(right, fill, 'shade')]
  const depth = frontBottom[1] - f3[1]
  const random = rng(`${o.seed}-plinth`)
  if (o.water) {
    // A water column: a few horizontal swell lines.
    for (const t of [0.3, 0.62]) {
      out.push(
        path(
          `M${pts([lerp(l4, leftBottom, t)])}L${pts([lerp(f3, frontBottom, t)])}L${pts([lerp(r2, rightBottom, t)])}`,
          {
            stroke: paper,
            width: 0.7,
            strokeOpacity: 0.28,
            dash: '10 6'
          }
        )
      )
    }
  } else {
    // Stratified rock: a darker middle band between two bedding lines, with a few joints.
    const bands = [0.34, 0.62]
    const [a, b] = bands as [number, number]
    const band = (t0: number, t1: number, side: 'l' | 'r') => {
      const [p0, p1, q0, q1] = side === 'l' ? [l4, f3, leftBottom, frontBottom] : [f3, r2, frontBottom, rightBottom]
      return [lerp(p0, q0, t0), lerp(p1, q1, t0), lerp(p1, q1, t1), lerp(p0, q0, t1)]
    }
    out.push(polygon(band(a, b, 'l'), { fill: ink, stroke: false, fillOpacity: 0.08 }))
    out.push(polygon(band(a, b, 'r'), { fill: ink, stroke: false, fillOpacity: 0.1 }))
    for (const t of bands) {
      out.push(polyline3(lerp(l4, leftBottom, t), lerp(f3, frontBottom, t), lerp(r2, rightBottom, t), 0.75, 0.42))
    }
    if (o.strata === 'columns') {
      out.push(columns(l4, f3, frontBottom, leftBottom, random, 0.34))
      out.push(columns(f3, r2, rightBottom, frontBottom, random, 0.42))
    } else {
      // Joints: short verticals within each band.
      for (const [t0, t1] of [
        [0, a],
        [a, b],
        [b, 1]
      ] as const) {
        for (let i = 0; i < 3; i++) {
          const side = random() < 0.5 ? 'l' : 'r'
          const s = 0.08 + random() * 0.84
          const [p0, p1, q0, q1] = side === 'l' ? [l4, f3, leftBottom, frontBottom] : [f3, r2, frontBottom, rightBottom]
          const top = lerp(lerp(p0, q0, t0), lerp(p1, q1, t0), s)
          const bottom = lerp(lerp(p0, q0, t1), lerp(p1, q1, t1), s)
          out.push(seg(lerp(top, bottom, 0.12), lerp(top, bottom, 0.88), { width: 0.6, strokeOpacity: 0.4 }))
        }
      }
      out.push(hatch(f3, r2, rightBottom, frontBottom, 7, 0.14, 0.02))
    }
  }
  // The lip: a thin band of surface material just under the face edge.
  if (o.lip) {
    const lip = Math.min(5, depth * 0.12)
    const down = (p: Pt): Pt => [p[0], p[1] + lip]
    out.push(polygon([l4, f3, r2, down(r2), down(f3), down(l4)], { fill: o.lip, width: 0.9 }))
    out.push(polygon([f3, r2, down(r2), down(f3)], { fill: ink, stroke: false, fillOpacity: 0.2 }))
  }
  return out.join('')
}

const polyline3 = (a: Pt, b: Pt, c: Pt, width: number, opacity: number) =>
  path(`M${pts([a])}L${pts([b])}L${pts([c])}`, { width, strokeOpacity: opacity })

/** Vertical cliff strata: irregular columns of rock. */
function columns(a: Pt, b: Pt, c: Pt, d: Pt, random: () => number, opacity: number): string {
  const out: string[] = []
  let t = 0.04
  while (t < 0.96) {
    const top = lerp(a, b, t)
    const bottom = lerp(d, c, t)
    const len = 0.45 + random() * 0.5
    out.push(`M${n(top[0])} ${n(top[1] + 2)}L${n(lerp(top, bottom, len)[0])} ${n(lerp(top, bottom, len)[1])}`)
    t += 0.05 + random() * 0.06
  }
  return path(out.join(''), { width: 0.7, strokeOpacity: opacity })
}

export function topFace(iso: Iso, o: BaseOptions): string {
  const H = iso.hex(1, o.z ?? 0)
  return polygon(H, { fill: o.fill }) + polygon(H, { fill: `url(#${highlightId})`, stroke: false })
}

const outline = (iso: Iso, z = 0) => polygon(iso.hex(1, z), {})

// ---------------------------------------------------------------------------------------------------------------
// Motifs

const tuft = (iso: Iso, x: number, y: number, s = 1, z = 0, opacity = 0.5): string => {
  const [bx, by] = iso.g(x, y, z)
  return path(
    `M${n(bx - 3 * s)} ${n(by)}l${n(-1.2 * s)} ${n(-3.6 * s)}M${n(bx)} ${n(by)}l0 ${n(-5 * s)}M${n(bx + 3 * s)} ${n(by)}l${n(1.2 * s)} ${n(-3.6 * s)}`,
    { width: 1, strokeOpacity: opacity }
  )
}

/** A small engraved pine: two stacked tiers, lit left half, shaded right half. */
export function pine(at: Pt, h: number, fill = mat.pine): string {
  const [x, y] = at
  const w = h * 0.42
  const out: string[] = [seg([x, y], [x, y - h * 0.18], { width: 1.4 })]
  const tiers: [number, number, number][] = [
    [y - h * 0.14, y - h * 0.72, w],
    [y - h * 0.46, y - h, w * 0.7]
  ]
  for (const [base, apex, half] of tiers) {
    const tri: Pt[] = [
      [x - half, base],
      [x, apex],
      [x + half, base]
    ]
    out.push(polygon(tri, { fill, width: 1 }))
    out.push(
      polygon(
        [
          [x, apex],
          [x + half, base],
          [x + half * 0.05, base + 1]
        ],
        { fill: ink, stroke: false, fillOpacity: 0.28 }
      )
    )
  }
  return out.join('')
}

/** A mound with contour arcs (hills). */
function mound(iso: Iso, x: number, y: number, w: number, h: number, fill: string): string {
  const [cx, cy] = iso.g(x, y)
  const d = `M${n(cx - w)} ${n(cy)}C${n(cx - w * 0.7)} ${n(cy - h * 1.15)} ${n(cx + w * 0.55)} ${n(cy - h * 1.2)} ${n(cx + w)} ${n(cy)}Q${n(cx)} ${n(cy + w * 0.22)} ${n(cx - w)} ${n(cy)}Z`
  const sh = `M${n(cx + w * 0.05)} ${n(cy - h * 0.86)}C${n(cx + w * 0.6)} ${n(cy - h * 0.8)} ${n(cx + w * 0.9)} ${n(cy - h * 0.3)} ${n(cx + w)} ${n(cy)}Q${n(cx + w * 0.5)} ${n(cy + w * 0.16)} ${n(cx + w * 0.15)} ${n(cy + w * 0.18)}C${n(cx + w * 0.4)} ${n(cy - h * 0.2)} ${n(cx + w * 0.3)} ${n(cy - h * 0.6)} ${n(cx + w * 0.05)} ${n(cy - h * 0.86)}Z`
  const contour = (k: number) =>
    `M${n(cx - w * k)} ${n(cy - h * (1 - k) * 0.55)}C${n(cx - w * k * 0.6)} ${n(cy - h * (1 - k) * 0.55 - h * k * 0.75)} ${n(cx + w * k * 0.5)} ${n(cy - h * (1 - k) * 0.55 - h * k * 0.8)} ${n(cx + w * k)} ${n(cy - h * (1 - k) * 0.55)}`
  return (
    path(d, { fill }) +
    path(sh, { fill: ink, stroke: false, fillOpacity: 0.16 }) +
    path(contour(0.62) + contour(0.3), { width: 0.7, strokeOpacity: 0.45 })
  )
}

/** A rocky peak (mountain): lit left face, shaded right face, ridge, optional snow cap. */
function peak(
  iso: Iso,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  random: () => number,
  snow = true
): string {
  const [cx, cy] = iso.g(x, y)
  const lean = (random() - 0.5) * w * 0.25
  const summit: Pt = [cx + lean, cy - h]
  const L: Pt = [cx - w, cy - 2]
  const F: Pt = [cx + w * 0.12, cy + w * 0.3]
  const Rr: Pt = [cx + w * 0.95, cy + 1]
  const shoulderL: Pt = lerp(L, summit, 0.55)
  const kinkL: Pt = [shoulderL[0] - w * 0.08, shoulderL[1] + h * 0.02]
  const out: string[] = []
  out.push(polygon([L, kinkL, summit, F], { fill }))
  out.push(polygon([L, kinkL, summit, F], { fill: paper, stroke: false, fillOpacity: 0.08 }))
  out.push(polygon([summit, Rr, F], { fill }))
  out.push(polygon([summit, Rr, F], { fill: ink, stroke: false, fillOpacity: 0.3 }))
  // engraved hatching on the shaded face, parallel to the ridge
  const lines: string[] = []
  for (let i = 1; i <= 6; i++) {
    const t = i / 7
    const a = lerp(F, Rr, t)
    const b = lerp(summit, Rr, t * 0.92)
    lines.push(`M${n(lerp(a, b, 0.1)[0])} ${n(lerp(a, b, 0.1)[1])}L${n(lerp(a, b, 0.75)[0])} ${n(lerp(a, b, 0.75)[1])}`)
  }
  out.push(path(lines.join(''), { width: 0.6, strokeOpacity: 0.4 }))
  out.push(seg(summit, F, { width: 1 }))
  // a secondary gully on the lit face
  const g0 = lerp(summit, L, 0.35)
  out.push(
    path(
      `M${pts([g0])}Q${n(g0[0] + 3)} ${n(g0[1] + h * 0.25)} ${n(lerp(L, F, 0.45)[0])} ${n(lerp(L, F, 0.45)[1] - 3)}`,
      { width: 0.7, strokeOpacity: 0.5 }
    )
  )
  if (snow) {
    const sL = lerp(summit, L, 0.3)
    const sR = lerp(summit, Rr, 0.28)
    const sF = lerp(summit, F, 0.34)
    const cap: Pt[] = [
      sL,
      [lerp(sL, sF, 0.5)[0], lerp(sL, sF, 0.5)[1] - 3],
      sF,
      [lerp(sF, sR, 0.5)[0], lerp(sF, sR, 0.5)[1] + 2],
      sR,
      summit
    ]
    out.push(polygon(cap, { fill: terrainFill('snow'), width: 1 }))
    out.push(
      polygon([summit, sF, [lerp(sF, sR, 0.5)[0], lerp(sF, sR, 0.5)[1] + 2], sR], {
        fill: ink,
        stroke: false,
        fillOpacity: 0.14
      })
    )
  }
  return out.join('')
}

/** Ribbon geometry in flat ground: from edge `a` to edge `b` (0 = E, then anticlockwise), `half` wide each side. */
export function ribbon(
  iso: Iso,
  a: number,
  b: number,
  half: number,
  z = 0,
  bend = 0
): { body: string; left: string; right: string } {
  const normal = (i: number): Pt => {
    const ang = (-i * 60 * Math.PI) / 180
    return [Math.cos(ang), Math.sin(ang)]
  }
  const rot = (v: Pt): Pt => [-v[1], v[0]]
  const na = normal(a)
  const nb = normal(b)
  const ma: Pt = [na[0] * INRADIUS, na[1] * INRADIUS]
  const mb: Pt = [nb[0] * INRADIUS, nb[1] * INRADIUS]
  const da: Pt = [-na[0], -na[1]]
  const La = rot(da)
  const Lb = rot(nb)
  const k = 70
  const bendV = rot(da)
  const side = (s: number) => {
    const A: Pt = [ma[0] + La[0] * half * s, ma[1] + La[1] * half * s]
    const B: Pt = [mb[0] + Lb[0] * half * s, mb[1] + Lb[1] * half * s]
    const c1: Pt = [A[0] + da[0] * k + bendV[0] * bend, A[1] + da[1] * k + bendV[1] * bend]
    const c2: Pt = [B[0] - nb[0] * k - bendV[0] * bend, B[1] - nb[1] * k - bendV[1] * bend]
    return [A, c1, c2, B].map(([x, y]) => iso.g(x, y, z)) as [Pt, Pt, Pt, Pt]
  }
  const [A1, c11, c12, B1] = side(1)
  const [A2, c21, c22, B2] = side(-1)
  const curve = (p: Pt, c1: Pt, c2: Pt, q: Pt) => `M${pts([p])}C${pts([c1, c2, q])}`
  const body = `M${pts([A1])}C${pts([c11, c12, B1])}L${pts([B2])}C${pts([c22, c21, A2])}Z`
  return { body, left: curve(A1, c11, c12, B1), right: curve(A2, c21, c22, B2) }
}

/** Centre line of a ribbon, offset `s` across it (−1…1 of `half`). */
export function ribbonLine(iso: Iso, a: number, b: number, half: number, s: number, z = 0, bend = 0): string {
  return ribbon(iso, a, b, half * Math.abs(s), z, bend)[s >= 0 ? 'left' : 'right']
}

// ---------------------------------------------------------------------------------------------------------------
// Tiles

const waves = (
  iso: Iso,
  random: () => number,
  count: number,
  z: number,
  colour: string,
  opacity: number,
  scale = 0.8
) =>
  scatter(random, count, 30, scale)
    .map(([x, y]) => {
      const [sx, sy] = iso.g(x, y, z)
      return path(`M${n(sx - 8)} ${n(sy)}q4 -3.2 8 0t8 0`, { stroke: colour, width: 1, strokeOpacity: opacity })
    })
    .join('')

function grassland(iso: Iso): Drawn {
  const random = rng('grassland')
  const fill = terrainFill('grassland')
  const tufts = scatter(random, 16, 26)
    .map(([x, y]) => tuft(iso, x, y, 0.9 + random() * 0.4))
    .join('')
  const flowers = scatter(random, 5, 30)
    .map(([x, y]) => ellipse(iso.g(x, y), 1.3, 1.3, { fill: paper, stroke: false, fillOpacity: 0.85 }))
    .join('')
  return {
    up: 0,
    svg:
      plinth(iso, { fill, lip: fill, seed: 'grassland' }) +
      topFace(iso, { fill, seed: 'grassland' }) +
      tufts +
      flowers +
      outline(iso)
  }
}

function forest(iso: Iso): Drawn {
  const random = rng('forest')
  const fill = terrainFill('forest')
  const trees = scatter(random, 19, 25, 0.86)
  const floor = scatter(random, 8, 24, 0.85)
    .map(([x, y]) => tuft(iso, x, y, 0.8, 0, 0.35))
    .join('')
  const drawn = trees.map(([x, y]) => pine(iso.g(x, y), 32 + random() * 14)).join('')
  return {
    up: 40,
    svg:
      plinth(iso, { fill, lip: fill, seed: 'forest' }) +
      topFace(iso, { fill, seed: 'forest' }) +
      outline(iso) +
      floor +
      trees
        .map(([x, y]) => ellipse(iso.g(x + 6, y + 4), 9, 3.2, { fill: ink, stroke: false, fillOpacity: 0.16 }))
        .join('') +
      drawn
  }
}

function hills(iso: Iso): Drawn {
  const random = rng('hills')
  const fill = terrainFill('hills')
  const mounds: [number, number, number, number][] = [
    [-44, -54, 42, 30],
    [40, -44, 44, 34],
    [-62, 30, 34, 22],
    [10, 18, 60, 44],
    [70, 46, 30, 20]
  ]
  const ticks = scatter(random, 8, 26, 0.85, (x, y) =>
    mounds.every(([mx, my, w]) => Math.hypot(x - mx, (y - my) * 0.6) > w * 0.9)
  )
    .map(([x, y]) => tuft(iso, x, y, 0.8, 0, 0.4))
    .join('')
  return {
    up: 20,
    svg:
      plinth(iso, { fill, lip: fill, seed: 'hills' }) +
      topFace(iso, { fill, seed: 'hills' }) +
      outline(iso) +
      ticks +
      mounds.map(([x, y, w, h]) => mound(iso, x, y, w, h, fill)).join('')
  }
}

function mountain(iso: Iso): Drawn {
  const random = rng('mountain')
  const fill = terrainFill('mountain')
  const scree = scatter(random, 10, 22, 0.85)
    .map(([x, y]) => {
      const [sx, sy] = iso.g(x, y)
      return path(`M${n(sx - 3)} ${n(sy)}l3 -3l3 3`, { width: 0.8, strokeOpacity: 0.5 })
    })
    .join('')
  return {
    up: 90,
    svg:
      plinth(iso, { fill, lip: fill, seed: 'mountain' }) +
      topFace(iso, { fill, seed: 'mountain' }) +
      outline(iso) +
      scree +
      peak(iso, 38, -44, 56, 92, fill, random, true) +
      peak(iso, -44, -22, 50, 70, fill, random, true) +
      peak(iso, 8, 34, 66, 110, fill, random, true) +
      peak(iso, 74, 42, 34, 40, fill, random, false)
  }
}

function coastal(iso: Iso): Drawn {
  const random = rng('coastal')
  const land = terrainFill('coastal')
  const sand = terrainFill('sand')
  const drop = 6
  const water = tileWater
  // Shoreline in flat ground, west side to east side.
  const shore: Pt[] = [
    [-128, 18],
    [-90, 30],
    [-50, 12],
    [-8, 26],
    [36, 8],
    [80, -6],
    [128, -2]
  ]
  const H = iso.hex(1, 0)
  const [t0, r1, , , , l5] = H as [Pt, Pt, Pt, Pt, Pt, Pt]
  const shoreScreen = smooth(shore.map(([x, y]) => iso.g(x, y)))
  const landPath = `M${pts([l5])}L${pts([t0])}L${pts([r1])}L${pts([iso.g(128, -2)])}${shoreScreen.reverse}Z`
  const bankDown = smooth(shore.map(([x, y]) => iso.g(x, y, -drop)))
  const bank = `M${pts([iso.g(-128, 18)])}${shoreScreen.forward.replace(/^M/, 'L')}L${pts([iso.g(128, -2, -drop)])}${bankDown.reverse}Z`
  const beach = smooth(shore.map(([x, y]) => iso.g(x * 0.98, y - 12)))
  const sandBand = `M${pts([iso.g(-128, 6)])}${beach.forward.replace(/^M/, 'L')}L${pts([iso.g(128, -2)])}${shoreScreen.reverse}Z`
  const foam = shore
    .slice(1, -1)
    .map(([x, y]) => {
      const [sx, sy] = iso.g(x + 4, y + 16, -drop)
      return path(`M${n(sx - 7)} ${n(sy)}q3.5 -2.5 7 0t7 0`, { stroke: paper, width: 1, strokeOpacity: 0.7 })
    })
    .join('')
  const grass = scatter(random, 7, 24, 0.8, (x, y) => y < shoreY(shore, x) - 22)
    .map(([x, y]) => tuft(iso, x, y, 0.85, 0, 0.45))
    .join('')
  const dots = scatter(random, 14, 9, 0.9, (x, y) => y < shoreY(shore, x) - 2 && y > shoreY(shore, x) - 12)
    .map(([x, y]) => ellipse(iso.g(x, y), 0.7, 0.7, { fill: ink, stroke: false, fillOpacity: 0.45 }))
    .join('')
  const ripple = scatter(random, 5, 30, 0.82, (x, y) => y > shoreY(shore, x) + 30)
    .map(([x, y]) => {
      const [sx, sy] = iso.g(x, y, -drop)
      return path(`M${n(sx - 8)} ${n(sy)}q4 -3 8 0t8 0`, { stroke: paper, width: 1, strokeOpacity: 0.55 })
    })
    .join('')
  return {
    up: 0,
    svg:
      plinth(iso, { fill: water, z: -drop, seed: 'coastal', lip: water }) +
      topFace(iso, { fill: water, z: -drop, seed: 'coastal' }) +
      polygon(iso.hex(1, -drop), { fill: paper, stroke: false, fillOpacity: 0.16 }) +
      outline(iso, -drop) +
      ripple +
      path(bank, { fill: sand }) +
      path(bank, { fill: ink, stroke: false, fillOpacity: 0.22 }) +
      path(landPath, { fill: land }) +
      path(landPath, { fill: `url(#${highlightId})`, stroke: false }) +
      path(sandBand, { fill: sand, stroke: false }) +
      path(`M${pts([iso.g(-128, 6)])}${beach.forward.replace(/^M/, 'L')}`, {
        width: 0.7,
        strokeOpacity: 0.4,
        dash: '2 3'
      }) +
      dots +
      grass +
      foam +
      path(`M${pts([iso.g(-128, 18)])}${shoreScreen.forward.replace(/^M/, 'L')}`, { width: 1.25 }) +
      path(`M${pts([iso.g(-128, 18)])}L${pts([l5])}L${pts([t0])}L${pts([r1])}L${pts([iso.g(128, -2)])}`, {})
  }
}

const shoreY = (shore: Pt[], x: number): number => {
  for (let i = 0; i < shore.length - 1; i++) {
    const [x0, y0] = shore[i] as Pt
    const [x1, y1] = shore[i + 1] as Pt
    if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
  }
  return 0
}

/** Catmull-Rom through points as cubic segments; `forward` starts with an M, `reverse` with L. */
function smooth(list: Pt[]): { forward: string; reverse: string } {
  const seg3 = (p: Pt[]) => {
    let d = ''
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[Math.max(0, i - 1)] as Pt
      const p1 = p[i] as Pt
      const p2 = p[i + 1] as Pt
      const p3 = p[Math.min(p.length - 1, i + 2)] as Pt
      const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
      const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
      d += `C${pts([c1, c2, p2])}`
    }
    return d
  }
  const rev = [...list].reverse()
  return { forward: `M${pts([list[0] as Pt])}${seg3(list)}`, reverse: `L${pts([rev[0] as Pt])}${seg3(rev)}` }
}

function cliffs(iso: Iso): Drawn {
  const random = rng('cliffs')
  const fill = terrainFill('cliffs')
  const turf = terrainFill('grassland')
  const z = 14
  const H = iso.hex(1, z)
  // A turf cap over most of the face, leaving a bare rock rim at the front.
  const cap = iso.hex(0.9, z).map(([x, y]): Pt => [x - 2, y - 3])
  const rocks = scatter(random, 4, 40, 0.6)
    .map(([x, y]) => {
      const [sx, sy] = iso.g(x, y, z)
      return (
        polygon(
          [
            [sx - 9, sy],
            [sx - 6, sy - 7],
            [sx + 1, sy - 9],
            [sx + 8, sy - 4],
            [sx + 9, sy],
            [sx, sy + 3]
          ],
          { fill, width: 1 }
        ) +
        polygon(
          [
            [sx + 1, sy - 9],
            [sx + 8, sy - 4],
            [sx + 9, sy],
            [sx, sy + 3]
          ],
          { fill: ink, stroke: false, fillOpacity: 0.25 }
        )
      )
    })
    .join('')
  const tufts = scatter(random, 9, 24, 0.7)
    .map(([x, y]) => tuft(iso, x, y - 6, 0.85, z, 0.45))
    .join('')
  return {
    up: z,
    svg:
      plinth(iso, { fill, z, seed: 'cliffs', strata: 'columns', plinth: fill }) +
      topFace(iso, { fill, z, seed: 'cliffs' }) +
      polygon(cap, { fill: turf, width: 0.9, strokeOpacity: 0.6 }) +
      polygon(cap, { fill: `url(#${highlightId})`, stroke: false }) +
      tufts +
      rocks +
      polygon(H, {}) +
      path(`M${pts([H[4] as Pt])}L${pts([H[3] as Pt])}L${pts([H[2] as Pt])}`, { width: 1.8 })
  }
}

function sandTile(iso: Iso): Drawn {
  const random = rng('sand')
  const fill = terrainFill('sand')
  const dunes: [number, number, number][] = [
    [-44, -48, 44],
    [40, -20, 52],
    [-30, 30, 56],
    [56, 62, 30]
  ]
  const duneSvg = dunes
    .map(([x, y, w]) => {
      const [cx, cy] = iso.g(x, y)
      const crest = `M${n(cx - w)} ${n(cy + 4)}C${n(cx - w * 0.5)} ${n(cy - 9)} ${n(cx + w * 0.2)} ${n(cy - 10)} ${n(cx + w)} ${n(cy + 2)}`
      const lee = `${crest}C${n(cx + w * 0.4)} ${n(cy + 6)} ${n(cx - w * 0.3)} ${n(cy + 8)} ${n(cx - w)} ${n(cy + 4)}Z`
      const ripple = `M${n(cx - w * 0.6)} ${n(cy + 9)}C${n(cx - w * 0.2)} ${n(cy + 3)} ${n(cx + w * 0.3)} ${n(cy + 3)} ${n(cx + w * 0.7)} ${n(cy + 8)}`
      return (
        path(lee, { fill: ink, stroke: false, fillOpacity: 0.1 }) +
        path(crest, { width: 1, strokeOpacity: 0.6 }) +
        path(ripple, { width: 0.7, strokeOpacity: 0.35 })
      )
    })
    .join('')
  const stipple = scatter(random, 40, 9, 0.88)
    .map(([x, y]) => ellipse(iso.g(x, y), 0.65, 0.65, { fill: ink, stroke: false, fillOpacity: 0.4 }))
    .join('')
  return {
    up: 0,
    svg:
      plinth(iso, { fill, lip: fill, seed: 'sand' }) +
      topFace(iso, { fill, seed: 'sand' }) +
      stipple +
      duneSvg +
      outline(iso)
  }
}

function river(iso: Iso): Drawn {
  const random = rng('river')
  const bankFill = terrainFill('grassland')
  const water = terrainFill('river')
  const drop = 3
  const r = ribbon(iso, 1, 4, 34, -drop, 10)
  const bankEdge = ribbon(iso, 1, 4, 38, 0, 10)
  const flow = [-0.45, 0.1, 0.55]
    .map((s, i) =>
      path(ribbonLine(iso, 1, 4, 34, s, -drop, 10), {
        stroke: paper,
        width: 1,
        strokeOpacity: 0.7,
        dash: i === 1 ? '14 9 4 9' : '9 12'
      })
    )
    .join('')
  const tufts = scatter(random, 10, 24, 0.85, (x, y) => Math.abs(x * 0.96 + y * 0.28 - 0) > 60)
    .map(([x, y]) => tuft(iso, x, y, 0.9))
    .join('')
  const H = iso.hex(1, 0)
  return {
    up: 0,
    svg:
      plinth(iso, { fill: bankFill, lip: bankFill, seed: 'river', plinth: mat.plinth }) +
      topFace(iso, { fill: bankFill, seed: 'river' }) +
      tufts +
      path(bankEdge.body, { fill: terrainFill('sand'), stroke: false }) +
      path(r.body, { fill: water, stroke: false }) +
      path(r.left, { stroke: ink, width: 0.8, strokeOpacity: 0.5 }) +
      path(bankEdge.left, { width: 1.1 }) +
      path(bankEdge.right, { width: 1.1 }) +
      flow +
      polygon(H, {})
  }
}

function marsh(iso: Iso): Drawn {
  const random = rng('marsh')
  const fill = terrainFill('marsh')
  const water = terrainFill('river')
  const pools: [number, number, number][] = [
    [-46, -40, 26],
    [30, -54, 18],
    [42, 22, 30],
    [-36, 50, 20]
  ]
  const poolSvg = pools
    .map(([x, y, rr]) => {
      const c = iso.g(x, y)
      return (
        ellipse([c[0], c[1] + 1], rr, rr * 0.42, { fill: ink, stroke: false, fillOpacity: 0.2 }) +
        ellipse(c, rr, rr * 0.4, { fill: water, width: 1 })
      )
    })
    .join('')
  const dashes = pools
    .map(([x, y, rr]) => {
      const [cx, cy] = iso.g(x, y)
      return path(
        `M${n(cx - rr * 0.5)} ${n(cy)}h${n(rr * 0.5)}M${n(cx + rr * 0.1)} ${n(cy + rr * 0.18)}h${n(rr * 0.4)}`,
        { stroke: paper, width: 1, strokeOpacity: 0.7 }
      )
    })
    .join('')
  const reeds = scatter(random, 12, 24, 0.85, (x, y) =>
    pools.every(([px, py, rr]) => Math.hypot(x - px, (y - py) * 0.5) > rr + 4)
  )
    .map(([x, y]) => {
      const [bx, by] = iso.g(x, y)
      const stems = [-3, 0, 3]
        .map((dx, i) => `M${n(bx + dx)} ${n(by)}l${n(dx * 0.3)} ${n(-9 - (i === 1 ? 4 : 0))}`)
        .join('')
      return (
        path(stems, { width: 1, strokeOpacity: 0.8 }) +
        ellipse([bx + 0.4, by - 12.5], 1.1, 2.6, { fill: mat.timber, width: 0.7 })
      )
    })
    .join('')
  const flats = scatter(random, 8, 22, 0.85)
    .map(([x, y]) => {
      const [sx, sy] = iso.g(x, y)
      return path(`M${n(sx - 5)} ${n(sy)}h10`, { width: 0.8, strokeOpacity: 0.4 })
    })
    .join('')
  return {
    up: 10,
    svg:
      plinth(iso, { fill, lip: fill, seed: 'marsh' }) +
      topFace(iso, { fill, seed: 'marsh' }) +
      outline(iso) +
      flats +
      poolSvg +
      dashes +
      reeds
  }
}

function snow(iso: Iso): Drawn {
  const random = rng('snow')
  const fill = terrainFill('snow')
  const drifts = [
    [-40, -40, 50],
    [36, 6, 60],
    [-30, 52, 40]
  ]
    .map(([x, y, w]) => {
      const [cx, cy] = iso.g(x as number, y as number)
      const ww = w as number
      return (
        path(
          `M${n(cx - ww)} ${n(cy + 3)}C${n(cx - ww * 0.4)} ${n(cy - 7)} ${n(cx + ww * 0.4)} ${n(cy - 7)} ${n(cx + ww)} ${n(cy + 3)}C${n(cx + ww * 0.4)} ${n(cy + 1)} ${n(cx - ww * 0.4)} ${n(cy + 1)} ${n(cx - ww)} ${n(cy + 3)}Z`,
          {
            fill: mat.slate,
            stroke: false,
            fillOpacity: 0.12
          }
        ) +
        path(
          `M${n(cx - ww)} ${n(cy + 3)}C${n(cx - ww * 0.4)} ${n(cy - 7)} ${n(cx + ww * 0.4)} ${n(cy - 7)} ${n(cx + ww)} ${n(cy + 3)}`,
          { width: 0.8, strokeOpacity: 0.4 }
        )
      )
    })
    .join('')
  const crosses = scatter(random, 14, 26, 0.85)
    .map(([x, y]) => {
      const [sx, sy] = iso.g(x, y)
      return path(`M${n(sx - 2.5)} ${n(sy)}h5M${n(sx)} ${n(sy - 2.5)}v5`, { width: 0.9, strokeOpacity: 0.35 })
    })
    .join('')
  const trees = [
    [70, -30],
    [-78, 8]
  ]
    .map(
      ([x, y]) =>
        pine(iso.g(x as number, y as number), 24) +
        path(`M${n(iso.g(x as number, y as number)[0] - 6)} ${n(iso.g(x as number, y as number)[1] - 6)}l6 -9l6 9`, {
          stroke: paper,
          width: 1.6,
          strokeOpacity: 0.9
        })
    )
    .join('')
  return {
    up: 26,
    svg:
      plinth(iso, { fill: mat.stone, lip: fill, seed: 'snow' }) +
      topFace(iso, { fill, seed: 'snow' }) +
      outline(iso) +
      drifts +
      crosses +
      trees
  }
}

function volcanic(iso: Iso): Drawn {
  const random = rng('volcanic')
  const fill = terrainFill('volcanic')
  const [cx, cy] = iso.g(6, -24)
  const w = 58
  const h = 34
  const cone = `M${n(cx - w)} ${n(cy + 8)}L${n(cx - 15)} ${n(cy - h)}L${n(cx + 15)} ${n(cy - h)}L${n(cx + w)} ${n(cy + 8)}Q${n(cx)} ${n(cy + 24)} ${n(cx - w)} ${n(cy + 8)}Z`
  const coneShade = `M${n(cx + 2)} ${n(cy - h)}L${n(cx + 15)} ${n(cy - h)}L${n(cx + w)} ${n(cy + 8)}Q${n(cx + 30)} ${n(cy + 18)} ${n(cx + 8)} ${n(cy + 16)}Z`
  const crater = ellipse([cx, cy - h], 15, 4.5, { fill: ink, fillOpacity: 0.6 })
  const ember = ellipse([cx, cy - h + 0.8], 8, 2, { fill: mat.brass, stroke: false, fillOpacity: 0.65 })
  const fissures: string[] = []
  for (let i = 0; i < 7; i++) {
    const a = Math.PI * (0.15 + (i / 6) * 0.7) + (random() - 0.5) * 0.2
    let x = 6 + Math.cos(a) * 46
    let y = -24 + Math.sin(a) * 46 * 1.4
    let d = `M${pts([iso.g(x, y)])}`
    const len = 3 + Math.floor(random() * 2)
    for (let k = 0; k < len; k++) {
      x += Math.cos(a + (random() - 0.5) * 0.9) * 13
      y += Math.sin(a + (random() - 0.5) * 0.9) * 18
      if (!inHex(x, y, 0.9)) break
      d += `L${pts([iso.g(x, y)])}`
    }
    fissures.push(d)
  }
  const blocks = scatter(random, 6, 30, 0.8, (x, y) => Math.hypot(x - 6, y + 24) > 70)
    .map(([x, y]) => {
      const [sx, sy] = iso.g(x, y)
      return polygon(
        [
          [sx - 5, sy],
          [sx - 3, sy - 5],
          [sx + 4, sy - 5],
          [sx + 6, sy]
        ],
        { fill: ink, fillOpacity: 0.5, width: 0.8 }
      )
    })
    .join('')
  return {
    up: 26,
    svg:
      plinth(iso, { fill, lip: fill, seed: 'volcanic', plinth: 'var(--tile-basalt, #4a3c39)' }) +
      topFace(iso, { fill, seed: 'volcanic' }) +
      outline(iso) +
      path(fissures.join(''), { stroke: mat.brass, width: 1.2, strokeOpacity: 0.85 }) +
      blocks +
      path(cone, { fill }) +
      path(coneShade, { fill: ink, stroke: false, fillOpacity: 0.28 }) +
      path(
        `M${n(cx - 34)} ${n(cy - 8)}L${n(cx - 12)} ${n(cy - h + 2)}M${n(cx - 20)} ${n(cy + 6)}L${n(cx - 6)} ${n(cy - h + 6)}M${n(cx + 18)} ${n(cy - 4)}L${n(cx + 10)} ${n(cy - h + 4)}`,
        { width: 0.6, strokeOpacity: 0.45, stroke: paper }
      ) +
      crater +
      ember
  }
}

function ocean(iso: Iso): Drawn {
  const random = rng('ocean')
  const fill = tileWater
  const drop = 10
  return {
    up: 0,
    svg:
      plinth(iso, { fill, plinth: 'var(--tile-deep, #22445f)', z: -drop, water: true, seed: 'ocean' }) +
      topFace(iso, { fill, z: -drop, seed: 'ocean' }) +
      waves(iso, random, 9, -drop, paper, 0.5) +
      outline(iso, -drop)
  }
}

export const terrainDrawers: Record<TerrainName, (iso: Iso) => Drawn> = {
  grassland,
  forest,
  hills,
  mountain,
  coastal,
  cliffs,
  sand: sandTile,
  river,
  marsh,
  snow,
  volcanic,
  ocean
}

export const terrainDefs = highlightDef
