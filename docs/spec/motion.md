---
title: Motion
status: draft
updated: 2026-10-19
---

# Motion

Motion is slow, tidal and intentional. Every animation runs on one shared clock of 12 frames per second with a 48-frame master cycle, so loops realign every four seconds and neighbouring tiles never drift. Frame 0 is always the still. The clock is a token (`motion.fps`, `motion.cycle` and its allowed loops in [`packages/tokens/tokens.json`](../../packages/tokens/tokens.json)) and is recorded in [GDR-KI-DESIGN-005](../decisions/GDR-KI-DESIGN-005-the-animation-clock.md); the brief for animators is [animation-standard.md](../briefs/animation-standard.md). This file holds the rules, the defaults for what moves, and UI motion.

## The clock

- One global clock at **12 frames per second**; one master cycle of **48 frames (4 s)**.
- Every loop is a divisor of 48: **4, 6, 8, 12, 16, 24 or 48** frames. All loops realign every 4 s.
- Frame index = `floor(t × 12) mod 48`, shared by every tile on screen. A loop of length _n_ shows `frame mod n`.
- Nothing faster than a 4-frame loop. Tidal and celestial motion use the full 48.
- Frame 0 is the still: used under `prefers-reduced-motion`, in print, in the local app and as the thumbnail.

## What moves

The defaults follow the animation standard. A tile's actual loop is declared in its set's manifest.

| Element | Loop (frames) | Motion |
| --- | --- | --- |
| Sea and tide | 48 | Slow wave drift and glints; foam breathing at the shore, in phase across edges |
| Clouds and fog banks | 48 | Drift across one hex per cycle |
| Lanterns and windows | 8 | Gentle flicker, never strobing |
| Lighthouse lamp | 24 | Slow sweep |
| Mill wheel, windmill | 12 | One full turn per loop |
| Chimney smoke | 16 | Rise and fade |
| Sails and flags | 12 | Light flutter |
| Airship at mast (_proposed_) | 48 | Slight sway |
| Vessels on routes (_proposed_) | — | Moved along the lane path at no more than 1 hex per 4 s |

The Modern manifest declares these loops, the lighthouse at 24 and the mill at 12 ([GDR-KI-DESIGN-022](../decisions/GDR-KI-DESIGN-022-tile-loops-follow-the-animation-standard-footprints-are-each-set-s-choice.md)); no frames beyond frame 0 are drawn yet.

## UI motion

- Easing `cubic-bezier(0.4, 0, 0.2, 1)` (`motion.easing.standard`, `--motion-easing`). Durations: 160 ms for a state change, 240 ms for a panel, 400 ms for a map pan or zoom (`motion.duration.state`, `.panel`, `.map`; `--motion-duration-*`). See [GDR-KI-DESIGN-023](../decisions/GDR-KI-DESIGN-023-token-additions-and-the-isometric-water-token-tokens-0-2-0.md).
- No bounce, no overshoot, no spring, no parallax, no auto-playing carousels.
- Site scroll reveals: a 12 px rise with fade, once, never on text the reader is already reading.
- The local app has **no motion beyond state change**.
- Under `prefers-reduced-motion: reduce`, every animation shows frame 0 and every transition is instant.
- No motion is ever required to understand state, and nothing flashes more than three times a second ([accessibility.md](accessibility.md)).
