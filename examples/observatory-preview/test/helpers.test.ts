import { describe, expect, test } from 'bun:test'
import {
  hexKey,
  type IslandMap,
  layoutFlat,
  renderFlatLayers,
  validateIslandMap
} from '../../../packages/hexmap/src/index.ts'
import { requiredInventory } from '../../../packages/tiles/src/index.ts'
import { tokens } from '../../../packages/tokens/src/index.ts'
import { glyphBody } from '../client/glyphs.ts'
import { rank } from '../client/format.ts'
import { type ChartInput, chart, conditionOf, islandMap, lanesOf, roleOf } from '../client/lands-model.ts'
import type { Signal, TradeRoute } from '../client/types.ts'

const signal = (id: string, severity: Signal['severity'], changedAt: string | null): Signal => ({
  id,
  instrument: 'test',
  subject: id,
  repository: null,
  kind: 'test',
  summary: id,
  severity,
  changedAt
})

describe('Beacon ranking', () => {
  test('blocking › attention › note, then most recently changed, then by id', () => {
    const signals = [
      signal('n1', 'note', '2026-10-18T03:00:00Z'),
      signal('a-old', 'attention', '2026-10-01T00:00:00Z'),
      signal('b1', 'blocking', null),
      signal('a-new', 'attention', '2026-10-17T00:00:00Z'),
      signal('a-tie-b', 'attention', '2026-10-17T00:00:00Z'),
      signal('a-tie-a', 'attention', '2026-10-17T00:00:00Z')
    ]
    expect(signals.sort(rank).map((s) => s.id)).toEqual(['b1', 'a-new', 'a-tie-a', 'a-tie-b', 'a-old', 'n1'])
  })
})

describe('condition by commit age', () => {
  const now = Date.parse('2026-10-18T00:00:00Z')
  const daysAgo = (d: number) => new Date(now - d * 86_400_000).toISOString()
  test.each([
    [0, 'thriving'],
    [2, 'thriving'],
    [2.01, 'quiet'],
    [14, 'quiet'],
    [14.5, 'weathered'],
    [60, 'weathered'],
    [61, 'ruined']
  ] as const)('%d days old is %s', (days, expected) => {
    expect(conditionOf(daysAgo(days), now)).toBe(expected)
  })
  test('no evidence is ruined; a future commit is thriving', () => {
    expect(conditionOf(null, now)).toBe('ruined')
    expect(conditionOf(daysAgo(-1), now)).toBe('thriving')
  })
})

describe('roles from names', () => {
  test.each([
    ['k/ki-principal', 'citadel'],
    ['k/tools-ki', 'workshop'],
    ['k/ki-agentic-harness', 'workshop'],
    ['k/mcp-gsuite', 'bridge'],
    ['k/apps-observatory.local', 'port'],
    ['k/homebrew-tap', 'port'],
    ['k/dotfiles', 'island']
  ] as const)('%s is a %s', (identity, role) => expect(roleOf(identity)).toBe(role))
})

const input = (): ChartInput => ({
  territories: [
    { id: 'territory:b', label: 'Beta', repositories: ['b/tools-x', 'b/beta-principal', 'b/notes'], reason: null },
    { id: 'territory:a', label: 'Alpha', repositories: ['a/mcp-y', 'a/alpha-principal'], reason: null },
    { id: 'territory:c', label: 'Charted not', repositories: [], reason: 'not listed' }
  ],
  repositories: ['a/mcp-y', 'a/alpha-principal', 'b/tools-x', 'b/beta-principal', 'b/notes', 'z/stray'],
  latest: new Map([['a/mcp-y', '2026-10-17T00:00:00Z']]),
  signals: new Map(),
  now: Date.parse('2026-10-18T00:00:00Z')
})

describe('territory layout', () => {
  test('is deterministic, whatever order the territories and repositories arrive in', () => {
    const one = chart(input())
    const shuffled = input()
    shuffled.territories.reverse()
    for (const t of shuffled.territories) t.repositories.reverse()
    shuffled.repositories.reverse()
    const two = chart(shuffled)
    const positions = (c: ReturnType<typeof chart>) => c.islands.map((i) => [i.identity, i.hexes.map(hexKey)])
    expect(positions(two)).toEqual(positions(one))
    expect(two.extent.map(hexKey)).toEqual(one.extent.map(hexKey))
  })

  test('territories by name, capital first, unclaimed last, uncharted kept with its reason', () => {
    const c = chart(input())
    expect(c.territories.map((t) => t.label)).toEqual(['Alpha', 'Beta', 'Charted not', 'Unclaimed waters'])
    expect(c.territories[1]?.islands.map((i) => i.identity)).toEqual(['b/beta-principal', 'b/notes', 'b/tools-x'])
    expect(c.territories[2]).toMatchObject({ islands: [], reason: 'not listed' })
    expect(c.territories[3]?.islands.map((i) => i.identity)).toEqual(['z/stray'])
  })

  test('a capital spans three hexes and every island keeps a hex of sea from the next', () => {
    const c = chart(input())
    expect(c.islands.find((i) => i.role === 'citadel')?.hexes).toHaveLength(3)
    const owner = new Map<string, string>()
    for (const i of c.islands) for (const h of i.hexes) owner.set(hexKey(h), i.identity)
    for (const i of c.islands) {
      for (const h of i.hexes) {
        for (const [dq, dr] of [
          [1, 0],
          [1, -1],
          [0, -1],
          [-1, 0],
          [-1, 1],
          [0, 1]
        ] as const) {
          const other = owner.get(hexKey({ q: h.q + dq, r: h.r + dr }))
          if (other) expect(other).toBe(i.identity)
        }
      }
    }
  })

  test('the island map holds every island hex as land, one structure per island, the rest ocean', () => {
    const c = chart(input())
    const map = islandMap(c)
    const land = map.hexes.filter((h) => h.terrain !== 'ocean')
    expect(land).toHaveLength(c.islands.reduce((n, i) => n + i.hexes.length, 0))
    expect(map.hexes.filter((h) => h.structure)).toHaveLength(c.islands.length)
    expect(new Set(map.hexes.map(hexKey)).size).toBe(map.hexes.length)
    expect(map.labels?.map((l) => l.text)).toEqual(['ALPHA', 'BETA', 'UNCLAIMED WATERS'])
  })

  test('the chart is a valid islandmap/v1 drawn by the hexmap package, as the Known Lands view draws it', () => {
    const map = islandMap(chart(input()))
    expect(validateIslandMap(map)).toMatchObject({ ok: true })
    const svg = renderFlatLayers(layoutFlat(map))
    expect(svg.match(/<polygon class="ki-hex"/g)).toHaveLength(map.hexes.length)
    expect(svg.match(/<g class="ki-structure"/g)).toHaveLength(map.hexes.filter((h) => h.structure).length)
  })
})

// The flat chart draws terrain as token fills and structures as glyphs, never tile art, so it covers the tile inventory's
// terrains and structures. Decals and connectors only reach a chart as tile art, through the isometric renderer
// (KI-DESIGN-MAP-002), which checks them (KI-DESIGN-TIL-001).
describe('the flat chart covers the tile inventory', () => {
  const { terrain, structure } = requiredInventory
  const map: IslandMap = {
    schema: 'islandmap/v1',
    id: 'inventory',
    name: 'Inventory',
    hexes: [
      ...terrain.map((id, q) => ({ q, r: 0, terrain: id as IslandMap['hexes'][number]['terrain'] })),
      ...structure.map((id, q) => ({ q, r: 2, terrain: 'grassland' as const, structure: id }))
    ]
  }
  // Draws as the Known Lands view does: the glyph resolver it injects, the day theme.
  const layout = layoutFlat(map, { glyph: glyphBody })
  const svg = renderFlatLayers(layout)

  test('the map is valid', () => {
    expect(validateIslandMap(map)).toMatchObject({ ok: true })
  })

  test('every terrain renders with its token fill; the ocean is the theme sea', () => {
    for (const id of terrain) {
      const fill = id === 'ocean' ? tokens.sea.light.sea : tokens.terrain[id as keyof typeof tokens.terrain]
      expect(fill).toMatch(/^#[0-9a-f]{6}$/i)
      expect(svg).toContain(`data-terrain="${id}" points="`)
      expect(layout.hexes.find((h) => h.hex.terrain === id)?.fill).toBe(fill)
    }
  })

  test('every structure renders, by glyph or the neutral marker; only the cottage falls back', () => {
    expect(layout.structures.map((s) => s.hex.structure)).toEqual([...structure])
    expect(svg.match(/<g class="ki-structure"/g)).toHaveLength(structure.length)
    expect(layout.structures.filter((s) => !s.glyph).map((s) => s.hex.structure)).toEqual(['cottage'])
  })
})

describe('trade lanes', () => {
  const route = (from: string, to: string, state: TradeRoute['state'], kind: TradeRoute['kind'] = 'work'): TradeRoute => ({
    source: { identity: from, repository: `https://github.com/${from}`, mapBonus: 0 },
    peer: { identity: to, repository: `https://github.com/${to}`, resolved: true, mapBonus: 0 },
    direction: 'export',
    kind,
    state
  })
  const onChart = new Set(['a/one', 'b/two', 'c/three'])

  test('both ends of a route fold into one lane; any awaiting side makes it awaiting', () => {
    const lanes = lanesOf(
      [
        route('a/one', 'b/two', 'active'),
        route('b/two', 'a/one', 'active'),
        route('a/one', 'c/three', 'active'),
        route('c/three', 'a/one', 'awaiting-sender'),
        route('a/one', 'b/two', 'awaiting-receiver', 'knowledge'),
        route('a/one', 'x/off-chart', 'active')
      ],
      onChart
    )
    expect(lanes).toEqual([
      { from: 'a/one', to: 'b/two', kind: 'work', status: 'active' },
      { from: 'a/one', to: 'b/two', kind: 'knowledge', status: 'awaiting' },
      { from: 'a/one', to: 'c/three', kind: 'work', status: 'awaiting' }
    ])
  })
})
