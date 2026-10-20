# Pointy-top seven-hex flower study — 20 October 2026

This scoped study used the built-in image_gen.imagegen tool. It is not a production tile set or an approved correction. Grassland and Council Hall moved to the requested two–three–two flower arrangement; snow did not. Other deviations remain below.

## Method and references

Main was fetched and fast-forward reconciled before work; there were no unpublished ancestors. Only these two reference images were opened. Exactly these two paths, in this order, were attached to EVERY generation, with their roles stated in EVERY prompt:

1. `../2026-10-19-lighting-study/council-hall-A.png`: light, palette and painted finish only, never shape.
2. `../2026-10-19-lighting-study/grassland-A.png`: pointy-top seven-hex geometry and camera only, never light.

The design review in `../2026-10-20-council-hall-a-match/NOTES.md` and Reference and lighting in `../../../docs/briefs/tile-set-ancient.md` informed the prompts. No other images were opened. Generated previews were returned by the generation tool; saved images were measured numerically without reopening, compositing or altering them.

Every call used `transparent_background=true` and `referenced_image_paths` containing exactly those two absolute paths. No other image, prior generated candidate, edit target or implicit recent-image reference was supplied. No model identifier was exposed. Nine calls total: grassland 3 attempts, snow 4, Council Hall 2. The selected images are byte-for-byte copies of grassland attempt 3, snow attempt 4 and Council Hall attempt 2. There was no resizing, cropping, retouching, background removal or other postprocessing.

## Measurements

Measured directly from the selected PNGs with Pillow. Fully transparent means alpha exactly zero; alpha presence does not establish a clean cutout.

| File | Pixels | Mode | Alpha range | Fully transparent canvas | Attempts |
| --- | --- | --- | --- | --- | --- |
| grassland.png | 1536 × 1024 | RGBA | 0–254 | 46.48% | 3 |
| snow.png | 1774 × 887 | RGBA | 0–255 | 55.44% | 4 |
| council-hall.png | 1536 × 1024 | RGBA | 0–254 | 46.77% | 2 |

All three contain genuinely transparent pixels. Grassland and Hall have no fully opaque pixels and broad coloured exterior glows in the returned previews, so neither passes the transparent-cutout requirement.

SHA-256:

```text
47ae40db994b4df1ee51cd55f7a4ed0cbdba9d9bbc75d9cffb834d188984399f  grassland.png
41e36e4591789cbc9830010b257bac5e9ed3afc1ef1d6f05d80fb6dfa2c63f17  snow.png
3c2350c34817490a634c276eda3687a3ba973bbcf9c03d69f96b9b42ffda25e5  council-hall.png
```

## Deviations and review

- Grassland: attempt 3 visibly has two rear cells, three middle cells and two front cells, with vertical outer side segments and upper/lower cell points. The seven-cell arrangement improves on attempts 1–2. Seams are still dark and too conspicuous, the rock plinth is too deep, planting descends its faces, and grass remains too yellow and bright relative to Council Hall A's own grass. The preview shows a broad golden exterior glow. No claim of a successful lighting match is made.
- Snow: all four attempts retained a single rear cell and single front cell, with horizontal shared top/bottom edges. The required pointy-top correction failed despite explicit two–three–two instructions. Attempt 4 is retained as the final failed geometry candidate. Snow remains white and blue-grey but with more cream warmth than requested; seams are dark grooves, plinth faces are deep and craggy, and snow wraps onto them. Tiny coloured fringes are visible in the preview. Transparency was measured but clean-edge compliance is not certified.
- Council Hall: attempt 2 visibly changes to the two–three–two arrangement and retains a long civic loggia, broad steps, doors, lit windows and no dome. Exact 2:1 projection is not independently validated. Rear ground still looks mounded, landscaping is much denser than requested, seams are strong and plinths too deep. A broad exterior golden/grey glow violates the cutout requirement. Small pediment decoration and bright windows also exceed the intended restraint.
- Initial grassland and snow attempts had faint internal seams but retained the old arrangement. Initial Hall retained the old arrangement and introduced a glow. The numerical-coordinate retry corrected Hall arrangement, but grassland and snow ignored it; shorter geometry-first wording corrected grassland. Snow ignored both shorter geometry-first retries.
- These are independent generations, so framing, detail and lighting drift between subjects and attempts. No renderer, manifest, contract or other asset was changed. No altered comparison images were made. This record preserves the unsuccessful outcomes honestly; the three-image brief remains visually unsatisfied where noted above.

## Exact generation prompts

Prompts below are the exact tool prompt strings, including all appended corrections. Every call attached the same two references in the stated order and requested transparency.

### grassland, attempt 1

```text
Use case: stylized-concept.
Asset type: painted seven-hex flower study for the Ancient Island Map.
Attach exactly these two reference images, with strictly separate roles:
Image 1, council-hall-A.png: LIGHT, PALETTE AND PAINTED FINISH ONLY. Match its warm upper-left light, restrained saturation, matte brushwork and cool readable lower-right shadows. NEVER use its shape, cell orientation, camera, landscaping or building composition.
Image 2, grassland-A.png: POINTY-TOP SEVEN-HEX GEOMETRY AND CAMERA ONLY. NEVER use its light, brightness, warmth or palette.
Geometry is mandatory: one centre hex and its six edge-sharing neighbours, all seven the same size, POINTY-TOP in ground-plan coordinates: vertical left and right sides, a vertex pointing up and a vertex pointing down; never horizontal top and bottom edges. Project that pointy-top flower through the reference's straight-on 2:1 isometric camera. Paint directly on this connected footprint, no square intermediate and no cropping. Keep all seven top surfaces on one level. Internal cell seams are faint to absent, never dark grooves, bevels or gaps.
Use a very shallow, even rock plinth under exposed outer edges, with restrained strata, no cliffs, crags, overhangs or raised rear cell. Planting stops at the top edge.
Light and finish: match Council Hall A's own amount of warmth and brightness, never exceed it. Grass remains muted green and no brighter than Council Hall A's own grass, with small golden accents; no yellow grass or overall amber wash. Cool shadows retain material colour. No bloom, haze halo or exterior cast shadow.
Background: genuine transparent exterior, clean cutout, generous clear margin, whole flower visible.
No text, lettering, numbers, logos, people, creatures, animals, crystals, magic glow or weapons.
Subject: a level grassland seven-hex flower, gently textured green turf with fine broken painted strokes, sparse tiny flowers and a few small stones. Open grass dominates; no buildings, trees, hills or dense shrubs. Keep grass darker and less yellow than image 2; match only image 1's grass light and palette.
```

### grassland, attempt 2

```text
Use case: stylized-concept.
Asset type: painted seven-hex flower study for the Ancient Island Map.
Attach exactly these two reference images, with strictly separate roles:
Image 1, council-hall-A.png: LIGHT, PALETTE AND PAINTED FINISH ONLY. Match its warm upper-left light, restrained saturation, matte brushwork and cool readable lower-right shadows. NEVER use its shape, cell orientation, camera, landscaping or building composition.
Image 2, grassland-A.png: POINTY-TOP SEVEN-HEX GEOMETRY AND CAMERA ONLY. NEVER use its light, brightness, warmth or palette.
Geometry is mandatory: one centre hex and its six edge-sharing neighbours, all seven the same size, POINTY-TOP in ground-plan coordinates: vertical left and right sides, a vertex pointing up and a vertex pointing down; never horizontal top and bottom edges. Project that pointy-top flower through the reference's straight-on 2:1 isometric camera. Paint directly on this connected footprint, no square intermediate and no cropping. Keep all seven top surfaces on one level. Internal cell seams are faint to absent, never dark grooves, bevels or gaps.
Use a very shallow, even rock plinth under exposed outer edges, with restrained strata, no cliffs, crags, overhangs or raised rear cell. Planting stops at the top edge.
Light and finish: match Council Hall A's own amount of warmth and brightness, never exceed it. Grass remains muted green and no brighter than Council Hall A's own grass, with small golden accents; no yellow grass or overall amber wash. Cool shadows retain material colour. No bloom, haze halo or exterior cast shadow.
Background: genuine transparent exterior, clean cutout, generous clear margin, whole flower visible.
No text, lettering, numbers, logos, people, creatures, animals, crystals, magic glow or weapons.
Subject: a level grassland seven-hex flower, gently textured green turf with fine broken painted strokes, sparse tiny flowers and a few small stones. Open grass dominates; no buildings, trees, hills or dense shrubs. Keep grass darker and less yellow than image 2; match only image 1's grass light and palette.
Critical correction for this generation: construct the flower with neighbours at LEFT, UPPER-LEFT, UPPER-RIGHT, RIGHT, LOWER-RIGHT, LOWER-LEFT of the centre, not a neighbour directly above or directly below it. In the final screen projection each cell has vertices relative to its centre at (0,-100), (173,-50), (173,50), (0,100), (-173,50), (-173,-50): vertical 100-unit left and right edges and tips at top and bottom, an overall cell width:height of 346:200. Cell centres relative to the centre cell are (-346,0),(-173,-150),(173,-150),(346,0),(173,150),(-173,150). This is a geometry description, not lines or numbers to render. The flower outline thus has TWO rear tips and TWO front tips, with a cell at far left and at far right. This explicit construction overrides any ambiguous shape in either reference. Only a thin even 20-unit plinth, no vegetation down its sides. Substantially darker green turf, matching Council Hall A's shaded grass. Transparent alpha outside, absolutely no painted halo or glow.
```

### grassland, attempt 3 — saved

```text
Paint a POINTY-TOP seven-hex flower: two rear cells, a middle row of three cells, two front cells. NO single rear cell or single front cell. Every hex has vertical left and right sides and upper/lower points in the ground plan. A centre hex with neighbours left, upper-left, upper-right, right, lower-right, lower-left, projected in straight-on 2:1 isometric. Seven same-sized hexes touching edge to edge, level surface; faint almost invisible seams; extremely shallow level rock base.
Exactly two attached references: image 1 council-hall-A.png supplies LIGHT, PALETTE AND PAINTED FINISH ONLY, NEVER SHAPE. Image 2 grassland-A.png supplies pointy-top seven-hex GEOMETRY AND CAMERA ONLY, NEVER LIGHT. The explicit two-three-two arrangement above controls geometry.
Subject: open level muted dark green grassland, no brighter than Council Hall A's own grass; sparse tiny flowers and a few small stones, no trees or bushes.
Match image 1's warm upper-left sun and cool lower-right shadows, matte painted detail. No amber wash. Transparent background with actual alpha, no background paint, halo, glow or shadow outside the flower. No text, logos, people, animals or fantasy objects.
```

### snow, attempt 1

```text
Use case: stylized-concept.
Asset type: painted seven-hex flower study for the Ancient Island Map.
Attach exactly these two reference images, with strictly separate roles:
Image 1, council-hall-A.png: LIGHT, PALETTE AND PAINTED FINISH ONLY. Match its warm upper-left light, restrained saturation, matte brushwork and cool readable lower-right shadows. NEVER use its shape, cell orientation, camera, landscaping or building composition.
Image 2, grassland-A.png: POINTY-TOP SEVEN-HEX GEOMETRY AND CAMERA ONLY. NEVER use its light, brightness, warmth or palette.
Geometry is mandatory: one centre hex and its six edge-sharing neighbours, all seven the same size, POINTY-TOP in ground-plan coordinates: vertical left and right sides, a vertex pointing up and a vertex pointing down; never horizontal top and bottom edges. Project that pointy-top flower through the reference's straight-on 2:1 isometric camera. Paint directly on this connected footprint, no square intermediate and no cropping. Keep all seven top surfaces on one level. Internal cell seams are faint to absent, never dark grooves, bevels or gaps.
Use a very shallow, even rock plinth under exposed outer edges, with restrained strata, no cliffs, crags, overhangs or raised rear cell. Planting stops at the top edge.
Light and finish: match Council Hall A's own amount of warmth and brightness, never exceed it. Grass remains muted green and no brighter than Council Hall A's own grass, with small golden accents; no yellow grass or overall amber wash. Cool shadows retain material colour. No bloom, haze halo or exterior cast shadow.
Background: genuine transparent exterior, clean cutout, generous clear margin, whole flower visible.
No text, lettering, numbers, logos, people, creatures, animals, crystals, magic glow or weapons.
Subject: a level snowfield seven-hex flower, low smooth snow cover and a few small exposed stones, no mountains or hills. Most snow stays white and cool blue-grey; only small sun-facing accents inherit Council Hall A's warmth. No broad peach or cream wash. Snow remains on the level top, never hanging over the shallow plinth.
```

### snow, attempt 2

```text
Use case: stylized-concept.
Asset type: painted seven-hex flower study for the Ancient Island Map.
Attach exactly these two reference images, with strictly separate roles:
Image 1, council-hall-A.png: LIGHT, PALETTE AND PAINTED FINISH ONLY. Match its warm upper-left light, restrained saturation, matte brushwork and cool readable lower-right shadows. NEVER use its shape, cell orientation, camera, landscaping or building composition.
Image 2, grassland-A.png: POINTY-TOP SEVEN-HEX GEOMETRY AND CAMERA ONLY. NEVER use its light, brightness, warmth or palette.
Geometry is mandatory: one centre hex and its six edge-sharing neighbours, all seven the same size, POINTY-TOP in ground-plan coordinates: vertical left and right sides, a vertex pointing up and a vertex pointing down; never horizontal top and bottom edges. Project that pointy-top flower through the reference's straight-on 2:1 isometric camera. Paint directly on this connected footprint, no square intermediate and no cropping. Keep all seven top surfaces on one level. Internal cell seams are faint to absent, never dark grooves, bevels or gaps.
Use a very shallow, even rock plinth under exposed outer edges, with restrained strata, no cliffs, crags, overhangs or raised rear cell. Planting stops at the top edge.
Light and finish: match Council Hall A's own amount of warmth and brightness, never exceed it. Grass remains muted green and no brighter than Council Hall A's own grass, with small golden accents; no yellow grass or overall amber wash. Cool shadows retain material colour. No bloom, haze halo or exterior cast shadow.
Background: genuine transparent exterior, clean cutout, generous clear margin, whole flower visible.
No text, lettering, numbers, logos, people, creatures, animals, crystals, magic glow or weapons.
Subject: a level snowfield seven-hex flower, low smooth snow cover and a few small exposed stones, no mountains or hills. Most snow stays white and cool blue-grey; only small sun-facing accents inherit Council Hall A's warmth. No broad peach or cream wash. Snow remains on the level top, never hanging over the shallow plinth.
Critical correction for this generation: construct the flower with neighbours at LEFT, UPPER-LEFT, UPPER-RIGHT, RIGHT, LOWER-RIGHT, LOWER-LEFT of the centre, not a neighbour directly above or directly below it. In the final screen projection each cell has vertices relative to its centre at (0,-100), (173,-50), (173,50), (0,100), (-173,50), (-173,-50): vertical 100-unit left and right edges and tips at top and bottom, an overall cell width:height of 346:200. Cell centres relative to the centre cell are (-346,0),(-173,-150),(173,-150),(346,0),(173,150),(-173,150). This is a geometry description, not lines or numbers to render. The flower outline thus has TWO rear tips and TWO front tips, with a cell at far left and at far right. This explicit construction overrides any ambiguous shape in either reference. Only a thin even 20-unit plinth, no vegetation down its sides. Substantially darker green turf, matching Council Hall A's shaded grass. Transparent alpha outside, absolutely no painted halo or glow.
```

### snow, attempt 3

```text
Paint a POINTY-TOP seven-hex flower: two rear cells, a middle row of three cells, two front cells. NO single rear cell or single front cell. Every hex has vertical left and right sides and upper/lower points in the ground plan. A centre hex with neighbours left, upper-left, upper-right, right, lower-right, lower-left, projected in straight-on 2:1 isometric. Seven same-sized hexes touching edge to edge, level surface; faint almost invisible seams; extremely shallow level rock base.
Exactly two attached references: image 1 council-hall-A.png supplies LIGHT, PALETTE AND PAINTED FINISH ONLY, NEVER SHAPE. Image 2 grassland-A.png supplies pointy-top seven-hex GEOMETRY AND CAMERA ONLY, NEVER LIGHT. The explicit two-three-two arrangement above controls geometry.
Subject: level smooth snowfield, white and cool blue-grey, sparse small stones, no bushes, no mountains, only small warm sunlight accents.
Match image 1's warm upper-left sun and cool lower-right shadows, matte painted detail. No amber wash. Transparent background with actual alpha, no background paint, halo, glow or shadow outside the flower. No text, logos, people, animals or fantasy objects.
```

### snow, attempt 4 — saved

```text
GEOMETRY FIRST: seven hexagons arranged as TWO cells in the rear row, THREE cells in the middle row, TWO cells in the front row. There is a notch in the middle of BOTH the rear edge and the front edge. The leftmost and rightmost cells are on the horizontal centre line. All hexes have vertical left and right sides, and points up and down, then compressed vertically for straight-on 2:1 isometric. Do NOT put one cell at the rear or front.
Paint this as a level snowfield: white and blue-grey snow, a few small stones, faint seams, very shallow level stone plinth. No hills, shrubs or overhangs.
Exactly TWO references are attached. Image 1 council-hall-A.png is LIGHT, PALETTE AND PAINTED FINISH ONLY, NEVER SHAPE. Image 2 grassland-A.png is POINTY-TOP SEVEN-HEX GEOMETRY AND CAMERA ONLY, NEVER LIGHT. Follow the explicit two-three-two layout above. Warm upper-left light, cool lower-right shadows, most snow white and blue-grey, only sparse warm accents. Matte painterly finish. Genuine transparent background: absolutely no painted backdrop, gradient, halo, glow, or exterior shadow. No text, people, animals or logos.
```

### council-hall, attempt 1

```text
Use case: stylized-concept.
Asset type: painted seven-hex flower study for the Ancient Island Map.
Attach exactly these two reference images, with strictly separate roles:
Image 1, council-hall-A.png: LIGHT, PALETTE AND PAINTED FINISH ONLY. Match its warm upper-left light, restrained saturation, matte brushwork and cool readable lower-right shadows. NEVER use its shape, cell orientation, camera, landscaping or building composition.
Image 2, grassland-A.png: POINTY-TOP SEVEN-HEX GEOMETRY AND CAMERA ONLY. NEVER use its light, brightness, warmth or palette.
Geometry is mandatory: one centre hex and its six edge-sharing neighbours, all seven the same size, POINTY-TOP in ground-plan coordinates: vertical left and right sides, a vertex pointing up and a vertex pointing down; never horizontal top and bottom edges. Project that pointy-top flower through the reference's straight-on 2:1 isometric camera. Paint directly on this connected footprint, no square intermediate and no cropping. Keep all seven top surfaces on one level. Internal cell seams are faint to absent, never dark grooves, bevels or gaps.
Use a very shallow, even rock plinth under exposed outer edges, with restrained strata, no cliffs, crags, overhangs or raised rear cell. Planting stops at the top edge.
Light and finish: match Council Hall A's own amount of warmth and brightness, never exceed it. Grass remains muted green and no brighter than Council Hall A's own grass, with small golden accents; no yellow grass or overall amber wash. Cool shadows retain material colour. No bloom, haze halo or exterior cast shadow.
Background: genuine transparent exterior, clean cutout, generous clear margin, whole flower visible.
No text, lettering, numbers, logos, people, creatures, animals, crystals, magic glow or weapons.
Subject: a Council Hall on LEVEL grassland across the seven-hex flower, no dome. A long pale limestone civic hall with a low-pitched pediment roof, a plain tympanum without sculpture, and a front loggia along the long side only. Doors and small warmly lit windows visible behind the columns, broad steps opening onto a modest civic forecourt. No peristyle around every face, no temple treatment, no walled garden. Keep landscaping sparse, grass level and green, no mound, terrace, hill or raised rear cell. Small window lights are subordinate and have no glow.
```

### council-hall, attempt 2 — saved

```text
Use case: stylized-concept.
Asset type: painted seven-hex flower study for the Ancient Island Map.
Attach exactly these two reference images, with strictly separate roles:
Image 1, council-hall-A.png: LIGHT, PALETTE AND PAINTED FINISH ONLY. Match its warm upper-left light, restrained saturation, matte brushwork and cool readable lower-right shadows. NEVER use its shape, cell orientation, camera, landscaping or building composition.
Image 2, grassland-A.png: POINTY-TOP SEVEN-HEX GEOMETRY AND CAMERA ONLY. NEVER use its light, brightness, warmth or palette.
Geometry is mandatory: one centre hex and its six edge-sharing neighbours, all seven the same size, POINTY-TOP in ground-plan coordinates: vertical left and right sides, a vertex pointing up and a vertex pointing down; never horizontal top and bottom edges. Project that pointy-top flower through the reference's straight-on 2:1 isometric camera. Paint directly on this connected footprint, no square intermediate and no cropping. Keep all seven top surfaces on one level. Internal cell seams are faint to absent, never dark grooves, bevels or gaps.
Use a very shallow, even rock plinth under exposed outer edges, with restrained strata, no cliffs, crags, overhangs or raised rear cell. Planting stops at the top edge.
Light and finish: match Council Hall A's own amount of warmth and brightness, never exceed it. Grass remains muted green and no brighter than Council Hall A's own grass, with small golden accents; no yellow grass or overall amber wash. Cool shadows retain material colour. No bloom, haze halo or exterior cast shadow.
Background: genuine transparent exterior, clean cutout, generous clear margin, whole flower visible.
No text, lettering, numbers, logos, people, creatures, animals, crystals, magic glow or weapons.
Subject: a Council Hall on LEVEL grassland across the seven-hex flower, no dome. A long pale limestone civic hall with a low-pitched pediment roof, a plain tympanum without sculpture, and a front loggia along the long side only. Doors and small warmly lit windows visible behind the columns, broad steps opening onto a modest civic forecourt. No peristyle around every face, no temple treatment, no walled garden. Keep landscaping sparse, grass level and green, no mound, terrace, hill or raised rear cell. Small window lights are subordinate and have no glow.
Critical correction for this generation: construct the flower with neighbours at LEFT, UPPER-LEFT, UPPER-RIGHT, RIGHT, LOWER-RIGHT, LOWER-LEFT of the centre, not a neighbour directly above or directly below it. In the final screen projection each cell has vertices relative to its centre at (0,-100), (173,-50), (173,50), (0,100), (-173,50), (-173,-50): vertical 100-unit left and right edges and tips at top and bottom, an overall cell width:height of 346:200. Cell centres relative to the centre cell are (-346,0),(-173,-150),(173,-150),(346,0),(173,150),(-173,150). This is a geometry description, not lines or numbers to render. The flower outline thus has TWO rear tips and TWO front tips, with a cell at far left and at far right. This explicit construction overrides any ambiguous shape in either reference. Only a thin even 20-unit plinth, no vegetation down its sides. Substantially darker green turf, matching Council Hall A's shaded grass. Transparent alpha outside, absolutely no painted halo or glow.
```
