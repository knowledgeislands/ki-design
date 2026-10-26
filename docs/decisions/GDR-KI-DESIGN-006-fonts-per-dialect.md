---
id: GDR-KI-DESIGN-006
title: 'Fonts per dialect'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-006: Fonts per dialect

## Context

The design brief left the display face open: keep Playfair Display, or move to an engraved serif such as Cormorant or EB Garamond for cartouches and headlines. The public site is atmospheric and narrative; the local app must be dense, offline and fast, and fetches nothing.

## Decision

**Each dialect has its own type.**

- **Chart (the site):** Cormorant Garamond for display, at 24 px and above only; Cormorant SC for labels, cartouches and map labels, tracked 0.14–0.18 em; Inter for body. Cormorant replaces Playfair Display.
- **Instrument (the app):** system serif, sans and monospace stacks only, nothing fetched or bundled, with fixed pixel leading so row heights can be summed by test.
- Both use tabular figures for counts, dates, times and ranks.

## Consequences

- The families are tokens (`font.site`, `font.app`, `font.mono`); the type scales are set out in the spec.
- Never set body, buttons or table text in Cormorant. Map labels below 13 px switch to Inter.
- Large display text still holds 4.5:1, because Cormorant's thin strokes do not earn the large-text allowance.

## References

- docs/spec/typography.md.
