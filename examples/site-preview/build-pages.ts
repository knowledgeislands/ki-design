/**
 * Fills the generated blocks of the site preview's pages:
 *
 *   index.html        sprite · header · rail · arcadia · banner · footer
 *   field-guide.html  sprite · header · filters · symbols · howmap · footer
 *
 *   bun examples/site-preview/build-pages.ts      (run build-hero.ts first for the hero map)
 *
 * Glyphs come from @knowledgeislands/icons, symbol cards from @knowledgeislands/symbols, maps from build-hero.ts
 * (which uses @knowledgeislands/hexmap geometry). Imports are relative source paths so no workspace install is needed.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { hexCorners, toPixel } from '../../packages/hexmap/src/geometry.ts'
import { iconBodies, iconNames } from '../../packages/icons/src/icons.generated.ts'
import { symbols } from '../../packages/symbols/src/symbols.ts'
import { symbolCategories } from '../../packages/symbols/src/types.ts'
import { arcadia, mix, renderIso, splice } from './build-hero.ts'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')
const tokens = JSON.parse(readFileSync(join(root, 'packages/tokens/tokens.json'), 'utf8'))
const terrainFill: Record<string, string> = Object.fromEntries(
  Object.entries(tokens.color.terrain as Record<string, { $value: string }>).map(([k, v]) => [k, v.$value])
)

const esc = (t: string): string =>
  t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)
const f = (n: number): string => (Math.round(n * 100) / 100).toString()

// ---------------------------------------------------------------------------------------------------------------
// Sprite: every glyph in packages/icons; the preview draws none of its own.

function sprite(): string {
  const parts = [
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">',
    ...iconNames.map((n) => `<symbol id="ki-${n}" viewBox="0 0 24 24">${iconBodies[n]}</symbol>`),
    '</svg>'
  ]
  return parts.join('\n')
}

const glyph = (name: string, cls = 'g'): string =>
  `<svg class="${cls}" aria-hidden="true"><use href="#ki-${name}"/></svg>`

// ---------------------------------------------------------------------------------------------------------------
// Header and footer: the Voyage and the Atlas (docs/spec/layout.md)

const LIVE = 'https://knowledgeislands.info'
const voyage = [
  { label: 'Philosophy', href: `${LIVE}/philosophy/` },
  { label: 'Model', href: `${LIVE}/model/` },
  { label: 'Arcadia', href: 'index.html#arcadia' },
  { label: 'Landscapes', href: 'index.html#step-5' },
  { label: 'Create', href: 'index.html#step-6' }
]
const atlas = [
  { label: 'Field Guide', href: 'field-guide.html' },
  { label: 'Docs', href: `${LIVE}/docs/` },
  { label: 'Specifications', href: `${LIVE}/specifications/` },
  { label: 'Projects', href: `${LIVE}/projects/` }
]

const navList = (items: typeof voyage, current: string): string =>
  `<ul>${items
    .map((i) => `<li><a href="${i.href}"${i.label === current ? ' aria-current="page"' : ''}>${i.label}</a></li>`)
    .join('')}</ul>`

function header(current: string): string {
  return `<header class="site-header" data-theme="night">
  <div class="wrap">
    <a class="brand" href="index.html"${current === 'Home' ? ' aria-current="page"' : ''}><img src="assets/logo-roundel.png" width="44" height="44" alt=""><span>Knowledge Islands</span></a>
    <nav class="nav" aria-label="Main">
      <div class="nav-group"><span class="nav-label" id="nav-voyage">Voyage</span>${navList(voyage, current).replace('<ul>', '<ul aria-labelledby="nav-voyage">')}</div>
      <div class="nav-group"><span class="nav-label" id="nav-atlas">Atlas</span>${navList(atlas, current).replace('<ul>', '<ul aria-labelledby="nav-atlas">')}</div>
    </nav>
    <a class="btn btn-brass header-cta" href="index.html#arcadia">Enter Arcadia</a>
    <details class="nav-menu">
      <summary>${glyph('menu', 'g g-20')}Menu</summary>
      <nav class="menu-panel" aria-label="Main, compact">
        <div><span class="nav-label">Voyage</span>${navList(voyage, current)}</div>
        <div><span class="nav-label">Atlas</span>${navList(atlas, current)}</div>
        <a class="btn btn-brass" href="index.html#arcadia">Enter Arcadia</a>
      </nav>
    </details>
  </div>
</header>`
}

function footer(): string {
  const list = (items: typeof voyage): string =>
    `<ul>${items.map((i) => `<li><a href="${i.href}">${i.label}</a></li>`).join('')}</ul>`
  return `<footer class="site-footer" data-theme="night">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="index.html"><img src="assets/logo-roundel.png" width="44" height="44" alt=""><span>Knowledge Islands</span></a>
        <p>A model for building, governing, and evolving knowledge — across individuals, teams, and generations.</p>
        <p class="meta" style="color:var(--night-muted)">Tools change. Landscapes endure.</p>
      </div>
      <nav aria-labelledby="foot-voyage">
        <h2 id="foot-voyage">The Voyage</h2>
        <p class="meta">Read once, in order</p>
        ${list([{ label: 'Home', href: 'index.html' }, ...voyage])}
      </nav>
      <nav aria-labelledby="foot-atlas">
        <h2 id="foot-atlas">The Atlas</h2>
        <p class="meta">Returned to, to look things up</p>
        ${list(atlas)}
      </nav>
    </div>
    <div class="foot-base">
      <span>Preview of the redesigned knowledgeislands.info, built from <code>ki-design</code>. Not the live site.</span>
      <span>Stable routes stay put: <code>/install/ki</code> · <code>/harness/bootstrap</code></span>
    </div>
  </div>
</footer>`
}

// ---------------------------------------------------------------------------------------------------------------
// Journey rail: the canon sequence (docs/spec/layout.md, components.md)

const rail = [
  { title: 'The Problem', d: 'Why our current systems fail', glyph: 'reef', href: `${LIVE}/philosophy/` },
  { title: 'A New Paradigm', d: 'Introducing living knowledge', glyph: 'celestial-guide', href: `${LIVE}/philosophy/` },
  { title: 'The Islands', d: 'Understanding the geography', glyph: 'island', href: `${LIVE}/model/` },
  { title: 'Stewardship', d: 'Governance and agents', glyph: 'council-hall', href: `${LIVE}/model/` },
  { title: 'Landscapes', d: 'Many forms, one philosophy', glyph: 'archipelago', href: '#step-5', planned: true },
  { title: 'Create', d: 'Build your own island', glyph: 'workshop', href: '#step-6', planned: true }
]

const hexFrame = (current: boolean): string =>
  `<svg class="hexframe" viewBox="0 0 56 64" aria-hidden="true"><polygon points="28,1.5 54.5,16.75 54.5,47.25 28,62.5 1.5,47.25 1.5,16.75" fill="${current ? '#0f2440' : '#f5efe0'}" stroke="#c8963c" stroke-width="${current ? 2 : 1}"/>${current ? '<polygon points="28,6.5 50,19.25 50,44.75 28,57.5 6,44.75 6,19.25" fill="none" stroke="#c8963c" stroke-opacity="0.45" stroke-width="1"/>' : ''}</svg>`

function railHtml(): string {
  return rail
    .map((s, i) => {
      const current = i === 0
      return `<li id="step-${i + 1}"${current ? ' class="current"' : ''}><a href="${s.href}"><span class="hexbadge">${hexFrame(current)}${glyph(s.glyph)}</span><span class="rail-num">${String(i + 1).padStart(2, '0')}</span><strong>${s.title}</strong><span class="d">${s.d}</span>${current ? '<span class="here">Start here</span>' : ''}${s.planned ? '<span class="d" style="font-style:italic">Page planned</span>' : ''}</a></li>`
    })
    .join('\n')
}

// ---------------------------------------------------------------------------------------------------------------
// Field Guide

const categoryInfo: Record<string, { title: string; intro: string; voyage: { label: string; href: string } }> = {
  geography: {
    title: 'Geography',
    intro: 'From realm to island: the shapes knowledge takes on the chart.',
    voyage: { label: 'The Wider Picture', href: 'index.html#wider-title' }
  },
  zone: {
    title: 'Zones',
    intro: "The places on every island. A repository's own folders draw its island.",
    voyage: { label: 'The Home', href: 'index.html#home-title' }
  },
  structure: {
    title: 'Structures',
    intro: 'Buildings that stand for what an island does.',
    voyage: { label: 'The Home', href: 'index.html#home-title' }
  },
  'port-mode': {
    title: 'Port modes',
    intro: 'How knowledge reaches an island: the districts of one Port.',
    voyage: { label: 'The Cycle', href: 'index.html#cycle-title' }
  },
  sea: {
    title: 'The sea',
    intro: 'Routes, currents and hazards between the islands.',
    voyage: { label: 'The Cycle', href: 'index.html#cycle-title' }
  },
  signal: {
    title: 'Signals',
    intro: 'Marks that ask for attention. Every signal has a shape and a word, never colour alone.',
    voyage: { label: 'The Cycle', href: 'index.html#cycle-title' }
  },
  condition: {
    title: 'Condition',
    intro: 'How well a place is tended, from the freshness of its evidence. Never a score.',
    voyage: { label: 'The Foundation', href: 'index.html#foundation-title' }
  },
  role: {
    title: 'Workers and roles',
    intro: 'Agents, human or AI, are workers. A role is a hat, not a species.',
    voyage: { label: 'The Wider Picture', href: 'index.html#wider-title' }
  }
}

const statusLabel: Record<string, string> = { official: 'Official', agreed: 'Agreed', proposed: 'Proposed' }

function symbolsHtml(): { filters: string; sections: string } {
  const filters = [
    `<button class="chip" type="button" data-filter="all" aria-pressed="true">All<span class="n">${symbols.length}</span></button>`,
    ...symbolCategories.map((c) => {
      const n = symbols.filter((s) => s.category === c).length
      return `<button class="chip" type="button" data-filter="${c}" aria-pressed="false">${categoryInfo[c]?.title ?? c}<span class="n">${n}</span></button>`
    })
  ].join('\n')
  const sections = symbolCategories
    .map((c) => {
      const info = categoryInfo[c] ?? { title: c, intro: '', voyage: { label: 'Home', href: 'index.html' } }
      const items = symbols
        .filter((s) => s.category === c)
        .map((s) => {
          const icon = s.icon
            ? `<span class="roundel" aria-hidden="true">${glyph(s.icon)}</span>`
            : '<span class="roundel empty" title="No glyph yet" aria-hidden="true"><svg class="g" viewBox="0 0 24 24"><path d="M12 4 L18.9 8 V16 L12 20 L5.1 16 V8 Z" stroke-dasharray="2 2.4"/></svg></span>'
          const note = s.notes ? `<p class="sym-note">${esc(s.notes)}</p>` : ''
          const noGlyph = s.icon ? '' : ' <span class="meta">No glyph yet</span>'
          return `<li class="sym" id="sym-${s.id}">${icon}<div><h3 class="display-xs">${esc(s.name)}</h3><div class="sym-meta"><span class="badge badge-${s.status}">${statusLabel[s.status]}</span><code>${s.id}</code>${noGlyph}</div><p>${esc(s.meaning)}</p>${note}</div></li>`
        })
        .join('\n')
      return `<section class="guide-section" data-category="${c}" aria-labelledby="cat-${c}">
  <div class="wrap">
    <header><h2 id="cat-${c}" class="display-m">${info.title}</h2><p class="muted">${info.intro} <a href="${info.voyage.href}">Explained in the Voyage: ${info.voyage.label}</a></p></header>
    <ul class="sym-grid">
${items}
    </ul>
  </div>
</section>`
    })
    .join('\n')
  return { filters, sections }
}

// "How the map works": hex topology → data layers → isometric render → map (docs/spec/illustration.md, world.md).
function flatPanel(kind: 'topology' | 'layers'): string {
  const size = 22
  const pts = arcadia.hexes.map((h) => ({ h, p: toPixel(h, size) }))
  const xs = pts.map((v) => v.p.x)
  const ys = pts.map((v) => v.p.y)
  const minX = Math.min(...xs) - size * 1.2
  const minY = Math.min(...ys) - size * 1.4
  const w = Math.max(...xs) - minX + size * 1.2
  const h = Math.max(...ys) - minY + size * 1.4
  const o: string[] = []
  const vbW = h * (4 / 3)
  const offX = minX - (vbW - w) / 2
  o.push(
    `<svg viewBox="${f(offX)} ${f(minY)} ${f(vbW)} ${f(h)}" role="img" aria-label="${kind === 'topology' ? 'The hex lattice of Arcadia: identity and adjacency, no art' : 'The same lattice carrying data: terrain fills, routes and structures'}">`
  )
  o.push(`<rect x="${f(offX)}" y="${f(minY)}" width="${f(vbW)}" height="${f(h)}" fill="#f5efe0"/>`)
  for (const { h: hx } of pts) {
    const c = hexCorners(hx, size - 0.6)
      .map((p) => `${f(p.x)},${f(p.y)}`)
      .join(' ')
    const landish = hx.terrain !== 'ocean'
    if (kind === 'topology')
      o.push(
        `<polygon points="${c}" fill="none" stroke="#2d5a3d" stroke-opacity="${landish ? 0.85 : 0.28}" stroke-width="${landish ? 1.1 : 0.8}"/>`
      )
    else
      o.push(
        `<polygon points="${c}" fill="${landish ? terrainFill[hx.terrain] : '#d6e3e1'}" stroke="${mix('#1a2030', '#f5efe0', 0.4)}" stroke-width="0.7"/>`
      )
  }
  if (kind === 'layers') {
    for (const r of arcadia.routes ?? []) {
      const a = toPixel(r.from, size)
      const b = toPixel(r.to, size)
      o.push(
        `<path d="M${f(a.x)} ${f(a.y)} L${f(b.x)} ${f(b.y)}" stroke="#8a5a12" stroke-width="2" stroke-linecap="round" ${r.kind === 'pending' ? 'stroke-dasharray="4 4"' : ''}/>`
      )
    }
    for (const { h: hx, p } of pts)
      if (hx.structure && hx.structure !== 'cottage')
        o.push(`<circle cx="${f(p.x)}" cy="${f(p.y)}" r="5" fill="#f5efe0" stroke="#1a2030" stroke-width="1.4"/>`)
  }
  o.push('</svg>')
  return o.join('')
}

function howMap(): string {
  const iso = (glyphs: boolean, id: string): string =>
    renderIso(arcadia, {
      w: 64,
      theme: 'day',
      glyphs,
      routes: glyphs,
      lamps: false,
      lattice: glyphs,
      lanes: false,
      pad: [6, 14, 6, 14],
      id,
      title: glyphs ? 'The finished map: terrain, structures and routes together' : 'The isometric render: height, plinths and terrain motifs, no structures yet',
      desc: 'Arcadia, rendered from the same hex data.'
    })
  const steps = [
    { t: 'Hex topology', d: 'The grid is the truth: each hex holds identity, terrain and adjacency. Routes are computed here.', art: flatPanel('topology') },
    { t: 'Data and layers', d: 'Terrain, routes and structures are data on the hexes. The flat map is the Modern twin used in the app and in print.', art: flatPanel('layers') },
    { t: 'Isometric render', d: 'The same data in 2:1 dimetric: plinths, height and light from the top-left. Nothing is invented.', art: iso(false, 'how3') },
    { t: 'The map', d: 'Structures stand on their hexes and routes join them. Either tile set can paint it without changing the data.', art: iso(true, 'how4') }
  ]
  return steps
    .map(
      (s, i) =>
        `<li class="reveal"><div class="frame"${i > 1 ? ' style="background:#d6e3e1"' : ''}>${s.art}</div><h3><span class="step-num">${String(i + 1).padStart(2, '0')}</span>${s.t}</h3><p>${s.d}</p></li>`
    )
    .join('\n')
}

// ---------------------------------------------------------------------------------------------------------------
// Main

const indexPath = join(here, 'index.html')
let index = readFileSync(indexPath, 'utf8')
index = splice(index, 'sprite', sprite())
index = splice(index, 'header', header('Home'))
index = splice(index, 'footer', footer())
index = splice(index, 'rail', railHtml())
index = splice(
  index,
  'arcadia',
  renderIso(arcadia, {
    w: 70,
    theme: 'day',
    lamps: false,
    lanes: true,
    pad: [36, 70, 30, 70],
    id: 'plate',
    title: 'Arcadia by daylight, in the Modern tile set'
  })
)
index = splice(
  index,
  'banner',
  renderIso(arcadia, { w: 58, theme: 'night', lamps: true, lanes: true, pad: [20, 120, 10, 60], id: 'banner', title: 'Arcadia at night' })
)
writeFileSync(indexPath, index)

const guidePath = join(here, 'field-guide.html')
let guide = readFileSync(guidePath, 'utf8')
const { filters, sections } = symbolsHtml()
guide = splice(guide, 'sprite', sprite())
guide = splice(guide, 'header', header('Field Guide'))
guide = splice(guide, 'footer', footer())
guide = splice(guide, 'filters', filters)
guide = splice(guide, 'symbols', sections)
guide = splice(guide, 'howmap', howMap())
writeFileSync(guidePath, guide)

console.log(`index.html and field-guide.html: ${symbols.length} symbols, ${iconNames.length} glyphs from packages/icons`)
