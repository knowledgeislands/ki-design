import { css } from 'lit'

/** Every component owns its box model rather than inheriting the page's. */
export const boxReset = css`
  :host,
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`

/** Registers `tag` once, so a page that loads the bundle twice does not throw. */
export function define(tag: string, element: CustomElementConstructor): void {
  if (!customElements.get(tag)) customElements.define(tag, element)
}
