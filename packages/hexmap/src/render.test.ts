import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { nightTerrain, tokens } from '@knowledgeislands/tokens'
import { hex, neighbours, ring } from './coords.ts'
import { exampleOptions, iconGlyph } from './example-options.ts'
import { assertIslandMap, type IslandMap, validateIslandMap } from './model.ts'
import { terrainPatterns } from './patterns.ts'
import { layoutFlat, renderFlatSvg } from './render.ts'

const arcadia = assertIslandMap(
  JSON.parse(readFileSync(new URL('../examples/arcadia.islandmap.json', import.meta.url), 'utf8'))
)

describe('validateIslandMap', () => {
  test('accepts Arcadia', () => {
    expect(validateIslandMap(arcadia).ok).toBe(true)
  })

  test('collects every problem', () => {
    const result = validateIslandMap({
      schema: 'islandmap/v0',
      id: '',
      name: 'Broken',
      hexes: [
        { q: 0, r: 0, terrain: 'lava' },
        { q: 0, r: 0, terrain: 'sand', condition: 'shiny' },
        { q: 0.5, r: 1, terrain: 'sand' }
      ],
      routes: [{ from: { q: 0, r: 0 }, to: { q: 9, r: 9 }, kind: 'maybe' }]
    })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.errors).toEqual([
      'schema must be "islandmap/v1"',
      'id must be a non-empty string',
      'hexes[0] has unknown terrain "lava"',
      'hexes[1] duplicates hex 0,0',
      'hexes[1] has unknown condition "shiny"',
      'hexes[2] needs integer q and r',
      'routes[0].to is not a hex on the map',
      'routes[0].kind must be "active" or "pending"'
    ])
  })

  test('assertIslandMap throws on invalid input', () => {
    expect(() => assertIslandMap(null)).toThrow(TypeError)
  })
})

describe('Arcadia', () => {
  test('is a hand-made island of about sixty hexes', () => {
    expect(arcadia.hexes).toHaveLength(61)
    const structures = new Set(arcadia.hexes.flatMap((h) => (h.structure ? [h.structure] : [])))
    for (const s of ['capital', 'port', 'observatory', 'lighthouse', 'mill', 'workshop', 'ancient-forest', 'ruins']) {
      expect(structures.has(s)).toBe(true)
    }
  })

  test('renders an accessible SVG with every hex and structure', () => {
    const svg = renderFlatSvg(arcadia)
    expect(svg).toStartWith('<svg xmlns="http://www.w3.org/2000/svg"')
    expect(svg).toContain('role="img"')
    expect(svg).toContain('<title id="ki-map-arcadia-title">Arcadia</title>')
    expect(svg.match(/<polygon class="ki-hex"/g)).toHaveLength(61)
    expect(svg).toContain('<title>Capital (thriving)</title>')
    expect(svg).toContain('<title>Ancient forest (thriving)</title>')
    expect(svg.match(/class="ki-route ki-route-pending"/g)).toHaveLength(1)
    expect(svg).toContain('>Old Wood</text>')
  })

  test('draws a map that still says citadel as the Capital', () => {
    const old: IslandMap = {
      ...arcadia,
      hexes: arcadia.hexes.map((h) => (h.structure === 'capital' ? { ...h, structure: 'citadel' } : h))
    }
    const seen: string[] = []
    const svg = renderFlatSvg(old, {
      glyph: (id) => {
        seen.push(id)
        return undefined
      }
    })
    expect(svg).toContain('<title>Capital (thriving)</title>')
    expect(seen).toContain('capital')
    expect(seen).not.toContain('citadel')
  })

  test('draws a map that still says bridge as the Causeway', () => {
    const old: IslandMap = { ...arcadia, hexes: [{ q: 0, r: 0, terrain: 'river', structure: 'bridge' }] }
    const seen: string[] = []
    const svg = renderFlatSvg(old, {
      glyph: (id) => {
        seen.push(id)
        return undefined
      }
    })
    expect(svg).toContain('<title>Causeway</title>')
    expect(seen).toEqual(['causeway'])
  })

  test('is deterministic regardless of hex order', () => {
    const shuffled: IslandMap = { ...arcadia, hexes: [...arcadia.hexes].reverse() }
    expect(renderFlatSvg(shuffled)).toBe(renderFlatSvg(arcadia))
  })

  test.each([
    ['day', 'arcadia.svg'],
    ['night', 'arcadia-night.svg']
  ] as const)('matches the committed %s example', (theme, file) => {
    const committed = readFileSync(new URL(`../examples/${file}`, import.meta.url), 'utf8')
    expect(renderFlatSvg(arcadia, exampleOptions(theme))).toBe(committed)
  })

  test('draws the selected ring only for hexes on the map', () => {
    expect(renderFlatSvg(arcadia, { selected: hex(0, 0) })).toContain('class="ki-selected"')
    expect(renderFlatSvg(arcadia, { selected: hex(40, 40) })).not.toContain('class="ki-selected"')
  })

  test('palette overrides fall back to token terrain fills', () => {
    const layout = layoutFlat(arcadia, { palette: { ocean: '#000000' } })
    expect(layout.hexes.find((h) => h.hex.terrain === 'ocean')?.fill).toBe('#000000')
    expect(layout.hexes.find((h) => h.hex.terrain === 'sand')?.fill).toBe('#e4d4a6')
  })

  test('escapes text', () => {
    const svg = renderFlatSvg({ ...arcadia, labels: [{ q: 0, r: 0, text: 'Fish & <Chips>' }] })
    expect(svg).toContain('Fish &amp; &lt;Chips&gt;')
  })

  test('derives night fills from the day palette, with the night sea and parchment ink', () => {
    const layout = layoutFlat(arcadia, { theme: 'night', palette: { forest: '#336644' } })
    const fill = (terrain: string) => layout.hexes.find((h) => h.hex.terrain === terrain)?.fill
    expect(fill('sand')).toBe(nightTerrain().sand)
    expect(fill('forest')).toBe(nightTerrain({ ...tokens.terrain, forest: '#336644' }).forest)
    expect(fill('ocean')).toBe(tokens.sea.night.sea)
    expect(layout.colours.paper).toBe(tokens.roles.night.paper)
    expect(layout.colours.ink).toBe(tokens.core.parchment)
  })
})

/** One land hex ringed by sea, the smallest island with a coast. */
const islet = (terrain: 'grassland' | 'ocean' = 'grassland'): IslandMap => ({
  schema: 'islandmap/v1',
  id: 'islet',
  name: 'Islet',
  hexes: [
    { q: 0, r: 0, terrain, structure: 'lighthouse' },
    ...ring(hex(0, 0), 1).map((h) => ({ ...h, terrain: 'ocean' as const }))
  ]
})

describe('structures', () => {
  test('draw the resolved glyph in ink on a parchment roundel', () => {
    const svg = renderFlatSvg(islet(), { glyph: iconGlyph })
    const structure = svg.slice(
      svg.indexOf('<g class="ki-structure"'),
      svg.indexOf('</g>\n</g>', svg.indexOf('ki-structure"'))
    )
    expect(structure).toContain(`fill="${tokens.roles.light.paper}" stroke="${tokens.roles.light.ink}"`)
    expect(structure).toContain('transform="translate(')
    expect(structure).toContain(iconGlyph('lighthouse') as string)
  })

  test('fall back to a small neutral marker without a glyph', () => {
    const plain = layoutFlat(islet())
    expect(plain.structures[0]?.glyph).toBeUndefined()
    const svg = renderFlatSvg(islet(), { glyph: () => undefined })
    expect(svg).toContain('<title>Lighthouse</title>')
    expect(svg).not.toContain('transform="translate(')
  })

  test('ask the resolver about each structure, north to south', () => {
    const asked: string[] = []
    renderFlatSvg(arcadia, {
      glyph: (id) => {
        asked.push(id)
        return undefined
      }
    })
    const expected = [...arcadia.hexes]
      .sort((a, b) => a.r - b.r || a.q - b.q)
      .flatMap((h) => (h.structure ? [h.structure] : []))
    expect(asked).toEqual(expected)
  })
})

describe('terrain patterns', () => {
  test('defines one pattern per terrain present and overlays every hex', () => {
    const layout = layoutFlat(arcadia)
    const present = new Set(arcadia.hexes.map((h) => h.terrain))
    expect(layout.patterns.map((p) => p.terrain).sort()).toEqual([...present].sort())
    const svg = renderFlatSvg(arcadia)
    for (const terrain of present) expect(svg).toContain(`<pattern id="ki-map-arcadia-pattern-${terrain}"`)
    expect(svg.match(/fill="url\(#ki-map-arcadia-pattern-/g)).toHaveLength(arcadia.hexes.length)
  })

  test('every terrain has a motif, drawn at low contrast', () => {
    for (const pattern of Object.values(terrainPatterns)) {
      expect(pattern.d !== undefined || (pattern.dots?.length ?? 0) > 0).toBe(true)
      expect(pattern.opacity).toBeLessThanOrEqual(0.6)
    }
  })

  test('scale with the hex size and can be turned off', () => {
    expect(renderFlatSvg(arcadia, { size: 64 })).toContain('patternTransform="scale(2)"')
    const svg = renderFlatSvg(arcadia, { patterns: false })
    expect(svg).not.toContain('<pattern')
    expect(svg).not.toContain('url(#')
  })
})

describe('coastline', () => {
  test('closes round an islet', () => {
    const { coast } = layoutFlat(islet())
    expect(coast.match(/[ML]/g)).toHaveLength(6)
    expect(coast).toEndWith('Z')
  })

  test('follows only land edges that meet the sea', () => {
    const edges = arcadia.hexes
      .filter((h) => h.terrain !== 'ocean')
      .flatMap((h) => neighbours(h))
      .filter((n) => arcadia.hexes.find((h) => h.q === n.q && h.r === n.r)?.terrain === 'ocean').length
    const { coast } = layoutFlat(arcadia)
    const segments = coast
      .split('M')
      .filter(Boolean)
      .reduce((sum, run) => sum + (run.match(/L/g)?.length ?? 0) + (run.endsWith('Z') ? 1 : 0), 0)
    expect(segments).toBe(edges)
    expect(renderFlatSvg(arcadia)).toContain('class="ki-coast"')
  })

  test('is absent without sea', () => {
    expect(layoutFlat(islet('ocean')).coast).toBe('')
    expect(renderFlatSvg(islet('ocean'))).not.toContain('ki-coast')
  })
})

describe('labels and routes', () => {
  test('labels are small capitals on a paper halo, in a chosen font', () => {
    const svg = renderFlatSvg(arcadia, { labelFont: 'Georgia, serif' })
    const labels = svg.slice(svg.indexOf('<g class="ki-labels"'))
    expect(labels).toContain('font-variant="small-caps"')
    expect(labels).toContain('paint-order="stroke"')
    expect(labels).toContain(`stroke="${tokens.roles.light.paper}"`)
    expect(labels).toContain('font-family="Georgia, serif"')
    expect(renderFlatSvg(arcadia)).toContain('font-family="&apos;Cormorant SC&apos;')
  })

  test('routes are brass with round caps; pending ones are dashed', () => {
    const svg = renderFlatSvg(arcadia)
    const routes = svg.slice(svg.indexOf('<g class="ki-routes"'), svg.indexOf('<g class="ki-structures"'))
    expect(routes).toContain('stroke-linecap="round"')
    expect(routes.match(/stroke="#c8963c"/g)).toHaveLength(4)
    expect(routes.match(/stroke="#c8963c"[^>]*stroke-dasharray/g)).toHaveLength(1)
  })

  test('the selected ring is brass', () => {
    expect(renderFlatSvg(arcadia, { selected: hex(0, 0) })).toMatch(/class="ki-selected"[^>]*stroke="#c8963c"/)
  })
})
