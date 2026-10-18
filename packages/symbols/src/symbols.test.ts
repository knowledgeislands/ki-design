import { describe, expect, test } from 'bun:test'
import { iconNames } from '@knowledgeislands/icons'
import { byCategory, byId, symbolCategories, symbolStatuses, symbols } from './index.ts'

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

  test('Port replaces Harbour', () => {
    expect(byId.get('port')?.status).toBe('decided')
    expect(byId.has('harbour')).toBe(false)
  })

  test('byCategory partitions the library', () => {
    const total = symbolCategories.reduce((n, c) => n + byCategory[c].length, 0)
    expect(total).toBe(symbols.length)
    expect(byCategory.condition.map((s) => s.id)).toEqual(['thriving', 'quiet', 'weathered', 'ruined'])
  })
})
