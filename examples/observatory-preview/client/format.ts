import type { Severity, Signal } from './types.ts'

const pad = (n: number): string => String(n).padStart(2, '0')

/** `YYYY-MM-DD HH:MM` in local time; a bare date stays a bare date; nothing becomes an en dash. */
export function when(value: string | null | undefined): string {
  if (!value) return '–'
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export const time = (value: string | null | undefined): number => (value ? new Date(value).getTime() || 0 : 0)

/** Whole days between `value` and `now`. */
export const ageInDays = (value: string | null | undefined, now: number): number =>
  value ? Math.max(0, (now - time(value)) / 86_400_000) : Number.POSITIVE_INFINITY

export const owner = (identity: string): string => identity.split('/')[0] ?? identity
export const name = (identity: string): string => identity.split('/').slice(1).join('/') || identity

export const SEVERITY_RANK: Record<Severity, number> = { blocking: 0, attention: 1, note: 2 }

/** The Beacon's order: blocking › attention › note, then most recently changed, then by id so ties are stable. */
export const rank = (a: Signal, b: Signal): number =>
  SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] ||
  time(b.changedAt) - time(a.changedAt) ||
  a.id.localeCompare(b.id)

export const plural = (n: number, one: string, many = `${one}s`): string => `${n} ${n === 1 ? one : many}`

/** How many of `items` fall under each key. */
export function tally<T>(items: T[], keyOf: (item: T) => string): Record<string, number> {
  const out: Record<string, number> = {}
  for (const item of items) {
    const k = keyOf(item)
    out[k] = (out[k] ?? 0) + 1
  }
  return out
}
