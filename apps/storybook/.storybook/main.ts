// Tessera's Storybook: web components on Vite, built to static files that run from any folder.
//
//   bun run self:storybook          serves it on http://localhost:6006/
//   bun run self:storybook:build    writes it to apps/storybook/dist/

import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  framework: { name: '@storybook/web-components-vite', options: {} },
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  // The Voyage home and the Field Guide are static pages; the Pages stories frame them from here.
  staticDirs: [{ from: '../site-preview', to: '/site-preview' }],
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  docs: { defaultName: 'Docs' },
  viteFinal: (vite) => ({
    ...vite,
    resolve: {
      ...vite.resolve,
      // tessera-tokens hashes its CSS with node:crypto for its build; nothing in a story calls it.
      alias: { 'node:crypto': fileURLToPath(new URL('../src/crypto.ts', import.meta.url)) }
    }
  })
}

export default config
