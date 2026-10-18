/**
 * Options for the committed example renders. The glyph set is a development dependency only: the engine itself takes
 * any `GlyphResolver`, and the icons package is injected here as consumers would inject it.
 */
import { iconBodies, isIconName } from '@knowledgeislands/icons'
import type { FlatOptions, FlatTheme, GlyphResolver } from './render.ts'

export const iconGlyph: GlyphResolver = (id) => (isIconName(id) ? iconBodies[id] : undefined)

export const exampleOptions = (theme: FlatTheme): FlatOptions => ({
  theme,
  glyph: iconGlyph,
  selected: { q: 0, r: 0 }
})
