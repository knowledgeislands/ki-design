import { type IconName, iconBodies, iconNames } from './icons.generated.ts'

export { type IconName, iconBodies, iconNames } from './icons.generated.ts'
export { type Bounds, lintIcon, parseSvg, requiredRootAttributes, type SvgElement, safeArea } from './lint.ts'

/** Prefix for sprite symbol ids: `ki-lighthouse`. */
export const symbolPrefix = 'ki-'

export interface IconSvgOptions {
  /** Rendered width and height in CSS pixels. Defaults to 24. */
  readonly size?: number
  /** Accessible name. Without one the glyph is decorative and hidden from assistive technology. */
  readonly label?: string
  /** Optional class attribute. */
  readonly className?: string
}

const ROOT_ATTRIBUTES =
  'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'

/** Escapes text for use in XML content and attribute values. */
export function escapeXml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' }[c]};`)
}

/** Whether `name` is a glyph in this set. */
export function isIconName(name: string): name is IconName {
  return Object.hasOwn(iconBodies, name)
}

/** Returns a standalone SVG string for one glyph. */
export function iconSvg(name: IconName, { size = 24, label, className }: IconSvgOptions = {}): string {
  const body = iconBodies[name]
  if (body === undefined) throw new RangeError(`Unknown icon ${JSON.stringify(name)}`)
  const a11y = label ? `role="img" aria-label="${escapeXml(label)}"` : 'aria-hidden="true" focusable="false"'
  const cls = className ? ` class="${escapeXml(className)}"` : ''
  const title = label ? `<title>${escapeXml(label)}</title>` : ''
  return `<svg ${ROOT_ATTRIBUTES} width="${size}" height="${size}" ${a11y}${cls}>${title}${body}</svg>`
}

/**
 * Builds a hidden SVG sprite of `<symbol id="ki-<name>">` elements, for `<use href="#ki-lighthouse"/>`.
 * Defaults to every glyph, in name order.
 */
export function sprite(names: readonly IconName[] = iconNames): string {
  const symbols = names.map(
    (name) =>
      `<symbol id="${symbolPrefix}${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${iconBodies[name]}</symbol>`
  )
  return `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:none">${symbols.join('')}</svg>`
}
