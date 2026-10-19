# @knowledgeislands/tiles

The tile-set contract: what a set of isometric tiles must contain for the maps to draw with it, and a validator that checks a set's manifest.

## Sets

- **Modern** (`sets/modern/`): clean, engraved and flat; the default for the apps. v0 is drawn as SVG for every required tile (status `draft`): 12 terrains, 16 structures in the thriving state, 4 decals and 4 connectors. `scripts/generate-modern.ts` writes the SVGs and the manifest's `art` entries from parametric shapes; `contact-sheet.png` shows every tile, and `arcadia-iso.png` is Arcadia rendered with them by `scripts/render-iso.ts`.
- **Ancient** (planned): painterly and legendary, in the spirit of the Aesthetics pillar and mood boards; the default for the site.

Generated art is treated as unlicensed until the art-licensing decision is recorded.

### Modern v0 notes

- Each manifest entry's `anchor` stays in cell pixels (the contract keeps it inside the 256 × 196 cell); `art.anchor` is the same point in the SVG's canvas, which extends above the cell for tall art and beside it for the port (pair) and the Capital's compound, `capital` (flower).
- The Capital is drawn civic (GDR-KI-PRINCIPAL-011): the domed Library and the colonnaded Council Hall face an open paved square with a fountain, a stoa on its east side and trees in its south-east corner, on a low dais with open stairs down both front faces. Nothing fortifies it: no tower, keep, battlements or walls.
- The manifest's top-level `aliases` maps deprecated keys to their replacements (`structure/citadel` → `structure/capital`, from `tileAliases` in the contract). `TileSet.tile` in `scripts/compose.ts` follows them, so a map that still says `citadel` renders the Capital.
- Quiet, weathered and ruined are not separate drawings: the top-level `conditions` block says which layer to hide (`[data-state="thriving"]`: lit windows, smoke, lamps, pennants) and which decals to stack. The contract lists states but cannot yet express this composition, so `validateTileSet` checks only that all four are declared.
- Only frame 0 is drawn; `frames` records the intended loops, which follow the animation standard (the lighthouse 24, the mill 12; GDR-KI-DESIGN-022). No flat SVG twins and no extra variants yet.
- Fills are CSS custom properties with token fallbacks (`--terrain-*`, `--tile-*`, `--bld-*`), so themes and island palettes can override them. Water in the ocean and coastal tiles is `--tile-water`, from `color.tile.water`.
- `bridge` draws the Causeway, the translation layer (GDR-KI-DESIGN-018). v0 still draws a stone arch; renaming the id to `causeway`, with `bridge` as an alias, and redrawing it is later work.
- Without auto-tiled edges, coastal tiles always face the water to the south and rivers run north-east to south-west.

## Geometry

At 1×, the top face is a pointy-top hex 256 wide and 148 tall (2:1 dimetric). A 48 px plinth sits below, making a 256 × 196 cell. Rows step by 111 and odd rows shift right by 128 (odd-r offset). The default anchor, the cell pixel placed on the hex centre, is the middle of the top face, (128, 74). `@knowledgeislands/hexmap` uses the same numbers in `isoPosition` and `isoProject`.

## The contract

A set is valid only when it covers the whole inventory, every structure in every condition state, at 1× and 2×:

- **Terrain** (12): grassland, forest, hills, mountain, coastal, cliffs, sand, river, marsh, snow, volcanic, ocean.
- **Structures** (16): capital (the Capital's compound; `citadel` is accepted as a deprecated alias, and the validator counts a tile listed under it as the Capital), library, council-hall, observatory, lighthouse, port, dock, rail-depot, airport, customs-house, bridge, workshop, mill, ruins, ancient-forest, cottage. Each in thriving, quiet, weathered and ruined.
- **Decals** (4): ivy, cracks, moss, fallen-roof.
- **Connectors** (4): road, river, bridge-span, quay.

**Footprints are each set's choice, apart from the Capital's flower**, which the contract fixes (GDR-KI-DESIGN-022). Manifest fields for the flat SVG twin, the architectural family, the island palette and an `edge` footprint for connectors are added when the Ancient set needs them.

A tile is identified by kind and id together, so `terrain/river` and `connector/river` are different tiles. Each entry:

```ts
interface TileEntry {
  id: string
  kind: 'terrain' | 'structure' | 'decal' | 'connector'
  footprint: 'single' | 'pair' | 'flower' // one hex, two adjacent hexes, or a hex and its six neighbours
  orientation: 0 | 1 | 2 | 3 | 4 | 5 // sixths of a turn
  anchor: { x: number; y: number } // inside the 256 × 196 cell
  variants: number // at least 1
  states?: ('thriving' | 'quiet' | 'weathered' | 'ruined')[] // all four for structures
  scales: (1 | 2)[] // both
  frames?: { loop: 4 | 6 | 8 | 12 | 16 | 24 | 48 } // on the 12 fps clock; frame 0 is the still
  status?: 'planned' | 'draft' | 'final' // defaults to final
}
```

## Community sets

Anyone may make a set. Put a `manifest.json` (`schema: 'tileset/v1'`) beside the art, cover the whole inventory, and run `validateTileSet`. Extra tiles are welcome and are listed as `extras`; they do not fail validation. A set is `complete` when it is valid and every tile is `final`.

## API

```ts
import { validateTileSet } from '@knowledgeislands/tiles'

const report = validateTileSet(manifest)
// { ok, complete, errors, missing, unfinished, extras }
```

Also exported: `requiredInventory`, `requiredIds`, `tileKey`, `tileGeometry`, `defaultAnchor`, `tileKinds`, `footprints`, `tileStates`, `tileScales`, `tileStatuses`, `loopLengths` and the types.
