import { api } from '../api.ts'
import { h } from '../dom.ts'
import { name, plural } from '../format.ts'
import { glyph } from '../glyphs.ts'
import type { Context, Instrument } from '../instrument.ts'

import { type InstrumentId, remember, remembered } from '../state.ts'
import { chip, empty, foot, identity, section, viewHeader } from '../ui.ts'

const islandSwitches = new Set<string>(remembered<string[]>('extensions.islands', []))

function toggle(label: string, on: boolean, onChange: (on: boolean) => void, disabled = false): HTMLElement {
  return h(
    'button',
    {
      type: 'button',
      role: 'switch',
      class: 'switch',
      'aria-checked': String(on),
      'aria-label': label,
      disabled,
      onclick: () => onChange(!on)
    },
    h('span', { class: 'switch-track', 'aria-hidden': 'true' }, h('span', { class: 'switch-knob' })),
    h('span', { class: 'switch-state' }, on ? 'on' : 'off')
  )
}

interface ExtensionControls {
  instruments(): readonly Instrument[]
  permanent: ReadonlySet<InstrumentId>
  isEnabled(id: InstrumentId): boolean
  setEnabled(id: InstrumentId, on: boolean): void
}

export function createExtensions({
  instruments: catalogue,
  permanent,
  isEnabled,
  setEnabled
}: ExtensionControls): Instrument {
  function coreRow(instrument: Instrument, context: Context): HTMLElement {
    const fixed = permanent.has(instrument.id)
    return h(
      'li',
      { class: 'switch-row' },
      h('span', { class: 'switch-glyph' }, glyph(instrument.glyph, 16)),
      h(
        'span',
        { class: 'switch-text' },
        h('span', { class: 'ink' }, instrument.title),
        h('span', { class: 'muted' }, instrument.summary)
      ),
      chip(instrument.job, 'muted'),
      toggle(
        `${instrument.title} instrument`,
        isEnabled(instrument.id),
        (on) => {
          setEnabled(instrument.id, on)
          context.rerender()
        },
        fixed
      )
    )
  }

  return {
    id: 'extensions',
    job: 'extend',
    title: 'Extensions',
    glyph: 'workbench',
    summary: 'The switchboard: core instruments, and the extensions each island offers',
    filters: false,
    async render(context) {
      const instruments = catalogue()
      const artifacts = await api.artifacts(context.state.scope)
      const offered = artifacts.ok ? artifacts.data.artifacts : []
      return h(
        'div',
        { class: 'view' },
        viewHeader(
          'workbench',
          'Extensions',
          `${plural(instruments.length, 'core instrument')} · ${plural(offered.length, 'island extension')} offered`,
          chip('preview only', 'warn', 'Switches here are kept in this browser and change nothing in the Observatory')
        ),
        h(
          'div',
          { class: 'columns' },
          section(
            'Core instruments',
            h(
              'ul',
              { class: 'switchboard' },
              instruments.map((i) => coreRow(i, context))
            ),
            foot(
              'Switching an instrument off hides its tab in this preview, in this browser only. Beacon and Extensions stay on.'
            )
          ),
          section(
            'Island extensions',
            artifacts.ok
              ? offered.length
                ? h(
                    'ul',
                    { class: 'switchboard' },
                    offered.map((a) => {
                      const id = `${a.identity}#${a.id}`
                      return h(
                        'li',
                        { class: 'switch-row' },
                        h('span', { class: 'switch-glyph' }, glyph('workbench', 16)),
                        h(
                          'span',
                          { class: 'switch-text' },
                          h('span', { class: 'ink' }, a.title),
                          h(
                            'span',
                            { class: 'muted mono' },
                            `${name(a.identity)} · ${plural(a.tools.length, 'tool')} via ${[...new Set(a.tools.map((t) => t.server))].join(', ') || 'none'}`
                          )
                        ),
                        toggle(`${a.title} extension`, islandSwitches.has(id), (on) => {
                          if (on) islandSwitches.add(id)
                          else islandSwitches.delete(id)
                          remember('extensions.islands', [...islandSwitches])
                          context.rerender()
                        })
                      )
                    })
                  )
                : empty(
                    'No island offers an extension yet.',
                    'An island offers one by declaring a live artifact with a manifest.'
                  )
              : empty('The extensions could not be read.', artifacts.reason),
            artifacts.ok && artifacts.data.refused.length
              ? h(
                  'div',
                  { class: 'refused' },
                  h('h3', {}, 'Not offered'),
                  h(
                    'ul',
                    { class: 'plain' },
                    artifacts.data.refused.map((r) =>
                      h(
                        'li',
                        {},
                        h('span', { class: 'ink' }, r.name),
                        ' — ',
                        identity(r.identity),
                        h('span', { class: 'muted' }, ` — ${r.reason}`)
                      )
                    )
                  )
                )
              : null,
            foot(
              'Reads /api/artifacts. Turning one on here records a wish in this browser; the preview never opens or runs an artifact.'
            )
          )
        )
      )
    }
  }
}
