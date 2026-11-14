/** An sRGB colour as three 0–255 channels. */
export type Rgb = readonly [r: number, g: number, b: number]

const HEX = /^#([0-9a-f]{6})$/i

/** Parses a six-digit `#rrggbb` hex colour. Throws on anything else, so typos in canon values fail loudly. */
export function parseHex(hex: string): Rgb {
  const match = HEX.exec(hex)
  if (!match?.[1]) throw new TypeError(`Expected a #rrggbb colour, got ${JSON.stringify(hex)}`)
  const n = Number.parseInt(match[1], 16)
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]
}

/** Formats channels as lower-case `#rrggbb`, rounding and clamping each channel. */
export function toHex([r, g, b]: Rgb): string {
  const channel = (c: number) =>
    Math.round(Math.min(255, Math.max(0, c)))
      .toString(16)
      .padStart(2, '0')
  return `#${channel(r)}${channel(g)}${channel(b)}`
}

/**
 * Mixes `b` into `a` by `t` (0–1) in gamma-encoded sRGB, as CSS `color-mix(in srgb, b t%, a)` does.
 * A wash is `mix(paper, role, 0.12)`: the role colour 12 % into the paper.
 */
export function mix(a: string, b: string, t: number): string {
  if (!(t >= 0 && t <= 1)) throw new RangeError(`Mix amount must be between 0 and 1, got ${t}`)
  const [ar, ag, ab] = parseHex(a)
  const [br, bg, bb] = parseHex(b)
  return toHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t])
}
