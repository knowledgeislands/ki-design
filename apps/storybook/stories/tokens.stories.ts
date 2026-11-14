import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { iconNames, iconSvg } from 'tessera-icons'
import { byCategory, symbolCategories } from 'tessera-symbols'
import { roleNames, seaNames, spaceSteps, terrainNames, themes, tokens } from 'tessera-tokens'

/** Escapes text for HTML content and attribute values. */
const text = (value: string): string =>
  value.replace(/[&<>"']/g, (c) => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' }[c]};`)

const swatch = (name: string, value: string, note = value): string =>
  `<div class="stage-swatch"><div style="background:${text(value)}"></div><div><strong>${text(name)}</strong><br><span class="stage-mono">${text(note)}</span></div></div>`

const section = (heading: string, body: string): string => `<h2 class="stage-heading">${text(heading)}</h2>${body}`

const meta: Meta = {
  title: 'Tokens/Foundations',
  parameters: {
    docs: {
      description: {
        component:
          'The design tokens of `tessera-tokens`: colour roles by theme, washes, terrain and sea, type, space and radius. Sites and apps read them as CSS custom properties from `tessera-tokens/tokens.css`; switch the toolbar Theme to see the chart at night.'
      }
    }
  }
}
export default meta
type Story = StoryObj

export const ColourRoles: Story = {
  render: () =>
    `${section('On this page', `<div class="stage-grid">${roleNames.map((r) => swatch(r, `var(--${r})`, `--${r}`)).join('')}</div>`)}${themes
      .map((theme) =>
        section(
          `${theme[0]?.toUpperCase()}${theme.slice(1)}`,
          `<div class="stage-grid">${roleNames.map((r) => swatch(r, tokens.roles[theme][r])).join('')}</div>`
        )
      )
      .join('')}`
}

export const Washes: Story = {
  render: () =>
    themes
      .map((theme) =>
        section(
          theme,
          `<div class="stage-grid">${Object.entries(tokens.washes[theme])
            .map(([name, value]) => swatch(`wash ${name}`, value))
            .join('')}</div>`
        )
      )
      .join('')
}

export const TerrainAndSea: Story = {
  render: () =>
    `${section('Terrain', `<div class="stage-grid">${terrainNames.map((t) => swatch(t, tokens.terrain[t])).join('')}</div>`)}${themes
      .map((theme) =>
        section(
          `Sea, ${theme}`,
          `<div class="stage-grid">${seaNames.map((s) => swatch(s, tokens.sea[theme][s])).join('')}</div>`
        )
      )
      .join('')}`
}

export const Type: Story = {
  render: () =>
    Object.entries(tokens.fonts)
      .map(
        ([name, stack]) =>
          `<p style="font-family:${text(stack.join(', '))};font-size:22px;margin:8px 0">${text(name)}: Knowledge is a civilisation question.</p><p class="stage-mono">${text(stack.join(', '))}</p>`
      )
      .join('')
}

export const SpaceAndRadius: Story = {
  render: () =>
    `${section(
      'Space',
      spaceSteps
        .map(
          (step) =>
            `<div style="display:flex;gap:12px;align-items:center;margin:4px 0"><span class="stage-mono" style="inline-size:72px">--space-${step}</span><span style="background:var(--accent);block-size:12px;inline-size:${text(tokens.space[step])}"></span><span class="stage-mono">${text(tokens.space[step])}</span></div>`
        )
        .join('')
    )}${section(
      'Radius',
      `<div class="stage-grid">${Object.entries(tokens.radius)
        .map(
          ([name, value]) =>
            `<div class="stage-card" style="border-radius:${text(value)}"><span class="stage-mono">--radius-${text(name)}: ${text(value)}</span></div>`
        )
        .join('')}</div>`
    )}`
}

export const Glyphs: Story = {
  name: 'Glyph set',
  render: () =>
    `<p>${iconNames.length} line glyphs from <code>tessera-icons</code>, drawn in <code>currentColor</code> on a 24 px grid.</p><div class="stage-grid">${iconNames
      .map(
        (name) => `<div class="stage-card">${iconSvg(name, { size: 24 })}<span class="stage-mono">${name}</span></div>`
      )
      .join('')}</div>`
}

export const Symbols: Story = {
  name: 'Symbol library',
  render: () =>
    symbolCategories
      .map((category) =>
        section(
          category,
          `<div class="stage-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">${byCategory[
            category
          ]
            .map(
              (symbol) =>
                `<div class="stage-card">${symbol.icon ? iconSvg(symbol.icon, { size: 24 }) : '<span style="inline-size:24px"></span>'}<div><strong>${text(symbol.name)}</strong> <span class="stage-mono">${symbol.status}</span><br>${text(symbol.meaning)}</div></div>`
            )
            .join('')}</div>`
        )
      )
      .join('')
}
