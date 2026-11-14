/**
 * Shell state: which scope, which job, which instrument, and an optional repository filter.
 * It lives in the URL so a view can be bookmarked or opened from another machine.
 */

export const JOBS = ['observe', 'attend', 'act', 'extend'] as const
export type Job = (typeof JOBS)[number]

export const INSTRUMENTS = [
  'beacon',
  'waiting',
  'lands',
  'library',
  'council',
  'streams',
  'workers',
  'repositories',
  'machine',
  'extensions'
] as const
export type InstrumentId = (typeof INSTRUMENTS)[number]

export interface State {
  scope: string
  instrument: InstrumentId
  /** A filter, not a scope: views that list repositories show only this one. */
  repository: string | null
}

type Listener = (state: State, previous: State) => void

const isInstrument = (value: string | null): value is InstrumentId =>
  value !== null && (INSTRUMENTS as readonly string[]).includes(value)

function fromUrl(): State {
  const params = new URLSearchParams(location.search)
  const view = params.get('view')
  return {
    scope: params.get('scope') ?? 'estate',
    instrument: isInstrument(view) ? view : 'beacon',
    repository: params.get('repo')
  }
}

function toUrl(state: State): void {
  const params = new URLSearchParams({ scope: state.scope, view: state.instrument })
  if (state.repository) params.set('repo', state.repository)
  history.replaceState(null, '', `?${params}`)
}

export class Store {
  #state: State = fromUrl()
  #listeners = new Set<Listener>()

  get state(): State {
    return this.#state
  }

  set(patch: Partial<State>): void {
    const previous = this.#state
    const next = { ...previous, ...patch }
    if (
      next.scope === previous.scope &&
      next.instrument === previous.instrument &&
      next.repository === previous.repository
    ) {
      return
    }
    this.#state = next
    toUrl(next)
    for (const listener of this.#listeners) listener(next, previous)
  }

  subscribe(listener: Listener): () => void {
    this.#listeners.add(listener)
    return () => this.#listeners.delete(listener)
  }
}

// ---------------------------------------------------------------------------------------------
// Per-viewer conveniences in localStorage. Every access is guarded: storage can be absent.

export function remembered<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`ki-preview:${key}`)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function remember(key: string, value: unknown): void {
  try {
    localStorage.setItem(`ki-preview:${key}`, JSON.stringify(value))
  } catch {
    // Storage is a convenience; the page works without it.
  }
}
