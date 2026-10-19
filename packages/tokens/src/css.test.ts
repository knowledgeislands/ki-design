import { describe, expect, test } from 'bun:test'
import { cssBlocks, cssDigest, renderCss, renderTailwindTheme, renderTokensModule } from './css.ts'
import { roleNames, tokens } from './tokens.ts'

describe('tokens.css', () => {
  const css = renderCss()

  test('declares every bare role variable for light on :root', () => {
    for (const role of roleNames) expect(css).toContain(`--${role}: ${tokens.roles.light[role]};`)
  })

  test('declares night under the media query and the data-theme attribute', () => {
    expect(css).toContain('@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {')
    expect(css).toContain('[data-theme="night"] {')
    expect(css).toContain(`--paper: ${tokens.roles.night.paper};`)
  })

  test('declares Tailwind v4 namespaced variables', () => {
    expect(css).toContain('--color-navy: #0f2440;')
    expect(css).toContain('--color-paper: var(--paper);')
    expect(css).toContain('--color-terrain-ocean: ')
    expect(css).toContain("--font-display: 'Cormorant Garamond', Georgia, serif;")
    expect(css).toContain('--radius-md: 8px;')
    expect(css).toContain('--space-64: 64px;')
  })

  test('declares the 0.2.0 additions: fog, tile water, space-96, radius-round and UI motion', () => {
    expect(css).toContain(`--fog: ${tokens.fog.light};`)
    expect(css).toContain(`--fog: ${tokens.fog.night};`)
    expect(css).toContain('--color-fog: var(--fog);')
    expect(css).toContain('--color-tile-water: #2f5878;')
    expect(css).toContain('--color-terrain-ocean: var(--color-tile-water);')
    expect(css).toContain('--space-96: 96px;')
    expect(css).toContain('--radius-round: 999px;')
    expect(css).toContain('--motion-easing: cubic-bezier(0.4, 0, 0.2, 1);')
    expect(css).toContain('--motion-duration-state: 160ms;')
    expect(css).toContain('--motion-duration-panel: 240ms;')
    expect(css).toContain('--motion-duration-map: 400ms;')
  })

  test('never declares a property twice in one block', () => {
    for (const block of cssBlocks()) {
      const names = block.declarations.map(([p]) => p)
      expect(new Set(names).size).toBe(names.length)
    }
  })

  test('theme.css declares literals in @theme and role aliases in @theme inline', () => {
    const theme = renderTailwindTheme()
    expect(theme).toContain('@theme {\n  --color-navy: #0f2440;')
    expect(theme).toContain('@theme inline {\n  --color-paper: var(--paper);')
    // No variable may refer to itself.
    for (const [, name, value] of theme.matchAll(/(--[\w-]+): ([^;]+);/g)) expect(value).not.toBe(`var(${name})`)
  })
})

describe('digest', () => {
  test('is a stable SHA-256 of the declarations', () => {
    const digest = cssDigest()
    expect(digest).toMatch(/^[0-9a-f]{64}$/)
    expect(cssDigest()).toBe(digest)
  })

  test('changes when any value changes', () => {
    const [root, ...rest] = cssBlocks()
    if (!root) throw new Error('missing :root block')
    const altered = [{ ...root, declarations: [...root.declarations, ['--x', '1'] as const] }, ...rest]
    expect(cssDigest(altered)).not.toBe(cssDigest())
  })
})

test('tokens module is a typed constant', () => {
  expect(renderTokensModule()).toContain('export const tokens = {')
  expect(renderTokensModule()).toContain('} as const')
})
