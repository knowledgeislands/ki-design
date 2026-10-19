# Arcadia hex composition study

This art is unlicensed until KI-DESIGN-ART-002 is decided. These are candidates for review, not the Ancient set.

## Purpose and source

On 19 October 2026 the owner confirmed `docs/briefs/references/arcadia.png` as the original painting to investigate for hex extraction. This study preserves sampling overlays, direct cutouts, the irregular Great Tree footprint and explanatory height diagrams. It does not infer a height field from the painting or deliver production-ready movable tiles.

The original is 1672 × 941 pixels. Its SHA-256 is `ccb3e6a07856747886a47b876b03dc504b762d775132a313deb96e5ef5cdef62`. It remains unaltered in its existing reference location. SVG compositions refer there by a relative path. No new image model, generation prompt or AI repaint was used in this study; the previews were rendered from vector grid and clipping geometry with `rsvg-convert`.

The [composition proposal](../../../docs/spec/hex-terrain-composition.md), [local mathematics](../../../docs/spec/hex-terrain-mathematics.md) and [research rationale](../../../docs/briefs/hex-terrain-research.md) provide the rules and context. [study.json](study.json) records the complete experiment inputs and selected tree cells. Its projection values are a dated experiment snapshot, not a replacement for package data.

## Files

| File stem | Contents |
| --- | --- |
| `arcadia-hex-overlay` | Source painting under a 200-source-pixel projected hex grid; highlighted candidate groups |
| `arcadia-hex-candidates` | Capital and Port groups, forest patch, waterfall pair, cultivated land and sea cutouts |
| `arcadia-great-tree-compound` | One source region at equal display scale: 8 coarse cells versus 17 finer cells |
| `corner-heights` | Two differently elevated hexes with matching absolute shared-edge heights |
| `waterfall-edge` | An explicit narrow river crossing over a drop between two hexes |

The first three stems have both editable `.svg` compositions and `.png` renders. The two geometry diagrams are `.svg`. The overlay is 1672 × 1021, candidate sheet 1160 × 1200 and tree comparison 1200 × 680 pixels. Both geometry diagrams have a 960 × 440 viewBox. PNG backgrounds are opaque presentation boards; they are not transparent tile sprites. Selected painting regions have not been cleaned up or re-encoded as original source art.

## Sampling geometry and reproduction

The source grid origin is `(92,60)`. At sampling width w, the projected height is `w × 148/256`, following the contract ratio captured for this experiment. Axial cell centres are `(92 + w(q+r/2), 60 + 3hr/4)`. The six corners use the local mathematical specification's integer corner keys. All examples are hexagonal and use the same projected direction.

Fixed candidate groups use the source-pixel anchors and relative axial offsets in `study.json`. Find the nearest anchor cell with inverse projection and cube rounding, then translate the listed offsets. The Capital and Port candidates are seven-cell groups, the forest three cells, the waterfall two and the remaining patches one. These are sampling footprints, not measurements of each subject's world scale or an alteration of the Capital's canonical footprint.

The Great Tree uses a manually selected source-pixel outline, recorded in `study.json`. Include cells using the documented point-in-polygon selection rule. At widths 100, 140, 200 and 280 source pixels, the saved selections contain 17, 12, 8 and 5 cells respectively. Each selection is edge-connected. The side-by-side comparison shows the 200- and 100-pixel cases at the same image scale. The finer outline includes less unrelated scenery but still captures material that needs repair.

To reproduce an image, load the original source referenced by the SVG and rasterise that SVG at its declared size. The saved SVGs contain every crop polygon and placement. For the first three boards, `rsvg-convert <stem>.svg -o <stem>.png` reproduces the layout without returning to any external source. Antialiasing may vary between renderer versions. The JSON and mathematical specification provide the independent route to rebuilding the grid and selections.

## Height and waterfall diagrams

The height diagram uses A at axial `(0,0)` with elevation 0 and local corners `[0,0,1,2,0,0]`. B is at `(0,1)` with elevation 1 and local corners `[0,1,1,1,1,1]`. A's edge e2 meets B's e5 with reversed local endpoint order. The shared absolute heights are 1 and 2 on both sides. Each cell retains a local zero.

The waterfall diagram uses two flat hex surfaces at heights 2 and 1, with an explicit river crossing halfway along their shared edge. The water drops only over a narrow channel interval. Its channel and terrain levels coincide for schematic clarity; a production river must distinguish bed, water surface and surrounding ground. Pixel rise and drawn river width are illustrative, not settled units. Neither diagram implements a renderer or a general corner-cap algorithm.

## What the evidence supports

Small cells can trace an irregular object more closely while retaining one continuous artwork across its internal boundaries. Direct source regions preserve the selected painting's palette and brushwork. Per-corner normalisation can describe a continuous join between cells whose base elevations differ. A waterfall requires a water connection as well as a height discontinuity.

## What still needs repair or proof

The painting is not a uniform orthographic terrain atlas. Roofs and foliage hide ground; distant subjects differ in apparent scale; sky and other scenery enter the cutouts. A cutout can reconstruct its original image position, but cannot automatically be moved beside arbitrary neighbours. The cultivated-land candidate is not a clean grass material. The waterfall pair contains additional structures and does not recover river levels or direction from pixels.

Ground reconstruction, independent upright structures, boundary profiles, foundations, three-cell junctions, water connections, occlusion and display-size usability remain pilot work. Some candidates will require substantial changes. The tree mask's selection heuristic is recorded for reproducibility; it is not a complete general polygon-intersection algorithm. The mathematics specifies the additional segment-intersection checks needed for general coverage.

The local verification checked reversed endpoint identities across all six neighbour directions at positive and negative cell positions, neighbour distances, six-turn logical rotation, height normalisation, representative edge-gap sign cases, the numeric shared-height example and connectivity of every saved tree footprint. These checks validate the written examples, not a production compositor.
