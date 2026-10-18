---
id: KI-DESIGN-TOK-001
area: TOK
title: Design tokens v0
kind: deliver
purpose: capability
project: ki-design
component: tokens
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T09:50:00Z
---

# Design tokens v0

## Goal

Publish the colour, type, space, radius and motion tokens as DTCG JSON, built to CSS custom properties (bare roles and Tailwind v4 `--color-*`), a typed module and a SHA-256 digest.

## Context

The site's `tokens.css` and the Observatory's PDR-KI-OBSERVA-002 values are today's two sources; the design brief makes this repository the single source for both.

## Boundary

Values only. No change of meaning; the Observatory keeps vendoring by digest.

## Current state

v0 landed in `04b2761`: DTCG source in `packages/tokens/tokens.json`, the CSS and Tailwind v4 builds, the typed module and the digest, with contrast tests. The site and the Observatory have not yet both consumed the build output.

## Steps

- [ ] Confirm every foreground role passes its contrast floor in light and night in the package tests.
- [ ] Confirm the site and the Observatory each consume the build output without hand edits.

## Files touched

`packages/tokens/`

## Verify

Every foreground role passes its contrast floor in light and night by test; the site and the Observatory can each consume the build output without hand edits.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: this item delivers within decisions already recorded in the design brief.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

Close this item once both consumers take the build.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
