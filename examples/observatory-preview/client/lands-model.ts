/**
 * The Map of Known Lands as data: territories become archipelagos, repositories become islands.
 * Layout is deterministic — territories sorted by name and placed outward along a spiral, islands
 * packed outward from their capital with at least one hex of sea between any two. Pure: no DOM.
 */
import {
  type Axial,
  axialToOffset,
  type Condition,
  distance,
  hex,
  hexAdd,
  hexKey,
  type IslandMap,
  type MapHex,
  type MapLabel,
  type MapRoute,
  neighbour,
  neighbours,
  offsetToAxial,
  spiral,
  toPixel
} from '../../../packages/hexmap/src/index.ts'
import { ageInDays, name } from './format.ts'
import type { Severity, TradeRoute } from './types.ts'

export type { Axial, Condition }
export type Role = 'citadel' | 'workshop' | 'bridge' | 'port' | 'island'

export interface Island {
  identity: string
  territory: string
  role: Role
  condition: Condition
  latest: string | null
  hexes: Axial[]
  signals: Record<Severity, number>
}

export interface Territory {
  id: string
  label: string
  reason: string | null
  tone: number
  islands: Island[]
  /** Island hexes and the ring of sea around them: the territory's waters. */
  waters: Axial[]
}

export interface Chart {
  territories: Territory[]
  islands: Island[]
  /** Every hex the chart draws, sea included: a full rectangle of rows around the territories. */
  extent: Axial[]
}

export const ROLES: readonly Role[] = ['citadel', 'workshop', 'bridge', 'port', 'island']
export const CONDITIONS: readonly Condition[] = ['thriving', 'quiet', 'weathered', 'ruined']

export const ROLE_LABEL: Record<Role, string> = {
  citadel: 'capital (Principal)',
  workshop: 'workshop (tools, harness)',
  bridge: 'bridge (MCP server)',
  port: 'port (app, tap)',
  island: 'island'
}

export const CONDITION_LABEL: Record<Condition, string> = {
  thriving: 'thriving — a commit within 2 days',
  quiet: 'quiet — within 14 days',
  weathered: 'weathered — within 60 days',
  ruined: 'ruined — older, or no evidence'
}

export function roleOf(identity: string): Role {
  const n = name(identity)
  if (n.endsWith('-principal')) return 'citadel'
  if (n.startsWith('tools-') || n.endsWith('-harness')) return 'workshop'
  if (n.startsWith('mcp-')) return 'bridge'
  if (n.startsWith('apps-') || n.startsWith('homebrew-')) return 'port'
  return 'island'
}

/** Condition by evidence: the age of the latest commit at the time of observation (DESIGN 3.6). */
export function conditionOf(latest: string | null, now: number): Condition {
  const days = ageInDays(latest, now)
  if (days <= 2) return 'thriving'
  if (days <= 14) return 'quiet'
  if (days <= 60) return 'weathered'
  return 'ruined'
}

const ORIGIN = hex(0, 0)
/** How much more a step north or south costs than a step east or west when placing territories. */
const LANDSCAPE = 1.7

/** A capital spans three hexes (itself, east and south-east); every other island one. */
const footprint = (role: Role, at: Axial): Axial[] =>
  role === 'citadel' ? [at, neighbour(at, 0), neighbour(at, 5)] : [at]

/** Pack islands outward from the origin, keeping one hex of sea between neighbours. */
function packIslands(islands: Omit<Island, 'hexes'>[]): Island[] {
  const blocked = new Set<string>()
  const candidates = spiral(ORIGIN, 16)
  const placed: Island[] = []
  for (const island of islands) {
    const spot = candidates.find((c) => footprint(island.role, c).every((h) => !blocked.has(hexKey(h))))
    if (!spot) continue
    const hexes = footprint(island.role, spot)
    for (const h of hexes) {
      blocked.add(hexKey(h))
      for (const n of neighbours(h)) blocked.add(hexKey(n))
    }
    placed.push({ ...island, hexes })
  }
  return placed
}

function watersOf(islands: Island[]): Axial[] {
  const seen = new Map<string, Axial>()
  for (const island of islands) {
    for (const h of island.hexes) {
      seen.set(hexKey(h), h)
      for (const n of neighbours(h)) seen.set(hexKey(n), n)
    }
  }
  return [...seen.values()]
}

const radiusOf = (hexes: Axial[]): number => Math.max(0, ...hexes.map((h) => distance(h, ORIGIN)))

export interface ChartInput {
  territories: { id: string; label: string; repositories: string[]; reason: string | null }[]
  /** Every repository the estate knows, so ones in no territory still appear. */
  repositories: string[]
  latest: Map<string, string | null>
  signals: Map<string, Record<Severity, number>>
  now: number
}

/** A rectangle of offset rows covering every hex within `margin` of `hexes`. */
function seaRectangle(hexes: Axial[], margin: number): Axial[] {
  if (hexes.length === 0) return []
  const offsets = hexes.map(axialToOffset)
  const minCol = Math.min(...offsets.map((o) => o.col)) - margin
  const maxCol = Math.max(...offsets.map((o) => o.col)) + margin
  const minRow = Math.min(...offsets.map((o) => o.row)) - margin
  const maxRow = Math.max(...offsets.map((o) => o.row)) + margin
  const out: Axial[] = []
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) out.push(offsetToAxial({ col, row }))
  }
  return out
}

export function chart(input: ChartInput): Chart {
  const claimed = new Set(input.territories.flatMap((t) => t.repositories))
  const unclaimed = [...new Set(input.repositories.filter((r) => !claimed.has(r)))].sort()
  const sources = [...input.territories].sort((a, b) => a.label.localeCompare(b.label) || a.id.localeCompare(b.id))
  if (unclaimed.length) {
    sources.push({ id: 'unclaimed', label: 'Unclaimed waters', repositories: unclaimed, reason: null })
  }

  const local = sources.map((t, index) => {
    const ordered = [...new Set(t.repositories)].sort((a, b) => {
      const ca = roleOf(a) === 'citadel' ? 0 : 1
      const cb = roleOf(b) === 'citadel' ? 0 : 1
      return ca - cb || name(a).localeCompare(name(b)) || a.localeCompare(b)
    })
    const islands = packIslands(
      ordered.map((identity) => {
        const latest = input.latest.get(identity) ?? null
        return {
          identity,
          territory: t.id,
          role: roleOf(identity),
          condition: conditionOf(latest, input.now),
          latest,
          signals: input.signals.get(identity) ?? { blocking: 0, attention: 0, note: 0 }
        }
      })
    )
    const waters = watersOf(islands)
    return { source: t, tone: index % 5, islands, waters, radius: radiusOf(waters) }
  })

  // Place archipelagos outward from the centre, nearest first by a landscape-weighted distance so the chart is
  // wider than tall, as a screen is; a sea lane of at least one clear hex separates any two.
  const world = spiral(ORIGIN, 48)
    .map((c, index) => {
      const { x, y } = toPixel(c, 1)
      return { c, index, score: x * x + (LANDSCAPE * y) ** 2 }
    })
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map(({ c }) => c)
  const centres: { at: Axial; radius: number }[] = []
  const territories: Territory[] = []
  for (const t of local) {
    const base = { id: t.source.id, label: t.source.label, reason: t.source.reason, tone: t.tone }
    if (t.islands.length === 0) {
      territories.push({ ...base, islands: [], waters: [] })
      continue
    }
    const at = world.find((c) => centres.every((p) => distance(c, p.at) >= p.radius + t.radius + 2)) ?? ORIGIN
    centres.push({ at, radius: t.radius })
    territories.push({
      ...base,
      islands: t.islands.map((i) => ({ ...i, hexes: i.hexes.map((h) => hexAdd(h, at)) })),
      waters: t.waters.map((h) => hexAdd(h, at))
    })
  }

  const extent = seaRectangle(
    territories.flatMap((t) => t.waters),
    2
  )
  return { territories, islands: territories.flatMap((t) => t.islands), extent }
}

/** Edges of a hex set that face outward, as [hex, direction] pairs (hexmap direction order), for a border. */
export function outline(hexes: Axial[]): [Axial, number][] {
  const inside = new Set(hexes.map(hexKey))
  const out: [Axial, number][] = []
  for (const h of hexes) {
    for (let d = 0; d < 6; d++) if (!inside.has(hexKey(neighbour(h, d)))) out.push([h, d])
  }
  return out
}

/** The two corner indices of `hexCorners` (clockwise from the top vertex) bounding the edge towards `d`. */
export const edgeCorners = (d: number): [number, number] => [(7 - d) % 6, (8 - d) % 6]

// ---------------------------------------------------------------------------------------------
// Trade routes: one lane per pair of islands and kind of trade.

export interface Lane {
  from: string
  to: string
  kind: TradeRoute['kind']
  /** Active only when every report of the pair is active; otherwise awaiting reciprocity. */
  status: 'active' | 'awaiting'
}

/**
 * Folds the estate's route report into lanes. Both ends usually report a route (export and import), so the pair is
 * keyed without direction. Lanes whose ends are not both on the chart are dropped.
 */
export function lanesOf(routes: readonly TradeRoute[], onChart: ReadonlySet<string>): Lane[] {
  const lanes = new Map<string, Lane>()
  for (const route of routes) {
    const a = route.source.identity
    const b = route.peer.identity
    if (a === b || !onChart.has(a) || !onChart.has(b)) continue
    const [from, to] = a < b ? [a, b] : [b, a]
    const key = `${from} ${to} ${route.kind}`
    const status = route.state === 'active' ? 'active' : 'awaiting'
    const known = lanes.get(key)
    if (!known) lanes.set(key, { from, to, kind: route.kind, status })
    else if (status === 'awaiting') known.status = 'awaiting'
  }
  return [...lanes.values()].sort((x, y) => x.from.localeCompare(y.from) || x.to.localeCompare(y.to))
}

// ---------------------------------------------------------------------------------------------
// The chart as an `islandmap/v1` for `@knowledgeislands/hexmap`.

/** Terrain carries maturity (DESIGN 3.1, terrain elevation): a capital stands on hills, the rest on grassland. */
const terrainOf = (role: Role): MapHex['terrain'] => (role === 'citadel' ? 'hills' : 'grassland')

/** Where a territory's name sits: the hex one row above the top of its waters, centred. */
export function labelHex(waters: readonly Axial[]): Axial | null {
  if (waters.length === 0) return null
  const top = Math.min(...waters.map((h) => h.r))
  const cols = waters.map(axialToOffset).map((o) => o.col)
  const col = Math.round((Math.min(...cols) + Math.max(...cols)) / 2)
  return offsetToAxial({ col, row: top - 1 })
}

export function islandMap(model: Chart, lanes: readonly Lane[] = []): IslandMap {
  const land = new Map<string, MapHex>()
  for (const island of model.islands) {
    island.hexes.forEach((h, i) => {
      land.set(hexKey(h), {
        q: h.q,
        r: h.r,
        terrain: terrainOf(island.role),
        ...(i === 0 ? { structure: island.role, condition: island.condition } : {})
      })
    })
  }
  const hexes: MapHex[] = [...land.values()]
  for (const h of model.extent) if (!land.has(hexKey(h))) hexes.push({ q: h.q, r: h.r, terrain: 'ocean' })

  const anchor = new Map(model.islands.map((i) => [i.identity, i.hexes[0] as Axial]))
  const routes: MapRoute[] = lanes.flatMap((lane) => {
    const from = anchor.get(lane.from)
    const to = anchor.get(lane.to)
    return from && to ? [{ from, to, kind: lane.status === 'active' ? 'active' : 'pending' }] : []
  })
  const labels: MapLabel[] = model.territories.flatMap((t) => {
    const at = labelHex(t.waters)
    return at ? [{ q: at.q, r: at.r, text: t.label.toUpperCase() }] : []
  })
  return { schema: 'islandmap/v1', id: 'known-lands', name: 'Map of Known Lands', hexes, routes, labels }
}
