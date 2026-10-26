# Open questions

The design questions still open after 20 October 2026, each with its recommendation and how to draw meanwhile. They are not decision records: when Kit answers one, the answer becomes a record in this folder (see the [index](README.md)) and the entry leaves this list. A question about meaning is also carried into `ki-principal`.

On 19 October 2026 Kit answered every question listed on 18 October; the answers are GDR-KI-DESIGN-018 to 036. What remains needs facts that are not yet in hand rather than a choice. The banner-glyph question the Observatory's design hand-off raised on 19 October 2026 was answered on 20 October as [GDR-KI-DESIGN-037](GDR-KI-DESIGN-037-the-banner-emoji-stay-the-written-notation-line-glyphs-may-be-a-rendered-form.md).

## Design questions

### Art ownership

Who owns AI-generated art, and under which generator terms (KI-DESIGN-ART-002)?

- **Status:** the policy until then is recorded in [GDR-KI-DESIGN-035](GDR-KI-DESIGN-035-art-is-unlicensed-until-its-licensing-is-recorded.md); the answer itself is owed by ART-002.
- **Recommendation:** record the answer in ART-002 once the generator terms are read, then update GDR-KI-DESIGN-035 and the set manifests' `licence`.
- **Meanwhile:** treat references and generated art as unlicensed.

### Where the further references are

[GDR-KI-DESIGN-035](GDR-KI-DESIGN-035-art-is-unlicensed-until-its-licensing-is-recorded.md) files the further isometric building images into `ki-principal`'s `Pillars/Aesthetics/Isometric Tiles`, marked as references, but where those images are now is not known.

- **Recommendation:** Kit points to them, or they are dropped from the plan.
- **Meanwhile:** nothing to file.

### Hex terrain composition

The owner requested a local specification for small hex ground cells, corner heights, irregular compounds and connected exposed edges. The [composition proposal](../spec/hex-terrain-composition.md) captures that direction; the current package contract and renderer remain unchanged.

- **World scale and height:** what ground area does one cell represent, and what is one height unit? Recommendation: one grid, because hexes do not nest and a finer grid could never share the semantic hex's boundaries. The construction cell is the semantic hex, and the Capital stays seven cells. Take the height unit as a quarter of the corner radius, which gives a rise of `W / 8` (32 px at 1×), from the camera relation in the mathematics.
- **Surface and foundations:** is the straight-edge, centre-mean triangulation adequate for a first pilot, and how do multi-cell buildings meet sloping ground? Recommendation: use it, with one optional centre height for ridges and hollows, a corner range of at most two units per cell, and level pads for buildings. Review terraces and overhang occupancy before generalising.
- **Connections and junctions:** what profile detail, split-height corner treatment and water-level representation are required? Recommendation: none beyond per-cell corners for the pilot. Vertical straight faces close three-cell junctions without caps, only e2 and e3 faces are visible, and level crossings let the water surface equal the cell surface. Separate bed and water levels wait until after the pilot.
- **Minimum useful size:** what detailed-view and overview sizes pass real interaction and readability checks? Recommendation: test the proposed display ranges; do not infer screen or world size from painting crops.
- **Pilot:** what is the smallest useful first test? Recommendation: Pilot 0 in the composition spec, a flat-colour `renderTerrainSvg` and one 19-cell fixture. It needs no art and no contract change, and it proves the geometry, visibility and draw order before painted material is tried in Pilot 1.
- **Migration:** which fields and versioning route extend the existing footprint union and fixed-plinth model? Recommendation: keep the current manifest and renderer intact until the documented pilot passes, then plan a separate implementation and compatibility decision. A storage chunk must not alter the resulting joins.
- **Meanwhile:** use hex-only mockups, preserve original art and labelled derivatives, keep new fields Proposed, and follow the existing [Ancient style baseline](../briefs/tile-set-ancient.md). [Claude Design’s review request](../briefs/hex-terrain-claude-handoff.md) is ready for the owner to hand over.
