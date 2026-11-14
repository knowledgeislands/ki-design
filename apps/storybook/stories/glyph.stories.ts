import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { iconNames } from 'tessera-icons'

interface GlyphArgs {
  name: string
  size: number
  label: string
}

const meta: Meta<GlyphArgs> = {
  title: 'Atoms/Glyph',
  component: 'tessera-glyph',
  args: { name: 'lighthouse', size: 32, label: '' },
  argTypes: { name: { control: 'select', options: [...iconNames] } },
  render: ({ name, size, label }) =>
    html`<tessera-glyph name=${name} size=${size} label=${ifDefined(label || undefined)}></tessera-glyph>`
}
export default meta
type Story = StoryObj<GlyphArgs>

export const Default: Story = {}

export const Labelled: Story = { args: { name: 'capital', size: 48, label: 'The Capital' } }

export const InText: Story = {
  name: 'In running text',
  render: () =>
    html`<p style="font-size:18px">
      Ships leave the <tessera-glyph name="port" size="18"></tessera-glyph> Port and steer by the
      <tessera-glyph name="lighthouse" size="18"></tessera-glyph> lighthouse; the glyph takes the text's colour.
    </p>`
}
