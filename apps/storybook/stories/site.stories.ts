import type { Meta, StoryObj } from '@storybook/web-components-vite'

/** The page in a frame, so its own styles, fonts and scripts stay its own. */
const page = (file: string, title: string): StoryObj => ({
  render: () => `<iframe class="stage-frame" src="site-preview/${file}" title="${title}"></iframe>`
})

const meta: Meta = {
  title: 'Pages/Site preview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The redesigned knowledgeislands.info as static pages built from Tessera: the Voyage home and the Atlas Field Guide. `site-preview/build-hero.ts` and `site-preview/build-pages.ts` regenerate their drawn parts; the live site vendors the hero, the plate and the marks from here.'
      }
    }
  }
}
export default meta

export const VoyageHome: StoryObj = { name: 'Voyage home', ...page('index.html', 'The Voyage home') }

export const FieldGuide: StoryObj = { name: 'Field Guide', ...page('field-guide.html', 'The Field Guide') }
