---
id: KI-DESIGN-ICO-001
area: ICO
title: Icon seed set
kind: deliver
purpose: capability
project: ki-design
component: icons
horizon: now
status: ready
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-19T23:14:00Z
---

# Icon seed set

## Goal

Draw the first line glyphs (24 grid, 1.5 stroke, round caps) for the canonical symbols, zones, structures, Port modes and the local app's instruments, with a sprite and a typed name list.

## Context

The site uses emoji in its Capital diagram and the Observatory has text-only tabs; both need one glyph set.

## Boundary

Glyphs only; no new meanings. Steward-role glyphs wait for the roles to enter canon.

## Current state

v0 landed in `04b2761`: 71 glyphs in `packages/icons/svg`, a sprite and a typed name list, with SVG-contract tests. Coverage of every canon and decided symbol is not yet checked by a test. Canon and decided are now Official and Agreed (GDR-KI-DESIGN-002).

On 20 October 2026, six of the 46 Official or Agreed symbols in `packages/symbols` named no glyph: `territory`, `realm` (Agreed), `pillars`, and the conditions `thriving`, `quiet` and `weathered`; `ruined` draws `ruins`. Proposed `storm` has none either and stays outside this check.

**Decision before delivery.** The conditions are also drawn as building states on tiles ([tiles-and-buildings.md](../spec/tiles-and-buildings.md)), so whether each needs a line glyph is the owner's call. This plan follows the recommendation in the run report: every Official or Agreed symbol gets a glyph, with no exemptions. If the owner exempts the conditions instead, the exemption list goes into the test and Step 3 draws only `realm` and `pillars`.

## Steps

- [ ] Add a test in `packages/symbols/src/symbols.test.ts` that every Official or Agreed symbol names an existing glyph; this is the test KI-DESIGN-SYM-001 shares.
- [ ] Point `territory` at the existing `archipelago` glyph, since a territory is drawn as an archipelago (GDR-KI-DESIGN-015).
- [ ] Draw `realm`, `pillars`, `thriving`, `quiet` and `weathered` to the glyph contract (24 grid, 1.5 stroke, round caps), following the icons README: draw, build (which lints), test, regenerate the contact sheet, and name each in the symbol data.
- [ ] Run the package tests, typecheck, lint and roadmap audit.

## Files touched

`packages/icons/` (new SVGs, the sprite, the generated name list, the contact sheet), `packages/symbols/src/symbols.ts`, `packages/symbols/src/symbols.test.ts`

## Verify

Every symbol with status Official or Agreed in the symbol library names an existing glyph, by test; the icons package's SVG-contract tests and lint pass for the new glyphs; the owner reviews the drawings on the contact sheet.

## Dependencies / blocks

Shares the glyph-coverage test with KI-DESIGN-SYM-001; deliver this item first, and SYM-001 then confirms the test. Waits on the owner's answer on condition glyphs.

## Documentation impact

### Decision Records

No decision record: this item delivers within decisions already recorded in the design brief.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

None.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
