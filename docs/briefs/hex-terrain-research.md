# Hex terrain research and design rationale

This note keeps the external references and local reasoning behind the [proposed hex terrain composition specification](../spec/hex-terrain-composition.md). It records what we can borrow, what we are adapting and what the Arcadia experiments actually demonstrate. Sources were consulted on 19 October 2026. None defines a universal artistic tile size or the complete proposed Knowledge Islands asset format.

## Local completeness

The [mathematical specification](../spec/hex-terrain-mathematics.md) records the formulas and algorithms required to use this proposal without revisiting these sources. It includes our coordinate convention, exact corner identities, endpoint reversal, picking and rounding, rotation, height normalisation, exposed-face case analysis and compound operations. The sources below provide attribution and context. General corner caps, foundations and other unresolved policies are labelled Open rather than hidden behind a reference link.

## Primary references

### Red Blob Games hexagonal grids

[Hexagonal Grids](https://www.redblobgames.com/grids/hexagons/) explains hex geometry, axial and cube coordinates, neighbours, distance, coordinate conversions and logical rotation. Use it as the mathematical reference for cell addressing and connected footprints. Our existing axial layout already follows this family of conventions. A compound can therefore be a set of relative axial cell positions; it does not require a new grid system.

Our irregular object placement, ground-height records and art layers are application choices. The guide does not establish our display-size recommendations or make a fixed-light bitmap rotatable. Its logical rotation algorithms apply to coordinates; artwork needs separate handling.

### Red Blob Games grid parts

[Grid parts and relationships](https://www.redblobgames.com/grids/parts/) treats faces, edges and vertices as distinct grid elements and describes shared hex vertices and edges. This is useful for persistent boundary identities, reversed local endpoint order and the three-cell junctions that cannot be solved by considering each tile independently.

Our proposed model retains one boundary identity while allowing different incident surface heights at a deliberate cliff. Sharing a plan-position vertex must not force different terrain sheets to have the same elevation. That distinction is our adaptation for discontinuous terrain.

### Catlike Coding terrain transitions

[Hex Map 3: Elevation and Terraces](https://catlikecoding.com/unity/tutorials/hex-map/part-3/) demonstrates triangulated elevation connections, terraces and combinations of slopes and cliffs, including corner junctions. It is a useful worked reference for closing the geometry between neighbouring terrain regions.

Its cell-elevation approach is not our proposed six independently described corner heights. Borrow the systematic treatment of joins and corner cases; do not copy its data model and assume that it already implements ours. Our endpoint-profile comparison and ownership rules need their own pilot.

## Owner direction and repository constraints

The owner accepted hex geometry after the [matched shape study](../../+/art/2026-10-19-ancient-shape-study/NOTES.md), then described per-corner heights, a zero-relative lowest corner, a separate whole-tile rise, edge-based connections and waterfalls. The owner also requested small construction cells and arbitrary compounds, specifically an irregular footprint for the Great Tree, and confirmed the original Arcadia painting as the extraction source.

These requirements extend a current contract that exposes `single`, `pair`, `flower` and connector-only `edge` footprints and uses a fixed plinth. The [composition specification](../spec/hex-terrain-composition.md) documents the extension as Proposed. It does not mutate the contract, manifest, canonical Capital meaning or renderer.

## Evidence from the local studies

- Batch 1 and batch 1b showed that generated art can preserve a useful material language while missing exact geometry, placement, canvas size and dusk calibration. Their notes remain the evidence for those failures.
- The matched square-and-hex study assembled identical grass, stone and building assets onto deterministic geometry. The hex version retained the painted detail and silhouette. It did not test a complete terrain compositor or prove a final lighting calibration.
- The corner-height example demonstrated that differently elevated cells can have matching absolute shared-corner heights while each cell retains a local zero.
- The Arcadia overlay and direct cutouts demonstrated candidate groups of cells. They did not recover a height field or make independently reusable tiles.
- The Great Tree sampling comparison used the same source region and display scale. The coarse mask selected 8 cells at a source width of 200 pixels; the finer mask selected 17 at 100 pixels. Both are irregular connected groups. The finer mask follows the subject more closely and includes less unrelated scenery, but still needs cleanup.

The [local study notes](../../+/art/2026-10-19-arcadia-hex-composition-study/NOTES.md) hold the exact geometry, files, source hash and limitations. They preserve summaries and our own illustrations rather than copies of third-party tutorials or code.

## Design conclusions for review

Use a small cell as ground topology and a compound as object topology. Keep painted surfaces, upright objects, foundations and exposed edges distinct, even when the final artwork is one coherent scene. Smaller cells improve footprint control; they also increase boundary work, object records and the importance of overview rendering.

Compare shared edge profiles in absolute height and align endpoint order before deriving a face. A narrow river connection needs more than the land's endpoint heights: position, width, water levels and receiving flow matter. Three-way corners and crossings whose higher side reverses need explicit geometry, not an arbitrary stretched edge sprite.

Treat the source painting as valuable visual evidence and raw material. A uniformly spaced screen grid is not a measurement of its ground scale. Source sampling density, logical world size, authored resolution and screen interaction size must be chosen separately.

## What would change these recommendations

Failure to retain material quality on sloping surfaces would favour more precomposed terrain variants. Unmanageable compound boundaries would favour a restricted first library of connected shapes, while retaining arbitrary footprints in the long-term model. Poor interaction at the proposed overview size would require simplification or a larger selection view, not automatically a larger logical cell.

Review these trade-offs with the [pilot cases](../spec/hex-terrain-composition.md#pilot-and-acceptance) before implementing a schema migration. Keep unsettled numerical choices in [OPEN.md](../OPEN.md#hex-terrain-composition).
