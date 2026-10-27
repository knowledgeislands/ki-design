import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { contrastRatio, nightTerrain, tokens } from '@knowledgeislands/tokens'
import {
  type Archipelago,
  archipelagoClearance,
  archipelagoColours,
  archipelagoSlots,
  layoutArchipelago,
  renderArchipelagoSvg,
  wrapLabel
} from './archipelago.ts'
import { distance, hex, hexKey } from './coords.ts'
import { archipelagoExampleOptions, iconGlyph } from './example-options.ts'
import { flatThemes } from './render.ts'

const example = (): Archipelago =>
  JSON.parse(
    readFileSync(new URL('../examples/arcadia-territory.archipelago.json', import.meta.url), 'utf8')
  ) as Archipelago

const islands = (n: number, capital = 0): Archipelago => ({
  id: 'test',
  name: 'Test',
  islands: Array.from({ length: n }, (_, i) => ({
    id: `island-${i}`,
    href: `https://example.org/${i}`,
    glyph: i === capital ? 'capital' : 'island',
    ...(i === capital ? { capital: true } : {})
  }))
})

describe('archipelagoSlots', () => {
  test('puts the first slot at the centre and the rest one lattice step apart or more', () => {
    const slots = archipelagoSlots(19)
    expect(slots[0]).toEqual(hex(0, 0))
    expect(new Set(slots.map(hexKey)).size).toBe(19)
    for (const [i, a] of slots.entries()) {
      for (const b of slots.slice(i + 1)) expect(distance(a, b)).toBeGreaterThanOrEqual(4)
    }
  })

  test('fills ring by ring: six around the centre, then twelve', () => {
    const slots = archipelagoSlots(19)
    expect(slots.slice(1, 7).every((s) => distance(s, hex(0, 0)) === 4)).toBe(true)
    expect(slots.slice(7).every((s) => distance(s, hex(0, 0)) === 8)).toBe(true)
  })

  test('goes clockwise from north, so neighbours in the list are neighbours on the chart', () => {
    const ring = archipelagoSlots(7).slice(1)
    for (const [i, s] of ring.entries()) expect(distance(s, ring[(i + 1) % 6] as typeof s)).toBe(4)
  })

  test('stacks a tall cluster when the aspect is below one', () => {
    const tall = layoutArchipelago(islands(19), { aspect: 0.5 })
    const round = layoutArchipelago(islands(19))
    expect(tall.box.height / tall.box.width).toBeGreaterThan(round.box.height / round.box.width)
  })

  test('refuses a spacing that would let islands touch', () => {
    expect(() => archipelagoSlots(3, 2)).toThrow(RangeError)
  })
})

describe('layoutArchipelago', () => {
  test('draws the Capital at the centre as a 7-hex flower, wherever it is in the list', () => {
    const layout = layoutArchipelago(islands(8, 5))
    const capital = layout.islands[0]
    expect(capital?.island.id).toBe('island-5')
    expect(capital?.centre).toEqual(hex(0, 0))
    expect(capital?.hexes).toHaveLength(7)
    expect(layout.islands.slice(1).map((p) => p.island.id)).toEqual([
      'island-0',
      'island-1',
      'island-2',
      'island-3',
      'island-4',
      'island-6',
      'island-7'
    ])
  })

  test('gives every other island a small isle of two or three hexes that keeps its shape by identity', () => {
    const a = layoutArchipelago(islands(10))
    for (const placed of a.islands.slice(1)) {
      expect(placed.hexes.length).toBeGreaterThanOrEqual(2)
      expect(placed.hexes.length).toBeLessThanOrEqual(3)
      // Nothing south of the centre, so the label below stays on open sea.
      expect(placed.hexes.every((h) => h.r <= placed.centre.r)).toBe(true)
    }
    const shape = (l: typeof a, id: string) => {
      const p = l.islands.find((i) => i.island.id === id)
      return p?.hexes.map((h) => hexKey({ q: h.q - p.centre.q, r: h.r - p.centre.r }))
    }
    const b = layoutArchipelago({ ...islands(10), islands: [...islands(10).islands].reverse() })
    expect(shape(b, 'island-3')).toEqual(shape(a, 'island-3'))
  })

  test('keeps sea between every pair of islands', () => {
    expect(archipelagoClearance(layoutArchipelago(example()))).toBeGreaterThanOrEqual(2)
    expect(archipelagoClearance(layoutArchipelago(example(), { aspect: 0.5 }))).toBeGreaterThanOrEqual(2)
  })

  test('draws one sea region with one closed border and no lakes', () => {
    const layout = layoutArchipelago(example(), { margin: 1 })
    expect(layout.border.match(/M/g)).toHaveLength(1)
    expect(layout.border.endsWith('Z')).toBe(true)
  })

  test('without a Capital, the first island takes the centre as an ordinary isle', () => {
    const plain = { id: 'p', name: 'P', islands: [{ id: 'a' }, { id: 'b' }] }
    const layout = layoutArchipelago(plain)
    expect(layout.islands[0]?.centre).toEqual(hex(0, 0))
    expect(layout.islands[0]?.hexes.length).toBeLessThan(7)
  })

  test('refuses an empty list, a duplicate id and a second Capital', () => {
    expect(() => layoutArchipelago({ id: 'e', name: 'E', islands: [] })).toThrow('no islands')
    expect(() => layoutArchipelago({ id: 'd', name: 'D', islands: [{ id: 'a' }, { id: 'a' }] })).toThrow('twice')
    expect(() =>
      layoutArchipelago({
        id: 'c',
        name: 'C',
        islands: [
          { id: 'a', capital: true },
          { id: 'b', capital: true }
        ]
      })
    ).toThrow('more than one Capital')
  })

  test('wraps labels after hyphens and never inside a word', () => {
    expect(wrapLabel('mcp-housekeeping-chatgpt', 18)).toEqual(['mcp-housekeeping-', 'chatgpt'])
    expect(wrapLabel('apps-knowledgeislands.info', 18)).toEqual(['apps-', 'knowledgeislands.info'])
    expect(wrapLabel('tools-ki', 18)).toEqual(['tools-ki'])
  })
})

describe('renderArchipelagoSvg', () => {
  test('is a labelled group with a link and a title on every island, and no script', () => {
    const svg = renderArchipelagoSvg(example(), { glyph: iconGlyph, description: 'Nineteen public islands.' })
    expect(svg).toContain('role="group" aria-labelledby="ki-archipelago-arcadia-title ki-archipelago-arcadia-desc"')
    expect(svg).toContain('<title id="ki-archipelago-arcadia-title">Arcadia</title>')
    expect(svg).not.toContain('<script')
    expect(svg).not.toContain('role="img"')
    const links = [
      ...svg.matchAll(
        /<a class="ki-island" data-island="([^"]+)"[^>]* href="([^"]+)" aria-label="([^"]+)">\n<title>([^<]+)<\/title>/g
      )
    ]
    expect(links).toHaveLength(18)
    const capital = links.find((m) => m[1] === 'ki-principal')
    expect(capital?.[2]).toBe('https://github.com/knowledgeislands/ki-principal')
    expect(capital?.[3]).toBe('ki-principal — Capital')
    expect(capital?.[4]).toBe('ki-principal — Capital')
  })

  test('draws an unlinked island as a group, and an island without a known glyph as a marker', () => {
    const svg = renderArchipelagoSvg({ id: 'u', name: 'U', islands: [{ id: 'a', glyph: 'no-such-glyph' }] })
    expect(svg).toContain('<g class="ki-island" data-island="a">')
    expect(svg).toContain('class="ka-marker"')
  })

  test('escapes names and links', () => {
    const svg = renderArchipelagoSvg({ id: 'x', name: 'A & B', islands: [{ id: 'a<b', href: '/?a=1&b=2' }] })
    expect(svg).toContain('A &amp; B')
    expect(svg).toContain('href="/?a=1&amp;b=2"')
    expect(svg).toContain('a&lt;b')
  })

  test('pins one theme in day and night, from the tokens', () => {
    const day = renderArchipelagoSvg(example(), { theme: 'day' })
    const night = renderArchipelagoSvg(example(), { theme: 'night' })
    expect(day).toContain(`--ki-chart-sea:${tokens.sea.light.sea}`)
    expect(night).toContain(`--ki-chart-sea:${tokens.sea.night.sea}`)
    expect(night).toContain(`--ki-chart-land:${nightTerrain().grassland}`)
    expect(day).not.toContain('prefers-color-scheme')
  })

  test('in auto, follows the page by the token stylesheet’s own selectors', () => {
    const svg = renderArchipelagoSvg(example(), { theme: 'auto' })
    expect(svg).toContain(
      `@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--ki-chart-paper:${tokens.roles.night.paper}`
    )
    expect(svg).toContain(`[data-theme="night"]{--ki-chart-paper:${tokens.roles.night.paper}`)
    expect(svg).toContain(`[data-theme="light"]{--ki-chart-paper:${tokens.roles.light.paper}`)
  })

  test('leaves the paper out when the frame is off, so the page shows through', () => {
    expect(renderArchipelagoSvg(example(), { frame: false })).not.toContain('class="ka-paper"')
  })

  test('gives two drawings of one archipelago distinct ids', () => {
    const wide = renderArchipelagoSvg(example(), { variant: 'wide' })
    const tall = renderArchipelagoSvg(example(), { variant: 'tall', aspect: 0.5 })
    expect(wide).toContain('id="ki-archipelago-arcadia-wide-title"')
    expect(tall).toContain('id="ki-archipelago-arcadia-tall-pattern-land"')
  })

  test('is byte-stable', () => {
    expect(renderArchipelagoSvg(example(), { glyph: iconGlyph })).toBe(
      renderArchipelagoSvg(example(), { glyph: iconGlyph })
    )
  })

  test('the committed example SVGs are current', () => {
    for (const theme of flatThemes) {
      const name = `arcadia-territory${theme === 'day' ? '' : `-${theme}`}.svg`
      const committed = readFileSync(new URL(`../examples/${name}`, import.meta.url), 'utf8')
      expect(committed).toBe(renderArchipelagoSvg(example(), archipelagoExampleOptions(theme)))
    }
  })
})

describe('archipelagoColours', () => {
  // Labels sit on a paper halo; the floor is between label ink and both the halo and the open sea.
  test('labels meet the text floor on the paper halo and on the sea in both themes', () => {
    for (const theme of ['light', 'night'] as const) {
      const c = archipelagoColours(theme)
      expect(contrastRatio(c.ink, c.paper)).toBeGreaterThanOrEqual(4.5)
      expect(contrastRatio(c.ink, c.sea)).toBeGreaterThanOrEqual(4.5)
      // Glyphs on the roundel, which is paper.
      expect(contrastRatio(c.ink, c.paper)).toBeGreaterThanOrEqual(3)
      // The coast against the sea and the land against the sea, both boundary-strength.
      expect(contrastRatio(c.ink, c.land)).toBeGreaterThanOrEqual(3)
    }
  })
})
