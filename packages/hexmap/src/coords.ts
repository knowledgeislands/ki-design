/** Axial coordinates on a pointy-top hex grid. `r` grows southward, `q` eastward along a row. */
export interface Axial {
  readonly q: number
  readonly r: number
}

/** Cube coordinates: `q + r + s === 0`. */
export interface Cube {
  readonly q: number
  readonly r: number
  readonly s: number
}

/** Odd-r offset coordinates: odd rows are shoved half a hex to the right. */
export interface Offset {
  readonly col: number
  readonly row: number
}

/** Directions in neighbour-mask bit order: east, then anticlockwise. */
export const directionNames = ['e', 'ne', 'nw', 'w', 'sw', 'se'] as const
export type Direction = (typeof directionNames)[number]

/** Unit vectors for each direction, indexed as `directionNames`. */
export const directions: readonly Axial[] = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 }
]

/** Normalises `-0` to `0` so keys and output stay deterministic. */
const z = (n: number): number => (Object.is(n, -0) ? 0 : n)

export const hex = (q: number, r: number): Axial => ({ q: z(q), r: z(r) })

export const axialToCube = ({ q, r }: Axial): Cube => ({ q, r, s: z(-q - r) })
export const cubeToAxial = ({ q, r }: Cube): Axial => hex(q, r)

/** A stable string key, `"q,r"`, for maps and sets. */
export const hexKey = ({ q, r }: Axial): string => `${z(q)},${z(r)}`

/** Parses a `"q,r"` key. */
export function parseHexKey(key: string): Axial {
  const match = /^(-?\d+),(-?\d+)$/.exec(key)
  if (!match) throw new SyntaxError(`Not a hex key: ${JSON.stringify(key)}`)
  return hex(Number(match[1]), Number(match[2]))
}

export const hexEquals = (a: Axial, b: Axial): boolean => a.q === b.q && a.r === b.r
export const hexAdd = (a: Axial, b: Axial): Axial => hex(a.q + b.q, a.r + b.r)
export const hexScale = (a: Axial, k: number): Axial => hex(a.q * k, a.r * k)

/** The neighbour of `h` in direction index `d` (0–5, wrapping). */
export function neighbour(h: Axial, d: number): Axial {
  const step = directions[((d % 6) + 6) % 6] as Axial
  return hexAdd(h, step)
}

/** All six neighbours, in direction order. */
export const neighbours = (h: Axial): Axial[] => directions.map((step) => hexAdd(h, step))

/** Hex distance: the number of steps between `a` and `b`. */
export function distance(a: Axial, b: Axial): number {
  const dq = a.q - b.q
  const dr = a.r - b.r
  return (Math.abs(dq) + Math.abs(dr) + Math.abs(dq + dr)) / 2
}

/** Rounds fractional cube coordinates to the nearest hex. */
export function hexRound(q: number, r: number): Axial {
  const s = -q - r
  let rq = Math.round(q)
  let rr = Math.round(r)
  const rs = Math.round(s)
  const dq = Math.abs(rq - q)
  const dr = Math.abs(rr - r)
  const ds = Math.abs(rs - s)
  if (dq > dr && dq > ds) rq = -rr - rs
  else if (dr > ds) rr = -rq - rs
  return hex(rq, rr)
}

/** The hexes exactly `radius` steps from `center`: from the south-west corner, east first, then anticlockwise. */
export function ring(center: Axial, radius: number): Axial[] {
  if (radius < 0 || !Number.isInteger(radius)) throw new RangeError(`Radius must be a non-negative integer`)
  if (radius === 0) return [hex(center.q, center.r)]
  const out: Axial[] = []
  let cursor = hexAdd(center, hexScale(directions[4] as Axial, radius))
  for (let side = 0; side < 6; side++) {
    for (let step = 0; step < radius; step++) {
      out.push(cursor)
      cursor = neighbour(cursor, side)
    }
  }
  return out
}

/** Every hex within `radius` of `center`, ring by ring from the centre outwards. */
export function spiral(center: Axial, radius: number): Axial[] {
  const out: Axial[] = []
  for (let k = 0; k <= radius; k++) out.push(...ring(center, k))
  return out
}

/** The hexes on a straight line from `a` to `b`, inclusive. */
export function line(a: Axial, b: Axial): Axial[] {
  const n = distance(a, b)
  if (n === 0) return [hex(a.q, a.r)]
  // Nudge off exact edges so rounding is consistent.
  const eq = 1e-6
  const er = 2e-6
  const out: Axial[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    out.push(hexRound(a.q + eq + (b.q - a.q) * t, a.r + er + (b.r - a.r) * t))
  }
  return out
}

/** Axial to odd-r offset. */
export function axialToOffset({ q, r }: Axial): Offset {
  return { col: z(q + (r - (r & 1)) / 2), row: z(r) }
}

/** Odd-r offset to axial. */
export function offsetToAxial({ col, row }: Offset): Axial {
  return hex(col - (row - (row & 1)) / 2, row)
}

/**
 * A 6-bit mask with bit `d` set when the neighbour in direction `d` satisfies `test`. Tile sets use it to pick
 * coast, river and road variants.
 */
export function neighbourMask(h: Axial, test: (n: Axial) => boolean): number {
  let mask = 0
  for (let d = 0; d < 6; d++) if (test(neighbour(h, d))) mask |= 1 << d
  return mask
}

/** The direction names set in a mask. */
export const maskDirections = (mask: number): Direction[] => directionNames.filter((_, d) => (mask >> d) & 1)
