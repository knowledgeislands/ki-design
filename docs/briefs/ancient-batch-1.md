# Ancient tiles, batch 1

The first batch of the Ancient tile set is one instruction, ready to paste into the ChatGPT or Codex app working on the local `ki-design` checkout. It paints the 12 terrains and the eight hero structures of the [Ancient set brief](tile-set-ancient.md) against the chosen painting of Arcadia, saves every image unaltered in the inbound area, records exactly how each was made, and commits only that folder.

Status: **ready to run, not yet run.** Kit runs it in one go. The art it produces is unlicensed until KI-DESIGN-ART-002 is decided ([GDR-KI-DESIGN-035](../decisions/GDR-KI-DESIGN-035-art-unlicensed-until-recorded.md)), and it is a set of candidates for review, not the Ancient set: normalising, choosing and writing `packages/tiles/sets/ancient/manifest.json` come after.

## What the batch paints

| Group | Tiles | Footprint and drawing scale |
| --- | --- | --- |
| Terrain (12) | `grassland`, `forest`, `hills`, `mountain`, `coastal`, `cliffs`, `sand`, `river`, `marsh`, `snow`, `volcanic`, `ocean` | Single hex, drawn at 4× |
| Capital | `structure/capital`: the domed Library and the colonnaded Council Hall on an open square, civic, never fortified | 7-hex flower, drawn at 2× |
| Port | `structure/port` | East–west pair, drawn at 3× |
| Lighthouse, Observatory, Library, Council Hall, Mill, Causeway | `structure/lighthouse`, `structure/observatory`, `structure/library`, `structure/council-hall`, `structure/mill`, `structure/causeway` | Single hex, drawn at 4× |

Every structure is drawn once, in the thriving state, frame 0 only. Footprints follow the Modern set's choices, which the contract leaves to each set except the Capital's flower ([GDR-KI-DESIGN-022](../decisions/GDR-KI-DESIGN-022-tile-loops-and-footprints.md)).

## The instruction

Paste everything in the block into the ChatGPT or Codex app with the repository open.

```text
You are working in my local checkout of the Knowledge Islands design repository, ki-design (on my Mac at ~/workspaces/knowledge-islands/ki-design). Paint the first batch of Ancient isometric tiles, save them unaltered with notes, commit only that folder and push. Work from the repository root throughout.

STEP 1: READ FIRST. Read these files in full before generating anything:
- docs/briefs/tile-set-ancient.md (the Ancient set brief)
- docs/briefs/ancient-prompt-pack.md (per-tile prompts; this batch refines them)
- docs/briefs/arcadia-handoff.md (why the original painting was kept)
- docs/briefs/building-standards.md (geometry, light, families)
- docs/spec/illustration.md (art direction and the never-draw list)
- docs/spec/tiles-and-buildings.md (the tile contract, footprints and the Capital)
- packages/tiles/src/contract.ts (tileGeometry and the tile ids)
Then look at these images:
- docs/briefs/references/arcadia.png: THE style reference. Kit kept this original painting (variation 1) unchanged. Match its atmosphere first and fix details second: calm painted dusk, low warm sun from the upper left, deep navy sea, forest and moss greens, pale warm limestone and sandstone, muted parchment and slate roofs, restrained brass, hundreds of small warm window lights, soft haze, matte painted surfaces with subtle brush texture, no bloom. Attach it to every image generation as the reference.
- docs/briefs/references/explainer-hex-and-isometric.png: hex geometry only, not style.
- packages/tiles/sets/modern/terrain/grassland.svg, packages/tiles/sets/modern/structures/port.svg and packages/tiles/sets/modern/structures/capital.svg: the exact hex outlines, plinths and footprints of the existing Modern set, which these tiles must fit. Geometry only, not style.

STEP 2: THE GEOMETRY. Every tile must follow it exactly.
- At 1x a hex's top face is a pointy-top hexagon 256 px wide and 148 px tall (2:1 dimetric projection). Its six corners, in 1x pixels from the top-left of the cell: (128,0), (256,37), (256,111), (128,148), (0,111), (0,37).
- A 48 px stratified rock plinth hangs below the two lower front edges: a darker cliff face with rock bands, lit from the upper left. The cell is 256 x 196 px: top face plus plinth. Taller structures rise above the top face; nothing overhangs the plinth's front edge, and nothing spills past the footprint's outline by more than 8 % of the tile width.
- Neighbouring hexes step 256 px horizontally; rows step 111 px, and odd rows shift 128 px right.
- Draw each tile at an exact multiple of 1x so it scales back cleanly, centred horizontally, with the cell's bottom at the canvas's bottom edge and empty headroom above it:
  - Terrain, single hex, 4x: top face 1024 x 592, plinth 192, cell 1024 x 784, on a 1024 x 1024 canvas.
  - Single-hex structures, 4x: the same 1024 x 784 cell, on a 1024 x 1536 canvas, so tall buildings have room above.
  - The Port, an east-west pair of two hexes side by side, 3x: top faces 1536 x 444, plinth 144, cell 1536 x 588, on a 1536 x 1024 canvas.
  - The Capital, a 7-hex flower (a centre hex and its six neighbours), 2x: top faces 1536 x 740, plinth 96, footprint 1536 x 836, on a 1536 x 1024 canvas.
- Transparent background: nothing outside the hex or footprint, no neighbouring tiles, no ground beyond the plinth, no border, no shadow on the background. If the tool cannot make a transparent background, use a plain flat light grey and record that as a deviation.
- Light from the top-left at dusk, warm; shadows fall to the bottom-right. Fine outlines in a darkened local colour, never black. Buildings read as crisp silhouettes when shrunk to 25 %.

STEP 3: PAINT THE BATCH. Twenty images, one each, one generation per image, thriving state, frame 0 only. Start every prompt with this shared opening, then add the tile's subject:
"A single isometric game tile for the Knowledge Islands Realm, painted in the same style, light and palette as the attached reference painting of Arcadia: calm painted dusk, low warm sun from the upper left, deep navy sea, forest and moss greens, pale warm limestone and sandstone, muted roofs, restrained brass, small warm window lights, soft haze. One pointy-top hexagonal tile in 2:1 dimetric projection, top face and 48-pixel stratified rock plinth to the exact geometry given, on a transparent background. No text, no people in close-up, no creatures or animals of any kind, no crystals, no magic glow or spell effects, no weapons, no fantasy armour, no temples, no walls, towers or battlements around the Capital."
State the exact canvas size and the tile's 4x, 3x or 2x geometry from step 2 in every prompt.

Terrain (single hex, 4x, filling the whole top face; files terrain-<id>.png):
1. grassland: gentle grassland with wildflowers and a few stones.
2. forest: dense temperate woodland of pines and oaks.
3. hills: rolling hills with exposed rock and heather.
4. mountain: a steep rocky peak with snow on its summit, staying inside the hex outline apart from the peak rising above it.
5. coastal: a sandy shore meeting shallow water with foam; the water lies along the two southern edges and the land to the north.
6. cliffs: a grassy top above sheer stratified sea cliffs.
7. sand: warm dunes with sparse grasses.
8. river: a clear river crossing grassland from the north-east edge to the south-west edge.
9. marsh: reed marsh with small pools.
10. snow: a deep snowfield with a few dark pines.
11. volcanic: dark volcanic rock with a dormant crater and cooled lava seams, dull ember at most, no glow.
12. ocean: deep navy open sea with gentle swell and faint glints, the whole top face water.

Hero structures (thriving: lit windows, a thin wisp of smoke where there is a chimney; files structure-<id>.png):
13. capital, the Capital, 7-hex flower at 2x: the island's civic heart as a hilltop forum in pale limestone, open and welcoming. A domed Library and a colonnaded Council Hall face each other across an open paved civic square with a few trees and a fountain, on a low terraced dais with open stairs down the front faces. Civic and never fortified: no walls, no gatehouse, no battlements and no tower of any kind, not even a clock tower. Not a temple, not a castle. Classical observatory family: pale limestone, domes, colonnades.
14. port, the Port, east-west pair at 3x: one coastal port town where knowledge enters and is exchanged, with water along its southern edges. Low open stone quays and a timber dock with small sailing ships, brick and stone warehouses, a crane, a small rail depot with short double rails running inland, a tall mooring mast with a small moored airship, and a modest customs house with a simple barrier on the entry road. A civic clock tower may stand among the warehouses: architecture only, no battlements. Civic harbour town family: brick, clock tower, cranes, warehouses.
15. lighthouse, single hex at 4x: a pale stone lighthouse on rocks at the water's edge with a keeper's cottage, its lamp lit warm, not glowing. A civic tower for guidance, never fortified. Civic harbour town family.
16. observatory, single hex at 4x: a domed observatory on its own small hill, the dome open at a slit with a brass telescope, smaller than and distinct from the Library. The island's shared vernacular: pale limestone, muted roofs.
17. library, single hex at 4x: the Library, the island's canonical record: pale limestone, a great dome, a colonnade and tall arched lit windows on a low stepped base. Classical observatory family.
18. council-hall, single hex at 4x: the Council Hall, the place of governance: a colonnaded civic hall with a pediment and broad open steps. Never a temple. Classical observatory family.
19. mill, single hex at 4x: the Mill, the island's operations and upkeep: a stone house with a large external wooden waterwheel on a small river running from the north-east edge to the south-west edge. The island's shared vernacular.
20. causeway, single hex at 4x: the Causeway, the translation layer: a low stone way on three small culvert arches carrying a level paved deck between low parapets across shallow water, joining the ground on either side, a lamp at each landing. The shallow water runs from the north-east edge to the south-west edge under the way. Civic, never fortified: no gatehouse, towers or battlements. Not a tall arched bridge. The island's shared vernacular.

Rules for every image: keep studio, artist and game names out of every prompt and every note. No creatures of any kind (no birds, whales or animals), no magic and no crystals. No text, lettering or numbers in the art. The retired Tower is never drawn as a standalone structure.

STEP 4: SAVE UNALTERED. Find today's date with `date +%F` and create the folder +/art/<date>-ancient-batch-1/ (the + is a real folder at the repository root). Save each image exactly as the generator returned it: no resizing, cropping, upscaling, retouching, background removal or re-encoding. Name them terrain-<id>.png and structure-<id>.png, for example terrain-grassland.png and structure-council-hall.png. If an image fails, regenerate it at most twice and keep only the one you judge best; record the attempts.

STEP 5: WRITE NOTES.md in that folder. Its first line must be the heading "# Ancient tiles, batch 1" (a heading first, never a blockquote). Then record:
- the date, the tool and image model used, and that docs/briefs/references/arcadia.png was attached as the reference to every generation;
- the sentence: "This art is unlicensed until KI-DESIGN-ART-002 is decided. These are candidates for review, not the Ancient set.";
- for each of the 20 files, under a "## <file name>" heading: the tile key (for example terrain/grassland or structure/capital), the footprint and drawing scale, the exact prompt text submitted (in a fenced text block, verbatim, including the shared opening), the requested canvas size, the actual pixel size of the saved file (measure it, for example with `sips -g pixelWidth -g pixelHeight <file>` or `file <file>`), whether the background is truly transparent, the number of attempts, and every deviation from the geometry, footprint, light or palette you can see;
- a short closing section listing anything that did not work and what you would change in the next batch.
Do not edit any other file in the repository.

STEP 6: CHECK. Run `bunx rumdl check "+/art/<date>-ancient-batch-1/NOTES.md"` and fix NOTES.md until it passes. Run `git status --short` and confirm the only new or changed paths are inside +/art/<date>-ancient-batch-1/.

STEP 7: COMMIT ONLY THAT FOLDER AND PUSH.
- `git add -- "+/art/<date>-ancient-batch-1"`
- `git commit -m "docs(art): add the Ancient tile batch 1 candidates" -- "+/art/<date>-ancient-batch-1"`
- `git pull --rebase origin main`, then `git push origin main`. Push straight to main; do not open a pull request.
- If the push fails, leave the commit in place, do not force-push, and tell me the commit SHA and the error.

FINALLY: reply with the folder path, a table of the 20 files with their pixel sizes and any deviations, the commit SHA and whether the push succeeded.
```

## After the run

Review the candidates in `+/art/<date>-ancient-batch-1/` against the painting. The chosen tiles are then normalised to the 1× and 2× cell (cut to the hex template, plinth checked, anchor recorded), and written into `packages/tiles/sets/ancient/manifest.json` with `family` on the heroes, the set's `palette` and `licence: "UNLICENSED"` until ART-002 is decided. The rest of the inventory follows from the [prompt pack](ancient-prompt-pack.md).
