---
title: Components
status: draft
updated: 2026-11-14
---

# Components

Tessera documents its parts by atomic level: tokens, atoms, molecules, organisms, templates and pages (ATOMIC-DESIGN). Only elements that both surfaces share become web components: `<tessera-glyph>`, an atom, and `<tessera-hexmap>`, an organism ([GDR-KI-DESIGN-012](../decisions/GDR-KI-DESIGN-012-only-two-shared-web-components.md)). Everything else, from buttons to cartouches to tables, is a pattern each surface builds from tokens. The components are code: [`packages/tessera`](../../packages/tessera/README.md) documents their attributes, properties and events, its `custom-elements.json` publishes them, and [Storybook](../../apps/storybook/) shows each part on its own at its level. This file holds the component library, the rules for the toolkit, the interface still proposed beyond v0, and the site and app patterns.

## The component library

One row per component (COMPONENT-LIBRARY). Each package is vendored and locked on its own; a level with no row has no component yet.

| Component | Level | Signature | Owns | Does not own | Hand-offs |
| --- | --- | --- | --- | --- | --- |
| Design tokens | Tokens | `tessera-tokens`: `tokens.json` (DTCG); `tokens.css`, `theme.css`; `tokens`, `renderCss()`, `contrastRatio()` | Colour roles in light and night, washes, terrain and sea, type, space, radius, motion; the contrast floors | Meaning, which is canon in `ki-principal`; any rendering | Every other package reads its values; surfaces take `tokens.css` or the Tailwind theme |
| Glyph set | Tokens | `tessera-icons`: `iconNames`, `iconBodies`, `iconSvg(name, { size, label })`, `sprite()`; `svg/*.svg` | Line glyphs on the 24 grid at 1.5 stroke, single-colour, and their lint | Which glyph stands for which symbol (`tessera-symbols`); colour, which the consumer gives | `<tessera-glyph>` and the hex map draw its bodies; the symbol library names them |
| Symbol library | Tokens | `tessera-symbols`: `symbols`, `byId`, `byCategory`, `resolveSymbol(id)` | Every canonical symbol as data: id, name, meaning mirrored from canon, status, category, glyph | The meaning itself (canon in `ki-principal`); drawings | The site's Field Guide and the app's legends read it |
| Tile sets | Tokens | `tessera-tiles`: `validateTileSet(manifest)`, the required inventory; `sets/modern/*` | The tile-set contract and the drawn sets: every id, in every condition state, at 1× and 2× | Map layout and projection (`tessera-hexmap`) | The isometric renderers and the site's plates draw from a valid set |
| Glyph | Atom | `<tessera-glyph name size label>` | One glyph at its optical size, in `currentColor`; decorative without `label` | The drawing (`tessera-icons`); colour and tone | Sites and apps place it inline; the Observatory draws its tabs and subjects with the same bodies |
| — | Molecule | None yet | — | — | — |
| Hex map | Organism | `<tessera-hexmap .map src size theme .glyph .selected>`, event `tessera-select` (`{ q, r, structure }`), CSS `--ink`, `--paper`, `--accent`, `--font-body` | A flat, keyboard-navigable chart of one `islandmap/v1` map: roving focus, selection, the text equivalent | Geometry and SVG (`tessera-hexmap`); what selection means to the page | Hands selection to its page through `tessera-select`; the glyph resolver is injected |
| Hex map engine | Organism (renderer) | `tessera-hexmap`: `layoutFlat`, `renderFlatSvg`, `renderFlatLayers`, `layoutArchipelago`, `renderArchipelagoSvg`, `validateIslandMap`; axial and dimetric geometry | Hex maths, the `islandmap/v1` model, deterministic SVG for flat charts and archipelagos, with no DOM | Glyph drawings (injected), interaction (`<tessera-hexmap>`) | Sites render at build time; `<tessera-hexmap>` and the Observatory's Known Lands draw with it |
| Observatory preview | Template | `<observatory-preview>` in `apps/storybook/observatory/`, reading through `useReader(reader)` | The shell of the local app in Tessera: the four jobs, instruments and the Map of Known Lands, read-only | The Observatory's data and its actions; it is a template, never vendored | Shows the app patterns below on an invented sample estate; the Observatory itself owns its build |
| Site preview | Page | `apps/storybook/site-preview/index.html` and `field-guide.html` | The Voyage home and the Atlas Field Guide drawn with Tessera: the hero chart, plates and marks | The live site and its copy | The site vendors the hero, the Arcadia plate, the logo roundel and the favicon from here |

## The toolkit

- The two components are framework-neutral Custom Elements, built with **Lit** (_proposed_; spike KI-DESIGN-ELE-001), styled from tokens only. Custom properties pierce Shadow DOM, so light and night reach inside.
- On the site they are server-rendered with Declarative Shadow DOM, so every page reads without JavaScript.
- Each element exports its stylesheet as a string (`tesseraGlyphStyles`, `tesseraHexmapStyles`) so the app's density and contrast tests can read it.
- The components make no network calls.
- `packages/tessera/custom-elements.json` is generated by the Custom Elements Manifest analyser (`bun run self:manifest`) and kept current by `bun run test`; internal state is left out.

### The shared elements

The v0 interface is in the elements README: `<tessera-glyph name size label>`, and `<tessera-hexmap>` taking a map through `.map` or inline `src` JSON, with `size`, `.selected`, `theme` and a `tessera-select` event. The rules:

- `<tessera-glyph>` renders the optical size, not a scaled drawing, and inherits `currentColor` by default. Without `label` it is decorative (`aria-hidden`).
- `<tessera-hexmap>` renders static SVG first; enhancement adds a roving tabindex and selection; a text equivalent is always rendered ([maps.md](maps.md#accessibility)).

Proposed beyond v0, not yet built:

- `<tessera-glyph tone>`: `ink` · `muted` · `accent` · `warn` · `bad`.
- `<tessera-hexmap>`: `renderer` (`flat` · `iso`), `tileset` (`ancient`; `modern` only for the frozen fixture and the flat renderer, [GDR-KI-DESIGN-038](../decisions/GDR-KI-DESIGN-038-ancient-is-the-only-isometric-tile-set-the-flat-chart-keeps-its-engraved-treatment.md)), `palette`, `layers` (space-separated: `terrain routes currents influence signals labels workers`), `window` (`7` · `14` · `30` days), `static` (no interaction), and `ki-hex-focus` and `ki-layer-change` events alongside selection.

### What stays outside the kit

- **Site only (patterns):** cartouche, journey rail, principle strip, archetype card. The site may build them as its own elements, outside Tessera.
- **App only (patterns):** status chip, tag, table with drop-columns, foot-of-view note, job switch, instrument tabs, the plan / confirm / receipt panel. They live under each instrument's root, per PDR-KI-OBSERVA-002.
- PDR-002's "shared values, never shared rendering" stands except for the two shared components. Moving the vendored tokens' source from `ki-website` to Tessera (then `ki-design`), with the glyphs, is recorded in [PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md). The shared-component exception is for a later Observatory decision record, not yet written.

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
| **Known Lands chart panel** | Flat `<tessera-hexmap>` filling the pane; layer toggles and time window (7 / 14 / 30 days) above as controls with boundary edges; legend in the foot-of-view note; isometric toggle | Selecting an island applies the shell's **filter, not a scope**; positions stored; covered by the no-horizontal-scroll test |
| **Bridge: plan / confirm / receipt** | Plan pane: declared tier, every input visible, effect stated, scope named. Confirm: a single boundary-edged button naming the action ("Pull 3 repositories"). Receipt: outcome, counts, `YYYY-MM-DD HH:MM`, way in ("via loopback" / "via tailnet as …") | Every mutation goes through all three; no mutation from a row click; Act is absent over the tailnet ([GDR-KI-DESIGN-034](../decisions/GDR-KI-DESIGN-034-read-only-over-the-tailnet.md)); "Bridge" is written, never drawn: no bridge glyph ([GDR-KI-DESIGN-018](../decisions/GDR-KI-DESIGN-018-the-causeway-is-the-translation-symbol-bridge-names-the-act-command.md)); where this pattern and the app differ, the Observatory's [authority specification](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/specs/authority.md) wins |
| **Who is working** | A column with role glyph and worker name (`role-archivist` Claude Code) | A column, not a dashboard; evidence-sourced only |
