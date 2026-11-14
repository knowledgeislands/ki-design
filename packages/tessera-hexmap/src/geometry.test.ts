import { describe, expect, test } from 'bun:test'
import { hex, spiral } from './coords.ts'
import { fromPixel, hexCorners, iso, isoPosition, isoProject, isoSort, toPixel } from './geometry.ts'

describe('flat geometry', () => {
  test('pointy-top corners start at the top vertex', () => {
    const [top] = hexCorners(hex(0, 0), 10)
    expect(top?.x).toBeCloseTo(0)
    expect(top?.y).toBeCloseTo(-10)
  })

  test('pixel round-trip', () => {
    for (const h of spiral(hex(0, 0), 3)) expect(fromPixel(toPixel(h, 17), 17)).toEqual(h)
  })
})

describe('isometric geometry', () => {
  test('top face is 256 × 148 at the reference width', () => {
    const face = isoProject(hex(0, 0))
    const xs = face.map((p) => p.x)
    const ys = face.map((p) => p.y)
    expect(Math.max(...xs) - Math.min(...xs)).toBe(256)
    expect(Math.max(...ys) - Math.min(...ys)).toBe(148)
  })

  test('rows step by 111 and odd rows shift by 128', () => {
    const a = isoPosition(hex(0, 0))
    const b = isoPosition(hex(0, 1))
    expect(b.y - a.y).toBe(iso.rowStep)
    expect(b.x - a.x).toBe(iso.oddRowOffset)
  })

  test('adjacent faces share an edge', () => {
    const a = isoProject(hex(0, 0))
    const b = isoProject(hex(0, 1))
    // The south-east neighbour's top vertex meets the bottom-right edge of the first face.
    expect(b[5]).toEqual(a[3] ?? { x: 0, y: 0 })
    expect(b[0]).toEqual(a[2] ?? { x: 0, y: 0 })
  })

  test('scales with width', () => {
    expect(isoPosition(hex(0, 1), 128).y - isoPosition(hex(0, 0), 128).y).toBe(55.5)
  })

  test('painter order draws back rows first', () => {
    const sorted = isoSort([hex(0, 1), hex(1, -1), hex(-1, 1), hex(0, -1)])
    expect(sorted).toEqual([hex(0, -1), hex(1, -1), hex(-1, 1), hex(0, 1)])
  })
})
