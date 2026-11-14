/**
 * The Observatory's read shapes, as far as the preview uses them. Every payload carries a `schema`;
 * fields the preview does not read are left out rather than guessed.
 */

export type Severity = 'blocking' | 'attention' | 'note'

export interface Scope {
  id: string
  kind: 'estate' | 'repository' | 'territory' | string
  label: string
  repositories: number | null
}

export interface Scopes {
  schema: 'observatory/scopes/v1'
  selected: string
  options: Scope[]
}

export interface Signal {
  id: string
  instrument: string
  subject: string
  repository: string | null
  kind: string
  summary: string
  severity: Severity
  category?: string
  source?: string
  observedAt?: string
  changedAt: string | null
  new?: boolean
}

export interface Beacon {
  schema: 'observatory/beacon/v1'
  observedAt: string
  scope: Scope
  contributors: { instrument: string; observed: boolean; reason: string | null; signals: number }[]
  signals: Signal[]
}

export interface Operation {
  id: string
  title: string
  summary: string
  tier: 'plan' | 'mutate' | 'destructive' | string
  confirmation: string
  command: string
  available: boolean
  reason: string | null
}

export interface Repository {
  identity: string
  branch: string | null
  detached: boolean
  head: { id: string; subject: string; author: string; committedAt: string } | null
  tree: { changed: number; untracked: number; staged: number; unstaged: number; conflicted: number } | null
  tracking: boolean
  upstream: string | null
  ahead: number | null
  behind: number | null
  available: boolean
  reason: string | null
  signals: string[]
}

export interface Repositories {
  schema: 'observatory/repositories/v1'
  observedAt: string
  degraded: string | null
  repositories: Repository[]
  operations: Operation[]
}

export interface RoadmapItem {
  identity: string
  id: string
  title: string
  area: string | null
  horizon: string
  status: string
  blocks: string[]
  blockedBy: string[]
  record: string
  updatedAt: string
}

export interface Roadmap {
  schema: 'observatory/roadmap/v1'
  observedAt: string
  sources: { identity: string; items: number; reason: string | null }[]
  items: RoadmapItem[]
}

export interface Run {
  id: string
  identity: string
  thread: string | null
  project: string | null
  state: string
  status: string
  statusAt: string
  stale: boolean
  waiting: boolean
  standing: string
}

export interface Thread {
  identity: string
  thread: string
  label: string
  state: string
  updatedAt: string
}

export interface Sessions {
  schema: 'observatory/sessions/v1'
  observedAt: string
  runsReason: string | null
  olderFinished: number
  threads: Thread[]
  runs: Run[]
}

export interface ReviewItem {
  id: string
  kind: 'query' | 'record' | 'intake' | 'capture' | string
  identity: string
  path: string
  title: string
  tag: string
  thread: string | null
  since: string
}

export interface Review {
  schema: 'observatory/review/v1'
  observedAt: string
  answered: number
  items: ReviewItem[]
}

export interface DecisionRecord {
  identity: string
  id: string
  prefix: string
  title: string
  date: string
  status: string
  decisionType: string
  dependsOn: string[]
}

export interface Decisions {
  schema: 'observatory/decisions/v1'
  observedAt: string
  records: DecisionRecord[]
  signals: Signal[]
}

export interface Activity {
  schema: 'observatory/activity/v1'
  observedAt: string
  window: number
  days: string[]
  repositories: {
    identity: string
    read: boolean
    reason: string | null
    days: number[]
    commits: number
    latest: string | null
  }[]
  total: number
}

export interface AutomationJob {
  job: string
  status: string
  summary: string
  finished: string | null
  overdue: boolean
  standing: string
  runs: { status: string; summary: string; finished: string }[]
}

export interface Automation {
  schema: 'observatory/automation/v1'
  observedAt: string
  observed: boolean
  reason: string | null
  jobs: AutomationJob[]
}

export interface Mcp {
  schema: 'observatory/mcp/v1'
  observedAt: string
  available: boolean
  reason: string | null
  daemon: { running: boolean; sessions: number; connected: number; activeCalls: number } | null
  servers: {
    name: string
    transport: string
    endpoint: string | null
    command: string | null
    secrets?: { set: boolean }[]
  }[]
}

export interface Machine {
  schema: 'observatory/machine/v1'
  observedAt: string
  tooling: { name: string; present: boolean; version: string | null; reason: string | null }[]
  configuration: {
    available: boolean
    entries: { written: string; target: string; path: string }[]
    reason: string | null
  }
  services: { available: boolean; services: { name: string; status: string }[]; reason: string | null }
  operations: Operation[]
  sources: { name: string; available: boolean; reason: string | null }[]
}

export interface Artifacts {
  schema: 'observatory/artifacts/v1'
  artifacts: { identity: string; id: string; title: string; tools: { server: string; tool: string }[] }[]
  refused: { identity: string; name: string; reason: string }[]
}

export interface KnowledgeBases {
  schema: 'observatory/knowledge-bases/v1'
  bases: { identity: string; title: string }[]
}

export interface Documents {
  schema: 'observatory/documents/v1'
  repositories: { identity: string }[]
}

export interface Lands {
  schema: 'preview/lands/v1'
  observedAt: string
  territories: { id: string; label: string; repositories: string[]; reason: string | null }[]
}

export interface Meta {
  schema: 'preview/meta/v1'
  mode: 'live' | 'fixtures'
  upstream: string
}

/** `ki repo --estate trade routes list`, as the Observatory serves it at `/api/trade-routes`. */
export interface TradeRoutes {
  schema: 'ki/trade-routes/v1'
  scope: 'estate'
  incomplete: boolean
  routes: TradeRoute[]
}

export interface TradeRoute {
  source: { identity: string; repository: string; mapBonus: number }
  peer: { identity: string; repository: string; resolved: boolean; mapBonus: number | null }
  direction: 'export' | 'import'
  kind: 'work' | 'knowledge'
  state: 'active' | 'awaiting-receiver' | 'awaiting-sender' | 'ambiguous-repository'
}
