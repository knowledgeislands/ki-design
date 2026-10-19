# Brief: tile set — Ancient

## Goal

The painted, dusk-lit tile set for the public hero, the Living Map, the Arcadia page and posters: art, in the manner of Kit's mood boards and the [picture of Arcadia](arcadia-picture.md), with buildings as crisp silhouettes in the way of a classic isometric strategy game.

## Reusable surface style guidance

Use this brief as the main reusable guidance for the painted Ancient tile surfaces. It develops the established Arcadia direction; the [tile specification](../spec/tiles-and-buildings.md) still governs geometry, footprints, materials, outlines and scale. The Modern set retains its own drawn treatment. Surface style must survive a change of tile outline or plinth construction.

### Look and feel

A calm, inhabited landscape painted as a miniature world: natural greens, deep blue water and warm pale stone, with tactile matte brushwork and clear silhouettes. Detail rewards a close look, but the subject reads immediately at small size. Ground, vegetation and buildings belong to one landscape; settlements feel grown into the terrain. The mood is quiet, enduring and civic.

### Reference and lighting

The selected Arcadia painting is the visual reference. Attach `references/arcadia-reference-small.jpg` for generation; it is the small copy of the selected painting, not an alternative treatment. Use a matching geometry template as a separate reference when the production method calls for one. Keep reference roles explicit: the painting supplies surface style and light; the template supplies camera, placement and footprint.

The established baseline is late, calm dusk. A low sun illuminates from the upper left, with warm light catching selected roofs, upper foliage, sun-facing slopes and stone edges. Shadows fall towards the lower right, cooled and desaturated but keeping their local colour: greener in woodland, browner on rock, blue-grey on snow, stone in distance and water. They are deep but soft enough to retain material detail. A thin haze gently compresses contrast and softens distant or recessed detail without blurring the whole tile.

Warmth is selective. Most of a snowfield stays blue-grey in shadow; most of a forest stays moss and forest green; most of the sea stays deep navy. Do not wash the whole surface in amber. Water has sparse, subdued glints rather than a broad blazing reflection. Window and landing lights are small warm accents, subordinate to the subject, without bloom or a surrounding glow.

Calibrate against the painting, not only these words. In the selected Arcadia painting the strongest warmth sits in the sky towards the sun, on built limestone and in the sun path across the far sea. The land itself is mid-dark, and only about one surface in fourteen is a bright warm highlight. Batch 1b measured roughly one and a half to four times that share of bright warm surface (grassland the most, about four times), with a wider spread of light and dark. That excess, rather than warmth as such, is what reads as golden sunlight.

**Lighting choice still open:** the owner has not selected between the softer Arcadia dusk and the stronger golden sunlight visible in batch 1b. Until that comparison is resolved, retain the established Arcadia dusk baseline. A stronger-sunlight study may be compared separately with exactly the same subject, camera and materials; do not silently replace the baseline or mix the two treatments across a set.

### Lighting study

The comparison that settles the open choice. It changes nothing in the baseline until the owner chooses.

- **Subjects:** `terrain/grassland`, `terrain/snow` and `structure/council-hall`. They are the most light-sensitive: grass turns to straw, snow turns peach, and limestone burns out first.
- **Variant A, Arcadia dusk:** the per-tile prompt below, unchanged.
- **Variant B, golden sunlight:** the same prompt with its light sentence replaced by: "late-afternoon golden sunlight, the sun higher in the upper left, a stronger warm key light on every sun-facing surface, crisper shadows towards the lower right and little haze". Everything else, including no bloom and no amber wash of the whole tile, stays.
- **Same subject, camera and materials:** paint A on the matching template, then make B as an edit of A that changes only the light. Do not generate B from scratch, which would change the landform and the camera as well.
- **Judging:** set each pair side by side at working size and at 25 %, and in the island test beside neighbouring tiles. Check terrain identity (grassland beside sand and hills), seams and repetition across several copies, silhouettes, and how a condition decal would read on top.
- **Record:** both prompts verbatim, the edit instruction, and the measured share of bright warm surface for each image against the reference, in `+/art/<date>-ancient-light-study/NOTES.md`.

### Palette and materials

Use the repository's [colour guidance](../spec/colour.md) and the applicable island palette. Within that palette, Ancient's reference relationships are deep navy water, forest and moss vegetation, slate and cool stone shadows, pale warm limestone and sandstone, muted roofs and restrained brass. These are material relationships, not a new token table. Snow takes its colour from cool ambient light and small warm sun-facing accents; it should not read as uniformly white or peach.

Surfaces are matte and painted, with restrained local variation. Grass has fine broken strokes and occasional flowers; foliage groups into readable masses with selective leaf detail; stone shows strata, joints and weathering without turning every face into a high-contrast crag. Water reads as a continuous surface with gentle swell. Avoid plastic shine, polished metallic ground, oversharpened texture and equally intense detail everywhere.

Light never changes what a terrain is. Grassland stays green, not straw or sand; snow stays white in light and blue-grey in shade, not peach; the sea stays navy. At 25 % a tile must still be told apart from its neighbours by hue and value, not only by its shapes.

### Surface composition and readability

Keep the requested landform and feature count. Gentle grassland remains gentle grassland; a few stones do not become a rocky hill; a snowfield does not become a mountain range. Forest can be dense while retaining a clear canopy mass. Open sea covers the whole specified top surface. Roads and channels remain legible through texture and vegetation.

Use a clear hierarchy: the main landform or building first, secondary planting and paths next, fine texture last. Structures must read as crisp silhouettes at 25% scale. Edges use a darkened local colour, never pure black; exact outline sizing remains in the tile specification. Do not add decorative structures or dense vegetation that change the subject or obscure its silhouette.

For a template-and-trim workflow, keep every important feature inside the retained area. Continue simple ground or water across the trim band, with no essential tree, building, shoreline turn or channel detail there. Do not paint the template's guide lines or colours.

### Shape and background

The surface treatment does not decide square versus hex. The canonical map contract is hexagonal; batch 1b deliberately generates square diamonds for later cutting and re-projection. A square candidate is an intermediate production image, not a change to the map contract. Follow the specific production brief and matching template; keep the prescribed straight-on 2:1 camera and consistent placement.

The rock plinth supports the surface and shares its light and palette, but its construction is specified separately. Do not invent extra cliffs or raise the ground simply to make the tile more dramatic. The plinth faces carry rock strata only. Water, surf, shoreline and planting stop at the top edge and never wrap down the plinth; a coastal subject draws its water on the top face. Outside the tile, use genuine transparency. If a production brief permits flat grey instead, use exactly its specified grey. Haze belongs within the painted scene: it must not become a coloured halo, gradient backdrop or cast shadow outside the cutout. A generator's preview can show a glow that the saved file does not, or the reverse, so check the saved file against a saturated backdrop such as magenta and reject any fringe. Measure the saved canvas before cutting: batch 1b's terrain came back at 1254 px square against a 1024 px template.

### Subject constraints

Keep the existing civic meanings and architectural families. The Council Hall is a long colonnaded civic hall with a low-pitched pediment roof, broad steps and no dome; avoid a temple-like treatment. What keeps it civic: a plain tympanum with no sculpture; the colonnade as a front loggia along the long side, not a peristyle on every face; doors and lit windows visible behind the columns; and a forecourt that opens onto the square rather than a walled garden. The Causeway is a low, level stone way on small culverts over shallow water, with low parapets and landing lamps; avoid a high arched bridge over a ravine. The deck sits barely above calm water: no white water, deep channel or rocky gorge. Do not add fortifications.

No text, lettering, numbers, logos, creatures, animals, crystals, magic glow or weapons. No people in close-up. Keep studio, artist and game names out of generation prompts. Condition states and animation remain separate production requirements rather than reasons to change the base style.

### Review standard

Judge a candidate beside the Arcadia reference and neighbouring tiles at both working size and 25% scale. Check the following independently:

- Light: the same upper-left source, selective warmth, cool readable shadows and restrained contrast. If in doubt, compare the share of bright warm surface and the spread of light and dark with the reference.
- Materials: consistent greens, navy water and pale warm stone, with matte brushwork and no overall amber wash.
- Subject: the requested landform, feature count and civic silhouette, with no invented dramatic terrain or architecture.
- Geometry: the production template's camera, surface position, retained area and plinth depth.
- Cutout: a clean transparent exterior with no halo, guide lines or painted background.

Batch 1b is evidence of failure modes, not the style master: its broad golden highlights, mountainous additions, inconsistent geometry and structural halos must not become requirements by imitation. Preserve useful material texture and readable detail while correcting those deviations. The batch notes record the individual issues.

## Sequence

1. Produce the picture of Arcadia first; it fixes light, palette and detail.
2. Generate each tile against the same light, using the per-tile prompt below, at the size the active production brief sets (batch 1b: a square 1000 × 500 diamond on its template). The 512 × 296 hex top face at 2× is the size after cutting, not a generation instruction.
3. Normalise to the geometry in the [building standards](building-standards.md): cut to the hex template, remove the background, repaint plinths as hex, record anchor and footprint.
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

Attach the small Arcadia painting as the style reference and, where applicable, exactly the matching production template as the geometry reference. Replace the fields below from the inventory, architectural families and active production brief. Describe the required shape explicitly in `<GEOMETRY>`; this template does not itself choose square or hex.

```text
A single painted Ancient tile for the Knowledge Islands Realm. Match the attached Arcadia painting for surface style, palette and light: late calm dusk, a low sun from the upper left, selective warm highlights on sun-facing tops and edges, cool soft blue-grey shadows towards the lower right, and thin haze that gently lowers contrast. Deep navy water, forest and moss greens, pale warm limestone and sandstone, muted roofs and restrained brass, within the applicable island palette. Matte tactile brushwork, grouped readable forms, fine selective detail and outlines in darkened local colours, never pure black. Small warm window or landing lights only where appropriate; no bloom, broad amber wash or blazing reflections.

Subject: <SUBJECT>. Architectural family and materials: <FAMILY AND MATERIALS, OR NOT APPLICABLE>. Condition and frame: <STATE AND FRAME>. Keep the specified landform and feature count; do not add dramatic hills, cliffs, buildings or planting. Preserve a crisp subject silhouette at 25% scale.

Geometry and placement: <GEOMETRY FROM THE ACTIVE PRODUCTION BRIEF>. Where attached, the geometry template controls the camera, top surface, placement, retained area and plinth; the painting controls appearance only. Keep essential features inside the retained area and the trim band plain. Never paint guide lines or template colours. The plinth shares the surface light without adding height or landforms. Genuine transparent exterior, with no halo, gradient or cast shadow outside the tile.

No text, lettering, numbers, logos, close-up people, creatures, animals, crystals, magic glow, weapons or fortifications.
```

Record the completed prompt verbatim with the references, tool, exposed model identifier if any, measured dimensions, transparency, attempts and deviations. Keep original generated candidates unaltered; perform any approved cutting or normalisation as a separate recorded production step. Generated art remains unlicensed until KI-DESIGN-ART-002 is decided.

## Judged by

Sits seamlessly beside its neighbours on the Arcadia map; matches the reference light; passes `validateTileSet`; under the image budgets.
