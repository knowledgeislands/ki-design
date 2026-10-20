# Island Map asset kit 1

Painted on 20 October 2026 (Europe/London) under the [Island Map asset-kit brief](../../../docs/briefs/island-map-asset-kit.md). Five selected assets are at the folder root; all seven earlier attempts are retained unaltered in `attempts/`. Twelve generations in total. No generated PNG was cropped, resized, recoloured, composited, retouched or re-encoded: each saved image is a byte-for-byte copy of its original tool output. The original tool outputs were also left in place.

Generation used the built-in image generation tool, one call per attempt. No CLI/API fallback was used. The only attached image on every call, including retries, was [council-hall.png](../2026-10-20-seamless-flowers/council-hall.png), explicitly restricted in every prompt to light, palette, painted finish and surface depth, never shape or composition. No other chat images or generated attempts were attached. Transparent-background mode was true for both props calls and false for every material call. Requested dimensions were supplied in the prompts; actual dimensions are measured below.

These are proposed source art, not a framework intake acceptance or a licensed release. Generated art remains unlicensed pending the repository's art-licensing decision. Only this folder is part of the delivery; no framework, terrain geometry, manifests or consuming code is changed.

## Verification and limitations

All four selected materials are square opaque RGB PNGs at 1254 × 1254, exceeding the 1024 × 1024 minimum. The selected props sheet is RGBA at exactly 1536 × 1024, with genuine transparent pixels. Visual inspection covers composition, subject, surface finish and separation. Props were additionally inspected composited over a plain grey background for QA only; that inspection image is not delivered or used for generation.

Materials were measured in linear sRGB relative luminance (Rec. 709 coefficients 0.2126, 0.7152, 0.0722 after sRGB decoding). Four grass-only reference samples, in reference pixel coordinates (left, top, right, bottom), were used as a repeatable comparison, rather than the whole reference containing sky, walls and a building:

- `(400, 110, 530, 170)`: mean luminance 0.3065.
- `(1170, 400, 1300, 450)`: mean luminance 0.1855.
- `(620, 750, 760, 820)`: mean luminance 0.1098.
- `(900, 740, 1000, 800)`: mean luminance 0.2388.

The unweighted mean of these four sample means is 0.2102; their range reflects the reference's light and shade. This sampling is a brightness proxy, not proof of identical perceived brightness on every part of the grass. The second-attempt correction prompt's approximate claim that sampled grass was around 0.16 was an over-simplification: the actual measurements above are authoritative. Final ground means are compared with the four-sample mean, not that prompt estimate.

Opposite-edge similarity below is the absolute difference between mean RGB values in opposite 32-pixel bands, in channel units from 0 to 255. It measures broad tonal balance only: it does not establish matching edge pixels or seamless tiling. No seamless guarantee is made. No numerical intake tolerance is specified by the brief, so no invented pass threshold is claimed. The framework's own intake check and visual review remain outstanding.

The isometric camera, approximate detail scale, lighting direction and world scale are judged visually, not certified by a camera model. Ground detail is relatively fine; the 8–12 grass-clump scale is approximate. Side courses and prop-scale limitations are explicitly recorded below.

## Selected assets

| File | Kind | Pixels | Transparent | Attempts |
| --- | --- | --- | --- | --- |
| [side-dressed-stone.png](side-dressed-stone.png) | side material | 1254 × 1254 | No | 2 |
| [ground-shallow-water.png](ground-shallow-water.png) | ground material | 1254 × 1254 | No | 2 |
| [ground-snow.png](ground-snow.png) | ground material | 1254 × 1254 | No | 3 |
| [ground-rock.png](ground-rock.png) | ground material | 1254 × 1254 | No | 3 |
| [props-coast.png](props-coast.png) | props sheet | 1536 × 1024 | Yes | 2 |

## Props in reading order

Both attempts have the same 24 semantic prop groups in four rows of six. A two-rock group in row 2, column 2 is one prop kind, despite its two rocks. The list below describes what is actually painted; it does not merely repeat the requested names.

### Row 1

1. Small green cattail/reed tuft with brown seed heads.
2. Broad green cattail/reed clump with brown seed heads.
3. Slender golden reed tuft with pale seed heads.
4. Dense golden reed clump with pale seed heads.
5. Green rush tuft with small brown seed heads.
6. Mixed green and golden reed/cattail clump.

### Row 2

1. Single rounded pale waterline rock, dark and encrusted at the lower edge.
2. Pair of rounded pale waterline rocks, dark and encrusted at their lower edges.
3. Low flat pale waterline rock, dark and encrusted at the lower edge.
4. Small square weathered wooden jetty on four short posts, with moss on the lower posts.
5. Wooden rowing boat with seats and two oars inside; no occupants or water patch.
6. Bleached forked driftwood log.

### Row 3

1. Short bleached forked driftwood branch.
2. Curved bleached driftwood log.
3. Low rounded green coastal shrub with small yellow flowers.
4. Low spreading green coastal shrub with small pale flowers.
5. Low spreading coastal shrub with snow caps.
6. Small dense coastal shrub with snow caps.

### Row 4

1. Small upright young pine with snow.
2. Small broad young pine with snow.
3. Small sparse young pine with snow.
4. Small strongly bent young pine with snow.
5. Small twin-trunk young pine with snow.
6. Small dense young pine with snow.

The requested equal-row layout is approximate: safe horizontal separation bands in the selected sheet are around y = 285, 540 and 750; columns follow approximately 256 px steps. Use actual alpha extents and bottom-centre contact points when cutting; do not assume every object fits an exact 256 × 256 cell. There are no ground patches under these props. The visual count is 24 semantic groups, not a claim of exactly 24 raw connected alpha components.

## Per-file generation record

Every prompt below is the complete exact text submitted for that attempt. Each attempt is a fresh generation from the sole council-hall style reference, not an edit of an earlier result. SHA-256 values identify the unaltered saved PNGs.

### attempts/side-dressed-stone-attempt-1.png

- Kind: side material.
- Attempt: 1 of 2 for `side-dressed-stone.png`; retained earlier attempt.
- Measured size: 1254 × 1254 pixels; mode `RGB`.
- Transparent background: no; alpha range 255–255; exactly transparent pixels 0.00%.
- Deviations and selection: First face-on material; about ten full courses plus partial edge courses rather than twelve. Strong local directional bevel highlights; opposite top/bottom tones differ.
- Original generated filename: `exec-a9f6554c-ebac-4917-9d68-985b541fc5d9.png`.
- SHA-256: `5be88b56d0d55002f53e4eeba453284b0b66c47d274d7ae536e88ef86bbe0c1d`.
- Mean relative luminance: 0.4154.
- Opposite 32 px edge-band mean RGB differences: left/right `[7.15, 4.75, 2.72]`; top/bottom `[29.66, 22.43, 25.51]`.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map side material, side-dressed-stone.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Match its tactile painted dressed-stone sides, not its island, building or layout.
Paint a square opaque 1024 × 1024 pixel tile of dressed pale warm limestone masonry, edge to edge. Straight-on face-on vertical surface, entirely without perspective; no top or ground visible. Approximately twelve horizontal courses across the height, with staggered joints and softly weathered cut stones. Match the side stones in the reference in material, colours and painterly surface depth. Fine cool mortar cracks and restrained occasional moss in joints. Even diffuse illumination across the entire square: the framework will light each wall face according to direction. No directional gradient or cast shadow. Uniform detail distribution and similar colour and detail at opposite edges for unobtrusive repeating. No focal feature, no frame, border, vignette, hex outline, plinth, island, buildings, standing objects, labels, text or watermark. Opaque square filled completely with masonry.
```

### side-dressed-stone.png

- Kind: side material.
- Attempt: 2 of 2 for `side-dressed-stone.png`; selected final.
- Measured size: 1254 × 1254 pixels; mode `RGB`.
- Transparent background: no; alpha range 255–255; exactly transparent pixels 0.00%.
- Deviations and selection: Selected. Face-on square, no top or ground. Approximately eleven courses rather than twelve; course spacing is close but not exact. Global lighting is fairly even, but local warm upper-left bevel highlights remain, so this is not a neutral albedo. Opposite edges are similar in mean colour, not pixel-seamless.
- Original generated filename: `exec-7609de8f-133a-46cf-be03-3240bad01715.png`.
- SHA-256: `7697aa6b5623662a65dc8f9fbdb00210f144ec64cf6b6cb6a9f9277dd3c2cd60`.
- Mean relative luminance: 0.4424.
- Opposite 32 px edge-band mean RGB differences: left/right `[2.4, 2.37, 3.98]`; top/bottom `[23.18, 24.33, 23.97]`.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map side material, side-dressed-stone.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Match its tactile painted dressed-stone sides, not its island, building or layout.
Paint a square opaque 1024 × 1024 pixel tile of dressed pale warm limestone masonry, edge to edge. Straight-on face-on vertical surface, entirely without perspective; no top or ground visible. Approximately twelve horizontal courses across the height, with staggered joints and softly weathered cut stones. Match the side stones in the reference in material, colours and painterly surface depth. Fine cool mortar cracks and restrained occasional moss in joints. Even diffuse illumination across the entire square: the framework will light each wall face according to direction. No directional gradient or cast shadow. Uniform detail distribution and similar colour and detail at opposite edges for unobtrusive repeating. No focal feature, no frame, border, vignette, hex outline, plinth, island, buildings, standing objects, labels, text or watermark. Opaque square filled completely with masonry.
Geometry and lighting correction: fit TWELVE COMPLETE horizontal stone courses evenly across the square height (each course about 1/12 of the height). Use fine mortar at the top and bottom boundaries so they repeat naturally. Soft neutral even lighting across EVERY stone, no hard upper-left highlights or dark lower-right bevel shading. This is a flat albedo-like side material; framework supplies face lighting. Balance the opposite edge bands to the same average colour.
```

### attempts/ground-shallow-water-attempt-1.png

- Kind: ground material.
- Attempt: 1 of 2 for `ground-shallow-water.png`; retained earlier attempt.
- Measured size: 1254 × 1254 pixels; mode `RGB`.
- Transparent background: no; alpha range 255–255; exactly transparent pixels 0.00%.
- Deviations and selection: Rejected for selection: bright golden caustics, strong left/right brightness difference and more brightness than the sampled reference grass mean.
- Original generated filename: `exec-efbd7558-a158-4197-85a0-aef3d29f2150.png`.
- SHA-256: `c5c9a3ce319730649498224b6d2cf39b9ed3189e21d97762e69f32f85535c014`.
- Mean relative luminance: 0.2851.
- Opposite 32 px edge-band mean RGB differences: left/right `[72.91, 39.54, 9.98]`; top/bottom `[14.72, 8.8, 0.27]`.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map ground material, ground-shallow-water.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Use its tactile painted surface depth and warm upper-left light with cool lower-right shadows, not its island, building or layout.
Paint a square opaque 1024 × 1024 pixel continuous patch of calm, clear, shallow water over pale rounded stones, edge to edge. Seen at the reference's 2:1 isometric viewing angle, as its grass is, but fill the whole square with the water surface; no horizon or shoreline. Muted clear blue-green water with pale stones visible beneath, fine gentle ripples and restrained soft caustics. Small evenly distributed details at approximately the scale of 8–12 reference grass clumps across the square; no single dominant stone or focal feature. Overall brightness no brighter than the reference's own grass: keep pale submerged stones subdued, highlights restrained and the whole material in a middle-value range. Warm upper-left lighting and cool lower-right shadow accents repeated locally, with no whole-image lighting gradient. Similar tone and detail at opposite edges for unobtrusive repeating. No standing objects, reeds, boat, land, frame, border, vignette, hex outline, island shape, plinth, text or watermark. Opaque square filled entirely with shallow-water material.
```

### ground-shallow-water.png

- Kind: ground material.
- Attempt: 2 of 2 for `ground-shallow-water.png`; selected final.
- Measured size: 1254 × 1254 pixels; mode `RGB`.
- Transparent background: no; alpha range 255–255; exactly transparent pixels 0.00%.
- Deviations and selection: Selected. Calm clear shallow water, visible submerged pale stones, no shore or standing objects. Some residual left/right colour difference and flowing ripple bands; not pixel-seamless. Detail is finer and denser than an unambiguous 8–12 clump cadence.
- Original generated filename: `exec-2639d451-f3ce-443b-982c-5cabf0a95573.png`.
- SHA-256: `b3fdb41ab9967f00ccd141905a91569e80ec5a4b2e5a9eb08ddfeb5ffa80f050`.
- Mean relative luminance: 0.1709.
- Opposite 32 px edge-band mean RGB differences: left/right `[12.61, 7.26, 2.21]`; top/bottom `[7.41, 2.12, 0.24]`.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map ground material, ground-shallow-water.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Use its tactile painted surface depth and warm upper-left light with cool lower-right shadows, not its island, building or layout.
Paint a square opaque 1024 × 1024 pixel continuous patch of calm, clear, shallow water over pale rounded stones, edge to edge. Seen at the reference's 2:1 isometric viewing angle, as its grass is, but fill the whole square with the water surface; no horizon or shoreline. Muted clear blue-green water with pale stones visible beneath, fine gentle ripples and restrained soft caustics. Small evenly distributed details at approximately the scale of 8–12 reference grass clumps across the square; no single dominant stone or focal feature. Overall brightness no brighter than the reference's own grass: keep pale submerged stones subdued, highlights restrained and the whole material in a middle-value range. Warm upper-left lighting and cool lower-right shadow accents repeated locally, with no whole-image lighting gradient. Similar tone and detail at opposite edges for unobtrusive repeating. No standing objects, reeds, boat, land, frame, border, vignette, hex outline, island shape, plinth, text or watermark. Opaque square filled entirely with shallow-water material.
Technical correction for this fresh generation: use a UNIFORM MIDDLE-DARK VALUE across the entire image. Target average linear-sRGB relative luminance about 0.16, and subdued highlights; the style reference's sampled grass is around that value. No overall sunbeam, spotlight, bright left side or darker right side. Left and right edge bands must have essentially the SAME average RGB; top and bottom edge bands must also match each other. A repeating game ground texture, with small local warm/cool material accents distributed equally throughout. Keep the entire square free of any whole-image lighting gradient. Depict clear shallow water under subdued light with pale stones submerged, gentle muted ripples and only very faint caustics, no bright golden web of caustics.
```

### attempts/ground-snow-attempt-1.png

- Kind: ground material.
- Attempt: 1 of 3 for `ground-snow.png`; retained earlier attempt.
- Measured size: 1254 × 1254 pixels; mode `RGB`.
- Transparent background: no; alpha range 255–255; exactly transparent pixels 0.00%.
- Deviations and selection: Rejected for selection: materially brighter than sampled grass, with a broad left/right tonal difference.
- Original generated filename: `exec-40e4d31d-8f8d-4ea8-bdef-718d6d13a34b.png`.
- SHA-256: `cc3ded5e7286ef643c730da553ba7f0ab5ce6690040a27926ee75488bd0f81db`.
- Mean relative luminance: 0.4628.
- Opposite 32 px edge-band mean RGB differences: left/right `[33.86, 21.81, 2.6]`; top/bottom `[8.0, 4.69, 1.54]`.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map ground material, ground-snow.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Use its tactile painted surface depth and warm upper-left light with cool lower-right shadows, not its island, building or layout.
Paint a square opaque 1024 × 1024 pixel continuous patch of level snow, edge to edge, seen at the reference's 2:1 isometric viewing angle as its grass is. Fine low snow undulations and a softly granular painted surface, cool blue-grey in shaded hollows and warm muted sunlit crests under upper-left light. No drifts rising as objects, hills, cliffs, footprints or tracks. Detail scale approximately 8–12 reference grass clumps across the square, spread evenly without a focal feature. Overall brightness NO BRIGHTER than the reference's own grass, despite being snow: use subdued middle-value blue-grey snow with restrained warm grey-cream highlights; no bright white expanses or glare. Keep local upper-left warm light and lower-right cool shadow accents, no whole-image gradient. Similar tone and detail at opposite edges for unobtrusive repeating. No standing objects, trees, rocks, water, frame, border, vignette, hex outline, island shape, plinth, text or watermark. Opaque square filled entirely with level snow material.
```

### attempts/ground-snow-attempt-2.png

- Kind: ground material.
- Attempt: 2 of 3 for `ground-snow.png`; retained earlier attempt.
- Measured size: 1254 × 1254 pixels; mode `RGB`.
- Transparent background: no; alpha range 255–255; exactly transparent pixels 0.00%.
- Deviations and selection: Rejected for selection: more even than attempt 1, but still brighter than the sampled grass mean and the requested correction target.
- Original generated filename: `exec-8c73ed9c-cb47-4c6c-86ca-0fbef6e547be.png`.
- SHA-256: `703e273269b40157f09f5002a44d620dc714de35e76680286bfd856cb32b96b8`.
- Mean relative luminance: 0.3068.
- Opposite 32 px edge-band mean RGB differences: left/right `[8.84, 6.16, 2.87]`; top/bottom `[8.15, 3.99, 1.79]`.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map ground material, ground-snow.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Use its tactile painted surface depth and warm upper-left light with cool lower-right shadows, not its island, building or layout.
Paint a square opaque 1024 × 1024 pixel continuous patch of level snow, edge to edge, seen at the reference's 2:1 isometric viewing angle as its grass is. Fine low snow undulations and a softly granular painted surface, cool blue-grey in shaded hollows and warm muted sunlit crests under upper-left light. No drifts rising as objects, hills, cliffs, footprints or tracks. Detail scale approximately 8–12 reference grass clumps across the square, spread evenly without a focal feature. Overall brightness NO BRIGHTER than the reference's own grass, despite being snow: use subdued middle-value blue-grey snow with restrained warm grey-cream highlights; no bright white expanses or glare. Keep local upper-left warm light and lower-right cool shadow accents, no whole-image gradient. Similar tone and detail at opposite edges for unobtrusive repeating. No standing objects, trees, rocks, water, frame, border, vignette, hex outline, island shape, plinth, text or watermark. Opaque square filled entirely with level snow material.
Technical correction for this fresh generation: use a UNIFORM MIDDLE-DARK VALUE across the entire image. Target average linear-sRGB relative luminance about 0.16, and subdued highlights; the style reference's sampled grass is around that value. No overall sunbeam, spotlight, bright left side or darker right side. Left and right edge bands must have essentially the SAME average RGB; top and bottom edge bands must also match each other. A repeating game ground texture, with small local warm/cool material accents distributed equally throughout. Keep the entire square free of any whole-image lighting gradient. Depict snow as muted slate-blue and warm grey in subdued light, never bright white.
```

### ground-snow.png

- Kind: ground material.
- Attempt: 3 of 3 for `ground-snow.png`; selected final.
- Measured size: 1254 × 1254 pixels; mode `RGB`.
- Transparent background: no; alpha range 255–255; exactly transparent pixels 0.00%.
- Deviations and selection: Selected. Muted cool shaded level snow with small warm crests, no objects or tracks. Fine granular detail is denser than an unambiguous 8–12 clump cadence. Low repeated ripples remain visible; not pixel-seamless.
- Original generated filename: `exec-8ddfcf8a-b795-4cee-b2ab-c7fc97ee812d.png`.
- SHA-256: `39f8a1dcf21197bbb3fc7da1406659166797ab345f7ca749b414e6a913412fb2`.
- Mean relative luminance: 0.2093.
- Opposite 32 px edge-band mean RGB differences: left/right `[17.12, 10.94, 2.98]`; top/bottom `[7.82, 5.66, 2.25]`.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map ground material, ground-snow.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Use its tactile painted surface depth and warm upper-left light with cool lower-right shadows, not its island, building or layout.
Paint a square opaque 1024 × 1024 pixel continuous patch of level snow, edge to edge, seen at the reference's 2:1 isometric viewing angle as its grass is. Fine low snow undulations and a softly granular painted surface, cool blue-grey in shaded hollows and warm muted sunlit crests under upper-left light. No drifts rising as objects, hills, cliffs, footprints or tracks. Detail scale approximately 8–12 reference grass clumps across the square, spread evenly without a focal feature. Overall brightness NO BRIGHTER than the reference's own grass, despite being snow: use subdued middle-value blue-grey snow with restrained warm grey-cream highlights; no bright white expanses or glare. Keep local upper-left warm light and lower-right cool shadow accents, no whole-image gradient. Similar tone and detail at opposite edges for unobtrusive repeating. No standing objects, trees, rocks, water, frame, border, vignette, hex outline, island shape, plinth, text or watermark. Opaque square filled entirely with level snow material.
Value correction is the priority: this is snow in subdued SHADE, with only tiny warm crests. Use a DARK SLATE-BLUE GREY midtone base, approximate sRGB (85,100,120). Most pixels between sRGB 75 and 125; occasional small warm grey-cream crests at about (135,130,115). No whites or bright pale greys. Overall average linear-sRGB luminance must be less than 0.20, preferably about 0.15, because this must not outshine the grass. Preserve snow's granular, level softly undulating texture. Keep lighting uniform across the square; the same average colour at left/right and top/bottom edges; no broad gradient. Warm upper-left light remains a small local accent on crests only.
```

### attempts/ground-rock-attempt-1.png

- Kind: ground material.
- Attempt: 1 of 3 for `ground-rock.png`; retained earlier attempt.
- Measured size: 1254 × 1254 pixels; mode `RGB`.
- Transparent background: no; alpha range 255–255; exactly transparent pixels 0.00%.
- Deviations and selection: Rejected for selection: materially brighter than sampled grass, with strong overall left/right and top/bottom lighting differences.
- Original generated filename: `exec-11815873-9d08-47b0-ae38-16e5c740c530.png`.
- SHA-256: `bdba944e41804dcad759f84cdc692ab6b93d09e39c57c86628e15c22115340a2`.
- Mean relative luminance: 0.4279.
- Opposite 32 px edge-band mean RGB differences: left/right `[56.48, 43.27, 7.62]`; top/bottom `[36.17, 27.74, 2.81]`.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map ground material, ground-rock.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Use its tactile painted surface depth and warm upper-left light with cool lower-right shadows, not its island, building or layout.
Paint a square opaque 1024 × 1024 pixel continuous patch of weathered pale limestone ground with a little moss in cracks, edge to edge. Seen at the reference's 2:1 isometric viewing angle as its grass is: a level natural limestone surface with modest surface relief, softly worn irregular fissures and small restrained moss traces. Not masonry, cobbles or a wall; no loose standing boulders. Detail scale approximately 8–12 reference grass clumps across the square, spread evenly without any focal feature. Overall brightness no brighter than the reference's own grass: pale limestone rendered in subdued middle-value warm grey and cool shaded grey, restrained highlights. Warm upper-left light and cool lower-right shadow accents only locally; no whole-image gradient. Similar tone and detail at opposite edges for unobtrusive repeating. No standing objects, plants outside tiny moss in cracks, frame, border, vignette, hex outline, island shape, cliff, plinth, text or watermark. Opaque square filled entirely with rock ground material.
```

### attempts/ground-rock-attempt-2.png

- Kind: ground material.
- Attempt: 2 of 3 for `ground-rock.png`; retained earlier attempt.
- Measured size: 1254 × 1254 pixels; mode `RGB`.
- Transparent background: no; alpha range 255–255; exactly transparent pixels 0.00%.
- Deviations and selection: Rejected for selection: excellent opposite-edge mean-colour balance, but still brighter than sampled grass mean. Fracture islands can read as irregular laid slabs.
- Original generated filename: `exec-66c48ef3-b9d9-4867-8729-d1f2f24492da.png`.
- SHA-256: `d38ce9b21faf5453d96f9969615292f02114cfd8e5ef02d0fb013f95af706baa`.
- Mean relative luminance: 0.2602.
- Opposite 32 px edge-band mean RGB differences: left/right `[1.09, 1.47, 1.71]`; top/bottom `[1.81, 0.58, 2.83]`.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map ground material, ground-rock.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Use its tactile painted surface depth and warm upper-left light with cool lower-right shadows, not its island, building or layout.
Paint a square opaque 1024 × 1024 pixel continuous patch of weathered pale limestone ground with a little moss in cracks, edge to edge. Seen at the reference's 2:1 isometric viewing angle as its grass is: a level natural limestone surface with modest surface relief, softly worn irregular fissures and small restrained moss traces. Not masonry, cobbles or a wall; no loose standing boulders. Detail scale approximately 8–12 reference grass clumps across the square, spread evenly without any focal feature. Overall brightness no brighter than the reference's own grass: pale limestone rendered in subdued middle-value warm grey and cool shaded grey, restrained highlights. Warm upper-left light and cool lower-right shadow accents only locally; no whole-image gradient. Similar tone and detail at opposite edges for unobtrusive repeating. No standing objects, plants outside tiny moss in cracks, frame, border, vignette, hex outline, island shape, cliff, plinth, text or watermark. Opaque square filled entirely with rock ground material.
Technical correction for this fresh generation: use a UNIFORM MIDDLE-DARK VALUE across the entire image. Target average linear-sRGB relative luminance about 0.16, and subdued highlights; the style reference's sampled grass is around that value. No overall sunbeam, spotlight, bright left side or darker right side. Left and right edge bands must have essentially the SAME average RGB; top and bottom edge bands must also match each other. A repeating game ground texture, with small local warm/cool material accents distributed equally throughout. Keep the entire square free of any whole-image lighting gradient. Depict pale limestone under subdued light as middle-grey warm/cool stone, never pale bright cream.
```

### ground-rock.png

- Kind: ground material.
- Attempt: 3 of 3 for `ground-rock.png`; selected final.
- Measured size: 1254 × 1254 pixels; mode `RGB`.
- Transparent background: no; alpha range 255–255; exactly transparent pixels 0.00%.
- Deviations and selection: Selected. Weathered muted limestone with restrained moss in cracks and no standing objects. Fracture islands may still read somewhat like irregular paving rather than continuous bedrock; not pixel-seamless. Fine texture is denser than an unambiguous 8–12 clump cadence.
- Original generated filename: `exec-c954fa3e-c1bc-488d-a1b1-f54cc560de02.png`.
- SHA-256: `7ba1983b1b321a87f090c707f6b92f1ec48f1e4417d27da78d261dd5fa3f9bc2`.
- Mean relative luminance: 0.2028.
- Opposite 32 px edge-band mean RGB differences: left/right `[23.1, 16.65, 5.79]`; top/bottom `[1.66, 0.84, 2.58]`.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map ground material, ground-rock.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Use its tactile painted surface depth and warm upper-left light with cool lower-right shadows, not its island, building or layout.
Paint a square opaque 1024 × 1024 pixel continuous patch of weathered pale limestone ground with a little moss in cracks, edge to edge. Seen at the reference's 2:1 isometric viewing angle as its grass is: a level natural limestone surface with modest surface relief, softly worn irregular fissures and small restrained moss traces. Not masonry, cobbles or a wall; no loose standing boulders. Detail scale approximately 8–12 reference grass clumps across the square, spread evenly without any focal feature. Overall brightness no brighter than the reference's own grass: pale limestone rendered in subdued middle-value warm grey and cool shaded grey, restrained highlights. Warm upper-left light and cool lower-right shadow accents only locally; no whole-image gradient. Similar tone and detail at opposite edges for unobtrusive repeating. No standing objects, plants outside tiny moss in cracks, frame, border, vignette, hex outline, island shape, cliff, plinth, text or watermark. Opaque square filled entirely with rock ground material.
Value correction is the priority: pale limestone in subdued shade, rendered DARKER than a typical pale stone texture. Use warm and cool middle greys, approximate sRGB average (115,105,85), sparse muted highlights near (145,135,110). Target average linear-sRGB luminance below 0.20, preferably 0.15. Do not brighten the entire patch to express paleness. Match edge-band colours across opposite edges; uniform lighting across the image, with warm upper-left accents only locally. Natural fractured limestone, not laid paving.
```

### attempts/props-coast-attempt-1.png

- Kind: props sheet.
- Attempt: 1 of 2 for `props-coast.png`; retained earlier attempt.
- Measured size: 1536 × 1024 pixels; mode `RGBA`.
- Transparent background: yes; alpha range 0–254; exactly transparent pixels 50.87%.
- Deviations and selection: Not selected. Real alpha transparency was present; the initial generated preview misleadingly showed the hidden RGB backdrop. Retry was initiated before the alpha measurement corrected that visual assessment. Twenty-four semantic prop groups in four rows of six; two rocks comprise one grouped prop. Similar scale and flora deviations to the selected attempt.
- Original generated filename: `exec-b5e5f05f-c390-4a14-8aa1-ecb14a534efc.png`.
- SHA-256: `85fe748d24188d7879c5e27cede98d7af82cdea87816c27233b184638a27a013`.
- Prop inventory: the four reading-order rows above apply to this file.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map props sheet, props-coast.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Match its tactile painted finish, detailed surface depth, muted natural palette, warm upper-left light and cool shadows falling lower right. Do not copy its island, building or composition.
Create exactly 24 isolated coastal and snowy-coastal props on a GENUINELY TRANSPARENT background, a 1536 × 1024 pixel landscape PNG, in exactly FOUR ROWS OF SIX. No text or labels. Six equal columns and four equal rows; keep every prop wholly inside its cell with wide clear transparent gutters so that none touch. Each prop is viewed at a 2:1 isometric angle and stands on its contact point at its own bottom centre; only a tiny contact shadow, no surrounding ground, terrain base, water patch or plinth. Keep consistent world scale across the sheet, benchmark a full-grown cypress at about 300 pixels tall; snowy pines here are young, smaller pines so they fit comfortably within a 256-pixel row. Keep reeds, rocks and shrubs naturally smaller than trees; do not enlarge small props to fill cells.
Reading order, left to right:
Row 1: small green reed tuft; broad green reed clump; slender golden reed tuft; dense golden reed clump; green rush tuft; mixed green and golden reeds.
Row 2: single rounded pale waterline rock with a dark wet lower edge; pair of small pale waterline rocks with dark wet lower edges; low flat pale waterline rock with wet lower edge; small weathered wooden jetty on short posts with no water or shore; empty wooden rowing boat with two oars inside and no water; bleached forked driftwood log.
Row 3: short bleached driftwood branch; curved driftwood log; low rounded coastal shrub; low spreading coastal shrub; low coastal shrub lightly capped with snow; small dense coastal shrub with snow.
Row 4: small upright young pine with snow; small broad young pine with snow; small sparse young pine with snow; small bent young pine with snow; small twin-trunk young pine with snow; small dense young pine with snow.
Exactly one separate grouped prop per cell, including rock pairs as one prop. No additional objects. Actual alpha transparency around all props, never a painted checkerboard, coloured backdrop or opaque sheet.
```

### props-coast.png

- Kind: props sheet.
- Attempt: 2 of 2 for `props-coast.png`; selected final.
- Measured size: 1536 × 1024 pixels; mode `RGBA`.
- Transparent background: yes; alpha range 0–253; exactly transparent pixels 56.57%.
- Deviations and selection: Selected. Real alpha transparency, twenty-four semantic prop groups in four rows of six, visually separated. Alpha has no fully opaque pixels (maximum 253/255), so objects are slightly translucent. Some shrubs have unrequested small flowers; rocks have extra encrusting vegetation. Reeds are oversized relative to boat and young pines, so consistent world scale is approximate rather than satisfied. No full-grown cypress is included to calibrate the 300 px benchmark; young pines were requested to fit the four-row canvas. Contact shadows are small. Contact points are bottom centres of individual props, not exact centres of equal grid cells. The bent pine is markedly leaning. There is no surrounding terrain or water.
- Original generated filename: `exec-c984c732-8d7c-4f4f-a84e-a9be1418391b.png`.
- SHA-256: `a0fdc1a89725c077f22469c39b8f66c994bb925d6443dc4be0a0f7bab79062b8`.
- Prop inventory: the four reading-order rows above apply to this file.

Exact prompt:

```text
Use case: stylized-concept.
Asset type: Island Map props sheet, props-coast.png.
The sole attached image is a STYLE REFERENCE for light, palette, painted finish and surface depth only, NEVER shape or composition. Match its tactile painted finish, detailed surface depth, muted natural palette, warm upper-left light and cool shadows falling lower right. Do not copy its island, building or composition.
Create exactly 24 isolated coastal and snowy-coastal props on a GENUINELY TRANSPARENT background, a 1536 × 1024 pixel landscape PNG, in exactly FOUR ROWS OF SIX. No text or labels. Six equal columns and four equal rows; keep every prop wholly inside its cell with wide clear transparent gutters so that none touch. Each prop is viewed at a 2:1 isometric angle and stands on its contact point at its own bottom centre; only a tiny contact shadow, no surrounding ground, terrain base, water patch or plinth. Keep consistent world scale across the sheet, benchmark a full-grown cypress at about 300 pixels tall; snowy pines here are young, smaller pines so they fit comfortably within a 256-pixel row. Keep reeds, rocks and shrubs naturally smaller than trees; do not enlarge small props to fill cells.
Reading order, left to right:
Row 1: small green reed tuft; broad green reed clump; slender golden reed tuft; dense golden reed clump; green rush tuft; mixed green and golden reeds.
Row 2: single rounded pale waterline rock with a dark wet lower edge; pair of small pale waterline rocks with dark wet lower edges; low flat pale waterline rock with wet lower edge; small weathered wooden jetty on short posts with no water or shore; empty wooden rowing boat with two oars inside and no water; bleached forked driftwood log.
Row 3: short bleached driftwood branch; curved driftwood log; low rounded coastal shrub; low spreading coastal shrub; low coastal shrub lightly capped with snow; small dense coastal shrub with snow.
Row 4: small upright young pine with snow; small broad young pine with snow; small sparse young pine with snow; small bent young pine with snow; small twin-trunk young pine with snow; small dense young pine with snow.
Exactly one separate grouped prop per cell, including rock pairs as one prop. No additional objects. Actual alpha transparency around all props, never a painted checkerboard, coloured backdrop or opaque sheet.
CRITICAL OUTPUT REQUIREMENT: The entire background must be empty alpha=0 transparency. Disregard the attached reference's background completely. Do not paint any backdrop, glow, atmospheric haze, colour, gradient or broad shadow between the 24 props. Render each object as a cutout sprite on empty transparent canvas, with tiny contact shadows only. Keep the same specified 4 by 6 layout and all 24 requested subjects. Output exactly 1536 × 1024.
```
