import type { IconName } from '@knowledgeislands/icons'

export const symbolStatuses = ['canon', 'decided', 'proposed'] as const
/** `canon`: enacted in ki-principal. `decided`: agreed, awaiting enactment. `proposed`: open for discussion. */
export type SymbolStatus = (typeof symbolStatuses)[number]

export const symbolCategories = [
  'geography',
  'zone',
  'structure',
  'port-mode',
  'signal',
  'condition',
  'role',
  'sea'
] as const
export type SymbolCategory = (typeof symbolCategories)[number]

/** One entry in the Knowledge Islands symbol library. */
export interface KiSymbol {
  /** Stable kebab-case id; never reused once published. */
  readonly id: string
  /** Display name, in British English. */
  readonly name: string
  /** What the symbol stands for. Meaning is canon in ki-principal; this is a mirror. */
  readonly meaning: string
  readonly status: SymbolStatus
  readonly category: SymbolCategory
  /** Line glyph from @knowledgeislands/icons, when one exists. */
  readonly icon?: IconName
  /** How the public site renders it. */
  readonly site?: string
  /** How the apps render it. */
  readonly app?: string
  /** Open questions, history or caveats. */
  readonly notes?: string
}
