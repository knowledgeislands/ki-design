---
id: KI-DESIGN-SYM-001
area: SYM
title: Symbol library as data
kind: deliver
purpose: capability
project: ki-design
component: symbols
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T09:50:00Z
---

# Symbol library as data

## Goal

Hold every symbol, its meaning, status (canon, decided, proposed), glyph and where it surfaces as typed data that the Field Guide, the site and the local app all read.

## Context

Meanings live in ki-principal's Symbol Library and Philosophy; this is the machine-readable mirror.

## Boundary

Mirror canon; proposed entries are marked proposed and never shown publicly as canon.

## Current state

v0 landed in `04b2761`: `packages/symbols` holds every symbol with its meaning, status, glyph and surfaces, and the site preview's Field Guide is generated from it.

## Steps

- [ ] Add a test that fails for any symbol without a glyph.
- [ ] Confirm the Field Guide page builds from the data alone.

## Files touched

`packages/symbols/`, `examples/site-preview/`

## Verify

The Field Guide page can be generated from the data; a test catches any symbol without a glyph.

## Dependencies / blocks

Shares the glyph-coverage test with KI-DESIGN-ICO-001.

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
