---
title: Tiles and buildings
status: draft
updated: 2026-10-19
---

# Tiles and buildings

A tile set is a skin over one inventory of ids, drawn on pointy-top hexes in 2:1 dimetric projection with light from the top-left. The contract is data: [`packages/tiles/src/contract.ts`](../../packages/tiles/src/contract.ts) holds the geometry, the required inventory (12 terrains, 16 structures, 4 decals, 4 connectors), the entry schema and `validateTileSet`; the [tiles README](../../packages/tiles/README.md) explains them; and each set's manifest, such as [`sets/modern/manifest.json`](../../packages/tiles/sets/modern/manifest.json), lists what it has drawn. This file holds the rules the data cannot express: footprints and the Capital, what is not terrain, condition decals, auto-tiling, layering, building standards, architectural families, what lies beyond the contract, and the budgets.

## Proposed terrain composition

The [hex terrain composition proposal](hex-terrain-composition.md) develops small construction cells, per-corner heights, irregular compounds and explicit cliff and waterfall connections. It is not implemented by the current contract or renderer; the existing geometry and footprint rules below remain in force. Its [research notes](../briefs/hex-terrain-research.md) and [local studies](../../+/art/2026-10-19-arcadia-hex-composition-study/NOTES.md) preserve the supporting knowledge.

## Geometry

The grid is recorded in [GDR-KI-DESIGN-003](../decisions/GDR-KI-DESIGN-003-hex-grid-geometry.md); the numbers are in `tileGeometry` and in `@knowledgeislands/hexmap` (`isoPosition`, `isoProject`).

- **Pointy-top** hexes, axial `(q, r)`; cube coordinates for distance and pathing; odd-r offset layout.
- 2:1 dimetric projection; every sprite is normalised to it.
- At 1×, the top face is **256 × 148 px**; the horizontal step is 256 px, the row step **111 px**, and odd rows shift **+128 px**.
- A **48 px** plinth sits below the top face: a darker cliff face with stratified rock bands. The sprite cell is **256 × 196 px** at 1×; taller structures extend upward from the anchor.
- Every raster comes at 1× and 2× (512 × 296 top face, 512 × 392 cell); the flat SVG twin works at any size.
- **Light is top-left and fixed.** Never rotate painted art.

## Footprints

| Footprint | Hexes | Orientation | Re-cut rule from square sheets |
| --- | --- | --- | --- |
| Single | 1 | — | 1×1 → 1 hex |
| Pair | 2 (oriented) | 0–5 (which neighbour) | 1×2 / 2×1 → pair |
| Flower | 7 (centre + ring) | — | 2×2 to 4×4 → flower; square plinth matted out, hex plinth repainted |
| Edge | Along one edge of a hex | 0–5 (which edge) | Connectors only: a river, road or quay drawn along a hex edge rather than across the hex |

Each set declares each tile's footprint in its manifest. The `edge` footprint is for connectors only; the validator rejects it on any other kind. **The contract fixes only the Capital's; every other footprint is the set's choice** ([GDR-KI-DESIGN-022](../decisions/GDR-KI-DESIGN-022-tile-loops-follow-the-animation-standard-footprints-are-each-set-s-choice.md)). The Modern set draws every structure on a single hex except the Port (a pair) and the Capital (a flower). The earlier spec's suggestions (Council Hall and Workshop as pairs; Library single or pair; Port pair or flower; ancient forest single or flower) are options a set may take, not rules.

### The Capital

The Capital (`structure/capital`; `structure/citadel` is a deprecated alias that renderers and the validator still resolve) is always a compound across a **7-hex flower**: the Library and the Council Hall around an open civic square ([GDR-KI-DESIGN-008](../decisions/GDR-KI-DESIGN-008-the-capital-and-the-non-combative-principle.md)).

- It may be drawn as one sprite spanning the flower (as the Modern set does) or as separate buildings on ring hexes, but never as a single-hex building and never walled.
- Each set draws it its own way: a civic quarter and square in Modern, a hilltop forum or acropolis in Ancient.
- The Modern compound draws the domed Library and the colonnaded Council Hall facing an open paved square with a fountain and a stoa, on a low dais with open stairs down both front faces, and no tower.

## Terrain

The twelve terrain ids are the whole terrain contract. Each has a flat fill ([colour.md](colour.md#terrain-fills-flat)) and a pattern.

| Terrain | Notes |
| --- | --- |
| `ocean` | Includes a deep variant; animated shimmer. The flat chart paints it in the theme's `sea`; isometric tiles paint their water in `color.tile.water` (`--tile-water`) |
| `coastal` | Beach and shallows; the water edge is auto-tiled |
| `grassland` | Default inhabited ground |
| `forest` | Ordinary woodland. Jungle (emerging knowledge) is a forest variant in tropical palettes, not a separate id |
| `hills` | |
| `mountain` | High stone; stable foundational knowledge |
| `cliffs` | Elevation step; edge overlay |
| `sand` | Dry, shifting sands (experimental ground) |
| `river` | A river hex; a river along edges is `connector/river` |
| `marsh` | Unsettled, emerging ground |
| `snow` | |
| `volcanic` | Rare; volatile knowledge; no lava glow, dull ember only |

**Not terrain:** `ancient-forest` and `ruins` are structures; uncharted is fog, a map state ([meaning.md](meaning.md#signals)).

## Structures

The sixteen structure ids are in the contract. Their status follows the symbol library. Rules the contract does not carry:

- `ancient-forest` never shares a hex with another structure.
- `airport` is a mooring mast with an airship; `causeway` is the **Causeway**, the translation layer: a low stone way on culvert arches joining two grounds across shallow water, so that what crosses keeps its footing on both sides. It is civic, never fortified. `structure/bridge` is its deprecated alias, as `structure/citadel` is the Capital's ([GDR-KI-DESIGN-018](../decisions/GDR-KI-DESIGN-018-the-causeway-is-the-translation-symbol-bridge-names-the-act-command.md)). `dock` sits on the coast edge; `lighthouse` stands on the coast.
- `cottage` is the generic dwelling.
- `mill` is the Mill: a stone house with a waterwheel, the drawn form of `Admin/Operations`.
- The Port draws its modes as districts.

### Variants and states

- **Variants.** The contract requires at least one. The briefs set the release target: three variants for terrain and the five hero structures, one for other structures ([building standards](../briefs/building-standards.md)). Hero structures also have one variant per architectural family. Modern v0 has one of each.
- **States.** Every structure declares all four condition states: thriving, quiet, weathered and ruined.
- **Frames.** A tile's loop length is declared in its manifest (`frames.loop`), from the allowed lengths in [motion.md](motion.md). Frame 0 is the still. Modern v0 draws frame 0 only.

## Condition states as decals

To keep the matrix shippable, condition states are **alpha decal overlays under the same light**, not full repaints:

- `thriving`: lit windows, chimney smoke, a flag;
- `quiet`: base art, unlit;
- `weathered`: moss, ivy, a crack, a missing tile;
- `ruined`: fallen roof piece, broken wall, overgrowth.

They are built from the four decal ids (`ivy`, `cracks`, `moss`, `fallen-roof`). A set's manifest says how it composes them; the Modern manifest's `conditions` block names the layer to hide and the decals to stack for each state. Sprite sheets carry one row per state and one column per frame; frame 0 of each row is the still.

## Auto-tiling per edge

Painted art under fixed light cannot be rotated, so transitions are composited per edge.

- For each transition (water/land, cliff/land, sand/grass, river/land) draw **6 edge and 6 corner overlays**.
- A **6-bit neighbour mask** chooses which overlays to stack: bit 0 is east, then anticlockwise in pointy-top axial order (E, NE, NW, W, SW, SE). `neighbourMask` in the hexmap package computes it.
- Water edges animate in phase with their neighbours on the shared clock.

Modern v0 has no auto-tiled edges yet: coastal tiles always face the water to the south and rivers run north-east to south-west.

## Layering

| Flat renderer (SVG) | Isometric renderer (Canvas 2D) |
| --- | --- |
| 1. Terrain fills and patterns | Per cell, in painter's order, **back row to front**, left to right: |
| 2. Water edges (auto-tiled) | a. terrain and edge overlays |
| 3. Structures (flat glyph-tiles) | b. plinth |
| 4. Routes and currents | c. ground ribbons (routes, currents) and influence tint or hex outline |
| 5. Influence tint (territory) | d. structure |
| 6. Signal markers | e. decals (condition, signals) |
| 7. Labels (on a halo) | After all cells: markers, labels, fog banks |

## Building standards

The full brief is [building-standards.md](../briefs/building-standards.md).

1. **Light top-left**, warm; shadows fall bottom-right at a consistent length (about 0.35 × height, _proposed_).
2. **Anchor** at the centre of the anchor hex's top face, recorded in pixels in the manifest.
3. **Overhang** beyond the footprint's top-face outline is at most **8 %** of tile width; nothing overhangs the front plinth edge.
4. **Outline** 1.25 px at 1× (2.5 px at 2×), in deep ink (Modern) or a darkened local colour (Ancient). **Never pure black.**
5. **Palette from tokens** and the island palette; no colour outside [colour.md](colour.md).
6. **Scale** (_proposed_): a door is about 12 px tall at 1×; a storey about 18 px; a hero structure may reach two cells' height.
7. **Silhouette first:** every structure reads as a silhouette at 25 % scale (64 px wide); Modern tiles are recognisable at 32 px wide.
8. **No text**, logos or worded flags on any building.
9. **Families** apply only to the five hero structures (Capital, Library, Council Hall, Port, Lighthouse). Other structures share one vernacular per set.

| Archetype | Family | Materials and silhouette |
| --- | --- | --- |
| Engineering Forge | Industrial vernacular | Slate roofs, stone and timber, chimneys, waterwheels |
| Research Archipelago | Classical observatory | Pale limestone, domes, colonnades, telescopes |
| Creative Wilderness | Organic | Thatch, living roofs, treehouses, carved wood |
| Learning Realm | Collegiate | Cloisters, cloister and college towers, courtyards, ivy |
| Enterprise Territory | Civic harbour town | Brick, clock towers, cranes, warehouses |
| Personal Isle | Cottage | Single hearth, garden wall, a small jetty |
| Community | Commons | Meeting hall, market square, shared gardens |

**Civic towers are allowed as architecture, never fortified and never on the Capital** ([GDR-KI-DESIGN-021](../decisions/GDR-KI-DESIGN-021-civic-towers-in-the-architectural-families.md)): a clock tower (which also draws the Calendar zone) in the Civic harbour town, cloister or college towers in the Collegiate family. A civic tower has no battlements, arrow slits, machicolations, curtain wall or gatehouse, never stands on the Capital's flower, and is not a symbol: the retired `tower` stays retired.

## The tile-set contract

A tile set is a skin over the same ids. Two sets exist: **Modern** (v0 drawn, now frozen as the contract's reference and test fixture) and **Ancient**, the only isometric set going forward ([GDR-KI-DESIGN-038](../decisions/GDR-KI-DESIGN-038-ancient-is-the-only-isometric-tile-set-the-flat-chart-keeps-its-engraved-treatment.md)). A community set is valid when it covers every contract id and passes `validateTileSet` and the building standards; a set is _complete_ when it is valid and every tile is final. Extra tiles are welcome and are reported as extras. An island may adopt any valid set as local character; the local app's flat chart keeps the engraved flat treatment.

### Optional manifest fields

Four fields describe how a tile was drawn rather than what it is. They are optional, so a set without them stays valid; `validateTileSet` checks them only when they are present ([GDR-KI-DESIGN-022](../decisions/GDR-KI-DESIGN-022-tile-loops-follow-the-animation-standard-footprints-are-each-set-s-choice.md)).

| Field | Where | Values | Rule |
| --- | --- | --- | --- |
| `flat` | Tile | A relative path to an `.svg` beside the manifest | The flat SVG twin for UI, print and small sizes. The building standards ask for one per structure; the contract does not yet require it |
| `family` | Tile | `industrial-vernacular`, `classical-observatory`, `organic`, `collegiate`, `civic-harbour-town`, `cottage`, `commons` | The architectural family of this drawing. Hero structures only (Capital, Library, Council Hall, Port, Lighthouse); a tile listed under a deprecated id counts as its replacement |
| `palette` | Set, and tile as an override | `archipelago`, `savanna`, `natural-colours`, `glass-and-stone` | The island palette the art is painted in ([colour.md](colour.md#per-island-palettes)); a tile's value overrides the set's |
| `footprint: edge` | Tile | Orientation 0–5 names the edge | Connectors only |

The Modern set declares `palette: archipelago`, and the families it plainly draws: the Capital, the Library and the Council Hall in the classical observatory family, the Port in the civic harbour town. Its Lighthouse has no family yet, and it has no flat twins, because Modern is itself the flat twin of the Ancient set.

### Proposed beyond the contract

These are _proposed_; a tile set need not cover them, and the contract does not yet have fields for them:

- structures `calendar` (clock tower or sundial), `archive` (Resources reading room) and `commons`;
- `prop` tiles (trees, rocks, lamps, barrels, wells, boats, carts, statues; no crystals);
- ground ribbons `overlay/route`, `overlay/lane` and `overlay/current`;
- markers `signal/lantern`, `signal/reef`, `signal/fog` and `signal/storm`.

## Budgets

| Asset | Budget |
| --- | --- |
| Home hero at 1440 px | 400 KB or less, AVIF (WebP fallback), explicit width and height |
| Living Map atlas | 1.5 MB or less, lazy-loaded after first paint |
| Local app | Flat SVG only; any isometric view drawn in Canvas 2D from the same atlas; no PixiJS; everything inlined into one document |
| A single flat glyph-tile SVG | 4 KB or less after SVGO |
| Night | A tint layer (the one place a filter is allowed), not separate art |
