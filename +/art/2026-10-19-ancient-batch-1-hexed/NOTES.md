# Ancient tiles, batch 1, re-projected onto the hex

This art is unlicensed until KI-DESIGN-ART-002 is decided. These are trial normalisations for review, not the Ancient set.

Image generators paint square isometric diamonds even when given exact hex vertices ([batch 1 notes](../2026-10-19-ancient-batch-1/NOTES.md)). So we stop asking them for the shape. **We own the geometry and the generator only paints.** This folder tests that on batch 1: it cuts each painted diamond down to the Knowledge Islands hex cell.

## How each tile is made

`_hexify.py` is the prototype. It is Python with Pillow and NumPy; the production version is to be ported to the `packages/tiles` TypeScript tooling. For each candidate it:

1. **Removes the background.** A flat grey background is flood-filled out from the canvas border.
2. **Measures the painted diamond:** its side corners, its depth and its plinth depth. The angle can differ from tile to tile.
3. **Fits the hex inside the diamond.** The painted top face is re-projected into the 2:1 dimetric pointy-top hex. The hex is the largest one that fits inside the diamond: 63 % of the diamond's width. Nothing at the edges is invented.
4. **Keeps tall things grounded.** Peaks, domes and towers that rise above the diamond's back edges are kept, together with the ground under them, so they don't float. Low tufts along the back edge are dropped.
5. **Remaps the plinth.** The painted rock plinth is re-projected onto the hex's two visible side faces at the contract's 48 px (at 1×) depth.

The output is the tile contract's cell: top face 256 × 148 and plinth 48 at 1×. It is saved here at 2×, with the cell's bottom at the canvas's bottom edge.

- **Terrain:** 512 × 512.
- **Single-hex structures and the mountain:** 512 × 768.

## Results

- **Terrains:** all 12 cut cleanly.
- **Single-hex structures:** the Library, Council Hall, Lighthouse, Mill and Observatory keep their buildings whole.
- **Two weak spots:**
  - The **Causeway** was painted from a slightly rotated camera, so its re-projection is skewed.
  - The **Observatory**'s own tall plinth shows inside the top face.
- **Not processed:** the **Capital** and the **Port**. They came out close to their multi-hex footprints and are handled separately.

`_island-test.jpg` is a 37-hex island built by `_island.py`. It has the Library at the centre, the other tiles around it and an ocean ring. The edges meet without gaps, and the island reads as one painted place.

## What this settles and what it doesn't

- **Settled:** the geometry problem is ours to solve, and it can be solved mechanically.
- **Still open:**
  - **The light.** Batch 1 is golden hour, not the painting's dusk.
  - **Edge continuity.** Neighbouring tiles join at a seam rather than continuing into each other. Ocean shows this most.
  - **The Council Hall's dome.** It should have none.

[Batch 1b](../../../docs/briefs/ancient-batch-1b.md) tests the template method and the dusk light on six tiles.
