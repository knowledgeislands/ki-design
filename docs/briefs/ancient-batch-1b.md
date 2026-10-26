# Ancient tiles, batch 1b

Batch 1b is a small second run of the Ancient tile set: six tiles. It tests two things that [batch 1](ancient-batch-1.md) showed:

1. **Who owns the shape.** The generator paints square isometric diamonds whatever it is told. So this batch stops asking it for hexes. It paints its natural diamond on a template whose brass hexagon marks the area that is kept. The hex is cut out afterwards by the re-projection in [`+/art/2026-10-19-ancient-batch-1-hexed/`](../../+/art/2026-10-19-ancient-batch-1-hexed/NOTES.md).
2. **The light.** Batch 1 came out as golden-hour daylight. These six must match the painting's later, hazier dusk.

It also repaints two structures. The **Council Hall** gets no dome, so it stops reading as a second Library. The **Causeway** gets a straight-on camera.

Status: **ready to run, not yet run.** As with batch 1, the art is unlicensed until KI-DESIGN-ART-002 is decided ([GDR-KI-DESIGN-035](../decisions/GDR-KI-DESIGN-035-art-is-unlicensed-until-its-licensing-is-recorded.md)). These are candidates for review.

## What the batch paints

| Tile | Why |
| --- | --- |
| `terrain/grassland`, `terrain/forest`, `terrain/ocean`, `terrain/snow` | The dusk test. Batch 1 was furthest from the painting on grassland and snow |
| `structure/council-hall` | Batch 1 gave it a dome |
| `structure/causeway` | Batch 1 painted it from a rotated camera |

## The templates

| Template | Canvas | Use |
| --- | --- | --- |
| `docs/briefs/references/ancient-tile-template-terrain.png` | 1024 × 1024, transparent | Terrain |
| `docs/briefs/references/ancient-tile-template-structure.png` | 1024 × 1536, transparent | Single-hex structures |
| `docs/briefs/references/arcadia-reference-small.jpg` | 1024 × 576 | The painting, small, as the style and light reference |

The run attaches only these small images. A first attempt hit the generator's 100 MB request limit, because a thread re-sends every image it has seen with each request.

Each template shows a square tile in 2:1 isometric projection:

- a pale **top face**, twice as wide as it is deep;
- a two-faced **rock plinth** below it;
- a **brass hexagon** inside the top face.

Everything inside the brass hexagon is kept. The pale band between the hexagon and the diamond's edges is trimmed off later.

## The instruction

Paste everything in the block into the ChatGPT or Codex app with the repository open.

```text
You are working in my local checkout of the Knowledge Islands design repository, ki-design (on my Mac at ~/workspaces/knowledge-islands/ki-design). Paint six Ancient isometric tiles on the templates, save them unaltered with notes, commit only that folder and push. Work from the repository root throughout.

STEP 0: KEEP THE THREAD SMALL. Run this in a new, empty thread. The request size limit is 100 MB and every image in the thread is re-sent with each request, so:
- attach exactly two images to each generation: docs/briefs/references/arcadia-reference-small.jpg and the matching template; never the full-size arcadia.png;
- do not open, view or attach any other image in the repository, including batch 1's tiles;
- after saving a generated image, do not open it again to inspect it; measure it with `sips -g pixelWidth -g pixelHeight <file>` and judge it from the generation you already saw;
- read no other brief: everything needed is in this block.

STEP 1: READ FIRST. Read only +/art/2026-10-19-ancient-batch-1/NOTES.md (what went wrong in batch 1: the light was golden hour and the tiles were square, not hex; the style was right and is kept).
The two images to attach to every generation:
- docs/briefs/references/arcadia-reference-small.jpg: THE style and light reference, a small copy of the painting of Arcadia.
- docs/briefs/references/ancient-tile-template-terrain.png (for terrain) or docs/briefs/references/ancient-tile-template-structure.png (for structures): THE geometry.

STEP 2: THE GEOMETRY. Do not try to paint a hexagon. Paint the square isometric tile shown in the template, and keep to it exactly:
- Same camera as the template: a straight-on 2:1 isometric view. The left and right corners of the top face sit at the same height, and the top corner is exactly above the bottom corner. No rotation, no tilt, no perspective.
- Same placement: the top face fills the template's diamond, about 1000 px wide and 500 px deep, centred, at the template's height on the canvas. The rock plinth shows on both front faces at the template's depth. The canvas is 1024 x 1024 for terrain and 1024 x 1536 for structures.
- Everything that matters goes INSIDE the brass hexagon: buildings, peaks, the river's course, the shoreline, every feature. Paint the ground on continuously out to the diamond's edges, but keep the pale band plain (grass, rock, water), because it is cut away.
- Directions mean the brass hexagon's edges: "upper-right edge" and "lower-left edge" are the hexagon's, not the diamond's.
- Never paint the template's colours, its brass line or its outlines. They are guides only.
- Transparent background. If the tool cannot make one, use a single flat light grey, #d9d9d9, edge to edge, with no gradient, shadow or halo, and record it.

STEP 3: THE LIGHT. Match arcadia.png, not batch 1:
- Later dusk: the sun low on the horizon to the upper left. Warm gold only on the sun-facing tops and edges.
- Shadows cool and bluish, deep but soft. A thin atmospheric haze lowers the contrast.
- Overall noticeably darker and softer than batch 1. No midday brightness, no saturated orange, no bloom, no glow.
- Window lights small and warm.

STEP 4: PAINT. Six images, one generation each, thriving state, frame 0 only. Start every prompt with this shared opening, then add the subject:
"A single square isometric game tile for the Knowledge Islands Realm, painted in the same style, light and palette as the attached reference painting of Arcadia: late calm dusk, the sun low to the upper left, cool soft shadows and a thin haze, deep navy sea, forest and moss greens, pale warm limestone and sandstone, muted roofs, restrained brass, small warm window lights, matte brush texture, no bloom. Painted exactly on the attached geometry template: the same straight-on 2:1 isometric camera, the same diamond top face and two-faced stratified rock plinth, the same size and position on the canvas, with every important feature inside the template's hexagon, on a transparent background. Do not paint the template's colours or lines. No text, no people in close-up, no creatures or animals of any kind, no crystals, no magic glow, no weapons, no walls, towers or battlements."
Subjects:
1. terrain-grassland: gentle grassland with wildflowers and a few stones.
2. terrain-forest: dense temperate woodland of pines and oaks.
3. terrain-ocean: deep navy open sea with gentle swell and faint glints, the whole top face water.
4. terrain-snow: a deep snowfield with a few dark pines, blue-grey in the dusk shadow, warm only on the sun-facing slopes.
5. structure-council-hall: the Council Hall, the place of governance. A long colonnaded civic hall with a low-pitched pediment roof and NO DOME of any kind, broad open steps and a small paved forecourt, pale limestone, warm lit windows between the columns. Civic, never a temple, never fortified.
6. structure-causeway: the Causeway, the translation layer. A low, level stone way on three small culvert arches carrying a paved deck between low parapets across shallow water, a lamp at each landing, joining grass on either side. The water runs from the brass hexagon's upper-right edge to its lower-left edge under the way, and the way crosses it at right angles. Civic, never fortified, not a tall arched bridge.

STEP 5: SAVE UNALTERED. Find today's date with `date +%F` and create +/art/<date>-ancient-batch-1b/. Save each image exactly as the generator returned it (no resizing, cropping, retouching, background removal or re-encoding) as terrain-<id>.png and structure-<id>.png. If an image fails, regenerate it at most twice, keep the best, and record the attempts.

STEP 6: WRITE NOTES.md IN THAT FOLDER BEFORE YOU COMMIT. Batch 1 skipped this; do not. The first line is the heading "# Ancient tiles, batch 1b". Then record:
- the date, the tool and image model, and that arcadia.png and the matching template were attached to every generation;
- the sentence: "This art is unlicensed until KI-DESIGN-ART-002 is decided. These are candidates for review, not the Ancient set.";
- for each file, under a "## <file name>" heading: the exact prompt (verbatim, in a fenced text block), the pixel size you measured, whether the background is truly transparent, the number of attempts, and every deviation you can see from the template's camera and placement, from the light, and from the subject;
- a short closing section on what did not work.

STEP 7: CHECK. Run `bunx rumdl check "+/art/<date>-ancient-batch-1b/NOTES.md"` and fix NOTES.md until it passes. Run `git status --short` and confirm the only new paths are inside +/art/<date>-ancient-batch-1b/.

STEP 8: COMMIT ONLY THAT FOLDER AND PUSH.
- `git add -- "+/art/<date>-ancient-batch-1b"`
- `git commit -m "docs(art): add the Ancient tile batch 1b candidates" -- "+/art/<date>-ancient-batch-1b"`
- `git pull --rebase origin main`, then `git push origin main`. Do not open a pull request or force-push. If the push fails, leave the commit and tell me the SHA and the error.

Rules for every image: keep studio, artist and game names out of every prompt and note. No creatures of any kind, no magic, no crystals, no text, lettering or numbers. Fine outlines in a darkened local colour, never black. Buildings must read as crisp silhouettes when shrunk to 25 %.

FINALLY: reply with the folder path, a table of the six files with pixel sizes and deviations, the commit SHA and whether the push succeeded.
```

## After the run

The design thread re-projects the six through `_hexify.py`, puts them in the island test beside batch 1, and shows Kit.

**The gate.** Kit's rule (19 October 2026): if good hex tiles can't be had this way, the painted set goes back to simpler geometry. Batch 1b decides it.

- **Template method and dusk light both hold:** the rest of the set is repainted the same way from the [prompt pack](ancient-prompt-pack.md).
- **They don't hold:** the painted Ancient style keeps its natural square isometric tile. The map, the chart and the Modern set stay hex, since they are drawn in code and cost nothing either way. The painted style then appears as square tiles or as rectangular vignettes, not on the hex map. Then the cut tiles are written into `packages/tiles/sets/ancient/manifest.json`, with `licence: "UNLICENSED"` until ART-002 is decided.
