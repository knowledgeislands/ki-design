import { symbolAliases, symbols } from './symbols.ts'
import { type KiSymbol, type SymbolCategory, symbolCategories } from './types.ts'

export { retiredSymbols, type SymbolId, symbolAliases, symbols } from './symbols.ts'
export {
  type KiSymbol,
  type KiSymbol as Symbol,
  type SymbolCategory,
  type SymbolStatus,
  symbolCategories,
  symbolStatuses
} from './types.ts'

const library: readonly KiSymbol[] = symbols

/** Symbols keyed by id. */
export const byId: ReadonlyMap<string, KiSymbol> = new Map(library.map((symbol) => [symbol.id, symbol]))

function groupByCategory(list: readonly KiSymbol[]): Record<SymbolCategory, readonly KiSymbol[]> {
  const groups = {} as Record<SymbolCategory, KiSymbol[]>
  for (const category of symbolCategories) groups[category] = []
  for (const symbol of list) groups[symbol.category].push(symbol)
  return groups
}

/** Symbols grouped by category, in library order. Every category is present, even when empty. */
export const byCategory: Readonly<Record<SymbolCategory, readonly KiSymbol[]>> = groupByCategory(library)

const aliases: Readonly<Record<string, string>> = symbolAliases

/** The symbol for an id, following an alias (`bridge` is `causeway`); undefined for an unknown or retired id. */
export const resolveSymbol = (id: string): KiSymbol | undefined => byId.get(aliases[id] ?? id)
