import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { action } from 'storybook/actions'
import type { TesseraSelectDetail } from 'tessera'
import type { IslandMap } from 'tessera-hexmap'
import arcadia from 'tessera-hexmap/examples/arcadia.islandmap.json'

interface HexmapArgs {
  size: number
  theme: 'day' | 'night'
}

const logSelect = action('tessera-select')

const meta: Meta<HexmapArgs> = {
  title: 'Organisms/Hex map',
  component: 'tessera-hexmap',
  args: { size: 28, theme: 'day' },
  argTypes: { theme: { control: 'inline-radio', options: ['day', 'night'] } },
  parameters: {
    docs: {
      description: {
        component:
          'A flat, keyboard-navigable chart of one `islandmap/v1` map, drawn by `tessera-hexmap`. Arrow keys move between hexes; Enter or a click selects one and sends `tessera-select`, which shows in the Actions panel.'
      }
    }
  },
  render: ({ size, theme }) =>
    html`<tessera-hexmap
      .map=${arcadia as unknown as IslandMap}
      size=${size}
      theme=${theme}
      @tessera-select=${(event: CustomEvent<TesseraSelectDetail>) => logSelect(event.detail)}
    ></tessera-hexmap>`
}
export default meta
type Story = StoryObj<HexmapArgs>

export const Arcadia: Story = {}

export const ArcadiaAtNight: Story = {
  name: 'Arcadia at night',
  args: { theme: 'night' },
  globals: { theme: 'night' }
}
