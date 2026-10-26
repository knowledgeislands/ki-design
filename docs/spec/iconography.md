---
title: Iconography
status: draft
updated: 2026-10-19
---

# Iconography

Glyphs are engraved, cartographic line drawings on a 24 px grid, in `currentColor`, with no fills. They label places, instruments, roles and values on both surfaces. The glyphs themselves are data: the SVGs in [`packages/icons/svg/`](../../packages/icons/svg/) (78 today, including `capital`), the generated name list in `packages/icons/src/icons.generated.ts`, and the drawing contract that `lintIcon` enforces, described in the [icons README](../../packages/icons/README.md). This file holds the rules the files cannot carry: optical sizes, colour, style, what is forbidden, labelling, roundels and the value icons. The one-line drawing brief for each glyph is in [docs/briefs/glyph-briefs.md](../briefs/glyph-briefs.md).

## The line-glyph specification

| Property | Rule |
| --- | --- |
| Grid | 24 × 24 px artboard, `viewBox="0 0 24 24"`; a 2 px safe margin on every side, so the live area is 20 × 20 (enforced by `lintIcon`) |
| Stroke | 1.5 px at 24 px, round caps and round joins; the stroke scales with the glyph (enforced by `lintIcon`) |
| Optical sizes | **16, 20 and 24 px**. At 16 px redraw with fewer details (drop windows and inner lines) and stroke 1.25 px, snapped to the pixel grid; at 20 px stroke 1.5 px; never scale a 24 px drawing below 20 px, except in the app shell: the Observatory draws the 24 px drawings at **14 px** before each tab title and Beacon subject ([PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md)) until small-size redraws exist. Only the 24 px drawings exist today |
| Colour | `currentColor`: **ink on paper** in light; **parchment on navy** at night |
| Fills | **None** in the glyph files (enforced by `lintIcon`): glyphs stay single-colour. Where a brass accent matters (the Beacon's flame, a lamp, a star point; up to 10 % of the live area), the **consumer** applies it, never the glyph file ([GDR-KI-DESIGN-024](../decisions/GDR-KI-DESIGN-024-glyphs-stay-single-colour.md)) |
| Style | Engraved, cartographic: straight sides and gentle arcs. Perspective is front elevation or slight three-quarter, never isometric. No gradients, no shading, no outline-plus-fill duotone |
| Forbidden | Emoji; brand logos of third parties in the glyph set; weapons; faces with expressions; robot heads |
| Delivery | One SVG sprite (`<symbol id="ki-…">`) with a typed name union; `<ki-glyph>` renders it ([components.md](components.md)) |
| Labelling | Decorative glyphs are `aria-hidden="true"`; meaningful glyphs carry a label |

## Roundels

The site may use glyphs inside a **roundel**: a circle of 1 px brass hairline at 40 px or 56 px, with the glyph at 24 px centred. Roundels serve the journey rail, the principle strip and the Field Guide. The Illustrated explainer style may colour the roundel's interior with a single per-role tint at 15 % ([illustration.md](illustration.md)). The app never uses roundels.

## Rules for the inventory

- **Ids** are kebab-case nouns, matching the tile name where both exist (`council-hall`, `rail-depot`). The file name is the id.
- **Roles are drawn as tools, not faces**, in the glyph set. Figures appear only in illustration.
- **Every Official or Agreed symbol has a glyph**, by test in `packages/symbols`; a territory is drawn with `archipelago`, and Proposed symbols may wait.
- **Retired glyphs stay but mean nothing.** `citadel` and `tower` remain in the package, mapped to no symbol (GDR-KI-PRINCIPAL-011). The Capital has its own civic glyph, `capital`.
- **`beacon` is not `lighthouse`.** The Beacon is a lantern with a brass flame, the Observatory's lamp; the lighthouse is guidance. They must stay distinct at small sizes.
- **The compass is not the logo.** `compass` is the orientation motif.
- **Adding a glyph** follows the steps in the icons README: draw to the contract, build (which lints), test, and regenerate the contact sheet.

## Value icons

Value icons carry canon meanings from the Symbol Library sheet. They label principles and values, never places.

| Value | Meaning | Glyph |
| --- | --- | --- |
| Library | Knowledge resources | `library` (reused) |
| Governance | Stewardship and ethics | `council-hall` (reused) |
| Trust | Security and reliability | `value-trust` |
| Community | People and collaboration | `value-community` |
| Growth | Emergence and evolution | `value-growth` |
| Exploration | Discovery and curiosity | `value-exploration` |
| Creation | Ideas and expression | `value-creation` |
| Sustainability | Balance and regeneration | `value-sustainability` |
