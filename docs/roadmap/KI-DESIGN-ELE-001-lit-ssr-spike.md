---
id: KI-DESIGN-ELE-001
area: ELE
title: Lit SSR spike
kind: deliver
purpose: capability
project: ki-design
component: elements
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T09:50:00Z
---

# Lit SSR spike

## Goal

Prove Lit server-side rendering with Declarative Shadow DOM in the site's Eleventy build under Bun, or decide to build the site under Node.

## Context

`@lit-labs/ssr` and the Eleventy plugin are labs packages needing Node VM modules.

## Boundary

A spike with a go / no-go note; no production change.

## Current state

Not started. `<ki-glyph>` and `<ki-hexmap>` exist in `packages/elements` and are tested in happy-dom only; nothing renders them server-side.

## Steps

- [ ] Render `<ki-glyph>` and `<ki-hexmap>` with `@lit-labs/ssr` on a test page in the site's Eleventy build under Bun.
- [ ] Check that both hydrate in the browser.
- [ ] Record the go or no-go, and the alternative if no-go.

## Files touched

A spike branch or scratch page in the site; a note under `docs/`.

## Verify

`<ki-glyph>` and `<ki-hexmap>` render server-side on a test page and hydrate in the browser, or the no-go is recorded with the alternative.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

A no-go that moves the site build to Node would be a Decision Record in the site repository, not here.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

A go opens a follow-up to ship server-rendered elements.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
