import { type LoopLength, loopLengths, terrainNames } from '@knowledgeislands/tokens'

export const tileSetSchema = 'tileset/v1'

export const tileKinds = ['terrain', 'structure', 'decal', 'connector'] as const
export type TileKind = (typeof tileKinds)[number]

/** `single`: one hex. `pair`: two adjacent hexes. `flower`: a hex and its six neighbours. */
export const footprints = ['single', 'pair', 'flower'] as const
export type Footprint = (typeof footprints)[number]

/** Condition states every structure must be drawn in. */
export const tileStates = ['thriving', 'quiet', 'weathered', 'ruined'] as const
export type TileState = (typeof tileStates)[number]

/** Pixel densities every tile must ship at. */
export const tileScales = [1, 2] as const
export type TileScale = (typeof tileScales)[number]

/** Rotation in sixths of a turn, clockwise from east-facing. */
export type Orientation = 0 | 1 | 2 | 3 | 4 | 5

export const tileStatuses = ['planned', 'draft', 'final'] as const
export type TileStatus = (typeof tileStatuses)[number]

export { type LoopLength, loopLengths }

/**
 * Geometry every set shares, at 1×. The top face is a pointy-top hex 256 wide and 148 tall (2:1 dimetric); the plinth
 * adds 48 below it, making a 256 × 196 cell. Rows step by 111 and odd rows shift right by 128.
 */
export const tileGeometry = {
  width: 256,
  height: 148,
  plinth: 48,
  cell: { width: 256, height: 196 },
  rowStep: 111,
  oddRowOffset: 128
} as const

/** Default anchor: the centre of the top face, in cell pixels. */
export const defaultAnchor = { x: tileGeometry.width / 2, y: tileGeometry.height / 2 } as const

export interface TileEntry {
  readonly id: string
  readonly kind: TileKind
  readonly footprint: Footprint
  readonly orientation: Orientation
  /** The cell pixel that sits on the hex centre. */
  readonly anchor: { readonly x: number; readonly y: number }
  /** Number of interchangeable drawings, at least 1. */
  readonly variants: number
  /** Required, and complete, for structures. */
  readonly states?: readonly TileState[]
  readonly scales: readonly TileScale[]
  /** Animated tiles loop on the 12 fps clock; frame 0 is the still. */
  readonly frames?: { readonly loop: LoopLength }
  readonly status?: TileStatus
}

export interface TileManifest {
  readonly schema: typeof tileSetSchema
  readonly id: string
  readonly name: string
  readonly description?: string
  readonly licence?: string
  readonly tiles: readonly TileEntry[]
}

/** A tile is identified by kind and id together: `terrain/river` and `connector/river` are different tiles. */
export type TileKey = `${TileKind}/${string}`
export const tileKey = (tile: Pick<TileEntry, 'kind' | 'id'>): TileKey => `${tile.kind}/${tile.id}`

/**
 * `capital` is the Capital's compound: the Library and the Council Hall around an open civic square on a 7-hex flower
 * (GDR-KI-PRINCIPAL-011). Its old id, `citadel`, is a deprecated alias (see `tileAliases`). The Tower is no longer
 * required: a set may still carry its drawing as an extra.
 */
const structureIds = [
  'capital',
  'library',
  'council-hall',
  'observatory',
  'lighthouse',
  'port',
  'dock',
  'rail-depot',
  'airport',
  'customs-house',
  'bridge',
  'workshop',
  'mill',
  'ruins',
  'ancient-forest',
  'cottage'
] as const
const decalIds = ['ivy', 'cracks', 'moss', 'fallen-roof'] as const
const connectorIds = ['road', 'river', 'bridge-span', 'quay'] as const

/** The inventory every complete set must cover. */
export const requiredInventory: Readonly<Record<TileKind, readonly string[]>> = {
  terrain: terrainNames,
  structure: structureIds,
  decal: decalIds,
  connector: connectorIds
}

/**
 * Deprecated tile keys and the key that replaced each. Maps and sets drawn with an old id keep working: renderers
 * resolve an alias before looking a tile up, and the validator counts a tile listed under an old id as covering its
 * replacement.
 */
export const tileAliases: Readonly<Record<string, TileKey>> = {
  'structure/citadel': 'structure/capital'
}

/** The current key for a tile key, following a deprecated alias when there is one. */
export const resolveTileKey = (key: TileKey): TileKey => tileAliases[key] ?? key

/** Every required tile as a `kind/id` key, in inventory order. */
export const requiredIds: readonly TileKey[] = tileKinds.flatMap((kind) =>
  requiredInventory[kind].map((id) => tileKey({ kind, id }))
)
