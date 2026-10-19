# Claude Design review of hex terrain composition

Review the proposed hex terrain model in `knowledgeislands/ki-design`. Pull main, then read `docs/spec/hex-terrain-composition.md`, `docs/spec/hex-terrain-mathematics.md`, `docs/briefs/hex-terrain-research.md`, `+/art/2026-10-19-arcadia-hex-composition-study/NOTES.md` and the linked diagrams. Read `docs/briefs/tile-set-ancient.md` for the separate surface style guidance and `docs/decisions/OPEN.md` for unresolved choices.

The owner wants small hexagonal ground cells, six corner heights normalised so at least one is zero, a separate whole-cell elevation, connections based on neighbouring edge heights, and arbitrary connected compounds. The Great Tree may be one continuous artwork across an irregular group of hexes. Buildings and civic complexes can span multiple cells. A river crossing a drop may form a waterfall when its position, width, water levels and receiving reach agree.

The proposal, research summaries and worked examples are documentation. The renderer, `tileset/v1` contract, manifests and fixed-plinth implementation have not changed. Keep the existing Capital seven-hex rule and fixed upper-left lighting. All new examples should use hexes.

Review the coordinate and endpoint conventions, continuous versus split-height vertices, three-cell junctions, cliff ownership, narrow waterfall connections, foundations, occlusion, compound boundaries and display-size recommendations. Check what needs more than six corner heights, and whether the proposed straight-edge/centre-mean pilot is a sensible first experiment. Distinguish source-painting sampling size from world scale and on-screen size.

Use the confirmed `docs/briefs/references/arcadia.png` as the original painting. The grid overlay and cutouts are sampling studies, not production-ready tiles: perspective, sky behind roofs and hidden ground still need reconstruction. The small reference copy is suitable for compact generation requests. The 8-cell versus 17-cell Great Tree comparison supports investigating finer irregular footprints, not a settled physical tile size.

Please steer us if the model is inconsistent or unnecessarily complicated. Recommend the smallest useful pilot, flag missing rules and propose edits in the existing documents rather than creating competing guidance. Keep numerical and schema choices Proposed until reviewed; do not treat documentation approval as approval to migrate the contract or renderer. Report what you recommend retaining, changing and deciding next.

Keep the mathematics and logic needed for implementation self-contained in `ki-design`. Cite external inspiration, but do not replace a required formula, convention or algorithm with a link to a tutorial. Identify any remaining mathematical gaps explicitly and propose a local resolution.

## Review response, 19 October 2026

Claude reviewed the model on 19 October 2026 and edited the existing documents in place. Every new rule, number and schema choice is marked **Proposed**; nothing migrates the contract or the renderer.

### Retain

- The per-cell model: an elevation plus six non-negative local corner heights with a zero minimum. It is the right authoring form, because raising a cell independently is exactly what creates a cliff.
- The axial coordinates, corner keys, neighbour table, endpoint reversal, picking, rotation and crossing formulas. They check out against the existing `isoPosition`, `isoProject` and `isoSort`. An independent re-implementation of the tree-mask rule reproduces the study's 17, 12, 8 and 5 cells.
- The straight-edge, mean-centre fan for the first pilot, the five-way edge case split, compound connectivity, and keeping occupancy, overhang and contact distinct.

### Changed

- **Junctions are simpler than the draft assumed.** With vertical straight faces, every face at a world vertex lies in a vertical plane through it, so three-cell junctions close without caps. The "reconcile one authoritative height" step is unnecessary: continuity is just equality of the stored values.
- **Visibility follows from the edge.** Only the higher cell's e2 and e3 faces can show. e1 and e4 are edge-on, and e0 and e5 face away. East and west steps therefore need an edge stroke in the art, and waterfalls are limited to front edges in the pilot.
- **Draw order and compound occlusion.** `isoSort` order, faces after surfaces, compounds in their front-most row. A placement rule covers the one case that order gets wrong.
- **Missing formulas added:** the camera-consistent height rise `Z = (W/2)(U/R)`, the per-triangle affine warp for painted material, and the outside-boundary rule. Under that rule an all-zero map renders as today.
- **Scale.** Hexes do not nest, so there should be one grid: the construction cell is the semantic hex, and the Capital stays seven. Against the painting, that grid puts the Great Tree at about 12 cells.
- **Pilot simplifications:** level river crossings (no stored water levels), level-pad foundations, at most two units of corner range per cell, an optional centre height as the only extra value, and no footprint holes.
- **The worked join's P and Q** are now named in local order, consistent with the canonical sort.
- **The smallest pilot** is Pilot 0: a flat-colour `renderTerrainSvg` with a 19-cell fixture and tests. Painted material comes next, in Pilot 1, and Arcadia patches in Pilot 2. The original seven acceptance items remain the bar before any schema change.

### Decide next

1. Accept one grid, with the construction cell as the semantic hex.
2. Accept the height unit `U = R/4`, giving a rise of 32 px at 1×.
3. Approve Pilot 0 as the first implementation step, in `@knowledgeislands/hexmap`, with no contract change.
4. After Pilot 1, judge whether warped painted material survives slopes. That result decides whether this model suits the Ancient style.

The committed Decisions board had drifted from `OPEN.md` since `af0318b`, so `bun run test` failed on main. The board is regenerated with this review.
