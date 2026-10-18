/**
 * Line glyphs, all from `@knowledgeislands/icons` (24 grid, 1.5 stroke, round caps and joins, `currentColor`, no
 * fills). The preview once drew a few stand-ins here; the package now has every glyph it uses, so there are none.
 * Should a view need a glyph the set lacks, ask the icons package for it rather than drawing one locally.
 */
import { type IconName, iconBodies, isIconName } from '../../../packages/icons/src/index.ts'
import { s } from './dom.ts'

export type GlyphName = IconName

/** Inner markup of a glyph on the 24 grid, without the root `<svg>`; `undefined` for an unknown name. */
export function glyphBody(name: string): string | undefined {
  return isIconName(name) ? iconBodies[name] : undefined
}

/** A standalone glyph, decorative unless given a label. */
export function glyph(name: GlyphName, size = 14, label?: string): SVGSVGElement {
  const svg = s('svg', {
    class: `glyph glyph-${name}`,
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 1.5,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': label ? null : 'true',
    focusable: 'false',
    role: label ? 'img' : null,
    'aria-label': label ?? null
  })
  // Package bodies are static, trusted markup.
  svg.innerHTML = glyphBody(name) ?? ''
  return svg
}

/** The same drawing as a group centred on (x, y) at `size`, for use inside a larger SVG. */
export function glyphGroup(name: GlyphName, x: number, y: number, size: number, className = ''): SVGGElement {
  const k = size / 24
  const group = s('g', {
    class: `glyph-in-map ${className}`.trim(),
    transform: `translate(${x - size / 2} ${y - size / 2}) scale(${k})`,
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 1.5,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  })
  group.innerHTML = glyphBody(name) ?? ''
  return group
}
