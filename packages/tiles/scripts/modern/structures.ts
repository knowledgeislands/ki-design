/**
 * The seventeen Modern structures, each drawn alone on a transparent ground in the thriving state. Lit windows,
 * smoke, lamps and pennants are returned separately (`lit`) so the quiet state can leave them out.
 */
import {
  type Box,
  box,
  boxOf,
  column,
  cylinder,
  dome,
  ellipse,
  face,
  footprint,
  gable,
  hatch,
  Iso,
  ink,
  lerp,
  mat,
  n,
  opening,
  type Pt,
  paper,
  path,
  pennant,
  polygon,
  pts,
  pyramid,
  rng,
  seg,
  shadow,
  smoke
} from './iso.ts'
import { terrainFill } from './terrain.ts'

export interface Structure {
  readonly body: string
  readonly lit: string
  /** View box in cell coordinates; the anchor hex's cell is `0 0 256 196`. */
  readonly vb: { readonly x: number; readonly y: number; readonly w: number; readonly h: number }
}

interface Parts {
  body: string[]
  lit: string[]
}

const parts = (): Parts => ({ body: [], lit: [] })
const single = (p: Parts, up: number): Structure => ({
  body: p.body.join(''),
  lit: p.lit.join(''),
  vb: { x: 0, y: -up, w: 256, h: 196 + up }
})

const dark = (opacity = 0.78) => ({ fill: ink, fillOpacity: opacity })
const win = (
  iso: Iso,
  b: Box,
  side: 'left' | 'right',
  s: number,
  z: number,
  w: number,
  h: number,
  p: Parts,
  arch = true
) => {
  p.body.push(opening(iso, b, side, s, z, w, h, ink, arch, 0.72))
  p.lit.push(opening(iso, b, side, s, z, w, h, mat.brass, arch))
}
const door = (
  iso: Iso,
  b: Box,
  side: 'left' | 'right',
  s: number,
  z: number,
  w: number,
  h: number,
  fill: string = mat.timber,
  arch = true
) => opening(iso, b, side, s, z, w, h, fill, arch) + opening(iso, b, side, s, z, w, h, ink, arch, 0.3)

/** Horizontal string course lines across both visible faces of a box at height `z`. */
const course = (iso: Iso, b: Box, z: number, opacity = 0.5) =>
  path(`M${pts([iso.p(b.u0, b.v1, z)])}L${pts([iso.p(b.u0, b.v0, z)])}L${pts([iso.p(b.u1, b.v0, z)])}`, {
    width: 0.7,
    strokeOpacity: opacity
  })

/** Stepped base of classical buildings. */
function steps(
  iso: Iso,
  p: Parts,
  u: number,
  v: number,
  w: number,
  d: number,
  count = 2,
  rise = 4,
  shrink = 8,
  z = 0
): number {
  for (let i = 0; i < count; i++) {
    p.body.push(
      box(iso, {
        u,
        v,
        w: w - i * shrink,
        d: d - i * shrink,
        h: rise,
        z: z + i * rise,
        fill: i === 0 ? mat.stone : mat.limestone
      })
    )
  }
  return z + count * rise
}

// ---------------------------------------------------------------------------------------------------------------
// Hero structures

export function library(iso: Iso, p: Parts = parts(), z0 = 0): Parts {
  const base = boxOf({ u: 0, v: 0, w: 100, d: 100, h: 4, z: z0 })
  p.body.push(shadow(footprint(iso, base), 50))
  const z = steps(iso, p, 0, 0, 100, 100, 2, 4, 8, z0)
  const main = { u: 6, v: 6, w: 70, d: 70, h: 30, z }
  const mb = boxOf(main)
  p.body.push(box(iso, { ...main, fill: mat.limestone, hatchRight: true }))
  for (const s of [-14, 8, 30]) win(iso, mb, 'right', s, z + 9, 7, 11, p)
  for (const s of [32]) win(iso, mb, 'left', s, z + 9, 7, 11, p)
  p.body.push(course(iso, mb, z + 6, 0.35))
  p.body.push(box(iso, { u: 6, v: 6, w: 78, d: 78, h: 4, z: z + 30, fill: mat.limestone }))
  const [fx, fy] = Iso.flat(6, 6)
  p.body.push(cylinder(iso, fx, fy, 27, 11, z + 34, mat.limestone))
  for (const a of [0.15, 0.38, 0.62, 0.85]) {
    const ang = Math.PI * a
    const [wx, wy] = iso.g(fx + Math.cos(ang) * 27, fy + Math.sin(ang) * 27, z + 37)
    p.body.push(
      polygon(
        [
          [wx - 1.6, wy],
          [wx + 1.6, wy],
          [wx + 1.6, wy - 6],
          [wx - 1.6, wy - 6]
        ],
        { ...dark(0.7), width: 0.6 }
      )
    )
  }
  p.body.push(dome(iso, fx, fy, 28, z + 45, mat.slate, 27, 3))
  const [lx, ly] = iso.g(fx, fy, z + 45 + 27)
  p.body.push(
    polygon(
      [
        [lx - 4, ly + 1],
        [lx + 4, ly + 1],
        [lx + 4, ly - 7],
        [lx - 4, ly - 7]
      ],
      { fill: mat.limestone, width: 1 }
    )
  )
  p.body.push(
    path(`M${n(lx - 5)} ${n(ly - 7)}Q${n(lx)} ${n(ly - 14)} ${n(lx + 5)} ${n(ly - 7)}Z`, { fill: mat.slate, width: 1 })
  )
  p.body.push(seg([lx, ly - 11], [lx, ly - 18], { width: 1 }))
  p.body.push(ellipse([lx, ly - 19], 1.8, 1.8, { fill: mat.brass, width: 0.8 }))
  p.lit.push(
    polygon(
      [
        [lx - 2.2, ly - 1],
        [lx + 2.2, ly - 1],
        [lx + 2.2, ly - 5.5],
        [lx - 2.2, ly - 5.5]
      ],
      { fill: mat.brass, stroke: false }
    )
  )
  // Portico on the lit face.
  const pu = mb.u0 - 9
  p.body.push(box(iso, { u: pu + 1, v: 6, w: 20, d: 62, h: 2, z, fill: mat.limestone }))
  p.body.push(door(iso, mb, 'left', 6, z, 11, 14))
  p.lit.push(opening(iso, mb, 'left', 6, z, 11, 14, mat.brass, true, 0.55))
  for (const v of [32, 15, -3, -20]) p.body.push(column(iso, pu - 6, v, z + 2, 25, mat.limestone))
  const ent = { u: pu, v: 6, w: 20, d: 62, h: 5, z: z + 27 }
  p.body.push(box(iso, { ...ent, fill: mat.limestone }))
  const eb = boxOf(ent)
  p.body.push(gable(iso, { ...eb, z1: eb.z1 }, 'u', 13, mat.slate, mat.limestone, 2))
  const apexL = iso.p(eb.u0, 6, eb.z1 + 13)
  p.body.push(
    path(
      `M${pts([iso.p(eb.u0, eb.v0 + 6, eb.z1 + 2)])}L${pts([iso.p(eb.u0, eb.v1 - 6, eb.z1 + 2)])}L${pts([iso.p(eb.u0, 6, eb.z1 + 10)])}Z`,
      { width: 0.6, strokeOpacity: 0.45 }
    )
  )
  p.body.push(ellipse(apexL, 1.6, 1.6, { fill: mat.brass, width: 0.7 }))
  return p
}

export function councilHall(iso: Iso, p: Parts = parts(), z0 = 0): Parts {
  const base = boxOf({ u: 0, v: 0, w: 128, d: 88, h: 3, z: z0 })
  p.body.push(shadow(footprint(iso, base), 50))
  const z = steps(iso, p, 0, 0, 128, 88, 3, 3, 7, z0)
  const cella = { u: 4, v: 4, w: 88, d: 48, h: 27, z }
  const cb = boxOf(cella)
  p.body.push(box(iso, { ...cella, fill: mat.stone }))
  p.body.push(door(iso, cb, 'left', 6, z, 13, 16))
  p.lit.push(opening(iso, cb, 'left', 6, z, 13, 16, mat.brass, true, 0.55))
  for (const s of [-22, 4, 30]) {
    p.body.push(opening(iso, cb, 'right', s, z + 8, 6, 9, ink, true, 0.6))
    p.lit.push(opening(iso, cb, 'right', s, z + 8, 6, 9, mat.brass, true))
  }
  const cols: [number, number][] = []
  const uFront = -52
  const vFront = -30
  for (const v of [32, 16, 0, -14]) cols.push([uFront, v])
  for (const u of [-52, -36, -20, -4, 12, 28, 44]) cols.push([u, vFront])
  cols.sort((a, b) => b[0] + b[1] - (a[0] + a[1]))
  for (const [u, v] of cols) p.body.push(column(iso, u, v, z, 27, mat.limestone, 2.6))
  const ent = { u: -2, v: 2, w: 112, d: 72, h: 6, z: z + 27 }
  const eb = boxOf(ent)
  p.body.push(box(iso, { ...ent, fill: mat.limestone }))
  p.body.push(course(iso, eb, z + 30, 0.4))
  p.body.push(gable(iso, eb, 'u', 20, mat.slate, mat.limestone, 3))
  // Tympanum and acroteria.
  p.body.push(
    path(
      `M${pts([iso.p(eb.u0, eb.v0 + 8, eb.z1 + 2)])}L${pts([iso.p(eb.u0, eb.v1 - 8, eb.z1 + 2)])}L${pts([iso.p(eb.u0, 2, eb.z1 + 15)])}Z`,
      { width: 0.6, strokeOpacity: 0.45 }
    )
  )
  p.body.push(ellipse(iso.p(eb.u0, 2, eb.z1 + 8), 3.2, 3.2, { fill: mat.brass, width: 0.8 }))
  const apex = iso.p(eb.u0 - 1, 2, eb.z1 + 20)
  p.body.push(ellipse(apex, 1.8, 1.8, { fill: mat.brass, width: 0.7 }))
  p.lit.push(pennant(iso.p(eb.u1 - 4, 2, eb.z1 + 20), 16))
  return p
}

export function tower(iso: Iso, p: Parts = parts(), z0 = 0): Parts {
  const base = boxOf({ u: 0, v: 0, w: 44, d: 44, h: 6, z: z0 })
  p.body.push(shadow(footprint(iso, base), 150, 0.12))
  p.body.push(box(iso, { u: 0, v: 0, w: 44, d: 44, h: 6, z: z0, fill: mat.stone }))
  const shaft = { u: 0, v: 0, w: 32, d: 32, h: 98, z: z0 + 6 }
  const sb = boxOf(shaft)
  p.body.push(box(iso, { ...shaft, fill: mat.limestone, hatchRight: true }))
  for (const z of [z0 + 38, z0 + 72]) p.body.push(course(iso, sb, z, 0.45))
  p.body.push(door(iso, sb, 'left', 0, z0 + 6, 9, 13))
  p.body.push(opening(iso, sb, 'left', 0, z0 + 46, 4, 12, ink, true, 0.8))
  p.body.push(opening(iso, sb, 'right', 0, z0 + 24, 4, 11, ink, true, 0.8))
  p.body.push(opening(iso, sb, 'right', 0, z0 + 52, 4, 11, ink, true, 0.8))
  win(iso, sb, 'left', 0, z0 + 80, 7, 12, p)
  win(iso, sb, 'right', 0, z0 + 82, 6, 10, p)
  // Corbelled parapet with merlons.
  const par = { u: 0, v: 0, w: 40, d: 40, h: 9, z: z0 + 104 }
  const pb = boxOf(par)
  p.body.push(box(iso, { u: 0, v: 0, w: 36, d: 36, h: 3, z: z0 + 101, fill: mat.limestone }))
  p.body.push(box(iso, { ...par, fill: mat.limestone, top: false }))
  p.body.push(
    face(
      [iso.p(pb.u0, pb.v0, pb.z1), iso.p(pb.u1, pb.v0, pb.z1), iso.p(pb.u1, pb.v1, pb.z1), iso.p(pb.u0, pb.v1, pb.z1)],
      mat.slate,
      'shade'
    )
  )
  const merlons: [number, number][] = []
  for (const s of [-17, -5.5, 5.5, 17]) {
    merlons.push([s, 17], [17, s], [s, -17], [-17, s])
  }
  const unique = [...new Map(merlons.map((m) => [m.join(','), m])).values()]
  unique.sort((a, b) => b[0] + b[1] - (a[0] + a[1]))
  for (const [u, v] of unique) p.body.push(box(iso, { u, v, w: 6, d: 6, h: 6, z: pb.z1, fill: mat.limestone }))
  p.lit.push(pennant(iso.p(0, 0, pb.z1), 22))
  return p
}

export function lighthouse(iso: Iso, p: Parts = parts()): Parts {
  const random = rng('lighthouse')
  p.body.push(shadow(iso.arc(0, 0, 30, 0, 0, Math.PI * 2, 16), 150, 0.12))
  // Keeper's hut behind.
  const hut = { u: 34, v: 12, w: 26, d: 22, h: 14 }
  const hb = boxOf(hut)
  p.body.push(box(iso, { ...hut, fill: mat.limestone }))
  p.body.push(gable(iso, hb, 'u', 9, mat.slate, mat.limestone, 2))
  // Rocks at the foot.
  const rocks: [number, number, number][] = [
    [-30, -6, 12],
    [26, 18, 10],
    [-14, 22, 14],
    [10, 28, 9],
    [30, -2, 11]
  ]
  rocks.sort((a, b) => a[1] - b[1])
  for (const [x, y, s] of rocks) {
    const [cx, cy] = iso.g(x, y)
    const j = () => (random() - 0.5) * s * 0.3
    const rock: Pt[] = [
      [cx - s, cy + j()],
      [cx - s * 0.6, cy - s * 0.7 + j()],
      [cx + s * 0.2, cy - s * 0.85],
      [cx + s, cy - s * 0.2 + j()],
      [cx + s * 0.8, cy + s * 0.35],
      [cx - s * 0.3, cy + s * 0.45]
    ]
    p.body.push(polygon(rock, { fill: mat.stone }))
    p.body.push(
      polygon([rock[2] as Pt, rock[3] as Pt, rock[4] as Pt, [cx, cy + s * 0.1]], {
        fill: ink,
        stroke: false,
        fillOpacity: 0.25
      })
    )
  }
  p.body.push(cylinder(iso, 0, 0, 25, 8, 0, mat.stone))
  p.body.push(cylinder(iso, 0, 0, 20, 104, 8, mat.limestone, mat.limestone, 13))
  const r = (z: number) => 20 - ((z - 8) / 104) * 7
  for (const [z1, z2] of [
    [36, 48],
    [76, 88]
  ] as const) {
    p.body.push(cylinder(iso, 0, 0, r(z1), z2 - z1, z1, mat.brick, false, r(z2)))
  }
  const [dx, dy] = iso.g(-Math.cos(Math.PI * 0.35) * 19.5, Math.sin(Math.PI * 0.35) * 19.5, 8)
  p.body.push(
    polygon(
      [
        [dx - 4, dy],
        [dx + 4, dy],
        [dx + 4, dy - 12],
        [dx, dy - 15],
        [dx - 4, dy - 12]
      ],
      { fill: mat.timber, width: 1 }
    )
  )
  for (const z of [58, 96]) {
    const [wx, wy] = iso.g(-2, r(z) - 1, z)
    p.body.push(
      polygon(
        [
          [wx - 2, wy],
          [wx + 2, wy],
          [wx + 2, wy - 7],
          [wx - 2, wy - 7]
        ],
        { ...dark(0.75), width: 0.7 }
      )
    )
    p.lit.push(
      polygon(
        [
          [wx - 2, wy],
          [wx + 2, wy],
          [wx + 2, wy - 7],
          [wx - 2, wy - 7]
        ],
        { fill: mat.brass, width: 0.7 }
      )
    )
  }
  // Gallery, lamp room, cap.
  p.body.push(cylinder(iso, 0, 0, 18, 3, 112, mat.slate))
  p.body.push(cylinder(iso, 0, 0, 10.5, 14, 115, ink, false))
  const glass = iso.arc(0, 0, 10.5, 115, Math.PI, 0, 16)
  const glassTop = iso.arc(0, 0, 10.5, 129, 0, Math.PI, 16)
  p.lit.push(polygon([...glass, ...glassTop], { fill: mat.brass, width: 1 }))
  for (const a of [0.25, 0.5, 0.75]) {
    const b = iso.g(Math.cos(Math.PI * a) * 10.5, Math.sin(Math.PI * a) * 10.5, 115)
    p.lit.push(seg(b, [b[0], b[1] - 14], { width: 0.8 }))
  }
  const rail = iso.arc(0, 0, 17, 121, Math.PI, 0, 16)
  p.body.push(path(`M${pts(rail)}`.replace(/ /g, 'L'), { width: 0.9 }))
  for (let i = 1; i < 16; i += 2) {
    const a = rail[i] as Pt
    p.body.push(seg(a, [a[0], a[1] + 6], { width: 0.7 }))
  }
  p.body.push(cylinder(iso, 0, 0, 12, 2, 129, mat.slate))
  p.body.push(dome(iso, 0, 0, 11, 131, mat.slate, 10))
  const [tx, ty] = iso.g(0, 0, 141)
  p.body.push(seg([tx, ty], [tx, ty - 8], { width: 1 }))
  p.body.push(ellipse([tx, ty - 9], 2, 2, { fill: mat.brass, width: 0.8 }))
  const [lx, ly] = iso.g(0, 0, 122)
  p.lit.push(
    path(
      `M${n(lx - 15)} ${n(ly - 3)}L${n(lx - 40)} ${n(ly - 11)}M${n(lx - 15)} ${n(ly + 3)}L${n(lx - 40)} ${n(ly + 9)}`,
      { stroke: mat.brass, width: 1.6 }
    )
  )
  return p
}

// ---------------------------------------------------------------------------------------------------------------
// Port modes

function boat(iso: Iso, p: Parts, u: number, v: number, len: number, mast = 34): void {
  const half = len / 2
  const w = len * 0.17
  const deck: Pt[] = [
    iso.p(u, v + half, 3),
    iso.p(u + w, v + half * 0.55, 3),
    iso.p(u + w, v - half * 0.8, 3),
    iso.p(u + w * 0.4, v - half, 3),
    iso.p(u - w * 0.4, v - half, 3),
    iso.p(u - w, v - half * 0.8, 3),
    iso.p(u - w, v + half * 0.55, 3)
  ]
  const side: Pt[] = [
    iso.p(u, v + half, 3),
    iso.p(u - w, v + half * 0.55, 3),
    iso.p(u - w, v - half * 0.8, 3),
    iso.p(u - w * 0.4, v - half, 3),
    iso.p(u - w * 0.3, v - half, -3),
    iso.p(u - w * 0.8, v - half * 0.7, -4),
    iso.p(u - w * 0.8, v + half * 0.45, -4)
  ]
  p.body.push(ellipse(iso.p(u + 3, v - 2, -4), len * 0.5, len * 0.12, { fill: ink, stroke: false, fillOpacity: 0.16 }))
  p.body.push(polygon(deck, { fill: mat.timber }))
  p.body.push(polygon(deck, { fill: paper, stroke: false, fillOpacity: 0.18 }))
  p.body.push(polygon(side, { fill: mat.slate }))
  p.body.push(
    path(`M${pts([iso.p(u - w * 0.8, v + half * 0.5, 0)])}L${pts([iso.p(u - w * 0.8, v - half * 0.75, 0)])}`, {
      stroke: paper,
      width: 1,
      strokeOpacity: 0.6
    })
  )
  if (mast > 0) {
    const foot = iso.p(u, v + half * 0.1, 3)
    const top: Pt = [foot[0], foot[1] - mast]
    p.body.push(seg(foot, top, { width: 1.4 }))
    p.body.push(
      seg(iso.p(u, v + half * 0.1 + 12, 3 + mast * 0.75), iso.p(u, v + half * 0.1 - 12, 3 + mast * 0.75), {
        width: 1.2
      })
    )
    p.body.push(
      path(
        `M${pts([iso.p(u, v + half * 0.1 + 11, 3 + mast * 0.72)])}Q${pts([iso.p(u, v + half * 0.1, 3 + mast * 0.6)])} ${pts([iso.p(u, v + half * 0.1 - 11, 3 + mast * 0.72)])}`,
        { fill: paper, width: 1 }
      )
    )
    p.body.push(
      path(`M${pts([top])}L${pts([iso.p(u, v + half, 4)])}M${pts([top])}L${pts([iso.p(u, v - half, 4)])}`, {
        width: 0.6,
        strokeOpacity: 0.6
      })
    )
    p.lit.push(pennant(top, 0.01))
  }
}

export function port(): Structure {
  const p = parts()
  const a = new Iso(128, 74, 1.15)
  const b = new Iso(384, 74, 1.15)
  // Hex A: brick warehouses and a clock tower.
  const ware = { u: 0, v: 18, w: 80, d: 42, h: 30 }
  const wb = boxOf(ware)
  const ware2 = { u: 46, v: -32, w: 36, d: 38, h: 22 }
  const w2 = boxOf(ware2)
  const clock = { u: -14, v: 60, w: 18, d: 18, h: 60 }
  const cb = boxOf(clock)
  p.body.push(shadow(footprint(a, wb), 40))
  p.body.push(shadow(footprint(a, w2), 30))
  p.body.push(box(a, { ...clock, fill: mat.brick, hatchRight: true }))
  p.body.push(course(a, cb, 44, 0.5))
  const cc = { u: cb.u0, v: 60, z: 51 }
  const ring: Pt[] = []
  for (let i = 0; i < 24; i++) {
    const t = (i / 24) * Math.PI * 2
    ring.push(a.p(cc.u, cc.v + Math.cos(t) * 6, cc.z + Math.sin(t) * 6))
  }
  p.body.push(polygon(ring, { fill: mat.limestone, width: 1 }))
  p.body.push(
    path(
      `M${pts([a.p(cc.u, cc.v, cc.z)])}L${pts([a.p(cc.u, cc.v, cc.z + 4.5)])}M${pts([a.p(cc.u, cc.v, cc.z)])}L${pts([a.p(cc.u, cc.v - 3.5, cc.z + 1)])}`,
      { width: 0.9 }
    )
  )
  p.body.push(pyramid(a, cb, 16, mat.slate, 2))
  const ct = a.p(clock.u, clock.v, cb.z1 + 16)
  p.body.push(seg(ct, [ct[0], ct[1] - 6], { width: 1 }))
  p.body.push(ellipse([ct[0], ct[1] - 7], 1.8, 1.8, { fill: mat.brass, width: 0.8 }))
  p.body.push(box(a, { ...ware, fill: mat.brick, hatchRight: true }))
  for (const s of [-28, -12, 4, 20]) win(a, wb, 'right', s, 16, 6, 8, p)
  p.body.push(door(a, wb, 'right', 32, 0, 12, 15, mat.timber, false))
  p.body.push(door(a, wb, 'left', 18, 0, 13, 16, mat.timber, true))
  win(a, wb, 'left', 18, 22, 5, 5, p, true)
  p.body.push(gable(a, wb, 'u', 17, mat.slate, mat.brick, 3))
  p.body.push(box(a, { ...ware2, fill: mat.brick, hatchRight: true }))
  p.body.push(door(a, w2, 'left', -32, 0, 11, 13, mat.timber, false))
  for (const s of [36, 52]) win(a, w2, 'right', s, 9, 5, 7, p)
  p.body.push(gable(a, w2, 'v', 12, mat.slate, mat.brick, 2))
  // Hex B: a stone quay with a crane, crates and a moored boat.
  const quay = { u: 6, v: 6, w: 96, d: 88, h: 6 }
  const qb = boxOf(quay)
  p.body.push(box(b, { ...quay, fill: mat.stone }))
  const planks: string[] = []
  for (let u = qb.u0 + 8; u < qb.u1; u += 8) planks.push(`M${pts([b.p(u, qb.v0, 6)])}L${pts([b.p(u, qb.v1, 6)])}`)
  p.body.push(path(planks.join(''), { width: 0.5, strokeOpacity: 0.35 }))
  p.body.push(
    path(
      `M${pts([b.p(qb.u0 + 3, qb.v1, 6)])}L${pts([b.p(qb.u0 + 3, qb.v0 + 3, 6)])}L${pts([b.p(qb.u1, qb.v0 + 3, 6)])}`,
      { width: 0.6, strokeOpacity: 0.5 }
    )
  )
  const crates: [number, number, number][] = [
    [34, 34, 0],
    [46, 34, 0],
    [40, 22, 0],
    [40, 30, 10]
  ]
  crates.sort((x, y) => y[0] + y[1] - (x[0] + x[1]) || x[2] - y[2])
  for (const [u, v, z] of crates) {
    const c = boxOf({ u, v, w: 10, d: 10, h: 10, z: 6 + z })
    p.body.push(box(b, { u, v, w: 10, d: 10, h: 10, z: 6 + z, fill: mat.timber }))
    p.body.push(seg(b.p(c.u0, c.v0, c.z0), b.p(c.u0, c.v1, c.z1), { width: 0.6, strokeOpacity: 0.5 }))
  }
  // Crane: post, jib out over the water, hook.
  const post = { u: -8, v: 30, w: 7, d: 7, h: 50, z: 6 }
  p.body.push(box(b, { ...post, fill: mat.timber }))
  const top = b.p(-8, 30, 56)
  const tip = b.p(-74, 30, 64)
  p.body.push(path(`M${pts([top])}L${pts([tip])}L${pts([b.p(-8, 30, 36)])}`, { width: 1.4 }))
  p.body.push(seg(b.p(-8, 30, 62), tip, { width: 0.8 }))
  p.body.push(seg(b.p(-8, 30, 56), b.p(-8, 30, 62), { width: 1.2 }))
  const hook = b.p(-74, 30, 30)
  p.body.push(seg(tip, hook, { width: 0.7 }))
  p.body.push(box(b, { u: -74, v: 30, w: 9, d: 9, h: 8, z: 21, fill: mat.timber }))
  p.body.push(path(`M${n(hook[0])} ${n(hook[1])}q3 2 0 4`, { stroke: mat.brass, width: 1.2 }))
  // Bollards along the water edge.
  for (const v of [-30, 0, 30]) p.body.push(cylinder(b, ...Iso.flat(qb.u0 + 4, v), 2.4, 5, 6, ink, mat.brass))
  boat(b, p, -80, -10, 54)
  p.lit.push(
    path(`M${n(b.p(qb.u0 + 4, -40, 6)[0])} ${n(b.p(qb.u0 + 4, -40, 6)[1])}v-14`, { width: 1 }) +
      ellipse(b.p(qb.u0 + 4, -40, 22), 2.4, 2.4, { fill: mat.brass, width: 0.8 })
  )
  return { body: p.body.join(''), lit: p.lit.join(''), vb: { x: 0, y: -42, w: 512, h: 238 } }
}

export function dock(iso: Iso): Parts {
  const p = parts()
  // Shed on the landward end.
  const shed = { u: 4, v: 58, w: 32, d: 26, h: 16 }
  const sb = boxOf(shed)
  p.body.push(shadow(footprint(iso, sb), 30))
  p.body.push(box(iso, { ...shed, fill: mat.timber }))
  p.body.push(door(iso, sb, 'right', 4, 0, 10, 11, mat.timber, false))
  p.body.push(gable(iso, sb, 'v', 10, mat.slate, mat.timber, 2))
  const deckV0 = -78
  const deckV1 = 44
  const posts = (u: number) => {
    for (const v of [-74, -50, -26, -2, 22]) p.body.push(box(iso, { u, v, w: 4, d: 4, h: 18, z: -8, fill: mat.timber }))
  }
  posts(12)
  const deck = { u: 0, v: (deckV0 + deckV1) / 2, w: 24, d: deckV1 - deckV0, h: 3, z: 7 }
  const db = boxOf(deck)
  p.body.push(shadow(footprint(iso, { ...db, z0: 0 }), 10, 0.12))
  p.body.push(box(iso, { ...deck, fill: mat.timber }))
  const planks: string[] = []
  for (let v = db.v0 + 5; v < db.v1; v += 5) planks.push(`M${pts([iso.p(db.u0, v, 10)])}L${pts([iso.p(db.u1, v, 10)])}`)
  p.body.push(path(planks.join(''), { width: 0.5, strokeOpacity: 0.4 }))
  posts(-12)
  for (const v of [-74, -26, 22]) p.body.push(box(iso, { u: -12, v, w: 4, d: 4, h: 6, z: 10, fill: mat.timber }))
  boat(iso, p, -40, -36, 30, 0)
  p.body.push(
    path(`M${pts([iso.p(-12, -26, 15)])}Q${pts([iso.p(-26, -30, 4)])} ${pts([iso.p(-36, -30, 4)])}`, { width: 0.8 })
  )
  // Lantern at the end of the jetty.
  const lp = iso.p(-12, -74, 16)
  p.body.push(seg(lp, [lp[0], lp[1] - 18], { width: 1.2 }))
  p.body.push(
    polygon(
      [
        [lp[0] - 3, lp[1] - 18],
        [lp[0] + 3, lp[1] - 18],
        [lp[0] + 3, lp[1] - 25],
        [lp[0] - 3, lp[1] - 25]
      ],
      { fill: ink, fillOpacity: 0.7, width: 0.9 }
    )
  )
  p.lit.push(
    polygon(
      [
        [lp[0] - 3, lp[1] - 18],
        [lp[0] + 3, lp[1] - 18],
        [lp[0] + 3, lp[1] - 25],
        [lp[0] - 3, lp[1] - 25]
      ],
      { fill: mat.brass, width: 0.9 }
    )
  )
  p.body.push(
    path(`M${n(lp[0] - 4)} ${n(lp[1] - 25)}L${n(lp[0])} ${n(lp[1] - 29)}L${n(lp[0] + 4)} ${n(lp[1] - 25)}`, {
      width: 1
    })
  )
  return p
}

export function railDepot(iso: Iso): Parts {
  const p = parts()
  // Ballast and two tracks along u.
  const bed = (v: number) => [iso.p(-70, v - 8, 0), iso.p(70, v - 8, 0), iso.p(70, v + 8, 0), iso.p(-70, v + 8, 0)]
  for (const v of [-40, -20]) {
    p.body.push(polygon(bed(v), { fill: mat.sandstone, width: 0.8 }))
    const sleepers: string[] = []
    for (let u = -66; u <= 66; u += 7) sleepers.push(`M${pts([iso.p(u, v - 6, 0.5)])}L${pts([iso.p(u, v + 6, 0.5)])}`)
    p.body.push(path(sleepers.join(''), { stroke: mat.timber, width: 1.6 }))
    for (const dv of [-3.5, 3.5]) p.body.push(seg(iso.p(-70, v + dv, 1.5), iso.p(70, v + dv, 1.5), { width: 1.1 }))
  }
  // Station building.
  const st = { u: -40, v: 30, w: 44, d: 40, h: 26 }
  const sb = boxOf(st)
  p.body.push(shadow(footprint(iso, sb), 40))
  p.body.push(box(iso, { ...st, fill: mat.brick, hatchRight: true }))
  for (const s of [-50, -30]) win(iso, sb, 'right', s, 9, 6, 9, p)
  win(iso, sb, 'left', 30, 9, 6, 9, p)
  p.body.push(door(iso, sb, 'left', 18, 0, 8, 12))
  p.body.push(pyramid(iso, sb, 16, mat.slate, 3, 12))
  // Platform and canopy.
  const plat = { u: 18, v: 2, w: 100, d: 18, h: 4 }
  p.body.push(box(iso, { ...plat, fill: mat.limestone }))
  const canopy = { u: 22, v: 2, w: 84, d: 22, h: 2, z: 24 }
  const cb = boxOf(canopy)
  p.body.push(shadow(footprint(iso, { ...cb, z0: 4 }), 18, 0.1))
  for (const u of [62, 36, 10, -16]) p.body.push(box(iso, { u, v: 8, w: 2.5, d: 2.5, h: 20, z: 4, fill: mat.slate }))
  p.body.push(box(iso, { ...canopy, fill: mat.slate }))
  p.body.push(gable(iso, cb, 'u', 6, mat.slate, mat.slate, 1))
  for (const u of [62, 36, 10, -16]) p.body.push(box(iso, { u, v: -4, w: 2.5, d: 2.5, h: 20, z: 4, fill: mat.slate }))
  // A small engine on the front track.
  const eng = { u: 34, v: -40, w: 34, d: 11, h: 10, z: 3 }
  const eb = boxOf(eng)
  p.body.push(box(iso, { ...eng, fill: mat.slate }))
  p.body.push(box(iso, { u: 12, v: -40, w: 12, d: 13, h: 17, z: 3, fill: mat.slate }))
  p.body.push(box(iso, { u: 12, v: -40, w: 14, d: 15, h: 2, z: 20, fill: ink }))
  win(iso, boxOf({ u: 12, v: -40, w: 12, d: 13, h: 17, z: 3 }), 'right', 12, 11, 5, 5, p, false)
  p.body.push(cylinder(iso, ...Iso.flat(46, -40), 2.6, 9, 13, ink))
  p.body.push(ellipse(iso.p(30, -40, 14), 2.6, 1.6, { fill: mat.brass, width: 0.8 }))
  for (const u of [20, 30, 42]) p.body.push(ellipse(onRightAt(iso, eb, u, 3), 3, 3, { fill: ink, width: 0.8 }))
  p.lit.push(smoke(iso.p(46, -40, 24)))
  const lamp = iso.p(66, -6, 4)
  p.body.push(seg(lamp, [lamp[0], lamp[1] - 18], { width: 1.1 }))
  p.lit.push(ellipse([lamp[0], lamp[1] - 19], 2.4, 2.4, { fill: mat.brass, width: 0.8 }))
  return p
}

const onRightAt = (iso: Iso, b: Box, u: number, z: number): Pt => iso.p(u, b.v0, z)

export function airport(iso: Iso): Parts {
  const p = parts()
  p.body.push(shadow([iso.p(-18, -18), iso.p(18, -18), iso.p(18, 18), iso.p(-18, 18)], 120, 0.1))
  // Winch hut.
  const hut = { u: -40, v: 30, w: 24, d: 20, h: 13 }
  const hb = boxOf(hut)
  p.body.push(box(iso, { ...hut, fill: mat.timber }))
  p.body.push(door(iso, hb, 'right', -40, 0, 8, 9, mat.timber, false))
  p.body.push(gable(iso, hb, 'u', 8, mat.slate, mat.timber, 2))
  p.body.push(box(iso, { u: 0, v: 0, w: 42, d: 42, h: 4, fill: mat.stone }))
  // Lattice mast.
  const H = 118
  const at = (su: number, sv: number, z: number): Pt => {
    const k = 17 - (z / H) * 13
    return iso.p(su * k, sv * k, 4 + z)
  }
  const leg = (su: number, sv: number, w = 1.6) => seg(at(su, sv, 0), at(su, sv, H), { width: w })
  p.body.push(leg(1, 1, 1))
  const levels = [0, 26, 50, 72, 92, H]
  const brace = (s0: [number, number], s1: [number, number], op = 0.75) => {
    const d: string[] = []
    for (let i = 0; i < levels.length - 1; i++) {
      const z0 = levels[i] as number
      const z1 = levels[i + 1] as number
      d.push(
        `M${pts([at(...s0, z0)])}L${pts([at(...s1, z1)])}M${pts([at(...s1, z0)])}L${pts([at(...s0, z1)])}M${pts([at(...s0, z1)])}L${pts([at(...s1, z1)])}`
      )
    }
    return path(d.join(''), { width: 0.7, strokeOpacity: op })
  }
  p.body.push(brace([1, 1], [-1, 1], 0.35))
  p.body.push(brace([1, 1], [1, -1], 0.35))
  p.body.push(leg(-1, 1))
  p.body.push(leg(1, -1))
  p.body.push(brace([-1, -1], [-1, 1]))
  p.body.push(brace([-1, -1], [1, -1]))
  p.body.push(leg(-1, -1, 1.8))
  p.body.push(box(iso, { u: 0, v: 0, w: 12, d: 12, h: 3, z: H + 4, fill: mat.limestone }))
  p.body.push(cylinder(iso, 0, 0, 2.6, 9, H + 7, mat.brass))
  const head = iso.p(0, 0, H + 16)
  p.lit.push(ellipse(head, 2.6, 2.6, { fill: mat.brass, width: 0.8 }))
  // Airship tethered by its nose, riding to the east.
  const nose: Pt = [head[0] + 6, head[1] + 2]
  const ang = -10
  const rx = 52
  const ry = 15
  const cx = nose[0] + rx * Math.cos((ang * Math.PI) / 180)
  const cy = nose[1] + rx * Math.sin((ang * Math.PI) / 180)
  const g = (inner: string) => `<g transform="translate(${n(cx)} ${n(cy)}) rotate(${ang})">${inner}</g>`
  const fin = (sy: number) =>
    polygon(
      [
        [rx - 14, sy * ry * 0.35],
        [rx + 6, sy * ry * 1.25],
        [rx + 9, sy * ry * 1.2],
        [rx + 2, sy * ry * 0.2]
      ],
      { fill: mat.slate, width: 1 }
    )
  p.body.push(seg(head, nose, { width: 1 }))
  p.body.push(
    g(
      fin(-1) +
        ellipse([0, 0], rx, ry, { fill: mat.limestone }) +
        path(`M${-rx} 0A${rx} ${ry} 0 0 0 ${rx} 0A${rx} ${ry * 0.35} 0 0 1 ${-rx} 0Z`, {
          fill: ink,
          stroke: false,
          fillOpacity: 0.2
        }) +
        path(
          `M${-rx * 0.84} ${-ry * 0.5}Q0 ${-ry * 0.68} ${rx * 0.84} ${-ry * 0.5}M${-rx * 0.97} ${ry * 0.2}Q0 ${ry * 0.32} ${rx * 0.97} ${ry * 0.2}`,
          { width: 0.6, strokeOpacity: 0.45 }
        ) +
        path(`M${-rx * 0.5} ${-ry * 0.92}V${ry * 0.92}M0 ${-ry}V${ry}M${rx * 0.5} ${-ry * 0.92}V${ry * 0.92}`, {
          width: 0.5,
          strokeOpacity: 0.3
        }) +
        path(`M${-rx * 0.62} ${-ry * 0.55}Q${-rx * 0.3} ${-ry * 0.85} ${rx * 0.1} ${-ry * 0.82}`, {
          stroke: paper,
          width: 1.4,
          strokeOpacity: 0.7
        }) +
        fin(1) +
        seg([-8, ry - 1], [-6, ry + 6], { width: 0.7 }) +
        seg([12, ry - 1], [10, ry + 6], { width: 0.7 }) +
        polygon(
          [
            [-12, ry + 5],
            [16, ry + 5],
            [13, ry + 11],
            [-9, ry + 11]
          ],
          { fill: mat.timber, width: 1 }
        )
    )
  )
  p.lit.push(
    g(
      polygon(
        [
          [-6, ry + 6.5],
          [-2, ry + 6.5],
          [-2, ry + 9],
          [-6, ry + 9]
        ],
        { fill: mat.brass, stroke: false }
      ) +
        polygon(
          [
            [3, ry + 6.5],
            [7, ry + 6.5],
            [7, ry + 9],
            [3, ry + 9]
          ],
          { fill: mat.brass, stroke: false }
        )
    )
  )
  return p
}

export function customsHouse(iso: Iso): Parts {
  const p = parts()
  // Road through the arch.
  p.body.push(
    polygon([iso.p(-80, -11), iso.p(70, -11), iso.p(70, 11), iso.p(-80, 11)], {
      fill: mat.sandstone,
      stroke: false,
      fillOpacity: 0.85
    })
  )
  p.body.push(
    path(`M${pts([iso.p(-80, -11)])}L${pts([iso.p(70, -11)])}M${pts([iso.p(-80, 11)])}L${pts([iso.p(70, 11)])}`, {
      width: 0.7,
      strokeOpacity: 0.5
    })
  )
  const tw = (v: number): Parts => {
    const t = { u: 0, v, w: 24, d: 24, h: 50 }
    const tb = boxOf(t)
    p.body.push(shadow(footprint(iso, tb), 50))
    p.body.push(box(iso, { ...t, fill: mat.limestone, hatchRight: true }))
    p.body.push(course(iso, tb, 34, 0.45))
    win(iso, tb, 'left', v, 38, 5, 7, p)
    p.body.push(opening(iso, tb, 'left', v, 14, 3.5, 10, ink, true, 0.8))
    win(iso, tb, 'right', 0, 38, 5, 7, p)
    p.body.push(pyramid(iso, tb, 18, mat.slate, 2))
    const tip = iso.p(0, v, 68)
    p.body.push(seg(tip, [tip[0], tip[1] - 5], { width: 1 }))
    p.body.push(ellipse([tip[0], tip[1] - 6], 1.6, 1.6, { fill: mat.brass, width: 0.7 }))
    return p
  }
  tw(36)
  const gate = { u: 0, v: 0, w: 34, d: 48, h: 36 }
  const gb = boxOf(gate)
  p.body.push(shadow(footprint(iso, gb), 40))
  p.body.push(box(iso, { ...gate, fill: mat.brick, hatchRight: true }))
  p.body.push(opening(iso, gb, 'left', 0, 0, 20, 18, ink, true, 0.85))
  p.body.push(opening(iso, gb, 'right', 0, 22, 6, 7, ink, true, 0.7))
  // voussoirs
  p.body.push(opening(iso, gb, 'left', 0, 0, 24, 18, 'none', true))
  p.body.push(course(iso, gb, 30, 0.5))
  p.body.push(gable(iso, gb, 'v', 12, mat.slate, mat.brick, 2))
  tw(-36)
  // Lantern over the arch.
  const l = iso.p(gb.u0, 0, 30)
  p.lit.push(ellipse(l, 2.4, 2.4, { fill: mat.brass, width: 0.8 }))
  // Barrier: post and a striped pole across the road.
  const post = { u: -40, v: -18, w: 5, d: 5, h: 14 }
  p.body.push(box(iso, { ...post, fill: mat.timber }))
  const a = iso.p(-40, -16, 12)
  const b = iso.p(-40, 22, 12)
  p.body.push(seg(a, b, { width: 4.2, stroke: ink }))
  p.body.push(seg(a, b, { width: 2.4, stroke: mat.limestone }))
  p.body.push(seg(a, b, { width: 2.4, stroke: mat.brick, dash: '4 4' }))
  const rest = { u: -40, v: 24, w: 4, d: 4, h: 10 }
  p.body.push(box(iso, { ...rest, fill: mat.timber }))
  return p
}

export function bridge(iso: Iso): Parts {
  const p = parts()
  const L = 84
  const halfW = 12
  const span = 38
  const deck = (v: number) => 6 + 16 * (1 - (v / L) ** 2)
  const archZ = (v: number) => 1 + 18 * Math.sqrt(Math.max(0, 1 - (v / span) ** 2))
  const N = 28
  const vs = Array.from({ length: N + 1 }, (_, i) => -L + (2 * L * i) / N)
  const arcVs = Array.from({ length: 21 }, (_, i) => span - (2 * span * i) / 20)
  p.body.push(shadow([iso.p(-halfW, -L), iso.p(halfW, -L), iso.p(halfW, L), iso.p(-halfW, L)], 18, 0.12))
  // Soffit seen through the arch.
  const near = arcVs.map((v) => iso.p(-halfW, v, archZ(v)))
  const far = arcVs.map((v) => iso.p(halfW, v, archZ(v)))
  p.body.push(polygon([...near, ...[...far].reverse()], { fill: mat.limestone }))
  p.body.push(polygon([...near, ...[...far].reverse()], { fill: ink, stroke: false, fillOpacity: 0.38 }))
  // Far parapet's inner face and the deck.
  p.body.push(
    face(
      [...vs.map((v) => iso.p(halfW, v, deck(v))), ...[...vs].reverse().map((v) => iso.p(halfW, v, deck(v) + 6))],
      mat.limestone,
      'lit'
    )
  )
  p.body.push(
    face(
      [...vs.map((v) => iso.p(-halfW, v, deck(v))), ...[...vs].reverse().map((v) => iso.p(halfW, v, deck(v)))],
      mat.sandstone,
      'top'
    )
  )
  const setts: string[] = []
  for (const v of vs.filter((_, i) => i % 2 === 1))
    setts.push(`M${pts([iso.p(-halfW, v, deck(v))])}L${pts([iso.p(halfW, v, deck(v))])}`)
  p.body.push(path(setts.join(''), { width: 0.5, strokeOpacity: 0.35 }))
  // Near elevation with the arch cut out.
  const top = vs.map((v) => iso.p(-halfW, v, deck(v) + 6))
  const bottom: Pt[] = [
    iso.p(-halfW, L, 0),
    iso.p(-halfW, span, 1),
    ...arcVs.map((v) => iso.p(-halfW, v, archZ(v))),
    iso.p(-halfW, -span, 1),
    iso.p(-halfW, -L, 0)
  ]
  const elev = [...top, ...bottom]
  p.body.push(face(elev, mat.limestone, 'lit'))
  // String course, voussoirs and the parapet coping.
  p.body.push(
    path(`M${pts(vs.map((v) => iso.p(-halfW, v, deck(v))))}`.replace(/ /g, 'L'), { width: 0.7, strokeOpacity: 0.5 })
  )
  const vous: string[] = []
  for (let i = 1; i < 12; i++) {
    const t = Math.PI * (i / 12)
    const v = span * Math.cos(t)
    const z = 1 + 18 * Math.sin(t)
    const v2 = (span + 7) * Math.cos(t)
    const z2 = 1 + (18 + 6) * Math.sin(t)
    vous.push(`M${pts([iso.p(-halfW, v, z)])}L${pts([iso.p(-halfW, v2, z2)])}`)
  }
  p.body.push(path(vous.join(''), { width: 0.6, strokeOpacity: 0.55 }))
  p.body.push(
    path(
      `M${pts(Array.from({ length: 13 }, (_, i) => Math.PI * (i / 12)).map((t) => iso.p(-halfW, (span + 7) * Math.cos(t), 1 + 24 * Math.sin(t))))}`.replace(
        / /g,
        'L'
      ),
      { width: 0.7, strokeOpacity: 0.55 }
    )
  )
  // Cutwaters.
  for (const v of [-span - 6, span + 6]) {
    p.body.push(
      face(
        [iso.p(-halfW, v - 6, 0), iso.p(-halfW - 8, v, 0), iso.p(-halfW - 8, v, 10), iso.p(-halfW, v - 6, 13)],
        mat.limestone,
        'shade'
      )
    )
    p.body.push(
      face(
        [iso.p(-halfW - 8, v, 0), iso.p(-halfW, v + 6, 0), iso.p(-halfW, v + 6, 13), iso.p(-halfW - 8, v, 10)],
        mat.limestone,
        'lit'
      )
    )
    p.body.push(face([iso.p(-halfW, v - 6, 13), iso.p(-halfW - 8, v, 10), iso.p(-halfW, v + 6, 13)], mat.stone, 'top'))
  }
  // Lamps at the crown.
  for (const v of [10, -10]) {
    const base = iso.p(-halfW, v, deck(v) + 6)
    p.body.push(seg(base, [base[0], base[1] - 12], { width: 1.1 }))
    p.lit.push(ellipse([base[0], base[1] - 13], 2.2, 2.2, { fill: mat.brass, width: 0.8 }))
  }
  return p
}

// ---------------------------------------------------------------------------------------------------------------
// Vernacular

export function workshop(iso: Iso): Parts {
  const p = parts()
  const main = { u: 4, v: 16, w: 76, d: 44, h: 22 }
  const mb = boxOf(main)
  const lean = { u: 14, v: -20, w: 56, d: 24, h: 14 }
  const lb = boxOf(lean)
  p.body.push(shadow(footprint(iso, mb), 50))
  // Log pile behind-left.
  for (const [u, v, z] of [
    [-44, 40, 0],
    [-44, 32, 0],
    [-44, 36, 6]
  ] as const) {
    const c = iso.p(u, v, z + 3)
    p.body.push(ellipse(c, 3.6, 3.6, { fill: mat.timber, width: 0.9 }))
    p.body.push(ellipse(c, 1.4, 1.4, { width: 0.6 }))
  }
  p.body.push(box(iso, { ...main, fill: mat.limestone, hatchRight: true }))
  p.body.push(door(iso, mb, 'left', 16, 0, 18, 16, mat.timber, false))
  p.body.push(seg(onL(iso, mb, 16, 0), onL(iso, mb, 16, 16), { width: 0.8 }))
  p.body.push(gable(iso, mb, 'u', 18, mat.slate, mat.timber, 3))
  // Timber framing in the gable.
  p.body.push(
    path(
      `M${pts([iso.p(mb.u0, mb.v0 + 6, 22)])}L${pts([iso.p(mb.u0, 16, 36)])}L${pts([iso.p(mb.u0, mb.v1 - 6, 22)])}M${pts([iso.p(mb.u0, 16, 22)])}L${pts([iso.p(mb.u0, 16, 38)])}`,
      { width: 0.8, strokeOpacity: 0.7 }
    )
  )
  win(iso, mb, 'left', 16, 24, 5, 5, p, false)
  // Lean-to with an open front.
  p.body.push(box(iso, { ...lean, fill: mat.timber }))
  const open: Pt[] = [
    onRightAt(iso, lb, lb.u0 + 6, 0),
    onRightAt(iso, lb, lb.u1 - 6, 0),
    onRightAt(iso, lb, lb.u1 - 6, 11),
    onRightAt(iso, lb, lb.u0 + 6, 11)
  ]
  p.body.push(polygon(open, { fill: ink, fillOpacity: 0.82, width: 0.9 }))
  const anvil = lerp(open[0] as Pt, open[1] as Pt, 0.35)
  p.body.push(
    polygon(
      [
        [anvil[0] - 5, anvil[1] - 1],
        [anvil[0] + 4, anvil[1] - 3],
        [anvil[0] + 4, anvil[1] - 6],
        [anvil[0] - 7, anvil[1] - 4]
      ],
      { fill: mat.slate, width: 0.7 }
    )
  )
  p.lit.push(
    polygon(
      [
        lerp(open[0] as Pt, open[1] as Pt, 0.62),
        lerp(open[0] as Pt, open[1] as Pt, 0.9),
        lerp(open[3] as Pt, open[2] as Pt, 0.9),
        lerp(open[3] as Pt, open[2] as Pt, 0.62)
      ],
      { fill: mat.brass, stroke: false, fillOpacity: 0.9 }
    )
  )
  for (const u of [lb.u0 + 6, (lb.u0 + lb.u1) / 2, lb.u1 - 6])
    p.body.push(seg(onRightAt(iso, lb, u, 0), onRightAt(iso, lb, u, 14), { width: 1.4 }))
  p.body.push(gable(iso, lb, 'u', 6, mat.slate, mat.timber, 2))
  // Brick chimney through the front slope.
  const ch = { u: 30, v: 4, w: 9, d: 9, h: 34, z: 28 }
  p.body.push(box(iso, { ...ch, fill: mat.brick }))
  p.body.push(box(iso, { u: 30, v: 4, w: 11, d: 11, h: 3, z: 62, fill: mat.brick }))
  p.lit.push(smoke(iso.p(30, 4, 66)))
  for (const s of [-14, 8, 30]) {
    if (s > 20) continue
    win(iso, mb, 'right', s, 8, 6, 8, p)
  }
  return p
}

const onL = (iso: Iso, b: Box, v: number, z: number): Pt => iso.p(b.u0, v, z)

export function mill(iso: Iso): Parts {
  const p = parts()
  const house = { u: 10, v: 8, w: 54, d: 52, h: 30 }
  const hb = boxOf(house)
  p.body.push(shadow(footprint(iso, hb), 50))
  // Mill race on the back.
  p.body.push(box(iso, { u: -28, v: 44, w: 9, d: 40, h: 4, z: 36, fill: mat.timber }))
  p.body.push(
    polygon([iso.p(-31, 64, 40), iso.p(-25, 64, 40), iso.p(-25, 24, 40), iso.p(-31, 24, 40)], {
      fill: terrainFill('river'),
      width: 0.8
    })
  )
  p.body.push(box(iso, { u: -28, v: 64, w: 4, d: 4, h: 36, fill: mat.timber }))
  p.body.push(box(iso, { ...house, fill: mat.limestone, hatchRight: true }))
  p.body.push(course(iso, hb, 14, 0.35))
  p.body.push(gable(iso, hb, 'v', 20, mat.slate, mat.limestone, 3))
  win(iso, hb, 'right', 2, 16, 6, 8, p)
  win(iso, hb, 'right', 26, 16, 6, 8, p)
  win(iso, hb, 'right', 14, 34, 5, 6, p)
  p.body.push(door(iso, hb, 'right', 14, 0, 10, 13))
  win(iso, hb, 'left', -6, 18, 6, 8, p)
  // The waterwheel, in a plane parallel to the lit face.
  const wu = hb.u0 - 8
  const wv = 14
  const wz = 16
  const Rw = 22
  const circle = (u: number, r: number, k = 36) =>
    Array.from({ length: k }, (_, i) => {
      const t = (i / k) * Math.PI * 2
      return iso.p(u, wv + Math.cos(t) * r, wz + Math.sin(t) * r)
    })
  const ringPath = (u: number) =>
    `M${pts(circle(u, Rw))}Z`.replace(/ /g, 'L') + `M${pts(circle(u, Rw - 4).reverse())}Z`.replace(/ /g, 'L')
  p.body.push(path(ringPath(wu + 6), { fill: mat.timber, extra: 'fill-rule="evenodd"' }))
  p.body.push(path(ringPath(wu + 6), { fill: ink, stroke: false, fillOpacity: 0.3, extra: 'fill-rule="evenodd"' }))
  const paddles: string[] = []
  for (let i = 0; i < 16; i++) {
    const t = (i / 16) * Math.PI * 2
    const pt = (u: number, r: number) => iso.p(u, wv + Math.cos(t) * r, wz + Math.sin(t) * r)
    paddles.push(
      `M${pts([pt(wu, Rw + 2)])}L${pts([pt(wu + 6, Rw + 2)])}L${pts([pt(wu + 6, Rw - 3)])}L${pts([pt(wu, Rw - 3)])}Z`
    )
  }
  p.body.push(path(paddles.join(''), { fill: mat.timber, width: 0.8 }))
  const spokes: string[] = []
  for (let i = 0; i < 8; i++) {
    const t = (i / 8) * Math.PI * 2 + 0.2
    spokes.push(
      `M${pts([iso.p(wu, wv, wz)])}L${pts([iso.p(wu, wv + Math.cos(t) * (Rw - 3), wz + Math.sin(t) * (Rw - 3))])}`
    )
  }
  p.body.push(path(ringPath(wu), { fill: mat.timber, extra: 'fill-rule="evenodd"' }))
  p.body.push(path(spokes.join(''), { width: 1.3 }))
  p.body.push(seg(iso.p(wu, wv, wz), iso.p(hb.u0, wv, wz), { width: 2.2 }))
  p.body.push(ellipse(iso.p(wu, wv, wz), 3, 3, { fill: mat.brass, width: 0.9 }))
  // Water falling from the race onto the wheel.
  p.body.push(
    path(`M${pts([iso.p(-28, 24, 40)])}Q${pts([iso.p(-28, 18, 40)])} ${pts([iso.p(wu, wv + 8, wz + Rw)])}`, {
      stroke: terrainFill('river'),
      width: 4
    })
  )
  p.body.push(
    path(`M${pts([iso.p(-28, 24, 40)])}Q${pts([iso.p(-28, 18, 40)])} ${pts([iso.p(wu, wv + 8, wz + Rw)])}`, {
      stroke: paper,
      width: 0.8,
      strokeOpacity: 0.8,
      dash: '3 3'
    })
  )
  return p
}

/** A broken wall run: a jagged top profile `[s, height][]` along `u` (at `v = at`) or along `v` (at `u = at`). */
function brokenWall(
  iso: Iso,
  axis: 'u' | 'v',
  at: number,
  profile: [number, number][],
  fill: string,
  thick = 8
): string {
  const t = thick / 2
  const P = (s: number, side: number, z: number): Pt => (axis === 'u' ? iso.p(s, at + side, z) : iso.p(at + side, s, z))
  const out: string[] = []
  const first = profile[0] as [number, number]
  const last = profile[profile.length - 1] as [number, number]
  // The long visible face: shaded for a wall along u (faces right), lit for a wall along v (faces left).
  const longFace = [P(first[0], -t, 0), P(last[0], -t, 0), ...[...profile].reverse().map(([s, h]) => P(s, -t, h))]
  out.push(face(longFace, fill, axis === 'u' ? 'shade' : 'lit'))
  // Coursing on the long face.
  const courses: string[] = []
  for (let z = 7; z < 60; z += 7) {
    let open = false
    for (let s = first[0]; s <= last[0]; s += 1) {
      const h = profileAt(profile, s)
      if (h > z + 1 && !open) {
        courses.push(`M${pts([P(s, -t, z)])}`)
        open = true
      } else if ((h <= z + 1 || s + 1 > last[0]) && open) {
        courses.push(`L${pts([P(s, -t, z)])}`)
        open = false
      }
    }
  }
  out.push(path(courses.join(''), { width: 0.55, strokeOpacity: 0.4 }))
  // End face at the start of the run.
  const end = [P(first[0], -t, 0), P(first[0], t, 0), P(first[0], t, first[1]), P(first[0], -t, first[1])]
  out.push(face(end, fill, axis === 'u' ? 'lit' : 'shade'))
  // Broken tops.
  for (let i = 0; i < profile.length - 1; i++) {
    const [s0, h0] = profile[i] as [number, number]
    const [s1, h1] = profile[i + 1] as [number, number]
    out.push(face([P(s0, -t, h0), P(s1, -t, h1), P(s1, t, h1), P(s0, t, h0)], fill, 'top', 1))
  }
  return out.join('')
}

const profileAt = (profile: [number, number][], s: number): number => {
  for (let i = 0; i < profile.length - 1; i++) {
    const [s0, h0] = profile[i] as [number, number]
    const [s1, h1] = profile[i + 1] as [number, number]
    if (s >= s0 && s <= s1) return s1 === s0 ? Math.max(h0, h1) : h0 + ((h1 - h0) * (s - s0)) / (s1 - s0)
  }
  return 0
}

export function ruins(iso: Iso): Parts {
  const p = parts()
  const random = rng('ruins')
  const stone = mat.stone
  // The old floor.
  p.body.push(
    polygon([iso.p(-54, -34), iso.p(46, -34), iso.p(46, 50), iso.p(-54, 50)], {
      fill: mat.sandstone,
      fillOpacity: 0.35,
      strokeOpacity: 0.35,
      dash: '3 3',
      width: 0.8
    })
  )
  p.body.push(shadow([iso.p(-54, -34), iso.p(-54, 50), iso.p(46, 50)], 30, 0.1))
  const walls: { key: number; svg: string }[] = [
    {
      key: 96,
      svg: brokenWall(
        iso,
        'u',
        50,
        [
          [-50, 16],
          [-38, 20],
          [-30, 12],
          [-22, 14],
          [-14, 6],
          [-4, 8],
          [-4, 0.01]
        ],
        stone
      )
    },
    {
      key: 94,
      svg: brokenWall(
        iso,
        'u',
        50,
        [
          [10, 6],
          [18, 12],
          [30, 10],
          [36, 4],
          [40, 4],
          [40, 0.01]
        ],
        stone
      )
    },
    {
      key: 40,
      svg: brokenWall(
        iso,
        'v',
        40,
        [
          [-12, 8],
          [-4, 18],
          [6, 22],
          [14, 14],
          [20, 4],
          [20, 0.01]
        ],
        stone
      )
    },
    {
      key: -40,
      svg: brokenWall(
        iso,
        'v',
        -54,
        [
          [-34, 22],
          [-22, 30],
          [-10, 42],
          [4, 48],
          [16, 46],
          [26, 34],
          [34, 22],
          [42, 12],
          [50, 8],
          [50, 0.01]
        ],
        stone
      )
    },
    {
      key: -60,
      svg: brokenWall(
        iso,
        'u',
        -34,
        [
          [-50, 26],
          [-40, 20],
          [-28, 22],
          [-18, 12],
          [-10, 6],
          [-4, 2],
          [-4, 0.01]
        ],
        stone
      )
    },
    {
      key: -50,
      svg: brokenWall(
        iso,
        'u',
        -34,
        [
          [14, 10],
          [24, 16],
          [32, 8],
          [38, 3],
          [38, 0.01]
        ],
        stone
      )
    }
  ]
  walls.sort((a, b) => b.key - a.key)
  for (const w of walls) p.body.push(w.svg)
  // A window opening in the tall wall, and moss on its broken top.
  const wall = boxOf({ u: -54, v: 8, w: 8, d: 60, h: 44 })
  p.body.push(opening(iso, wall, 'left', 4, 18, 10, 12, ink, true, 0.82))
  for (const [v, z] of [
    [-6, 37],
    [10, 47],
    [26, 33]
  ] as const) {
    const [x, y] = iso.p(-54, v, z)
    p.body.push(ellipse([x + 2, y - 1], 5, 2.2, { fill: mat.leaf, width: 0.7 }))
  }
  // Fallen blocks and rubble.
  const blocks: [number, number, number, number][] = [
    [-16, -46, 11, 6],
    [6, 10, 13, 7],
    [24, -46, 8, 5],
    [-10, 26, 8, 5],
    [26, 26, 9, 5]
  ]
  blocks.sort((a, b) => b[0] + b[1] - (a[0] + a[1]))
  for (const [u, v, sz, h] of blocks) p.body.push(box(iso, { u, v, w: sz, d: sz * 0.8, h, fill: stone }))
  for (let i = 0; i < 10; i++) {
    const [x, y] = Iso.flat(-40 + random() * 84, -48 + random() * 84)
    const [sx, sy] = iso.g(x, y)
    p.body.push(
      polygon(
        [
          [sx - 2.5, sy],
          [sx - 1, sy - 2.5],
          [sx + 2.5, sy - 1.5],
          [sx + 2, sy + 0.8]
        ],
        { fill: stone, width: 0.7 }
      )
    )
  }
  for (let i = 0; i < 7; i++) {
    const [x, y] = Iso.flat(-50 + random() * 96, -50 + random() * 100)
    const [sx, sy] = iso.g(x, y)
    p.body.push(
      path(`M${n(sx - 3)} ${n(sy)}l-1 -4M${n(sx)} ${n(sy)}v-5M${n(sx + 3)} ${n(sy)}l1 -4`, {
        width: 1,
        strokeOpacity: 0.55
      })
    )
  }
  return p
}

/** A broad old tree: heavy trunk, root flare, lobed crown lit from the top-left. */
export function oldTree(at: Pt, scale: number, seed: string): string {
  const random = rng(seed)
  const [x, y] = at
  const s = scale
  const out: string[] = []
  out.push(ellipse([x + 16 * s, y + 4 * s], 34 * s, 10 * s, { fill: ink, stroke: false, fillOpacity: 0.14 }))
  const trunk = `M${n(x - 13 * s)} ${n(y + 2 * s)}C${n(x - 7 * s)} ${n(y - 2 * s)} ${n(x - 6 * s)} ${n(y - 18 * s)} ${n(x - 6 * s)} ${n(y - 34 * s)}L${n(x - 16 * s)} ${n(y - 50 * s)}L${n(x - 10 * s)} ${n(y - 52 * s)}L${n(x - 1 * s)} ${n(y - 40 * s)}L${n(x + 9 * s)} ${n(y - 54 * s)}L${n(x + 14 * s)} ${n(y - 50 * s)}L${n(x + 6 * s)} ${n(y - 34 * s)}C${n(x + 6 * s)} ${n(y - 18 * s)} ${n(x + 8 * s)} ${n(y - 2 * s)} ${n(x + 15 * s)} ${n(y + 2 * s)}Q${n(x)} ${n(y + 6 * s)} ${n(x - 13 * s)} ${n(y + 2 * s)}Z`
  out.push(path(trunk, { fill: mat.timber }))
  out.push(
    path(
      `M${n(x + 1 * s)} ${n(y + 4 * s)}C${n(x + 3 * s)} ${n(y - 14 * s)} ${n(x + 3 * s)} ${n(y - 26 * s)} ${n(x + 3 * s)} ${n(y - 36 * s)}L${n(x + 6 * s)} ${n(y - 34 * s)}C${n(x + 6 * s)} ${n(y - 18 * s)} ${n(x + 8 * s)} ${n(y - 2 * s)} ${n(x + 15 * s)} ${n(y + 2 * s)}Q${n(x + 8 * s)} ${n(y + 4.5 * s)} ${n(x + 1 * s)} ${n(y + 4 * s)}Z`,
      { fill: ink, stroke: false, fillOpacity: 0.3 }
    )
  )
  out.push(
    path(`M${n(x - 3 * s)} ${n(y - 8 * s)}q-1 -8 1 -16M${n(x + 2 * s)} ${n(y - 14 * s)}q1 -6 -1 -12`, {
      width: 0.6,
      strokeOpacity: 0.5
    })
  )
  out.push(path(`M${n(x - 13 * s)} ${n(y + 2 * s)}q-6 1 -9 4M${n(x + 15 * s)} ${n(y + 2 * s)}q7 0 10 3`, { width: 1 }))
  // Crown lobes, back to front.
  const lobes: [number, number, number][] = [
    [-2, -86, 22],
    [-26, -76, 19],
    [24, -78, 20],
    [-38, -58, 17],
    [40, -58, 17],
    [-16, -62, 22],
    [16, -60, 22],
    [0, -50, 19],
    [-28, -46, 14],
    [30, -44, 14]
  ]
  for (const [dx, dy, r0] of lobes) {
    const r = r0 * s * (0.95 + random() * 0.1)
    const cx = x + dx * s
    const cy = y + dy * s
    out.push(ellipse([cx, cy], r, r * 0.92, { fill: mat.pine }))
    out.push(
      path(
        `M${n(cx - r * 0.92)} ${n(cy - r * 0.05)}A${n(r)} ${n(r * 0.92)} 0 0 1 ${n(cx + r * 0.3)} ${n(cy - r * 0.86)}Q${n(cx - r * 0.25)} ${n(cy - r * 0.35)} ${n(cx - r * 0.92)} ${n(cy - r * 0.05)}Z`,
        { fill: mat.leaf, stroke: false }
      )
    )
    out.push(
      path(
        `M${n(cx + r * 0.1)} ${n(cy + r * 0.55)}q${n(r * 0.2)} ${n(r * 0.12)} ${n(r * 0.4)} 0M${n(cx + r * 0.35)} ${n(cy + r * 0.25)}q${n(r * 0.2)} ${n(r * 0.12)} ${n(r * 0.4)} 0`,
        { width: 0.7, strokeOpacity: 0.5 }
      )
    )
  }
  return out.join('')
}

export function ancientForest(iso: Iso): Parts {
  const p = parts()
  const random = rng('ancient-forest')
  p.body.push(ellipse(iso.g(0, 6), 96, 40, { fill: mat.leaf, stroke: false, fillOpacity: 0.25 }))
  for (let i = 0; i < 6; i++) {
    const [x, y] = [(random() - 0.5) * 150, (random() - 0.5) * 100]
    const [sx, sy] = iso.g(x, y)
    p.body.push(
      path(`M${n(sx - 3)} ${n(sy)}l-1 -4M${n(sx)} ${n(sy)}v-5M${n(sx + 3)} ${n(sy)}l1 -4`, {
        width: 1,
        strokeOpacity: 0.5
      })
    )
  }
  p.body.push(oldTree(iso.g(-56, -40), 0.72, 'af-a'))
  p.body.push(oldTree(iso.g(52, -28), 0.78, 'af-b'))
  p.body.push(oldTree(iso.g(-4, 6), 1.1, 'af-c'))
  p.body.push(oldTree(iso.g(-62, 44), 0.6, 'af-d'))
  p.body.push(oldTree(iso.g(58, 52), 0.55, 'af-e'))
  return p
}

export function cottage(iso: Iso): Parts {
  const p = parts()
  const house = { u: 8, v: 18, w: 54, d: 34, h: 20 }
  const hb = boxOf(house)
  p.body.push(shadow(footprint(iso, hb), 40))
  // Garden tree behind.
  p.body.push(oldTree(iso.p(46, 50), 0.4, 'cottage-tree'))
  p.body.push(box(iso, { ...house, fill: mat.limestone }))
  p.body.push(door(iso, hb, 'right', 10, 0, 9, 13))
  win(iso, hb, 'right', -8, 7, 7, 7, p, false)
  win(iso, hb, 'right', 26, 7, 7, 7, p, false)
  win(iso, hb, 'left', 18, 7, 7, 7, p, false)
  p.body.push(gable(iso, hb, 'u', 22, mat.thatch, mat.limestone, 5))
  // Thatch texture on the front slope.
  const th: string[] = []
  for (let u = hb.u0; u <= hb.u1 + 2; u += 6)
    th.push(`M${pts([iso.p(u, hb.v0 - 4, 18)])}L${pts([iso.p(u, hb.v0 + 4, 26)])}`)
  p.body.push(path(th.join(''), { width: 0.6, strokeOpacity: 0.4 }))
  p.body.push(path(`M${pts([iso.p(hb.u0 - 5, 18, 42)])}L${pts([iso.p(hb.u1 + 5, 18, 42)])}`, { width: 2.4 }))
  // Chimney on the gable end.
  const ch = { u: hb.u0 - 4, v: 26, w: 7, d: 8, h: 40 }
  p.body.push(box(iso, { ...ch, fill: mat.stone }))
  p.lit.push(smoke(iso.p(hb.u0 - 4, 26, 42)))
  // Garden wall and beds at the front.
  const wall: [number, number, number, number][] = []
  for (let u = -46; u <= 50; u += 8) wall.push([u, -36, 8, 4])
  for (let v = -28; v <= 20; v += 8) wall.push([-46, v, 4, 8])
  wall.sort((a, b) => b[0] + b[1] - (a[0] + a[1]))
  const beds: string[] = []
  for (let v = -30; v <= -8; v += 6) beds.push(`M${pts([iso.p(-30, v, 0)])}L${pts([iso.p(46, v, 0)])}`)
  p.body.push(path(beds.join(''), { stroke: mat.leaf, width: 2, strokeOpacity: 0.9 }))
  p.body.push(path(beds.join(''), { width: 0.5, strokeOpacity: 0.35 }))
  for (const [u, v, w, d] of wall) {
    if (u === 6 || u === 14) continue
    p.body.push(box(iso, { u, v, w, d, h: 6, fill: mat.stone }))
  }
  return p
}

// ---------------------------------------------------------------------------------------------------------------
// The Citadel: Library, Council Hall and Tower on a raised terrace around a central square (a 7-hex flower).

/** Clips a flat-ground segment to the hex scaled by `s` (Cyrus–Beck). */
function clipToHex(
  a: readonly [number, number],
  b: readonly [number, number],
  s: number
): [[number, number], [number, number]] | null {
  let t0 = 0
  let t1 = 1
  const d = [b[0] - a[0], b[1] - a[1]]
  for (let i = 0; i < 6; i++) {
    const ang = (i * Math.PI) / 3
    const nx = Math.cos(ang)
    const ny = Math.sin(ang)
    const num = 128 * s - (nx * a[0] + ny * a[1])
    const den = nx * (d[0] as number) + ny * (d[1] as number)
    if (den === 0) {
      if (num < 0) return null
    } else {
      const t = num / den
      if (den > 0) t1 = Math.min(t1, t)
      else t0 = Math.max(t0, t)
    }
    if (t0 > t1) return null
  }
  const at = (t: number): [number, number] => [a[0] + (d[0] as number) * t, a[1] + (d[1] as number) * t]
  return [at(t0), at(t1)]
}

export function citadel(): Structure {
  const p = parts()
  const iso = new Iso(128, 74)
  const S = 1.4
  const Z = 16
  const top = iso.hex(S, Z)
  const ground = iso.hex(S, 0)
  const [, , r2, f3, l4] = top as [Pt, Pt, Pt, Pt, Pt, Pt]
  const [, , gr2, gf3, gl4] = ground as [Pt, Pt, Pt, Pt, Pt, Pt]
  p.body.push(shadow([gl4, gf3, gr2], 30, 0.12))
  p.body.push(face([l4, f3, gf3, gl4], mat.stone, 'lit'))
  p.body.push(face([f3, r2, gr2, gf3], mat.stone, 'shade'))
  p.body.push(hatch(gf3, gr2, r2, f3, 8, 0.16, 0.04))
  for (const t of [0.33, 0.66]) {
    p.body.push(
      path(`M${pts([lerp(l4, gl4, t)])}L${pts([lerp(f3, gf3, t)])}L${pts([lerp(r2, gr2, t)])}`, {
        width: 0.6,
        strokeOpacity: 0.4
      })
    )
  }
  p.body.push(face(top, mat.limestone, 'top'))
  // Paving: a lattice of hairlines and the central square.
  const pave: string[] = []
  const R = (128 / Math.cos(Math.PI / 6)) * S
  for (let k = -R; k < R; k += 22) {
    for (const [a, b] of [
      [Iso.flat(k, -R), Iso.flat(k, R)],
      [Iso.flat(-R, k), Iso.flat(R, k)]
    ] as const) {
      const c = clipToHex(a, b, S * 0.97)
      if (c) pave.push(`M${pts([iso.g(...c[0], Z)])}L${pts([iso.g(...c[1], Z)])}`)
    }
  }
  p.body.push(`<g opacity="0.16">${path(pave.join(''), { width: 0.6 })}</g>`)
  p.body.push(polygon(top, { fill: 'none' }))
  p.body.push(
    polygon(
      top.map(([x, y]) => [x, y]),
      { width: 1.25 }
    )
  )
  p.body.push(ellipse(iso.g(10, 16, Z), 46, 23, { fill: mat.stone, fillOpacity: 0.45, width: 1 }))
  p.body.push(ellipse(iso.g(10, 16, Z), 34, 17, { width: 0.6, strokeOpacity: 0.5 }))
  // Stairs down the front-left face.
  const uf = -R
  void uf
  for (let i = 0; i < 4; i++) {
    p.body.push(box(iso, { u: uf - 5 - i * 9, v: -30, w: 10, d: 60, h: Z - i * 4, fill: mat.limestone }))
  }
  // Garden on the east: three round trees and a low hedge.
  const buildings: { at: [number, number]; draw: (sub: Iso) => void }[] = [
    { at: Iso.uvAt(-62, -60), draw: (sub) => councilHall(sub, p) },
    { at: Iso.uvAt(92, -50), draw: (sub) => tower(sub, p) },
    { at: Iso.uvAt(-138, 14), draw: (sub) => library(sub, p) },
    {
      at: Iso.uvAt(128, 22),
      draw: (sub) => {
        for (const [x, y, s, seed] of [
          [-24, -14, 0.36, 'cit-a'],
          [26, -6, 0.42, 'cit-b'],
          [-2, 26, 0.38, 'cit-c']
        ] as const) {
          p.body.push(oldTree(sub.g(x, y), s, seed))
        }
      }
    },
    {
      at: Iso.uvAt(10, 8),
      draw: (sub) => {
        p.body.push(box(sub, { u: 0, v: 0, w: 14, d: 14, h: 4, fill: mat.stone }))
        p.body.push(box(sub, { u: 0, v: 0, w: 6, d: 6, h: 24, z: 4, fill: mat.limestone }))
        const tip = sub.p(0, 0, 28)
        p.body.push(
          polygon(
            [
              [tip[0] - 4.6, tip[1] + 1],
              [tip[0], tip[1] - 9],
              [tip[0] + 4.6, tip[1] + 1]
            ],
            { fill: mat.brass, width: 1 }
          )
        )
      }
    }
  ]
  buildings.sort((a, b) => b.at[0] + b.at[1] - (a.at[0] + a.at[1]))
  for (const b of buildings) {
    const [x, y] = iso.p(b.at[0], b.at[1], Z)
    b.draw(new Iso(x, y, 1.08))
  }
  return { body: p.body.join(''), lit: p.lit.join(''), vb: { x: -256, y: -150, w: 768, h: 196 + 111 + 150 } }
}

// ---------------------------------------------------------------------------------------------------------------

/** Plan scale for single-hex structures: drawn a quarter larger than their plan units so they hold the hex. */
const K1 = 1.25
const at = () => new Iso(128, 74, K1)

export const structureDrawers: Record<string, () => Structure> = {
  citadel,
  library: () => single(library(at()), 60),
  'council-hall': () => single(councilHall(at()), 46),
  tower: () => single(tower(at()), 96),
  observatory: () => single(observatory(at()), 30),
  lighthouse: () => single(lighthouse(at()), 120),
  port,
  dock: () => single(dock(at()), 4),
  'rail-depot': () => single(railDepot(at()), 4),
  airport: () => single(airport(at()), 136),
  'customs-house': () => single(customsHouse(at()), 36),
  bridge: () => single(bridge(at()), 0),
  workshop: () => single(workshop(at()), 52),
  mill: () => single(mill(at()), 10),
  ruins: () => single(ruins(at()), 0),
  'ancient-forest': () => single(ancientForest(at()), 46),
  cottage: () => single(cottage(at()), 22)
}

export function observatory(iso: Iso): Parts {
  const p = parts()
  p.body.push(shadow(iso.arc(0, 0, 46, 0, 0, Math.PI * 2, 18), 70))
  // Annex behind-right.
  const annex = { u: 46, v: 0, w: 26, d: 24, h: 16 }
  const ab = boxOf(annex)
  p.body.push(box(iso, { ...annex, fill: mat.limestone }))
  win(iso, ab, 'right', 46, 5, 5, 6, p)
  p.body.push(gable(iso, ab, 'u', 9, mat.slate, mat.limestone, 2))
  p.body.push(cylinder(iso, 0, 0, 48, 4, 0, mat.stone))
  p.body.push(cylinder(iso, 0, 0, 44, 4, 4, mat.limestone))
  p.body.push(cylinder(iso, 0, 0, 38, 24, 8, mat.limestone))
  for (const a of [0.2, 0.42, 0.64, 0.86]) {
    const ang = Math.PI * a
    const [wx, wy] = iso.g(Math.cos(ang) * 38, Math.sin(ang) * 38, 14)
    p.body.push(path(`M${n(wx - 2.5)} ${n(wy)}h5v-8q-2.5 -3 -5 0Z`, { ...dark(0.72), width: 0.7 }))
    p.lit.push(path(`M${n(wx - 2.5)} ${n(wy)}h5v-8q-2.5 -3 -5 0Z`, { fill: mat.brass, width: 0.7 }))
  }
  p.body.push(cylinder(iso, 0, 0, 41, 3, 32, mat.limestone))
  p.body.push(dome(iso, 0, 0, 37, 35, mat.limestone, 35, 4))
  const [x, y] = iso.g(0, 0, 35)
  // The slit, with the telescope emerging.
  const slit = `M${n(x + 4)} ${n(y - 35)}Q${n(x + 20)} ${n(y - 30)} ${n(x + 25)} ${n(y + 12)}L${n(x + 16)} ${n(y + 15)}Q${n(x + 12)} ${n(y - 28)} ${n(x - 3)} ${n(y - 35)}Z`
  p.body.push(path(slit, { fill: ink, fillOpacity: 0.85, width: 1 }))
  const t0: Pt = [x + 12, y - 12]
  const t1: Pt = [x + 40, y - 44]
  const dir = [t1[0] - t0[0], t1[1] - t0[1]]
  const len = Math.hypot(dir[0] as number, dir[1] as number)
  const nx = (-(dir[1] as number) / len) * 3.4
  const ny = ((dir[0] as number) / len) * 3.4
  p.body.push(
    polygon(
      [
        [t0[0] + nx, t0[1] + ny],
        [t1[0] + nx * 0.8, t1[1] + ny * 0.8],
        [t1[0] - nx * 0.8, t1[1] - ny * 0.8],
        [t0[0] - nx, t0[1] - ny]
      ],
      { fill: mat.brass, width: 1 }
    )
  )
  p.body.push(ellipse(t1, 3, 3, { fill: ink, fillOpacity: 0.7, width: 0.8 }))
  const [fx, fy] = iso.g(0, 0, 70)
  p.body.push(seg([fx, fy], [fx, fy - 6], { width: 1 }))
  p.body.push(ellipse([fx, fy - 7], 1.8, 1.8, { fill: mat.brass, width: 0.8 }))
  return p
}
