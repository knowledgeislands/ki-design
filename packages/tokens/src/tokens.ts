import doc from '../tokens.json' with { type: 'json' }
import { mix } from './colour.ts'

export const coreNames = [
  'navy',
  'ocean',
  'teal',
  'forest',
  'moss',
  'sandstone',
  'parchment',
  'gold',
  'text-gold',
  'rust',
  'mist',
  'ink',
  'ink-light',
  'border',
  'border-light'
] as const
export type CoreName = (typeof coreNames)[number]

export const themes = ['light', 'night'] as const
export type Theme = (typeof themes)[number]

export const roleNames = ['paper', 'ink', 'muted', 'accent', 'ok', 'teal', 'warn', 'bad', 'rule', 'boundary'] as const
export type RoleName = (typeof roleNames)[number]

/** Roles drawn as text on paper; each must hold the 4.5:1 text floor. */
export const textRoles = ['ink', 'muted', 'accent', 'ok', 'teal', 'warn', 'bad'] as const satisfies readonly RoleName[]
export type TextRole = (typeof textRoles)[number]

export const washNames = ['ok', 'warn', 'bad'] as const
export type WashName = (typeof washNames)[number]

/** How far each wash's source colour is mixed into paper. */
export const washAmount: Readonly<Record<WashName, number>> = { ok: 0.12, warn: 0.08, bad: 0.12 }

export const terrainNames = [
  'grassland',
  'forest',
  'hills',
  'mountain',
  'coastal',
  'cliffs',
  'sand',
  'river',
  'marsh',
  'snow',
  'volcanic',
  'ocean'
] as const
export type TerrainName = (typeof terrainNames)[number]

export const seaNames = ['deep', 'sea', 'shallow', 'current', 'lane'] as const
export type SeaName = (typeof seaNames)[number]

export const fontNames = ['display', 'smallcaps', 'body', 'sans', 'serif', 'mono'] as const
export type FontName = (typeof fontNames)[number]

export const spaceSteps = [2, 4, 8, 12, 16, 24, 32, 48, 64] as const
export type SpaceStep = (typeof spaceSteps)[number]

export const radiusNames = ['sm', 'md', 'lg'] as const
export type RadiusName = (typeof radiusNames)[number]

export const loopLengths = [4, 6, 8, 12, 16, 24, 48] as const
export type LoopLength = (typeof loopLengths)[number]

interface Token<T> {
  readonly $value: T
  readonly $description?: string
}

function values<K extends string, T>(group: { readonly [P in K]: Token<T> }, keys: readonly K[]): Record<K, T> {
  const out = {} as Record<K, T>
  for (const key of keys) out[key] = group[key].$value
  return out
}

const loops = doc.motion.cycle.$extensions['uk.knowledgeislands.loops']

/** The token document as authored, for tools that want the DTCG tree. */
export const tokenDocument = doc

/** Every token value, resolved and typed. */
export const tokens = {
  core: values<CoreName, string>(doc.color.core, coreNames),
  roles: {
    light: values<RoleName, string>(doc.color.role.light, roleNames),
    night: values<RoleName, string>(doc.color.role.night, roleNames)
  },
  washes: {
    light: values<WashName, string>(doc.color.wash.light, washNames),
    night: values<WashName, string>(doc.color.wash.night, washNames)
  },
  terrain: values<TerrainName, string>(doc.color.terrain, terrainNames),
  /** Map water by theme (DESIGN 5.5). */
  sea: {
    light: values<SeaName, string>(doc.color.sea.light, seaNames),
    night: values<SeaName, string>(doc.color.sea.night, seaNames)
  },
  fonts: {
    display: doc.font.site.display.$value,
    smallcaps: doc.font.site.smallcaps.$value,
    body: doc.font.site.body.$value,
    sans: doc.font.app.sans.$value,
    serif: doc.font.app.serif.$value,
    mono: doc.font.mono.$value
  } satisfies Record<FontName, readonly string[]>,
  space: Object.fromEntries(spaceSteps.map((step) => [step, doc.space[step].$value])) as Record<SpaceStep, string>,
  radius: values<RadiusName, string>(doc.radius, radiusNames),
  motion: { fps: doc.motion.fps.$value, cycle: doc.motion.cycle.$value, loops: loops as readonly LoopLength[] }
} as const

export type Tokens = typeof tokens

/**
 * The colour mixed into paper to make a wash: the ok and bad roles themselves, and decorative gold for warn (the
 * light warn role is text gold, which would muddy the wash).
 */
export function washSource(theme: Theme, wash: WashName, t: Tokens = tokens): string {
  return wash === 'warn' ? t.core.gold : t.roles[theme][wash]
}

/** How far each day terrain fill is mixed into navy for the night chart (DESIGN 5.6). */
export const nightTerrainAmount = 0.45

/**
 * Night terrain fills: each day fill mixed 45 % into navy, so the chart keeps its hues by lantern-light. Pass a
 * partial palette to derive night values for overridden fills too.
 */
export function nightTerrain(
  fills: Readonly<Record<TerrainName, string>> = tokens.terrain,
  t: Tokens = tokens
): Record<TerrainName, string> {
  const out = {} as Record<TerrainName, string>
  for (const name of terrainNames) out[name] = mix(t.core.navy, fills[name], nightTerrainAmount)
  return out
}
