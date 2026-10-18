/**
 * `<ki-observatory>`: the shell. A top bar (mark, scope, job switch, observed time, workers),
 * the selected job's instruments as text tabs, an optional repository filter, then the view.
 */
import { api, refresh } from './api.ts'
import { h, replace } from './dom.ts'
import { name, plural, when } from './format.ts'
import { glyph } from './glyphs.ts'
import type { Context } from './instrument.ts'
import { byId, instrumentsFor, JOB_LABEL } from './registry.ts'
import { type InstrumentId, JOBS, type Job, remember, remembered, Store } from './state.ts'
import { applyTheme, effectiveTheme, onSystemTheme, type Theme } from './theme.ts'
import type { Scope } from './types.ts'
import { activeRuns } from './views/workers.ts'

class Observatory extends HTMLElement {
  readonly #store = new Store()
  #scopes: Scope[] = []
  #lastByJob = new Map<Job, InstrumentId>()
  #renderToken = 0
  #bar = h('header', { class: 'bar' })
  #tabs = h('nav', { class: 'tabs', 'aria-label': 'Instruments' })
  #filter = h('div', { class: 'filterbar', hidden: true })
  #main = h('main', { class: 'main', id: 'view', tabindex: -1 })

  connectedCallback(): void {
    applyTheme(remembered<Theme | null>('theme', null))
    // The chart is drawn per theme (night or day), so a system change redraws the bar and the view.
    onSystemTheme(() => {
      if (document.documentElement.dataset['theme']) return
      this.#drawBar()
      void this.#drawView(false)
    })
    this.replaceChildren(this.#bar, this.#tabs, this.#filter, this.#main)
    this.#store.subscribe((state, previous) => {
      if (state.scope !== previous.scope) this.#drawBar()
      this.#drawTabs()
      this.#drawFilter()
      void this.#drawView(state.instrument !== previous.instrument)
    })
    void this.#start()
  }

  async #start(): Promise<void> {
    const scopes = await api.scopes()
    this.#scopes = scopes.ok
      ? scopes.data.options
      : [{ id: 'estate', kind: 'estate', label: 'registered estate', repositories: null }]
    this.#drawBar()
    this.#drawTabs()
    this.#drawFilter()
    await this.#drawView(false)
  }

  get #context(): Context {
    return {
      state: this.#store.state,
      store: this.#store,
      scopes: this.#scopes,
      rerender: () => void this.#drawView(false)
    }
  }

  #drawBar(): void {
    const { state } = this.#store
    const job = byId(state.instrument).job
    const select = h(
      'select',
      {
        id: 'scope',
        onchange: (event: Event) => this.#store.set({ scope: (event.target as HTMLSelectElement).value })
      },
      this.#groupedScopes()
    )
    select.value = state.scope

    const observed = h('span', { class: 'observed mono', title: 'When the Beacon last observed this scope' }, '…')
    const workersChip = h('span', { class: 'workers' }, glyph('vessel', 14), h('span', {}, '…'))
    const mode = h('span', { class: 'mode', hidden: true })
    const theme = effectiveTheme()

    replace(
      this.#bar,
      h(
        'div',
        { class: 'brand' },
        h('span', { class: 'compass' }, glyph('compass', 22)),
        h('span', { class: 'brand-realm' }, 'Knowledge Islands'),
        h('span', { class: 'brand-rule', 'aria-hidden': 'true' }),
        h('span', { class: 'brand-product' }, 'Observatory'),
        h(
          'span',
          { class: 'brand-alt', title: 'The Tower — a name under consideration' },
          glyph('tower', 13),
          h('span', {}, 'Tower')
        )
      ),
      h('label', { class: 'scope', for: 'scope' }, h('span', { class: 'scope-label' }, 'Scope'), select),
      h(
        'nav',
        { class: 'jobs', 'aria-label': 'Job' },
        JOBS.map((j, i) => [
          i ? h('span', { class: 'job-sep', 'aria-hidden': 'true' }, '·') : null,
          h(
            'button',
            {
              type: 'button',
              class: 'job',
              'aria-current': j === job ? 'true' : null,
              onclick: () => this.#switchJob(j)
            },
            JOB_LABEL[j]
          )
        ])
      ),
      h(
        'div',
        { class: 'status' },
        mode,
        h('span', { class: 'observed-wrap' }, h('span', { class: 'status-label' }, 'observed '), observed),
        workersChip,
        h(
          'button',
          {
            type: 'button',
            class: 'icon-button',
            'aria-label': 'Read again',
            title: 'Read again',
            onclick: () => {
              refresh()
              this.#drawBar()
              void this.#drawView(false)
            }
          },
          glyph('refresh', 16)
        ),
        h(
          'button',
          {
            type: 'button',
            class: 'icon-button',
            'aria-label': theme === 'night' ? 'Use the light chart' : 'Use the chart at night',
            title: theme === 'night' ? 'Light' : 'Night',
            onclick: () => {
              const next: Theme = effectiveTheme() === 'night' ? 'light' : 'night'
              applyTheme(next)
              remember('theme', next)
              this.#drawBar()
              void this.#drawView(false)
            }
          },
          glyph('theme', 16)
        )
      )
    )

    void api.meta().then((meta) => {
      if (meta.ok && meta.data.mode === 'fixtures') {
        mode.hidden = false
        replace(
          mode,
          h('span', { class: 'chip tone-warn', title: 'Serving saved fixtures, not the live Observatory' }, 'fixtures')
        )
      }
    })
    void api.beacon(state.scope).then((read) => {
      observed.textContent = read.ok ? when(read.data.observedAt) : 'unobserved'
    })
    void api.sessions('estate').then((read) => {
      const n = read.ok ? activeRuns(read.data.runs) : 0
      workersChip.title = read.ok ? `${plural(n, 'agent run')} at work on this machine` : read.reason
      workersChip.classList.toggle('active', n > 0)
      replace(
        workersChip,
        glyph('vessel', 14),
        h('span', { class: 'mono' }, read.ok ? String(n) : '–'),
        h('span', { class: 'workers-label' }, n === 1 ? ' worker' : ' workers')
      )
    })
  }

  #groupedScopes(): HTMLElement[] {
    const option = (s: Scope) => h('option', { value: s.id }, s.kind === 'repository' ? name(s.label) : s.label)
    const territories = this.#scopes.filter((s) => s.kind === 'territory')
    const others = this.#scopes.filter((s) => s.kind !== 'territory')
    const groups: HTMLElement[] = others.map(option)
    if (territories.length) groups.push(h('optgroup', { label: 'Territories' }, territories.map(option)))
    return groups
  }

  #switchJob(job: Job): void {
    const choices = instrumentsFor(job)
    const remembered = this.#lastByJob.get(job)
    const next = choices.find((i) => i.id === remembered) ?? choices[0]
    if (next) this.#store.set({ instrument: next.id })
  }

  #drawTabs(): void {
    const current = byId(this.#store.state.instrument)
    this.#lastByJob.set(current.job, current.id)
    replace(
      this.#tabs,
      instrumentsFor(current.job).map((i) =>
        h(
          'button',
          {
            type: 'button',
            class: 'tab',
            'aria-current': i.id === current.id ? 'page' : null,
            title: i.summary,
            onclick: () => this.#store.set({ instrument: i.id })
          },
          glyph(i.glyph, 14),
          h('span', {}, i.title)
        )
      )
    )
    // Re-draw the job switch so its current mark follows the instrument.
    for (const button of this.#bar.querySelectorAll<HTMLButtonElement>('.job')) {
      const isCurrent = button.textContent === JOB_LABEL[current.job]
      if (isCurrent) button.setAttribute('aria-current', 'true')
      else button.removeAttribute('aria-current')
    }
  }

  #drawFilter(): void {
    const { repository, instrument } = this.#store.state
    this.#filter.hidden = !repository
    if (!repository) return
    const applies = byId(instrument).filters || instrument === 'lands'
    replace(
      this.#filter,
      h(
        'span',
        { class: 'filter-chip' },
        h('span', { class: 'muted' }, 'filtered to '),
        h('span', { class: 'mono ink' }, repository),
        h(
          'button',
          {
            type: 'button',
            class: 'icon-button small',
            'aria-label': `Clear the filter on ${repository}`,
            onclick: () => this.#store.set({ repository: null })
          },
          glyph('close', 12)
        )
      ),
      applies ? null : h('span', { class: 'muted note' }, ` ${byId(instrument).title} is not narrowed by a repository.`)
    )
  }

  async #drawView(moveFocus: boolean): Promise<void> {
    const token = ++this.#renderToken
    const instrument = byId(this.#store.state.instrument)
    document.title = `${instrument.title} · Observatory preview`
    this.#main.setAttribute('aria-busy', 'true')
    const view = await instrument.render(this.#context)
    if (token !== this.#renderToken) return
    replace(this.#main, view)
    this.#main.removeAttribute('aria-busy')
    if (moveFocus) this.#main.focus({ preventScroll: true })
  }
}

customElements.define('ki-observatory', Observatory)
