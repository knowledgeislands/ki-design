// The preview: Tessera's token CSS, both elements defined, the manifest that gives each element its controls and
// docs, and a Theme toolbar that sets the light chart or the chart at night. The sidebar follows the atomic levels of
// docs/spec/components.md.

import 'tessera-tokens/tokens.css'
import '../src/stage.css'
import 'tessera'
import type { Decorator, Preview } from '@storybook/web-components-vite'
import { setCustomElementsManifest } from '@storybook/web-components-vite'
import manifest from 'tessera/custom-elements.json'

setCustomElementsManifest(manifest)

/** Sets `data-theme` on the preview's page, as a site's theme switch would; empty follows the system. */
const withTheme: Decorator = (story, context) => {
  const theme = String(context.globals['theme'] ?? '')
  if (theme) document.documentElement.dataset['theme'] = theme
  else delete document.documentElement.dataset['theme']
  return story()
}

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [withTheme],
  parameters: {
    layout: 'padded',
    controls: { expanded: true, sort: 'requiredFirst' },
    options: {
      storySort: { order: ['Introduction', 'Tokens', 'Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'] }
    }
  },
  globalTypes: {
    theme: {
      description: 'The light chart or the chart at night',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: '', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'night', title: 'Night' }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: { theme: '' }
}

export default preview
