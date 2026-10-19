# Ancient tiles, batch 1

This art is unlicensed until KI-DESIGN-ART-002 is decided. These are candidates for review, not the Ancient set.

- **Date:** 19 October 2026.
- **Tool:** the ChatGPT/Codex app's built-in image generator. It does not expose the image model.
- **Reference:** `docs/briefs/references/arcadia.png` was attached to every generation. Some generations also had a geometry preview from `_reference-previews/`.
- **Brief:** [`docs/briefs/ancient-batch-1.md`](../../../docs/briefs/ancient-batch-1.md).
- **Who wrote this note:** the run stopped before writing it. The design thread wrote it afterwards from `_batch-state.json`, which holds every prompt verbatim, the attempts and the source hashes. The review below is the design thread's.

## The files

| File | Pixels | Background | Attempts | Deviations |
| --- | --- | --- | --- | --- |
| `terrain-grassland.png` | 1254 × 1254 | transparent | 2 | Square isometric diamond, not a hex |
| `terrain-forest.png` | 1254 × 1254 | transparent | 1 | Square diamond |
| `terrain-hills.png` | 1254 × 1254 | transparent | 1 | Square diamond |
| `terrain-mountain.png` | 1254 × 1254 | transparent | 1 | Square diamond |
| `terrain-coastal.png` | 1254 × 1254 | transparent | 1 | Square diamond |
| `terrain-cliffs.png` | 1254 × 1254 | transparent | 1 | Square diamond |
| `terrain-sand.png` | 1254 × 1254 | transparent | 1 | Square diamond |
| `terrain-river.png` | 1254 × 1254 | transparent | 1 | Square diamond |
| `terrain-marsh.png` | 1254 × 1254 | transparent | 1 | Square diamond |
| `terrain-snow.png` | 1254 × 1254 | transparent | 2 | Square diamond; the coldest and brightest light of the set |
| `terrain-volcanic.png` | 1254 × 1254 | transparent | 1 | Square diamond |
| `terrain-ocean.png` | 1254 × 1254 | transparent | 1 | Square diamond |
| `structure-capital.png` | 1536 × 1024 | flat grey | 2 | Close to the 7-hex flower; grey background |
| `structure-port.png` | 1536 × 1024 | flat grey | 2 | Close to the east–west pair; grey background |
| `structure-lighthouse.png` | 1024 × 1536 | flat grey | 2 | Square diamond; grey background |
| `structure-observatory.png` | 1024 × 1536 | flat grey | 2 | Square diamond; grey background; tall plinth |
| `structure-library.png` | 1024 × 1536 | flat grey | 1 | Square diamond; grey background |
| `structure-council-hall.png` | 1024 × 1536 | flat grey | 1 | Square diamond; grey background; drawn **with a dome**, so it reads as a second Library |
| `structure-mill.png` | 1024 × 1536 | flat grey | 1 | Square diamond; grey background |
| `structure-causeway.png` | 1024 × 1536 | flat grey | 1 | Square diamond, painted from a slightly rotated camera; grey background |

The terrains are 1254 px square, not the 1024 px canvas requested. Their alpha is close to opaque (224–254) rather than 255 inside the tile.

## Review

- **Style:** right. The warm limestone, moss and forest greens, stone plinths and matte brushwork match the painting, and the 12 terrains hang together as a set.
- **Light:** too early in the day. It reads as golden-hour daylight, brighter and harder-edged than the painting's hazy dusk.
- **Subjects:** the Capital is civic and unfortified, with the domed Library facing the colonnaded Council Hall across a square. The Port shows docks, ships, the rail shed and the airship mast. The Mill, Lighthouse and Causeway read clearly.
- **Geometry:** wrong for 18 of the 20. The prompts gave the exact hex vertices and a hex template, and the generator still painted square diamonds. Each diamond's angle also differs a little from the others.

## Rejected first attempts, recovered

Six first attempts were rejected during the run and left out of the folder. Kit recovered them from the ChatGPT app on 19 October 2026, and they are in `_rejected/`. Their SHA-256 hashes match the rejected attempts in `_batch-state.json`; grassland's first attempt has no recorded hash there. The other 21 recovered images were exact copies of the selected files and were not added again.

| File | Background | Note |
| --- | --- | --- |
| `structure-capital-attempt-1.png` | transparent | **A true 7-hex flower** with hex plinths: the best Capital geometry so far. The run rejected it only for faint edge halos in the alpha |
| `structure-port-attempt-1.png` | transparent | **A true east–west hex pair** with hex plinths: the best Port geometry so far. Rejected for edge halos |
| `structure-lighthouse-attempt-1.png` | transparent | Square diamond, with a small harbour |
| `structure-observatory-attempt-1.png` | transparent | Square diamond, tall plinth |
| `terrain-grassland-attempt-1.png` | transparent | Square diamond, with two cottages |
| `terrain-snow-attempt-1.png` | transparent | Square diamond, a snowy ridge with pines |

What this shows: when the footprint is several hexes, the generator does paint hexes. It fails only on the single hex, which it turns into a square diamond. The halos are a small clean-up for the cut-out step, not a reason to reject. These two are the candidates to take forward for the Capital and the Port.

## What happened next

The design thread re-projected the 18 diamonds onto the hex cell. The results are in [`../2026-10-19-ancient-batch-1-hexed/`](../2026-10-19-ancient-batch-1-hexed/NOTES.md). The next batch stops asking the generator for hexes: [batch 1b](../../../docs/briefs/ancient-batch-1b.md) has it paint its natural diamond on a template, and the hex is cut from it afterwards.
