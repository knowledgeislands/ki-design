---
id: GDR-KI-DESIGN-031
title: 'Arcadia drawn from a dated snapshot'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-031: Arcadia drawn from a dated snapshot

## Context

The site's Arcadia page could publish the territory roster and freshness from live data at build time, or stay illustrative. On 19 October 2026 Kit accepted the recommendation.

## Decision

**The Arcadia page draws from a dated snapshot taken at build time: public islands only, stamped "Charted `YYYY-MM-DD`".**

## Consequences

- Private repositories never appear on the public page; the snapshot filters them before rendering.
- The page never claims to be live: the stamp says when it was charted.
- Until the KI Website builds the snapshot, the page stays illustrative.

## References

- docs/spec/maps.md and [GDR-KI-DESIGN-014](GDR-KI-DESIGN-014-the-painting-as-the-home-hero.md).
