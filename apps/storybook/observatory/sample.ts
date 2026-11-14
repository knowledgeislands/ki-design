/**
 * A small invented estate for the Observatory story: two territories and a stray repository, with enough signals,
 * work, runs and routes to fill every instrument. Nothing here is read from a real machine. The reader answers the
 * same paths the Observatory's JSON API serves, filtered to the requested scope the way the old fixture server did.
 */
import type { Read, Reader } from './client/api.ts'
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
  Repository,
  Review,
  Roadmap,
  Scope,
  Scopes,
  Sessions,
  Signal,
  TradeRoutes
} from './client/types.ts'

const DAY = 86_400_000

/** Every time in the sample is relative to when the story opens, so ages read the same on any day. */
function sampleEstate(now: number) {
  const at = (daysAgo: number): string => new Date(now - daysAgo * DAY).toISOString()
  const observedAt = at(0)

  const harbour = [
    'example/harbour-principal',
    'example/tools-lantern',
    'example/mcp-tide',
    'example/apps-harbour.local'
  ]
  const uplands = ['example/uplands-principal', 'example/uplands-harness', 'example/field-notes']
  const stray = ['example/driftwood']
  const everyone = [...harbour, ...uplands, ...stray]
  const latestDays: Record<string, number> = {
    'example/harbour-principal': 0,
    'example/tools-lantern': 1,
    'example/mcp-tide': 6,
    'example/apps-harbour.local': 3,
    'example/uplands-principal': 2,
    'example/uplands-harness': 12,
    'example/field-notes': 40,
    'example/driftwood': 120
  }

  const estate: Scope = { id: 'estate', kind: 'estate', label: 'registered estate', repositories: everyone.length }
  const scopes: Scopes = {
    schema: 'observatory/scopes/v1',
    selected: 'estate',
    options: [
      estate,
      { id: 'territory:harbour', kind: 'territory', label: 'Harbour', repositories: harbour.length },
      { id: 'territory:uplands', kind: 'territory', label: 'Uplands', repositories: uplands.length },
      ...everyone.map((identity) => ({
        id: `repository:${identity}`,
        kind: 'repository',
        label: identity,
        repositories: 1
      }))
    ]
  }

  const lands: Lands = {
    schema: 'preview/lands/v1',
    observedAt,
    territories: [
      { id: 'territory:harbour', label: 'Harbour', repositories: harbour, reason: null },
      { id: 'territory:uplands', label: 'Uplands', repositories: uplands, reason: null }
    ]
  }

  const signal = (
    id: string,
    repository: string,
    severity: Signal['severity'],
    summary: string,
    changedAt: number,
    instrument = 'repositories'
  ): Signal => ({
    id,
    instrument,
    subject: repository,
    repository,
    kind: instrument === 'repositories' ? 'drift' : 'record',
    summary,
    severity,
    category: instrument === 'repositories' ? 'git' : 'work',
    observedAt,
    changedAt: at(changedAt),
    new: changedAt < 1
  })
  const signals: Signal[] = [
    signal('s1', 'example/tools-lantern', 'blocking', 'Behind its upstream by 3 commits and diverged', 0.2),
    signal('s2', 'example/apps-harbour.local', 'attention', '4 files changed and not committed', 1),
    signal('s3', 'example/uplands-harness', 'attention', 'A work record has waited 9 days for review', 9, 'roadmap'),
    signal('s4', 'example/field-notes', 'note', 'No commit for 40 days', 40),
    signal('s5', 'example/driftwood', 'note', 'Belongs to no territory', 120, 'lands')
  ]

  const beacon: Beacon = {
    schema: 'observatory/beacon/v1',
    observedAt,
    scope: estate,
    contributors: [
      { instrument: 'repositories', observed: true, reason: null, signals: 3 },
      { instrument: 'roadmap', observed: true, reason: null, signals: 1 },
      { instrument: 'automation', observed: false, reason: 'The scheduler is not running on this machine', signals: 0 }
    ],
    signals
  }

  const repository = (identity: string, index: number): Repository => {
    const changed = identity === 'example/apps-harbour.local' ? 4 : 0
    return {
      identity,
      branch: 'main',
      detached: false,
      head: {
        id: (0x1a2b3c4d + index * 0x1111).toString(16).padEnd(40, '0'),
        subject: ['docs: chart the harbour', 'feat: light the lantern', 'fix: read the tide tables'][
          index % 3
        ] as string,
        author: 'Sample Keeper',
        committedAt: at(latestDays[identity] ?? 0)
      },
      tree: { changed, untracked: changed ? 1 : 0, staged: 0, unstaged: changed, conflicted: 0 },
      tracking: true,
      upstream: 'origin/main',
      ahead: identity === 'example/tools-lantern' ? 1 : 0,
      behind: identity === 'example/tools-lantern' ? 3 : 0,
      available: true,
      reason: null,
      signals: signals.filter((s) => s.repository === identity).map((s) => s.summary)
    }
  }
  const repositories: Repositories = {
    schema: 'observatory/repositories/v1',
    observedAt,
    degraded: null,
    repositories: everyone.map(repository),
    operations: [
      {
        id: 'fetch',
        title: 'Fetch every repository',
        summary: 'Fetches each remote; changes nothing locally.',
        tier: 'plan',
        confirmation: 'none',
        command: 'git fetch --all',
        available: true,
        reason: null
      }
    ]
  }

  const roadmap: Roadmap = {
    schema: 'observatory/roadmap/v1',
    observedAt,
    sources: [
      { identity: 'example/harbour-principal', items: 2, reason: null },
      { identity: 'example/uplands-harness', items: 2, reason: null }
    ],
    items: [
      ['example/harbour-principal', 'HARBOUR-001', 'Chart the outer reefs', 'now', 'in-progress', 1],
      ['example/harbour-principal', 'HARBOUR-002', 'Light the second beacon', 'next', 'ready', 4],
      ['example/uplands-harness', 'UPLANDS-007', 'Review the field-note template', 'now', 'awaiting-review', 9],
      ['example/uplands-harness', 'UPLANDS-008', 'Teach the harness the high paths', 'later', 'draft', 20]
    ].map(([identity, id, title, horizon, status, days]) => ({
      identity: identity as string,
      id: id as string,
      title: title as string,
      area: null,
      horizon: horizon as string,
      status: status as string,
      blocks: [],
      blockedBy: [],
      record: `docs/roadmap/${id}.md`,
      updatedAt: at(days as number)
    }))
  }

  const sessions: Sessions = {
    schema: 'observatory/sessions/v1',
    observedAt,
    runsReason: null,
    olderFinished: 6,
    threads: [
      {
        identity: 'example/harbour-principal',
        thread: 'reefs',
        label: 'Chart the outer reefs',
        state: 'active',
        updatedAt: at(0.1)
      }
    ],
    runs: [
      {
        id: 'run-1',
        identity: 'example/harbour-principal',
        thread: 'reefs',
        project: null,
        state: 'running',
        status: 'Surveying the northern reef',
        statusAt: at(0.01),
        stale: false,
        waiting: false,
        standing: 'running'
      },
      {
        id: 'run-2',
        identity: 'example/uplands-harness',
        thread: null,
        project: null,
        state: 'waiting',
        status: 'Waiting for an answer on the template',
        statusAt: at(0.3),
        stale: false,
        waiting: true,
        standing: 'waiting'
      },
      {
        id: 'run-3',
        identity: 'example/tools-lantern',
        thread: null,
        project: null,
        state: 'finished',
        status: 'Released the lantern',
        statusAt: at(1),
        stale: false,
        waiting: false,
        standing: 'finished'
      }
    ]
  }

  const review: Review = {
    schema: 'observatory/review/v1',
    observedAt,
    answered: 2,
    items: [
      {
        id: 'q1',
        kind: 'query',
        identity: 'example/uplands-harness',
        path: 'docs/roadmap/UPLANDS-007.md',
        title: 'Keep the template to one page?',
        tag: 'UPLANDS-007',
        thread: null,
        since: at(2)
      },
      {
        id: 'r1',
        kind: 'record',
        identity: 'example/harbour-principal',
        path: 'docs/roadmap/HARBOUR-001.md',
        title: 'Chart the outer reefs',
        tag: 'HARBOUR-001',
        thread: 'reefs',
        since: at(0.5)
      }
    ]
  }

  const decisions: Decisions = {
    schema: 'observatory/decisions/v1',
    observedAt,
    records: [
      [
        'example/harbour-principal',
        'GDR-HARBOUR-001',
        'GDR',
        'The harbour keeps one register',
        30,
        'Accepted',
        'Governance'
      ],
      [
        'example/harbour-principal',
        'ADR-HARBOUR-002',
        'ADR',
        'Tide tables are read, never written',
        12,
        'Accepted',
        'Architecture'
      ],
      ['example/uplands-harness', 'GDR-UPLANDS-001', 'GDR', 'Field notes stay plain text', 5, 'Proposed', 'Governance']
    ].map(([identity, id, prefix, title, days, status, decisionType]) => ({
      identity: identity as string,
      id: id as string,
      prefix: prefix as string,
      title: title as string,
      date: at(days as number).slice(0, 10),
      status: status as string,
      decisionType: decisionType as string,
      dependsOn: []
    })),
    signals: []
  }

  const days = Array.from({ length: 30 }, (_, i) => at(29 - i).slice(0, 10))
  const activity: Activity = {
    schema: 'observatory/activity/v1',
    observedAt,
    window: 30,
    days,
    repositories: everyone.map((identity, index) => {
      const latest = latestDays[identity] ?? 0
      const counts = days.map((_, i): number =>
        29 - i < latest ? 0 : (i * 7 + index * 3) % 5 === 0 ? 2 : (i + index) % 4 === 0 ? 1 : 0
      )
      return {
        identity,
        read: true,
        reason: null,
        days: counts,
        commits: counts.reduce((a, b) => a + b, 0),
        latest: latest > 60 ? null : at(latest)
      }
    }),
    total: 0
  }
  activity.total = activity.repositories.reduce((sum, r) => sum + r.commits, 0)

  const knowledgeBases: KnowledgeBases = {
    schema: 'observatory/knowledge-bases/v1',
    bases: [
      { identity: 'example/harbour-principal', title: 'Harbour library' },
      { identity: 'example/field-notes', title: 'Field notes' }
    ]
  }
  const documents: Documents = {
    schema: 'observatory/documents/v1',
    repositories: [{ identity: 'example/harbour-principal' }, { identity: 'example/field-notes' }]
  }
  const artifacts: Artifacts = {
    schema: 'observatory/artifacts/v1',
    artifacts: [
      {
        identity: 'example/mcp-tide',
        id: 'tide-tables',
        title: 'Tide tables',
        tools: [{ server: 'tide', tool: 'tide_read' }]
      }
    ],
    refused: [{ identity: 'example/driftwood', name: 'flotsam', reason: 'Its manifest names no instrument' }]
  }
  const tradeRoutes: TradeRoutes = {
    schema: 'ki/trade-routes/v1',
    scope: 'estate',
    incomplete: false,
    routes: [
      {
        source: { identity: 'example/harbour-principal', repository: 'harbour-principal', mapBonus: 1 },
        peer: { identity: 'example/uplands-principal', repository: 'uplands-principal', resolved: true, mapBonus: 1 },
        direction: 'export',
        kind: 'knowledge',
        state: 'active'
      },
      {
        source: { identity: 'example/tools-lantern', repository: 'tools-lantern', mapBonus: 0 },
        peer: { identity: 'example/uplands-harness', repository: 'uplands-harness', resolved: true, mapBonus: 0 },
        direction: 'export',
        kind: 'work',
        state: 'awaiting-receiver'
      }
    ]
  }
  const automation: Automation = {
    schema: 'observatory/automation/v1',
    observedAt,
    observed: true,
    reason: null,
    jobs: [
      {
        job: 'nightly-fetch',
        status: 'succeeded',
        summary: 'Fetched 8 repositories',
        finished: at(0.4),
        overdue: false,
        standing: 'healthy',
        runs: [0.4, 1.4, 2.4].map((d) => ({ status: 'succeeded', summary: 'Fetched 8 repositories', finished: at(d) }))
      }
    ]
  }
  const mcp: Mcp = {
    schema: 'observatory/mcp/v1',
    observedAt,
    available: true,
    reason: null,
    daemon: { running: true, sessions: 2, connected: 2, activeCalls: 0 },
    servers: [
      { name: 'tide', transport: 'stdio', endpoint: null, command: 'tide-mcp', secrets: [{ set: true }] },
      { name: 'charts', transport: 'http', endpoint: 'http://127.0.0.1:4100/mcp', command: null }
    ]
  }
  const machine: Machine = {
    schema: 'observatory/machine/v1',
    observedAt,
    tooling: [
      { name: 'git', present: true, version: '2.50.0', reason: null },
      { name: 'bun', present: true, version: '1.4.3', reason: null },
      { name: 'sextant', present: false, version: null, reason: 'Not installed' }
    ],
    configuration: {
      available: true,
      entries: [{ written: at(3), target: 'shell', path: '~/.config/harbour/config.toml' }],
      reason: null
    },
    services: { available: true, services: [{ name: 'observatory', status: 'running' }], reason: null },
    operations: [],
    sources: [{ name: 'scheduler', available: true, reason: null }]
  }
  const meta: Meta = { schema: 'preview/meta/v1', mode: 'fixtures', upstream: 'the sample estate' }

  const territoryOf = new Map(lands.territories.map((t) => [t.id, new Set(t.repositories)]))
  const routes: Record<string, unknown> = {
    scopes,
    beacon,
    repositories,
    roadmap,
    sessions,
    review,
    decisions,
    activity,
    'knowledge-bases': knowledgeBases,
    documents,
    artifacts,
    'trade-routes': tradeRoutes,
    automation,
    mcp,
    machine
  }
  return { meta, lands, routes, territoryOf }
}

/** Keeps the items of each list whose repository is in `members`. */
function within(value: unknown, members: Set<string>): unknown {
  if (!Array.isArray(value)) return value
  return value.filter((item) => {
    if (!item || typeof item !== 'object') return true
    const record = item as Record<string, unknown>
    const owner = typeof record['identity'] === 'string' ? record['identity'] : record['repository']
    return typeof owner !== 'string' || members.has(owner)
  })
}

/** A reader over the sample estate, as the Observatory would answer at `now`. */
export function sampleReader(now = Date.now()): Reader {
  const estate = sampleEstate(now)
  return async (path: string): Promise<Read<unknown>> => {
    const url = new URL(path, 'http://sample.invalid')
    if (url.pathname === '/preview/meta') return { ok: true, data: estate.meta }
    if (url.pathname === '/preview/lands') return { ok: true, data: estate.lands }
    const body = estate.routes[url.pathname.replace(/^\/api\//, '')]
    if (!body) return { ok: false, reason: `the sample estate has nothing at ${url.pathname}` }
    const scope = url.searchParams.get('scope')
    const members = scope?.startsWith('repository:')
      ? new Set([scope.slice('repository:'.length)])
      : scope
        ? estate.territoryOf.get(scope)
        : undefined
    if (!members) return { ok: true, data: body }
    const scoped = Object.fromEntries(
      Object.entries(body as Record<string, unknown>).map(([key, value]) => [
        key,
        key === 'operations' ? value : within(value, members)
      ])
    )
    return { ok: true, data: scoped }
  }
}
