import type { TerrainName } from '@knowledgeislands/tokens'

/**
 * Terrain patterns for the flat renderer, so terrain never relies on colour alone (docs/spec/colour.md). Each is one repeating
 * tile authored at the reference hex size of 32 and scaled with the map. Motifs are drawn in a single pen at low
 * contrast: `auto` picks ink or parchment, whichever reads better on the fill; `gold` is the volcanic ember.
 */
export interface TerrainPattern {
  /** Tile width and height in reference units. */
  readonly width: number
  readonly height: number
  /** Stroked motifs, as path data in tile space. */
  readonly d?: string
  /** Dots as `[x, y]` centres in tile space. */
  readonly dots?: readonly (readonly [x: number, y: number])[]
  readonly dotRadius?: number
  readonly pen: 'auto' | 'gold'
  readonly opacity: number
  /** Stroke width in reference units. */
  readonly weight: number
}

/** The hex size the tiles are authored at. */
export const patternReferenceSize = 32

const n = (v: number): string => String(Math.round(v * 100) / 100)

/** Builds path data from motif functions placed at points, keeping the tile definitions declarative. */
const place = (at: readonly (readonly [number, number])[], motif: (x: number, y: number) => string): string =>
  at.map(([x, y]) => motif(x, y)).join(' ')

const tuft = (x: number, y: number) =>
  `M${n(x - 1.3)} ${n(y - 1.2)} L${n(x)} ${n(y)} M${n(x)} ${n(y - 1.8)} L${n(x)} ${n(y)} M${n(x + 1.3)} ${n(y - 1.2)} L${n(x)} ${n(y)}`
const pine = (x: number, y: number) =>
  `M${n(x - 1.6)} ${n(y + 1.2)} L${n(x)} ${n(y - 1.8)} L${n(x + 1.6)} ${n(y + 1.2)} M${n(x)} ${n(y + 1.2)} V${n(y + 2.3)}`
const contour = (x: number, y: number) => `M${n(x - 3)} ${n(y + 0.9)} Q${n(x)} ${n(y - 2)} ${n(x + 3)} ${n(y + 0.9)}`
const peak = (x: number, y: number) =>
  `M${n(x - 3.4)} ${n(y + 2)} L${n(x - 0.6)} ${n(y - 2.2)} L${n(x + 0.9)} ${n(y - 0.2)} L${n(x + 1.7)} ${n(y - 1.1)} L${n(x + 3.4)} ${n(y + 2)}`
const reeds = (x: number, y: number) =>
  `M${n(x - 2.6)} ${n(y)} H${n(x + 2.6)} M${n(x - 0.9)} ${n(y)} V${n(y - 2.4)} M${n(x + 0.2)} ${n(y)} V${n(y - 3.1)} M${n(x + 1.2)} ${n(y)} V${n(y - 2)}`
const dash = (x: number, y: number) => `M${n(x - 2)} ${n(y)} H${n(x + 2)}`
const wave = (x: number, y: number) =>
  `M${n(x - 2.4)} ${n(y)} Q${n(x - 1.2)} ${n(y - 1.1)} ${n(x)} ${n(y)} Q${n(x + 1.2)} ${n(y + 1.1)} ${n(x + 2.4)} ${n(y)}`
const hatch = (x: number, y: number) => `M${n(x)} ${n(y - 1.4)} V${n(y + 1.4)}`

export const terrainPatterns: Readonly<Record<TerrainName, TerrainPattern>> = {
  grassland: {
    width: 18,
    height: 15,
    d: place(
      [
        [4.5, 5],
        [13.5, 12.5]
      ],
      tuft
    ),
    pen: 'auto',
    opacity: 0.4,
    weight: 0.7
  },
  forest: {
    width: 13,
    height: 12,
    d: place(
      [
        [3.25, 3.5],
        [9.75, 9.5]
      ],
      pine
    ),
    pen: 'auto',
    opacity: 0.42,
    weight: 0.7
  },
  hills: {
    width: 16,
    height: 13,
    d: place(
      [
        [4, 4.5],
        [12, 11]
      ],
      contour
    ),
    pen: 'auto',
    opacity: 0.42,
    weight: 0.75
  },
  mountain: {
    width: 18,
    height: 15,
    d: place(
      [
        [4.5, 4.5],
        [13.5, 12]
      ],
      peak
    ),
    pen: 'auto',
    opacity: 0.5,
    weight: 0.75
  },
  coastal: {
    width: 22,
    height: 16,
    d: place(
      [
        [5.5, 4],
        [16.5, 12]
      ],
      dash
    ),
    dots: [
      [12, 6],
      [3, 12.5],
      [19, 2]
    ],
    dotRadius: 0.45,
    pen: 'auto',
    opacity: 0.35,
    weight: 0.7
  },
  cliffs: {
    width: 8,
    height: 8,
    d: place(
      [
        [2, 2],
        [6, 6]
      ],
      hatch
    ),
    pen: 'auto',
    opacity: 0.42,
    weight: 0.7
  },
  sand: {
    width: 7,
    height: 7,
    dots: [
      [1.75, 1.75],
      [5.25, 5.25],
      [5.6, 1.2]
    ],
    dotRadius: 0.4,
    pen: 'auto',
    opacity: 0.38,
    weight: 0.7
  },
  river: {
    width: 20,
    height: 7,
    d: 'M0 2.5 Q2.5 1 5 2.5 T10 2.5 T15 2.5 T20 2.5 M2 5.5 Q4.5 4.3 7 5.5 M12 5.5 Q14.5 4.3 17 5.5',
    pen: 'auto',
    opacity: 0.4,
    weight: 0.7
  },
  marsh: {
    width: 15,
    height: 11,
    d: `${reeds(4, 4.5)} ${dash(11.5, 9.5)}`,
    pen: 'auto',
    opacity: 0.45,
    weight: 0.7
  },
  snow: {
    width: 14,
    height: 12,
    dots: [
      [3.5, 3],
      [10.5, 9]
    ],
    dotRadius: 0.55,
    pen: 'auto',
    opacity: 0.3,
    weight: 0.7
  },
  volcanic: {
    width: 16,
    height: 14,
    d: 'M1.5 4 L4 5.4 L5.6 3.6 L8 4.8 M5.6 3.6 L6 2 M9 11 L11 9.6 L13 11.2 L15 10.4 M13 11.2 L12.6 12.8',
    pen: 'gold',
    opacity: 0.55,
    weight: 0.75
  },
  ocean: {
    width: 24,
    height: 15,
    d: place(
      [
        [6, 4],
        [18, 11.5]
      ],
      wave
    ),
    pen: 'auto',
    opacity: 0.3,
    weight: 0.7
  }
}

/** One `<pattern>` element for a terrain, in user space, drawn in `pen`. */
export function patternMarkup(id: string, pattern: TerrainPattern, size: number, pen: string): string {
  const k = size / patternReferenceSize
  const transform = k === 1 ? '' : ` patternTransform="scale(${n(k)})"`
  const parts: string[] = []
  if (pattern.d) {
    parts.push(
      `<path d="${pattern.d}" fill="none" stroke="${pen}" stroke-width="${pattern.weight}" stroke-linecap="round" stroke-linejoin="round"/>`
    )
  }
  if (pattern.dots) {
    const r = pattern.dotRadius ?? 0.5
    parts.push(
      `<g fill="${pen}">${pattern.dots.map(([x, y]) => `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}"/>`).join('')}</g>`
    )
  }
  return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${pattern.width}" height="${pattern.height}"${transform}><g opacity="${pattern.opacity}">${parts.join('')}</g></pattern>`
}
