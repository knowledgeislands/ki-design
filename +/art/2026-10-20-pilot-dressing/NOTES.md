# Pilot dressing art study — 20 October 2026

Five unaltered generated art candidates for owner review. This study does not change the pilot or any production renderer. Main was pulled with fast-forward-only before work. The requested destination did not exist at inspection; no existing art was overwritten.

## Generation provenance

Tool: built-in `image_gen.imagegen` (callable as `image_gen__imagegen`). No model identifier was exposed by the tool; none is inferred. Five calls total, one attempt per image, no retries or additional candidates. Each call attached exactly one local reference: `../2026-10-19-lighting-study/council-hall-A.png`. Its role was LIGHT, PALETTE AND PAINTED FINISH ONLY, explicitly stated in every submitted prompt, with an explicit prohibition on copying its shape. No other images were opened or attached. Generated candidates were assessed through the returned generation previews; numerical decoding was used only for dimensions, alpha, hashes and border statistics.

The props call used `transparent_background: true`; all four ground calls used `transparent_background: false`. Every image was copied byte-for-byte from the built-in tool's generated output; source and destination SHA-256 equality was checked. No cropping, resizing, colour correction, background removal, border repair or other alteration was performed. Original generator files remain in place. `measurements.json` records dimensions, alpha, hashes and border comparisons. `prompts.json` duplicates the exact prompt strings below and the transparency arguments.

## Measured files

| File | Pixels | Background | Attempts |
| --- | --- | --- | --- |
| props-sheet.png | 1536 × 1024 | Alpha present, range 0–254 | 1 |
| grass-meadow.png | 1254 × 1254 | Fully opaque, alpha 255 | 1 |
| grass-stony-turf.png | 1254 × 1254 | Fully opaque, alpha 255 | 1 |
| grass-worn.png | 1254 × 1254 | Fully opaque, alpha 255 | 1 |
| grass-lush-hollows.png | 1254 × 1254 | Fully opaque, alpha 255 | 1 |

Props: 825,749 of 1,572,864 pixels have alpha zero (52.5%). All pixels are below alpha 255; the maximum is 254. Three alpha quartiles (25th, 50th, 75th) are 0, 0, 223. Corner alpha values are 1, 0, 1, 0 in the order top-left, top-right, bottom-left, bottom-right. This confirms real transparency, but does not prove every gutter is perfectly clean. The preview shows a coloured field; it must not be used alone to infer opacity. Minor residual alpha and the lack of fully opaque sprite pixels are recorded deviations.

## Preview assessment and deviations

The props preview shows 24 individually recognisable groups arranged as requested: six shrubs; four cypresses and two olive trees; one olive tree, four rock clusters and one wildflower clump; three wildflower clumps, two tall-grass tufts and one stump. This matches the requested inventory totals. Visible silhouettes are separated with useful gutters and no obvious touching. Some rock clusters include substantial foliage, and the stump has surrounding leaves; these are extra dressing within the requested groups. No broad ground tiles are visible, although the rocky groups have some base-like scatter. Upper-left warmth, cooler shaded foliage and a painted finish are apparent. The view reads as orthographic upright game props; the precise 2:1 projection is not numerically established from organic silhouettes. Crispness at an actual 25% display was not independently inspected because only returned generation previews were used and no derivatives were created; readability at that scale remains an owner review criterion.

All four materials are square and depict continuous painted ground without large standing objects. Meadow has fine flower flecks but also bare-soil streaks. Short turf contains embedded stone chips but includes grass marks that can read as small tufts. Worn ground has a prominent irregular bare area. Lush turf has darker irregular areas, but also unwanted bare flecks and pronounced diagonal surface strokes rather than an unambiguously lush finish. The shared golden upper-left to cooler lower-right lighting creates stronger broad variation than ideal for freely interchangeable material samples.

The outer tenth is not consistently plain or identical across images. The quiet edge band often looks narrower than the full requested 10%, with interior marks intruding into that region. Some highlights, flowers, stones and stronger texture approach or enter the required band. Border mean RGBs differ: lush (118.601, 123.121, 53.552), meadow (124.363, 123.850, 54.033), stony (114.977, 116.601, 56.322), worn (116.921, 121.788, 52.276). None is a uniform #737D46 border. Across all six image pairs, matching-coordinate outer-tenth mean absolute RGB differences range from 8.899 to 10.705 on the 0–255 channel scale; no pair has identical border pixels. These statistics are diagnostics, not a perceptual seam test. Seamless arbitrary joins are therefore not established and the border requirement is not met reliably. The candidates remain unaltered for review, with no claim of acceptance, licensing or renderer readiness.

## Exact submitted prompts

Each fenced block is the complete prompt string submitted for that call. The only attached image on every call was the sole reference named above.

### 1. props-sheet.png

```text
Use case: stylized-concept
Asset type: painted terrain dressing props sheet, one image.
Input image 1 is the SOLE reference, council-hall-A.png, for LIGHT, PALETTE AND PAINTED FINISH ONLY. NEVER COPY ITS SHAPE, building, terrain layout, hexes, platforms or composition.
Create exactly 24 separate small upright props on a genuinely transparent background. Inventory exactly: 6 shrubs of varied sizes; 4 cypresses; 3 olive trees; 4 boulders or rock clusters; 4 wildflower clumps; 2 tufts of tall grass; 1 small stump. No other objects.
Arrange in four generously spaced rows of six, read left to right: row 1 six shrubs; row 2 four cypresses then two olive trees; row 3 one olive tree then four boulders/rock clusters then one wildflower clump; row 4 three wildflower clumps then two tall-grass tufts then one stump. Each item is a single separate sprite; no touching or overlap; leave generous transparent gutters and margins. No labels, numbers, grid or text.
Use a consistent straight-on 2:1 isometric view for all upright props, orthographic with ground axes at 26.565 degrees to horizontal. Match the reference's warm upper-left light, muted olive greens, golden highlights, cool blue-grey shaded forms, and detailed hand-painted finish. Clear dimensional brushwork, never photorealistic or plastic. Every prop must retain a crisp readable silhouette at 25% of original size. No ground tiles, soil islands, scenery, bases or ground beneath props, apart from a tiny contact shadow at each base. Preserve true alpha transparency around every prop.
```

### 2. grass-meadow.png

```text
Use case: stylized-concept
Asset type: square painted grass ground material, one image.
Input image 1 is the SOLE reference, council-hall-A.png, for LIGHT, PALETTE AND PAINTED FINISH ONLY. NEVER COPY ITS SHAPE, building, terrain layout, hexes, platforms or composition.
Create a square, edge-to-edge, opaque, top-down-projected patch of continuous ground, for later mapping onto terrain. Flat material only: NO OBJECTS STANDING ON IT. No trees, shrubs, upright flowers, tufts, boulders, stumps, buildings, paths, platforms, sides, bevels, horizon, perspective scene or isolated island. Fine surface texture is painted into the ground. Match the reference's warm upper-left illumination, muted olive greens, golden touches, cool shaded greens and richly varied hand-painted finish. Avoid flat featureless colour, photorealism and plastic rendering.
BORDER REQUIREMENT: the outer 10% on ALL FOUR SIDES must remain the SAME plain mid-green turf, target base colour #737D46, with only very fine low-contrast painted grass grain. No flowers, stones, bare soil, dark hollows, highlights or distinct markings in this outer tenth. No edge shading or vignette. Every edge must match every other material in this family so any two can join. Blend the interior naturally into this plain border without a visible frame. Do not depict the border as an outline. Square canvas, ground fills every pixel; no transparency, text or watermark.
Interior material: Meadow with fine wildflowers: varied small painted grass strokes and tiny scattered wildflower flecks embedded flush in the sward, concentrated within the inner 80%; no standing flower objects.
```

### 3. grass-stony-turf.png

```text
Use case: stylized-concept
Asset type: square painted grass ground material, one image.
Input image 1 is the SOLE reference, council-hall-A.png, for LIGHT, PALETTE AND PAINTED FINISH ONLY. NEVER COPY ITS SHAPE, building, terrain layout, hexes, platforms or composition.
Create a square, edge-to-edge, opaque, top-down-projected patch of continuous ground, for later mapping onto terrain. Flat material only: NO OBJECTS STANDING ON IT. No trees, shrubs, upright flowers, tufts, boulders, stumps, buildings, paths, platforms, sides, bevels, horizon, perspective scene or isolated island. Fine surface texture is painted into the ground. Match the reference's warm upper-left illumination, muted olive greens, golden touches, cool shaded greens and richly varied hand-painted finish. Avoid flat featureless colour, photorealism and plastic rendering.
BORDER REQUIREMENT: the outer 10% on ALL FOUR SIDES must remain the SAME plain mid-green turf, target base colour #737D46, with only very fine low-contrast painted grass grain. No flowers, stones, bare soil, dark hollows, highlights or distinct markings in this outer tenth. No edge shading or vignette. Every edge must match every other material in this family so any two can join. Blend the interior naturally into this plain border without a visible frame. Do not depict the border as an outline. Square canvas, ground fills every pixel; no transparency, text or watermark.
Interior material: Short turf with small embedded stones: close-cropped grass with sparse small flush grey-beige stone chips embedded within the inner 80%; no boulders or standing stones.
```

### 4. grass-worn.png

```text
Use case: stylized-concept
Asset type: square painted grass ground material, one image.
Input image 1 is the SOLE reference, council-hall-A.png, for LIGHT, PALETTE AND PAINTED FINISH ONLY. NEVER COPY ITS SHAPE, building, terrain layout, hexes, platforms or composition.
Create a square, edge-to-edge, opaque, top-down-projected patch of continuous ground, for later mapping onto terrain. Flat material only: NO OBJECTS STANDING ON IT. No trees, shrubs, upright flowers, tufts, boulders, stumps, buildings, paths, platforms, sides, bevels, horizon, perspective scene or isolated island. Fine surface texture is painted into the ground. Match the reference's warm upper-left illumination, muted olive greens, golden touches, cool shaded greens and richly varied hand-painted finish. Avoid flat featureless colour, photorealism and plastic rendering.
BORDER REQUIREMENT: the outer 10% on ALL FOUR SIDES must remain the SAME plain mid-green turf, target base colour #737D46, with only very fine low-contrast painted grass grain. No flowers, stones, bare soil, dark hollows, highlights or distinct markings in this outer tenth. No edge shading or vignette. Every edge must match every other material in this family so any two can join. Blend the interior naturally into this plain border without a visible frame. Do not depict the border as an outline. Square canvas, ground fills every pixel; no transparency, text or watermark.
Interior material: Worn ground with a bare patch: an irregular softly integrated exposed earth patch within the inner 80%, warm muted brown soil and worn grass transitions; no path or hard outline.
```

### 5. grass-lush-hollows.png

```text
Use case: stylized-concept
Asset type: square painted grass ground material, one image.
Input image 1 is the SOLE reference, council-hall-A.png, for LIGHT, PALETTE AND PAINTED FINISH ONLY. NEVER COPY ITS SHAPE, building, terrain layout, hexes, platforms or composition.
Create a square, edge-to-edge, opaque, top-down-projected patch of continuous ground, for later mapping onto terrain. Flat material only: NO OBJECTS STANDING ON IT. No trees, shrubs, upright flowers, tufts, boulders, stumps, buildings, paths, platforms, sides, bevels, horizon, perspective scene or isolated island. Fine surface texture is painted into the ground. Match the reference's warm upper-left illumination, muted olive greens, golden touches, cool shaded greens and richly varied hand-painted finish. Avoid flat featureless colour, photorealism and plastic rendering.
BORDER REQUIREMENT: the outer 10% on ALL FOUR SIDES must remain the SAME plain mid-green turf, target base colour #737D46, with only very fine low-contrast painted grass grain. No flowers, stones, bare soil, dark hollows, highlights or distinct markings in this outer tenth. No edge shading or vignette. Every edge must match every other material in this family so any two can join. Blend the interior naturally into this plain border without a visible frame. Do not depict the border as an outline. Square canvas, ground fills every pixel; no transparency, text or watermark.
Interior material: Lusher turf with darker hollows: rich softly varied green surface with irregular darker shallow hollows within the inner 80%, painted ground colour and texture only, no standing clumps or cast-object shadows.
```
