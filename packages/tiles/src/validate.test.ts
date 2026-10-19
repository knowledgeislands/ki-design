import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import {
  requiredIds,
  resolveTileKey,
  type TileEntry,
  type TileManifest,
  tileGeometry,
  tileKey,
  tileStates,
  validateTileSet
} from './index.ts'

const modern = JSON.parse(
  readFileSync(new URL('../sets/modern/manifest.json', import.meta.url), 'utf8')
) as TileManifest

const finalise = (manifest: TileManifest): TileManifest => ({
  ...manifest,
  tiles: manifest.tiles.map((tile) => ({ ...tile, status: 'final' }))
})

const withTile = (manifest: TileManifest, key: string, change: (tile: TileEntry) => object): TileManifest => ({
  ...manifest,
  tiles: manifest.tiles.map((tile) => (tileKey(tile) === key ? (change(tile) as TileEntry) : tile))
})

describe('inventory', () => {
  test('covers 12 terrains, 16 structures, 4 decals and 4 connectors', () => {
    expect(requiredIds).toHaveLength(36)
    expect(requiredIds.filter((id) => id.startsWith('terrain/'))).toHaveLength(12)
    expect(new Set(requiredIds).size).toBe(requiredIds.length)
    expect(requiredIds).toContain('terrain/river')
    expect(requiredIds).toContain('connector/river')
  })

  test('the Capital is required, and citadel is only its deprecated alias (GDR-KI-PRINCIPAL-011)', () => {
    expect(requiredIds).toContain('structure/capital')
    expect(requiredIds).not.toContain('structure/citadel')
    expect(requiredIds).not.toContain('structure/tower')
    expect(resolveTileKey('structure/citadel')).toBe('structure/capital')
    expect(resolveTileKey('structure/library')).toBe('structure/library')
  })

  test('the Causeway is required, and bridge is only its deprecated alias (GDR-KI-DESIGN-018)', () => {
    expect(requiredIds).toContain('structure/causeway')
    expect(requiredIds).not.toContain('structure/bridge')
    expect(requiredIds).toContain('connector/bridge-span')
    expect(resolveTileKey('structure/bridge')).toBe('structure/causeway')
    expect(resolveTileKey('connector/bridge-span')).toBe('connector/bridge-span')
  })

  test('geometry is consistent', () => {
    expect<number>(tileGeometry.cell.height).toBe(tileGeometry.height + tileGeometry.plinth)
    expect<number>(tileGeometry.oddRowOffset).toBe(tileGeometry.width / 2)
  })
})

describe('validateTileSet', () => {
  test('the Modern stub is valid but unfinished', () => {
    const report = validateTileSet(modern)
    expect(report.errors).toEqual([])
    expect(report.ok).toBe(true)
    expect(report.complete).toBe(false)
    expect(report.unfinished).toHaveLength(requiredIds.length)
  })

  test('a fully drawn set is complete', () => {
    const report = validateTileSet(finalise(modern))
    expect(report.complete).toBe(true)
    expect(report.extras).toEqual([])
  })

  test('reports missing ids', () => {
    const report = validateTileSet({ ...modern, tiles: modern.tiles.filter((t) => t.id !== 'lighthouse') })
    expect(report.ok).toBe(false)
    expect(report.missing).toEqual(['structure/lighthouse'])
    expect(report.errors).toContain('structure/lighthouse is required but missing')
  })

  test('reports missing structure states', () => {
    const report = validateTileSet(
      withTile(modern, 'structure/port', (t) => ({ ...t, states: tileStates.filter((s) => s !== 'weathered') }))
    )
    expect(report.errors).toEqual(['structure/port is missing the weathered state'])
  })

  test('reports frames off the animation clock', () => {
    const report = validateTileSet(withTile(modern, 'terrain/ocean', (t) => ({ ...t, frames: { loop: 10 } })))
    expect(report.errors).toEqual(['terrain/ocean frames.loop must be one of 4, 6, 8, 12, 16, 24, 48'])
  })

  test('reports missing scales, bad orientation and anchors outside the cell', () => {
    const report = validateTileSet(
      withTile(modern, 'decal/ivy', (t) => ({ ...t, scales: [1], orientation: 6, anchor: { x: 300, y: 10 } }))
    )
    expect(report.errors).toEqual([
      'decal/ivy orientation must be an integer from 0 to 5',
      'decal/ivy anchor must be a point inside the 256 × 196 cell',
      'decal/ivy is missing the 2× scale'
    ])
  })

  test('reports duplicates and lists extras without failing', () => {
    const extra = { ...modern.tiles[0], id: 'tundra' } as TileEntry
    const duplicate = modern.tiles[1] as TileEntry
    const report = validateTileSet({ ...modern, tiles: [...modern.tiles, extra, duplicate] })
    expect(report.extras).toEqual(['terrain/tundra'])
    expect(report.errors).toEqual(['terrain/forest is listed twice'])
  })

  test('a set drawn under the deprecated citadel id still covers the Capital', () => {
    const old = withTile(modern, 'structure/capital', (t) => ({ ...t, id: 'citadel' }))
    const report = validateTileSet(old)
    expect(report.ok).toBe(true)
    expect(report.missing).toEqual([])
    expect(report.extras).toEqual([])
    const both = validateTileSet({
      ...modern,
      tiles: [...modern.tiles, ...old.tiles.filter((t) => t.id === 'citadel')]
    })
    expect(both.errors).toEqual(['structure/citadel is listed twice (as structure/capital)'])
  })

  test('a set drawn under the deprecated bridge id still covers the Causeway', () => {
    const old = withTile(modern, 'structure/causeway', (t) => ({ ...t, id: 'bridge' }))
    const report = validateTileSet(old)
    expect(report.ok).toBe(true)
    expect(report.missing).toEqual([])
    expect(report.extras).toEqual([])
  })

  test('the optional fields are optional: a set without them is still valid', () => {
    const bare = {
      ...modern,
      palette: undefined,
      tiles: modern.tiles.map(({ family: _family, palette: _palette, flat: _flat, ...tile }) => tile)
    }
    expect(validateTileSet(bare).errors).toEqual([])
  })

  test('accepts a flat twin, a hero family, a palette and an edge connector', () => {
    const drawn = withTile(
      withTile(modern, 'connector/road', (t) => ({ ...t, footprint: 'edge', orientation: 2, flat: 'flat/road.svg' })),
      'structure/lighthouse',
      (t) => ({ ...t, family: 'civic-harbour-town', palette: 'glass-and-stone', flat: 'flat/lighthouse.svg' })
    )
    expect(validateTileSet({ ...drawn, palette: 'savanna' }).errors).toEqual([])
  })

  test('reports an edge footprint off a connector, and a family off a hero structure', () => {
    const report = validateTileSet(
      withTile(
        withTile(modern, 'terrain/cliffs', (t) => ({ ...t, footprint: 'edge' })),
        'structure/mill',
        (t) => ({ ...t, family: 'industrial-vernacular' })
      )
    )
    expect(report.errors).toEqual([
      'terrain/cliffs footprint edge is for connectors only',
      'structure/mill family is for the hero structures only (capital, library, council-hall, port, lighthouse)'
    ])
  })

  test('a hero drawn under a deprecated id may still carry a family', () => {
    const old = withTile(modern, 'structure/capital', (t) => ({ ...t, id: 'citadel', family: 'collegiate' }))
    expect(validateTileSet(old).errors).toEqual([])
  })

  test('reports unknown families and palettes, and a flat twin that is not an SVG path', () => {
    const report = validateTileSet({
      ...withTile(modern, 'structure/library', (t) => ({
        ...t,
        family: 'gothic',
        palette: 'neon',
        flat: '/abs/library.png'
      })),
      palette: 'sepia'
    } as unknown as TileManifest)
    expect(report.errors).toEqual([
      'manifest palette must be one of archipelago, savanna, natural-colours, glass-and-stone',
      'structure/library flat must be a relative path to an .svg file',
      'structure/library family must be one of industrial-vernacular, classical-observatory, organic, collegiate, civic-harbour-town, cottage, commons',
      'structure/library palette must be one of archipelago, savanna, natural-colours, glass-and-stone'
    ])
  })

  test('the Modern set declares its palette and the families it plainly draws', () => {
    expect(modern.palette).toBe('archipelago')
    const family = (id: string) => modern.tiles.find((t) => t.kind === 'structure' && t.id === id)?.family
    expect(family('library')).toBe('classical-observatory')
    expect(family('council-hall')).toBe('classical-observatory')
    expect(family('capital')).toBe('classical-observatory')
    expect(family('port')).toBe('civic-harbour-town')
  })

  test('rejects non-manifests', () => {
    expect(validateTileSet(42).ok).toBe(false)
    expect(validateTileSet({ schema: 'tileset/v1', id: 'x', name: 'X' }).errors).toContain('tiles must be an array')
  })
})
