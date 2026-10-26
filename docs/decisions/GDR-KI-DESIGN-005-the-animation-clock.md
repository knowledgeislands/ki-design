---
id: GDR-KI-DESIGN-005
title: 'The animation clock'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-005: The animation clock

## Context

Animated tiles sit side by side on one map. If each loop kept its own time, neighbouring water edges and lights would drift out of step. Motion should also stay slow, in keeping with Continuity over disruption.

## Decision

**All animation runs on one global clock: 12 frames per second, with a master cycle of 48 frames (4 s).**

- Every loop is a divisor of 48: 4, 6, 8, 12, 16, 24 or 48 frames, so all loops realign every 4 s.
- The frame index is `floor(t × 12) mod 48`, shared by every tile on screen; a loop of length _n_ shows `frame mod n`.
- Nothing is faster than a 4-frame loop. Tides and celestial motion use the full 48.
- Frame 0 is the still image: it is shown under reduced motion, in print, in the local app and as the thumbnail.

## Consequences

- The clock is a token (`motion.fps`, `motion.cycle` and its allowed loops), and `validateTileSet` rejects any other loop length.
- Animators work to the animation standard brief; each tile declares its loop in its set's manifest.
- The local app shows frame 0 only.

## References

- docs/spec/motion.md.
- Animation standard.
