import { describe, expect, test } from 'bun:test'
import type { IslandMap } from 'tessera-hexmap'
import arcadia from 'tessera-hexmap/examples/arcadia.islandmap.json' with { type: 'json' }
import { iconBodies } from 'tessera-icons'
import { tokens } from 'tessera-tokens'
import {
  iconGlyph,
  type TesseraGlyph,
  type TesseraHexmap,
  type TesseraSelectDetail,
  tesseraGlyphStyles,
  tesseraHexmapStyles
} from './index.ts'

const mount = async <T extends HTMLElement & { updateComplete: Promise<boolean> }>(markup: string): Promise<T> => {
  document.body.innerHTML = markup
  const element = document.body.firstElementChild as T
  await element.updateComplete
  return element
}

const press = async (element: TesseraHexmap, target: Element, key: string) => {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
  await element.updateComplete
}

const focused = (element: TesseraHexmap) => element.shadowRoot?.querySelector('.hex[tabindex="0"]')

describe('<tessera-glyph>', () => {
  test('renders the named glyph, decorative by default', async () => {
    const glyph = await mount<TesseraGlyph>('<tessera-glyph name="lighthouse" size="20"></tessera-glyph>')
    const svg = glyph.shadowRoot?.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('20')
    expect(glyph.getAttribute('aria-hidden')).toBe('true')
  })

  test('exposes a label when given one', async () => {
    const glyph = await mount<TesseraGlyph>('<tessera-glyph name="port" label="Port"></tessera-glyph>')
    expect(glyph.hasAttribute('aria-hidden')).toBe(false)
    expect(glyph.shadowRoot?.querySelector('svg')?.getAttribute('aria-label')).toBe('Port')
  })

  test('renders nothing for an unknown name', async () => {
    const glyph = await mount<TesseraGlyph>('<tessera-glyph name="harbour"></tessera-glyph>')
    expect(glyph.shadowRoot?.querySelector('svg')).toBeNull()
  })
})

describe('<tessera-hexmap>', () => {
  test('renders a hex for every map hex from the .map property', async () => {
    const map = await mount<TesseraHexmap>('<tessera-hexmap></tessera-hexmap>')
    map.map = arcadia as IslandMap
    await map.updateComplete
    expect(map.shadowRoot?.querySelectorAll('.hex')).toHaveLength(61)
    expect(map.shadowRoot?.querySelectorAll('.hex[tabindex="0"]')).toHaveLength(1)
    expect(map.shadowRoot?.querySelector('[data-structure="capital"] title')?.textContent).toBe('Capital (thriving)')
  })

  test('reads inline JSON from src and reports invalid input', async () => {
    const json = JSON.stringify(arcadia).replaceAll("'", '&#39;')
    const map = await mount<TesseraHexmap>(`<tessera-hexmap src='${json}'></tessera-hexmap>`)
    expect(map.shadowRoot?.querySelectorAll('.hex')).toHaveLength(61)
    const broken = await mount<TesseraHexmap>(`<tessera-hexmap src='{"schema":"nope"}'></tessera-hexmap>`)
    expect(broken.shadowRoot?.querySelector('[role="alert"]')?.textContent).toContain('schema must be')
  })

  test('arrow keys rove along axial neighbours', async () => {
    const map = await mount<TesseraHexmap>('<tessera-hexmap></tessera-hexmap>')
    map.map = arcadia as IslandMap
    map.selected = { q: 0, r: 0 }
    await map.updateComplete
    expect(focused(map)?.getAttribute('data-key')).toBe('0,0')

    await press(map, focused(map) as Element, 'ArrowRight')
    expect(focused(map)?.getAttribute('data-key')).toBe('1,0')
    await press(map, focused(map) as Element, 'ArrowLeft')
    await press(map, focused(map) as Element, 'ArrowDown')
    expect(focused(map)?.getAttribute('data-key')).toBe('0,1')
    await press(map, focused(map) as Element, 'ArrowUp')
    expect(focused(map)?.getAttribute('data-key')).toBe('0,0')
  })

  test('stays put at the edge of the map', async () => {
    const map = await mount<TesseraHexmap>('<tessera-hexmap></tessera-hexmap>')
    map.map = arcadia as IslandMap
    map.selected = { q: 4, r: 0 }
    await map.updateComplete
    await press(map, focused(map) as Element, 'ArrowRight')
    expect(focused(map)?.getAttribute('data-key')).toBe('4,0')
  })

  test('Enter dispatches tessera-select with the structure', async () => {
    const map = await mount<TesseraHexmap>('<tessera-hexmap></tessera-hexmap>')
    map.map = arcadia as IslandMap
    map.selected = { q: -1, r: 3 }
    await map.updateComplete
    const events: TesseraSelectDetail[] = []
    document.body.addEventListener('tessera-select', (event) => events.push(event.detail))
    await press(map, focused(map) as Element, 'Enter')
    expect(events).toEqual([{ q: -1, r: 3, structure: 'port' }])
    expect(map.shadowRoot?.querySelector('.hex[aria-selected="true"]')?.getAttribute('data-key')).toBe('-1,3')
  })
})

describe('<tessera-hexmap> chart', () => {
  test('draws structures with the icons package by default', async () => {
    const map = await mount<TesseraHexmap>('<tessera-hexmap></tessera-hexmap>')
    map.map = arcadia as IslandMap
    await map.updateComplete
    expect(map.glyph).toBe(iconGlyph)
    expect(iconGlyph('lighthouse')).toBe(iconBodies.lighthouse)
    expect(iconGlyph('cottage')).toBeUndefined()
    const lighthouse = map.shadowRoot?.querySelector('[data-structure="lighthouse"] g[transform]')
    expect(lighthouse?.innerHTML).toContain('<path')
    expect(map.shadowRoot?.querySelector('[data-structure="cottage"] g[transform]')).toBeNull()
    expect(map.shadowRoot?.querySelectorAll('pattern').length).toBeGreaterThan(0)
    expect(map.shadowRoot?.querySelector('.ki-coast')).not.toBeNull()
  })

  test('takes another glyph resolver and the night theme', async () => {
    const map = await mount<TesseraHexmap>('<tessera-hexmap theme="night"></tessera-hexmap>')
    map.glyph = (id) => (id === 'port' ? '<circle cx="12" cy="12" r="4"/>' : undefined)
    map.map = arcadia as IslandMap
    await map.updateComplete
    expect(map.shadowRoot?.querySelectorAll('.ki-structure g[transform]')).toHaveLength(1)
    expect(map.shadowRoot?.querySelector('.ki-paper')?.getAttribute('fill')).toBe(tokens.roles.night.paper)
  })
})

describe('stylesheets', () => {
  test('are exported as strings and token-driven', () => {
    expect(tesseraHexmapStyles).toContain('var(--paper')
    expect(tesseraHexmapStyles).toContain('box-sizing: border-box')
    expect(tesseraGlyphStyles).toContain('box-sizing: border-box')
  })
})
