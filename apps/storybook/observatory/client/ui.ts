import { type Child, h } from './dom.ts'
import { name, owner } from './format.ts'
import { type GlyphName, glyph } from './glyphs.ts'

export type Tone = 'ok' | 'teal' | 'warn' | 'bad' | 'accent' | 'muted'

/** A small-caps label on its tone's wash. */
export const chip = (label: string, tone: Tone = 'muted', title?: string): HTMLElement =>
  h('span', { class: `chip tone-${tone}`, title: title ?? null }, label)

export const severityTone = { blocking: 'bad', attention: 'warn', note: 'muted' } as const satisfies Record<
  string,
  Tone
>

export const mono = (text: Child, className = ''): HTMLElement => h('span', { class: `mono ${className}`.trim() }, text)

/** `owner/` muted, `name` in ink. */
export const identity = (value: string | null): HTMLElement =>
  value
    ? h(
        'span',
        { class: 'identity mono', title: value },
        h('span', { class: 'owner' }, `${owner(value)}/`),
        name(value)
      )
    : h('span', { class: 'muted' }, '–')

export interface Column<T> {
  label: string
  cell: (row: T) => Child
  /** A CSS width for the column; one column should be left flexible. */
  width?: string
  /** 1 always shows; 2 drops below 1100 px; 3 drops below 880 px. */
  priority?: 1 | 2 | 3
  align?: 'end'
  className?: string
}

export interface TableOptions<T> {
  caption: string
  group?: (row: T) => string
  groupLabel?: (group: string, rows: T[]) => Child
  rowClass?: (row: T) => string
  rowTitle?: (row: T) => string
}

function cellClass<T>(column: Column<T>): string {
  return [
    column.className,
    column.priority && column.priority > 1 ? `p${column.priority}` : '',
    column.align === 'end' ? 'end' : ''
  ]
    .filter(Boolean)
    .join(' ')
}

/** A dense table. Groups become labelled bodies; low-priority columns drop as the view narrows. */
export function table<T>(rows: T[], columns: Column<T>[], options: TableOptions<T>): HTMLTableElement {
  const head = h(
    'thead',
    {},
    h(
      'tr',
      {},
      columns.map((c) =>
        h('th', { scope: 'col', class: cellClass(c), style: c.width ? `width:${c.width}` : null }, c.label)
      )
    )
  )
  const row = (r: T) =>
    h(
      'tr',
      { class: options.rowClass?.(r) ?? null, title: options.rowTitle?.(r) ?? null },
      columns.map((c) => h('td', { class: cellClass(c) }, c.cell(r)))
    )
  const bodies: HTMLTableSectionElement[] = []
  if (options.group) {
    const groups = new Map<string, T[]>()
    for (const r of rows) {
      const g = options.group(r)
      groups.set(g, [...(groups.get(g) ?? []), r])
    }
    for (const [g, members] of groups) {
      bodies.push(
        h(
          'tbody',
          {},
          h(
            'tr',
            { class: 'group' },
            h('th', { scope: 'rowgroup', colspan: columns.length }, options.groupLabel?.(g, members) ?? g)
          ),
          members.map(row)
        )
      )
    }
  } else {
    bodies.push(h('tbody', {}, rows.map(row)))
  }
  return h('table', { class: 'grid' }, h('caption', { class: 'visually-hidden' }, options.caption), head, bodies)
}

export const groupLabel = (label: Child, count: number): HTMLElement =>
  h('span', { class: 'group-label' }, label, h('span', { class: 'count' }, String(count)))

/** The heading strip at the top of every instrument. */
export function viewHeader(icon: GlyphName, title: string, summary: Child, ...controls: Child[]): HTMLElement {
  return h(
    'header',
    { class: 'view-head' },
    h('div', { class: 'view-title' }, glyph(icon, 18), h('h1', {}, title), h('p', { class: 'view-summary' }, summary)),
    controls.length ? h('div', { class: 'view-controls' }, controls) : null
  )
}

export const section = (title: string, ...children: Child[]): HTMLElement =>
  h('section', { class: 'panel' }, h('h2', {}, title), children)

/** The note under each table that says how it is ordered and where it came from. */
export const foot = (...text: Child[]): HTMLElement => h('p', { class: 'foot' }, text)

/** An empty or unobserved state that says why. */
export const empty = (headline: string, reason?: string | null): HTMLElement =>
  h(
    'div',
    { class: 'empty' },
    h('p', { class: 'empty-head' }, headline),
    reason ? h('p', { class: 'empty-why' }, reason) : null
  )

export interface Choice<V extends string> {
  value: V
  label: string
}

/** A row of mutually exclusive buttons (a radio group in buttons' clothing). */
export function segmented<V extends string>(
  label: string,
  choices: Choice<V>[],
  current: V,
  onChange: (value: V) => void
): HTMLElement {
  return h(
    'div',
    { class: 'segmented', role: 'group', 'aria-label': label },
    h('span', { class: 'segmented-label' }, label),
    choices.map((c) =>
      h(
        'button',
        {
          type: 'button',
          'aria-pressed': String(c.value === current),
          onclick: () => onChange(c.value)
        },
        c.label
      )
    )
  )
}

/** Toggleable filter chips; an empty selection means everything. */
export function filterChips(
  label: string,
  values: { value: string; label: string; count: number; tone?: Tone }[],
  selected: Set<string>,
  onToggle: (value: string) => void
): HTMLElement {
  return h(
    'div',
    { class: 'filters', role: 'group', 'aria-label': label },
    values.map((v) =>
      h(
        'button',
        {
          type: 'button',
          class: `filter tone-${v.tone ?? 'muted'}`,
          'aria-pressed': String(selected.has(v.value)),
          onclick: () => onToggle(v.value)
        },
        v.label,
        h('span', { class: 'count' }, String(v.count))
      )
    )
  )
}

export const OBSERVATORY = 'http://127.0.0.1:1675'

export interface OperationShown {
  title: string
  tier: string
  summary: string
  command?: string
  count?: number
}

/** An operation, shown but never run here: an inert button, what it would do, and where to run it. */
export function operationRow(op: OperationShown, view: string): HTMLLIElement {
  return h(
    'li',
    {},
    h(
      'button',
      {
        type: 'button',
        class: 'inert',
        disabled: true,
        'aria-disabled': 'true',
        title: 'The preview never runs anything'
      },
      op.title
    ),
    chip(op.tier, op.tier === 'plan' ? 'teal' : op.tier === 'destructive' ? 'bad' : 'warn'),
    op.command ? h('span', { class: 'mono muted op-command' }, op.command) : null,
    h('span', { class: 'muted op-summary' }, op.summary),
    op.count ? h('span', { class: 'count mono' }, `×${op.count}`) : null,
    h(
      'a',
      { href: `${OBSERVATORY}/?view=${view}`, target: '_blank', rel: 'noopener', class: 'quiet-link' },
      'Open in the Observatory to run',
      glyph('external', 12)
    )
  )
}
