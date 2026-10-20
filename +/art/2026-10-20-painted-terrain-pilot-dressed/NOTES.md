# Painted terrain pilot, dressed — 20 October 2026

This is an experimental review of the Island Map, not a production tile set. It extends the [first painted pilot](../2026-10-20-painted-terrain-pilot/NOTES.md), which stays unchanged, with the [dressing candidates](../2026-10-20-pilot-dressing/NOTES.md). Kit judged the first pilot "pretty boring as flat untextured grass". This version tests the fix: richer ground and upright props, with every hex still independent. No package, contract, manifest, renderer or Territory Map was changed.

Open `dressed-terrain-pilot.html` in a browser. It is self-contained, with every image embedded.

## What changed from the first pilot

- **Four real ground variants.** Each hex's boundary collar is the same base turf, the interior of the stony-turf material, so any two hexes join without a seam. Its interior is its own material: meadow, stony turf, worn ground or lush turf with hollows. Only the inner 76 % of each material is used, because each was painted inside a plain square frame. In the first pilot the four variants were offsets of one swatch.
- **Dressing.** 24 props cut from the props sheet: shrubs, cypresses, olive trees, rock outcrops, wildflowers, tall grass and a stump. Each ground variant carries its own planting: flowers and grass on meadow, rocks and shrubs on stony turf, a stump and grass on worn ground, olives and cypresses on lush turf. Props gather around a first anchor prop, as planting does.
- **Placement rules.**
  - Props are placed from a generator seeded by the hex's address, its variant and the scene seed. A hex therefore always carries the same dressing, whatever its neighbours.
  - Each prop stays inside its hex, clear of the boundary.
  - Each prop stands on the sloped ground: its height comes from `groundAt`, the mean-centre fan.
  - Props are never warped.
- **Draw order.** Row by row: every top surface and visible face in the row, then that row's props from back to front, then the Hall after row 1. A prop's crown may rise over the row behind; its base never crosses into the row in front.
- **The Hall's pad.** The centre hex stays clear. The six surrounding pad hexes plant only outside an ellipse around the building, which gives cypresses beside the Hall and an open forecourt.
- **Controls.** A new **Dressing** switch. **Rearrange ground and props** changes the variants and the seed together.

## Inputs and transformations

All inputs are read, never altered.

- `../2026-10-20-pilot-dressing/props-sheet.png`.
  - The 24 props are found as separate alpha regions, after a small dilation that keeps each rock cluster whole.
  - They are matched to the sheet's recorded row order.
  - The generator's alpha, which peaks at 254, is firmed: below 24 becomes 0, then a linear stretch.
  - Each prop is trimmed and scaled by kind. In world pixels per sheet pixel: shrub 0.30, cypress 0.36, olive 0.42, rock 0.34, flowers 0.27, tall grass 0.25, stump 0.25. The hex top face is 256 world pixels wide. Props are authored at twice that size for sharp display.
- `../2026-10-20-pilot-dressing/grass-*.png`: the inner 76 % of each, resized to 512 × 512.
- `../2026-10-20-painted-terrain-pilot/originals/hall.png` and `stone.png`: the first pilot's Hall and rock, processed as there.

`build.py` rebuilds the bundle and the page with Python, Pillow and Bun. `bun test ./+/art/2026-10-20-painted-terrain-pilot-dressed/terrain.test.js` runs 12 tests. They cover the first pilot's geometry checks, plus two new ones: ground height at the fan's corners, centre and edges; and deterministic dressing that stays inside the hex on sloped cells. Browser review covered the slopes, flat and crossing-profile scenes, the Hall on and off, and rearranging, with no runtime errors.

## Review

- **Better:** the island now reads as a place. There is grouped planting, there are rock outcrops and groves, and the props are in the Council Hall A finish. Joins stay seamless, and rearranging still moves nothing but variants and props.
- **Ground:** the four interiors differ, but subtly. All are golden and lighter than Council Hall A's own grass. The worn bare patch is the clearest; the others read as one lawn from a distance.
- **Props:** clean silhouettes. They work best grouped; singles look scattered. Only 24 sprites means repeats are visible across 19 hexes.
- **Still missing:** paths, low walls or hedges, water, a river, a waterfall, snow, and other materials. East and west steps still read as a texture offset. The rock faces still read partly as masonry.

## What would improve it next

1. Ground interiors without a square frame, deeper and less yellow, with stronger differences visible at map scale.
2. A second props sheet, for variety and larger groups: hedgerow segments, a field wall, more olive and cypress poses, reeds and a small pond.
3. A rock-face material that reads as natural stratified rock, not masonry.

## Round 2, 20 October 2026

The [second dressing set](../2026-10-20-pilot-dressing-2/NOTES.md) replaces the ground and rock, and adds a second props sheet. `build.py` now reads both sheets.

- **Ground.** Four new materials, painted edge to edge with no frame: flowering meadow, short stony turf, worn bare earth and lush dark turf. They are deeper, less yellow and clearly distinct at map scale. The inner 96 % is used. Short stony turf is the shared collar.
- **An irregular collar edge.** With such different interiors, a clean collar would draw every hex as a ring. The collar's inner edge now follows the base texture's own light and dark, between 6 and 40 px in from the boundary, so variants meet in painted, ragged patches. It depends only on each cell's local coordinates, so joins stay seamless and cells stay independent.
- **Rock.** The new face-on stratified rock replaces the reused masonry-like stone. Each face takes a strip of the material in the face's own proportions, offset per face, so the strata keep their natural thickness and do not repeat cell to cell.
- **Props.** 48 sprites in total. The second sheet adds hedgerow segments, dry-stone wall pieces, three olives, three cypresses (one a group), reeds, a pond, two shrub groups and two boulder groups. Walls and hedges are drawn at 0.5 world pixels per sheet pixel.
- **Plantings.** Each variant now has two or three alternative plantings, and each cell picks one from its own seed:
  - meadow: hedgerows or flower beds;
  - stony turf: walls or rocks;
  - worn ground: a stump or a wall;
  - lush turf: an olive grove, or a pond with reeds.
- **Ponds** need nearly level ground (a corner range of one unit at most). They are drawn flat, before the row's upright props.
- **Fixed:** rock faces on cells at negative coordinates took their strip offset from a negative remainder, and left an unpainted slit.

The 12 tests pass, and the browser review showed no runtime errors. `review-relief.webp` and `review-seed-1.webp` show the slopes scene before and after one rearrangement. The page is about 1.5 MB.

### Review

- The island now reads as a cultivated Mediterranean upland. Walls, ponds, groves and worn earth give it structure, and the ragged collar hides the hex boundaries.
- The rock faces read as natural strata. They are a little pale against the ground's darker greens.
- Walls and hedges are placed freely, not along field lines, so they look scattered rather than enclosing anything. A next step would align them to hex edges, to suggest field boundaries.
- With the Hall standing, the pad's clearing still makes the centre plainer than Council Hall A's dense surroundings.

## Round 3, 20 October 2026: depth on the surface and sides

Kit compared the pilot with the ChatGPT flowers. The props were no longer the problem; the tile body was. The flowers' surfaces and sides have dimension, and the pilot's ground read as a flat print. Kit confirmed that ordinary joins stay seamless, with no grooves or outlines.

- **The lush dark turf leads.** It is now the base and collar of every cell. Meadow, stony turf and worn earth appear as broad, soft patches within it, placed by a heavily blurred field of each material's own light and dark, offset per variant. They no longer fill whole cells, so the island reads as one deep-green upland.
- **Relief on the surface.** For every material, the luminance gradient towards the upper-left light is precomputed in swatch space, with wrap-around: fine (clumps, about 2 px) and broad (swells, about 12 px). It lightens the sunward side of each clump and swell and shades the other. It is periodic, and mixed by the same blend as the colour, so cells still join seamlessly.
- **Relief on the sides.** `build.py` lights the rock face from its own luminance, also from the upper left. Each visible face gets a shadow in its top 16 px, under the overhanging turf. The shaded e2 faces are darker, and the lit e3 faces slightly toned down so they no longer read pale.
- **A turf lip.** Every visible exposed edge carries an irregular fringe of the lush turf, mostly shallow, with the odd longer tuft. It is on exposed edges only, never at ordinary joins.

`review-relief.webp`, `review-seed-1.webp` and the close-up `review-detail.webp` show the result. The tests pass, and the browser review showed no runtime errors.
