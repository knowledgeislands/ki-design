import { type TerrainName, terrainNames } from '@knowledgeislands/tokens'
import { type Axial, hexKey } from './coords.ts'

export const islandMapSchema = 'islandmap/v1'

export const conditions = ['thriving', 'quiet', 'weathered', 'ruined'] as const
export type Condition = (typeof conditions)[number]

export const routeKinds = ['active', 'pending'] as const
export type RouteKind = (typeof routeKinds)[number]

export type { TerrainName }

/** One hex of an island. `structure` is a tile id such as `lighthouse`. */
export interface MapHex extends Axial {
  readonly terrain: TerrainName
  readonly structure?: string
  readonly condition?: Condition
}

export interface MapRoute {
  readonly from: Axial
  readonly to: Axial
  readonly kind: RouteKind
}

export interface MapLabel extends Axial {
  readonly text: string
}

/** An island map, `islandmap/v1`. */
export interface IslandMap {
  readonly schema: typeof islandMapSchema
  readonly id: string
  readonly name: string
  readonly hexes: readonly MapHex[]
  readonly routes?: readonly MapRoute[]
  readonly labels?: readonly MapLabel[]
}

export type ValidationResult =
  | { readonly ok: true; readonly map: IslandMap }
  | { readonly ok: false; readonly errors: string[] }

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
const isInt = (value: unknown): value is number => Number.isInteger(value)
const isAxial = (value: unknown): value is Axial => isRecord(value) && isInt(value['q']) && isInt(value['r'])
const includes = <T extends string>(list: readonly T[], value: unknown): value is T =>
  typeof value === 'string' && (list as readonly string[]).includes(value)

/** Checks an unknown value against `islandmap/v1`, collecting every problem rather than stopping at the first. */
export function validateIslandMap(value: unknown): ValidationResult {
  const errors: string[] = []
  if (!isRecord(value)) return { ok: false, errors: ['map must be an object'] }
  if (value['schema'] !== islandMapSchema) errors.push(`schema must be "${islandMapSchema}"`)
  for (const key of ['id', 'name'] as const) {
    if (typeof value[key] !== 'string' || value[key] === '') errors.push(`${key} must be a non-empty string`)
  }

  const keys = new Set<string>()
  const hexes = value['hexes']
  if (!Array.isArray(hexes) || hexes.length === 0) errors.push('hexes must be a non-empty array')
  else {
    for (const [i, h] of (hexes as unknown[]).entries()) {
      const at = `hexes[${i}]`
      if (!isAxial(h)) {
        errors.push(`${at} needs integer q and r`)
        continue
      }
      const key = hexKey(h)
      if (keys.has(key)) errors.push(`${at} duplicates hex ${key}`)
      keys.add(key)
      const { terrain, structure, condition } = h as unknown as Record<string, unknown>
      if (!includes(terrainNames, terrain)) errors.push(`${at} has unknown terrain ${JSON.stringify(terrain)}`)
      if (structure !== undefined && (typeof structure !== 'string' || !/^[a-z]+(-[a-z]+)*$/.test(structure))) {
        errors.push(`${at} structure must be a kebab-case id`)
      }
      if (condition !== undefined && !includes(conditions, condition)) {
        errors.push(`${at} has unknown condition ${JSON.stringify(condition)}`)
      }
    }
  }

  const routes = value['routes']
  if (routes !== undefined) {
    if (!Array.isArray(routes)) errors.push('routes must be an array')
    else {
      for (const [i, route] of (routes as unknown[]).entries()) {
        const at = `routes[${i}]`
        if (!isRecord(route)) {
          errors.push(`${at} must be an object`)
          continue
        }
        for (const end of ['from', 'to'] as const) {
          const point = route[end]
          if (!isAxial(point)) errors.push(`${at}.${end} needs integer q and r`)
          else if (!keys.has(hexKey(point))) errors.push(`${at}.${end} is not a hex on the map`)
        }
        if (!includes(routeKinds, route['kind'])) errors.push(`${at}.kind must be "active" or "pending"`)
      }
    }
  }

  const labels = value['labels']
  if (labels !== undefined) {
    if (!Array.isArray(labels)) errors.push('labels must be an array')
    else {
      for (const [i, label] of (labels as unknown[]).entries()) {
        if (!isAxial(label) || typeof (label as unknown as Record<string, unknown>)['text'] !== 'string') {
          errors.push(`labels[${i}] needs integer q and r and a text string`)
        }
      }
    }
  }

  return errors.length > 0 ? { ok: false, errors } : { ok: true, map: value as unknown as IslandMap }
}

/** Like `validateIslandMap`, but throws a single error listing every problem. */
export function assertIslandMap(value: unknown): IslandMap {
  const result = validateIslandMap(value)
  if (!result.ok) throw new TypeError(`Invalid island map:\n- ${result.errors.join('\n- ')}`)
  return result.map
}
