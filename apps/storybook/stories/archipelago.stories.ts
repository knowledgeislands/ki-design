import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { type Archipelago, type GlyphResolver, renderArchipelagoSvg } from 'tessera-hexmap'
import territory from 'tessera-hexmap/examples/arcadia-territory.archipelago.json'
import { iconBodies, isIconName } from 'tessera-icons'

interface ArchipelagoArgs {
  theme: 'day' | 'night' | 'auto'
  spacing: number
  aspect: number
}

const glyph: GlyphResolver = (id) => (isIconName(id) ? iconBodies[id] : undefined)

const meta: Meta<ArchipelagoArgs> = {
  title: 'Organisms/Archipelago',
  args: { theme: 'day', spacing: 4, aspect: 1 },
  argTypes: {
    theme: { control: 'inline-radio', options: ['day', 'night', 'auto'] },
    spacing: { control: { type: 'range', min: 3, max: 8, step: 1 } },
    aspect: { control: { type: 'range', min: 0.5, max: 2, step: 0.1 } }
  },
  parameters: {
    docs: {
      description: {
        component:
          "`renderArchipelagoSvg` from `tessera-hexmap`: a territory's islands in one sea region, as a static SVG string a site writes at build time. It is a renderer, not an element."
      }
    }
  },
  render: ({ theme, spacing, aspect }) =>
    renderArchipelagoSvg(territory as unknown as Archipelago, { theme, spacing, aspect, glyph })
}
export default meta

export const ArcadiaTerritory: StoryObj<ArchipelagoArgs> = { name: 'Arcadia territory' }
