---
id: KI-DESIGN-SYM-001
area: SYM
title: Symbol library as data
kind: deliver
purpose: capability
project: ki-design
component: symbols
status: done
blocks: []
blocked_by: []
baseline_ref: a3034a320e748594bb8e6a8033e50b4c111889cb
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-20T04:23:51Z
---

# Symbol library as data

## Goal

Hold every symbol, its meaning, status (canon, decided, proposed), glyph and where it surfaces as typed data that the Field Guide, the site and the local app all read.

## Context

Meanings live in ki-principal's Symbol Library and Philosophy; this is the machine-readable mirror.

## Boundary

Mirror canon; proposed entries are marked proposed and never shown publicly as canon.

## Current state

v0 landed in `04b2761`: `packages/symbols` holds every symbol with its meaning, status, glyph and surfaces, and the site preview's Field Guide is generated from it. On 20 October 2026 `bun examples/site-preview/build-pages.ts` rebuilt `field-guide.html` byte-identical from the data.

Six Official or Agreed symbols name no glyph (see KI-DESIGN-ICO-001), and Proposed `storm` has none. A test that fails for _any_ symbol without a glyph would require drawing Proposed symbols, which ICO-001 leaves out; this plan scopes the test to Official and Agreed, as ICO-001 does. On 20 October 2026, under the overnight authority, Kit answered CONDITION-GLYPHS a): every Official or Agreed symbol gets a glyph. KI-DESIGN-ICO-001 drew the six missing glyphs and added the shared test (`a3034a3`).

## Steps

- [x] Confirm the shared glyph-coverage test from KI-DESIGN-ICO-001 fails for any Official or Agreed symbol without a glyph (check it fails with one icon removed, then restore).
- [x] Confirm the Field Guide page builds from the data alone: rebuild with `bun examples/site-preview/build-pages.ts` and check `field-guide.html` is unchanged in Git.

## Files touched

`packages/symbols/src/symbols.test.ts` (only if the shared test needs a fix); `examples/site-preview/field-guide.html` is rebuilt and must not change

## Verify

The Field Guide page is regenerated from the data with no diff; a test catches any Official or Agreed symbol without a glyph.

## Dependencies / blocks

Shares the glyph-coverage test with KI-DESIGN-ICO-001 and follows it; ICO-001 is delivered (`a3034a3`).

## Documentation impact

### Decision Records

No decision record: this item delivers within decisions already recorded in the design brief.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

None.

## Review

### Delivered

Within the boundary above, from baseline `a3034a3`: confirmation that the shared glyph-coverage test from KI-DESIGN-ICO-001 catches a missing glyph and that the Field Guide builds from the data alone. No data, test or page change was needed; this record's only change is itself.

### Change Summary

No file outside this record changed. The shared test `every Official or Agreed symbol names a glyph` in `packages/symbols/src/symbols.test.ts` landed with ICO-001 and needed no fix.

### Verification

- With `realm`'s `icon` removed from `packages/symbols/src/symbols.ts`, the symbols tests fail on exactly that test (1 fail, naming `realm`); with the file restored from Git, all 18 pass.
- `bun examples/site-preview/build-pages.ts` rebuilt `index.html` and `field-guide.html` (50 symbols, 78 glyphs) with no diff in Git.
- `bun run test`, `bun run self:typecheck`, `biome check .`, `rumdl check .`, `knip` and `build-boards.ts --check` pass; `ki repo audit` for `ki-work-roadmap` and `ki-authoring` reports FAIL=0.

### Outstanding concerns

None. Proposed symbols, such as `storm`, stay outside the check by design.

### Post-change review

Goal met: the symbol library is typed data that the Field Guide reads, and a test catches any Official or Agreed symbol without a glyph. No regression risk. Ready for acceptance.

### Mini recap

Confirmed the shared coverage test fails when a glyph is missing, and that the Field Guide regenerates from the data unchanged. No learning to route.

## Done

Accepted 2026-10-20 by Kris Brown on the review packet above.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.

### Acceptance

Accepted on 20 October 2026 under ACCEPT-BUNDLE, SWEEP-ACCEPT-OBSERVATORY a), as recorded in Knowledge Islands Principal `+/_WORK/ki.ways-of-working/decisions.md` (05:20 BST). Kris: "let's sweep through all the acceptance of the observatory, and then get everything that's been accepted so far pruned." The bundle covered exactly KI-OBSERVA-VIS-022, KI-OBSERVA-APP-045, KI-OBSERVA-VIS-041, KI-OBSERVA-VIS-043, KI-OBSERVA-VIS-044, KI-OBSERVA-APP-046, KI-DESIGN-TOK-001, KI-DESIGN-MAP-001, KI-DESIGN-OBS-015, KI-DESIGN-SYM-001 and KI-DESIGN-TIL-001, after a blind review of each packet; the six exceptions it named stay open.
