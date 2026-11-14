import type { GlyphName } from './glyphs.ts'
import type { InstrumentId, Job, State, Store } from './state.ts'
import type { Scope } from './types.ts'

export interface Context {
  readonly state: State
  readonly store: Store
  readonly scopes: Scope[]
  /** Render the current instrument again; reads are cached, so this is cheap. */
  rerender(): void
}

export interface Instrument {
  id: InstrumentId
  job: Job
  title: string
  glyph: GlyphName
  summary: string
  /** Whether the shell's repository filter narrows this instrument. */
  filters: boolean
  render(context: Context): Promise<Node>
}

/** Rows belonging to the filtered repository, or every row when there is no filter. */
export function onlyFiltered<T>(context: Context, rows: T[], identityOf: (row: T) => string | null): T[] {
  const repository = context.state.repository
  return repository ? rows.filter((row) => identityOf(row) === repository) : rows
}
