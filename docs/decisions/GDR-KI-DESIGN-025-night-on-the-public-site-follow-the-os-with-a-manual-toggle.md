---
id: GDR-KI-DESIGN-025
title: 'Night on the public site: follow the OS, with a manual toggle'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-025: Night on the public site: follow the OS, with a manual toggle

## Context

Night is the reference rendering ([GDR-KI-DESIGN-010](GDR-KI-DESIGN-010-night-as-the-reference-rendering.md)), and the app shell follows the operating system's theme. The public site is where most people first meet night, and a `theme` glyph already exists. The question was whether the site follows the OS alone or adds a manual toggle. On 19 October 2026 Kit chose the toggle and confirmed it explicitly.

## Decision

**The public site follows the operating system's theme by default, and offers a small manual toggle between day and night.**

- With no choice made, the site renders by `prefers-color-scheme`, as `tokens.css` already does.
- The toggle sets `data-theme="light"` or `data-theme="night"` on the root, which the tokens already honour, and remembers the visitor's choice in that browser only. The visitor can return to following the system.
- The toggle is a small control in the site header, drawn with the `theme` glyph and labelled for assistive technology ("Night chart" or "Day chart"). It is not a call to action and never brass.
- Without JavaScript the site follows the OS and the toggle is hidden.

## Consequences

- The KI Website adds the toggle; this repository changes no token.
- The local app keeps following the OS; its preview's toggle is unaffected.

## References

- docs/spec/colour.md and [GDR-KI-DESIGN-010](GDR-KI-DESIGN-010-night-as-the-reference-rendering.md).
