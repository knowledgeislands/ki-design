import { api } from '../api.ts'
import { h } from '../dom.ts'
import { plural, time, when } from '../format.ts'
import { type Instrument, onlyFiltered } from '../instrument.ts'
import type { Operation, Repository } from '../types.ts'
import { chip, empty, foot, identity, mono, operationRow, section, type Tone, table, viewHeader } from '../ui.ts'

const SIGNAL_TONE: Record<string, Tone> = {
  dirty: 'warn',
  unpushed: 'warn',
  behind: 'teal',
  conflicted: 'bad',
  detached: 'bad',
  untracked: 'muted'
}

const drift = (r: Repository): HTMLElement => {
  const ahead = r.ahead ?? 0
  const behind = r.behind ?? 0
  if (!r.tracking) return h('span', { class: 'muted' }, 'untracked')
  return h(
    'span',
    { class: 'mono drift', title: `${ahead} ahead, ${behind} behind ${r.upstream ?? 'upstream'}` },
    h('span', { class: ahead ? 'tone-warn-text' : 'muted' }, `↑${ahead}`),
    ' ',
    h('span', { class: behind ? 'tone-teal-text' : 'muted' }, `↓${behind}`)
  )
}

const changed = (r: Repository): HTMLElement => {
  const n = (r.tree?.changed ?? 0) + (r.tree?.untracked ?? 0)
  return mono(n ? String(n) : '–', n ? 'ink' : 'muted')
}

/** Operations grouped by kind ("fetch", "push"…), since the Observatory offers the same few per repository. */
function operationKinds(operations: Operation[]): { kind: string; example: Operation; count: number }[] {
  const kinds = new Map<string, { kind: string; example: Operation; count: number }>()
  for (const op of operations) {
    const kind = op.id.split('@')[0] ?? op.id
    const entry = kinds.get(kind)
    if (entry) entry.count += 1
    else kinds.set(kind, { kind, example: op, count: 1 })
  }
  return [...kinds.values()]
}

export const repositories: Instrument = {
  id: 'repositories',
  job: 'act',
  title: 'Repositories',
  glyph: 'port',
  summary: 'Git state across the repositories in scope, and what is uncommitted or unpushed',
  filters: true,
  async render(context) {
    const read = await api.repositories(context.state.scope)
    const header = (summary: string) => viewHeader('port', 'Repositories', summary)
    if (!read.ok)
      return h(
        'div',
        { class: 'view' },
        header('Unobserved'),
        empty('The repositories could not be read.', read.reason)
      )
    const repos = onlyFiltered(context, read.data.repositories, (r) => r.identity).sort(
      (a, b) => b.signals.length - a.signals.length || time(b.head?.committedAt) - time(a.head?.committedAt)
    )
    const withSignals = repos.filter((r) => r.signals.length).length
    const ops = context.state.repository
      ? read.data.operations.filter((o) => o.id.endsWith(`@${context.state.repository}`))
      : read.data.operations

    return h(
      'div',
      { class: 'view' },
      header(`${plural(repos.length, 'repository', 'repositories')}; ${withSignals} with something to settle`),
      read.data.degraded ? empty('Partly observed.', read.data.degraded) : null,
      repos.length === 0
        ? empty('No repositories in scope.')
        : table<Repository>(
            repos,
            [
              { label: 'Repository', width: '27%', cell: (r) => identity(r.identity) },
              {
                label: 'Branch',
                width: '88px',
                priority: 3,
                cell: (r) => mono(r.detached ? 'detached' : (r.branch ?? '–'), 'muted')
              },
              { label: 'Drift', width: '72px', cell: drift },
              { label: 'Changed', width: '80px', align: 'end', cell: changed },
              {
                label: 'Signals',
                width: '132px',
                cell: (r) =>
                  r.available
                    ? r.signals.length
                      ? h(
                          'span',
                          { class: 'chips' },
                          r.signals.map((s) => chip(s, SIGNAL_TONE[s] ?? 'muted'))
                        )
                      : h('span', { class: 'muted', title: 'settled' }, '–')
                    : chip('unread', 'bad', r.reason ?? undefined)
              },
              {
                label: 'Head',
                cell: (r) =>
                  h('span', { class: 'summary', title: r.head?.subject ?? '' }, r.head?.subject ?? r.reason ?? '–')
              },
              {
                label: 'Committed',
                width: '140px',
                align: 'end',
                priority: 2,
                cell: (r) => mono(when(r.head?.committedAt), 'muted')
              }
            ],
            { caption: 'Repositories', rowTitle: (r) => r.identity }
          ),
      foot(
        'Repositories with signals first; then the most recently committed. Drift is commits ahead (↑) and behind (↓) the upstream.'
      ),
      section(
        'Operations',
        h(
          'p',
          { class: 'muted note' },
          'The preview never runs anything. ',
          context.state.repository
            ? `These are offered for ${context.state.repository}.`
            : `The Observatory offers ${plural(ops.length, 'operation')} across these repositories; filter to one island to see its own.`
        ),
        h(
          'ul',
          { class: 'operations' },
          operationKinds(ops).map(({ kind, example, count }) =>
            operationRow(
              {
                title: context.state.repository ? example.title : (example.title.split(' · ')[0] ?? kind),
                tier: example.tier,
                summary: example.summary,
                command: example.command,
                count: context.state.repository ? undefined : count
              },
              'repositories'
            )
          )
        )
      )
    )
  }
}
