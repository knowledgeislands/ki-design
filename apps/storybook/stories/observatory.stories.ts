import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { useReader } from '../observatory/client/api.ts'
import '../observatory/client/main.ts'
import styles from '../observatory/client/styles.css?inline'
import { sampleReader } from '../observatory/sample.ts'

const meta: Meta = {
  title: 'Templates/Observatory',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "A reskinned, read-only Observatory front end drawn with Tessera: the shell, the four jobs and their instruments, and the Map of Known Lands. Here it reads an invented sample estate, never a live Observatory; its styles are the template's own and live only while the story is open."
      }
    }
  },
  render: () => {
    useReader(sampleReader())
    const frame = document.createElement('div')
    const style = document.createElement('style')
    style.textContent = styles
    frame.append(style, document.createElement('observatory-preview'))
    return frame
  }
}
export default meta

export const SampleEstate: StoryObj = { name: 'Sample estate' }
