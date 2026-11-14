import { type Axial, axialToOffset, hexRound } from './coords.ts'

export interface Point {
  readonly x: number
  readonly y: number
}

const SQRT3 = Math.sqrt(3)

/** Centre of a pointy-top hex of circumradius `size`, for flat top-down rendering. */
export function toPixel({ q, r }: Axial, size: number): Point {
  return { x: size * SQRT3 * (q + r / 2), y: size * 1.5 * r }
}

/** The hex containing a pixel, for flat top-down rendering. */
export function fromPixel({ x, y }: Point, size: number): Axial {
  const q = ((SQRT3 / 3) * x - y / 3) / size
  const r = ((2 / 3) * y) / size
  return hexRound(q, r)
}

/** The six corners of a pointy-top hex, clockwise from the top vertex. */
export function hexCorners(h: Axial, size: number): Point[] {
  const { x, y } = toPixel(h, size)
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 90)
    return { x: x + size * Math.cos(angle), y: y + size * Math.sin(angle) }
  })
}

/**
 * Isometric geometry for the tile sets: a pointy-top hex squashed 2:1 (dimetric). At the reference width of 256 the
 * top face is 148 tall, rows step by 111 and odd rows shift right by 128.
 */
export const iso = {
  width: 256,
  height: 148,
  rowStep: 111,
  oddRowOffset: 128,
  /** Vertical drop from the top vertex to the upper shoulders. */
  shoulder: 37
} as const

/** Centre of a hex's top face in isometric space for a tile `w` wide. */
export function isoPosition(h: Axial, w: number = iso.width): Point {
  const k = w / iso.width
  const { col, row } = axialToOffset(h)
  return {
    x: col * w + (row & 1 ? iso.oddRowOffset * k : 0) + w / 2,
    y: row * iso.rowStep * k + (iso.height * k) / 2
  }
}

/** The top-face polygon of a hex in isometric space, clockwise from the top vertex. */
export function isoProject(h: Axial, w: number = iso.width): Point[] {
  const k = w / iso.width
  const { x, y } = isoPosition(h, w)
  const half = w / 2
  const top = (iso.height * k) / 2
  const shoulder = top - iso.shoulder * k
  return [
    { x, y: y - top },
    { x: x + half, y: y - shoulder },
    { x: x + half, y: y + shoulder },
    { x, y: y + top },
    { x: x - half, y: y + shoulder },
    { x: x - half, y: y - shoulder }
  ]
}

/** Painter's order for isometric drawing: back rows first, then west to east. Returns a new array. */
export function isoSort<T extends Axial>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => a.r - b.r || axialToOffset(a).col - axialToOffset(b).col)
}
