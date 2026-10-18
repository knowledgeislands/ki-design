import { api } from '../api.ts'
import { h } from '../dom.ts'
import { plural, tally, time, when } from '../format.ts'
import { type Instrument, onlyFiltered } from '../instrument.ts'
import type { AutomationJob, Run, Thread } from '../types.ts'
import { chip, empty, foot, identity, mono, section, type Tone, table, viewHeader } from '../ui.ts'

const STANDING: Record<string, { order: number; tone: Tone }> = {
  running: { order: 0, tone: 'teal' },
  waiting: { order: 1, tone: 'warn' },
  stale: { order: 2, tone: 'warn' },
  exited: { order: 3, tone: 'bad' },
  finished: { order: 4, tone: 'muted' }
}
const standingOf = (r: Run): string => (r.waiting ? 'waiting' : r.stale ? 'stale' : r.standing)
const standing = (s: string) => STANDING[s] ?? { order: 5, tone: 'muted' as Tone }

const JOB_TONE: Record<string, Tone> = { ok: 'ok', findings: 'warn', failed: 'bad', overdue: 'bad' }

/** A strip of the last runs, oldest first: a small tide gauge. */
const gauge = (job: AutomationJob): HTMLElement =>
  h(
    'span',
    { class: 'gauge', 'aria-label': `last ${job.runs.length} runs: ${job.runs.map((r) => r.status).join(', ')}` },
    [...job.runs]
      .reverse()
      .map((r) =>
        h('span', { class: `tick tone-${JOB_TONE[r.status] ?? 'muted'}`, title: `${r.status} ${when(r.finished)}` })
      )
  )

export function activeRuns(runs: Run[]): number {
  return runs.filter((r) => r.standing === 'running').length
}

export const workers: Instrument = {
  id: 'workers',
  job: 'observe',
  title: 'Workers',
  glyph: 'vessel',
  summary: 'Who and what is working: agent runs, their threads, and the scheduled jobs',
  filters: true,
  async render(context) {
    const [sessions, automation] = await Promise.all([api.sessions(context.state.scope), api.automation()])
    const blocks: Node[] = []
    let summary = 'Unobserved'
    if (sessions.ok) {
      const runs = onlyFiltered(context, sessions.data.runs, (r) => r.identity).sort(
        (a, b) => standing(standingOf(a)).order - standing(standingOf(b)).order || time(b.statusAt) - time(a.statusAt)
      )
      const threads = onlyFiltered(context, sessions.data.threads, (t) => t.identity).sort(
        (a, b) => time(b.updatedAt) - time(a.updatedAt)
      )
      const counts = tally(runs, standingOf)
      summary = `${counts['running'] ?? 0} at work · ${counts['waiting'] ?? 0} waiting · ${(counts['stale'] ?? 0) + (counts['exited'] ?? 0)} stopped short · ${counts['finished'] ?? 0} finished`
      blocks.push(
        section(
          'Runs',
          runs.length === 0
            ? empty('No agent runs in scope.', sessions.data.runsReason)
            : table<Run>(
                runs,
                [
                  { label: 'Standing', width: '100px', cell: (r) => chip(standingOf(r), standing(standingOf(r)).tone) },
                  { label: 'Run', width: '30%', cell: (r) => mono(r.id, 'ink') },
                  { label: 'Latest status', cell: (r) => h('span', { class: 'summary', title: r.status }, r.status) },
                  { label: 'Repository', width: '22%', priority: 2, cell: (r) => identity(r.identity) },
                  { label: 'At', width: '140px', align: 'end', cell: (r) => mono(when(r.statusAt), 'muted') }
                ],
                { caption: 'Agent runs' }
              ),
          foot(
            'At work first, then waiting for a person, then runs that stopped without finishing, then finished; most recent status first within each.',
            sessions.data.olderFinished
              ? ` ${plural(sessions.data.olderFinished, 'older finished run')} not listed.`
              : ''
          )
        ),
        section(
          'Threads',
          threads.length === 0
            ? empty('No coordinating threads in scope.')
            : table<Thread>(
                threads,
                [
                  { label: 'Thread', width: '28%', cell: (t) => h('span', { class: 'ink' }, t.label) },
                  { label: 'Handle', cell: (t) => mono(t.thread, 'muted') },
                  { label: 'Repository', width: '26%', priority: 2, cell: (t) => identity(t.identity) },
                  {
                    label: 'State',
                    width: '84px',
                    priority: 3,
                    cell: (t) => chip(t.state, t.state === 'active' ? 'teal' : 'muted')
                  },
                  { label: 'Updated', width: '140px', align: 'end', cell: (t) => mono(when(t.updatedAt), 'muted') }
                ],
                { caption: 'Coordinating threads' }
              ),
          foot('Most recently updated first.')
        )
      )
    } else {
      blocks.push(empty('The sessions could not be read.', sessions.reason))
    }
    blocks.push(automationSection(automation))
    return h('div', { class: 'view' }, viewHeader('vessel', 'Workers', summary), blocks)
  }
}

export function automationSection(automation: Awaited<ReturnType<typeof api.automation>>): HTMLElement {
  if (!automation.ok) return section('Scheduled jobs', empty('The schedule could not be read.', automation.reason))
  if (!automation.data.observed)
    return section('Scheduled jobs', empty('The schedule was not observed.', automation.data.reason))
  const jobs = [...automation.data.jobs].sort(
    (a, b) => Number(b.overdue) - Number(a.overdue) || a.job.localeCompare(b.job)
  )
  return section(
    'Scheduled jobs',
    table<AutomationJob>(
      jobs,
      [
        { label: 'Job', width: '180px', cell: (j) => mono(j.job, 'ink') },
        {
          label: 'Standing',
          width: '96px',
          cell: (j) => chip(j.overdue ? 'overdue' : j.standing, j.overdue ? 'bad' : (JOB_TONE[j.standing] ?? 'muted'))
        },
        { label: 'Summary', cell: (j) => h('span', { class: 'summary', title: j.summary }, j.summary) },
        { label: 'Recent runs', width: '104px', priority: 3, cell: gauge },
        { label: 'Finished', width: '140px', align: 'end', cell: (j) => mono(when(j.finished), 'muted') }
      ],
      { caption: 'Scheduled jobs' }
    ),
    foot('Overdue first, then by name. The gauge reads oldest to newest, left to right.')
  )
}
