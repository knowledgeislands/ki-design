# Ancient seven-hex lighting study — 19 October 2026

Six original candidates for the painted, isometric Island Map: grassland, snow and the Council Hall on a level grassland flower. The Territory Map is unchanged. Each requested footprint is a centre hex and its six neighbours, pointy-top, straight-on 2:1 isometric, with a shallow hex rock plinth beneath every exposed outer edge.

A uses Arcadia dusk; B uses golden sunlight. This was a comparison, not a production tile set. On 20 October 2026 the owner selected Council Hall A as the target for lighting and painted finish, preserving its warmth and detail. This supersedes the provisional recommendation below to reduce its warmth. The matching grassland and snow follow-up is recorded in [the next study](../2026-10-20-council-hall-a-match/NOTES.md).

## Method and provenance

- Tool: built-in image_gen.imagegen, with transparent_background=true. No model identifier was exposed.
- Sole attached reference on every call: docs/briefs/references/arcadia-reference-small.jpg (1024 × 576). It supplies style, palette and light only.
- One attempt per candidate, six calls total; no retries, edits, cropping, resizing, background removal or retouching. The six PNGs are byte-identical copies of the generated files; SHA-256 values below establish that provenance.
- The owner explicitly required only the Arcadia reference on each generation and no other images to be opened. This overrides the brief's normal B-as-an-edit-of-A method: B was generated independently. No A image or geometry template was attached to a B call. No edit instruction was sent. Within each prompt pair only the lighting sentence changes; the exact prompts follow.
- Only the permitted Arcadia reference was opened. Rejected Capital and Port paths were treated as textual evidence. Observations below use the generation tool's returned previews and numerical reads of the saved PNGs; no generated image was reopened or composited for inspection.
- Composition is consequently not locked. These pairs cannot isolate lighting with the confidence of a lighting-only edit.

## File measurements

Every file is RGBA and contains genuinely transparent pixels. Transparent canvas means the percentage with alpha exactly zero; it does not certify a clean silhouette or absence of a halo.

| Candidate | Pixels | Alpha range | Transparent canvas | Bright warm proxy | Attempts |
| --- | --- | --- | --- | --- | --- |
| grassland-A.png | 1774 × 887 | 0–255 | 54.45% | 15.46% | 1 |
| grassland-B.png | 1774 × 887 | 0–255 | 49.52% | 21.01% | 1 |
| snow-A.png | 1774 × 887 | 0–255 | 56.09% | 25.56% | 1 |
| snow-B.png | 1536 × 1024 | 0–254 | 49.77% | 19.03% | 1 |
| council-hall-A.png | 1774 × 887 | 0–255 | 48.42% | 12.16% | 1 |
| council-hall-B.png | 1774 × 887 | 0–255 | 48.78% | 24.48% | 1 |

### Bright warm measurement

A reproducible colour proxy was applied to the saved pixels without altering them. Convert sRGB bytes to R, G, B in [0,1], without linearisation. Define Y = 0.2126R + 0.7152G + 0.0722B and S = (max(R,G,B) − min(R,G,B)) / max(R,G,B), using S = 0 for black. A pixel is bright warm when Y ≥ 0.55, S ≥ 0.15, R > 1.15B and G > 1.05B. Divide that count by the count of pixels with alpha ≥ 128. The JPEG reference uses all pixels.

The reference scores 5.87% with this rule. This is a new, explicitly specified proxy, not a reproduction of the earlier brief's roughly one-in-fourteen measurement. It includes plinth and building pixels, and the reference includes sky and sea; it is not a segmented measure of ground surface. Compare materials and composition visually before interpreting the percentages.

B increases this proxy for grassland and the Council Hall, but decreases it for snow. The snow result is confounded by changed camera, subject coverage and a halo; it does not demonstrate that B has weaker illumination.

## Deviations and assessment

The previews show recognisable seven-cell flowers rather than square diamonds. However, the projected cell outlines appear flat-topped; exact pointy-top alignment and the requested 2:1 per-cell geometry have not been validated. Cell seams are stronger than the requested unobtrusive joins. Rock plinths have irregular, craggy faces and depth variations. Some previews show coloured edge fringes; saved-file fringe judgement is withheld because reopening or compositing other images was prohibited.

- **grassland-A:** Seven cells read clearly, but broad golden grass highlights already exceed the intended dusk restraint. Dense, equally detailed grass; some vegetation appears to hang over the plinth.
- **grassland-B:** Brighter and more yellow than A. Stones, flowers, seams and framing drift from A because this is an independent generation. Grass risks reading as straw.
- **snow-A:** Recognisable seven-cell snowfield with cool shadows, but extensive cream/peach highlights exceed the intended selective warmth. Exposed rocks are more numerous than the requested few.
- **snow-B:** Different canvas and steeper-looking camera than A; rocks and snow relief change. The returned preview shows a broad warm exterior halo, contrary to the clean-cutout request. The PNG does contain transparent pixels, but no fully opaque pixels (maximum alpha 254); alpha presence alone does not establish a clean exterior. Retained unaltered as a failed cutout candidate.
- **council-hall-A:** Long loggia, doors, lit windows, broad steps and no dome are readable. Added cypresses, trees, shrubs and rocks exceed the requested restraint; the rear cell appears raised or mounded rather than level. The plinth is too cliff-like in places. Windows are strong warm accents.
- **council-hall-B:** Brighter stone, forecourt and grass than A. Hall, roof, planting and paths drift from A; decorative planting and a raised-looking rear cell persist. The temple-like pediment treatment merits owner review despite the civic loggia and visible doors. No dome.

A is the closer starting point for restrained Arcadia light; B makes grass and limestone more broadly golden. A itself is still too warmly highlighted, especially in grassland and snow. This is a provisional reading of six independently generated candidates, not an owner decision. The snow B halo, geometry drift and added Hall landscaping prevent treating this as a controlled lighting-only comparison.

Working-size and 25% side-by-side composites, neighbour placement, repetition/seam tests and condition-decal overlays were not performed: they would require opening additional images or producing altered derivatives outside this six-original study. No renderer, contract, manifest or baseline style was changed.

## Exact generation prompts

Each prompt below was submitted once with only the Arcadia reference path above and transparent_background=true. No further hidden reference, edit target or follow-up instruction was supplied.

### grassland-A

```text
Use case: stylized-concept. Asset type: painted terrain lighting-study candidate for the Island Map inside one island.
Input image 1 is the ONLY reference, supplying painted surface style, palette and light; do not copy its composition or its domed buildings.
A single painted Ancient seven-hex flower for the Knowledge Islands Realm. Match the attached painting for surface style and palette. Lighting: late calm dusk, a low sun from the upper left, selective warm highlights on sun-facing tops and edges, cool soft blue-grey shadows towards the lower right, and thin haze that gently lowers contrast. Deep navy water where requested, forest and moss greens, pale warm limestone and sandstone, muted roofs and restrained brass. Matte tactile brushwork, grouped readable forms, fine selective detail and outlines in darkened local colours, never pure black. Small warm window lights only where appropriate; no bloom, broad amber wash or blazing reflections.
Subject: terrain/grassland: a level meadow of living forest and moss greens, fine broken grass strokes, occasional tiny flowers and a few small stones. No trees, buildings, hills or mountains. Condition and frame: intact, still frame 0. Keep this exact landform and feature count; no dramatic terrain or decorative additions. Preserve a crisp subject silhouette at 25% scale.
Geometry and placement: paint DIRECTLY as exactly SEVEN connected equal pointy-top hexagonal ground cells: one centre hex surrounded by its six edge-sharing neighbours, a seven-hex flower. Show all seven cells clearly with fine unobtrusive seams; contiguous level ground, no gaps, no stacked cells. Straight-on 2:1 isometric projection, fixed camera and centred composition; retain the six-sided geometry of each cell, never square diamonds. The perimeter follows the stepped outlines of the six outer hexes. A shallow hexagonal rock plinth supports the ground beneath every exposed outer edge, with vertical rock-strata faces and consistent depth; no tall cliffs, no raised hill. The entire flower, plinth and subject fit inside the canvas with a clear margin. No cropping, trim band or square intermediate. Ground and planting stop at the top edge and do not wrap down the rock faces.
Genuine transparent exterior. No halo, backdrop, gradient, guide lines or cast shadow outside the flower. Haze stays within the painted subject. No text, lettering, numbers, logos, close-up people, creatures, animals, crystals, magic glow, weapons or fortifications.
```

### grassland-B

```text
Use case: stylized-concept. Asset type: painted terrain lighting-study candidate for the Island Map inside one island.
Input image 1 is the ONLY reference, supplying painted surface style, palette and light; do not copy its composition or its domed buildings.
A single painted Ancient seven-hex flower for the Knowledge Islands Realm. Match the attached painting for surface style and palette. Lighting: late-afternoon golden sunlight, the sun higher in the upper left, a stronger warm key light on every sun-facing surface, crisper shadows towards the lower right and little haze. Deep navy water where requested, forest and moss greens, pale warm limestone and sandstone, muted roofs and restrained brass. Matte tactile brushwork, grouped readable forms, fine selective detail and outlines in darkened local colours, never pure black. Small warm window lights only where appropriate; no bloom, broad amber wash or blazing reflections.
Subject: terrain/grassland: a level meadow of living forest and moss greens, fine broken grass strokes, occasional tiny flowers and a few small stones. No trees, buildings, hills or mountains. Condition and frame: intact, still frame 0. Keep this exact landform and feature count; no dramatic terrain or decorative additions. Preserve a crisp subject silhouette at 25% scale.
Geometry and placement: paint DIRECTLY as exactly SEVEN connected equal pointy-top hexagonal ground cells: one centre hex surrounded by its six edge-sharing neighbours, a seven-hex flower. Show all seven cells clearly with fine unobtrusive seams; contiguous level ground, no gaps, no stacked cells. Straight-on 2:1 isometric projection, fixed camera and centred composition; retain the six-sided geometry of each cell, never square diamonds. The perimeter follows the stepped outlines of the six outer hexes. A shallow hexagonal rock plinth supports the ground beneath every exposed outer edge, with vertical rock-strata faces and consistent depth; no tall cliffs, no raised hill. The entire flower, plinth and subject fit inside the canvas with a clear margin. No cropping, trim band or square intermediate. Ground and planting stop at the top edge and do not wrap down the rock faces.
Genuine transparent exterior. No halo, backdrop, gradient, guide lines or cast shadow outside the flower. Haze stays within the painted subject. No text, lettering, numbers, logos, close-up people, creatures, animals, crystals, magic glow, weapons or fortifications.
```

### snow-A

```text
Use case: stylized-concept. Asset type: painted terrain lighting-study candidate for the Island Map inside one island.
Input image 1 is the ONLY reference, supplying painted surface style, palette and light; do not copy its composition or its domed buildings.
A single painted Ancient seven-hex flower for the Knowledge Islands Realm. Match the attached painting for surface style and palette. Lighting: late calm dusk, a low sun from the upper left, selective warm highlights on sun-facing tops and edges, cool soft blue-grey shadows towards the lower right, and thin haze that gently lowers contrast. Deep navy water where requested, forest and moss greens, pale warm limestone and sandstone, muted roofs and restrained brass. Matte tactile brushwork, grouped readable forms, fine selective detail and outlines in darkened local colours, never pure black. Small warm window lights only where appropriate; no bloom, broad amber wash or blazing reflections.
Subject: terrain/snow: a level snowfield, white on small lit accents and cool blue-grey in shade, with a few small exposed stones. No trees, buildings, hills, mountains or peach-coloured snow. Condition and frame: intact, still frame 0. Keep this exact landform and feature count; no dramatic terrain or decorative additions. Preserve a crisp subject silhouette at 25% scale.
Geometry and placement: paint DIRECTLY as exactly SEVEN connected equal pointy-top hexagonal ground cells: one centre hex surrounded by its six edge-sharing neighbours, a seven-hex flower. Show all seven cells clearly with fine unobtrusive seams; contiguous level ground, no gaps, no stacked cells. Straight-on 2:1 isometric projection, fixed camera and centred composition; retain the six-sided geometry of each cell, never square diamonds. The perimeter follows the stepped outlines of the six outer hexes. A shallow hexagonal rock plinth supports the ground beneath every exposed outer edge, with vertical rock-strata faces and consistent depth; no tall cliffs, no raised hill. The entire flower, plinth and subject fit inside the canvas with a clear margin. No cropping, trim band or square intermediate. Ground and planting stop at the top edge and do not wrap down the rock faces.
Genuine transparent exterior. No halo, backdrop, gradient, guide lines or cast shadow outside the flower. Haze stays within the painted subject. No text, lettering, numbers, logos, close-up people, creatures, animals, crystals, magic glow, weapons or fortifications.
```

### snow-B

```text
Use case: stylized-concept. Asset type: painted terrain lighting-study candidate for the Island Map inside one island.
Input image 1 is the ONLY reference, supplying painted surface style, palette and light; do not copy its composition or its domed buildings.
A single painted Ancient seven-hex flower for the Knowledge Islands Realm. Match the attached painting for surface style and palette. Lighting: late-afternoon golden sunlight, the sun higher in the upper left, a stronger warm key light on every sun-facing surface, crisper shadows towards the lower right and little haze. Deep navy water where requested, forest and moss greens, pale warm limestone and sandstone, muted roofs and restrained brass. Matte tactile brushwork, grouped readable forms, fine selective detail and outlines in darkened local colours, never pure black. Small warm window lights only where appropriate; no bloom, broad amber wash or blazing reflections.
Subject: terrain/snow: a level snowfield, white on small lit accents and cool blue-grey in shade, with a few small exposed stones. No trees, buildings, hills, mountains or peach-coloured snow. Condition and frame: intact, still frame 0. Keep this exact landform and feature count; no dramatic terrain or decorative additions. Preserve a crisp subject silhouette at 25% scale.
Geometry and placement: paint DIRECTLY as exactly SEVEN connected equal pointy-top hexagonal ground cells: one centre hex surrounded by its six edge-sharing neighbours, a seven-hex flower. Show all seven cells clearly with fine unobtrusive seams; contiguous level ground, no gaps, no stacked cells. Straight-on 2:1 isometric projection, fixed camera and centred composition; retain the six-sided geometry of each cell, never square diamonds. The perimeter follows the stepped outlines of the six outer hexes. A shallow hexagonal rock plinth supports the ground beneath every exposed outer edge, with vertical rock-strata faces and consistent depth; no tall cliffs, no raised hill. The entire flower, plinth and subject fit inside the canvas with a clear margin. No cropping, trim band or square intermediate. Ground and planting stop at the top edge and do not wrap down the rock faces.
Genuine transparent exterior. No halo, backdrop, gradient, guide lines or cast shadow outside the flower. Haze stays within the painted subject. No text, lettering, numbers, logos, close-up people, creatures, animals, crystals, magic glow, weapons or fortifications.
```

### council-hall-A

```text
Use case: stylized-concept. Asset type: painted terrain lighting-study candidate for the Island Map inside one island.
Input image 1 is the ONLY reference, supplying painted surface style, palette and light; do not copy its composition or its domed buildings.
A single painted Ancient seven-hex flower for the Knowledge Islands Realm. Match the attached painting for surface style and palette. Lighting: late calm dusk, a low sun from the upper left, selective warm highlights on sun-facing tops and edges, cool soft blue-grey shadows towards the lower right, and thin haze that gently lowers contrast. Deep navy water where requested, forest and moss greens, pale warm limestone and sandstone, muted roofs and restrained brass. Matte tactile brushwork, grouped readable forms, fine selective detail and outlines in darkened local colours, never pure black. Small warm window lights only where appropriate; no bloom, broad amber wash or blazing reflections.
Subject: structure/council-hall: one long pale limestone civic hall standing on a LEVEL grassland seven-hex flower, a low-pitched muted roof with a plain unsculpted pediment, broad steps, a front loggia along the long side only, visible doors and small lit windows behind the columns, and an open forecourt. No dome, no peristyle, no temple ornament, no walls or other buildings. Condition and frame: intact, still frame 0. Keep this exact landform and feature count; no dramatic terrain or decorative additions. Preserve a crisp subject silhouette at 25% scale.
Geometry and placement: paint DIRECTLY as exactly SEVEN connected equal pointy-top hexagonal ground cells: one centre hex surrounded by its six edge-sharing neighbours, a seven-hex flower. Show all seven cells clearly with fine unobtrusive seams; contiguous level ground, no gaps, no stacked cells. Straight-on 2:1 isometric projection, fixed camera and centred composition; retain the six-sided geometry of each cell, never square diamonds. The perimeter follows the stepped outlines of the six outer hexes. A shallow hexagonal rock plinth supports the ground beneath every exposed outer edge, with vertical rock-strata faces and consistent depth; no tall cliffs, no raised hill. The entire flower, plinth and subject fit inside the canvas with a clear margin. No cropping, trim band or square intermediate. Ground and planting stop at the top edge and do not wrap down the rock faces.
Genuine transparent exterior. No halo, backdrop, gradient, guide lines or cast shadow outside the flower. Haze stays within the painted subject. No text, lettering, numbers, logos, close-up people, creatures, animals, crystals, magic glow, weapons or fortifications.
```

### council-hall-B

```text
Use case: stylized-concept. Asset type: painted terrain lighting-study candidate for the Island Map inside one island.
Input image 1 is the ONLY reference, supplying painted surface style, palette and light; do not copy its composition or its domed buildings.
A single painted Ancient seven-hex flower for the Knowledge Islands Realm. Match the attached painting for surface style and palette. Lighting: late-afternoon golden sunlight, the sun higher in the upper left, a stronger warm key light on every sun-facing surface, crisper shadows towards the lower right and little haze. Deep navy water where requested, forest and moss greens, pale warm limestone and sandstone, muted roofs and restrained brass. Matte tactile brushwork, grouped readable forms, fine selective detail and outlines in darkened local colours, never pure black. Small warm window lights only where appropriate; no bloom, broad amber wash or blazing reflections.
Subject: structure/council-hall: one long pale limestone civic hall standing on a LEVEL grassland seven-hex flower, a low-pitched muted roof with a plain unsculpted pediment, broad steps, a front loggia along the long side only, visible doors and small lit windows behind the columns, and an open forecourt. No dome, no peristyle, no temple ornament, no walls or other buildings. Condition and frame: intact, still frame 0. Keep this exact landform and feature count; no dramatic terrain or decorative additions. Preserve a crisp subject silhouette at 25% scale.
Geometry and placement: paint DIRECTLY as exactly SEVEN connected equal pointy-top hexagonal ground cells: one centre hex surrounded by its six edge-sharing neighbours, a seven-hex flower. Show all seven cells clearly with fine unobtrusive seams; contiguous level ground, no gaps, no stacked cells. Straight-on 2:1 isometric projection, fixed camera and centred composition; retain the six-sided geometry of each cell, never square diamonds. The perimeter follows the stepped outlines of the six outer hexes. A shallow hexagonal rock plinth supports the ground beneath every exposed outer edge, with vertical rock-strata faces and consistent depth; no tall cliffs, no raised hill. The entire flower, plinth and subject fit inside the canvas with a clear margin. No cropping, trim band or square intermediate. Ground and planting stop at the top edge and do not wrap down the rock faces.
Genuine transparent exterior. No halo, backdrop, gradient, guide lines or cast shadow outside the flower. Haze stays within the painted subject. No text, lettering, numbers, logos, close-up people, creatures, animals, crystals, magic glow, weapons or fortifications.
```

## Original-file hashes

- grassland-A.png: `e18fae94163ea01900e31a401ff6255bdd0f22a2d16f2aa241ae98ca2cd198f8`.
- grassland-B.png: `34f1fcef84e5b5747ce2e433db947ad4a37de0a0fb7c32943711d02eafc97bbb`.
- snow-A.png: `22d3f9e04bd6911ba706ecc3127bcf39eea8e433a8dc3f4e22a05bf532a79b2b`.
- snow-B.png: `254e3024f4a0187351f0db165845597ec60283c3dfc8cf493646013d5c2b9629`.
- council-hall-A.png: `b1fd2a235e32ab9f89e74d60537ac67e9451bc5f40b96808d27a5a3711ee9c97`.
- council-hall-B.png: `73d6a55b26d52a4ab61c98b4495c9aa5c76dcd37acea81f5bd5a4374b0ba58d5`.

Reference JPEG: `23b5b25e078bc75316a4bee86f1c64523a230cb80622ac5479d31b64f7de9172`.
