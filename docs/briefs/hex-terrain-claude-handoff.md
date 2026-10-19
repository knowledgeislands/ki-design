# Claude Design review of hex terrain composition

Review the proposed hex terrain model in `knowledgeislands/ki-design`. Pull main, then read `docs/spec/hex-terrain-composition.md`, `docs/spec/hex-terrain-mathematics.md`, `docs/briefs/hex-terrain-research.md`, `+/art/2026-10-19-arcadia-hex-composition-study/NOTES.md` and the linked diagrams. Read `docs/briefs/tile-set-ancient.md` for the separate surface style guidance and `docs/decisions/OPEN.md` for unresolved choices.

The owner wants small hexagonal ground cells, six corner heights normalised so at least one is zero, a separate whole-cell elevation, connections based on neighbouring edge heights, and arbitrary connected compounds. The Great Tree may be one continuous artwork across an irregular group of hexes. Buildings and civic complexes can span multiple cells. A river crossing a drop may form a waterfall when its position, width, water levels and receiving reach agree.

The proposal, research summaries and worked examples are documentation. The renderer, `tileset/v1` contract, manifests and fixed-plinth implementation have not changed. Keep the existing Capital seven-hex rule and fixed upper-left lighting. All new examples should use hexes.

Review the coordinate and endpoint conventions, continuous versus split-height vertices, three-cell junctions, cliff ownership, narrow waterfall connections, foundations, occlusion, compound boundaries and display-size recommendations. Check what needs more than six corner heights, and whether the proposed straight-edge/centre-mean pilot is a sensible first experiment. Distinguish source-painting sampling size from world scale and on-screen size.

Use the confirmed `docs/briefs/references/arcadia.png` as the original painting. The grid overlay and cutouts are sampling studies, not production-ready tiles: perspective, sky behind roofs and hidden ground still need reconstruction. The small reference copy is suitable for compact generation requests. The 8-cell versus 17-cell Great Tree comparison supports investigating finer irregular footprints, not a settled physical tile size.

Please steer us if the model is inconsistent or unnecessarily complicated. Recommend the smallest useful pilot, flag missing rules and propose edits in the existing documents rather than creating competing guidance. Keep numerical and schema choices Proposed until reviewed; do not treat documentation approval as approval to migrate the contract or renderer. Report what you recommend retaining, changing and deciding next.

Keep the mathematics and logic needed for implementation self-contained in `ki-design`. Cite external inspiration, but do not replace a required formula, convention or algorithm with a link to a tutorial. Identify any remaining mathematical gaps explicitly and propose a local resolution.
