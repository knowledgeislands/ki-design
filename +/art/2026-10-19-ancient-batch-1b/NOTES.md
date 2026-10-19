# Ancient tiles, batch 1b

This art is unlicensed until KI-DESIGN-ART-002 is decided. These are candidates for review, not the Ancient set.

- Date: 19 October 2026 (`date +%F`: `2026-10-19`).
- Tool: Codex app built-in `image_gen` tool. The image model is not exposed by the tool; no model identifier was supplied or inferred.
- References: every generation attached exactly `docs/briefs/references/arcadia-reference-small.jpg` (the small copy of `arcadia.png`) and the matching terrain or structure template. The full-size `arcadia.png` was never opened or attached.
- Geometry references: `docs/briefs/references/ancient-tile-template-terrain.png` for all four terrains and `docs/briefs/references/ancient-tile-template-structure.png` for both structures.
- Scope: six generations, thriving state, frame 0 only, one attempt per subject, no retries. Each returned PNG was copied byte-for-byte, without resizing, cropping, retouching, background removal or re-encoding.
- Review: observations below use only each generation's initial display. Saved images were not reopened for visual inspection. Dimensions were measured with `sips`; alpha metadata was measured without displaying the images.

## terrain-grassland.png

```text
A single square isometric game tile for the Knowledge Islands Realm, painted in the same style, light and palette as the attached reference painting of Arcadia: late calm dusk, the sun low to the upper left, cool soft shadows and a thin haze, deep navy sea, forest and moss greens, pale warm limestone and sandstone, muted roofs, restrained brass, small warm window lights, matte brush texture, no bloom. Painted exactly on the attached geometry template: the same straight-on 2:1 isometric camera, the same diamond top face and two-faced stratified rock plinth, the same size and position on the canvas, with every important feature inside the template's hexagon, on a transparent background. Do not paint the template's colours or lines. No text, no people in close-up, no creatures or animals of any kind, no crystals, no magic glow, no weapons, no walls, towers or battlements.

Subject: gentle grassland with wildflowers and a few stones.

Use the first attached image only as the style and light reference; the second is the geometry template. Match its straight-on 2:1 diamond, approximately 1000 px wide and 500 px deep, with left and right corners level, top and bottom corners vertically aligned, and two front rock faces at the template's depth. Keep important features inside the brass hexagon and the outer band plain; paint ground continuously to the diamond edges. Thriving state, frame 0 only. Fine outlines in darkened local colours, never black. Buildings must have crisp silhouettes at 25% scale. No lettering or numbers. Canvas: 1024 x 1024.
```

- Measured pixels: 1254 × 1254; the requested canvas was 1024 × 1024.
- Background: Yes: an alpha channel with fully transparent exterior pixels. The visible terrain has softened edge transparency; no flat-grey fallback was used.
- Attempts: 1.
- Deviations: The square diamond is recognisable, but the rock sides are taller and less regular than the template, and the top is uneven with a conspicuous rear hill. Trees, bushes and large rocks exceed the requested few stones and spill into the trim band. Strong yellow-gold highlights still read as golden-hour light rather than hazy dusk; shadows are cool but the overall contrast remains high.

## terrain-forest.png

```text
A single square isometric game tile for the Knowledge Islands Realm, painted in the same style, light and palette as the attached reference painting of Arcadia: late calm dusk, the sun low to the upper left, cool soft shadows and a thin haze, deep navy sea, forest and moss greens, pale warm limestone and sandstone, muted roofs, restrained brass, small warm window lights, matte brush texture, no bloom. Painted exactly on the attached geometry template: the same straight-on 2:1 isometric camera, the same diamond top face and two-faced stratified rock plinth, the same size and position on the canvas, with every important feature inside the template's hexagon, on a transparent background. Do not paint the template's colours or lines. No text, no people in close-up, no creatures or animals of any kind, no crystals, no magic glow, no weapons, no walls, towers or battlements.

Subject: dense temperate woodland of pines and oaks.

Use the first attached image only as the style and light reference; the second is the geometry template. Match its straight-on 2:1 diamond, approximately 1000 px wide and 500 px deep, with left and right corners level, top and bottom corners vertically aligned, and two front rock faces at the template's depth. Keep important features inside the brass hexagon and the outer band plain; paint ground continuously to the diamond edges. Thriving state, frame 0 only. Fine outlines in darkened local colours, never black. Buildings must have crisp silhouettes at 25% scale. No lettering or numbers. Canvas: 1024 x 1024.
```

- Measured pixels: 1254 × 1254; the requested canvas was 1024 × 1024.
- Background: Yes: an alpha channel with fully transparent exterior pixels. No flat-grey fallback was used.
- Attempts: 1.
- Deviations: The woodland includes both pines and broadleaf trees, but the top face becomes a hilly mound with rocky outcrops rather than the template's plane. Trees and rocks fill the trim band. The two front edges are approximately symmetric, although their broken cliff outline differs from the template's straight faces. Golden highlights and hard illuminated cliffs remain too bright and contrasty for thin-hazed late dusk.

## terrain-ocean.png

```text
A single square isometric game tile for the Knowledge Islands Realm, painted in the same style, light and palette as the attached reference painting of Arcadia: late calm dusk, the sun low to the upper left, cool soft shadows and a thin haze, deep navy sea, forest and moss greens, pale warm limestone and sandstone, muted roofs, restrained brass, small warm window lights, matte brush texture, no bloom. Painted exactly on the attached geometry template: the same straight-on 2:1 isometric camera, the same diamond top face and two-faced stratified rock plinth, the same size and position on the canvas, with every important feature inside the template's hexagon, on a transparent background. Do not paint the template's colours or lines. No text, no people in close-up, no creatures or animals of any kind, no crystals, no magic glow, no weapons, no walls, towers or battlements.

Subject: deep navy open sea with gentle swell and faint glints, the whole top face water.

Use the first attached image only as the style and light reference; the second is the geometry template. Match its straight-on 2:1 diamond, approximately 1000 px wide and 500 px deep, with left and right corners level, top and bottom corners vertically aligned, and two front rock faces at the template's depth. Keep important features inside the brass hexagon and the outer band plain; paint ground continuously to the diamond edges. Thriving state, frame 0 only. Fine outlines in darkened local colours, never black. Buildings must have crisp silhouettes at 25% scale. No lettering or numbers. Canvas: 1024 x 1024.
```

- Measured pixels: 1254 × 1254; the requested canvas was 1024 × 1024.
- Background: Yes: an alpha channel with fully transparent exterior pixels. No flat-grey fallback was used.
- Attempts: 1.
- Deviations: The whole top face is navy sea, and the level left and right corners and aligned rear/front points follow the template approximately. The top diamond appears deeper than 2:1, and its size and placement are not an exact template match. Swells have conspicuous whitecaps rather than only gentle swell; the broad gold reflection and bright left cliff remain too strong for restrained hazy dusk. Thin dark edge lines remain visible.

## terrain-snow.png

```text
A single square isometric game tile for the Knowledge Islands Realm, painted in the same style, light and palette as the attached reference painting of Arcadia: late calm dusk, the sun low to the upper left, cool soft shadows and a thin haze, deep navy sea, forest and moss greens, pale warm limestone and sandstone, muted roofs, restrained brass, small warm window lights, matte brush texture, no bloom. Painted exactly on the attached geometry template: the same straight-on 2:1 isometric camera, the same diamond top face and two-faced stratified rock plinth, the same size and position on the canvas, with every important feature inside the template's hexagon, on a transparent background. Do not paint the template's colours or lines. No text, no people in close-up, no creatures or animals of any kind, no crystals, no magic glow, no weapons, no walls, towers or battlements.

Subject: a deep snowfield with a few dark pines, blue-grey in the dusk shadow, warm only on the sun-facing slopes.

Use the first attached image only as the style and light reference; the second is the geometry template. Match its straight-on 2:1 diamond, approximately 1000 px wide and 500 px deep, with left and right corners level, top and bottom corners vertically aligned, and two front rock faces at the template's depth. Keep important features inside the brass hexagon and the outer band plain; paint ground continuously to the diamond edges. Thriving state, frame 0 only. Fine outlines in darkened local colours, never black. Buildings must have crisp silhouettes at 25% scale. No lettering or numbers. Canvas: 1024 x 1024.
```

- Measured pixels: 1254 × 1254; the requested canvas was 1024 × 1024.
- Background: Yes: an alpha channel with fully transparent exterior pixels. No flat-grey fallback was used.
- Attempts: 1.
- Deviations: The base remains approximately a symmetric diamond, but its surface rises into a rear rocky peak and several cliffs rather than a deep snowfield with only a few pines. Numerous pines and rocks occupy the trim band. Snow has blue-grey shadow, but broad bright peach-gold patches, crisp cliff lighting and high contrast still read as golden-hour daylight. The top plane and plinth placement do not exactly follow the template.

## structure-council-hall.png

```text
A single square isometric game tile for the Knowledge Islands Realm, painted in the same style, light and palette as the attached reference painting of Arcadia: late calm dusk, the sun low to the upper left, cool soft shadows and a thin haze, deep navy sea, forest and moss greens, pale warm limestone and sandstone, muted roofs, restrained brass, small warm window lights, matte brush texture, no bloom. Painted exactly on the attached geometry template: the same straight-on 2:1 isometric camera, the same diamond top face and two-faced stratified rock plinth, the same size and position on the canvas, with every important feature inside the template's hexagon, on a transparent background. Do not paint the template's colours or lines. No text, no people in close-up, no creatures or animals of any kind, no crystals, no magic glow, no weapons, no walls, towers or battlements.

Subject: the Council Hall, the place of governance. A long colonnaded civic hall with a low-pitched pediment roof and NO DOME of any kind, broad open steps and a small paved forecourt, pale limestone, warm lit windows between the columns. Civic, never a temple, never fortified.

Use the first attached image only as the style and light reference; the second is the geometry template. Match its straight-on 2:1 diamond, approximately 1000 px wide and 500 px deep, with left and right corners level, top and bottom corners vertically aligned, and two front rock faces at the template's depth. Keep important features inside the brass hexagon and the outer band plain; paint ground continuously to the diamond edges. Thriving state, frame 0 only. Fine outlines in darkened local colours, never black. Buildings must have crisp silhouettes at 25% scale. No lettering or numbers. Canvas: 1024 x 1536.
```

- Measured pixels: 1024 × 1536, matching the requested canvas.
- Background: Only partially: the PNG contains transparent exterior pixels, but the generation visibly includes a broad coloured halo around the tile, so the background is not a clean transparent cutout. It also does not meet the flat #d9d9d9 fallback.
- Attempts: 1.
- Deviations: The long colonnaded hall has no dome, broad steps and warm windows, but its grand sculpted pediment and axial colonnade still read as temple-like. An extra wing, garden boundary walls, many trees and surrounding sea were added. The diamond has unequal left/right slopes and a shifted rear/front axis, so the camera is rotated relative to the template; the plinth is a rugged shoreline rather than two straight faces. Bright gold illumination and a visible yellow/blue atmospheric halo conflict with the requested restrained dusk and clean transparent background. Gardens and water occupy the trim band.

## structure-causeway.png

```text
A single square isometric game tile for the Knowledge Islands Realm, painted in the same style, light and palette as the attached reference painting of Arcadia: late calm dusk, the sun low to the upper left, cool soft shadows and a thin haze, deep navy sea, forest and moss greens, pale warm limestone and sandstone, muted roofs, restrained brass, small warm window lights, matte brush texture, no bloom. Painted exactly on the attached geometry template: the same straight-on 2:1 isometric camera, the same diamond top face and two-faced stratified rock plinth, the same size and position on the canvas, with every important feature inside the template's hexagon, on a transparent background. Do not paint the template's colours or lines. No text, no people in close-up, no creatures or animals of any kind, no crystals, no magic glow, no weapons, no walls, towers or battlements.

Subject: the Causeway, the translation layer. A low, level stone way on three small culvert arches carrying a paved deck between low parapets across shallow water, a lamp at each landing, joining grass on either side. The water runs from the brass hexagon's upper-right edge to its lower-left edge under the way, and the way crosses it at right angles. Civic, never fortified, not a tall arched bridge.

Use the first attached image only as the style and light reference; the second is the geometry template. Match its straight-on 2:1 diamond, approximately 1000 px wide and 500 px deep, with left and right corners level, top and bottom corners vertically aligned, and two front rock faces at the template's depth. Keep important features inside the brass hexagon and the outer band plain; paint ground continuously to the diamond edges. Thriving state, frame 0 only. Fine outlines in darkened local colours, never black. Buildings must have crisp silhouettes at 25% scale. No lettering or numbers. Canvas: 1024 x 1536.
```

- Measured pixels: 1024 × 1536, matching the requested canvas.
- Background: Only partially: the PNG contains transparent exterior pixels, but the generation visibly includes a broad coloured halo around the tile, so the background is not a clean transparent cutout. It also does not meet the flat #d9d9d9 fallback.
- Attempts: 1.
- Deviations: The causeway has a level paved deck, three arches, low parapets and two landing lamps, and runs across a roughly perpendicular channel. The water runs approximately from the upper-right to lower-left hex edges as requested. The camera is much closer to the straight-on diamond than the hall, although the top depth and vertical placement remain approximate and the plinth is irregular. The arches are relatively tall over a deep, rocky, fast white-water channel instead of shallow water and small culverts. Shrubs and rocks occupy the trim band. Bright gold highlights, strong contrast and an extensive yellow/brown/blue halo fail the dusk and clean-background requirements.

## What did not work

The template did not impose exact geometry or placement. Terrain canvases were returned at 1254 × 1254 rather than 1024 × 1024, land surfaces grew into hills, and the trim bands were not kept plain. Lighting remains strongly golden and contrasty instead of later, softer, hazy dusk. The two structures include unwanted background halos. The Council Hall avoids a dome but remains temple-like; the Causeway has three arches but spans rough, deep-looking water rather than shallow water. These are retained as unaltered evidence for review, not approved tiles. No re-projection or incorporation into the Ancient set was performed.
