import { describe, expect, test } from 'bun:test'
import { iconNames } from '@knowledgeislands/icons'
import { byCategory, byId, retiredSymbols, symbolCategories, symbolStatuses, symbols } from './index.ts'

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

  test('byCategory partitions the library', () => {
    const total = symbolCategories.reduce((n, c) => n + byCategory[c].length, 0)
    expect(total).toBe(symbols.length)
    expect(byCategory.condition.map((s) => s.id)).toEqual(['thriving', 'quiet', 'weathered', 'ruined'])
  })
})
