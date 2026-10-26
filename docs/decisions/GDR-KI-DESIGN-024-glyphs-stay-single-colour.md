---
id: GDR-KI-DESIGN-024
title: 'Glyphs stay single-colour'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-024: Glyphs stay single-colour

## Context

The old DESIGN.md allowed small brass accents in glyphs (a lamp, a flame, a star point, up to 10 % of the live area). The icon lint forbids fills and colours, and no glyph has one. On 19 October 2026 Kit accepted the recommendation.

## Decision

**Glyph files stay single-colour line drawings in `currentColor`. Where a brass accent matters, such as the Beacon's flame, the consumer applies it, never the glyph file.**

## Consequences

- `lintIcon` keeps forbidding fills and colours.
- A consumer that wants an accent colours one element of its own copy of the glyph, or lays a small brass mark over it, within the 10 % guide.
- Briefs that mention brass or rust describe the consumer's accent, not the file.

## References

- docs/spec/iconography.md and the icons README.
