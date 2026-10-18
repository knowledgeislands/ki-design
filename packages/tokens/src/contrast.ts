import { parseHex } from './colour.ts'

/** WCAG 2.x contrast floors used across Knowledge Islands. */
export const contrastFloor = {
  /** Body text and any text role. */
  text: 4.5,
  /** Large text and control boundaries. */
  boundary: 3
} as const

const linear = (channel: number): number => {
  const c = channel / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

/** WCAG relative luminance (0 for black, 1 for white) of a `#rrggbb` colour. */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex)
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

/** WCAG contrast ratio between two colours, from 1 to 21. Order does not matter. */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** Whether `fg` on `bg` meets `floor` (defaults to the text floor). */
export function meetsContrast(fg: string, bg: string, floor: number = contrastFloor.text): boolean {
  return contrastRatio(fg, bg) >= floor
}
