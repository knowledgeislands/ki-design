import { contrastRatio, cssBlocks, nightTerrain, type Theme, tokens } from '@knowledgeislands/tokens'
import { type Axial, distance, hex, hexAdd, hexKey, neighbour, spiral } from './coords.ts'
import { hexCorners, type Point, toPixel } from './geometry.ts'
import { patternMarkup, terrainPatterns } from './patterns.ts'
import { boundaryPath, escapeXml, fmt, type GlyphResolver } from './render.ts'

/**
 * A territory drawn as an archipelago (GDR-KI-DESIGN-015): its islands in one sea region with a tinted border, the
 * Capital at the centre. Islands are repositories; the chart is laid out from a list of them, so a caller needs no
 * hand-placed hexes. The Arcadia page and the Known Lands chart both draw from it.
 */
export interface ArchipelagoIsland {
  /** Stable identity, such as the repository name. Unique within the archipelago. */
  readonly id: string
  /** The label under the island. Defaults to `id`. */
  readonly name?: string
  /** The island's role in its territory, as words (`Capability`, `MCP`). Read into the link title. */
  readonly role?: string
  /** Where the island links to. Without one the island is drawn but not linked. */
  readonly href?: string
  /** The glyph id for the island's roundel, resolved through the `glyph` option. */
  readonly glyph?: string
  /** The link's title and accessible name. Defaults to `name`, then `name — role`. */
  readonly title?: string
  /** True for the territory's Capital. At most one island may be the Capital. */
  readonly capital?: boolean
}

export interface Archipelago {
  readonly id: string
  /** The territory's name; the chart's accessible name unless `title` overrides it. */
  readonly name: string
  readonly islands: readonly ArchipelagoIsland[]
}

/**
 * `day` and `night` bake the token colours in, as `renderFlatSvg` does. `auto` follows the page: the chart's colours
 * are custom properties set per scheme with the token stylesheet's own selectors (`prefers-color-scheme`, and
 * `data-theme` on any ancestor), so the nearest themed surface decides, with no script.
 */
export const archipelagoThemes = ['day', 'night', 'auto'] as const
export type ArchipelagoTheme = (typeof archipelagoThemes)[number]

export interface ArchipelagoOptions {
  /** Hex circumradius in user units. Defaults to 32. */
  readonly size?: number
  /** Hexes between neighbouring island centres. Defaults to 4: two hexes of sea between islands. Minimum 3. */
  readonly spacing?: number
  /** Target width-to-height ratio of the cluster: above 1 spreads it wide, below 1 stacks it tall. Defaults to 1: a round cluster. */
  readonly aspect?: number
  /** Hexes of sea kept around every island inside the region's border. Defaults to 2. */
  readonly margin?: number
  /** Defaults to `day`. */
  readonly theme?: ArchipelagoTheme
  /** Glyph markup for each island's roundel. Without one, or for an unknown id, a small neutral marker. */
  readonly glyph?: GlyphResolver
  /** Label font stack, as a CSS `font-family` value. Defaults to the Cormorant SC token stack. */
  readonly labelFont?: string
  /** Label size as a fraction of the hex size. Defaults to 0.42, as on the flat chart. */
  readonly labelSize?: number
  /** Break a label after its hyphens into lines of at most this many characters. Defaults to 18. */
  readonly labelWrap?: number
  /** Lay a paper ground and a hairline neat line under the chart. Defaults to true; false lets the page show through. */
  readonly frame?: boolean
  /** Accessible name. Defaults to the archipelago's name. */
  readonly title?: string
  /** Accessible description, as `<desc>`. */
  readonly description?: string
  /** Distinguishes ids when one archipelago is drawn more than once on a page (two layouts, say). */
  readonly variant?: string
}

/** The colour roles the chart is drawn in. In `auto`, each is the custom property `--ki-chart-<role>`. */
export const archipelagoColourRoles = [
  'paper',
  'rule',
  'ink',
  'sea',
  'shallow',
  'tint',
  'land',
  'pen',
  'highlight'
] as const
export type ArchipelagoColourRole = (typeof archipelagoColourRoles)[number]

/** The chart's colours for one theme, all from the tokens. */
export function archipelagoColours(theme: Theme): Record<ArchipelagoColourRole, string> {
  const roles = tokens.roles[theme]
  const land = theme === 'light' ? tokens.terrain.grassland : nightTerrain().grassland
  return {
    paper: roles.paper,
    rule: roles.boundary,
    ink: roles.ink,
    sea: tokens.sea[theme].sea,
    shallow: tokens.sea[theme].shallow,
    tint: roles.accent,
    land,
    // The grassland tufts: ink or parchment, whichever reads better on the land (as on the flat chart).
    pen:
      contrastRatio(tokens.core.ink, land) >= contrastRatio(tokens.core.parchment, land)
        ? tokens.core.ink
        : tokens.core.parchment,
    highlight: tokens.core.gold
  }
}

export interface PlacedIsland {
  readonly island: ArchipelagoIsland
  /** The island's centre hex, where its roundel sits. */
  readonly centre: Axial
  /** Every land hex of the island, centre first. */
  readonly hexes: readonly Axial[]
  readonly pixel: Point
  readonly radius: number
  readonly label: readonly string[]
  readonly title: string
  readonly glyph?: string
}

export interface ArchipelagoLayout {
  readonly viewBox: string
  readonly box: { readonly x: number; readonly y: number; readonly width: number; readonly height: number }
  readonly size: number
  readonly idPrefix: string
  readonly title: string
  readonly description?: string
  readonly theme: ArchipelagoTheme
  readonly frame: boolean
  readonly labelFont: string
  readonly labelSize: number
  /** Islands in drawing order: the Capital, then outwards. */
  readonly islands: readonly PlacedIsland[]
  /** Every sea hex inside the region's border, north to south. */
  readonly sea: readonly Axial[]
  /** The region's border. */
  readonly border: string
  /** Every land edge that meets the sea. */
  readonly coast: string
}

/** FNV-1a: a small, stable hash so an island's shape follows its identity and never its position in the list. */
function hash(text: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h
}

/** Breaks `text` after hyphens into lines of at most `width` characters where it can. */
export function wrapLabel(text: string, width: number): string[] {
  const parts = text.split(/(?<=-)/)
  const lines: string[] = []
  let line = ''
  for (const part of parts) {
    if (line !== '' && (line + part).length > width) {
      lines.push(line)
      line = part
    } else line += part
  }
  if (line !== '') lines.push(line)
  return lines
}

/** The Capital's 7-hex flower ([GDR-KI-DESIGN-008](../../../docs/decisions/GDR-KI-DESIGN-008-the-capital-and-the-non-combative-principle.md)). */
const flower = (c: Axial): Axial[] => spiral(c, 1)

/**
 * A small isle of two or three hexes: the centre and one or two of its northern or side neighbours (e, ne, nw, w),
 * chosen by the island's identity so it keeps its shape whatever else changes. The south stays open for the label.
 */
function isle(c: Axial, id: string): Axial[] {
  const h = hash(id)
  const first = h % 4
  const out = [c, neighbour(c, first)]
  if ((h >>> 2) % 3 !== 0) {
    // A second hex next to the first, still on the northern side or level.
    const second = first === 3 ? 2 : first === 0 ? 1 : (h >>> 4) % 2 === 0 ? first - 1 : first + 1
    out.push(neighbour(c, second))
  }
  return out
}

function validate(archipelago: Archipelago): void {
  if (archipelago.islands.length === 0) throw new Error(`archipelago ${archipelago.id} has no islands`)
  const ids = new Set<string>()
  for (const island of archipelago.islands) {
    if (island.id === '') throw new Error('an island needs a non-empty id')
    if (ids.has(island.id)) throw new Error(`island ${island.id} appears twice`)
    ids.add(island.id)
  }
  if (archipelago.islands.filter((i) => i.capital).length > 1) {
    throw new Error(`archipelago ${archipelago.id} has more than one Capital`)
  }
}

/**
 * The island positions: the Capital (or, without one, the first island) at the centre, the rest on a coarse hex
 * lattice `spacing` apart, nearest first. Rings are measured on an ellipse stretched to `aspect` and filled
 * clockwise from north, so islands fill ring by ring and consecutive islands sit side by side.
 */
export function archipelagoSlots(count: number, spacing = 4, aspect = 1): Axial[] {
  if (!Number.isInteger(spacing) || spacing < 3) throw new RangeError('spacing must be an integer of at least 3')
  if (!(aspect > 0)) throw new RangeError('aspect must be positive')
  if (count <= 0) return []
  const sx = Math.sqrt(aspect)
  const reach = Math.ceil(Math.sqrt(count) * Math.max(sx, 1 / sx)) + 2
  const round = (n: number): number => Math.round(n * 1e6) / 1e6
  const slots = spiral(hex(0, 0), reach)
    .slice(1)
    .map((s) => {
      const at = hex(s.q * spacing, s.r * spacing)
      const { x, y } = toPixel(at, 1)
      // Clockwise from north: atan2 of (x, -y) runs 0 at north to 2π.
      const angle = (Math.atan2(x, -y) + 2 * Math.PI) % (2 * Math.PI)
      // Rings, not raw distance: a ring's corners lie farther out than its edges, and sorting on raw distance would
      // scatter consecutive islands around the ring. Within 0.866k to k of the centre, ring k rounds up to k.
      const reachOut = Math.hypot(x / sx, y * sx) / (Math.sqrt(3) * spacing)
      return { at, ring: Math.ceil(round(reachOut) - 1e-6), angle: round(angle) }
    })
    .sort((a, b) => a.ring - b.ring || a.angle - b.angle)
  return [hex(0, 0), ...slots.slice(0, count - 1).map((s) => s.at)]
}

/** Lays out an archipelago: deterministic, so the same list always draws the same chart. */
export function layoutArchipelago(archipelago: Archipelago, options: ArchipelagoOptions = {}): ArchipelagoLayout {
  validate(archipelago)
  const size = options.size ?? 32
  const spacing = options.spacing ?? 4
  const margin = options.margin ?? 2
  const labelSize = (options.labelSize ?? 0.42) * size
  const wrap = options.labelWrap ?? 18
  const capitalIndex = Math.max(
    0,
    archipelago.islands.findIndex((i) => i.capital)
  )
  const ordered = [
    archipelago.islands[capitalIndex] as ArchipelagoIsland,
    ...archipelago.islands.filter((_, i) => i !== capitalIndex)
  ]
  const slots = archipelagoSlots(ordered.length, spacing, options.aspect ?? 1)

  const islands = ordered.map((island, i): PlacedIsland => {
    const centre = slots[i] as Axial
    const isCapital = i === 0 && island.capital === true
    const name = island.name ?? island.id
    const glyph = island.glyph ? options.glyph?.(island.glyph) : undefined
    return {
      island,
      centre,
      hexes: isCapital ? flower(centre) : isle(centre, island.id),
      pixel: toPixel(centre, size),
      radius: size * (isCapital ? 0.56 : 0.4),
      label: wrapLabel(name, wrap),
      title: island.title ?? (island.role ? `${name} — ${island.role}` : name),
      ...(glyph ? { glyph } : {})
    }
  })

  const land = new Map<string, Axial>()
  for (const placed of islands) for (const h of placed.hexes) land.set(hexKey(h), h)
  const landHexes = [...land.values()]
  const seaKeys = new Map<string, Axial>()
  for (const h of landHexes) {
    for (const s of spiral(h, margin)) {
      const key = hexKey(s)
      if (!land.has(key)) seaKeys.set(key, s)
    }
  }
  // A label runs below its island; keep the sea under every line inside the region.
  for (const placed of islands) {
    const base = placed.hexes.reduce((low, h) => (h.r > low.r ? h : low), placed.centre)
    const below = Math.ceil((size + placed.label.length * labelSize * 1.15) / (1.5 * size))
    for (let k = 1; k <= below; k++) {
      for (const s of [hexAdd(base, hex(-Math.ceil(k / 2), k)), hexAdd(base, hex(-Math.floor(k / 2), k))]) {
        for (const t of spiral(s, 1)) if (!land.has(hexKey(t))) seaKeys.set(hexKey(t), t)
      }
    }
  }
  // Fill any lake the margins enclose, so the region is one sea with one outer border.
  const enclosed = [...seaKeys.values(), ...landHexes]
  const qs = enclosed.map((h) => h.q)
  const rs = enclosed.map((h) => h.r)
  const [q0, q1, r0, r1] = [Math.min(...qs) - 1, Math.max(...qs) + 1, Math.min(...rs) - 1, Math.max(...rs) + 1]
  const taken = (h: Axial): boolean => land.has(hexKey(h)) || seaKeys.has(hexKey(h))
  const outside = new Set<string>()
  const queue: Axial[] = [hex(q0, r0)]
  outside.add(hexKey(queue[0] as Axial))
  while (queue.length > 0) {
    const h = queue.pop() as Axial
    for (let d = 0; d < 6; d++) {
      const n = neighbour(h, d)
      const key = hexKey(n)
      if (n.q < q0 || n.q > q1 || n.r < r0 || n.r > r1 || outside.has(key) || taken(n)) continue
      outside.add(key)
      queue.push(n)
    }
  }
  for (let r = r0; r <= r1; r++) {
    for (let q = q0; q <= q1; q++) {
      const h = hex(q, r)
      if (!taken(h) && !outside.has(hexKey(h))) seaKeys.set(hexKey(h), h)
    }
  }
  const sea = [...seaKeys.values()].sort((a, b) => a.r - b.r || a.q - b.q)
  const region = new Set([...seaKeys.keys(), ...land.keys()])

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const h of [...sea, ...landHexes]) {
    for (const { x, y } of hexCorners(h, size)) {
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
    }
  }
  const padding = size / 2
  const box = {
    x: minX - padding,
    y: minY - padding,
    width: maxX - minX + 2 * padding,
    height: maxY - minY + 2 * padding
  }
  const variant = options.variant ? `-${options.variant}` : ''
  const idPrefix = `ki-archipelago-${archipelago.id.toLowerCase().replace(/[^a-z0-9-]+/g, '-')}${variant
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')}`
  const sortedLand = landHexes.sort((a, b) => a.r - b.r || a.q - b.q)

  return {
    viewBox: `${fmt(box.x)} ${fmt(box.y)} ${fmt(box.width)} ${fmt(box.height)}`,
    box,
    size,
    idPrefix,
    title: options.title ?? archipelago.name,
    ...(options.description ? { description: options.description } : {}),
    theme: options.theme ?? 'day',
    frame: options.frame ?? true,
    labelFont: options.labelFont ?? tokens.fonts.smallcaps.map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', '),
    labelSize,
    islands,
    sea,
    border: boundaryPath(sea, size, (_, to) => !region.has(hexKey(to))),
    coast: boundaryPath(sortedLand, size, (_, to) => seaKeys.has(hexKey(to)))
  }
}

const declarations = (theme: Theme): string =>
  Object.entries(archipelagoColours(theme))
    .map(([role, value]) => `--ki-chart-${role}:${value}`)
    .join(';')

/**
 * The chart's stylesheet. In `auto` its custom properties are set with the token stylesheet's own selectors, so they
 * inherit from the nearest themed surface exactly as `--paper` and `--ink` do. Elsewhere the root pins one theme.
 */
function stylesheet(layout: ArchipelagoLayout): string {
  const root = `.${layout.idPrefix}`
  const rules: string[] = []
  if (layout.theme === 'auto') {
    for (const block of cssBlocks()) {
      const scheme = block.declarations.find(([property]) => property === 'color-scheme')?.[1]
      const body = `${block.selector}{${declarations(scheme === 'dark' ? 'night' : 'light')}}`
      rules.push(block.atRule ? `${block.atRule}{${body}}` : body)
    }
  } else {
    rules.push(`${root}{${declarations(layout.theme === 'day' ? 'light' : 'night')}}`)
  }
  const v = (role: ArchipelagoColourRole): string => `var(--ki-chart-${role})`
  rules.push(
    `${root} .ka-paper{fill:${v('paper')}}`,
    `${root} .ka-neatline{stroke:${v('rule')}}`,
    `${root} .ka-sea{fill:${v('sea')};stroke:${v('ink')}}`,
    `${root} .ka-border-wash{stroke:${v('tint')}}`,
    `${root} .ka-border{stroke:${v('tint')}}`,
    `${root} .ka-shallows-edge{stroke:${v('ink')}}`,
    `${root} .ka-shallows{stroke:${v('shallow')}}`,
    `${root} .ka-land{fill:${v('land')};stroke:${v('ink')}}`,
    `${root} .ka-pattern{color:${v('pen')}}`,
    `${root} .ka-coast{stroke:${v('ink')}}`,
    `${root} .ka-roundel-shadow{fill:${v('ink')}}`,
    `${root} .ka-roundel{fill:${v('paper')};stroke:${v('ink')}}`,
    `${root} .ka-glyph{stroke:${v('ink')}}`,
    `${root} .ka-marker{fill:${v('ink')}}`,
    `${root} .ka-label{fill:${v('ink')};stroke:${v('paper')}}`,
    `${root} .ka-focus{fill:none;stroke:${v('highlight')};opacity:0}`,
    `${root} a:hover .ka-focus,${root} a:focus-visible .ka-focus{opacity:1}`,
    `${root} a:focus{outline:none}`,
    `${root} a:hover .ka-label tspan,${root} a:focus-visible .ka-label tspan{text-decoration:underline}`
  )
  return `<style>${rules.join('')}</style>`
}

const pointsOf = (corners: readonly Point[]): string => corners.map(({ x, y }) => `${fmt(x)},${fmt(y)}`).join(' ')

/** The drawing inside the root `<svg>`: paper, the sea region and its border, shallows, land, roundels and labels. */
export function renderArchipelagoLayers(layout: ArchipelagoLayout): string {
  const { size } = layout
  const hairline = fmt(size / 40)
  const patternId = `${layout.idPrefix}-pattern-land`
  const out: string[] = [stylesheet(layout)]
  out.push(
    `<defs><g class="ka-pattern">${patternMarkup(patternId, terrainPatterns.grassland, size, 'currentColor')}</g></defs>`
  )

  if (layout.frame) {
    const { x, y, width, height } = layout.box
    const inset = size / 5
    out.push(
      `<rect class="ka-paper" x="${fmt(x)}" y="${fmt(y)}" width="${fmt(width)}" height="${fmt(height)}"/>`,
      `<rect class="ka-neatline" x="${fmt(x + inset)}" y="${fmt(y + inset)}" width="${fmt(width - 2 * inset)}" height="${fmt(height - 2 * inset)}" fill="none" stroke-opacity="0.6" stroke-width="${hairline}"/>`
    )
  }

  // The sea region, then its tinted border: a soft wash inside the line and a hairline on it.
  out.push(`<g stroke-opacity="0.07" stroke-width="${hairline}" stroke-linejoin="round">`)
  for (const h of layout.sea) out.push(`<polygon class="ka-sea" points="${pointsOf(hexCorners(h, size))}"/>`)
  out.push('</g>')
  if (layout.border) {
    out.push(
      `<g class="ki-archipelago-border" fill="none" stroke-linecap="round" stroke-linejoin="round">`,
      `<path class="ka-border-wash" d="${layout.border}" stroke-opacity="0.1" stroke-width="${fmt(size * 0.5)}"/>`,
      `<path class="ka-border" d="${layout.border}" stroke-opacity="0.45" stroke-width="${fmt(size / 16)}"/>`,
      '</g>'
    )
  }

  if (layout.coast) {
    const band = size * 0.36
    out.push(
      `<g fill="none" stroke-linecap="round" stroke-linejoin="round">`,
      `<path class="ka-shallows-edge" d="${layout.coast}" stroke-opacity="0.28" stroke-width="${fmt(band + size / 20)}"/>`,
      `<path class="ka-shallows" d="${layout.coast}" stroke-width="${fmt(band)}"/>`,
      '</g>'
    )
  }

  const glyphSize = (r: number): number => r * 1.38
  for (const placed of layout.islands) {
    const { island, hexes, pixel, radius, label, title, glyph } = placed
    const cx = fmt(pixel.x)
    const cy = fmt(pixel.y)
    const isle: string[] = [`<title>${escapeXml(title)}</title>`]
    isle.push(`<g stroke-opacity="0.18" stroke-width="${hairline}" stroke-linejoin="round">`)
    for (const h of hexes) {
      const points = pointsOf(hexCorners(h, size))
      isle.push(
        `<polygon class="ka-land" points="${points}"/>`,
        `<polygon points="${points}" fill="url(#${patternId})"/>`
      )
    }
    isle.push('</g>')
    // Each island's own coastline, so it reads as one shape under its roundel and label.
    const own = new Set(hexes.map(hexKey))
    isle.push(
      `<path class="ka-coast" d="${boundaryPath(hexes, size, (_, to) => !own.has(hexKey(to)))}" fill="none" stroke-opacity="0.7" stroke-width="${fmt(size / 18)}" stroke-linecap="round" stroke-linejoin="round"/>`
    )
    isle.push(
      `<polygon class="ka-focus" points="${pointsOf(hexCorners({ q: 0, r: 0 }, size * 0.9).map((p) => ({ x: p.x + pixel.x, y: p.y + pixel.y })))}" stroke-width="${fmt(size / 14)}" stroke-linejoin="round"/>`
    )
    const g = glyphSize(radius)
    const mark = glyph
      ? `<g class="ka-glyph" transform="translate(${fmt(pixel.x - g / 2)} ${fmt(pixel.y - g / 2)}) scale(${Math.round((g / 24) * 1000) / 1000})" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>`
      : `<circle class="ka-marker" cx="${cx}" cy="${cy}" r="${fmt(radius * 0.2)}"/>`
    const r = glyph ? radius : radius * 0.5
    isle.push(
      `<circle class="ka-roundel-shadow" cx="${cx}" cy="${cy}" r="${fmt(r + size / 22)}" fill-opacity="0.12"/>`,
      `<circle class="ka-roundel" cx="${cx}" cy="${cy}" r="${fmt(r)}" stroke-opacity="0.7" stroke-width="${hairline}"/>`,
      mark
    )
    // The label hangs below the island's southern edge, a line at a time.
    const bottom = Math.max(...hexes.map((h) => toPixel(h, size).y)) + size
    const top = bottom + size * 0.14 + layout.labelSize * 0.9
    isle.push(
      `<text class="ka-label" x="${cx}" y="${fmt(top)}" stroke-width="${fmt(size / 8)}" stroke-linejoin="round" paint-order="stroke" font-family="${escapeXml(layout.labelFont)}" font-size="${fmt(layout.labelSize)}" font-variant="small-caps" letter-spacing="0.04em" text-anchor="middle">${label
        .map(
          (line, i) =>
            `<tspan x="${cx}" ${i === 0 ? '' : `dy="${fmt(layout.labelSize * 1.1)}" `}>${escapeXml(line)}</tspan>`
        )
        .join('')}</text>`
    )
    const capital = island.capital ? ' data-capital="true"' : ''
    const attrs = `class="ki-island" data-island="${escapeXml(island.id)}"${capital}`
    if (island.href) {
      out.push(`<a ${attrs} href="${escapeXml(island.href)}" aria-label="${escapeXml(title)}">`, ...isle, '</a>')
    } else {
      out.push(`<g ${attrs}>`, ...isle, '</g>')
    }
  }

  return out.join('\n')
}

/**
 * Renders an archipelago as a standalone, deterministic SVG string with no script. The root is a labelled group, not
 * an image, so each island's link stays reachable; a page should still list the islands in text beside it
 * ([GDR-KI-DESIGN-032](../../../docs/decisions/GDR-KI-DESIGN-032-the-living-map-without-javascript.md)).
 */
export function renderArchipelagoSvg(archipelago: Archipelago, options: ArchipelagoOptions = {}): string {
  const layout = layoutArchipelago(archipelago, options)
  const titleId = `${layout.idPrefix}-title`
  const descId = `${layout.idPrefix}-desc`
  const labelled = layout.description ? `${titleId} ${descId}` : titleId
  return `${[
    `<svg xmlns="http://www.w3.org/2000/svg" class="ki-archipelago ${layout.idPrefix}" viewBox="${layout.viewBox}" width="${fmt(layout.box.width)}" height="${fmt(layout.box.height)}" role="group" aria-labelledby="${escapeXml(labelled)}">`,
    `<title id="${escapeXml(titleId)}">${escapeXml(layout.title)}</title>`,
    ...(layout.description ? [`<desc id="${escapeXml(descId)}">${escapeXml(layout.description)}</desc>`] : []),
    renderArchipelagoLayers(layout),
    '</svg>'
  ].join('\n')}\n`
}

/** Island hexes never touch: the minimum hex distance between two islands' land. */
export function archipelagoClearance(layout: ArchipelagoLayout): number {
  let min = Infinity
  for (const [i, a] of layout.islands.entries()) {
    for (const b of layout.islands.slice(i + 1)) {
      for (const p of a.hexes) for (const q of b.hexes) min = Math.min(min, distance(p, q))
    }
  }
  return min
}
