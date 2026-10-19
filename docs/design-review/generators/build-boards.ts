/**
 * Builds the design review boards (`docs/design-review/boards/Ds*.dc.html` and `canvas.json`) from the repository's
 * data and decision records, so the review cannot drift from the spec.
 *
 *   bun docs/design-review/generators/build-boards.ts           write the boards
 *   bun docs/design-review/generators/build-boards.ts --check   fail if the committed boards differ
 *
 * Each board has a template in `templates/`. A template is the board's markup and logic, with the hand-written prose
 * kept as template text and every value that comes from data written as a marker, `@@kind:argument@@`. The generator
 * replaces each marker from the sources below, and fails on a marker it cannot resolve.
 *
 * Sources: packages/tokens (tokens.json), packages/symbols (symbols.ts), packages/icons/svg, packages/tiles (the
 * contract and the Modern manifest), docs/decisions (GDR-KI-DESIGN-*.md and OPEN.md), docs/spec and docs/briefs.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { retiredSymbols, symbolAliases, symbolCategories, symbols } from '../../../packages/symbols/src/index.ts'
import type { KiSymbol } from '../../../packages/symbols/src/types.ts'
import { requiredInventory, tileGeometry, tileKinds } from '../../../packages/tiles/src/contract.ts'
import { contrastRatio } from '../../../packages/tokens/src/contrast.ts'
import { nightTerrain, resolveValue, terrainNames, tokenDocument } from '../../../packages/tokens/src/tokens.ts'

const root = resolve(import.meta.dir, '../../..')
const templateDir = join(import.meta.dir, 'templates')
export const boardDir = resolve(import.meta.dir, '../boards')

const read = (path: string): string => readFileSync(join(root, path), 'utf8')

function need<T>(value: T | undefined | null, what: string): T {
  if (value === undefined || value === null) throw new Error(`build-boards: missing ${what}`)
  return value
}

// ---------------------------------------------------------------------------------------------------------------
// Markdown

/** Plain text from inline Markdown: emphasis, code and links lose their marks. */
export function plain(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[\s(])_([^_]+)_(?=[\s).,;:]|$)/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

/** The first sentence or clause of a rule, for a narrow column; the full text stays in the spec. */
const firstSentence = (text: string): string => {
  let cut = /^(.+?)(?:\.(?=\s)|$)/.exec(text)?.[1] ?? text
  if (cut.length > 110) cut = /^(.+?)(?:;(?=\s)|$)/.exec(cut)?.[1] ?? cut
  return cut.endsWith('.') ? cut : `${cut}.`
}

interface Section {
  readonly level: number
  readonly title: string
  readonly body: string[]
}

/** Splits a Markdown file into its headed sections, in order. Front matter is dropped. */
function sections(md: string): Section[] {
  const out: Section[] = []
  let current: Section = { level: 0, title: '', body: [] }
  const lines = md.replace(/^---\n[\s\S]*?\n---\n/, '').split('\n')
  for (const line of lines) {
    const m = /^(#{1,6}) (.+)$/.exec(line)
    if (m) {
      out.push(current)
      current = { level: need(m[1], 'heading level').length, title: need(m[2], 'heading').trim(), body: [] }
    } else current.body.push(line)
  }
  out.push(current)
  return out
}

/** The tables under a heading, each as rows of cells (the header row first, the divider dropped). */
function tables(lines: readonly string[]): string[][][] {
  const out: string[][][] = []
  let table: string[][] | null = null
  for (const line of lines) {
    if (line.startsWith('|')) {
      const cells = line
        .slice(1, line.endsWith('|') ? -1 : undefined)
        .split('|')
        .map((cell) => cell.trim())
      if (cells.every((cell) => /^:?-+:?$/.test(cell))) continue
      if (!table) {
        table = []
        out.push(table)
      }
      table.push(cells)
    } else table = null
  }
  return out
}

/** Paragraphs (not lists or tables) of a section body. */
function paragraphs(lines: readonly string[]): string[] {
  const out: string[] = []
  let buf: string[] = []
  const flush = (): void => {
    if (buf.length) out.push(buf.join(' '))
    buf = []
  }
  for (const line of lines) {
    if (!line.trim() || line.startsWith('|') || line.startsWith('- ') || line.startsWith('#')) flush()
    else buf.push(line.trim())
  }
  flush()
  return out
}

function sectionTable(md: string, title: string, index = 0): string[][] {
  const section = need(
    sections(md).find((s) => s.title === title),
    `section "${title}"`
  )
  return need(tables(section.body)[index], `table ${index} under "${title}"`)
}

// ---------------------------------------------------------------------------------------------------------------
// Sources

const statusLabel: Readonly<Record<string, string>> = {
  official: 'Official',
  agreed: 'Agreed',
  proposed: 'Proposed',
  open: 'Open',
  retired: 'Retired'
}

const library: readonly KiSymbol[] = symbols
const symbolById = new Map(library.map((s) => [s.id, s]))
const symbol = (id: string): KiSymbol => need(symbolById.get(id), `symbol "${id}" in symbols.ts`)

/** Every glyph in packages/icons/svg, by name, as one line of SVG. */
const icons: ReadonlyMap<string, string> = new Map(
  readdirSync(join(root, 'packages/icons/svg'))
    .filter((f) => f.endsWith('.svg'))
    .sort()
    .map((f) => [f.slice(0, -4), read(`packages/icons/svg/${f}`).replace(/\s+/g, ' ').replace(/> </g, '><').trim()])
)

/** Every token value by its dotted path in tokens.json. */
const tokenValues: ReadonlyMap<string, unknown> = (() => {
  const out = new Map<string, unknown>()
  const walk = (node: unknown, path: string): void => {
    if (!node || typeof node !== 'object') return
    if ('$value' in node) {
      out.set(path, resolveValue((node as { $value: unknown }).$value))
      return
    }
    for (const [key, child] of Object.entries(node))
      if (!key.startsWith('$')) walk(child, path ? `${path}.${key}` : key)
  }
  walk(tokenDocument, '')
  return out
})()

const token = (path: string): string => {
  const value = need(tokenValues.get(path), `token "${path}" in tokens.json`)
  if (Array.isArray(value)) return value.join(', ')
  return String(value)
}

/** A CSS font stack from a token: names with spaces are single-quoted. */
const stack = (path: string): string => {
  const value = need(tokenValues.get(path), `token "${path}" in tokens.json`)
  if (!Array.isArray(value)) throw new Error(`build-boards: token "${path}" is not a font stack`)
  return value.map((name: string) => (/\s/.test(name) ? `'${name}'` : name)).join(', ')
}

const night = nightTerrain()

interface Decision {
  readonly id: string
  readonly n: string
  readonly title: string
  readonly summary: string
  readonly decision: string
  readonly date: string
  readonly type: string
  readonly path: string
}

/** The design decision records, in serial order. */
const decisions: readonly Decision[] = readdirSync(join(root, 'docs/decisions'))
  .filter((f) => /^GDR-KI-DESIGN-\d{3}-.+\.md$/.test(f))
  .sort()
  .map((file) => {
    const md = read(`docs/decisions/${file}`)
    const front = need(/^---\n([\s\S]*?)\n---/.exec(md)?.[1], `front matter in ${file}`)
    const field = (key: string): string => {
      const raw = need(new RegExp(`^${key}: (.+)$`, 'm').exec(front)?.[1], `${key} in ${file}`).trim()
      return raw.startsWith("'") ? raw.slice(1, -1).replace(/''/g, "'") : raw
    }
    const id = field('id')
    const section = need(
      sections(md).find((s) => s.title === 'Decision'),
      `Decision section in ${file}`
    )
    const first = need(paragraphs(section.body)[0], `decision paragraph in ${file}`)
    const bold = /^\*\*(.+?)\*\*/.exec(first)?.[1]
    const summary = plain(bold ?? need(/^.+?[.!?](?=\s|$)/.exec(first)?.[0], `first sentence in ${file}`))
    return {
      id,
      n: id.slice(-3),
      title: field('title'),
      summary,
      decision: plain(first),
      date: field('date'),
      type: field('decision_type'),
      path: `docs/decisions/${file}`
    }
  })

const decision = (n: string): Decision =>
  need(
    decisions.find((d) => d.n === n),
    `GDR-KI-DESIGN-${n}`
  )

interface OpenQuestion {
  readonly title: string
  readonly group: string
  readonly q: string
  readonly rec: string
  readonly meanwhile: string
  readonly affects: string
  readonly status: string
}

/** The open questions in docs/decisions/OPEN.md, in order. */
const openQuestions: readonly OpenQuestion[] = (() => {
  const out: OpenQuestion[] = []
  let group = ''
  for (const s of sections(read('docs/decisions/OPEN.md'))) {
    if (s.level === 2) group = s.title
    if (s.level !== 3) continue
    const bullet = (label: string): string => {
      const line = s.body.find((l) => l.startsWith(`- **${label}:**`))
      return line ? plain(line.slice(`- **${label}:**`.length)) : ''
    }
    const q = plain(paragraphs(s.body).join(' '))
    const hasTable = tables(s.body).length > 0
    out.push({
      title: s.title,
      group,
      q: hasTable ? `${q} (The comparison table is in OPEN.md.)` : q,
      rec: bullet('Recommendation'),
      meanwhile: bullet('Meanwhile'),
      affects: bullet('Affects'),
      status: bullet('Status')
    })
  }
  return out
})()

const openQuestion = (title: string): OpenQuestion =>
  need(
    openQuestions.find((q) => q.title === title),
    `open question "${title}" in OPEN.md`
  )

const manifest = JSON.parse(read('packages/tiles/sets/modern/manifest.json')) as {
  aliases: Record<string, string>
  conditions: Record<string, unknown>
  tiles: {
    id: string
    kind: string
    footprint: string
    orientation: number
    variants: number
    states?: string[]
    status?: string
    frames?: { loop: number }
    art: { width: number; height: number; framesDrawn: number }
  }[]
}

// ---------------------------------------------------------------------------------------------------------------
// Boards

interface Board {
  readonly file: string
  /** Position in the numbered review, when the board has one. */
  readonly n?: number
  readonly title: string
  /** The spec files the board reads from, as the Overview lists them. */
  readonly refs: string
  readonly height: number
  readonly data?: () => Record<string, unknown>
}

const svgUri = (svg: string): string => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
const navy = '#0f2440'

/** A dashed hex for a symbol with no glyph yet. */
const noGlyph =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8b94a3" stroke-width="1.2" stroke-dasharray="2 2"><path d="M12 2.5 L20.2 7.25 V16.75 L12 21.5 L3.8 16.75 V7.25 Z"/></svg>'

// ---- Icons ----------------------------------------------------------------------------------------------------

const briefGroups: Readonly<Record<string, string>> = {
  Symbols: 'Symbols',
  'Places within an island': 'Places',
  'Port modes': 'Port modes',
  'Instruments and app concepts': 'Instruments',
  'Steward roles': 'Roles',
  'UI basics': 'UI basics',
  'Value icons': 'Values'
}
const unbriefed = 'Not in the briefs'

function iconsData(): Record<string, unknown> {
  const briefs = new Map<string, { group: string; draw: string }>()
  const groupOrder: string[] = []
  for (const s of sections(read('docs/briefs/glyph-briefs.md'))) {
    const group = briefGroups[s.title]
    if (s.level !== 2 || !group) continue
    groupOrder.push(group)
    for (const row of tables(s.body)[0]?.slice(1) ?? []) {
      const id = need(/`([a-z0-9-]+)`/.exec(row[0] ?? '')?.[1], `glyph id in briefs row ${row[0]}`)
      briefs.set(id, { group, draw: plain(row[1] ?? '') })
    }
  }
  const values = new Map<string, { n: string; m: string }[]>()
  for (const row of sectionTable(read('docs/spec/iconography.md'), 'Value icons').slice(1)) {
    const glyph = need(/`([a-z0-9-]+)`/.exec(row[2] ?? '')?.[1], `value glyph ${row[0]}`)
    values.set(glyph, [
      ...(values.get(glyph) ?? []),
      { n: `Value: ${plain(row[0] ?? '')}`, m: `${plain(row[1] ?? '')}.` }
    ])
  }
  const rules = sectionTable(read('docs/spec/iconography.md'), 'The line-glyph specification')
    .slice(1)
    .map((row) => ({ k: plain(row[0] ?? ''), v: firstSentence(plain(row[1] ?? '')) }))

  const retired: Readonly<Record<string, string>> = retiredSymbols
  const data: Record<string, unknown> = {}
  const names = [...icons.keys()].sort((a, b) => {
    const ga = groupOrder.indexOf(briefs.get(a)?.group ?? unbriefed)
    const gb = groupOrder.indexOf(briefs.get(b)?.group ?? unbriefed)
    return (ga < 0 ? 99 : ga) - (gb < 0 ? 99 : gb) || (a < b ? -1 : 1)
  })
  for (const name of names) {
    const brief = briefs.get(name)
    const group = brief?.group ?? unbriefed
    const mapped = library.filter((s) => s.icon === name)
    const mean: { n: string; m: string; st: string; note: string }[] = mapped.map((s) => ({
      n: s.name,
      m: s.meaning,
      st: s.status as string,
      note: s.notes ?? ''
    }))
    for (const v of values.get(name) ?? [])
      mean.push({ ...v, st: 'official', note: 'Labels principles and values, never places.' })
    let st: string
    const retiredReason = retired[name] ?? retired[name.replace(/^role-/, '')]
    const renamedTo = (symbolAliases as Readonly<Record<string, string>>)[name]
    if (renamedTo) {
      st = 'retired'
      mean.push({
        n: 'Renamed',
        m: `Mapped to no symbol; the symbol is now ${symbol(renamedTo).name}, glyph ${symbol(renamedTo).icon ?? 'none'}.`,
        st,
        note: symbol(renamedTo).notes ?? ''
      })
    } else if (retiredReason) {
      st = 'retired'
      mean.push({ n: 'Retired', m: 'Mapped to no symbol; the glyph stays in the package.', st, note: retiredReason })
    } else if (mapped[0]) st = mapped[0].status
    else if (values.has(name)) st = 'official'
    else if (/\bproposed\b/i.test(brief?.draw ?? '') || group === 'Roles') st = 'proposed'
    else st = 'agreed'
    data[name] = {
      g: group,
      d: brief?.draw ?? 'No brief in docs/briefs/glyph-briefs.md yet.',
      st,
      sc: group === 'Instruments' ? 'App' : 'Both',
      mean,
      svg: need(icons.get(name), name)
    }
  }
  const missing = [...briefs.keys()].filter((id) => !icons.has(id))
  const extra = names.filter((n) => !briefs.has(n))
  const groups = ['All', ...groupOrder, ...(extra.length ? [unbriefed] : [])]
  const foot = [
    `${icons.size} glyphs in packages/icons/svg, grouped and briefed as docs/briefs/glyph-briefs.md lists them.`,
    `${names.filter((n) => library.some((s) => s.icon === n)).length} map to a symbol in symbols.ts.`,
    `Retired, mapped to no symbol: ${names.filter((n) => retired[n] ?? retired[n.replace(/^role-/, '')]).join(', ')}.`,
    extra.length ? `Drawn but not briefed: ${extra.join(', ')}.` : 'Every glyph has a brief.',
    missing.length ? `Briefed but not drawn: ${missing.join(', ')}.` : '',
    'One 24 px drawing per glyph: the 16 px redraws are not drawn yet, so 16 and 20 here are scaled.'
  ]
  return { icons: data, groups, rules, foot: foot.filter(Boolean).join(' ') }
}

// ---- Meaning --------------------------------------------------------------------------------------------------

const categoryLabels: Readonly<Record<string, string>> = {
  geography: 'Geography',
  zone: 'Zones',
  structure: 'Structures',
  'port-mode': 'Port modes',
  sea: 'Sea',
  signal: 'Signals',
  condition: 'Conditions',
  role: 'Steward roles'
}

/** Decals for the condition states, which have no glyph of their own. */
function conditionDecal(kind: string): string {
  const hex = 'M12 2.5 L20.2 7.25 V16.75 L12 21.5 L3.8 16.75 V7.25 Z'
  const house =
    '<path d="M8 17 V12 L12 9 L16 12 V17 Z" fill="#fffaf0" stroke="#0f2440" stroke-width="1.3" stroke-linejoin="round"/>'
  const extra: Readonly<Record<string, string>> = {
    thriving:
      '<rect x="11" y="13" width="2" height="2.4" fill="#c8963c"/><path d="M14.5 9.5 C14 8 15.5 7.2 15 5.6" stroke="#4a5568" stroke-width="1" fill="none" stroke-linecap="round"/>',
    quiet: '<rect x="11" y="13" width="2" height="2.4" fill="#d4c9b4"/>',
    weathered:
      '<path d="M9.5 12.5 L10.5 14 L9.8 15.5" stroke="#9b2c1c" stroke-width="0.9" fill="none"/><circle cx="15" cy="16" r="1" fill="#2d5a3d"/><circle cx="16" cy="14.8" r="0.8" fill="#2d5a3d"/><circle cx="8.6" cy="16.2" r="0.8" fill="#2d5a3d"/>'
  }
  const fill: Readonly<Record<string, string>> = { thriving: '#dfe9e1', quiet: '#e3e8ef', weathered: '#f1e8d3' }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${hex}" fill="${fill[kind]}" stroke="#0f2440" stroke-width="1"/>${house}${extra[kind]}</svg>`
}

/** Normalised table keys: "`Admin/Governance` (what must hold)" and "Admin / Governance" both read admin/governance. */
const key = (text: string): string =>
  plain(text)
    .toLowerCase()
    .replace(/\s*\(.*$/, '')
    .replace(/\s*\/\s*/g, '/')
    .trim()

function meaningData(): Record<string, unknown> {
  const md = read('docs/spec/meaning.md')
  interface Row {
    drawn: string
    site: string
    app: string
  }
  const rows = new Map<string, Row>()
  for (const s of sections(md)) {
    for (const table of tables(s.body)) {
      const head = (table[0] ?? []).map((h) => plain(h).toLowerCase())
      const drawnAt = head.findIndex((h) => h.startsWith('drawn as'))
      if (drawnAt < 0) continue
      for (const row of table.slice(1)) {
        const cell = (name: string): string => {
          const i = head.indexOf(name)
          const value = i < 0 ? '' : plain(row[i] ?? '')
          return value === '—' ? '-' : value
        }
        rows.set(key(row[0] ?? ''), { drawn: plain(row[drawnAt] ?? ''), site: cell('site'), app: cell('app') })
      }
    }
  }
  const lookup = (s: KiSymbol): Row | undefined => {
    const name = key(s.name)
    for (const [k, v] of rows) {
      if (k === name || k === s.id.replace(/-/g, ' ') || k.split('/')[0]?.trim() === name) return v
      if (k.startsWith(`${name} `) || name.startsWith(`${k} `)) return v
    }
    return undefined
  }
  const nameOf = (s: KiSymbol): string => s.name.toLowerCase().replace(/\s*\(.*\)$/, '')
  const out = library.map((s) => {
    const row = lookup(s)
    const site = s.site ?? row?.site ?? ''
    const app = s.app ?? row?.app ?? ''
    const glyph = s.icon && icons.has(s.icon) ? s.icon : ''
    const svg = glyph
      ? need(icons.get(glyph), glyph).replace(/currentColor/g, navy)
      : s.category === 'condition' && s.id !== 'ruined'
        ? conditionDecal(s.id)
        : noGlyph
    const text = `${s.meaning} ${s.notes ?? ''} ${row?.drawn ?? ''}`.toLowerCase()
    const named = library.filter((o) => o.id !== s.id && new RegExp(`\\b${nameOf(o)}\\b`).test(text)).map((o) => o.id)
    const kin = library.filter((o) => o.id !== s.id && o.category === s.category && !named.includes(o.id))
    const rel = [...named, ...kin.map((o) => o.id)].slice(0, 4)
    return {
      id: s.id,
      name: s.name,
      cat: s.category,
      status: s.status,
      scope: app === '-' ? 'Site' : site === '-' ? 'App' : 'Both',
      meaning: s.meaning,
      drawn: row?.drawn || 'Not described in docs/spec/meaning.md.',
      site: site && site !== '-' ? site : 'Not shown.',
      app: app && app !== '-' ? app : 'Not shown.',
      rel,
      key: /\bGDR-/.test(s.notes ?? ''),
      note: s.notes ?? '',
      src: svgUri(svg),
      glyph: glyph || (s.category === 'condition' && s.id !== 'ruined' ? 'condition decal' : 'none yet')
    }
  })
  const cats = symbolCategories.map((c) => [c, need(categoryLabels[c], `label for category ${c}`)])
  const retired = Object.keys(retiredSymbols).join(', ')
  return { symbols: out, cats, retired }
}

// ---- Decisions ------------------------------------------------------------------------------------------------

const decisionsHeight = (): number => {
  const rows = Math.max(decisions.length, openQuestions.length)
  return Math.max(1100, Math.ceil((300 + rows * 37 + 260) / 50) * 50)
}

function decisionsData(): Record<string, unknown> {
  return {
    agreed: decisions.map((d) => ({ ...d, scope: d.type })),
    open: openQuestions,
    groups: [...new Set(openQuestions.map((q) => q.group))]
  }
}

// ---- Tiles ----------------------------------------------------------------------------------------------------

function tilesData(): Record<string, unknown> {
  // The geometry drawing in the template is drawn to these numbers; fail rather than show a stale drawing.
  const drawn = { width: 256, height: 148, plinth: 48, rowStep: 111, oddRowOffset: 128 }
  for (const [k, v] of Object.entries(drawn))
    if ((tileGeometry as Record<string, unknown>)[k] !== v)
      throw new Error(`build-boards: tileGeometry.${k} changed; redraw the Geometry panel in templates/DsTiles.dc.html`)
  const tiles = manifest.tiles.map((t) => ({
    id: t.id,
    k: t.kind,
    fp: t.footprint,
    o: t.orientation,
    v: t.variants,
    w: t.art.width,
    h: t.art.height,
    loop: t.frames?.loop ?? 1,
    st: t.states?.length ?? 0,
    status: t.status ?? ''
  }))
  const variants = [...new Set(manifest.tiles.map((t) => t.variants))].sort()
  const loops = manifest.tiles.filter((t) => t.frames).map((t) => `${t.kind}/${t.id} ${t.frames?.loop}`)
  const drawnFrames = [...new Set(manifest.tiles.map((t) => t.art.framesDrawn))].sort()
  const big = manifest.tiles.filter((t) => t.footprint !== 'single').map((t) => `${t.id} (${t.footprint})`)
  const aliases = Object.entries(manifest.aliases).map(([from, to]) => `${from} → ${to}`)
  const gaps = [
    `Variants: the manifest has ${variants.join(' or ')} everywhere; the briefs target 3 for terrain and the hero structures.`,
    `Loops declared: ${loops.join(', ')}. Frames drawn: ${drawnFrames.join(', ')} (the still) for every tile.`,
    `Footprints beyond single: ${big.join(', ')}. Only the Capital's flower is fixed by the contract; the rest are the set's choice.`,
    aliases.length ? `Deprecated aliases, still resolved: ${aliases.join(', ')}.` : 'No deprecated aliases.'
  ]
  const motion = sectionTable(read('docs/spec/motion.md'), 'What moves')
    .slice(1)
    .map((row) => {
      const element = row[0] ?? ''
      const loop = Number.parseInt(row[1] ?? '', 10)
      return [
        plain(element.replace(/\s*\(_proposed_\)/, '')),
        Number.isNaN(loop) ? 0 : loop,
        plain(row[2] ?? ''),
        /_proposed_/.test(element) ? 'proposed' : 'agreed'
      ]
    })
  const families = sectionTable(read('docs/spec/tiles-and-buildings.md'), 'Building standards')
    .slice(1)
    .map((row) => row.map(plain))
  return { manifest: { tiles, conditions: manifest.conditions }, gaps, motion, families }
}

// ---- Type -----------------------------------------------------------------------------------------------------

function typeData(): Record<string, unknown> {
  const md = read('docs/spec/typography.md')
  const site = sectionTable(md, 'Site type scale')
    .slice(1)
    .map((row) => {
      const size = plain(row[2] ?? '')
      const m = need(/(\d+)(?:px\))?\s*\/\s*([\d.]+)/.exec(size), `size in ${row[0]}`)
      const tracking = plain(row[4] ?? '').replace('−', '-')
      return {
        token: plain(row[0] ?? ''),
        face: plain(row[1] ?? ''),
        size: Number(m[1]),
        lh: need(m[2], 'line height'),
        weight: Number(plain(row[3] ?? '400')),
        tracking: tracking === '0' ? '' : tracking.replace(' em', 'em'),
        use: plain(
          `${row[5] ?? ''}${/\(.+\)/.exec(size) && !size.startsWith('clamp') ? ` · ${/\((.+)\)/.exec(size)?.[1]}` : ''}`
        ),
        spec: size
      }
    })
  const app = sectionTable(md, 'App type scale (reference values)')
    .slice(1)
    .map((row) => {
      const size = plain(row[2] ?? '')
      const m = /(\d+)\s*\/\s*(\d+)/.exec(size)
      return {
        token: plain(row[0] ?? ''),
        face: plain(row[1] ?? ''),
        size: m ? Number(m[1]) : 0,
        lh: m ? Number(m[2]) : 0,
        use: plain(row[3] ?? '')
      }
    })
  return { siteScale: site, appScale: app }
}

// ---- Overview, Structure, Arcadia -----------------------------------------------------------------------------

function overviewData(): Record<string, unknown> {
  return {
    boardList: boards.filter((b) => b.n).map((b) => [boardTitle(b), b.refs])
  }
}

function structureData(): Record<string, unknown> {
  const md = read('docs/decisions/GDR-KI-DESIGN-011-voyage-and-atlas.md')
  const line = need(/\*\*Voyage\*\*.*?: (.+?)\.?$/m.exec(md)?.[1], 'the Voyage order in GDR-KI-DESIGN-011')
  return { voyage: line.split('→').map((page) => plain(page).toLowerCase()) }
}

// ---- The registry ---------------------------------------------------------------------------------------------

const boards: readonly Board[] = [
  {
    file: 'DsOverview.dc.html',
    n: 1,
    title: 'Overview — essence, world, how to read',
    refs: 'DESIGN.md, world.md',
    height: 1050,
    data: overviewData
  },
  {
    file: 'DsMeaning.dc.html',
    n: 2,
    title: 'Meaning — the symbol library',
    refs: 'meaning.md',
    height: 1100,
    data: meaningData
  },
  { file: 'DsColour.dc.html', n: 3, title: 'Colour — day and night', refs: 'colour.md', height: 1100 },
  {
    file: 'DsType.dc.html',
    n: 4,
    title: 'Type and voice',
    refs: 'typography.md, voice.md',
    height: 1000,
    data: typeData
  },
  {
    file: 'DsIcons.dc.html',
    n: 5,
    title: `Icons — all ${icons.size} glyphs`,
    refs: 'iconography.md',
    height: 1100,
    data: iconsData
  },
  {
    file: 'DsTiles.dc.html',
    n: 6,
    title: 'Tiles, buildings and motion',
    refs: 'tiles-and-buildings.md, motion.md',
    height: 1100,
    data: tilesData
  },
  {
    file: 'DsStructure.dc.html',
    n: 7,
    title: 'Structure — the site (Voyage and Atlas) and the local app (four jobs)',
    refs: 'layout.md, components.md',
    height: 1100,
    data: structureData
  },
  {
    file: 'DsDecisions.dc.html',
    n: 8,
    title: 'Decisions and open questions',
    refs: 'docs/decisions/',
    height: decisionsHeight(),
    data: decisionsData
  },
  { file: 'DsArcadia.dc.html', title: 'Arcadia — the reference painting', refs: 'illustration.md', height: 1100 }
]

const numbered = boards.filter((b) => b.n).length
const boardTitle = (b: Board): string => b.title

// ---------------------------------------------------------------------------------------------------------------
// Rendering

const escapeHtml = (text: string): string =>
  text.replace(/[&<>"]/g, (c) => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot' }[c]};`)

/** JSON safe to embed in an inline script. */
const json = (value: unknown): string =>
  JSON.stringify(value)
    .replace(/<\//g, '<\\/')
    .replace(/<!--/g, '<\\!--')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

const count = (what: string): number => {
  const counts: Readonly<Record<string, number>> = {
    icons: icons.size,
    symbols: library.length,
    decisions: decisions.length,
    open: openQuestions.length,
    core: [...tokenValues.keys()].filter((k) => k.startsWith('color.core.')).length,
    terrain: terrainNames.length,
    contract: tileKinds.reduce((n, k) => n + requiredInventory[k].length, 0),
    'contract.terrain': requiredInventory.terrain.length,
    'contract.structure': requiredInventory.structure.length,
    'contract.decal': requiredInventory.decal.length,
    'contract.connector': requiredInventory.connector.length,
    boards: numbered
  }
  return need(counts[what], `count "${what}"`)
}

/** Glyphs a template names in quotes, as a name-to-SVG map for its `icons()` method. */
function iconSubset(template: string): Record<string, string> {
  const used = [...new Set([...template.matchAll(/'([a-z][a-z0-9-]+)'/g)].map((m) => need(m[1], 'name')))]
    .filter((n) => icons.has(n))
    .sort()
  return Object.fromEntries(used.map((n) => [n, need(icons.get(n), n)]))
}

function render(board: Board, template: string): string {
  const data = board.data?.() ?? {}
  const statusOf = (id: string): string => need(statusLabel[symbol(id).status], `label for ${id}`)
  const resolveMarker = (kind: string, arg: string): string => {
    switch (kind) {
      case 'json':
        return json(need(data[arg], `data "${arg}" for ${board.file}`))
      case 'icons':
        return json(iconSubset(template))
      case 'height':
        return String(board.height)
      case 'kicker':
        return board.n ? `Design system · ${board.n} of ${numbered}` : 'Design system · the reference'
      case 'title':
        return escapeHtml(board.title)
      case 'count':
        return String(count(arg))
      case 'token':
        return token(arg)
      case 'stack':
        return stack(arg)
      case 'night':
        return need(night[arg as keyof typeof night], `night terrain "${arg}"`)
      case 'ratio': {
        const [a, b] = arg.split(',')
        return contrastRatio(token(need(a, 'ratio colour')), token(need(b, 'ratio colour'))).toFixed(2)
      }
      case 'status':
        return statusOf(arg)
      case 'status-lc':
        return statusOf(arg).toLowerCase()
      case 'symbol-name':
        return escapeHtml(symbol(arg).name)
      case 'open':
        return openQuestion(arg) ? 'Open' : ''
      case 'gdr':
        return decision(arg).id
      case 'gdr-title':
        return escapeHtml(decision(arg).title)
      case 'gdr-summary':
        return escapeHtml(decision(arg).summary)
      default:
        throw new Error(`build-boards: unknown marker @@${kind}${arg ? `:${arg}` : ''}@@ in ${board.file}`)
    }
  }
  const out = template.replace(/@@([a-z-]+)(?::([^@\n]*))?@@/g, (_m, kind: string, arg: string | undefined) =>
    resolveMarker(kind, arg ?? '')
  )
  if (out.includes('@@')) throw new Error(`build-boards: unresolved marker left in ${board.file}`)
  return out
}

/** The gap kept between the lowest design-system board and the hand-placed Observatory row. */
export const observatoryGap = 420

type CanvasBoard = { x?: number; y?: number; title?: string; h?: number }
type Canvas = { boards: Record<string, CanvasBoard>; notes?: Record<string, { y?: number }> }

/**
 * Keeps the hand-placed Observatory row (`Obs*` boards and the `obstitle` note) clear of the generated `Ds*` boards.
 * When any `Obs*` board starts above the lowest `Ds*` board's bottom edge plus {@link observatoryGap}, the whole row
 * and its title move down together by the shortfall; a row already clear is left exactly where it was.
 */
export function clearObservatoryRow<T extends Canvas>(canvas: T): T {
  const entries = Object.entries(canvas.boards)
  const dsBottom = Math.max(
    ...entries.filter(([file]) => file.startsWith('Ds')).map(([, b]) => (b.y ?? 0) + (b.h ?? 0))
  )
  const obs = entries.filter(([file]) => file.startsWith('Obs')).map(([, b]) => b)
  if (obs.length === 0 || !Number.isFinite(dsBottom)) return canvas
  const shift = dsBottom + observatoryGap - Math.min(...obs.map((b) => b.y ?? 0))
  if (shift <= 0) return canvas
  for (const b of obs) b.y = (b.y ?? 0) + shift
  const title = canvas.notes?.['obstitle']
  if (title) title.y = (title.y ?? 0) + shift
  return canvas
}

/**
 * canvas.json with each generated board's title and height, and the Observatory row pushed clear of them; every
 * other position, the order and every other board are kept.
 */
function renderCanvas(current: string): string {
  const canvas = JSON.parse(current) as Canvas
  for (const b of boards) {
    const entry = need(canvas.boards[b.file], `${b.file} in canvas.json`)
    entry.title = b.n ? `${b.n} · ${b.title}` : b.title
    entry.h = b.height
  }
  return `${JSON.stringify(clearObservatoryRow(canvas), null, 2)}\n`
}

/** Every generated file, keyed by its name in the boards folder. */
export function buildBoards(): Map<string, string> {
  const out = new Map<string, string>()
  for (const b of boards) out.set(b.file, render(b, readFileSync(join(templateDir, b.file), 'utf8')))
  out.set('canvas.json', renderCanvas(readFileSync(join(boardDir, 'canvas.json'), 'utf8')))
  return out
}

/** The generated files that differ from the committed boards. */
export function staleBoards(built: Map<string, string> = buildBoards()): string[] {
  const stale: string[] = []
  for (const [file, content] of built) {
    let committed = ''
    try {
      committed = readFileSync(join(boardDir, file), 'utf8')
    } catch {
      committed = ''
    }
    if (committed !== content) stale.push(file)
  }
  return stale
}

if (import.meta.main) {
  const built = buildBoards()
  if (process.argv.includes('--check')) {
    const stale = staleBoards(built)
    if (stale.length) {
      console.error(`Boards out of date: ${stale.join(', ')}. Run: bun run self:boards`)
      process.exit(1)
    }
    console.log(`${built.size} board files match their sources.`)
  } else {
    for (const [file, content] of built) writeFileSync(join(boardDir, file), content)
    console.log(`Wrote ${built.size} board files to docs/design-review/boards.`)
  }
}
