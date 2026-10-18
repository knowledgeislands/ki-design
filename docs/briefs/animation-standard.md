# Standard: the animation clock

All animated tiles share one clock, so neighbouring tiles never drift out of step and a coastline animates as one sea.

| Rule | Value |
| --- | --- |
| Frame rate | 12 frames per second |
| Master cycle | 48 frames (4 seconds) |
| Allowed loop lengths | 4, 6, 8, 12, 16, 24 or 48 frames (divisors of 48, so every loop realigns every 4 s) |
| Frame index | `floor(t × 12) mod 48`, one value shared by every tile on screen |
| Still image | Frame 0: used under `prefers-reduced-motion`, in print, in the local app's tables, and as the thumbnail |
| Speed | Nothing faster than a 4-frame loop; tides, clouds and celestial motion use the full 48 |
| Sprite sheets | One row per condition state, one column per frame |
| Water edges | Animate in phase with their neighbours (same loop, same offset) |

What moves, by default:

| Element | Loop | Motion |
| --- | --- | --- |
| Sea and tide | 48 | Slow wave drift, foam breathing at the shore |
| Clouds and fog | 48 | Drift across a hex in one cycle |
| Lanterns and windows | 8 | Gentle flicker, never strobing |
| Lighthouse lamp | 24 | Slow sweep |
| Mill wheel, windmill | 12 | One turn |
| Smoke | 16 | Rise and fade |
| Sails and flags | 12 | Light flutter |

Motion language from canon: slow, intentional, fluid, tidal, orbital. Never bouncing, flashy or attention-seeking.
