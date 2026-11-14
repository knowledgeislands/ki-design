import { api } from '../api.ts'
import { h } from '../dom.ts'
import { name, plural, rank, when } from '../format.ts'
import { type Instrument, onlyFiltered } from '../instrument.ts'
import { remember, remembered } from '../state.ts'
import type { Severity, Signal } from '../types.ts'
import { chip, empty, filterChips, foot, groupLabel, mono, segmented, severityTone, table, viewHeader } from '../ui.ts'

type Grouping = 'none' | 'severity' | 'category' | 'instrument'

let grouping = remembered<Grouping>('beacon.group', 'none')
const severities = new Set<string>()
const categories = new Set<string>()

const SEVERITIES: Severity[] = ['blocking', 'attention', 'note']

const toggle = (set: Set<string>, value: string): void => {
  if (!set.delete(value)) set.add(value)
}

const counts = (signals: Signal[], key: (s: Signal) => string): Map<string, number> => {
  const out = new Map<string, number>()
  for (const s of signals) out.set(key(s), (out.get(key(s)) ?? 0) + 1)
  return out
}

function subject(signal: Signal): HTMLElement {
  const repo = signal.repository && signal.repository !== signal.subject ? name(signal.repository) : null
  return h(
    'span',
    { class: 'subject' },
    signal.new ? h('span', { class: 'new-tag' }, 'new') : null,
    mono(signal.subject, 'ink'),
    repo ? h('span', { class: 'muted mono' }, ` · ${repo}`) : null
  )
}

export const beacon: Instrument = {
  id: 'beacon',
  job: 'attend',
  title: 'Beacon',
  glyph: 'beacon',
  summary: 'What warrants attention, ranked from what the instruments have already observed',
  filters: true,
  async render(context) {
    const read = await api.beacon(context.state.scope)
    if (!read.ok)
      return h(
        'div',
        {},
        viewHeader('beacon', 'Beacon', 'Unobserved'),
        empty('The Beacon could not be read.', read.reason)
      )
    const all = onlyFiltered(context, read.data.signals, (s) => s.repository)
    const bySeverity = counts(all, (s) => s.severity)
    const byCategory = counts(all, (s) => s.category ?? 'uncategorised')
    const shown = all
      .filter((s) => severities.size === 0 || severities.has(s.severity))
      .filter((s) => categories.size === 0 || categories.has(s.category ?? 'uncategorised'))
      .sort(rank)

    const summary = SEVERITIES.map((sev) => `${bySeverity.get(sev) ?? 0} ${sev}`).join(' · ')
    const contributors = read.data.contributors
    const unobserved = contributors.filter((c) => !c.observed)

    const controls = h(
      'div',
      { class: 'toolbar' },
      segmented<Grouping>(
        'Group',
        [
          { value: 'none', label: 'Ranked' },
          { value: 'severity', label: 'Severity' },
          { value: 'category', label: 'Category' },
          { value: 'instrument', label: 'Instrument' }
        ],
        grouping,
        (value) => {
          grouping = value
          remember('beacon.group', value)
          context.rerender()
        }
      ),
      filterChips(
        'Severity',
        SEVERITIES.map((sev) => ({ value: sev, label: sev, count: bySeverity.get(sev) ?? 0, tone: severityTone[sev] })),
        severities,
        (value) => {
          toggle(severities, value)
          context.rerender()
        }
      ),
      filterChips(
        'Category',
        [...byCategory].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, label: value, count })),
        categories,
        (value) => {
          toggle(categories, value)
          context.rerender()
        }
      )
    )

    const groupOf: Record<Exclude<Grouping, 'none'>, (s: Signal) => string> = {
      severity: (s) => s.severity,
      category: (s) => s.category ?? 'uncategorised',
      instrument: (s) => s.instrument
    }

    const body =
      shown.length === 0
        ? empty(
            all.length === 0 ? 'Nothing warrants attention here.' : 'No signal matches these filters.',
            all.length === 0
              ? `Every contributing instrument observed ${read.data.scope.label} and raised nothing.`
              : null
          )
        : table(
            shown,
            [
              { label: 'Severity', width: '104px', cell: (s) => chip(s.severity, severityTone[s.severity]) },
              { label: 'Subject', width: '30%', cell: subject },
              { label: 'Summary', cell: (s) => h('span', { class: 'summary', title: s.summary }, s.summary) },
              {
                label: 'Category',
                width: '150px',
                priority: 3,
                cell: (s) => h('span', { class: 'muted' }, s.category ?? '–')
              },
              {
                label: 'Instrument',
                width: '104px',
                priority: 2,
                cell: (s) => h('span', { class: 'muted' }, s.instrument)
              },
              { label: 'Changed', width: '140px', align: 'end', cell: (s) => mono(when(s.changedAt), 'muted') }
            ],
            {
              caption: 'Beacon signals',
              group: grouping === 'none' ? undefined : groupOf[grouping],
              groupLabel: (g, rows) => groupLabel(g, rows.length),
              rowClass: (s) => `sev-row sev-${s.severity}`
            }
          )

    return h(
      'div',
      { class: 'view' },
      viewHeader('beacon', 'Beacon', `${summary} — ${plural(all.length, 'signal')} in ${read.data.scope.label}`),
      controls,
      body,
      foot(
        'Ranked blocking, then attention, then note; within each, the most recently changed first. ',
        `${plural(contributors.length - unobserved.length, 'instrument')} contributed; observed ${when(read.data.observedAt)}.`,
        unobserved.length
          ? h(
              'span',
              { class: 'unobserved' },
              ' Not observed: ',
              unobserved.map((c, i) => [
                i ? '; ' : '',
                h('strong', {}, c.instrument),
                ` — ${c.reason ?? 'no reason given'}`
              ])
            )
          : null
      )
    )
  }
}
