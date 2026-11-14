import { api } from '../api.ts'
import { h } from '../dom.ts'
import { plural, time, when } from '../format.ts'
import { type Instrument, onlyFiltered } from '../instrument.ts'
import type { ReviewItem } from '../types.ts'
import { chip, empty, foot, groupLabel, identity, mono, type Tone, table, viewHeader } from '../ui.ts'

const KINDS: Record<string, { label: string; tone: Tone; order: number }> = {
  query: { label: 'Queries to answer', tone: 'warn', order: 0 },
  record: { label: 'Records awaiting review', tone: 'accent', order: 1 },
  capture: { label: 'Captures at Stage', tone: 'teal', order: 2 },
  intake: { label: 'Intake to take in', tone: 'muted', order: 3 }
}

const kind = (k: string) => KINDS[k] ?? { label: k, tone: 'muted' as Tone, order: 9 }

export const waiting: Instrument = {
  id: 'waiting',
  job: 'attend',
  title: 'Waiting for you',
  glyph: 'hourglass',
  summary: 'Open queries, records awaiting review, intake, and captures at Stage',
  filters: true,
  async render(context) {
    const read = await api.review(context.state.scope)
    const header = (summary: string) => viewHeader('hourglass', 'Waiting for you', summary)
    if (!read.ok)
      return h(
        'div',
        { class: 'view' },
        header('Unobserved'),
        empty('The review queue could not be read.', read.reason)
      )
    const items = onlyFiltered(context, read.data.items, (i) => i.identity).sort(
      (a, b) => kind(a.kind).order - kind(b.kind).order || time(b.since) - time(a.since)
    )
    return h(
      'div',
      { class: 'view' },
      header(`${plural(items.length, 'item')} wait for a person; ${read.data.answered} answered and set aside`),
      items.length === 0
        ? empty('Nothing waits for you here.', 'No open query, record, capture or intake in scope.')
        : table<ReviewItem>(
            items,
            [
              { label: 'Kind', width: '84px', cell: (i) => chip(i.kind, kind(i.kind).tone) },
              {
                label: 'Asks',
                cell: (i) =>
                  h('span', { class: 'summary', title: i.path }, i.title || h('span', { class: 'mono' }, i.path))
              },
              { label: 'Tag', width: '190px', priority: 3, cell: (i) => mono(i.tag, 'muted') },
              { label: 'Repository', width: '26%', priority: 2, cell: (i) => identity(i.identity) },
              { label: 'Thread', width: '150px', priority: 3, cell: (i) => mono(i.thread ?? '–', 'muted') },
              { label: 'Since', width: '140px', align: 'end', cell: (i) => mono(when(i.since), 'muted') }
            ],
            {
              caption: 'Items waiting for a person',
              group: (i) => i.kind,
              groupLabel: (g, rows) => groupLabel(kind(g).label, rows.length)
            }
          ),
      foot('Grouped by kind — queries first, as they hold a worker — and within each, the most recent first.')
    )
  }
}
