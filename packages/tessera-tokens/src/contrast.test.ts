import { describe, expect, test } from 'bun:test'
import { mix, parseHex, toHex } from './colour.ts'
import { contrastFloor, contrastRatio, relativeLuminance } from './contrast.ts'
import {
  nightTerrain,
  resolveValue,
  roleNames,
  terrainNames,
  textRoles,
  themes,
  tokenDocument,
  tokens,
  washAmount,
  washNames,
  washSource
} from './tokens.ts'

describe('colour helpers', () => {
  test('parseHex and toHex round-trip', () => {
    expect(parseHex('#0f2440')).toEqual([15, 36, 64])
    expect(toHex([15, 36, 64])).toBe('#0f2440')
    expect(() => parseHex('#fff')).toThrow(TypeError)
  })

  test('mix interpolates channel by channel', () => {
    expect(mix('#000000', '#ffffff', 0)).toBe('#000000')
    expect(mix('#000000', '#ffffff', 1)).toBe('#ffffff')
    expect(mix('#000000', '#ffffff', 0.5)).toBe('#808080')
    expect(() => mix('#000000', '#ffffff', 1.5)).toThrow(RangeError)
  })
})

describe('WCAG maths', () => {
  test('luminance and ratio match the reference extremes', () => {
    expect(relativeLuminance('#000000')).toBe(0)
    expect(relativeLuminance('#ffffff')).toBe(1)
    expect(contrastRatio('#000000', '#ffffff')).toBe(21)
    expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.48, 2)
  })
})

describe('role coverage', () => {
  // Paper is the ground every floor is measured on; rule is the decorative hairline held to no floor.
  const unfloored = ['paper', 'rule']

  test('every role is a text role, the boundary, the paper or the rule', () => {
    const covered = new Set<string>([...textRoles, 'boundary', ...unfloored])
    expect(roleNames.filter((role) => !covered.has(role))).toEqual([])
  })

  test.each(themes)('the %s source declares exactly the named roles', (theme) => {
    expect(Object.keys(tokenDocument.color.role[theme]).sort()).toEqual([...roleNames].sort())
  })
})

describe.each(themes)('%s theme contrast floors', (theme) => {
  const roles = tokens.roles[theme]

  test.each(textRoles)(`%s holds ${contrastFloor.text}:1 on paper`, (role) => {
    expect(contrastRatio(roles[role], roles.paper)).toBeGreaterThanOrEqual(contrastFloor.text)
  })

  test(`boundary holds ${contrastFloor.boundary}:1 on paper`, () => {
    expect(contrastRatio(roles.boundary, roles.paper)).toBeGreaterThanOrEqual(contrastFloor.boundary)
  })

  test.each(washNames)('%s wash is its source mixed into paper', (wash) => {
    expect(tokens.washes[theme][wash]).toBe(mix(roles.paper, washSource(theme, wash), washAmount[wash]))
  })

  test.each(washNames)(`%s role text holds ${contrastFloor.text}:1 on its wash`, (wash) => {
    expect(contrastRatio(roles[wash], tokens.washes[theme][wash])).toBeGreaterThanOrEqual(contrastFloor.text)
  })

  test.each(washNames)(`ink holds ${contrastFloor.text}:1 on the %s wash`, (wash) => {
    expect(contrastRatio(roles.ink, tokens.washes[theme][wash])).toBeGreaterThanOrEqual(contrastFloor.text)
  })
})

describe('night terrain', () => {
  test('mixes every day fill 45 % into navy', () => {
    const night = nightTerrain()
    expect(Object.keys(night)).toEqual([...terrainNames])
    for (const name of terrainNames) expect(night[name]).toBe(mix(tokens.core.navy, tokens.terrain[name], 0.45))
  })

  // Patterns are drawn in parchment at night; labels sit on a halo, so the pattern floor is 3:1, not the text floor.
  test('is darker than day and keeps parchment patterns legible', () => {
    for (const name of terrainNames) {
      const night = nightTerrain()[name]
      expect(relativeLuminance(night)).toBeLessThan(relativeLuminance(tokens.terrain[name]))
      expect(contrastRatio(tokens.core.parchment, night)).toBeGreaterThanOrEqual(contrastFloor.boundary)
    }
  })
})

describe('sea', () => {
  test('night water is the night paper; shallows sit between sea and land', () => {
    expect(tokens.sea.night.sea).toBe(tokens.roles.night.paper)
    for (const theme of themes) {
      expect(relativeLuminance(tokens.sea[theme].shallow)).toBeGreaterThan(relativeLuminance(tokens.sea[theme].sea))
    }
  })
})

describe('fog and tile water', () => {
  // The fog hatch carries hex patterns and halo labels, so its floor is the 3:1 boundary floor, not the text floor.
  test.each(themes)('the %s ink holds 3:1 on the fog hatch', (theme) => {
    expect(contrastRatio(tokens.roles[theme].ink, tokens.fog[theme])).toBeGreaterThanOrEqual(contrastFloor.boundary)
  })

  test('the terrain ocean token is a deprecated alias of tile water', () => {
    expect(tokens.terrain.ocean).toBe(tokens.tile.water)
    expect(resolveValue('{color.tile.water}')).toBe('#2f5878')
    expect(() => resolveValue('{color.nowhere}')).toThrow()
  })
})
