---
title: Typography
status: draft
updated: 2026-10-19
---

# Typography

Type has two dialects. The **Chart** (the public site) sets Cormorant Garamond for display, Cormorant SC for labels and Inter for body. The **Instrument** (the local app) uses system stacks only, fetches nothing, and sets fixed pixel leading so row heights can be summed by test. The font families are tokens in [`packages/tokens/tokens.json`](../../packages/tokens/tokens.json) (`font.site`, `font.app`, `font.mono`); the type scales below are not yet tokens. The choice is recorded in [GDR-KI-DESIGN-006](../decisions/GDR-KI-DESIGN-006-fonts-per-dialect.md).

## Two dialects

| | Chart (site) | Instrument (app) |
| --- | --- | --- |
| Display | **Cormorant Garamond** 500–600, at **24 px and above only** (`font.site.display`) | System serif (`font.app.serif`) |
| Labels, cartouches, map labels | **Cormorant SC** 500–600, tracked **0.14–0.18 em**, with a brass hairline beneath (`font.site.smallcaps`) | Monospace for identifiers and map labels; no small caps |
| Body | **Inter** 400 / 500 / 600 (`font.site.body`) | System sans (`font.app.sans`) |
| Code / identifiers | Monospace (`font.mono`) | The same stack |
| Leading | Ratio (unitless) | **Fixed pixel** leading |
| Loading | Google Fonts or self-hosted WOFF2, `font-display: swap`, subset Latin | **Nothing fetched or bundled** |

The exact fallback stacks are the token values, which are authoritative: prose quotes them, never the other way round ([GDR-KI-DESIGN-023](../decisions/GDR-KI-DESIGN-023-token-additions.md)). Cormorant replaces Playfair Display on the site. Cormorant's small x-height makes it unfit below 24 px: never set body, buttons or table text in it.

## Site type scale

| Token | Face | Size / line height | Weight | Tracking | Use |
| --- | --- | --- | --- | --- | --- |
| `display-xl` | Cormorant Garamond | `clamp(40px, 6vw, 72px)` / 1.05 | 500 | −0.01 em | Home headline |
| `display-l` | Cormorant Garamond | 48 / 1.1 (36 on phones) | 500 | 0 | Page title |
| `display-m` | Cormorant Garamond | 36 / 1.15 (30 on phones) | 500 | 0 | Section head |
| `display-s` | Cormorant Garamond | 28 / 1.2 | 600 | 0 | Sub-section, card title on hero |
| `display-xs` | Cormorant Garamond | 24 / 1.25 | 600 | 0 | Smallest permitted Cormorant |
| `label-l` | Cormorant SC | 18 / 1.3 | 600 | 0.14 em | Section kicker ("THE JOURNEY") |
| `label` | Cormorant SC | 15 / 1.3 | 600 | 0.16 em | Cartouche, nav item |
| `label-s` | Cormorant SC | 13 / 1.3 | 600 | 0.18 em | Map label, legend head |
| `lead` | Inter | 20 / 1.55 | 400 | 0 | Intro paragraph |
| `body` | Inter | 17 / 1.65 | 400 | 0 | Running text (max 68 ch) |
| `body-s` | Inter | 15 / 1.55 | 400 | 0 | Cards, captions |
| `meta` | Inter | 13 / 1.45 | 500 | 0.01 em | Dates, footnotes |
| `code` | monospace | 15 / 1.55 | 400 | 0 | Commands (`/install/ki`) |

Cormorant SC labels at 13–15 px are permitted only because small caps and tracking hold them open; they never carry body text. Map labels that must go below 13 px switch to Inter 12/16 at weight 500, in capitals tracked 0.08 em (never synthesised small caps).

## App type scale (reference values)

Fixed pixel leading. The shell's published scale is authoritative; these are the reference values a designer should mock up with. Only tokens from the scale may be used: a raw pixel length fails a test.

| Token | Face | Size / leading | Use |
| --- | --- | --- | --- |
| `--text-xs` | sans | 12 / 16 | Foot-of-view notes, chip text |
| `--text-sm` | sans | 13 / 18 | Secondary cells, status line |
| `--text-base` | sans | 14 / 20 | Table cells, controls, body |
| `--text-md` | sans | 16 / 22 | Pane body, plan text |
| `--text-lg` | serif | 20 / 26 | Instrument title |
| `--text-xl` | serif | 24 / 30 | Empty-state heading, detail title |
| `--font-identifier` | mono | inherits size | Repository ids, record ids, hashes, paths, commands, map labels |
| `--figures` | `font-variant-numeric: tabular-nums` | — | Counts, dates, times, ranks |

## Figures and dates

- Counts, dates, times and ranks use **tabular figures** in both dialects (`font-variant-numeric: tabular-nums lining-nums`), so columns align digit under digit.
- Time format: **`YYYY-MM-DD HH:MM`**, local, 24-hour; it sorts as it reads. Date alone: `YYYY-MM-DD`. On the site's narrative pages a long form ("18 October 2026") is allowed in running prose only.
- Percentages only for real measurements, never for scores.
