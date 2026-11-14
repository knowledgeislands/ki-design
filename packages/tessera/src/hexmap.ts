import { css, html, LitElement, nothing, type PropertyValues, svg } from 'lit'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import {
  type Axial,
  axialToOffset,
  type FlatLayout,
  type FlatTheme,
  type GlyphResolver,
  type IslandMap,
  type LaidOutHex,
  layoutFlat,
  neighbour,
  offsetToAxial,
  renderFlatLayers,
  sentenceCase,
  validateIslandMap
} from 'tessera-hexmap'
import { iconBodies, isIconName } from 'tessera-icons'
import { boxReset, define } from './base.ts'

/** The default structure glyphs: the Knowledge Islands line glyph whose name is the structure id. */
export const iconGlyph: GlyphResolver = (id) => (isIconName(id) ? iconBodies[id] : undefined)

/** Detail of the `tessera-select` event. */
export interface TesseraSelectDetail {
  readonly q: number
  readonly r: number
  readonly structure: string | undefined
}

const hexmapCss = css`
  :host {
    display: block;
    color: var(--ink, #1a2030);
    font-family: var(--font-body, system-ui, sans-serif);
  }
  :host([hidden]) {
    display: none;
  }
  svg {
    display: block;
    inline-size: 100%;
    block-size: auto;
    overflow: visible;
  }
  .hex {
    cursor: pointer;
    outline: none;
  }
  .hex polygon {
    fill: transparent;
    stroke: none;
  }
  .hex:hover polygon {
    fill: var(--paper, #f5efe0);
    fill-opacity: 0.14;
  }
  .hex:focus-visible polygon {
    stroke: var(--accent, #1b3a5c);
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
    paint-order: stroke;
  }
`

/** The stylesheet as a string, for consumers' density and contrast tests. */
export const tesseraHexmapStyles: string = `${boxReset.cssText}\n${hexmapCss.cssText}`

const keyOf = ({ q, r }: Axial): string => `${q},${r}`

/** Arrow keys move along axial neighbours; up and down pick the diagonal that keeps the visual column. */
function step(from: Axial, key: string): Axial[] {
  switch (key) {
    case 'ArrowRight':
      return [neighbour(from, 0)]
    case 'ArrowLeft':
      return [neighbour(from, 3)]
    case 'ArrowUp':
    case 'ArrowDown': {
      const { col, row } = axialToOffset(from)
      const vertical = offsetToAxial({ col, row: row + (key === 'ArrowUp' ? -1 : 1) })
      // Fall back to the other diagonal at a ragged edge.
      const others =
        key === 'ArrowUp' ? [neighbour(from, 1), neighbour(from, 2)] : [neighbour(from, 4), neighbour(from, 5)]
      return [vertical, ...others.filter((h) => keyOf(h) !== keyOf(vertical))]
    }
    default:
      return []
  }
}

/**
 * `<tessera-hexmap>`: an island map, keyboard navigable with a roving tabindex. Give it an `IslandMap` through the `.map`
 * property, or inline `islandmap/v1` JSON in the `src` attribute (never a URL: the components make no network calls).
 * Fires `tessera-select` with `{ q, r, structure }` on click, Enter or Space.
 *
 * @tagname tessera-hexmap
 * @summary An island map: the flat chart, with a keyboard-navigable listbox of hexes over it.
 * @fires {CustomEvent<TesseraSelectDetail>} tessera-select - A hex was chosen by click, Enter or Space; bubbles and is composed.
 * @cssprop [--ink=#1a2030] - Text colour around the chart.
 * @cssprop [--paper=#f5efe0] - The hover tint over a hex.
 * @cssprop [--accent=#1b3a5c] - The focus ring of a hex.
 * @cssprop [--font-body=system-ui, sans-serif] - The typeface of an error message.
 */
export class TesseraHexmap extends LitElement {
  static override properties = {
    map: { attribute: false },
    src: { type: String },
    size: { type: Number },
    theme: { type: String, reflect: true },
    glyph: { attribute: false },
    selected: { attribute: false },
    focusKey: { state: true },
    error: { state: true }
  }

  static override styles = [boxReset, hexmapCss]

  /** The map to draw, an `islandmap/v1` object. */
  declare map: IslandMap | undefined
  /** Inline `islandmap/v1` JSON, never a URL: it is parsed, not fetched. */
  declare src: string
  /** The hex radius in user units. */
  declare size: number
  /** `day` (parchment) or `night` (navy). */
  declare theme: FlatTheme
  /** Structure glyphs; defaults to the icons package. */
  declare glyph: GlyphResolver
  /** The hex ringed as selected, `{ q, r }`. */
  declare selected: Axial | undefined
  /** The hex in the tab order. */
  declare focusKey: string | undefined
  /** Why the `src` map could not be drawn. */
  declare error: string | undefined

  #layout: FlatLayout | undefined
  #focusAfterRender = false

  constructor() {
    super()
    this.map = undefined
    this.src = ''
    this.size = 32
    this.theme = 'day'
    this.glyph = iconGlyph
    this.selected = undefined
    this.focusKey = undefined
    this.error = undefined
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('src') && this.src) this.#loadSource(this.src)
    if (!this.map) {
      this.#layout = undefined
      return
    }
    this.#layout = layoutFlat(this.map, {
      size: this.size,
      theme: this.theme === 'night' ? 'night' : 'day',
      glyph: this.glyph,
      ...(this.selected ? { selected: this.selected } : {})
    })
    const keys = new Set(this.#layout.hexes.map((h) => h.key))
    if (!this.focusKey || !keys.has(this.focusKey)) {
      const initial =
        this.selected && keys.has(keyOf(this.selected)) ? keyOf(this.selected) : this.#layout.hexes[0]?.key
      this.focusKey = initial
    }
  }

  #loadSource(source: string): void {
    let parsed: unknown
    try {
      parsed = JSON.parse(source)
    } catch {
      this.error = 'The src attribute is not valid JSON.'
      return
    }
    const result = validateIslandMap(parsed)
    if (result.ok) {
      this.error = undefined
      this.map = result.map
    } else this.error = `The src map is invalid: ${result.errors.join('; ')}.`
  }

  protected override updated(): void {
    if (!this.#focusAfterRender) return
    this.#focusAfterRender = false
    this.renderRoot.querySelector<SVGGElement>(`[data-key="${this.focusKey}"]`)?.focus()
  }

  /** Selects a hex as if the user had chosen it, firing `tessera-select`. */
  select(hex: Axial): void {
    const found = this.#layout?.hexes.find((h) => h.key === keyOf(hex))
    if (!found) return
    this.selected = { q: found.hex.q, r: found.hex.r }
    this.focusKey = found.key
    this.dispatchEvent(
      new CustomEvent<TesseraSelectDetail>('tessera-select', {
        detail: { q: found.hex.q, r: found.hex.r, structure: found.hex.structure },
        bubbles: true,
        composed: true
      })
    )
  }

  #onKeydown(event: KeyboardEvent, current: LaidOutHex): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.select(current.hex)
      return
    }
    const candidates = step(current.hex, event.key)
    if (candidates.length === 0) return
    event.preventDefault()
    const keys = new Set(this.#layout?.hexes.map((h) => h.key))
    const target = candidates.find((h) => keys.has(keyOf(h)))
    if (!target) return
    this.focusKey = keyOf(target)
    this.#focusAfterRender = true
  }

  #hexLabel({ hex }: LaidOutHex): string {
    const parts = [sentenceCase(hex.terrain)]
    if (hex.structure) parts.push(sentenceCase(hex.structure))
    if (hex.condition) parts.push(hex.condition)
    return `${parts.join(', ')} (${hex.q}, ${hex.r})`
  }

  protected override render() {
    const layout = this.#layout
    if (this.error) return html`<p role="alert">${this.error}</p>`
    if (!layout) return nothing
    const selectedKey = this.selected ? keyOf(this.selected) : undefined
    // The chart is the same deterministic drawing as renderFlatSvg; the interactive hexes lie transparent over it.
    return svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox=${layout.viewBox} role="listbox" aria-label=${layout.title}>
      <g class="chart" aria-hidden="true">${unsafeSVG(renderFlatLayers(layout))}</g>
      ${layout.hexes.map(
        (h) => svg`<g
          class="hex"
          data-key=${h.key}
          role="option"
          aria-label=${this.#hexLabel(h)}
          aria-selected=${h.key === selectedKey ? 'true' : 'false'}
          tabindex=${h.key === this.focusKey ? 0 : -1}
          @click=${() => this.select(h.hex)}
          @focus=${() => {
            this.focusKey = h.key
          }}
          @keydown=${(event: KeyboardEvent) => this.#onKeydown(event, h)}
        ><polygon points=${h.points}></polygon></g>`
      )}
    </svg>`
  }
}

export function defineTesseraHexmap(tag = 'tessera-hexmap'): void {
  define(tag, TesseraHexmap)
}

declare global {
  interface HTMLElementTagNameMap {
    'tessera-hexmap': TesseraHexmap
  }
  interface HTMLElementEventMap {
    'tessera-select': CustomEvent<TesseraSelectDetail>
  }
}
