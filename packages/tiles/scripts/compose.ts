/**
 * Composes tiles from a set's SVG files into larger drawings (contact sheets, isometric maps). A tile is placed by
 * its anchor; structures are shown in a condition state by hiding the thriving group and stacking decals.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { resolveTileKey, type TileKey } from '../src/contract.ts'

export interface PlacedArt {
  readonly inner: string
  readonly defs: string
  readonly vb: { readonly x: number; readonly y: number; readonly w: number; readonly h: number }
}

export type Condition = 'thriving' | 'quiet' | 'weathered' | 'ruined'

interface ManifestTile {
  readonly id: string
  readonly kind: string
  readonly footprint: string
  readonly orientation: number
  readonly art?: { readonly path: string }
}

interface Manifest {
  readonly tiles: readonly ManifestTile[]
  readonly conditions?: Record<string, { readonly hide: readonly string[]; readonly decals: readonly string[] }>
}

export class TileSet {
  readonly manifest: Manifest
  private readonly cache = new Map<string, PlacedArt>()
  private readonly defs = new Map<string, string>()

  constructor(readonly dir: string) {
    this.manifest = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8')) as Manifest
  }

  /** The tile for `kind/id`, following a deprecated alias (`structure/citadel` is `structure/capital`). */
  tile(kind: string, id: string): ManifestTile | undefined {
    const exact = this.manifest.tiles.find((t) => t.kind === kind && t.id === id)
    if (exact) return exact
    const current = resolveTileKey(`${kind}/${id}` as TileKey)
    return this.manifest.tiles.find((t) => `${t.kind}/${t.id}` === current)
  }

  art(kind: string, id: string): PlacedArt | undefined {
    const key = `${kind}/${id}`
    const hit = this.cache.get(key)
    if (hit) return hit
    const entry = this.tile(kind, id)
    if (!entry?.art) return undefined
    const svg = readFileSync(join(this.dir, entry.art.path), 'utf8')
    const vbMatch = /viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"/.exec(svg)
    if (!vbMatch) throw new Error(`${entry.art.path} has no viewBox`)
    const [, x, y, w, h] = vbMatch.map(Number) as [number, number, number, number, number]
    const defs = /<defs>([\s\S]*?)<\/defs>/.exec(svg)?.[1] ?? ''
    for (const def of defs.match(/<(linearGradient|radialGradient|pattern)[\s\S]*?<\/\1>/g) ?? []) {
      const id = /id="([^"]+)"/.exec(def)?.[1]
      if (id) this.defs.set(id, def)
    }
    const start = svg.indexOf('<g fill="none"')
    const end = svg.lastIndexOf('</svg>')
    const art = { inner: svg.slice(start, end), defs, vb: { x, y, w, h } }
    this.cache.set(key, art)
    return art
  }

  /** Every gradient the placed tiles referred to, once. */
  allDefs(): string {
    return [...this.defs.values()].join('')
  }

  /** The tile's drawing with its anchor at `(x, y)` in the target drawing. */
  place(kind: string, id: string, x: number, y: number, condition: Condition = 'thriving'): string {
    const art = this.art(kind, id)
    if (!art) return ''
    let inner = art.inner
    const rule = this.manifest.conditions?.[condition]
    if (kind === 'structure' && rule?.hide.includes('[data-state="thriving"]')) {
      inner = inner.replace(/<g data-state="thriving">[\s\S]*?<\/g><!--\/thriving-->/g, '')
    }
    let out = `<g transform="translate(${round(x - 128)} ${round(y - 74)})">${inner}</g>`
    if (kind === 'structure') {
      for (const decal of rule?.decals ?? []) out += this.place('decal', decal, x, y)
    }
    return out
  }
}

const round = (n: number): string => String(Math.round(n * 100) / 100)

/** Odd-r offset of an axial hex. */
export const offset = (q: number, r: number): { col: number; row: number } => ({ col: q + (r - (r & 1)) / 2, row: r })

/** Anchor (top-face centre) of an axial hex in isometric pixels, as `isoPosition` in `@knowledgeislands/hexmap`. */
export function isoAnchor(q: number, r: number): { x: number; y: number } {
  const { col, row } = offset(q, r)
  return { x: col * 256 + (row & 1 ? 128 : 0) + 128, y: row * 111 + 74 }
}

/** Axial neighbours in direction order e, ne, nw, w, sw, se. */
export const directions: readonly (readonly [number, number])[] = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1]
]
