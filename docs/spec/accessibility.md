---
title: Accessibility
status: draft
updated: 2026-10-18
---

# Accessibility

These are the floors every surface holds, in light and night, in both dialects. A design that drops below one fails review. The contrast floors are held by tests in the token package, whose [README](../../packages/tokens/README.md#contrast-floors) lists the measured ratios; map accessibility is detailed in [maps.md](maps.md#accessibility).

| Area | Floor |
| --- | --- |
| Text contrast | At least **4.5:1** for every foreground role on its paper and on its wash, both themes, both dialects; held by test |
| Large display text (site, 24 px and above) | Still at least 4.5:1: Cormorant's thin strokes do not earn the large-text allowance |
| Control boundaries | At least **3:1** (`--boundary`) |
| Focus | Visible on every focusable element: a 2 px `--accent` outline with a 2 px offset (on gold buttons, a 2 px ink outline); on hexes, the hex outline; never removed |
| Keyboard | Everything operable by keyboard; logical tab order; a skip link on the site; maps use a roving tabindex with axial-neighbour arrows; the job switch and tabs follow the ARIA tabs pattern |
| Motion | `prefers-reduced-motion` gives frame 0 everywhere and instant transitions; no motion is ever required to understand state; nothing flashes more than 3 times a second |
| Images | Meaningful art has alt text describing what it shows _and_ means ("Arcadia: the Capital above the Port, ancient forest at the heart"); decorative art has `alt=""` |
| Language | `lang="en-GB"`; plain language; abbreviations expanded on first use |
| Zoom | Usable at 200 % zoom and 320 px CSS width without horizontal scroll |
| Colour | Never the only carrier of meaning: every status has a word, every terrain a pattern, every signal a shape |
| Maps | A text equivalent always rendered in the page |

The rule colour (`--rule`) is a decorative hairline and is deliberately not held to a floor; never use it for a control's edge.
