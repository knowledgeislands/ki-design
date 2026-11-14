import { defineTesseraGlyph } from './glyph.ts'
import { defineTesseraHexmap } from './hexmap.ts'

export { defineTesseraGlyph, TesseraGlyph, tesseraGlyphStyles } from './glyph.ts'
export {
  defineTesseraHexmap,
  iconGlyph,
  TesseraHexmap,
  type TesseraSelectDetail,
  tesseraHexmapStyles
} from './hexmap.ts'

/** Registers `<tessera-glyph>` and `<tessera-hexmap>`. Importing this module does it for you. */
export function defineElements(): void {
  defineTesseraGlyph()
  defineTesseraHexmap()
}

defineElements()
