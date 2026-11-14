/**
 * Decals (condition overlays for quiet, weathered and ruined structures) and connectors (ground-level ribbons on
 * a hex top face). Decals sit around a building's base and lower walls; connectors run edge to edge.
 */
import { cylinder, ellipse, face, Iso, ink, lerp, mat, n, type Pt, paper, path, polygon, pts, rng, seg } from './iso.ts'
import { ribbon, ribbonLine, terrainFill } from './terrain.ts'

export interface Overlay {
  readonly svg: string
  readonly vb: { readonly x: number; readonly y: number; readonly w: number; readonly h: number }
}

const DECAL_VB = { x: 0, y: -60, w: 256, h: 256 }
const FACE_VB = { x: 0, y: 0, w: 256, h: 196 }

// ---------------------------------------------------------------------------------------------------------------
// Decals

function ivy(): Overlay {
  const random = rng('ivy')
  const stems: [Pt, number, number][] = [
    [[84, 88], 44, 1],
    [[168, 92], 38, -1],
    [[118, 102], 30, 1],
    [[196, 80], 26, -1],
    [[62, 78], 22, 1]
  ]
  const out: string[] = []
  for (const [[x, y], h, dir] of stems) {
    let d = `M${n(x)} ${n(y)}`
    const leaves: Pt[] = []
    let cx = x
    let cy = y
    for (let i = 0; i < 5; i++) {
      const nx = cx + (random() - 0.5) * 6 + dir * 1.5
      const ny = cy - h / 5
      d += `Q${n(cx + dir * 4)} ${n((cy + ny) / 2)} ${n(nx)} ${n(ny)}`
      leaves.push([nx, ny], [cx + dir * 4, (cy + ny) / 2])
      cx = nx
      cy = ny
    }
    out.push(path(d, { stroke: mat.timber, width: 1 }))
    for (const [lx, ly] of leaves) {
      const s = 2.2 + random() * 1.4
      const leaf = (dx: number, dy: number) => ellipse([lx + dx, ly + dy], s, s * 0.8, { fill: mat.leaf, width: 0.7 })
      out.push(leaf(-s * 0.8, 0) + leaf(s * 0.8, 0.5) + leaf(0, -s * 0.8))
    }
    // a skirt of leaves at the root
    out.push(ellipse([x, y + 1], 8, 3, { fill: mat.pine, width: 0.8 }))
  }
  return { svg: out.join(''), vb: DECAL_VB }
}

function cracks(): Overlay {
  const random = rng('cracks')
  const crack = (start: Pt, dirY: number, len: number, branch = true): string => {
    let [x, y] = start
    let d = `M${n(x)} ${n(y)}`
    const pts2: Pt[] = []
    for (let i = 0; i < len; i++) {
      x += (random() - 0.5) * 7
      y += dirY * (3 + random() * 3)
      d += `L${n(x)} ${n(y)}`
      pts2.push([x, y])
    }
    if (branch && pts2.length > 2) {
      const [bx, by] = pts2[1] as Pt
      d += `M${n(bx)} ${n(by)}l${n(5 + random() * 3)} ${n(dirY * 4)}l${n(2)} ${n(dirY * 4)}`
    }
    return d
  }
  const d = [
    crack([100, 40], 1, 7),
    crack([152, 34], 1, 8),
    crack([126, 60], 1, 5),
    crack([86, 74], 1, 3, false),
    crack([176, 66], 1, 4, false)
  ].join('')
  const ground = [crack([118, 112], 0.3, 6, false), crack([150, 108], 0.25, 5, false)].join('')
  return {
    svg: path(d, { width: 1.1, strokeOpacity: 0.85 }) + path(ground, { width: 0.9, strokeOpacity: 0.6 }),
    vb: DECAL_VB
  }
}

function moss(): Overlay {
  const random = rng('moss')
  const patches: [number, number, number][] = [
    [80, 86, 10],
    [112, 98, 8],
    [154, 96, 11],
    [184, 84, 9],
    [98, 46, 7],
    [146, 30, 8],
    [170, 52, 6]
  ]
  const out: string[] = []
  for (const [x, y, r] of patches) {
    const lobes = 3 + Math.floor(random() * 2)
    for (let i = 0; i < lobes; i++) {
      const dx = (i - lobes / 2) * r * 0.55
      const rr = r * (0.5 + random() * 0.35)
      out.push(
        ellipse([x + dx, y + (random() - 0.5) * 2], rr, rr * 0.45, { fill: mat.leaf, width: 0.7, fillOpacity: 0.9 })
      )
    }
    for (let i = 0; i < 4; i++) {
      out.push(
        ellipse([x + (random() - 0.5) * r * 1.4, y + (random() - 0.5) * 2], 0.7, 0.7, { fill: mat.pine, stroke: false })
      )
    }
  }
  return { svg: out.join(''), vb: DECAL_VB }
}

function fallenRoof(): Overlay {
  const random = rng('fallen-roof')
  const iso = new Iso(128, 74)
  const out: string[] = []
  // A slab of roof lying on the ground at the front right, its rafters sticking out.
  const slab: Pt[] = [iso.p(-6, -56, 0), iso.p(34, -56, 0), iso.p(38, -40, 7), iso.p(-2, -40, 7)]
  out.push(
    polygon([...slab.map(([x, y], i): Pt => [x + (i === 1 || i === 2 ? 6 : 5), y + 3])], {
      fill: ink,
      stroke: false,
      fillOpacity: 0.16
    })
  )
  out.push(face(slab, mat.slate, 'shade'))
  const lines: string[] = []
  for (let i = 1; i < 6; i++) {
    const t = i / 6
    lines.push(`M${pts([lerp(slab[0] as Pt, slab[1] as Pt, t)])}L${pts([lerp(slab[3] as Pt, slab[2] as Pt, t)])}`)
  }
  for (let i = 1; i < 3; i++) {
    const t = i / 3
    lines.push(`M${pts([lerp(slab[0] as Pt, slab[3] as Pt, t)])}L${pts([lerp(slab[1] as Pt, slab[2] as Pt, t)])}`)
  }
  out.push(path(lines.join(''), { width: 0.6, strokeOpacity: 0.5 }))
  for (const t of [0.2, 0.55, 0.9]) {
    const a = lerp(slab[3] as Pt, slab[2] as Pt, t)
    out.push(seg(a, [a[0] - 4, a[1] - 9], { stroke: mat.timber, width: 2 }))
    out.push(seg(a, [a[0] - 4, a[1] - 9], { width: 0.6 }))
  }
  // Loose slates and rubble.
  for (let i = 0; i < 12; i++) {
    const [x, y] = [100 + random() * 110, 92 + random() * 26]
    const a = random() * 0.6 - 0.3
    out.push(
      polygon(
        [
          [x, y],
          [x + 5, y + a * 4],
          [x + 6, y + 2 + a * 4],
          [x + 1, y + 2]
        ],
        { fill: mat.slate, width: 0.6 }
      )
    )
  }
  for (let i = 0; i < 7; i++) {
    const [x, y] = [70 + random() * 130, 96 + random() * 18]
    out.push(
      polygon(
        [
          [x - 2.5, y],
          [x - 1, y - 2.5],
          [x + 2.5, y - 1.5],
          [x + 2, y + 0.8]
        ],
        { fill: mat.stone, width: 0.6 }
      )
    )
  }
  // A broken beam.
  out.push(seg([84, 108], [112, 100], { stroke: mat.timber, width: 3.2 }))
  out.push(path(`M84 106.6L112 98.6M84 109.4L112 101.4`, { width: 0.6 }))
  out.push(path(`M112 98.6l3 -2l-1 3.5l2 1Z`, { fill: mat.timber, width: 0.6 }))
  return { svg: out.join(''), vb: DECAL_VB }
}

export const decalDrawers: Record<string, () => Overlay> = {
  ivy,
  cracks,
  moss,
  'fallen-roof': fallenRoof
}

// ---------------------------------------------------------------------------------------------------------------
// Connectors: orientation 0 runs west to east (edge 3 to edge 0); the quay lines the south-east edge.

function road(): Overlay {
  const iso = new Iso()
  const r = ribbon(iso, 3, 0, 20, 0, 26)
  const verge = ribbon(iso, 3, 0, 25, 0, 26)
  const random = rng('road')
  const setts: string[] = []
  for (let i = 0; i < 26; i++) {
    const t = 0.06 + random() * 0.88
    const x = -128 + 256 * t
    const y = 78 * t * (1 - t) * (1 - 2 * t) + (random() - 0.5) * 24
    const [sx, sy] = iso.g(x, y)
    setts.push(`M${n(sx - 1.5)} ${n(sy)}h3`)
  }
  return {
    svg:
      path(verge.body, { fill: ink, stroke: false, fillOpacity: 0.1 }) +
      path(r.body, { fill: mat.sandstone, stroke: false }) +
      path(r.body, { fill: paper, stroke: false, fillOpacity: 0.18 }) +
      path(setts.join(''), { width: 0.7, strokeOpacity: 0.35 }) +
      path(ribbonLine(iso, 3, 0, 20, 0.45, 0, 26), { width: 0.7, strokeOpacity: 0.4, dash: '7 5' }) +
      path(ribbonLine(iso, 3, 0, 20, -0.45, 0, 26), { width: 0.7, strokeOpacity: 0.4, dash: '7 5' }) +
      path(r.left, { width: 1 }) +
      path(r.right, { width: 1 }),
    vb: FACE_VB
  }
}

function riverConnector(): Overlay {
  const iso = new Iso()
  const bank = ribbon(iso, 3, 0, 27, 0, -30)
  const water = ribbon(iso, 3, 0, 22, -2, -30)
  return {
    svg:
      path(bank.body, { fill: terrainFill('sand'), stroke: false }) +
      path(water.body, { fill: terrainFill('river'), stroke: false }) +
      path(water.left, { width: 0.8, strokeOpacity: 0.5 }) +
      [-0.45, 0.15]
        .map((s, i) =>
          path(ribbonLine(iso, 3, 0, 22, s, -2, -30), {
            stroke: paper,
            width: 1,
            strokeOpacity: 0.75,
            dash: i ? '12 8 3 8' : '8 10'
          })
        )
        .join('') +
      path(bank.left, { width: 1 }) +
      path(bank.right, { width: 1 }),
    vb: FACE_VB
  }
}

function bridgeSpan(): Overlay {
  const iso = new Iso()
  const z = 5
  const deck = ribbon(iso, 3, 0, 11, z, 0)
  const under = ribbon(iso, 3, 0, 11, 0, 0)
  const out: string[] = []
  out.push(path(under.body, { fill: ink, stroke: false, fillOpacity: 0.18 }))
  // Near fascia: the deck's edge, seen from the front.
  const pick = (x: number) => iso.g(x, 11, z)
  const fascia: Pt[] = []
  for (let x = -128; x <= 128; x += 8) fascia.push(pick(x))
  out.push(polygon([...fascia, ...[...fascia].reverse().map(([px, py]): Pt => [px, py + 3])], { fill: mat.timber }))
  out.push(
    polygon([...fascia, ...[...fascia].reverse().map(([px, py]): Pt => [px, py + 3])], {
      fill: ink,
      stroke: false,
      fillOpacity: 0.25
    })
  )
  out.push(path(deck.body, { fill: mat.timber }))
  out.push(path(deck.body, { fill: paper, stroke: false, fillOpacity: 0.15 }))
  const planks: string[] = []
  for (let x = -124; x <= 124; x += 6) planks.push(`M${pts([iso.g(x, -11, z)])}L${pts([iso.g(x, 11, z)])}`)
  out.push(path(planks.join(''), { width: 0.5, strokeOpacity: 0.45 }))
  // Rails on both sides, far first.
  for (const side of [-11, 11]) {
    const posts: string[] = []
    for (let x = -120; x <= 120; x += 24) {
      const b = iso.g(x, side, z)
      posts.push(`M${n(b[0])} ${n(b[1])}v-9`)
    }
    out.push(path(posts.join(''), { width: 1.2 }))
    out.push(seg(iso.g(-124, side, z + 9), iso.g(124, side, z + 9), { width: 1.2 }))
  }
  return { svg: out.join(''), vb: { x: 0, y: -20, w: 256, h: 216 } }
}

function quay(): Overlay {
  const iso = new Iso()
  const out: string[] = []
  const H = iso.hex(1, 0)
  // South-east edge runs from the front vertex (index 3) to the lower right vertex (index 2).
  const a = H[3] as Pt
  const b = H[2] as Pt
  // inward normal of the SE edge in flat ground is towards (-cos60, -sin60); in screen (-0.5*w, -0.866*w/2)
  const inward = (p: Pt, w: number): Pt => [p[0] - 0.5 * w, p[1] - 0.433 * w]
  const depth = 36
  const strip: Pt[] = [inward(a, 0), inward(b, 0), inward(b, depth), inward(a, depth)]
  const lift = (p: Pt, h: number): Pt => [p[0], p[1] - h]
  const top = strip.map((p) => lift(p, 3))
  out.push(face([a, b, lift(b, 3), lift(a, 3)], mat.limestone, 'shade'))
  out.push(face(top, mat.limestone, 'top'))
  // Coping blocks and paving joints.
  const joints: string[] = []
  for (let i = 1; i < 9; i++) {
    const t = i / 9
    joints.push(`M${pts([lerp(top[0] as Pt, top[1] as Pt, t)])}L${pts([lerp(top[3] as Pt, top[2] as Pt, t)])}`)
    joints.push(`M${pts([lerp(a, b, t)])}L${pts([lift(lerp(a, b, t), 3)])}`)
  }
  joints.push(`M${pts([lerp(top[0] as Pt, top[3] as Pt, 0.3)])}L${pts([lerp(top[1] as Pt, top[2] as Pt, 0.3)])}`)
  out.push(path(joints.join(''), { width: 0.6, strokeOpacity: 0.45 }))
  // Bollards and a ladder.
  for (const t of [0.2, 0.5, 0.8]) {
    const c = inward(lerp(a, b, t), 6)
    const g = new Iso(c[0], c[1] - 3)
    out.push(cylinder(g, 0, 0, 2.6, 5, 0, ink, mat.brass))
  }
  const l0 = lerp(a, b, 0.35)
  const l1 = lerp(a, b, 0.4)
  out.push(
    path(
      `M${pts([l0])}v10M${pts([l1])}v10M${n(l0[0])} ${n(l0[1] + 3)}L${n(l1[0])} ${n(l1[1] + 3)}M${n(l0[0])} ${n(l0[1] + 7)}L${n(l1[0])} ${n(l1[1] + 7)}`,
      { width: 0.9 }
    )
  )
  return { svg: out.join(''), vb: FACE_VB }
}

export const connectorDrawers: Record<string, () => Overlay> = {
  road,
  river: riverConnector,
  'bridge-span': bridgeSpan,
  quay
}
