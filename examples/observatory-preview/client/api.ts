import type {
  Activity,
  Artifacts,
  Automation,
  Beacon,
  Decisions,
  Documents,
  KnowledgeBases,
  Lands,
  Machine,
  Mcp,
  Meta,
  Repositories,
  Review,
  Roadmap,
  Scopes,
  Sessions,
  TradeRoutes
} from './types.ts'

/** A read either answers with its payload or says why it could not. */
export type Read<T> = { ok: true; data: T } | { ok: false; reason: string }

const cache = new Map<string, Promise<Read<unknown>>>()

async function get<T>(path: string): Promise<Read<T>> {
  try {
    const response = await fetch(path, { headers: { accept: 'application/json' } })
    const body = (await response.json()) as { schema?: string; reason?: string }
    if (!response.ok || body.schema?.endsWith('/unavailable/v1')) {
      return { ok: false, reason: body.reason ?? `${path} answered ${response.status}` }
    }
    return { ok: true, data: body as T }
  } catch (error) {
    return { ok: false, reason: `${path} could not be read: ${String(error)}` }
  }
}

function read<T>(path: string): Promise<Read<T>> {
  let pending = cache.get(path)
  if (!pending) {
    pending = get<T>(path)
    cache.set(path, pending)
  }
  return pending as Promise<Read<T>>
}

/** Forget every read so the next render asks the Observatory again. */
export function refresh(): void {
  cache.clear()
}

const scoped = (route: string, scope: string, extra: Record<string, string> = {}): string =>
  `/api/${route}?${new URLSearchParams({ scope, ...extra })}`

export const api = {
  meta: () => read<Meta>('/preview/meta'),
  lands: () => read<Lands>('/preview/lands'),
  scopes: () => read<Scopes>('/api/scopes'),
  beacon: (scope: string) => read<Beacon>(scoped('beacon', scope)),
  repositories: (scope: string) => read<Repositories>(scoped('repositories', scope, { source: 'git' })),
  roadmap: (scope: string) => read<Roadmap>(scoped('roadmap', scope)),
  sessions: (scope: string) => read<Sessions>(scoped('sessions', scope)),
  review: (scope: string) => read<Review>(scoped('review', scope)),
  decisions: (scope: string) => read<Decisions>(scoped('decisions', scope)),
  activity: (scope: string, days: 7 | 14 | 30 = 30) =>
    read<Activity>(scoped('activity', scope, { days: String(days) })),
  knowledgeBases: (scope: string) => read<KnowledgeBases>(scoped('knowledge-bases', scope)),
  documents: (scope: string) => read<Documents>(scoped('documents', scope)),
  artifacts: (scope: string) => read<Artifacts>(scoped('artifacts', scope)),
  tradeRoutes: (scope: string) => read<TradeRoutes>(scoped('trade-routes', scope)),
  automation: () => read<Automation>('/api/automation'),
  mcp: () => read<Mcp>('/api/mcp'),
  machine: () => read<Machine>('/api/machine')
}
