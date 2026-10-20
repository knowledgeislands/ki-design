# Pilot dressing 2 — 20 October 2026

Six experimental painted art candidates generated with the built-in image generation tool. This folder replaces the earlier dressing candidates for review; earlier assets and the pilot are unchanged. No production package, renderer or manifest was modified.

## Reference and method

The only attached image on every generation was `../2026-10-19-lighting-study/council-hall-A.png`, used for light, palette and painted finish only, never for its shape. The dressed pilot notes were read, especially “Review” and “What would improve it next”. No other images were opened; generated outputs were not opened or attached to subsequent calls.

Every PNG is copied byte for byte from the built-in output, with no resizing, cropping, recolouring, alpha editing or other postprocessing. Source and destination bytes were compared. Each asset had one generation attempt; six attempts total. PNG dimensions, channel metadata and alpha extrema were measured without displaying the images.

## Measurements

| File | Pixels | Transparent background | Attempts |
| --- | --- | --- | --- |
| `ground-flowering-meadow.png` | 1254 × 1254 | No; fully opaque | 1 |
| `ground-short-stony-turf.png` | 1254 × 1254 | No; fully opaque | 1 |
| `ground-worn-bare-earth.png` | 1254 × 1254 | No; fully opaque | 1 |
| `ground-lush-dark-turf.png` | 1254 × 1254 | No; fully opaque | 1 |
| `props-sheet-2.png` | 1536 × 1024 | Yes; zero-alpha pixels present | 1 |
| `rock-face-stratified.png` | 1254 × 1254 | No; fully opaque | 1 |

Alpha was measured on the 0–65535 scale. An alpha channel alone was not treated as proof of transparency.

## Deviations and review limits

No visual inspection of generated images was performed, following the instruction to open no other images. The exact count and separation of props, perspective, absence of frames or standing objects, natural rock structure, colour match, relative grass brightness and map-scale distinction therefore remain unverified. No visual compliance is claimed. Dimensions and alpha observations above are measured facts; all other requirements remain candidates for owner review. There are no measured dimension or background-alpha deviations: all five materials are square and fully opaque, and the props sheet contains transparent pixels.

## Exact prompts

The following text is the exact prompt argument sent on each call. Every call attached only Council Hall A by its local path. The four ground calls and rock call requested `transparent_background=false`; the props call requested `transparent_background=true`.

### ground-flowering-meadow.png

```text
Use case: stylized-concept.
Asset type: painted terrain material for an isometric island map.
Input image: Council Hall A is the ONLY reference, for lighting, palette and painted finish only. Do not copy its composition, building, island or hexagonal shapes.
Produce one square, opaque, top-down-projected continuous ground material, painted edge to edge. Fill every pixel with ground. No frame, border band, margin, vignette, tile outline, hexagon, raised slab, standing objects, trees, shrubs, walls or text. The square is a material swatch, not a scene or isolated island. Match the reference's softly painted fine texture and warm light from upper left with cool muted shadows; grass must be deeper and less yellow than the prior golden lawn and no brighter than the reference's own grass. Use muted olive and cool deep greens, restrained highlights, no luminous lime or golden wash. Broad irregular natural variation must read clearly at map scale. 
Subject: flowering meadow, with low ground-hugging vegetation and plentiful small muted cream, dusky mauve and muted pink flower flecks spread in distinct broad meandering flowering patches over deep green grass. Flowers are flat texture marks within the surface, never standing clumps. The flowering pattern should distinguish this material immediately from stony turf, bare worn ground and lush dark turf.
```

Measured channels: `1254 1254 srgb  3.0`. Alpha minimum, maximum and mean: `65535 65535 65535`. SHA-256: `169d4fa0f60889533b6dc5e5e539e1521f3558afeedb2d0d73b201d605b0b72c`.

### ground-short-stony-turf.png

```text
Use case: stylized-concept.
Asset type: painted terrain material for an isometric island map.
Input image: Council Hall A is the ONLY reference, for lighting, palette and painted finish only. Do not copy its composition, building, island or hexagonal shapes.
Produce one square, opaque, top-down-projected continuous ground material, painted edge to edge. Fill every pixel with ground. No frame, border band, margin, vignette, tile outline, hexagon, raised slab, standing objects, trees, shrubs, walls or text. The square is a material swatch, not a scene or isolated island. Match the reference's softly painted fine texture and warm light from upper left with cool muted shadows; grass must be deeper and less yellow than the prior golden lawn and no brighter than the reference's own grass. Use muted olive and cool deep greens, restrained highlights, no luminous lime or golden wash. Broad irregular natural variation must read clearly at map scale. 
Subject: short stony turf, close-cropped muted olive-green grass threaded with broad irregular patches of small flat cool grey limestone chips and weathered stones flush with the surface. The stone mottling should be clearly visible at map scale. No large boulders or protruding outcrops. Distinguish this material immediately from flowering meadow, broad bare-earth wear and lush dark turf.
```

Measured channels: `1254 1254 srgb  3.0`. Alpha minimum, maximum and mean: `65535 65535 65535`. SHA-256: `1b10301e8d945756d6287b73682b298942b97c7e15a0b1f8e965ed595dfadf49`.

### ground-worn-bare-earth.png

```text
Use case: stylized-concept.
Asset type: painted terrain material for an isometric island map.
Input image: Council Hall A is the ONLY reference, for lighting, palette and painted finish only. Do not copy its composition, building, island or hexagonal shapes.
Produce one square, opaque, top-down-projected continuous ground material, painted edge to edge. Fill every pixel with ground. No frame, border band, margin, vignette, tile outline, hexagon, raised slab, standing objects, trees, shrubs, walls or text. The square is a material swatch, not a scene or isolated island. Match the reference's softly painted fine texture and warm light from upper left with cool muted shadows; grass must be deeper and less yellow than the prior golden lawn and no brighter than the reference's own grass. Use muted olive and cool deep greens, restrained highlights, no luminous lime or golden wash. Broad irregular natural variation must read clearly at map scale. 
Subject: worn ground, substantial connected irregular patches of muted umber and grey-brown bare earth occupying roughly half the swatch, with sparse worn deep olive grass at their ragged edges, subtle scuffs and a few flat embedded grit marks. Natural diffuse wear, not a designed path or road. The broad earth pattern should distinguish this material immediately from flowering meadow, stony turf and lush dark turf.
```

Measured channels: `1254 1254 srgb  3.0`. Alpha minimum, maximum and mean: `65535 65535 65535`. SHA-256: `3bcfe84e4307358ee30cb8b18ef2ed51cc7b42b40e93b73b7035ccbd4dc5baa6`.

### ground-lush-dark-turf.png

```text
Use case: stylized-concept.
Asset type: painted terrain material for an isometric island map.
Input image: Council Hall A is the ONLY reference, for lighting, palette and painted finish only. Do not copy its composition, building, island or hexagonal shapes.
Produce one square, opaque, top-down-projected continuous ground material, painted edge to edge. Fill every pixel with ground. No frame, border band, margin, vignette, tile outline, hexagon, raised slab, standing objects, trees, shrubs, walls or text. The square is a material swatch, not a scene or isolated island. Match the reference's softly painted fine texture and warm light from upper left with cool muted shadows; grass must be deeper and less yellow than the prior golden lawn and no brighter than the reference's own grass. Use muted olive and cool deep greens, restrained highlights, no luminous lime or golden wash. Broad irregular natural variation must read clearly at map scale. 
Subject: lush dark turf, dense deep cool olive and forest-green ground-hugging grass, with broad gently mottled darker hollows and restrained soft green highlights. The darkest, fullest green of the four ground variants; no flowers, stone patches or bare-earth clearings. Keep painted surface texture fine, with no upright grass clumps or objects.
```

Measured channels: `1254 1254 srgb  3.0`. Alpha minimum, maximum and mean: `65535 65535 65535`. SHA-256: `e2eeb43329783435056522d172fac6065b04c48740e57f5da4b2cfb87b760cd3`.

### props-sheet-2.png

```text
Use case: stylized-concept.
Asset type: second painted upright-prop sprite sheet for an isometric island map.
Input image: Council Hall A is the ONLY reference, for light, palette and painted finish only. Never copy its building, island shape, tile layout or composition.
Produce exactly 24 distinct separate props on a genuinely transparent background, spaced well apart in a roomy six-column by four-row arrangement with generous transparent gutters and outer margins. No labels, grid lines, ground sheet, checkerboard, frame or scenery connecting props. Preserve a coherent scale and the reference's straight-on 2:1 isometric view: equal left/right receding ground axes at approximately 26.565 degrees, upright verticals, no perspective convergence. Match warm upper-left light, cool deep shadow, muted olive foliage and grey natural stone, with the same detailed softly painted finish. Every prop and any small contact shadow must remain isolated and complete within its own space.
Row 1: six separate short hedgerow segments with varied natural outlines and lengths, three along each receding ground direction.
Row 2: six separate low dry-stone field wall pieces, all short straight pieces, varied lengths and end silhouettes, three along each receding ground direction; naturally loose irregular stones, no mortar.
Row 3: three different olive trees (broad low twisting crown, airy leaning crown, taller asymmetrical crown), then three different cypresses (slender upright, gently leaning, fuller irregular silhouette). Each tree separate with its own isolated base.
Row 4: one clump of reeds; one small pond with a reed edge, visible water surface in a 2:1 isometric footprint and a naturally irregular shoreline; two larger shrub groups with contrasting silhouettes; two small boulder groups with differing shapes.
Constraints: 24 separate complete cutouts total; nothing overlaps or touches another prop, no clipped tips, no buildings, no hexagonal bases. The small pond alone includes its own local water/shoreline footprint. Transparent background is required, not white or simulated transparency.
```

Measured channels: `1536 1024 srgba 4.0`. Alpha minimum, maximum and mean: `0 65278 20610`. SHA-256: `6652db4c9e424f8e0e3a0ef7bea82b8343f3732c3940173dd1b520112392ac5c`.

### rock-face-stratified.png

```text
Use case: stylized-concept.
Asset type: painted cliff-face material for an isometric island map.
Input image: Council Hall A is the ONLY reference, for light, palette and painted finish only. Never copy its building, island shape, hexagons or masonry-like cliff structure.
Produce one square opaque material swatch: an edge-to-edge patch of NATURAL STRATIFIED CLIFF ROCK seen face-on, filling every pixel. Weathered grey limestone with subtly warm grey ledges lit from upper left, cool grey shadowed recesses, strong irregular horizontal geological strata of uneven thickness, fine sedimentary laminations, occasional jagged cracks that terminate naturally, small chips and a little restrained dark olive moss in crevices. Layers should flow continuously across the square, broken organically by erosion, with no regular vertical segmentation. Match the reference's softly painted finish, natural material detail and restrained palette.
Constraints: no masonry joints, rectangular blocks, brickwork, stacked cut stones, regular grid or wall construction. No ground top surface, horizon, sky, isolated rock object, perspective slab, border band, frame, margin, labels or text. Paint continuous rock to all four edges.
```

Measured channels: `1254 1254 srgb  3.0`. Alpha minimum, maximum and mean: `65535 65535 65535`. SHA-256: `7620463f66354de9bda4c6c1fe861743b7611199da3c81909a7a14c01426ebb8`.
