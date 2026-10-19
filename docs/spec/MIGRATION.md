# Migration from the single-file DESIGN.md

On 18 October 2026 the single-file DESIGN.md (about 17,400 words, sections 1–16 and two appendices) was split into a short entry point, one spec file per area, the prompt library and glyph briefs in `docs/briefs/`, and one decision record per decision. This table maps every old section to its new home, so an old reference such as "DESIGN.md 5.6" can be followed. The old file is in git history at commit `cf250cb` and earlier. Below the table is the drift found between the old text and the data, and how each item was settled.

## Where each section went

| Old section | New home |
| --- | --- |
| Front matter, title, intro | [DESIGN.md](../../DESIGN.md) (front matter kept; `updated` added) |
| How to use this document | [DESIGN.md](../../DESIGN.md#how-to-use-this-document) |
| 1 Essence (what it is, brand posture, six principles, knowledge and work at the centre) | [DESIGN.md](../../DESIGN.md#essence) |
| 1 One plan, local character | [DESIGN.md](../../DESIGN.md#essence) and [world.md](world.md#one-plan-local-character) |
| 2.1 From realm to island | [world.md](world.md#from-realm-to-island); decision [GDR-KI-DESIGN-015](../decisions/GDR-KI-DESIGN-015-islands-and-archipelagos.md) |
| 2.2 Depth: layers and durability | [world.md](world.md#depth-layers-and-durability) |
| 2.3 The cycle | [world.md](world.md#the-cycle) |
| 2.4 Hex for logic, isometric for life | [world.md](world.md#hex-for-logic-isometric-for-life); [GDR-KI-DESIGN-003](../decisions/GDR-KI-DESIGN-003-hex-grid-geometry.md) |
| 3 Meaning (intro) | [meaning.md](meaning.md) |
| 3.1 The canonical symbols | Meanings and statuses: `packages/symbols/src/symbols.ts`. Drawing and surfaces: [meaning.md](meaning.md#the-canonical-symbols-how-they-are-drawn). The GDR-010/011 supersession note: [meaning.md](meaning.md#what-the-port-and-the-capital-superseded) |
| 3.2 Zones and working areas | [meaning.md](meaning.md#zones-and-working-areas) |
| 3.3 The Capital and other structures | [meaning.md](meaning.md#the-capital-and-other-structures); [GDR-KI-DESIGN-008](../decisions/GDR-KI-DESIGN-008-the-capital-and-non-combative.md), [GDR-KI-DESIGN-009](../decisions/GDR-KI-DESIGN-009-the-observatory-mark.md) |
| 3.4 Port modes | [meaning.md](meaning.md#port-modes); [GDR-KI-DESIGN-007](../decisions/GDR-KI-DESIGN-007-the-port.md) |
| 3.5 Signals | [meaning.md](meaning.md#signals) |
| 3.6 Condition states | [meaning.md](meaning.md#condition-states) |
| 3.7 Workers and steward roles | [meaning.md](meaning.md#workers-and-steward-roles) |
| 3.8 Physical places | [meaning.md](meaning.md#physical-places-never-drawn-as-land) |
| 3.9 Open items in meaning | [meaning.md](meaning.md#open-items-how-to-draw-until-decided); the questions in [OPEN.md](../decisions/OPEN.md) |
| 4.1–4.5 Voice and copy | [voice.md](voice.md) |
| 5.1 Core palette | Values: `tokens.json` `color.core`. Use: [colour.md](colour.md#the-core-palette-what-each-colour-is-for) |
| 5.2 Semantic roles | Values: `color.role`; ratios: tokens README. Rules: [colour.md](colour.md#semantic-roles); [GDR-KI-DESIGN-010](../decisions/GDR-KI-DESIGN-010-night-as-reference.md) |
| 5.3 Washes | Values: `color.wash`. Rule: [colour.md](colour.md#washes) |
| 5.4 Rule vs boundary | [colour.md](colour.md#rule-and-boundary) |
| 5.5 Sea fills | Values: `color.sea`. Use: [colour.md](colour.md#sea-fills-maps) |
| 5.6 Terrain palette | Values: `color.terrain`; night: `nightTerrain()`; patterns: `packages/hexmap/src/patterns.ts`. Rules and fog: [colour.md](colour.md#terrain-fills-flat) |
| 5.7 Per-island palettes | [colour.md](colour.md#per-island-palettes) (not yet tokens) |
| 5.8 Usage rules | [colour.md](colour.md#usage-rules); summary in [DESIGN.md](../../DESIGN.md#hard-rules) |
| 6.1 Two dialects | [typography.md](typography.md#two-dialects); [GDR-KI-DESIGN-006](../decisions/GDR-KI-DESIGN-006-fonts-per-dialect.md) |
| 6.2 Site type scale | [typography.md](typography.md#site-type-scale) |
| 6.3 App type scale | [typography.md](typography.md#app-type-scale-reference-values) |
| 6.4 Figures and dates | [typography.md](typography.md#figures-and-dates) |
| 7.1 Spacing scale | Values: `tokens.json` `space`. Use: [layout.md](layout.md#spacing) |
| 7.2 Radii | Values: `radius`. Use: [layout.md](layout.md#radii) |
| 7.3 Borders and elevation | [layout.md](layout.md#borders-and-elevation) |
| 7.4 Grids and widths | [layout.md](layout.md#grids-and-widths) |
| 7.5 Density targets | [layout.md](layout.md#density-targets-app) |
| 7.6 Responsive rules | [layout.md](layout.md#responsive-rules) |
| 7.7 Site structure: the Voyage and the Atlas | [layout.md](layout.md#site-structure-the-voyage-and-the-atlas); [GDR-KI-DESIGN-011](../decisions/GDR-KI-DESIGN-011-voyage-and-atlas.md) |
| 8.1 The line-glyph specification | [iconography.md](iconography.md#the-line-glyph-specification); the enforced parts in the icons README |
| 8.1 Roundels | [iconography.md](iconography.md#roundels) |
| 8.2 Glyph inventory | The glyphs: `packages/icons/svg/`. The one-line drawing briefs: [docs/briefs/glyph-briefs.md](../briefs/glyph-briefs.md). Rules: [iconography.md](iconography.md#rules-for-the-inventory) |
| 8.2 Value icons | [iconography.md](iconography.md#value-icons) |
| 9.1 The three directions; reference images in words | [illustration.md](illustration.md#the-three-directions); [GDR-KI-DESIGN-004](../decisions/GDR-KI-DESIGN-004-tile-sets-and-explainer-style.md) |
| 9.2 The 70 / 30 balance | [illustration.md](illustration.md#the-70--30-balance) |
| 9.3 Agent representation | [illustration.md](illustration.md#agent-representation) |
| 9.4 Never draw | [illustration.md](illustration.md#never-draw) |
| 10.1 Geometry | Numbers: `packages/tiles/src/contract.ts` and `packages/hexmap`. Rules: [tiles-and-buildings.md](tiles-and-buildings.md#geometry) |
| 10.2 Footprints, and the Capital compound | [tiles-and-buildings.md](tiles-and-buildings.md#footprints) |
| 10.3 Terrain inventory | Ids: the contract. Notes: [tiles-and-buildings.md](tiles-and-buildings.md#terrain) |
| 10.4 Structure inventory, decals, connectors, beyond the contract | Ids: the contract; drawn tiles: the Modern manifest. Rules: [tiles-and-buildings.md](tiles-and-buildings.md#structures) and [proposed beyond the contract](tiles-and-buildings.md#proposed-beyond-the-contract) |
| 10.5 Condition states as decals | [tiles-and-buildings.md](tiles-and-buildings.md#condition-states-as-decals) |
| 10.6 Auto-tiling per edge | [tiles-and-buildings.md](tiles-and-buildings.md#auto-tiling-per-edge) |
| 10.7 Layering | [tiles-and-buildings.md](tiles-and-buildings.md#layering) |
| 10.8 Building standards and families | [tiles-and-buildings.md](tiles-and-buildings.md#building-standards); [building standards brief](../briefs/building-standards.md) |
| 10.9 The tile-set contract and manifest fields | The schema: the contract and the tiles README. Rules: [tiles-and-buildings.md](tiles-and-buildings.md#the-tile-set-contract) |
| 10.10 Budgets | [tiles-and-buildings.md](tiles-and-buildings.md#budgets) |
| 11.1 The clock | [motion.md](motion.md#the-clock); [GDR-KI-DESIGN-005](../decisions/GDR-KI-DESIGN-005-animation-clock.md) |
| 11.2 What moves | [motion.md](motion.md#what-moves) |
| 11.3 UI motion | [motion.md](motion.md#ui-motion) |
| 12.1 The web components toolkit | [components.md](components.md#the-toolkit); the v0 interface in the elements README; [GDR-KI-DESIGN-012](../decisions/GDR-KI-DESIGN-012-shared-web-components.md), [GDR-KI-DESIGN-013](../decisions/GDR-KI-DESIGN-013-tokens-vendored-by-digest.md) |
| 12.2 Site patterns | [components.md](components.md#site-patterns-chart) |
| 12.3 App patterns | [components.md](components.md#app-patterns-instrument); [GDR-KI-DESIGN-016](../decisions/GDR-KI-DESIGN-016-the-four-jobs.md) |
| 13.1 Three maps | [maps.md](maps.md#three-maps) |
| 13.2 Layers | [maps.md](maps.md#layers) |
| 13.3 How islands are typed | [maps.md](maps.md#how-islands-are-typed-app) |
| 13.4 Interaction and keyboard | [maps.md](maps.md#interaction-and-keyboard) |
| 13.5 Accessibility (maps) | [maps.md](maps.md#accessibility) |
| 13.6 The IslandMap model | The schema: `packages/hexmap/src/model.ts`. The proposed fuller model: [maps.md](maps.md#the-islandmap-model) |
| 14 Prompt library (14.1–14.8) | [docs/briefs/prompt-library.md](../briefs/prompt-library.md) |
| 15 Accessibility | [accessibility.md](accessibility.md) |
| 16.1 Canon vs this repository | [governance.md](governance.md#canon-and-this-repository); [GDR-KI-DESIGN-017](../decisions/GDR-KI-DESIGN-017-ki-design-home.md) |
| 16.2 How meaning changes | [governance.md](governance.md#how-meaning-changes) |
| 16.3 Versioning | [governance.md](governance.md#versioning) |
| 16.4 How designs are judged | [governance.md](governance.md#how-designs-are-judged) |
| 16.5 Open questions | [docs/decisions/OPEN.md](../decisions/OPEN.md) |
| 16.5 Decided items | One record each in [docs/decisions/](../decisions/README.md), GDR-KI-DESIGN-003 to 017 |
| Appendix A: Do / Don't | [DESIGN.md](../../DESIGN.md#do-and-dont) |
| Appendix B: Glossary | [glossary.md](glossary.md) |

## Drift resolved on the way

Data won, except where noted.

| Item | Old DESIGN.md | Data | Now |
| --- | --- | --- | --- |
| Night terrain fills | A column of hand-written night values | `nightTerrain()`: each day fill mixed 45 % into navy | The formula; the column is gone |
| Terrain ocean | `--terrain-ocean` = `--sea` | `color.terrain.ocean` = `#2f5878`; the flat renderer paints ocean in the theme's `sea` | Both stated: flat ocean is `sea`, `#2f5878` is the Modern isometric water. Renamed `color.tile.water`, with `color.terrain.ocean` as its alias ([GDR-KI-DESIGN-023](../decisions/GDR-KI-DESIGN-023-token-additions.md)) |
| Spacing names | `--space-0` to `--space-10` | `--space-2` to `--space-64`, named by pixels | Pixel names. `space-0` dropped; the 96 px hero step is `space-96` ([GDR-KI-DESIGN-023](../decisions/GDR-KI-DESIGN-023-token-additions.md)) |
| Radius round | `--radius-round` (999) | Not a token | `radius-round` ([GDR-KI-DESIGN-023](../decisions/GDR-KI-DESIGN-023-token-additions.md)) |
| Fog colour | `--fog` | Not a token | `color.fog` ([GDR-KI-DESIGN-023](../decisions/GDR-KI-DESIGN-023-token-additions.md)) |
| Token names | `--ok-wash`, `--terrain-marsh` | `--wash-ok`, `--color-terrain-marsh` | The build's names |
| App font stacks | `"New York", "Iowan Old Style"` and similar | The stacks in `font.app` and `font.mono` | The token stacks |
| Symbol statuses | Lantern agreed, Fog official, Bridge official, Storm proposed, Cartographic grid official | Lantern official, Fog proposed, Bridge agreed, Storm official, Cartographic grid agreed | Aligned with `ki-principal`: Causeway (was Bridge) and Cartographic grid official, Lantern agreed, Storm and Fog proposed ([GDR-KI-DESIGN-020](../decisions/GDR-KI-DESIGN-020-symbols-follow-ki-principal.md)) |
| Symbol meanings | Pillars, Streams, Territory, Dock and others worded differently | `symbols.ts` | `symbols.ts` follows `ki-principal`'s wording ([GDR-KI-DESIGN-020](../decisions/GDR-KI-DESIGN-020-symbols-follow-ki-principal.md)) |
| Glyph count | 62 + 6 value icons (68) | 72 files, including `capital` | 73 since `causeway` was added; `celestial` is `celestial-guide`; `arrow`, `refresh`, `hourglass` and `lantern` are drawn |
| Glyph fills | Small brass accents allowed | The lint forbids fills | No fills; consumers apply brass ([GDR-KI-DESIGN-024](../decisions/GDR-KI-DESIGN-024-single-colour-glyphs.md)) |
| Package name | `@knowledgeislands/glyphs` | `@knowledgeislands/icons` | `icons` |
| Tile ids | `terrain.marsh` | Keyed `terrain/marsh` | The slash form |
| Structure count | "17 structures" | 16 in the contract | 16 |
| Variants | Every structure 3 | Contract at least 1; Modern v0 has 1; briefs: 3 for terrain and hero structures, 1 for others | The briefs' target and the contract's minimum, stated separately |
| Footprints | Council Hall and Workshop pairs; Library, Port and ancient forest with options | Modern: all single except Port (pair) and Capital (flower); contract fixes only the Capital | Footprints are per set, apart from the Capital ([GDR-KI-DESIGN-022](../decisions/GDR-KI-DESIGN-022-tile-loops-and-footprints.md)) |
| Manifest fields | `flat`, `family`, `palette`, `fps`, `edge`, anchor as hex + px | The contract's `TileEntry` | The contract; the extra fields are listed as proposed |
| Loop lengths | Lighthouse 24, mill 12 (as the animation standard) | Manifest: lighthouse 12, mill 16 | The manifest now says 24 and 12 ([GDR-KI-DESIGN-022](../decisions/GDR-KI-DESIGN-022-tile-loops-and-footprints.md)) |
| `<ki-hexmap>` interface | Attributes `renderer`, `tileset`, `layers`, `window`, `static`; event `ki-hex-select` | v0: `.map`, `src`, `size`, `.selected`, `theme`; event `ki-select` | v0 from the README; the rest listed as proposed |
| IslandMap model | Territories, islands, cells, structures, workers | v0: id, name, hexes, routes, labels | v0 from `model.ts`; the fuller model kept as proposed |
| Map keyboard | Home, Escape and Shift-selection | v0: arrows along neighbours, Enter, Space, click | Both stated; the missing keys noted as not yet built |
| Home hero | Cartographic hero (painting) | Live site: the painting, then the chart | Recorded as [GDR-KI-DESIGN-014](../decisions/GDR-KI-DESIGN-014-the-painting-as-home-hero.md) |
| Changes to this repository | "Pull request" | Kit works on `main`, without pull requests | "A change on `main`" |
