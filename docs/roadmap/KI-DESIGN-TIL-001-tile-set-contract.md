---
id: KI-DESIGN-TIL-001
area: TIL
title: Tile-set contract, Modern set
kind: deliver
purpose: capability
project: ki-design
component: tiles
status: done
blocks: []
blocked_by: []
baseline_ref: 09e001fc9825da6c0dfa742f71aa7c6c05855633
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-20T04:23:51Z
---

# Tile-set contract, Modern set

## Goal

Publish the tile manifest schema, the required id inventory and a validator, then draw the Modern set against it.

## Context

Kit wants several tile sets over time, including community ones; the contract is what makes them interchangeable.

## Boundary

The Modern set is drawn here; the Ancient set is TIL-002.

## Current state

v0 landed in `04b2761`: the manifest schema, id inventory and validator in `packages/tiles`, and the Modern set (37 tiles) in `packages/tiles/sets/modern`. The test `the Modern stub is valid but unfinished` already holds the validator at no errors (`ok`), with every tile still marked `draft`, so the set is not yet `complete`.

The preview's Known Lands chart is the flat renderer: it draws terrain as token fills and patterns and structures as glyphs, never tile art. Of the 36 inventory ids, the 12 terrains have fills and 15 of the 16 structures have glyphs (`cottage` falls back to the neutral marker); the 4 decals and 4 connectors have no flat form. Tile art reaches a chart only through the isometric renderer, KI-DESIGN-MAP-002, which this item blocks.

**Decision before delivery, answered.** As first written, Step 2 could not pass until MAP-002, which waits on this item. On 20 October 2026, under the overnight authority (OVERNIGHT in ki-principal's `+/_WORK/ki.observatory/decisions.md`), Kit took the recommendation, TILE-CHECK a): the flat chart is held to the ids it can draw, terrains and structures, and the decal and connector check moves to KI-DESIGN-MAP-002's Steps and Verify.

## Steps

- [x] Confirm the validator passes for the Modern set: the existing test holds `ok` with no errors; re-run it.
- [x] Add a test that every terrain and structure id in the inventory renders in the flat Known Lands chart: a terrain fill for each terrain, and a structure group, by glyph or the neutral marker, for each structure.
- [x] Run the package and preview tests, typecheck, lint and roadmap audit.

## Files touched

`examples/observatory-preview/test/helpers.test.ts` for the new test; `docs/roadmap/KI-DESIGN-MAP-002-isometric-renderer.md` for the moved check; no art changes

## Verify

The validator passes for the Modern set; every terrain and structure id in the inventory renders in the flat Known Lands chart, by test. Decals and connectors are checked when MAP-002 draws tile art.

## Dependencies / blocks

Blocks the Ancient tile set (KI-DESIGN-TIL-002) and the isometric renderer (KI-DESIGN-MAP-002). The owner's answer on the chart check is in (TILE-CHECK a).

## Documentation impact

### Decision Records

No decision record: this item delivers within decisions already recorded in the design brief.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

Close this item once both checks pass.

## Review

### Delivered

Within the boundary above, from baseline `09e001f`: the validator confirmed for the Modern set, and a new test that every terrain and structure id in the tile inventory renders in the flat Known Lands chart. Decals and connectors are not checked here: that check is now a Step and Verify line of KI-DESIGN-MAP-002. No art, contract or renderer change.

### Change Summary

- `examples/observatory-preview/test/helpers.test.ts`: a new `the flat chart covers the tile inventory` block builds an `islandmap/v1` with one hex per inventory terrain and one structure per inventory structure, lays it out with `layoutFlat` and the chart's own glyph resolver (`glyphBody`), and checks that the map validates, that every terrain draws a hex with its token fill (the ocean with the theme sea, as the renderer paints water), and that every structure draws a structure group, by glyph or the neutral marker, with only `cottage` falling back.
- `docs/roadmap/KI-DESIGN-MAP-002-isometric-renderer.md`: a Step and a Verify clause for the decal and connector check.

### Verification

- `packages/tiles` tests: 20 pass, including `the Modern stub is valid but unfinished` (validator `ok`, no errors).
- Preview and generator tests: 90 pass, 0 fail, including the three new flat-chart tests; `bun run test` passes across every package.
- `bun run self:typecheck`, `tsc -p examples/observatory-preview`, `biome check .`, `rumdl check .`, `knip` and `build-boards.ts --check` pass; `ki repo audit` for `ki-work-roadmap` and `ki-authoring` reports FAIL=0.

### Outstanding concerns

The Modern set is valid but not `complete`: every tile is still `draft`, as before. `cottage` has no glyph and draws the neutral marker; the test pins that, so a new `cottage` glyph will need the test updated. Decals and connectors stay unchecked until MAP-002.

### Post-change review

Goal met within the answered scope: the contract, inventory and validator stand, the validator passes for the Modern set, and the flat chart covers every terrain and structure, by test. One test block and one record note; no regression risk. Ready for acceptance.

### Mini recap

Confirmed the Modern set validates and added the flat-chart inventory check; moved the decal and connector check to MAP-002. Learning route: a `cottage` glyph would remove the chart's only neutral marker; capture it with `ki-next` if wanted.

## Done

Accepted 2026-10-20 by Kris Brown on the review packet above.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.

### Acceptance

Accepted on 20 October 2026 under ACCEPT-BUNDLE, SWEEP-ACCEPT-OBSERVATORY a), as recorded in Knowledge Islands Principal `+/_WORK/ki.ways-of-working/decisions.md` (05:20 BST). Kris: "let's sweep through all the acceptance of the observatory, and then get everything that's been accepted so far pruned." The bundle covered exactly KI-OBSERVA-VIS-022, KI-OBSERVA-APP-045, KI-OBSERVA-VIS-041, KI-OBSERVA-VIS-043, KI-OBSERVA-VIS-044, KI-OBSERVA-APP-046, KI-DESIGN-TOK-001, KI-DESIGN-MAP-001, KI-DESIGN-OBS-015, KI-DESIGN-SYM-001 and KI-DESIGN-TIL-001, after a blind review of each packet; the six exceptions it named stay open.
