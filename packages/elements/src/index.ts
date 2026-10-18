import { defineKiGlyph } from './glyph.ts'
import { defineKiHexmap } from './hexmap.ts'

export { defineKiGlyph, KiGlyph, kiGlyphStyles } from './glyph.ts'
export { defineKiHexmap, iconGlyph, KiHexmap, type KiSelectDetail, kiHexmapStyles } from './hexmap.ts'

/** Registers `<ki-glyph>` and `<ki-hexmap>`. Importing this module does it for you. */
export function defineElements(): void {
  defineKiGlyph()
  defineKiHexmap()
}

defineElements()
