import { api } from '../api.ts'
import { h } from '../dom.ts'
import { plural, rank, when } from '../format.ts'
import { type Instrument, onlyFiltered } from '../instrument.ts'
import type { DecisionRecord, Signal } from '../types.ts'
import {
  chip,
  empty,
  foot,
  groupLabel,
  identity,
  mono,
  section,
  severityTone,
  type Tone,
  table,
  viewHeader
} from '../ui.ts'

const STATUS_TONE: Record<string, Tone> = { current: 'ok', proposed: 'teal', archive: 'muted', superseded: 'muted' }

export const council: Instrument = {
  id: 'council',
  job: 'observe',
  title: 'Council',
  glyph: 'council-hall',
  summary: 'The Decision Records the estate holds, and the structure between them',
  filters: true,
  async render(context) {
    const read = await api.decisions(context.state.scope)
    const header = (summary: string) => viewHeader('council-hall', 'Council', summary)
    if (!read.ok)
      return h(
        'div',
        { class: 'view' },
        header('Unobserved'),
        empty('The Decision Records could not be read.', read.reason)
      )
    const records = onlyFiltered(context, read.data.records, (r) => r.identity).sort(
      (a, b) => a.identity.localeCompare(b.identity) || a.id.localeCompare(b.id)
    )
    const signals = onlyFiltered(context, read.data.signals, (s) => s.repository).sort(rank)
    const types = new Map<string, number>()
    for (const r of records) types.set(r.decisionType, (types.get(r.decisionType) ?? 0) + 1)

    return h(
      'div',
      { class: 'view' },
      header(`${plural(records.length, 'record')} — ${[...types].map(([t, n]) => `${n} ${t}`).join(' · ')}`),
      signals.length
        ? section(
            'Open questions of record',
            table<Signal>(
              signals,
              [
                { label: 'Severity', width: '104px', cell: (s) => chip(s.severity, severityTone[s.severity]) },
                { label: 'Record', width: '200px', cell: (s) => mono(s.subject, 'ink') },
                { label: 'Finding', cell: (s) => h('span', { class: 'summary', title: s.summary }, s.summary) },
                { label: 'Changed', width: '140px', align: 'end', cell: (s) => mono(when(s.changedAt), 'muted') }
              ],
              { caption: 'Decision record signals' }
            )
          )
        : null,
      section(
        'Records',
        records.length === 0
          ? empty('No Decision Records in scope.', 'No repository in scope holds a docs/decisions record yet.')
          : table<DecisionRecord>(
              records,
              [
                { label: 'Record', width: '200px', cell: (r) => mono(r.id, 'ink') },
                { label: 'Title', cell: (r) => h('span', { class: 'summary', title: r.title }, r.title) },
                { label: 'Status', width: '96px', cell: (r) => chip(r.status, STATUS_TONE[r.status] ?? 'muted') },
                {
                  label: 'Type',
                  width: '112px',
                  priority: 2,
                  cell: (r) => h('span', { class: 'muted' }, r.decisionType)
                },
                {
                  label: 'Depends on',
                  width: '96px',
                  priority: 3,
                  align: 'end',
                  cell: (r) => mono(r.dependsOn.length ? String(r.dependsOn.length) : '–', 'muted')
                },
                { label: 'Date', width: '96px', align: 'end', cell: (r) => mono(r.date, 'muted') }
              ],
              {
                caption: 'Decision Records',
                group: (r) => r.identity,
                groupLabel: (g, rows) => groupLabel(identity(g), rows.length),
                rowTitle: (r) => (r.dependsOn.length ? `depends on ${r.dependsOn.join(', ')}` : '')
              }
            )
      ),
      foot(
        'Records grouped by repository, then by identifier. Open questions ranked as in the Beacon; a dangling record depends on one no repository in scope holds.'
      )
    )
  }
}
