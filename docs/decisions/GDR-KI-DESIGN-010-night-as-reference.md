---
id: GDR-KI-DESIGN-010
title: 'Night as the reference rendering'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-010: Night as the reference rendering

## Context

The palette has two papers: parchment by day and navy by night. Designs need one rendering to judge first. An operator beside an editor usually works with a dark screen, and the design brief kept dark first-class: navy paper with lantern-gold attention reads as the chart at night.

## Decision

**Night is the reference rendering.** Mock up and judge night first, then check light. Night is the same chart by lantern-light, not a separate theme: the same hues, adjusted lightness.

## Consequences

- Every colour role holds its contrast floor in both themes; night is checked first.
- The app shell follows the operating system's theme. The public site follows it too, with a small manual toggle ([GDR-KI-DESIGN-025](GDR-KI-DESIGN-025-night-on-the-site.md)).
- Night in painted art is a tint layer, the one place a filter is allowed, not separate art.

## References

- [docs/spec/colour.md](../spec/colour.md#semantic-roles).
