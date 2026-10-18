---
id: KI-DESIGN-ICO-001
area: ICO
title: Icon seed set
kind: deliver
purpose: capability
project: ki-design
component: icons
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T09:50:00Z
---

# Icon seed set

## Goal

Draw the first line glyphs (24 grid, 1.5 stroke, round caps) for the canonical symbols, zones, structures, Port modes and the local app's instruments, with a sprite and a typed name list.

## Context

The site uses emoji in its Capital diagram and the Observatory has text-only tabs; both need one glyph set.

## Boundary

Glyphs only; no new meanings. Steward-role glyphs wait for the roles to enter canon.

## Current state

v0 landed in `04b2761`: 71 glyphs in `packages/icons/svg`, a sprite and a typed name list, with SVG-contract tests. Coverage of every canon and decided symbol is not yet checked by a test.

## Steps

- [ ] Add a test that every canon or decided symbol in `packages/symbols` names an existing glyph.
- [ ] Draw any glyph the test finds missing.

## Files touched

`packages/icons/`, `packages/symbols/src/symbols.test.ts`

## Verify

Every symbol with status canon or decided in the symbol library has a glyph; tests check the SVG contract.

## Dependencies / blocks

Shares the glyph-coverage test with KI-DESIGN-SYM-001.

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
