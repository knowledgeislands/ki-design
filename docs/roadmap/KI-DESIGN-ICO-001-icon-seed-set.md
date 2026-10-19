---
id: KI-DESIGN-ICO-001
area: ICO
title: Icon seed set
kind: deliver
purpose: capability
project: ki-design
component: icons
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: f41cbc5621f6c260b965c877d4126edf37b3147b
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-19T23:37:57Z
---

# Icon seed set

## Goal

Draw the first line glyphs (24 grid, 1.5 stroke, round caps) for the canonical symbols, zones, structures, Port modes and the local app's instruments, with a sprite and a typed name list.

## Context

The site uses emoji in its Capital diagram and the Observatory has text-only tabs; both need one glyph set.

## Boundary

Glyphs only; no new meanings. Steward-role glyphs wait for the roles to enter canon.

## Current state

v0 landed in `04b2761` with 71 glyphs (73 by 19 October) in `packages/icons/svg`, a sprite and a typed name list, with SVG-contract tests. Coverage of every canon and decided symbol is not yet checked by a test. Canon and decided are now Official and Agreed (GDR-KI-DESIGN-002).

On 20 October 2026, six of the 46 Official or Agreed symbols in `packages/symbols` named no glyph: `territory`, `realm` (Agreed), `pillars`, and the conditions `thriving`, `quiet` and `weathered`; `ruined` draws `ruins`. Proposed `storm` has none either and stays outside this check.

**Decision before delivery, answered.** The conditions are also drawn as building states on tiles ([tiles-and-buildings.md](../spec/tiles-and-buildings.md)), so whether each needs a line glyph was the owner's call. On 20 October 2026, under the overnight authority (OVERNIGHT in ki-principal's `+/_WORK/ki.observatory/decisions.md`), Kit took the recommendation, CONDITION-GLYPHS a): every Official or Agreed symbol gets a glyph, with no exemptions.

## Steps

- [x] Add a test in `packages/symbols/src/symbols.test.ts` that every Official or Agreed symbol names an existing glyph; this is the test KI-DESIGN-SYM-001 shares.
- [x] Point `territory` at the existing `archipelago` glyph, since a territory is drawn as an archipelago (GDR-KI-DESIGN-015).
- [x] Draw `realm`, `pillars`, `thriving`, `quiet` and `weathered` to the glyph contract (24 grid, 1.5 stroke, round caps), following the icons README: draw, build (which lints), test, regenerate the contact sheet, and name each in the symbol data.
- [x] Run the package tests, typecheck, lint and roadmap audit.

## Files touched

`packages/icons/` (new SVGs, the sprite, the generated name list, the contact sheet, README, coverage list), `packages/symbols/src/symbols.ts`, `packages/symbols/src/symbols.test.ts`; the generated `examples/site-preview/index.html` and `field-guide.html` and the generated boards in `docs/design-review/boards/`; glyph counts and briefs in `docs/briefs/glyph-briefs.md`, `docs/briefs/README.md`, `docs/spec/iconography.md` and `-/observatory-handoff/INSTRUCTION.md`

## Verify

Every symbol with status Official or Agreed in the symbol library names an existing glyph, by test; the icons package's SVG-contract tests and lint pass for the new glyphs; the owner reviews the drawings on the contact sheet.

## Dependencies / blocks

Shares the glyph-coverage test with KI-DESIGN-SYM-001; deliver this item first, and SYM-001 then confirms the test. The owner's answer on condition glyphs is in (CONDITION-GLYPHS a).

## Documentation impact

### Decision Records

No decision record: this item delivers within decisions already recorded in the design brief.

### Specifications

`docs/spec/iconography.md` gains the rule that every Official or Agreed symbol has a glyph, by test, and its glyph count is corrected to 78.

### Guides

No guide change: the developer guide already covers running the checks and previews. The icons README's "Adding a glyph" steps now say to name a symbol's glyph in `packages/symbols`.

### Roadmap

None.

## Review

### Delivered

Within the boundary above, from baseline `f41cbc5`: five new single-colour line glyphs, `realm`, `pillars`, `thriving`, `quiet` and `weathered`, each passing `lintIcon`; `territory` drawn with `archipelago`; and the shared test that every Official or Agreed symbol names an existing glyph. No new meanings; steward-role glyphs untouched; Proposed `storm` stays without a glyph.

### Change Summary

- `packages/icons/svg/`: `realm` (a globe), `pillars` (three free-standing columns with capitals and bases, no pediment, so it never reads as the Council Hall), and the condition family: one gabled house with chimney, window and door; `thriving` adds chimney smoke, `quiet` is the house unlit, `weathered` breaks the roof line and cracks the wall; `ruined` keeps `ruins`.
- `packages/icons/src/icons.generated.ts` rebuilt (78 glyphs); `src/icons.test.ts` coverage list extended; `contact-sheet.png` regenerated with the five new glyphs bordered in brass; README count, list and "Adding a glyph" step updated.
- `packages/symbols/src/symbols.ts`: `icon` set for territory (`archipelago`), realm, pillars, thriving, quiet and weathered; `symbols.test.ts` gains `every Official or Agreed symbol names a glyph`.
- Generated outputs rebuilt from the data: `examples/site-preview/index.html` and `field-guide.html`, and the `DsIcons`, `DsMeaning`, `DsOverview` boards with `canvas.json`.
- Docs: glyph briefs for the five glyphs and the territory note; counts corrected from 72 or 73 to 78 in `docs/spec/iconography.md`, `docs/briefs/README.md` and `-/observatory-handoff/INSTRUCTION.md`; iconography gains the coverage rule.
- Tooling note: Playwright is not a dependency, so the contact sheet was rendered with `NODE_PATH` pointing at a local checkout's existing Playwright install; nothing was installed or added to `package.json`.

### Verification

- `bun run test`: every package passes (icons 89, symbols 18, tiles 20, tokens 55, hexmap 66, elements 11), and the preview and generator tests pass (87).
- `bun run self:typecheck`, `biome check .`, `rumdl check .`, `knip` and `build-boards.ts --check` pass.
- `ki repo audit` for `ki-work-roadmap` and `ki-authoring`: FAIL=0, no new warning.

### Outstanding concerns

The drawings need the owner's eye on `packages/icons/contact-sheet.png`. In particular, `thriving` and `quiet` differ only by chimney smoke, which is faint at 16 px, and `realm` is a conventional globe. Redraws are cheap if the owner wants a stronger mark.

### Post-change review

Goal met: every Official or Agreed symbol names an existing glyph, by test, and the new glyphs pass the drawing contract. Scope held to glyphs and their data. Regression risk is low: generated pages and boards changed only by the new glyphs. Ready for review of the drawings.

### Mini recap

Drew five glyphs, pointed `territory` at `archipelago`, and added the shared glyph-coverage test. Learning route: the icons README could name how to render the contact sheet when Playwright is not installed (a `KI_CHROMIUM` or `NODE_PATH` note); not promoted here.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
