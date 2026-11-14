import {
  architecturalFamilies,
  footprints,
  heroStructures,
  islandPalettes,
  loopLengths,
  requiredIds,
  resolveTileKey,
  type TileKey,
  tileGeometry,
  tileKey,
  tileKinds,
  tileScales,
  tileSetSchema,
  tileStates,
  tileStatuses
} from './contract.ts'

export interface TileSetReport {
  /** True when there are no errors. Planned tiles do not make a set invalid, only incomplete. */
  readonly ok: boolean
  /** True when valid and every tile is final. */
  readonly complete: boolean
  readonly errors: readonly string[]
  /** Required tiles absent from the manifest. */
  readonly missing: readonly TileKey[]
  /** Tiles not yet drawn (`planned` or `draft`). */
  readonly unfinished: readonly TileKey[]
  /** Tiles beyond the inventory; allowed, listed for reviewers. */
  readonly extras: readonly TileKey[]
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
const oneOf = (list: readonly (string | number)[], value: unknown): boolean =>
  (typeof value === 'string' || typeof value === 'number') && list.includes(value)

/**
 * Checks a tile-set manifest against the contract: every required id, every structure in every condition state,
 * every tile at 1× and 2×, loops on the animation clock and anchors inside the cell. The optional fields are checked
 * when present: an `edge` footprint only on connectors, a flat twin that is an SVG path, a family only on a hero
 * structure, and palettes from the canon's four.
 */
export function validateTileSet(manifest: unknown): TileSetReport {
  const errors: string[] = []
  const fail = (missing: readonly TileKey[] = requiredIds): TileSetReport => ({
    ok: false,
    complete: false,
    errors,
    missing,
    unfinished: [],
    extras: []
  })
  if (!isRecord(manifest)) {
    errors.push('manifest must be an object')
    return fail()
  }
  if (manifest['schema'] !== tileSetSchema) errors.push(`schema must be "${tileSetSchema}"`)
  for (const key of ['id', 'name'] as const) {
    if (typeof manifest[key] !== 'string' || manifest[key] === '') errors.push(`${key} must be a non-empty string`)
  }
  const paletteError = (value: unknown, at: string): void => {
    if (value !== undefined && !oneOf(islandPalettes, value))
      errors.push(`${at} palette must be one of ${islandPalettes.join(', ')}`)
  }
  paletteError(manifest['palette'], 'manifest')
  const tiles = manifest['tiles']
  if (!Array.isArray(tiles)) {
    errors.push('tiles must be an array')
    return fail()
  }

  const seen = new Set<TileKey>()
  const unfinished: TileKey[] = []
  tiles.forEach((tile: unknown, i) => {
    if (!isRecord(tile) || typeof tile['id'] !== 'string' || !oneOf(tileKinds, tile['kind'])) {
      errors.push(`tiles[${i}] needs a string id and a known kind`)
      return
    }
    const at = tileKey(tile as { kind: (typeof tileKinds)[number]; id: string })
    // A tile listed under a deprecated id covers the tile that replaced it.
    const key = resolveTileKey(at)
    if (seen.has(key)) errors.push(key === at ? `${at} is listed twice` : `${at} is listed twice (as ${key})`)
    seen.add(key)

    if (!oneOf(footprints, tile['footprint'])) errors.push(`${at} footprint must be one of ${footprints.join(', ')}`)
    else if (tile['footprint'] === 'edge' && tile['kind'] !== 'connector') {
      errors.push(`${at} footprint edge is for connectors only`)
    }
    if (
      !(
        Number.isInteger(tile['orientation']) &&
        (tile['orientation'] as number) >= 0 &&
        (tile['orientation'] as number) <= 5
      )
    ) {
      errors.push(`${at} orientation must be an integer from 0 to 5`)
    }
    const anchor = tile['anchor']
    if (
      !isRecord(anchor) ||
      typeof anchor['x'] !== 'number' ||
      typeof anchor['y'] !== 'number' ||
      anchor['x'] < 0 ||
      anchor['x'] > tileGeometry.cell.width ||
      anchor['y'] < 0 ||
      anchor['y'] > tileGeometry.cell.height
    ) {
      errors.push(
        `${at} anchor must be a point inside the ${tileGeometry.cell.width} × ${tileGeometry.cell.height} cell`
      )
    }
    if (!(Number.isInteger(tile['variants']) && (tile['variants'] as number) >= 1)) {
      errors.push(`${at} variants must be a positive integer`)
    }

    const scales = tile['scales']
    const scaleList: unknown[] = Array.isArray(scales) ? scales : []
    for (const scale of tileScales) if (!scaleList.includes(scale)) errors.push(`${at} is missing the ${scale}× scale`)

    const states = tile['states']
    if (tile['kind'] === 'structure') {
      const stateList: unknown[] = Array.isArray(states) ? states : []
      for (const state of tileStates) if (!stateList.includes(state)) errors.push(`${at} is missing the ${state} state`)
    }
    if (Array.isArray(states)) {
      for (const state of states)
        if (!oneOf(tileStates, state)) errors.push(`${at} has unknown state ${JSON.stringify(state)}`)
    }

    const frames = tile['frames']
    if (frames !== undefined && !(isRecord(frames) && oneOf(loopLengths, frames['loop']))) {
      errors.push(`${at} frames.loop must be one of ${loopLengths.join(', ')}`)
    }

    const flat = tile['flat']
    if (flat !== undefined && !(typeof flat === 'string' && /^[^/].*\.svg$/.test(flat))) {
      errors.push(`${at} flat must be a relative path to an .svg file`)
    }
    const family = tile['family']
    if (family !== undefined) {
      if (!oneOf(architecturalFamilies, family)) {
        errors.push(`${at} family must be one of ${architecturalFamilies.join(', ')}`)
      } else if (
        !(tile['kind'] === 'structure' && oneOf(heroStructures, resolveTileKey(at).slice('structure/'.length)))
      ) {
        errors.push(`${at} family is for the hero structures only (${heroStructures.join(', ')})`)
      }
    }
    paletteError(tile['palette'], at)

    const status = tile['status'] ?? 'final'
    if (!oneOf(tileStatuses, status)) errors.push(`${at} status must be one of ${tileStatuses.join(', ')}`)
    else if (status !== 'final') unfinished.push(key)
  })

  const required = new Set(requiredIds)
  const missing = requiredIds.filter((id) => !seen.has(id))
  for (const id of missing) errors.push(`${id} is required but missing`)
  const extras = [...seen].filter((id) => !required.has(id))
  const ok = errors.length === 0
  return { ok, complete: ok && unfinished.length === 0, errors, missing, unfinished, extras }
}
