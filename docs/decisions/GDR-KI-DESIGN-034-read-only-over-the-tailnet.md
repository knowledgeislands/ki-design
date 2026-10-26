---
id: GDR-KI-DESIGN-034
title: 'Read-only over the tailnet'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-034: Read-only over the tailnet

## Context

Kit wants to open the local app from his other machines over his tailnet. Act mutates, and the app has no identity design yet beyond loopback. On 19 October 2026 Kit accepted the recommendation.

## Decision

**Over the tailnet the local app is read-only. Act stays on loopback until identity is designed.**

## Consequences

- Over the tailnet the Act job is absent, not disabled, and receipts name the way in ("via loopback" or "via tailnet as …").
- The full design is written as a product decision record in the Observatory.

## References

- docs/design-review/observatory/OBSERVATORY-DESIGN.md and docs/spec/components.md.
