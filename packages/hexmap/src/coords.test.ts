import { describe, expect, test } from 'bun:test'
import {
  axialToCube,
  axialToOffset,
  distance,
  hex,
  hexKey,
  line,
  maskDirections,
  neighbour,
  neighbourMask,
  neighbours,
  offsetToAxial,
  parseHexKey,
  ring,
  spiral
} from './coords.ts'

const origin = hex(0, 0)

describe('axial and cube', () => {
  test('cube coordinates sum to zero', () => {
    const { q, r, s } = axialToCube(hex(2, -5))
    expect(q + r + s).toBe(0)
  })

  test('keys round-trip and never contain -0', () => {
    expect(hexKey(hex(-0, 3))).toBe('0,3')
    expect(parseHexKey('-2,7')).toEqual(hex(-2, 7))
    expect(() => parseHexKey('a,b')).toThrow(SyntaxError)
  })
})

describe('neighbours and distance', () => {
  test('six distinct neighbours, each one step away', () => {
    const all = neighbours(origin)
    expect(new Set(all.map(hexKey)).size).toBe(6)
    for (const n of all) expect(distance(origin, n)).toBe(1)
  })

  test('direction index wraps', () => {
    expect(neighbour(origin, 6)).toEqual(neighbour(origin, 0))
    expect(neighbour(origin, -1)).toEqual(neighbour(origin, 5))
  })

  test('distance is symmetric', () => {
    expect(distance(hex(-3, 1), hex(2, 2))).toBe(6)
    expect(distance(hex(2, 2), hex(-3, 1))).toBe(6)
  })
})

describe('rings, spirals and lines', () => {
  test('ring k has 6k hexes, all at distance k', () => {
    expect(ring(origin, 0)).toEqual([origin])
    for (const k of [1, 2, 4]) {
      const hexes = ring(origin, k)
      expect(hexes).toHaveLength(6 * k)
      expect(new Set(hexes.map(hexKey)).size).toBe(6 * k)
      for (const h of hexes) expect(distance(origin, h)).toBe(k)
    }
  })

  test('spiral of radius n covers 3n(n+1)+1 hexes', () => {
    expect(spiral(origin, 4)).toHaveLength(61)
    expect(spiral(origin, 4)[0]).toEqual(origin)
  })

  test('line is contiguous and inclusive', () => {
    const path = line(hex(-2, 0), hex(3, -2))
    expect(path).toHaveLength(6)
    expect(path[0]).toEqual(hex(-2, 0))
    expect(path.at(-1)).toEqual(hex(3, -2))
    for (let i = 1; i < path.length; i++) expect(distance(path[i - 1] ?? origin, path[i] ?? origin)).toBe(1)
  })
})

describe('odd-r offset', () => {
  test('round-trips across negative and odd rows', () => {
    for (const h of spiral(origin, 3)) expect(offsetToAxial(axialToOffset(h))).toEqual(h)
  })

  test('odd rows shift right', () => {
    expect(axialToOffset(hex(0, 1))).toEqual({ col: 0, row: 1 })
    expect(axialToOffset(hex(-1, 2))).toEqual({ col: 0, row: 2 })
    expect(axialToOffset(hex(0, -1))).toEqual({ col: -1, row: -1 })
  })
})

describe('neighbour mask', () => {
  test('sets one bit per matching direction', () => {
    const land = new Set([hexKey(hex(1, 0)), hexKey(hex(0, 1))])
    const mask = neighbourMask(origin, (n) => land.has(hexKey(n)))
    expect(mask).toBe(0b100001)
    expect(maskDirections(mask)).toEqual(['e', 'se'])
    expect(neighbourMask(origin, () => true)).toBe(63)
  })
})
