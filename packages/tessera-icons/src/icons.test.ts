import { describe, expect, test } from 'bun:test'
import { readdirSync, readFileSync } from 'node:fs'
import { iconNames, iconSvg, isIconName, lintIcon, parseSvg, sprite } from './index.ts'

const svgDir = new URL('../svg/', import.meta.url)
const files = readdirSync(svgDir)
  .filter((file) => file.endsWith('.svg'))
  .sort()

describe('svg sources', () => {
  test.each(files)('%s is a well-formed glyph with the required attributes inside the safe area', (file) => {
    expect(lintIcon(readFileSync(new URL(file, svgDir), 'utf8'))).toEqual([])
  })

  test('names match files exactly', () => {
    expect<string[]>([...iconNames]).toEqual(files.map((file) => file.slice(0, -4)))
  })

  test('names are kebab-case', () => {
    for (const name of iconNames) expect(name).toMatch(/^[a-z]+(-[a-z]+)*$/)
  })
})

describe('coverage', () => {
  // The glyph inventory (docs/briefs/glyph-briefs.md), plus the UI glyphs the previews needed (arrow, refresh, hourglass)
  // and the glyphs that cover every Official or Agreed symbol (realm, pillars, thriving, quiet, weathered). `celestial` is
  // drawn as `celestial-guide`; Library and Governance values reuse `library` and `council-hall`.
  const inventory = [
    ...['island', 'archipelago', 'route', 'trade-route', 'current', 'weave', 'lighthouse', 'observatory', 'port'],
    ...['causeway', 'reef', 'terrain', 'ancient-forest', 'grid', 'celestial-guide', 'compass', 'fog', 'ruins'],
    ...['citadel', 'library', 'council-hall', 'tower', 'calendar', 'resources', 'streams', 'mill', 'workshop'],
    ...['capital', 'commons', 'inbound', 'outbound', 'dock', 'rail-depot', 'airport', 'customs-house'],
    ...['beacon', 'vessel', 'scroll', 'workbench', 'tide-gauge', 'sea-lane', 'known-lands', 'machine', 'bridge'],
    ...['lantern', 'lantern-signal', 'reef-signal'],
    ...['role-steward', 'role-archivist', 'role-cartographer', 'role-builder', 'role-navigator', 'role-scout'],
    ...['role-historian', 'role-guardian'],
    ...['search', 'filter', 'external', 'close', 'chevron', 'check', 'info', 'menu', 'theme'],
    ...['arrow', 'refresh', 'hourglass'],
    ...['value-trust', 'value-community', 'value-growth', 'value-exploration', 'value-creation'],
    'value-sustainability',
    ...['realm', 'pillars', 'thriving', 'quiet', 'weathered']
  ]

  test('every inventory glyph is drawn, and nothing else', () => {
    expect<string[]>([...iconNames].sort()).toEqual([...inventory].sort())
  })

  test('every glyph has a drawing', () => {
    for (const name of iconNames) expect(iconSvg(name)).toMatch(/<(path|circle|rect|ellipse|line|poly)/)
  })
})

describe('lintIcon', () => {
  test('flags missing attributes, disallowed elements and geometry outside the safe area', () => {
    const bad =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><image href="x.png"/><circle cx="1" cy="12" r="2"/></svg>'
    const problems = lintIcon(bad)
    expect(problems.some((p) => p.includes('stroke-width'))).toBe(true)
    expect(problems.some((p) => p.includes('<image>'))).toBe(true)
    expect(problems.some((p) => p.includes('safe area'))).toBe(true)
  })

  test('rejects malformed markup', () => {
    expect(lintIcon('<svg><path d="M0 0"></svg>')[0]).toStartWith('not well-formed')
  })
})

describe('iconSvg', () => {
  test('is decorative by default', () => {
    const svg = iconSvg('lighthouse')
    expect(svg).toContain('aria-hidden="true"')
    expect(svg).toContain('width="24"')
    expect(parseSvg(svg)[0]?.name).toBe('svg')
  })

  test('labels and escapes', () => {
    const svg = iconSvg('port', { size: 16, label: 'Port & quay' })
    expect(svg).toContain('role="img" aria-label="Port &amp; quay"')
    expect(svg).toContain('<title>Port &amp; quay</title>')
    expect(svg).toContain('width="16"')
  })

  test('isIconName narrows', () => {
    expect(isIconName('compass')).toBe(true)
    expect(isIconName('harbour')).toBe(false)
  })
})

describe('sprite', () => {
  test('contains a symbol for every glyph', () => {
    const svg = sprite()
    for (const name of iconNames) expect(svg).toContain(`<symbol id="ki-${name}"`)
    expect(parseSvg(svg).filter((el) => el.name === 'symbol')).toHaveLength(iconNames.length)
  })

  test('can be narrowed', () => {
    expect(sprite(['fog'])).not.toContain('ki-lantern')
  })
})
