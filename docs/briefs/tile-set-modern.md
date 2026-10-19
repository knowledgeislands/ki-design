# Brief: tile set — Modern

## Goal

The clean, engraved tile set: crisp at any size, drawn from the tokens, and the default for the local app, docs, diagrams and print. It is also the flat twin of everything in the Ancient set. The "Hex tile kit" board on the early design canvas is its first sketch.

## Look

- Engraved ink linework (1.25 px at 1×, deep ink), flat fills from the token palette, brass only for small accents (lanterns, finials).
- Terrain carries a small ink motif (pines for forest, contour ticks for hills, peaks for mountain, wave dashes for ocean, reeds for marsh, dunes for sand).
- Buildings are simple isometric line drawings with low-opacity fills; one glance tells a library from a lighthouse.
- Works in light (parchment) and night (navy) by swapping token roles, not by redrawing.

## Inventory (the tile-set contract)

| Kind | Ids |
| --- | --- |
| Terrain (12) | `grassland`, `forest`, `hills`, `mountain`, `coastal`, `cliffs`, `sand`, `river`, `marsh`, `snow`, `volcanic`, `ocean` |
| Structures (16) | `capital` (the Capital: Library + Council Hall around an open square, 7-hex flower, no tower; `citadel` is a deprecated alias), `library`, `council-hall`, `observatory`, `lighthouse`, `port`, `dock`, `rail-depot`, `airport`, `customs-house`, `causeway` (the Causeway, the translation layer: a low stone way on culverts across shallow water, never fortified; `bridge` is a deprecated alias; GDR-KI-DESIGN-018), `workshop`, `mill`, `ruins`, `ancient-forest`, `cottage` |
| Decals (4) | `ivy`, `cracks`, `moss`, `fallen-roof` |
| Connectors (4) | `road`, `river`, `bridge-span`, `quay` |

Every structure in 4 condition states (thriving, quiet, weathered, ruined); 3 variants for terrain and the five hero structures; animated tiles follow the [animation standard](animation-standard.md).

## Format

- SVG per tile (isometric) plus a flat top-down SVG per tile; `currentColor` and CSS variables for every fill so themes apply.
- A `manifest.json` in `packages/tiles/sets/modern/` listing every id with footprint, orientation, anchor, variants, states and frames, valid against `validateTileSet`.

## Judged by

`validateTileSet` passes; every tile follows the [building standards](building-standards.md); text-free; recognisable at 32 px wide; contrast of linework ≥ 3:1 on both papers.
