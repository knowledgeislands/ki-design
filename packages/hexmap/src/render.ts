import { contrastRatio, mix, nightTerrain, type TerrainName, terrainNames, tokens } from '@knowledgeislands/tokens'
import { type Axial, hexKey, neighbour } from './coords.ts'
import { hexCorners, type Point, toPixel } from './geometry.ts'
import { type IslandMap, type MapHex, type MapLabel, type MapRoute, resolveStructure } from './model.ts'
import { patternMarkup, terrainPatterns } from './patterns.ts'

/** Day is the printed chart; night is the same chart by lantern-light (docs/spec/colour.md). */
export const flatThemes = ['day', 'night'] as const
export type FlatTheme = (typeof flatThemes)[number]

/**
 * Resolves a structure id to the inner markup of a 24 × 24 line glyph (no root `<svg>`), or `undefined` when there is
 * none. Inject one (for example from `@knowledgeislands/icons`) so this package stays free of the glyph set.
 */
export type GlyphResolver = (id: string) => string | undefined

export interface FlatOptions {
  /** Hex circumradius in user units. Defaults to 32. */
  readonly size?: number
  /** Space around the outermost hexes. Defaults to half a hex. */
  readonly padding?: number
  /** `day` (parchment) or `night` (navy). Defaults to `day`. */
  readonly theme?: FlatTheme
  /** Day terrain fills; missing entries fall back to the token palette. Night mixes them into navy. */
  readonly palette?: Partial<Record<TerrainName, string>>
  /** Draw the terrain patterns. Defaults to true; turn off only where another carrier marks terrain. */
  readonly patterns?: boolean
  /** Lay a paper ground and a hairline neat line under the map. Defaults to true. */
  readonly frame?: boolean
  /** Glyph markup for structures. Without one, or when it returns nothing, a structure is a small neutral marker. */
  readonly glyph?: GlyphResolver
  /** Label font stack, as a CSS `font-family` value. Defaults to the Cormorant SC token stack. */
  readonly labelFont?: string
  /** Hex outline colour. Defaults to the theme's ink. */
  readonly outline?: string
  readonly ink?: string
  readonly paper?: string
  /** Colour of routes and the selected ring. Defaults to gold. */
  readonly highlight?: string
  /** The hex to ring as selected. */
  readonly selected?: Axial
  /** Display name for a structure id; defaults to sentence case (`council-hall` → `Council hall`). */
  readonly structureName?: (id: string) => string
  /** Accessible title; defaults to the map name. */
  readonly title?: string
}

export interface LaidOutHex {
  readonly hex: MapHex
  readonly key: string
  readonly centre: Point
  readonly points: string
  readonly fill: string
  /** Whether the hex is land (anything but ocean). */
  readonly land: boolean
}

export interface LaidOutStructure {
  readonly hex: MapHex
  readonly key: string
  readonly centre: Point
  /** Radius of the parchment roundel. */
  readonly radius: number
  readonly title: string
  /** Inner glyph markup, when the resolver knew the structure. */
  readonly glyph?: string
  /** Places the 24-grid glyph centred in the roundel. */
  readonly transform: string
}

export interface LaidOutRoute {
  readonly route: MapRoute
  readonly d: string
}

export interface LaidOutLabel {
  readonly label: MapLabel
  readonly x: number
  readonly y: number
}

export interface LaidOutPattern {
  readonly terrain: TerrainName
  readonly id: string
  /** The complete `<pattern>` element. */
  readonly markup: string
}

/** Everything needed to draw a map, in drawing order. Shared by `renderFlatSvg` and `<ki-hexmap>`. */
export interface FlatLayout {
  readonly viewBox: string
  readonly box: { readonly x: number; readonly y: number; readonly width: number; readonly height: number }
  readonly width: number
  readonly height: number
  readonly size: number
  readonly theme: FlatTheme
  readonly title: string
  /** Prefix for ids inside the drawing, unique per map so several maps can share a page. */
  readonly idPrefix: string
  readonly labelFont: string
  readonly frame: boolean
  readonly colours: {
    readonly outline: string
    readonly ink: string
    readonly paper: string
    readonly highlight: string
    /** The coastline: deep ink on day paper, parchment at night. */
    readonly coast: string
    /** The pale band of shallows just outside the coast. */
    readonly shallows: string
    /** The neat line around the frame. */
    readonly rule: string
  }
  readonly hexes: readonly LaidOutHex[]
  readonly patterns: readonly LaidOutPattern[]
  /** Path data for every land edge that meets the ocean, joined into runs. Empty when there is no coast. */
  readonly coast: string
  readonly structures: readonly LaidOutStructure[]
  readonly routes: readonly LaidOutRoute[]
  readonly labels: readonly LaidOutLabel[]
  readonly selected?: { readonly key: string; readonly points: string }
}

/** Formats a number to at most two decimals, without `-0`, so output is byte-stable across runs. */
export const fmt = (n: number): string => {
  const rounded = Math.round(n * 100) / 100
  return String(Object.is(rounded, -0) ? 0 : rounded)
}

const pointsOf = (corners: readonly Point[]): string => corners.map(({ x, y }) => `${fmt(x)},${fmt(y)}`).join(' ')

export const sentenceCase = (id: string): string => {
  const words = id.split('-').join(' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

const fontStack = (families: readonly string[]): string =>
  families.map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', ')

const isLand = (terrain: TerrainName): boolean => terrain !== 'ocean'

/** Ink or parchment, whichever reads better on `fill`. */
const penFor = (fill: string): string =>
  contrastRatio(tokens.core.ink, fill) >= contrastRatio(tokens.core.parchment, fill)
    ? tokens.core.ink
    : tokens.core.parchment

/**
 * Corners of a pointy-top hex on an integer lattice (x in half-widths, y in half-radii), clockwise from the top
 * vertex. Exact, so shared corners of neighbouring hexes compare equal.
 */
const latticeCorners = [
  [0, -2],
  [1, -1],
  [1, 1],
  [0, 2],
  [-1, 1],
  [-1, -1]
] as const

/** The two corner indices bounding the edge towards direction `d` (e, ne, nw, w, sw, se). */
const edgeCorners = (d: number): readonly [number, number] => {
  const a = (7 - d) % 6
  return [a, (a + 1) % 6]
}

/** Coast edges joined into runs, so the stroke has clean joins rather than overlapping caps. */
function coastPath(hexes: readonly LaidOutHex[], byKey: ReadonlyMap<string, MapHex>, size: number): string {
  type Segment = { readonly a: string; readonly b: string }
  const points = new Map<string, Point>()
  const segments: Segment[] = []
  const latticeKey = (h: Axial, i: number): string => {
    const [cx, cy] = latticeCorners[i] as readonly [number, number]
    const key = `${2 * h.q + h.r + cx},${3 * h.r + cy}`
    if (!points.has(key)) {
      const corner = hexCorners(h, size)[i] as Point
      points.set(key, corner)
    }
    return key
  }
  for (const { hex, land } of hexes) {
    if (!land) continue
    for (let d = 0; d < 6; d++) {
      const other = byKey.get(hexKey(neighbour(hex, d)))
      if (other?.terrain !== 'ocean') continue
      const [i, j] = edgeCorners(d)
      segments.push({ a: latticeKey(hex, i), b: latticeKey(hex, j) })
    }
  }

  const touching = new Map<string, number[]>()
  for (const [index, { a, b }] of segments.entries()) {
    for (const p of [a, b]) touching.set(p, [...(touching.get(p) ?? []), index])
  }
  const used = new Set<number>()
  const at = (key: string): string => {
    const { x, y } = points.get(key) as Point
    return `${fmt(x)} ${fmt(y)}`
  }
  const runs: string[] = []
  for (const [start, segment] of segments.entries()) {
    if (used.has(start)) continue
    used.add(start)
    const first = segment.a
    let end = segment.b
    let d = `M${at(first)} L${at(end)}`
    for (;;) {
      const next = (touching.get(end) ?? []).find((i) => !used.has(i))
      if (next === undefined) break
      used.add(next)
      const s = segments[next] as Segment
      end = s.a === end ? s.b : s.a
      d += end === first ? ' Z' : ` L${at(end)}`
      if (end === first) break
    }
    runs.push(d)
  }
  return runs.join(' ')
}

/** Lays out a map for flat top-down rendering. Hexes are drawn north to south, west to east. */
export function layoutFlat(map: IslandMap, options: FlatOptions = {}): FlatLayout {
  const size = options.size ?? 32
  const padding = options.padding ?? size / 2
  const theme = options.theme ?? 'day'
  const tone = theme === 'day' ? 'light' : 'night'
  const day = { ...tokens.terrain, ...options.palette }
  // Water is the theme's sea (docs/spec/colour.md) unless the caller paints it; land at night is its day fill mixed into navy.
  const palette = { ...(theme === 'day' ? day : nightTerrain(day)) }
  if (options.palette?.ocean === undefined) palette.ocean = tokens.sea[tone].sea
  const roles = tokens.roles[tone]
  const name = options.structureName ?? sentenceCase
  const sorted = [...map.hexes].sort((a, b) => a.r - b.r || a.q - b.q)
  const byKey = new Map(sorted.map((h) => [hexKey(h), h]))
  const idPrefix = `ki-map-${map.id.toLowerCase().replace(/[^a-z0-9-]+/g, '-')}`
  const ink = options.ink ?? roles.ink
  const paper = options.paper ?? roles.paper

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  const hexes = sorted.map((hex): LaidOutHex => {
    const corners = hexCorners(hex, size)
    for (const { x, y } of corners) {
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
    }
    return {
      hex,
      key: hexKey(hex),
      centre: toPixel(hex, size),
      points: pointsOf(corners),
      fill: palette[hex.terrain],
      land: isLand(hex.terrain)
    }
  })

  const present = new Set(sorted.map((h) => h.terrain))
  const patterns =
    options.patterns === false
      ? []
      : terrainNames
          .filter((terrain) => present.has(terrain))
          .map((terrain): LaidOutPattern => {
            const spec = terrainPatterns[terrain]
            const id = `${idPrefix}-pattern-${terrain}`
            const pen = spec.pen === 'gold' ? tokens.core.gold : penFor(palette[terrain])
            return { terrain, id, markup: patternMarkup(id, spec, size, pen) }
          })

  const radius = size * 0.4
  const glyphSize = radius * 1.38
  const structures = hexes.flatMap(({ hex, key, centre }): LaidOutStructure[] => {
    if (!hex.structure) return []
    // A deprecated id (`citadel`) draws and names the structure that replaced it.
    const id = resolveStructure(hex.structure)
    const glyph = options.glyph?.(id)
    const k = glyphSize / 24
    return [
      {
        hex,
        key,
        centre,
        radius,
        title: hex.condition ? `${name(id)} (${hex.condition})` : name(id),
        ...(glyph ? { glyph } : {}),
        transform: `translate(${fmt(centre.x - glyphSize / 2)} ${fmt(centre.y - glyphSize / 2)}) scale(${Math.round(k * 1000) / 1000})`
      }
    ]
  })

  const routes = (map.routes ?? []).flatMap((route): LaidOutRoute[] => {
    if (!byKey.has(hexKey(route.from)) || !byKey.has(hexKey(route.to))) return []
    const a = toPixel(route.from, size)
    const b = toPixel(route.to, size)
    const dx = b.x - a.x
    const dy = b.y - a.y
    // Bow each route a fifth of its length to the left of travel, so opposite routes do not overlap.
    const cx = (a.x + b.x) / 2 + dy * 0.2
    const cy = (a.y + b.y) / 2 - dx * 0.2
    return [{ route, d: `M${fmt(a.x)} ${fmt(a.y)} Q${fmt(cx)} ${fmt(cy)} ${fmt(b.x)} ${fmt(b.y)}` }]
  })

  // A label sits across its hex, or below the roundel when the hex holds a structure.
  const labels = (map.labels ?? []).map((label): LaidOutLabel => {
    const { x, y } = toPixel(label, size)
    const occupied = byKey.get(hexKey(label))?.structure !== undefined
    return { label, x, y: occupied ? y + radius + size * 0.42 : y + size * 0.14 }
  })

  const selected =
    options.selected && byKey.has(hexKey(options.selected))
      ? { key: hexKey(options.selected), points: insetRing(options.selected, size, 0.84) }
      : undefined

  const ox = minX - padding
  const oy = minY - padding
  const width = maxX - minX + 2 * padding
  const height = maxY - minY + 2 * padding
  return {
    viewBox: `${fmt(ox)} ${fmt(oy)} ${fmt(width)} ${fmt(height)}`,
    box: { x: ox, y: oy, width, height },
    width,
    height,
    size,
    theme,
    title: options.title ?? map.name,
    idPrefix,
    labelFont: options.labelFont ?? fontStack(tokens.fonts.smallcaps),
    frame: options.frame ?? true,
    colours: {
      outline: options.outline ?? ink,
      ink,
      paper,
      highlight: options.highlight ?? tokens.core.gold,
      coast: ink,
      shallows:
        options.palette?.ocean === undefined
          ? tokens.sea[tone].shallow
          : mix(palette.ocean, tokens.core.parchment, 0.2),
      rule: roles.boundary
    },
    hexes,
    patterns,
    coast: coastPath(hexes, byKey, size),
    structures,
    routes,
    labels,
    ...(selected ? { selected } : {})
  }
}

/** A hex outline shrunk by `k` about the hex's own centre. */
function insetRing(h: Axial, size: number, k: number): string {
  const { x, y } = toPixel(h, size)
  return pointsOf(hexCorners({ q: 0, r: 0 }, size * k).map((p) => ({ x: p.x + x, y: p.y + y })))
}

const escapeXml = (text: string): string =>
  text.replace(/[&<>"']/g, (c) => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' }[c]};`)

/**
 * The drawing inside the root `<svg>`, layer by layer: patterns, paper, sea, shallows, land, terrain patterns,
 * coastline, routes, structures, labels and the selected ring. `<ki-hexmap>` lays its interactive hexes over this.
 */
export function renderFlatLayers(layout: FlatLayout): string {
  const { colours, size } = layout
  const out: string[] = []
  const hairline = fmt(size / 40)

  if (layout.patterns.length > 0) {
    out.push('<defs>', ...layout.patterns.map((p) => p.markup), '</defs>')
  }

  if (layout.frame) {
    const { x, y, width, height } = layout.box
    const inset = size / 5
    out.push(
      `<rect class="ki-paper" x="${fmt(x)}" y="${fmt(y)}" width="${fmt(width)}" height="${fmt(height)}" fill="${colours.paper}"/>`,
      `<rect class="ki-neatline" x="${fmt(x + inset)}" y="${fmt(y + inset)}" width="${fmt(width - 2 * inset)}" height="${fmt(height - 2 * inset)}" fill="none" stroke="${colours.rule}" stroke-opacity="0.6" stroke-width="${hairline}"/>`
    )
  }

  const hexGroup = (land: boolean): void => {
    const group = layout.hexes.filter((h) => h.land === land)
    if (group.length === 0) return
    const opacity = land ? (layout.theme === 'day' ? 0.16 : 0.2) : 0.07
    out.push(
      `<g class="ki-hexes ki-${land ? 'land' : 'sea'}" stroke="${colours.outline}" stroke-opacity="${opacity}" stroke-width="${hairline}" stroke-linejoin="round">`
    )
    for (const { hex, points, fill } of group) {
      out.push(
        `<polygon class="ki-hex" data-q="${hex.q}" data-r="${hex.r}" data-terrain="${hex.terrain}" points="${points}" fill="${fill}"/>`
      )
    }
    out.push('</g>')
  }

  hexGroup(false)
  // The shallows are a wide stroke along the coast, edged by a hairline water line as on an engraved chart; the land
  // drawn next hides their inner half.
  if (layout.coast) {
    const band = size * 0.36
    out.push(
      `<g class="ki-shallows" fill="none" stroke-linecap="round" stroke-linejoin="round">`,
      `<path d="${layout.coast}" stroke="${colours.coast}" stroke-opacity="0.28" stroke-width="${fmt(band + size / 20)}"/>`,
      `<path d="${layout.coast}" stroke="${colours.shallows}" stroke-width="${fmt(band)}"/>`,
      '</g>'
    )
  }
  hexGroup(true)

  if (layout.patterns.length > 0) {
    const ids = new Map(layout.patterns.map((p) => [p.terrain, p.id]))
    out.push('<g class="ki-terrain-patterns" stroke="none">')
    for (const { hex, points } of layout.hexes) {
      const id = ids.get(hex.terrain)
      if (id) out.push(`<polygon data-terrain="${hex.terrain}" points="${points}" fill="url(#${id})"/>`)
    }
    out.push('</g>')
  }

  if (layout.coast) {
    out.push(
      `<path class="ki-coast" d="${layout.coast}" fill="none" stroke="${colours.coast}" stroke-opacity="${layout.theme === 'day' ? 0.8 : 0.62}" stroke-width="${fmt(size / 18)}" stroke-linecap="round" stroke-linejoin="round"/>`
    )
  }

  if (layout.routes.length > 0) {
    const width = size / 14
    out.push(`<g class="ki-routes" fill="none" stroke-linecap="round" stroke-linejoin="round">`)
    for (const { route, d } of layout.routes) {
      const dash = route.kind === 'pending' ? ` stroke-dasharray="${fmt(size / 9)} ${fmt(size / 7)}"` : ''
      out.push(
        `<g class="ki-route ki-route-${route.kind}">`,
        `<path d="${d}" stroke="${colours.paper}" stroke-opacity="0.45" stroke-width="${fmt(width * 2.4)}"/>`,
        `<path d="${d}" stroke="${colours.highlight}" stroke-width="${fmt(width)}"${dash}/>`,
        '</g>'
      )
    }
    out.push('</g>')
  }

  if (layout.structures.length > 0) {
    out.push('<g class="ki-structures">')
    for (const { hex, centre, radius, title, glyph, transform } of layout.structures) {
      const condition = hex.condition ? ` data-condition="${hex.condition}"` : ''
      const cx = fmt(centre.x)
      const cy = fmt(centre.y)
      const mark = glyph
        ? `<g transform="${transform}" fill="none" stroke="${colours.ink}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>`
        : `<circle cx="${cx}" cy="${cy}" r="${fmt(radius * 0.18)}" fill="${colours.ink}"/>`
      const r = glyph ? radius : radius * 0.5
      out.push(
        `<g class="ki-structure" data-structure="${escapeXml(hex.structure ?? '')}"${condition}><title>${escapeXml(title)}</title>`,
        `<circle cx="${cx}" cy="${cy}" r="${fmt(r + size / 22)}" fill="${colours.ink}" fill-opacity="0.12"/>`,
        `<circle cx="${cx}" cy="${cy}" r="${fmt(r)}" fill="${colours.paper}" stroke="${colours.ink}" stroke-opacity="0.7" stroke-width="${hairline}"/>`,
        mark,
        '</g>'
      )
    }
    out.push('</g>')
  }

  if (layout.labels.length > 0) {
    out.push(
      `<g class="ki-labels" fill="${colours.ink}" stroke="${colours.paper}" stroke-width="${fmt(size / 8)}" stroke-linejoin="round" paint-order="stroke" font-family="${escapeXml(layout.labelFont)}" font-size="${fmt(size * 0.42)}" font-variant="small-caps" letter-spacing="0.06em" text-anchor="middle">`
    )
    for (const { label, x, y } of layout.labels)
      out.push(`<text x="${fmt(x)}" y="${fmt(y)}">${escapeXml(label.text)}</text>`)
    out.push('</g>')
  }

  if (layout.selected) {
    out.push(
      `<polygon class="ki-selected" points="${layout.selected.points}" fill="none" stroke="${colours.highlight}" stroke-width="${fmt(size / 18)}" stroke-linejoin="round"/>`
    )
  }
  return out.join('\n')
}

/** Renders an island map as a standalone, deterministic SVG string. */
export function renderFlatSvg(map: IslandMap, options: FlatOptions = {}): string {
  const layout = layoutFlat(map, options)
  const titleId = `${layout.idPrefix}-title`
  return `${[
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${layout.viewBox}" width="${fmt(layout.width)}" height="${fmt(layout.height)}" role="img" aria-labelledby="${escapeXml(titleId)}">`,
    `<title id="${escapeXml(titleId)}">${escapeXml(layout.title)}</title>`,
    renderFlatLayers(layout),
    '</svg>'
  ].join('\n')}\n`
}
