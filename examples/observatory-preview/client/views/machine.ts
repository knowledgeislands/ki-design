import { api } from '../api.ts'
import { h } from '../dom.ts'
import { plural } from '../format.ts'
import type { Instrument } from '../instrument.ts'
import type { Machine, Mcp } from '../types.ts'
import { chip, empty, foot, mono, operationRow, section, table, viewHeader } from '../ui.ts'
import { automationSection } from './workers.ts'

type Tool = Machine['tooling'][number]
type Entry = Machine['configuration']['entries'][number]
type Server = Mcp['servers'][number]

export const machine: Instrument = {
  id: 'machine',
  job: 'act',
  title: 'Machine',
  glyph: 'mill',
  summary: 'This workstation: tooling, configuration drift, services, the MCP daemon and the schedule',
  filters: false,
  async render() {
    const [machineRead, mcpRead, automation] = await Promise.all([api.machine(), api.mcp(), api.automation()])
    const blocks: Node[] = []
    let summary = 'Unobserved'

    if (machineRead.ok) {
      const m = machineRead.data
      const missing = m.tooling.filter((t) => !t.present).length
      summary = `${plural(m.tooling.length, 'tool')} (${missing} missing) · ${plural(m.configuration.entries.length, 'configuration entry', 'configuration entries')} drifted`
      blocks.push(
        h(
          'div',
          { class: 'columns' },
          section(
            'Tooling',
            table<Tool>(
              [...m.tooling].sort((a, b) => Number(a.present) - Number(b.present) || a.name.localeCompare(b.name)),
              [
                { label: 'Tool', width: '30%', cell: (t) => mono(t.name, 'ink') },
                {
                  label: 'Version',
                  cell: (t) =>
                    t.present ? mono(t.version ?? '–', 'muted') : h('span', { class: 'muted' }, t.reason ?? 'absent')
                },
                {
                  label: 'Present',
                  width: '84px',
                  cell: (t) => chip(t.present ? 'present' : 'missing', t.present ? 'ok' : 'bad')
                }
              ],
              { caption: 'Tooling' }
            ),
            foot('Missing first, then by name.')
          ),
          section(
            'Configuration drift',
            m.configuration.available
              ? m.configuration.entries.length
                ? table<Entry>(
                    m.configuration.entries,
                    [
                      { label: 'Path', cell: (e) => mono(e.path, 'ink') },
                      { label: 'Written', width: '76px', cell: (e) => mono(e.written, 'muted') },
                      { label: 'Target', width: '76px', cell: (e) => mono(e.target, 'muted') }
                    ],
                    { caption: 'Configuration drift' }
                  )
                : empty('No drift.', 'Every home entry matches its source.')
              : empty('Configuration was not observed.', m.configuration.reason),
            h('h3', {}, 'Services'),
            m.services.available
              ? m.services.services.length
                ? h(
                    'ul',
                    { class: 'plain' },
                    m.services.services.map((s) => h('li', {}, mono(s.name), ' ', chip(s.status, 'muted')))
                  )
                : h('p', { class: 'muted note' }, 'No managed services are running.')
              : empty('Services were not observed.', m.services.reason),
            m.sources.some((s) => !s.available)
              ? foot(m.sources.filter((s) => !s.available).map((s) => `${s.name}: ${s.reason ?? 'unavailable'}. `))
              : null
          )
        ),
        section(
          'Operations',
          h('p', { class: 'muted note' }, 'The preview never runs anything.'),
          h(
            'ul',
            { class: 'operations' },
            m.operations.map((op) => operationRow(op, 'machine'))
          )
        )
      )
    } else {
      blocks.push(empty('The machine could not be read.', machineRead.reason))
    }

    if (mcpRead.ok) {
      const { daemon, servers } = mcpRead.data
      blocks.push(
        section(
          'MCP',
          h(
            'p',
            { class: 'daemon' },
            daemon
              ? [
                  chip(daemon.running ? 'running' : 'stopped', daemon.running ? 'ok' : 'bad'),
                  ` daemon · ${daemon.connected} of ${plural(daemon.sessions, 'session')} connected · ${daemon.activeCalls} active calls`
                ]
              : h('span', { class: 'muted' }, mcpRead.data.reason ?? 'No daemon observed.')
          ),
          table<Server>(
            [...servers].sort((a, b) => a.name.localeCompare(b.name)),
            [
              { label: 'Server', width: '30%', cell: (s) => mono(s.name, 'ink') },
              {
                label: 'Transport',
                width: '84px',
                cell: (s) => chip(s.transport, s.transport === 'http' ? 'accent' : 'muted')
              },
              { label: 'Endpoint or command', cell: (s) => mono(s.endpoint ?? s.command ?? '–', 'muted') },
              {
                label: 'Secrets',
                width: '84px',
                align: 'end',
                priority: 2,
                cell: (s) => mono(s.secrets?.length ? `${s.secrets.filter((x) => x.set).length} set` : '–', 'muted')
              }
            ],
            { caption: 'MCP servers' }
          ),
          foot('By name. Secrets are counted, never shown.')
        )
      )
    } else {
      blocks.push(section('MCP', empty('The MCP daemon could not be read.', mcpRead.reason)))
    }

    blocks.push(automationSection(automation))
    return h('div', { class: 'view' }, viewHeader('mill', 'Machine', summary), blocks)
  }
}
