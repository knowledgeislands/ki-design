import {
  type Axial,
  type FlatLayout,
  type FlatTheme,
  fmt,
  hexCorners,
  hexKey,
  layoutFlat,
  type Point,
  renderFlatLayers,
  toPixel
} from '../../../../packages/hexmap/src/index.ts'
import { tokens } from '../../../../packages/tokens/src/index.ts'
import { api } from '../api.ts'
import { h, replace, s } from '../dom.ts'
import { name, owner, plural, tally, when } from '../format.ts'
import { glyph, glyphBody, glyphGroup } from '../glyphs.ts'
import type { Context, Instrument } from '../instrument.ts'
import {
  CONDITION_LABEL,
  CONDITIONS,
  type Chart,
  chart,
  edgeCorners,
  type Island,
  islandMap,
  type Lane,
  lanesOf,
  outline,
  ROLE_LABEL,
  ROLES
} from '../lands-model.ts'
import { effectiveTheme } from '../theme.ts'
import type { Severity } from '../types.ts'
import { chip, empty, foot, viewHeader } from '../ui.ts'

const SIZE = 32 // hex circumradius in chart units

/** The island to give focus back to once a keyboard choice has redrawn the chart. */
let pendingFocus: string | null = null

/** How far each condition fades an island towards the paper: condition as fill strength (docs/spec/meaning.md). */
export const CONDITION_VEIL: Record<Island['condition'], number> = {
  thriving: 0,
  quiet: 0.22,
  weathered: 0.42,
  ruined: 0.6
}

const fontStack = (families: readonly string[]): string =>
  families.map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', ')

const pointsOf = (h: Axial, size = SIZE): string =>
  hexCorners(h, size)
    .map((p) => `${fmt(p.x)},${fmt(p.y)}`)
    .join(' ')

function edgePath(edges: [Axial, number][]): string {
  return edges
    .map(([hx, d]) => {
      const c = hexCorners(hx, SIZE)
      const [i, j] = edgeCorners(d)
      const a = c[i] as Point
      const b = c[j] as Point
      return `M${fmt(a.x)} ${fmt(a.y)}L${fmt(b.x)} ${fmt(b.y)}`
    })
    .join('')
}

const centreOf = (island: Island): Point => {
  const points = island.hexes.map((hx) => toPixel(hx, SIZE))
  return {
    x: points.reduce((a, p) => a + p.x, 0) / points.length,
    y: points.reduce((a, p) => a + p.y, 0) / points.length
  }
}

const describe = (island: Island, territory: string): string => {
  const marks = [
    island.signals.blocking ? plural(island.signals.blocking, 'blocking signal') : '',
    island.signals.attention ? `${plural(island.signals.attention, 'signal')} for attention` : ''
  ].filter(Boolean)
  return `${island.identity} — ${ROLE_LABEL[island.role]} in ${territory}, ${island.condition}${
    island.latest ? `, last commit ${when(island.latest)}` : ''
  }${marks.length ? `; ${marks.join(', ')}` : ''}`
}

const ARROWS: Record<string, Point> = {
  ArrowRight: { x: 1, y: 0 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowDown: { x: 0, y: 1 },
  ArrowUp: { x: 0, y: -1 }
}

/** The nearest island lying roughly in the arrow's direction. */
export function nearestToward(from: Point, direction: Point, others: { at: Point; index: number }[]): number | null {
  let best: { index: number; score: number } | null = null
  for (const o of others) {
    const dx = o.at.x - from.x
    const dy = o.at.y - from.y
    const along = dx * direction.x + dy * direction.y
    const across = Math.abs(dx * direction.y - dy * direction.x)
    if (along <= 1 || across > along * 1.6) continue
    const score = Math.hypot(dx, dy) + across
    if (!best || score < best.score) best = { index: o.index, score }
  }
  return best?.index ?? null
}

/** The lane colour for the chart's theme (docs/spec/colour.md `--lane`). */
const laneColour = (theme: FlatTheme): string => tokens.sea[theme === 'day' ? 'light' : 'night'].lane

interface DrawOptions {
  theme: FlatTheme
  /** A territory to keep bright while the others dim. */
  highlight: string | null
  /** The repository the shell is filtered to, if any. */
  filtered: string | null
  lanes: readonly Lane[]
  onFocus: (island: Island, territory: string) => void
  onChoose: (identity: string) => void
  onClear: () => void
}

/**
 * `<ki-known-lands>`: the chart. `@knowledgeislands/hexmap` draws the map (sea, shallows, land, terrain patterns,
 * coast, trade lanes, structures, halo labels, selected ring); this element lays territory waters under the land and
 * an interactive layer of islands over it. Islands are a roving-tabindex group: arrows move between neighbours,
 * Home goes to the territory's capital, Enter or Space filters the shell to that repository, Escape clears it.
 */
interface Placed {
  island: Island
  at: Point
  node: SVGGElement
  territory: string
}

class KnownLands extends HTMLElement {
  #islands: Placed[] = []
  #options: DrawOptions | null = null
  layout: FlatLayout | null = null

  draw(model: Chart, options: DrawOptions): void {
    this.#options = options
    const chosen = model.islands.find((i) => i.identity === options.filtered)
    const layout = layoutFlat(islandMap(model, options.lanes), {
      size: SIZE,
      theme: options.theme,
      glyph: glyphBody,
      labelFont: fontStack(tokens.fonts.mono),
      highlight: laneColour(options.theme),
      structureName: (id) => ROLE_LABEL[id as Island['role']] ?? id,
      ...(chosen ? { selected: chosen.hexes[0] as Axial } : {})
    })
    this.layout = layout
    const svg = s('svg', {
      class: `chart theme-${options.theme}`,
      viewBox: layout.viewBox,
      role: 'group',
      'aria-label': `Map of Known Lands: ${plural(model.territories.length, 'territory', 'territories')}, ${plural(model.islands.length, 'island')}${options.lanes.length ? `, ${plural(options.lanes.length, 'trade route')}` : ''}`
    })
    // The package's own markup, generated from data we built; no viewer text reaches it unescaped.
    svg.innerHTML = renderFlatLayers(layout)

    // Territory waters: a tint and a dashed border in the sea, under the shallows and the land.
    const land = new Set(model.islands.flatMap((i) => i.hexes.map(hexKey)))
    const waters = s('g', { class: 'territories' })
    for (const t of model.territories) {
      if (t.islands.length === 0) continue
      const dim = options.highlight && options.highlight !== t.id ? ' dim' : ''
      waters.append(
        s(
          'g',
          { class: `territory tone-${t.tone}${dim}`, 'data-territory': t.id },
          t.waters
            .filter((hx) => !land.has(hexKey(hx)))
            .map((hx) => s('polygon', { class: 'waters', points: pointsOf(hx) })),
          s('path', { class: 'border', d: edgePath(outline(t.waters)) })
        )
      )
    }
    svg.insertBefore(waters, svg.querySelector('.ki-shallows') ?? svg.querySelector('.ki-land'))

    // A small vessel at the middle of each lane: a brass sea lane with sailing vessels (docs/spec/meaning.md).
    const vessels = s('g', { class: 'lane-vessels', 'aria-hidden': 'true' })
    for (const { d } of layout.routes) {
      const m = /^M(-?[\d.]+) (-?[\d.]+) Q(-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+)$/.exec(d)
      if (!m) continue
      const [ax, ay, cx, cy, bx, by] = m.slice(1).map(Number) as [number, number, number, number, number, number]
      const x = (ax + 2 * cx + bx) / 4
      const y = (ay + 2 * cy + by) / 4
      vessels.append(
        s('circle', { cx: fmt(x), cy: fmt(y), r: fmt(SIZE * 0.26) }),
        glyphGroup('vessel', x, y, SIZE * 0.38, 'lane-vessel')
      )
    }
    svg.querySelector('.ki-routes')?.after(vessels)

    // The interactive layer: one focusable group per island, over the drawing.
    const layer = s('g', { class: 'islands' })
    this.#islands = []
    for (const t of model.territories) {
      const dim = options.highlight && options.highlight !== t.id
      for (const island of t.islands) {
        const at = centreOf(island)
        const anchor = toPixel(island.hexes[0] as Axial, SIZE)
        const mark = island.signals.blocking ? 'reef' : island.signals.attention ? 'lantern' : null
        const veil = CONDITION_VEIL[island.condition] + (dim ? 0.45 : 0)
        const ring = edgePath(outline(island.hexes))
        const node = s(
          'g',
          {
            class: `island cond-${island.condition} role-${island.role}${island.identity === options.filtered ? ' chosen' : ''}${dim ? ' dim' : ''}`,
            tabindex: -1,
            role: 'button',
            'aria-label': describe(island, t.label),
            'data-identity': island.identity
          },
          s('title', {}, describe(island, t.label)),
          island.hexes.map((hx) =>
            s('polygon', {
              class: 'veil',
              points: pointsOf(hx),
              'fill-opacity': String(Math.min(veil, 0.8))
            })
          ),
          s('path', { class: 'ring-paper', d: ring }),
          s('path', { class: 'ring', d: ring }),
          mark
            ? s(
                'g',
                { class: `marker marker-${mark}` },
                s('circle', { cx: fmt(anchor.x + SIZE * 0.56), cy: fmt(anchor.y - SIZE * 0.5), r: fmt(SIZE * 0.3) }),
                glyphGroup(mark, anchor.x + SIZE * 0.56, anchor.y - SIZE * 0.5, SIZE * 0.4)
              )
            : null
        )
        this.#islands.push({ island, at, node, territory: t.label })
        layer.append(node)
      }
    }
    svg.append(layer)

    const wanted = pendingFocus ?? options.filtered
    const first = this.#islands.findIndex((i) => i.island.identity === wanted)
    const start = this.#islands[first >= 0 ? first : 0]
    if (start) start.node.setAttribute('tabindex', '0')
    if (pendingFocus && start) {
      pendingFocus = null
      // The shell attaches the view after this returns; focus once it is in the document.
      requestAnimationFrame(() => start.node.focus())
    }

    svg.addEventListener('keydown', (event) => this.#key(event))
    svg.addEventListener('focusin', (event) => this.#focus(event.target))
    svg.addEventListener('mouseover', (event) => this.#focus(event.target))
    svg.addEventListener('click', (event) => {
      const found = this.#find(event.target)
      if (found) this.#options?.onChoose(found.island.identity)
    })
    replace(this, svg)
  }

  #find(target: EventTarget | null) {
    const node = target instanceof Element ? target.closest('.island') : null
    return node ? this.#islands.find((i) => i.node === node) : undefined
  }

  #focus(target: EventTarget | null): void {
    const found = this.#find(target)
    if (found) this.#options?.onFocus(found.island, found.territory)
  }

  #move(from: Placed, to: Placed | undefined): void {
    if (!to || to === from) return
    from.node.setAttribute('tabindex', '-1')
    to.node.setAttribute('tabindex', '0')
    to.node.focus()
  }

  #key(event: KeyboardEvent): void {
    const current = this.#find(event.target)
    if (!current) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      pendingFocus = current.island.identity
      this.#options?.onChoose(current.island.identity)
      return
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      if (!this.#options?.filtered) return
      pendingFocus = current.island.identity
      this.#options.onClear()
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      const territory = current.island.territory
      this.#move(
        current,
        this.#islands.find((i) => i.island.territory === territory && i.island.role === 'citadel') ??
          this.#islands.find((i) => i.island.territory === territory)
      )
      return
    }
    const direction = ARROWS[event.key]
    if (!direction) return
    event.preventDefault()
    const next = nearestToward(
      current.at,
      direction,
      this.#islands.map((i, index) => ({ at: i.at, index })).filter((o) => this.#islands[o.index] !== current)
    )
    this.#move(current, next === null ? undefined : this.#islands[next])
  }
}

if (!customElements.get('ki-known-lands')) customElements.define('ki-known-lands', KnownLands)

/** A tiny hex swatch: a terrain fill, optionally faded towards the paper by a condition. */
function hexSwatch(fill: string, paper: string, veil = 0, extra: Element[] = []): SVGSVGElement {
  const pts = hexCorners({ q: 0, r: 0 }, 7.4)
    .map((p) => `${fmt(p.x + 8)},${fmt(p.y + 8)}`)
    .join(' ')
  return s(
    'svg',
    { class: 'key-hex', width: 16, height: 16, viewBox: '0 0 16 16', 'aria-hidden': 'true' },
    s('polygon', { points: pts, fill, stroke: 'currentColor', 'stroke-opacity': '0.4', 'stroke-width': '0.8' }),
    veil ? s('polygon', { points: pts, fill: paper, 'fill-opacity': String(veil) }) : null,
    extra
  )
}

function laneSample(colour: string, dashed: boolean): SVGSVGElement {
  return s(
    'svg',
    { class: 'key-lane', width: 28, height: 12, viewBox: '0 0 28 12', 'aria-hidden': 'true' },
    s('path', {
      d: 'M2 9Q14 1 26 9',
      fill: 'none',
      stroke: colour,
      'stroke-width': 2,
      'stroke-linecap': 'round',
      'stroke-dasharray': dashed ? '3.5 4.5' : null
    })
  )
}

/** The legend, in DESIGN's symbols: structures by role, terrain, condition, signals, lanes, territory, selection. */
function key(layout: FlatLayout, hasLanes: boolean): HTMLElement {
  const fillOf = (terrain: string): string =>
    layout.hexes.find((hx) => hx.hex.terrain === terrain)?.fill ?? layout.colours.paper
  const grass = fillOf('grassland')
  const paper = layout.colours.paper
  const lane = layout.colours.highlight
  const section = (title: string, ...items: HTMLElement[]) =>
    h('li', { class: 'key-group' }, h('span', { class: 'key-heading' }, title), h('ul', {}, items))
  const item = (mark: Element, text: string) => h('li', {}, mark, h('span', {}, text))
  return h(
    'div',
    { class: 'chart-key' },
    h('h2', {}, 'Key'),
    h(
      'ul',
      { class: 'key-list' },
      section(
        'Islands',
        ...ROLES.map((r) => item(h('span', { class: 'key-roundel' }, glyph(r, 14)), ROLE_LABEL[r])),
        item(hexSwatch(fillOf('hills'), paper), 'hills — a capital stands high'),
        item(hexSwatch(grass, paper), 'grassland — every other island')
      ),
      section('Condition', ...CONDITIONS.map((c) => item(hexSwatch(grass, paper, CONDITION_VEIL[c]), CONDITION_LABEL[c]))),
      section(
        'Signals',
        item(h('span', { class: 'key-mark marker-lantern' }, glyph('lantern', 14)), 'lantern — signals for attention'),
        item(h('span', { class: 'key-mark marker-reef' }, glyph('reef', 14)), 'reef — a blocking signal')
      ),
      section(
        'Sea',
        item(laneSample(lane, false), hasLanes ? 'trade route — active' : 'trade route — active (none declared)'),
        item(laneSample(lane, true), 'trade route — awaiting reciprocity'),
        item(h('span', { class: 'swatch-territory tone-0', 'aria-hidden': 'true' }), 'territory — an archipelago'),
        item(
          hexSwatch('none', paper, 0, [
            s('polygon', {
              points: hexCorners({ q: 0, r: 0 }, 6)
                .map((p) => `${fmt(p.x + 8)},${fmt(p.y + 8)}`)
                .join(' '),
              fill: 'none',
              stroke: lane,
              'stroke-width': 1.6
            })
          ]),
          'the island the instruments are filtered to'
        )
      )
    )
  )
}

/** With no island in hand: the islands that most want a visit, reefs before lanterns. */
function watchList(model: Chart, context: Context): HTMLElement {
  const marked = model.islands
    .filter((i) => i.signals.blocking || i.signals.attention)
    .sort(
      (a, b) =>
        b.signals.blocking - a.signals.blocking ||
        b.signals.attention - a.signals.attention ||
        a.identity.localeCompare(b.identity)
    )
    .slice(0, 7)
  return h(
    'div',
    { class: 'bearing' },
    h('h2', {}, 'Bearing'),
    h(
      'p',
      { class: 'muted' },
      'Hover or focus an island to take its bearing; arrow keys move between neighbours, Home to the capital, Enter filters to it.'
    ),
    marked.length
      ? h(
          'ul',
          { class: 'watch' },
          marked.map((i) =>
            h(
              'li',
              {},
              h(
                'span',
                { class: `key-mark ${i.signals.blocking ? 'marker-reef' : 'marker-lantern'}` },
                glyph(i.signals.blocking ? 'reef' : 'lantern', 14)
              ),
              h(
                'button',
                {
                  type: 'button',
                  class: 'link-button mono',
                  onclick: () => context.store.set({ repository: i.identity })
                },
                name(i.identity)
              ),
              h('span', { class: 'count mono' }, String(i.signals.blocking + i.signals.attention))
            )
          )
        )
      : h('p', { class: 'muted' }, 'No reef or lantern anywhere on the chart.')
  )
}

function bearing(island: Island, territory: string, context: Context): HTMLElement {
  const chosen = context.state.repository === island.identity
  return h(
    'div',
    { class: 'bearing' },
    h('h2', {}, 'Bearing'),
    h('p', { class: 'bearing-name' }, glyph(island.role, 16), h('span', { class: 'mono' }, name(island.identity))),
    h(
      'dl',
      { class: 'facts' },
      h('dt', {}, 'Owner'),
      h('dd', { class: 'mono' }, owner(island.identity)),
      h('dt', {}, 'Territory'),
      h('dd', {}, territory),
      h('dt', {}, 'Role'),
      h('dd', {}, ROLE_LABEL[island.role]),
      h('dt', {}, 'Condition'),
      h('dd', {}, island.condition),
      h('dt', {}, 'Last commit'),
      h('dd', { class: 'mono' }, when(island.latest)),
      h('dt', {}, 'Signals'),
      h(
        'dd',
        {},
        (['blocking', 'attention', 'note'] as Severity[])
          .filter((sev) => island.signals[sev])
          .map((sev) =>
            chip(`${island.signals[sev]} ${sev}`, sev === 'blocking' ? 'bad' : sev === 'attention' ? 'warn' : 'muted')
          ),
        island.signals.blocking + island.signals.attention + island.signals.note
          ? null
          : h('span', { class: 'muted' }, 'none')
      )
    ),
    h(
      'button',
      {
        type: 'button',
        class: 'action',
        onclick: () => context.store.set({ repository: chosen ? null : island.identity })
      },
      chosen ? 'Clear the filter' : 'Filter the instruments to this island'
    )
  )
}

/** The routes as text: the chart's text equivalent for its lanes (docs/spec/maps.md). */
function routeList(lanes: readonly Lane[], incomplete: boolean, context: Context): HTMLElement | null {
  if (lanes.length === 0) return null
  const pick = (identity: string) =>
    h(
      'button',
      { type: 'button', class: 'link-button mono', onclick: () => context.store.set({ repository: identity }) },
      name(identity)
    )
  return h(
    'div',
    { class: 'route-list' },
    h('h2', {}, 'Trade routes'),
    h(
      'ul',
      {},
      lanes.map((lane) =>
        h(
          'li',
          { class: `lane-${lane.status}` },
          pick(lane.from),
          h('span', { class: 'muted', 'aria-hidden': 'true' }, lane.status === 'active' ? ' ⇄ ' : ' ⇢ '),
          pick(lane.to),
          h(
            'span',
            { class: 'count' },
            chip(`${lane.kind}${lane.status === 'awaiting' ? ', awaiting' : ''}`, lane.status === 'active' ? 'warn' : 'muted')
          )
        )
      )
    ),
    incomplete ? h('p', { class: 'muted' }, 'The route report is incomplete.') : null
  )
}

export const lands: Instrument = {
  id: 'lands',
  job: 'observe',
  title: 'Known Lands',
  glyph: 'known-lands',
  summary: 'The chart: territories as archipelagos, repositories as islands, condition by evidence, trade routes',
  filters: false,
  async render(context) {
    const [landsRead, reposRead, activityRead, beaconRead, routesRead] = await Promise.all([
      api.lands(),
      api.repositories('estate'),
      api.activity('estate', 30),
      api.beacon('estate'),
      api.tradeRoutes('estate')
    ])
    const header = (summary: string) => viewHeader('known-lands', 'Known Lands', summary)
    if (!landsRead.ok)
      return h(
        'div',
        { class: 'view' },
        header('Uncharted'),
        empty('The territories could not be read.', landsRead.reason)
      )

    const latest = new Map<string, string | null>()
    if (reposRead.ok) for (const r of reposRead.data.repositories) latest.set(r.identity, r.head?.committedAt ?? null)
    if (activityRead.ok) for (const r of activityRead.data.repositories) if (r.latest) latest.set(r.identity, r.latest)
    const signals = new Map<string, Record<Severity, number>>()
    if (beaconRead.ok) {
      for (const sig of beaconRead.data.signals) {
        if (!sig.repository) continue
        const counts = signals.get(sig.repository) ?? { blocking: 0, attention: 0, note: 0 }
        counts[sig.severity] += 1
        signals.set(sig.repository, counts)
      }
    }
    const observedAt = activityRead.ok ? activityRead.data.observedAt : landsRead.data.observedAt
    const model = chart({
      territories: landsRead.data.territories,
      repositories: reposRead.ok ? reposRead.data.repositories.map((r) => r.identity) : [],
      latest,
      signals,
      now: Date.parse(observedAt) || Date.now()
    })
    const lanes =
      routesRead.ok && Array.isArray(routesRead.data.routes)
        ? lanesOf(routesRead.data.routes, new Set(model.islands.map((i) => i.identity)))
        : []

    const highlight =
      context.scopes.find((sc) => sc.id === context.state.scope)?.kind === 'territory' ? context.state.scope : null
    const side = h('aside', { class: 'chart-side' })
    const bearingSlot = h('div', {}, watchList(model, context))
    const element = document.createElement('ki-known-lands') as KnownLands
    element.draw(model, {
      theme: effectiveTheme() === 'night' ? 'night' : 'day',
      highlight,
      filtered: context.state.repository,
      lanes,
      onFocus: (island, territory) => replace(bearingSlot, bearing(island, territory, context)),
      onChoose: (identity) => context.store.set({ repository: context.state.repository === identity ? null : identity }),
      onClear: () => context.store.set({ repository: null })
    })
    const chosen = model.islands.find((i) => i.identity === context.state.repository)
    if (chosen) {
      const t = model.territories.find((tt) => tt.id === chosen.territory)
      replace(bearingSlot, bearing(chosen, t?.label ?? '', context))
    }

    const uncharted = model.territories.filter((t) => t.islands.length === 0)
    side.append(
      bearingSlot,
      h(
        'div',
        { class: 'territory-list' },
        h('h2', {}, 'Territories'),
        h(
          'ul',
          {},
          model.territories.map((t) =>
            h(
              'li',
              { class: `tone-${t.tone}` },
              h('span', { class: 'swatch-territory', 'aria-hidden': 'true' }),
              t.id.startsWith('territory:')
                ? h(
                    'button',
                    {
                      type: 'button',
                      class: 'link-button',
                      'aria-pressed': String(context.state.scope === t.id),
                      title: `Set the scope to ${t.label}`,
                      onclick: () => context.store.set({ scope: context.state.scope === t.id ? 'estate' : t.id })
                    },
                    t.label
                  )
                : h('span', {}, t.label),
              h('span', { class: 'count mono' }, t.islands.length ? String(t.islands.length) : 'uncharted')
            )
          )
        )
      ),
      routeList(lanes, routesRead.ok && routesRead.data.incomplete, context) ?? '',
      element.layout ? key(element.layout, lanes.length > 0) : ''
    )

    const condCounts = tally(model.islands, (i) => i.condition)
    return h(
      'div',
      { class: 'view view-lands' },
      header(
        `${plural(model.islands.length, 'island')} in ${plural(model.territories.length - uncharted.length, 'territory', 'territories')} — ${CONDITIONS.map((c) => `${condCounts[c] ?? 0} ${c}`).join(' · ')}${lanes.length ? ` — ${plural(lanes.length, 'trade route')}` : ''}`
      ),
      h('div', { class: 'chart-layout' }, h('div', { class: 'chart-frame' }, element), side),
      foot(
        'Territories are sorted by name and set outward along a spiral; within each, the capital is placed first and the rest by name. ',
        `Condition is the age of the latest commit at ${when(observedAt)}. `,
        routesRead.ok
          ? lanes.length
            ? 'Trade routes come from the estate’s route report: solid when active, dashed while awaiting reciprocity. '
            : 'No trade route between charted islands. '
          : h('span', { class: 'unobserved' }, `Trade routes are unobserved: ${routesRead.reason}. `),
        uncharted.length
          ? h(
              'span',
              { class: 'unobserved' },
              uncharted.map((t) => `${t.label} is uncharted: ${t.reason ?? 'no repositories listed'}. `)
            )
          : null
      )
    )
  }
}
