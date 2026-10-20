# Island Map asset kit

What the image generator paints for the Island Map, and what the framework does with it. **Proposed**, 20 October 2026. The division of labour is Kit's: ChatGPT does the rendering, and Claude builds the framework. Each painted asset is one of a few fixed kinds. The framework handles the rest: geometry, joins, relief light, cliffs, placement and scale. The Territory Map is not affected.

The working framework is the [dressed terrain pilot](../../+/art/2026-10-20-painted-terrain-pilot-dressed/NOTES.md). The geometry it follows is in [hex terrain composition](../spec/hex-terrain-composition.md), and the surface style in [the Ancient brief](tile-set-ancient.md).

## The split

| The framework does | The painter does |
| --- | --- |
| Hex geometry, corner heights, slopes and steps | Ground materials |
| Seamless joins between independent hexes | Side materials for cliffs and steps |
| Light-catching relief and contact shadows | Props, on sheets |
| Turf lips and the shadow under them | Buildings, one per image |
| Cutting sheets into props, scaling, placement and draw order | Style references, which are never consumed directly |
| Brightness matching between materials | |

So the painter never draws hex outlines, seams, plinths under ground materials, or a whole island to be cut up. Each asset is one kind of thing, painted so that it can repeat or be placed anywhere.

## The style reference

Attach [`+/art/2026-10-20-seamless-flowers/council-hall.png`](../../+/art/2026-10-20-seamless-flowers/council-hall.png) to every generation. Its role, stated in every prompt: light, palette, painted finish and surface depth only, never shape or composition. The warm light comes from the upper left; shadows fall cool to the lower right; the surfaces have tactile, painted depth.

## Asset kinds

### Ground material

- **What:** a square, opaque patch of one kind of ground, painted edge to edge. No frame, border, vignette, hex or island shape, and no standing objects.
- **View:** seen from the isometric angle of the reference, as its grass is.
- **Scale:** about 8 to 12 grass clumps across the square. The framework repeats it twice per hex.
- **Repetition:** detail spread evenly, with no single focal feature, so that repeats don't show. Opposite edges should be similar in tone.
- **Brightness:** no brighter than the reference's own grass.
- **Size:** at least 1024 × 1024. Name `ground-<id>.png`.

### Patch material

The same as ground, but it may carry larger features: bare earth, stone chips, flower drifts, darker hollows. The framework places it as soft irregular patches within the lead ground, never as a whole hex. Name `patch-<id>.png`.

### Side material

- **What:** a square, opaque, face-on vertical surface for cliff and step faces: dressed-stone courses, or natural strata.
- **View:** straight on, with no perspective and no top or ground visible.
- **Scale:** horizontal courses, each about a twelfth of the square's height.
- **Light:** even. The framework lights each face from its direction.
- **Size:** at least 1024 × 1024. Name `side-<id>.png`.

### Props sheet

- **What:** about 24 separate upright props on a genuinely transparent background, in four rows of six, spaced well apart so that none touch.
- **View and light:** the reference's 2:1 isometric view and upper-left light. Each prop stands on its contact point, at its bottom centre. Only a tiny contact shadow; no ground around it.
- **Scale:** consistent across the sheet, with a full-grown cypress about 300 px tall.
- **Record:** the kind of each prop, row by row, in reading order, in NOTES.md. The framework matches props to kinds in that order.
- **Size:** 1536 × 1024. Name `props-<id>.png`.

### Building

- **What:** one building per image on a transparent background, standing on a small paved base that ends at its footprint. No surrounding ground, planting or plinth.
- **Record:** its footprint in hexes (one, a pair, or the seven-hex flower) and the contact point, the centre of its base.
- **Size:** 1024 × 1024 for one hex, 1536 × 1024 for larger footprints. Name `building-<id>.png`.

### Style reference

A whole flower or scene, painted to show the target look, such as the seamless flowers. It is judged by eye and never cut up. Name `reference-<id>.png`.

## Delivery

- Save every image unaltered to `+/art/<date>-<kit-name>/`, with a NOTES.md recording, for each file: its kind, the exact prompt, the measured pixel size, whether the background is transparent, the number of attempts and the deviations. For a props sheet, also list the props row by row.
- Commit only that folder and push to main.
- The framework checks each kit on intake: kind, size, transparency, the number of separate props on a sheet against NOTES, and the similarity of opposite edges on materials.

## What the framework still needs

Painted art for: a dressed-stone side material, to match the reference; water, as a ground material and as river pieces; snow and rock ground; more building types; and props for those biomes.
