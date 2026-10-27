# The design spec

The Knowledge Islands design system, one file per area. Each file is self-contained and opens with a one-paragraph summary, so a person or an agent can read only what the task needs. Start with [DESIGN.md](../../DESIGN.md), the short entry point: the essence, the principles, the hard rules and the status words.

The values are data, not prose: the tokens, the symbol library, the glyphs, the tile contract and the tile sets live in [`packages/`](../../packages/). These files point to that data and add only the rules the data cannot express.

## Files

| File | Covers |
| --- | --- |
| [world.md](world.md) | Realm, territory, island and Capital; depth and durability; the cycle; hex for logic, isometric for life |
| [meaning.md](meaning.md) | How each symbol is drawn and where it surfaces; zones, structures, Port modes, signals, condition states, roles; how to draw open items |
| [glossary.md](glossary.md) | Every term, defined in a line |
| [voice.md](voice.md) | Tone, words to use and avoid, sentence style, examples, naming conventions |
| [colour.md](colour.md) | What each colour is for; roles, washes, rule and boundary, sea and terrain fills, fog, per-island palettes, usage rules |
| [typography.md](typography.md) | The two dialects' type, the site and app type scales, figures and dates |
| [layout.md](layout.md) | Spacing, radii, borders and elevation, grids, density, responsive rules, the Voyage and the Atlas |
| [iconography.md](iconography.md) | The line-glyph specification, roundels, inventory rules, value icons |
| [illustration.md](illustration.md) | Modern, Ancient and the illustrated explainer; the painting and the chart; 70 / 30; agents; never draw |
| [tiles-and-buildings.md](tiles-and-buildings.md) | Geometry, footprints and the Capital, terrain and structures, decals, auto-tiling, layering, building standards, the contract, budgets |
| [hex-terrain-composition.md](hex-terrain-composition.md) | Proposed corner heights, compounds and edge connections; review scope and pilot |
| [hex-terrain-mathematics.md](hex-terrain-mathematics.md) | Local coordinate, height, boundary and compound algorithms for the proposal |
| [motion.md](motion.md) | The clock, what moves, UI motion |
| [components.md](components.md) | `<ki-glyph>` and `<ki-hexmap>`, the package layers, site patterns, app patterns |
| [maps.md](maps.md) | The three maps, layers, how islands are typed, keyboard, map accessibility, the IslandMap model |
| [accessibility.md](accessibility.md) | The floors every surface holds |
| [governance.md](governance.md) | Canon and this repository, how meaning changes, decision records, versioning, how designs are judged |
| [MIGRATION.md](MIGRATION.md) | Where every section of the old single-file DESIGN.md now lives, and the drift resolved on the way |

## Elsewhere

- **Prompts and art briefs:** [docs/briefs/](../briefs/README.md), including the [prompt library](../briefs/prompt-library.md) and the [glyph briefs](../briefs/glyph-briefs.md).
- **Decisions:** [docs/decisions/](../decisions/README.md), one record per decision; open questions in [OPEN.md](../OPEN.md).
- **Meaning canon:** `ki-principal/Pillars/Aesthetics` and `Pillars/Philosophy`.
