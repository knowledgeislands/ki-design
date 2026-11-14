import { api } from '../api.ts'
import { h } from '../dom.ts'
import { plural, time, when } from '../format.ts'
import { type Instrument, onlyFiltered } from '../instrument.ts'
import type { RoadmapItem } from '../types.ts'
import { chip, empty, foot, groupLabel, identity, mono, type Tone, table, viewHeader } from '../ui.ts'

const HORIZONS = ['now', 'next', 'soon', 'future', 'waiting-for', 'hold', 'triage']
const STATUSES = ['in-progress', 'awaiting-review', 'ready', 'draft', 'done']
const STATUS_TONE: Record<string, Tone> = {
  'in-progress': 'teal',
  'awaiting-review': 'warn',
  ready: 'accent',
  draft: 'muted',
  done: 'ok'
}
const order = (list: string[], value: string): number => {
  const i = list.indexOf(value)
  return i < 0 ? list.length : i
}

export const streams: Instrument = {
  id: 'streams',
  job: 'observe',
  title: 'Streams',
  glyph: 'streams',
  summary: 'Governed work across the repositories in scope, by horizon and status',
  filters: true,
  async render(context) {
    const read = await api.roadmap(context.state.scope)
    const header = (summary: string) => viewHeader('streams', 'Streams', summary)
    if (!read.ok)
      return h('div', { class: 'view' }, header('Unobserved'), empty('The roadmap could not be read.', read.reason))
    const items = onlyFiltered(context, read.data.items, (i) => i.identity).sort(
      (a, b) =>
        order(HORIZONS, a.horizon) - order(HORIZONS, b.horizon) ||
        order(STATUSES, a.status) - order(STATUSES, b.status) ||
        time(b.updatedAt) - time(a.updatedAt)
    )
    const blocked = items.filter((i) => i.blockedBy.length).length
    const unread = read.data.sources.filter((s) => s.reason)
    return h(
      'div',
      { class: 'view' },
      header(
        `${plural(items.length, 'item')} across ${plural(new Set(items.map((i) => i.identity)).size, 'repository', 'repositories')}; ${blocked} blocked`
      ),
      items.length === 0
        ? empty('No governed work in scope.', unread[0]?.reason ?? 'No repository in scope keeps a docs/roadmap.')
        : table<RoadmapItem>(
            items,
            [
              { label: 'Item', width: '220px', cell: (i) => mono(i.id, 'ink') },
              { label: 'Title', cell: (i) => h('span', { class: 'summary', title: i.title }, i.title) },
              { label: 'Status', width: '132px', cell: (i) => chip(i.status, STATUS_TONE[i.status] ?? 'muted') },
              { label: 'Area', width: '64px', priority: 3, cell: (i) => mono(i.area ?? '–', 'muted') },
              { label: 'Repository', width: '25%', priority: 2, cell: (i) => identity(i.identity) },
              {
                label: 'Blocked by',
                width: '96px',
                priority: 3,
                cell: (i) =>
                  i.blockedBy.length
                    ? chip(plural(i.blockedBy.length, 'item'), 'warn', i.blockedBy.join(', '))
                    : h('span', { class: 'muted' }, '–')
              },
              { label: 'Updated', width: '140px', align: 'end', cell: (i) => mono(when(i.updatedAt), 'muted') }
            ],
            {
              caption: 'Roadmap items',
              group: (i) => i.horizon,
              groupLabel: (g, rows) => groupLabel(g, rows.length)
            }
          ),
      foot(
        `Grouped by horizon, nearest first (${HORIZONS.join(', ')}); within each, by status as work moves (${STATUSES.join(', ')}), then most recently updated.`
      )
    )
  }
}
