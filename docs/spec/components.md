---
title: Components
status: draft
updated: 2026-10-19
---

# Components

Only elements that both surfaces share become components: `<ki-glyph>` and `<ki-hexmap>` ([GDR-KI-DESIGN-012](../decisions/GDR-KI-DESIGN-012-only-two-shared-web-components.md)). Everything else, from buttons to cartouches to tables, is a pattern each surface builds from tokens. The components are code: [`packages/elements`](../../packages/elements/README.md) documents their attributes, properties and events, and the other packages are described in their own READMEs. This file holds the rules for the toolkit, the interface still proposed beyond v0, and the site and app patterns.

## The toolkit

- The two components are framework-neutral Custom Elements, built with **Lit** (_proposed_; spike KI-DESIGN-ELE-001), styled from tokens only. Custom properties pierce Shadow DOM, so light and night reach inside.
- On the site they are server-rendered with Declarative Shadow DOM, so every page reads without JavaScript.
- Each element exports its stylesheet as a string (`kiGlyphStyles`, `kiHexmapStyles`) so the app's density and contrast tests can read it.
- The components make no network calls.

| Layer | Package | What it is |
| --- | --- | --- |
| 1 | `@knowledgeislands/tokens` | DTCG JSON → CSS custom properties (`--color-*` for Tailwind v4 `@theme`, and the bare roles `--paper`, `--ink`, `--accent`…), a typed module and a SHA-256 digest |
| 2 | `@knowledgeislands/hexmap` | Pure TypeScript: axial and cube maths, layout, neighbour masks, pathing; `IslandMap` in, SVG string out; no DOM |
| 3 | `@knowledgeislands/elements` | Thin Lit wrappers adding interaction |
| — | `@knowledgeislands/icons`, `@knowledgeislands/symbols`, `@knowledgeislands/tiles` | Glyph sprite and typed name union; the symbol library; the tile contract and sets |

### The shared elements

The v0 interface is in the elements README: `<ki-glyph name size label>`, and `<ki-hexmap>` taking a map through `.map` or inline `src` JSON, with `size`, `.selected`, `theme` and a `ki-select` event. The rules:

- `<ki-glyph>` renders the optical size, not a scaled drawing, and inherits `currentColor` by default. Without `label` it is decorative (`aria-hidden`).
- `<ki-hexmap>` renders static SVG first; enhancement adds a roving tabindex and selection; a text equivalent is always rendered ([maps.md](maps.md#accessibility)).

Proposed beyond v0, not yet built:

- `<ki-glyph tone>`: `ink` · `muted` · `accent` · `warn` · `bad`.
- `<ki-hexmap>`: `renderer` (`flat` · `iso`), `tileset` (`ancient`; `modern` only for the frozen fixture and the flat renderer, [GDR-KI-DESIGN-038](../decisions/GDR-KI-DESIGN-038-ancient-is-the-only-isometric-tile-set-the-flat-chart-keeps-its-engraved-treatment.md)), `palette`, `layers` (space-separated: `terrain routes currents influence signals labels workers`), `window` (`7` · `14` · `30` days), `static` (no interaction), and `ki-hex-focus` and `ki-layer-change` events alongside selection.

### What stays outside the kit

- **Site only (patterns):** cartouche, journey rail, principle strip, archetype card. The site may build them as its own elements, outside `ki-design`.
- **App only (patterns):** status chip, tag, table with drop-columns, foot-of-view note, job switch, instrument tabs, the plan / confirm / receipt panel. They live under each instrument's root, per PDR-KI-OBSERVA-002.
- PDR-002's "shared values, never shared rendering" stands except for the two shared components. Moving the vendored tokens' source from `ki-website` to `ki-design`, with the glyphs, is recorded in [PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md). The shared-component exception is for a later Observatory decision record, not yet written.

## Site patterns (Chart)

| Pattern | Anatomy | Rules |
| --- | --- | --- |
| **Cartouche** | Translucent navy panel (navy at 82 %), 1 px gold hairline, `--radius-sm`; Cormorant SC `label` title in parchment; Inter `meta` subtitle in night muted; a 6 px gold dot on a leader line to its place | Labels a place on a map; at most 3 words plus a subtitle of at most 4 words; never floats free of a place; collapses to a list on phones |
| **Journey rail** | Six hex badges (56 px) joined by a hairline; number, title (Inter 600), one-line description (muted); current step in a navy badge with a gold ring | Always the canon sequence; links to its Voyage page; vertical list on phones |
| **Archetype card** | Painted thumbnail (Ancient set) 4:5 at top, `--radius-lg`, title in Cormorant `display-xs` on a navy scrim, one-line purpose in Inter | Filter chips above (All · Research · Engineering · Creative · Personal · Enterprise · Community); no ratings or counts |
| **Principle strip** | Six roundel glyphs on parchment, each with the principle's two halves on two lines ("Stewardship / over extraction") | Exact canon words and order; no added principles |
| **Painted hero** | Full-bleed painting of Arcadia; headline left in Cormorant `display-xl` parchment; brass rule; lead; primary brass call to action plus an outline one; district cartouches; the logo roundel in the header | 400 KB or less; headline never over busy art (scrim from the left at navy 0 → 70 %); a text list of districts beneath for no-JS and screen readers |
| **Parchment panel** | `--paper` with the deckled hairline frame ([layout.md](layout.md#borders-and-elevation)), Cormorant SC kicker with a brass rule beneath | The default container for Voyage content |
| **Buttons** | Primary: gold fill, ink text (6.1:1), `--radius-sm`. Secondary: 1 px boundary outline, ink or parchment text | One primary per view; sentence case; no icon-only buttons without labels |
| **Night toggle** | A small header control drawn with the `theme` glyph, labelled "Night chart" or "Day chart"; sets `data-theme` on the root and remembers the visitor's choice in that browser | Follows the OS until chosen, and can return to it; never brass, never a call to action; hidden without JavaScript ([GDR-KI-DESIGN-025](../decisions/GDR-KI-DESIGN-025-night-on-the-public-site-follow-the-os-with-a-manual-toggle.md)) |

## App patterns (Instrument)

| Pattern | Anatomy | Rules |
| --- | --- | --- |
| **Table with drop-columns** | Header row (muted `--text-sm`, no fill), rows separated by `--rule`, rank and subject columns first; each instrument **declares** which columns drop at 760 px or less | Tables never become cards and never scroll sideways; surviving cells wrap; a test requires the declaration |
| **Status chip on wash** | Role text (`--ok` / `--warn` / `--bad`) on its wash, `--radius-sm`, `--text-xs` 600, the word always present | A chip only where status asks for attention; a quiet value is a tag or plain text, so a chip always means something |
| **Tag** | Muted text in a 1 px muted outline, no fill | For labels that are values, not states |
| **Pane edge** | One `--rule` line | Never a shadow, never a double line |
| **Foot-of-view note** | `--text-xs` muted, below the data | Every ordering rule and legend sits here, under the data, not above it |
| **Status line** | Subject · summary · observed time on one line; truncates with full text on hover | The frame stays one height on every instrument |
| **Job switch** | Four text segments **Observe · Attend · Act · Extend**; current in accent text on a gold underline | Shows only that job's instruments; Act is visibly distinct (it mutates). See [GDR-KI-DESIGN-016](../decisions/GDR-KI-DESIGN-016-the-local-app-s-four-jobs.md) |
| **Instrument tabs** | A 14 px glyph before each title, one distinct glyph per tab ([PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md)): current = accent text on a gold underline; others muted | One row; scrolls inside its own width with an edge fade; the active tab kept clear of the fade |
| **Known Lands chart panel** | Flat `<ki-hexmap>` filling the pane; layer toggles and time window (7 / 14 / 30 days) above as controls with boundary edges; legend in the foot-of-view note; isometric toggle | Selecting an island applies the shell's **filter, not a scope**; positions stored; covered by the no-horizontal-scroll test |
| **Bridge: plan / confirm / receipt** | Plan pane: declared tier, every input visible, effect stated, scope named. Confirm: a single boundary-edged button naming the action ("Pull 3 repositories"). Receipt: outcome, counts, `YYYY-MM-DD HH:MM`, way in ("via loopback" / "via tailnet as …") | Every mutation goes through all three; no mutation from a row click; Act is absent over the tailnet ([GDR-KI-DESIGN-034](../decisions/GDR-KI-DESIGN-034-read-only-over-the-tailnet.md)); "Bridge" is written, never drawn: no bridge glyph ([GDR-KI-DESIGN-018](../decisions/GDR-KI-DESIGN-018-the-causeway-is-the-translation-symbol-bridge-names-the-act-command.md)); where this pattern and the app differ, the Observatory's [authority specification](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/specs/authority.md) wins |
| **Who is working** | A column with role glyph and worker name (`role-archivist` Claude Code) | A column, not a dashboard; evidence-sourced only |
