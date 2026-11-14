import { css, LitElement, nothing, type PropertyValues } from 'lit'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import { iconSvg, isIconName } from 'tessera-icons'
import { boxReset, define } from './base.ts'

const glyphCss = css`
  :host {
    display: inline-flex;
    flex: none;
    vertical-align: middle;
    color: inherit;
    line-height: 0;
  }
  :host([hidden]) {
    display: none;
  }
  svg {
    display: block;
  }
`

/** The stylesheet as a string, for consumers' density and contrast tests. */
export const tesseraGlyphStyles: string = `${boxReset.cssText}\n${glyphCss.cssText}`

/**
 * `<tessera-glyph name="lighthouse" size="20" label="Guidance">`: an inline line glyph in `currentColor`.
 * Decorative (hidden from assistive technology) unless it has a label.
 */
export class TesseraGlyph extends LitElement {
  static override properties = {
    name: { type: String, reflect: true },
    size: { type: Number },
    label: { type: String }
  }

  static override styles = [boxReset, glyphCss]

  declare name: string
  declare size: number
  declare label: string

  constructor() {
    super()
    this.name = ''
    this.size = 20
    this.label = ''
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('label')) {
      if (this.label) this.removeAttribute('aria-hidden')
      else this.setAttribute('aria-hidden', 'true')
    }
  }

  protected override render() {
    if (!isIconName(this.name)) return nothing
    return unsafeSVG(iconSvg(this.name, { size: this.size, ...(this.label ? { label: this.label } : {}) }))
  }
}

export function defineTesseraGlyph(tag = 'tessera-glyph'): void {
  define(tag, TesseraGlyph)
}

declare global {
  interface HTMLElementTagNameMap {
    'tessera-glyph': TesseraGlyph
  }
}
