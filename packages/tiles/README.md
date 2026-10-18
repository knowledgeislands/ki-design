# @knowledgeislands/tiles

The tile-set contract: what a set of isometric tiles must contain for the maps to draw with it, and a validator that checks a set's manifest.

## Sets

- **Modern** (`sets/modern/`): clean, engraved and flat; the default for the apps. v0 is drawn as SVG for every required tile (status `draft`): 12 terrains, 17 structures in the thriving state, 4 decals and 4 connectors. `scripts/generate-modern.ts` writes the SVGs and the manifest's `art` entries from parametric shapes; `contact-sheet.png` shows every tile, and `arcadia-iso.png` is Arcadia rendered with them by `scripts/render-iso.ts`.
- **Ancient** (planned): painterly and legendary, in the spirit of the Aesthetics pillar and mood boards; the default for the site.

Generated art is treated as unlicensed until the art-licensing decision is recorded.

### Modern v0 notes

- Each manifest entry's `anchor` stays in cell pixels (the contract keeps it inside the 256 × 196 cell); `art.anchor` is the same point in the SVG's canvas, which extends above the cell for tall art and beside it for the port (pair) and citadel (flower).
- Quiet, weathered and ruined are not separate drawings: the top-level `conditions` block says which layer to hide (`[data-state="thriving"]`: lit windows, smoke, lamps, pennants) and which decals to stack. The contract lists states but cannot yet express this composition, so `validateTileSet` checks only that all four are declared.
- Only frame 0 is drawn; `frames` records the intended loops. No flat SVG twins and no extra variants yet.
- Fills are CSS custom properties with token fallbacks (`--terrain-*`, `--tile-*`, `--bld-*`), so themes and island palettes can override them.
- Without auto-tiled edges, coastal tiles always face the water to the south and rivers run north-east to south-west.

## Geometry

At 1×, the top face is a pointy-top hex 256 wide and 148 tall (2:1 dimetric). A 48 px plinth sits below, making a 256 × 196 cell. Rows step by 111 and odd rows shift right by 128 (odd-r offset). The default anchor, the cell pixel placed on the hex centre, is the middle of the top face, (128, 74). `@knowledgeislands/hexmap` uses the same numbers in `isoPosition` and `isoProject`.

## The contract

A set is valid only when it covers the whole inventory, every structure in every condition state, at 1× and 2×:

- **Terrain** (12): grassland, forest, hills, mountain, coastal, cliffs, sand, river, marsh, snow, volcanic, ocean.
- **Structures** (17): citadel (the Capital), library, council-hall, tower, observatory, lighthouse, port, dock, rail-depot, airport, customs-house, bridge, workshop, mill, ruins, ancient-forest, cottage. Each in thriving, quiet, weathered and ruined.
- **Decals** (4): ivy, cracks, moss, fallen-roof.
- **Connectors** (4): road, river, bridge-span, quay.

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
