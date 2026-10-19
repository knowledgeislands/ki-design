import { describe, expect, test } from 'bun:test'
import { iconNames } from '@knowledgeislands/icons'
import {
  byCategory,
  byId,
  resolveSymbol,
  retiredSymbols,
  symbolAliases,
  symbolCategories,
  symbolStatuses,
  symbols
} from './index.ts'

describe('symbol library', () => {
  test('ids are unique kebab-case', () => {
    const ids = symbols.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z]+(-[a-z]+)*$/)
  })

  test('every icon exists in @knowledgeislands/icons', () => {
    const known = new Set<string>(iconNames)
    for (const symbol of symbols) if ('icon' in symbol) expect(known.has(symbol.icon)).toBe(true)
  })

  test('every Official or Agreed symbol names a glyph (KI-DESIGN-ICO-001, KI-DESIGN-SYM-001)', () => {
    const known = new Set<string>(iconNames)
    const missing = symbols
      .filter((symbol) => symbol.status !== 'proposed')
      .filter((symbol) => !('icon' in symbol) || !known.has(symbol.icon))
      .map((symbol) => symbol.id)
    expect(missing).toEqual([])
  })

  test('roles are drawn as tools, with their own role glyphs', () => {
    for (const symbol of byCategory.role) expect<string | undefined>(symbol.icon).toBe(`role-${symbol.id}`)
  })

  test('statuses and categories are known', () => {
    for (const symbol of symbols) {
      expect(symbolStatuses).toContain(symbol.status)
      expect(symbolCategories).toContain(symbol.category)
    }
  })

  test('every symbol states a meaning in a sentence', () => {
    for (const symbol of symbols) expect(symbol.meaning).toMatch(/^[A-Z].*\.$/)
  })

  test('statuses are Official, Agreed and Proposed (GDR-KI-DESIGN-002)', () => {
    expect([...symbolStatuses]).toEqual(['official', 'agreed', 'proposed'])
  })

  test('Port replaces Harbour', () => {
    expect(byId.get('port')?.status).toBe('official')
    expect(byId.has('harbour')).toBe(false)
  })

  test('the Port, its modes, the Lighthouse and the Council Hall are official (GDR-KI-PRINCIPAL-010)', () => {
    for (const id of ['port', 'dock', 'rail-depot', 'airport', 'customs-house', 'lighthouse', 'council-hall'])
      expect(byId.get(id)?.status).toBe('official')
  })

  test('the Capital holds the Library and the Council Hall, all official (GDR-KI-PRINCIPAL-011)', () => {
    for (const id of ['capital', 'library', 'council-hall']) expect(byId.get(id)?.status).toBe('official')
    expect(byId.get('capital')?.meaning).toContain('Library and the Council Hall')
    expect<string | undefined>(byId.get('capital')?.icon).toBe('capital')
  })

  test('the Citadel and the Tower are retired, and the Observatory is the app mark', () => {
    for (const id of ['citadel', 'tower']) {
      expect(byId.has(id)).toBe(false)
      expect(retiredSymbols).toHaveProperty(id)
    }
    for (const symbol of byId.values()) expect(['citadel', 'tower']).not.toContain(symbol.icon ?? '')
    expect(byId.get('observatory')?.app).toContain('mark')
  })

  test('no retired id is reused', () => {
    for (const id of Object.keys(retiredSymbols)) expect(byId.has(id)).toBe(false)
  })

  test('aliases resolve to a current symbol and are never reused as ids', () => {
    for (const [alias, id] of Object.entries(symbolAliases)) {
      expect(byId.has(alias)).toBe(false)
      expect(retiredSymbols).not.toHaveProperty(alias)
      expect(resolveSymbol(alias)).toBe(byId.get(id))
    }
    expect(resolveSymbol('port')).toBe(byId.get('port'))
    expect(resolveSymbol('citadel')).toBeUndefined()
  })

  test('the Causeway is the official translation layer; no symbol draws the bridge glyph (GDR-KI-DESIGN-018)', () => {
    const causeway = byId.get('causeway')
    expect(causeway?.status).toBe('official')
    expect(causeway?.meaning).toStartWith('Translation layer')
    expect<string | undefined>(causeway?.icon).toBe('causeway')
    expect(resolveSymbol('bridge')?.id).toBe('causeway')
    for (const symbol of symbols)
      expect<string | undefined>('icon' in symbol ? symbol.icon : undefined).not.toBe('bridge')
  })

  test('statuses follow ki-principal (GDR-KI-DESIGN-020)', () => {
    const expected: Record<string, string> = {
      causeway: 'official',
      'cartographic-grid': 'official',
      library: 'official',
      lantern: 'agreed',
      storm: 'proposed',
      fog: 'proposed',
      mill: 'official',
      territory: 'official',
      steward: 'official'
    }
    for (const [id, status] of Object.entries(expected)) expect<string | undefined>(byId.get(id)?.status).toBe(status)
    expect(byId.get('mill')?.name).toBe('Mill')
  })

  test('seven roles are official; the Guardian and whale song are not adopted (GDR-KI-PRINCIPAL-014, -015)', () => {
    expect(byCategory.role.map((s) => s.id)).toEqual([
      'steward',
      'archivist',
      'cartographer',
      'builder',
      'navigator',
      'scout',
      'historian'
    ])
    for (const role of byCategory.role) expect(role.status).toBe('official')
    for (const id of ['guardian', 'whale-song']) {
      expect(byId.has(id)).toBe(false)
      expect(retiredSymbols).toHaveProperty(id)
    }
  })

  test('a territory is drawn as an archipelago (GDR-KI-DESIGN-015)', () => {
    expect(byId.get('territory')?.meaning).toContain('archipelago')
    expect(byId.get('archipelago')?.meaning).toContain('territory')
  })

  test('byCategory partitions the library', () => {
    const total = symbolCategories.reduce((n, c) => n + byCategory[c].length, 0)
    expect(total).toBe(symbols.length)
    expect(byCategory.condition.map((s) => s.id)).toEqual(['thriving', 'quiet', 'weathered', 'ruined'])
  })
})
