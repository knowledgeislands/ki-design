# Brief: tile set — Ancient

## Goal

The painted, warmly lit tile set for the public hero, the Living Map, the Arcadia page and posters: art, in the manner of Kit's mood boards and the [picture of Arcadia](arcadia-picture.md), with buildings as crisp silhouettes in the way of a classic isometric strategy game.

## Geometry and composition research

The [hex terrain composition proposal](../spec/hex-terrain-composition.md) separates this surface style from ground heights, irregular object footprints and exposed-edge construction. It concerns the isometric, painted Island Map only: ground inside one island. The flat, top-down Territory Map stays as it is; see [the two map scales](../spec/maps.md#two-scales-the-territory-map-and-the-island-map). It records the owner’s composition direction and the implementation choices still under review; it does not change the current tile contract. Use the [local Arcadia studies](../../+/art/2026-10-19-arcadia-hex-composition-study/NOTES.md) as extraction evidence, not as finished reusable tiles.

## Reusable surface style guidance

Use this brief as the main reusable guidance for the painted Ancient tile surfaces. It develops the established Arcadia direction; the [tile specification](../spec/tiles-and-buildings.md) still governs geometry, footprints, materials, outlines and scale. The Modern set retains its own drawn treatment. Surface style must survive a change of tile outline or plinth construction.

### Look and feel

A calm, inhabited landscape painted as a miniature world: natural greens, deep blue water and warm pale stone, with tactile matte brushwork and clear silhouettes. Detail rewards a close look, but the subject reads immediately at small size. Ground, vegetation and buildings belong to one landscape; settlements feel grown into the terrain. The mood is quiet, enduring and civic.

### Reference and lighting

Two references, with separate roles. [Council Hall A](../../+/art/2026-10-19-lighting-study/council-hall-A.png) is the target for lighting and painted finish, and is the image attached to tile generations. The selected Arcadia painting (`references/arcadia-reference-small.jpg`) remains the wider landscape reference for palette, materials and how settlements sit in terrain. Use a matching hex geometry reference only when the production brief permits one. Keep reference roles explicit in every prompt: Council Hall A supplies light, palette and brushwork, not a building or landscaping to reproduce, and not its cell orientation: it is painted with flat-top hexes, while the contract is pointy-top. Never attach it as the only reference when geometry matters; any permitted geometry reference supplies camera, placement and footprint.

The light is Council Hall A's: a low sun from the upper left, warmer and brighter than the Arcadia painting's dusk. Golden light falls across sun-facing grass, foliage tops, limestone and rock edges. Shadows fall towards the lower right, cool but keeping their local colour: green in grass and woodland, blue-grey on stone, snow and water. They are deep but soft enough to retain material detail. There is little haze; distance on a tile is too short to need it.

Warmth is generous but never changes what a surface is. Lit grass stays green with golden highlights, not straw; most of a snowfield stays white and blue-grey with warm accents, not peach; most of the sea stays deep navy. Do not wash the whole surface in amber. Water has sparse, subdued glints rather than a broad blazing reflection. Window and landing lights are small warm accents, subordinate to the subject, without bloom or a surrounding glow.

Calibrate against Council Hall A, not only these words: match its warmth, not more. About a third of its surface is bright warm highlight, at moderate saturation, with green grass throughout. Generators asked to preserve that warmth tend to overshoot it. In the 20 October match study the grassland came out more saturated and yellower than the hall, and the snow came out peach across most of its surface. Ask for the hall's amount of warmth together with each terrain's identity, and judge a candidate side by side with the hall.

**Lighting choice settled, 20 October 2026:** the owner selected [Council Hall A](../../+/art/2026-10-19-lighting-study/council-hall-A.png) as the target for lighting and painted finish, retaining its warmth and detail. Match this image directly; the earlier recommendation to reduce its warmth is superseded. The Arcadia painting remains the wider landscape reference. Use Council Hall A as the immediate style reference for matching grassland and snow candidates, recorded in [the follow-up study](../../+/art/2026-10-20-council-hall-a-match/NOTES.md). This choice approves appearance, not every geometric or landscaping detail in the candidate.

### Lighting study

The original A/B comparison is retained below as the study method. The owner chose Council Hall A on 20 October 2026; the choice above now governs matching candidates.

- **Subjects:** `terrain/grassland`, `terrain/snow` and `structure/council-hall`. They are the most light-sensitive: grass turns to straw, snow turns peach, and limestone burns out first.
- **Variant A, Arcadia dusk:** the per-tile prompt as it stood on 19 October 2026, with its late-dusk light sentence.
- **Variant B, golden sunlight:** the same prompt with its light sentence replaced by: "late-afternoon golden sunlight, the sun higher in the upper left, a stronger warm key light on every sun-facing surface, crisper shadows towards the lower right and little haze". Everything else, including no bloom and no amber wash of the whole tile, stays.
- **Same subject, camera and materials:** paint directly on a seven-hex flower: one centre hex and its six neighbours, pointy-top, in straight-on 2:1 isometric projection, with a hex rock plinth beneath every exposed outer edge. Use level grassland beneath the Council Hall, with no dome. Normally make B as a lighting-only edit of A. For the 19 October study, attach only the small Arcadia painting to each generation, as the owner requested; generate B separately with the same subject and geometry wording, and record composition drift as a comparison limitation.
- **Judging:** set each pair side by side at working size and at 25 %, and in the island test beside neighbouring tiles. Check terrain identity (grassland beside sand and hills), seams and repetition across several copies, silhouettes, and how a condition decal would read on top.
- **Record:** both prompts verbatim, any edit instruction or reason for separate generation, and the measured share of bright warm surface for each image against the reference, in `+/art/<date>-lighting-study/NOTES.md`. Record measured pixel sizes, transparency, attempts and deviations; retain all six generated originals unaltered.

### Palette and materials

Use the repository's [colour guidance](../spec/colour.md) and the applicable island palette. Within that palette, Ancient's reference relationships are deep navy water, forest and moss vegetation, slate and cool stone shadows, pale warm limestone and sandstone, muted roofs and restrained brass. These are material relationships, not a new token table. Snow takes its colour from cool ambient light and small warm sun-facing accents; it should not read as uniformly white or peach.

Surfaces are matte and painted, with restrained local variation. Grass has fine broken strokes and occasional flowers; foliage groups into readable masses with selective leaf detail; stone shows strata, joints and weathering without turning every face into a high-contrast crag. Water reads as a continuous surface with gentle swell. Avoid plastic shine, polished metallic ground, oversharpened texture and equally intense detail everywhere.

Light never changes what a terrain is. Grassland stays green, not straw or sand; snow stays white in light and blue-grey in shade, not peach; the sea stays navy. At 25 % a tile must still be told apart from its neighbours by hue and value, not only by its shapes.

### Surface composition and readability

Keep the requested landform and feature count. Gentle grassland remains gentle grassland; a few stones do not become a rocky hill; a snowfield does not become a mountain range. Forest can be dense while retaining a clear canopy mass. Open sea covers the whole specified top surface. Roads and channels remain legible through texture and vegetation.

Use a clear hierarchy: the main landform or building first, secondary planting and paths next, fine texture last. Structures must read as crisp silhouettes at 25% scale. Edges use a darkened local colour, never pure black; exact outline sizing remains in the tile specification. Do not add decorative structures or dense vegetation that change the subject or obscure its silhouette.

For independently composable ground hexes, the edge treatment above applies to actual subject silhouettes, not the addressable cell boundary. Do not artificially highlight, outline, bevel, groove or shadow an ordinary shared hex edge. Each hex remains independent, with compatible material treatment and lighting so that neighbours sit naturally together; do not substitute a single painted scene across the map. Real height discontinuities can expose their actual faces. When hexes need to be visible, project a separate grid overlay onto the current terrain surface and heights rather than baking a grid into the art.

Paint candidates directly as hexes on connected multi-hex footprints, with complete subjects and clean outer boundaries. Square-then-crop is rejected: cutting a hex out of a square gives the wrong composition. Do not use a square intermediate or a trim band, and do not paint guide lines or template colours.

### Shape and background

Paint the hexagonal footprint directly, with the prescribed straight-on 2:1 camera and consistent placement. Single-hex requests have returned square diamonds, while multi-hex requests have returned recognisable hexes; use connected multi-hex footprints. The rejected Capital and Port attempts at `+/art/2026-10-19-ancient-batch-1/_rejected/structure-capital-attempt-1.png` and `structure-port-attempt-1.png` are textual evidence references, not style masters. For this lighting study, use a seven-hex flower rather than a single tile. Council Hall A and both 20 October matches read as flat-topped flowers, while the tile contract is pointy-top; the hall's approval covers appearance only, so hex orientation stays with the [hex terrain composition proposal](../spec/hex-terrain-composition.md).

The rock plinth supports the surface and shares its light and palette, but its construction is specified separately. Do not invent extra cliffs or raise the ground simply to make the tile more dramatic. The plinth faces carry rock strata only. Water, surf, shoreline and planting stop at the top edge and never wrap down the plinth; a coastal subject draws its water on the top face. Outside the tile, use genuine transparency. If a production brief permits flat grey instead, use exactly its specified grey. Haze belongs within the painted scene: it must not become a coloured halo, gradient backdrop or cast shadow outside the cutout. A generator's preview can show a glow that the saved file does not, or the reverse, so where image inspection is permitted, check the saved file against a saturated backdrop such as magenta and reject any fringe. Measure the saved canvas rather than assuming the requested size; retain study originals unaltered.

### Subject constraints

Keep the existing civic meanings and architectural families. The Council Hall is a long colonnaded civic hall with a low-pitched pediment roof, broad steps and no dome; avoid a temple-like treatment. What keeps it civic: a plain tympanum with no sculpture; the colonnade as a front loggia along the long side, not a peristyle on every face; doors and lit windows visible behind the columns; and a forecourt that opens onto the square rather than a walled garden. The Causeway is a low, level stone way on small culverts over shallow water, with low parapets and landing lamps; avoid a high arched bridge over a ravine. The deck sits barely above calm water: no white water, deep channel or rocky gorge. Do not add fortifications.

No text, lettering, numbers, logos, creatures, animals, crystals, magic glow or weapons. No people in close-up. Keep studio, artist and game names out of generation prompts. Condition states and animation remain separate production requirements rather than reasons to change the base style.

### Review standard

Judge a candidate beside the Arcadia reference and neighbouring tiles at both working size and 25% scale. Check the following independently:

- Light: Council Hall A's upper-left source, warmth and contrast, and no more; cool readable shadows that keep local colour. If in doubt, compare the share of bright warm surface and the spread of light and dark with Council Hall A.
- Materials: consistent greens, navy water and pale warm stone, with matte brushwork and no overall amber wash.
- Subject: the requested landform, feature count and civic silhouette, with no invented dramatic terrain or architecture.
- Geometry: the active production brief's camera, connected hex footprint, surface position and plinth depth.
- Cutout: a clean transparent exterior with no halo, guide lines or painted background.

Batch 1b is evidence of failure modes, not the style master: its mountainous additions, inconsistent geometry and structural halos must not become requirements by imitation, and its warmth is judged against Council Hall A rather than copied. Preserve useful material texture and readable detail while correcting those deviations. The batch notes record the individual issues.

## Sequence

1. The picture of Arcadia fixed the landscape palette and detail; Council Hall A, chosen on 20 October 2026, fixes the tile light and finish.
2. Generate each candidate directly on its connected hex footprint against the same light, using the per-tile prompt below and the active production brief's size and camera.
3. Check the directly painted geometry against the [building standards](building-standards.md); record the anchor and footprint. Retain original candidates unaltered and record any separately approved production normalisation.
4. Paint condition decals (ivy, cracks, moss, fallen roof) as separate overlays under the same light.
5. Animate only what the [animation standard](animation-standard.md) lists, as sprite sheets.
6. Pack into atlases; write `packages/tiles/sets/ancient/manifest.json`.

## Inventory

The same contract as the Modern set, id for id:

| Kind | Ids |
| --- | --- |
| Terrain (12) | `grassland`, `forest`, `hills`, `mountain`, `coastal`, `cliffs`, `sand`, `river`, `marsh`, `snow`, `volcanic`, `ocean` |
| Structures (16) | `capital` (the Capital: Library + Council Hall around an open square on a 7-hex flower, drawn as a hilltop forum or acropolis, never walled; `citadel` is a deprecated alias), `library`, `council-hall`, `observatory`, `lighthouse`, `port`, `dock`, `rail-depot`, `airport`, `customs-house`, `causeway` (the Causeway, the translation layer: a low stone way on culverts across shallow water, never fortified; `bridge` is a deprecated alias; GDR-KI-DESIGN-018), `workshop`, `mill`, `ruins`, `ancient-forest`, `cottage` |
| Decals (4) | `ivy`, `cracks`, `moss`, `fallen-roof` |
| Connectors (4) | `road`, `river`, `bridge-span`, `quay` |

## Per-tile prompt template

Attach Council Hall A (`+/art/2026-10-19-lighting-study/council-hall-A.png`) as the lighting and finish reference and, only where the active production brief permits it, a matching hex geometry reference. The 20 October match study attached Council Hall A alone. Replace the fields below from the inventory, architectural families and active production brief. Describe the directly painted connected hex footprint explicitly in `<GEOMETRY>`.

```text
A single painted Ancient tile for the Knowledge Islands Realm. The attached Council Hall A painting supplies light, palette and brushwork, not a building or landscaping to reproduce. Match its warm upper-left light, golden highlights on sun-facing surfaces, cool green and blue-grey shadows towards the lower right, matte painted finish, contrast and fine readable detail, at the same amount of warmth and no more. Keep each terrain's identity under that light: green grass, not straw; white and blue-grey snow, not peach; navy sea. Deep navy water, forest and moss greens, pale warm limestone and sandstone, muted roofs and restrained brass, within the applicable island palette. Matte tactile brushwork, grouped readable forms, fine selective detail and outlines in darkened local colours, never pure black. Small warm window or landing lights only where appropriate; no bloom, broad amber wash or blazing reflections.

Subject: <SUBJECT>. Architectural family and materials: <FAMILY AND MATERIALS, OR NOT APPLICABLE>. Condition and frame: <STATE AND FRAME>. Keep the specified landform and feature count; do not add dramatic hills, cliffs, buildings or planting. Preserve a crisp subject silhouette at 25% scale.

Geometry and placement: <DIRECTLY PAINTED HEX GEOMETRY FROM THE ACTIVE PRODUCTION BRIEF>. Where permitted and attached, the hex geometry reference controls the camera, top surface, placement and plinth; the painting controls appearance only. Paint the complete connected hex footprint directly, with no square intermediate, cropping or trim band. Never paint guide lines or template colours. The plinth shares the surface light without adding height or landforms. Genuine transparent exterior, with no halo, gradient or cast shadow outside the tile.

No text, lettering, numbers, logos, close-up people, creatures, animals, crystals, magic glow, weapons or fortifications.
```

Record the completed prompt verbatim with the references, tool, exposed model identifier if any, measured dimensions, transparency, attempts and deviations. Keep original generated candidates unaltered; perform any approved cutting or normalisation as a separate recorded production step. Generated art remains unlicensed until KI-DESIGN-ART-002 is decided.

## Judged by

Sits seamlessly beside its neighbours on the Arcadia map; matches Council Hall A's light; passes `validateTileSet`; under the image budgets.
