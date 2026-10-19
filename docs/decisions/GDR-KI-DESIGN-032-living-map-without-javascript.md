---
id: GDR-KI-DESIGN-032
title: 'The Living Map without JavaScript'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-032: The Living Map without JavaScript

## Context

The Living Map is interactive. The question was what it shows without JavaScript. `<ki-hexmap>` already renders static SVG first, and the hero lists the districts in text. On 19 October 2026 Kit accepted the recommendation.

## Decision

**Without JavaScript the Living Map is the static SVG plus a text list of its districts.**

## Consequences

- The text list is the map's text equivalent in every case, as hard rule 12 already requires.
- Nothing on the map is reachable only through script.

## References

- [docs/spec/maps.md](../spec/maps.md) and [GDR-KI-DESIGN-012](GDR-KI-DESIGN-012-shared-web-components.md).
