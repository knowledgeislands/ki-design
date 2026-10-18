---
title: Space, shape and layout
status: draft
updated: 2026-10-18
---

# Space, shape and layout

Whitespace is open sea and navigable distance. On the site be generous; in the app, density is the product. Spacing and radii are tokens in [`packages/tokens/tokens.json`](../../packages/tokens/tokens.json) (`space`, `radius`); this file holds how they are used, the borders and elevation rules, the grids, the app's density budget, the responsive rules and the site's structure, the Voyage and the Atlas.

## Spacing

The scale is 4 / 8 based and each step is named by its size in pixels: `--space-2`, `--space-4`, `--space-8`, `--space-12`, `--space-16`, `--space-24`, `--space-32`, `--space-48`, `--space-64`.

| Step | Typical use |
| --- | --- |
| `space-2` | Hairline offsets, chip inner gap |
| `space-4` | Icon-to-text in dense rows |
| `space-8` | Table cell vertical padding, small gaps |
| `space-12` | Table cell horizontal padding, control padding |
| `space-16` | Phone gutter, card padding (app) |
| `space-24` | Pane padding, card padding (site) |
| `space-32` | Between groups |
| `space-48` | Section padding on phones |
| `space-64` | Section padding on desktop |
| 96 px | Hero rhythm, "open sea" between Voyage chapters (not yet a token; see [OPEN.md](../decisions/OPEN.md)) |

In the app, never add space that costs Beacon rows.

## Radii

`--radius-sm` (4 px), `--radius-md` (8 px) and `--radius-lg` (16 px) are tokens.

| Radius | Use |
| --- | --- |
| `sm` | Chips, tags, inputs, buttons (app and site) |
| `md` | Site cards, panels, popovers |
| `lg` | Site feature panels, archetype cards, illustration frames |
| round (999 px) | Glyph roundels, journey step markers (not yet a token; see [OPEN.md](../decisions/OPEN.md)) |

The app uses `sm` almost exclusively; tables and panes are square-edged.

## Borders and elevation

- **Hairline only.** Borders are 1 px in `--rule` (separation) or `--boundary` (controls). Focus is a 2 px ring ([accessibility.md](accessibility.md)).
- **No drop shadows** in either dialect's UI. Elevation is shown by a hairline and a change of surface (`--paper` to mist or a wash), never by blur.
- **Deckled hairline frame** (site only): a parchment panel with a 1 px `--rule` outer line and a second 1 px line inset 4 px, corners optionally marked with a small brass tick. It is the printed-atlas frame.
- Painted art may carry soft shadows inside the picture; UI chrome never does.

## Grids and widths

| Context | Grid |
| --- | --- |
| Site, desktop | 12 columns, 24 px gutters, max content 1200 px; prose column max 68 ch (about 680 px) |
| Site, tablet | 8 columns, 24 px gutters |
| Site, phone | 4 columns, **16 px side gutter**, 16 px gutters |
| App, wide | 1440 px reference (a laptop given to the app); frame gutter 16 px |
| App, narrow | **720 px** reference (half a screen beside an editor); at 760 px or less the frame gutter narrows to 8 px |

## Density targets (app)

- At 800 px viewport height, the **Beacon shows at least 12 ranked rows** without scrolling, at both 1440 and 720 widths. This is asserted against the shipped stylesheet.
- A row is one line of `--text-base` (20 px) plus two row paddings plus one 1 px rule. Any change to these is a change to the density model.
- Shell glyphs (tabs, subject column) cost **zero rows**: they are sized to the existing line height.

## Responsive rules

1. **No horizontal page scroll**, ever, at any width, in either dialect. The only sideways scroller is the app's instrument tab bar, inside its own width, with no scrollbar drawn and an edge fade only while that edge hides tabs.
2. **Tables never become cards.** At narrow widths the least load-bearing columns drop (declared per table), rank and subject survive, and cells wrap ([components.md](components.md)).
3. Site at phone width: 16 px gutter; the hero map crops to the Capital and Port, cartouches collapse into a district list beneath, and the journey rail becomes a vertical list.
4. Maps scale inside their container; the container is covered by the no-horizontal-scroll test.
5. Touch targets are at least 44 × 44 px on the site. App controls follow the published control height (reference 28 px), because it is a pointer-first desktop tool.

## Site structure: the Voyage and the Atlas

The site has two halves ([GDR-KI-DESIGN-011](../decisions/GDR-KI-DESIGN-011-voyage-and-atlas.md)). Navigation: **Philosophy · Model · Arcadia · Landscapes · Docs · Projects**, with **Enter Arcadia** as the one brass call to action. Stable routes (`/install/ki`, `/harness/bootstrap`, `/specifications/…`) never move.

| Half | Read how | Pages |
| --- | --- | --- |
| **Voyage** | Once, in order, to understand | Home → Philosophy → Model → Arcadia → Landscapes → Create |
| **Atlas** | Returned to, to look things up | Field Guide (symbols, structures, terrain, roles, "How the map works"), Docs, Specifications, Projects / Journal |

Every Voyage page links to the Atlas entries it mentions; every Atlas entry links back to where the Voyage explains it.

| Page | Purpose | Key components |
| --- | --- | --- |
| Home | One-screen promise, then the journey | The painting as hero ([GDR-KI-DESIGN-014](../decisions/GDR-KI-DESIGN-014-the-painting-as-home-hero.md)) with district cartouches; "Knowledge is a civilisation question."; journey rail (The Problem · A New Paradigm · The Islands · Stewardship · Landscapes · Create); principle strip (six principles); "Tools change. Landscapes endure." banner |
| Philosophy | Information → Knowledge → Wisdom; the cycle | Three-layer island cross-section; tide-cycle diagram of Capture / Connect / Reflect |
| Model | Island, Capital, Territory, Archipelago, Agents | Living Map with legend; click a structure to read its concept |
| Arcadia | The reference island | The painting, then the Arcadia chart; districts link to source repositories |
| Landscapes | Archetypes | Filterable archetype cards: Engineering, Research, Creative, Learning, Enterprise, Personal, Community |
| Create | Start an island | Six-step wizard (archetype → governance → stewards & agents → landscape → ports → launch) ending in the real bootstrap command |
| Docs | Get started, `ki`, harness, prompting | Quiet parchment layout, glyph sidebar, section-header illustration only |
| Projects / Journal | Repositories and updates | Card per project with structure glyph and condition state |
