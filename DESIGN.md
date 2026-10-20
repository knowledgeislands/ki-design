---
title: Knowledge Islands Design System
status: draft
version: 0.2.0
date: 2026-10-18
updated: 2026-10-19
owner: Kit (Kristopher Brown)
repository: ki-design
canon: ki-principal/Pillars/Aesthetics (prose canon); this repository is the machine-readable authority beside it
language: British English
---

# Knowledge Islands Design System

One visual world, a hand-drawn natural archipelago built on a hex grid with isometric structures, expressed in two dialects. The **Chart** is the public site, knowledgeislands.info: atmospheric, illustrated, narrative. The **Instrument** is the local app, working name Observatory, at `127.0.0.1:1675`: dense, legible, quietly themed. Both draw from one token set, one glyph set and one tile kit.

This file is the entry point. It holds the essence, the principles, the world in brief, the hard rules and the status words, and it says where everything else lives. Each area has its own file in [docs/spec/](docs/spec/README.md), and the values live in data.

## How to use this document

1. **Everyone:** read this file first. Then read only the spec file for the area you are working in; each is self-contained and opens with a summary. The [map at the end](#where-everything-lives) says which file holds what.
2. **AI designers (ChatGPT, Claude): read this file, then [world](docs/spec/world.md), [meaning](docs/spec/meaning.md) and [voice](docs/spec/voice.md), before producing anything.** Use the [prompt library](docs/briefs/prompt-library.md) for imagery. **Never invent meaning.** If a thing you want to draw has no entry in the symbol library, do not draw it; propose it, marked _proposed_.
3. **Data is the source of truth.** Token values, symbols, glyphs and tiles live in the packages. Prose points to them and never copies their tables. Where prose and data disagree, the data wins, unless a decision record says otherwise; open conflicts are listed in [OPEN.md](docs/decisions/OPEN.md).
4. **Status words are binding.** Use the four labels in [Status vocabulary](#status-vocabulary), always in that order.
5. **Pick a dialect first.** Site work follows the Chart; local-app work follows the Instrument and PDR-KI-OBSERVA-002, which is law for that dialect. Never mix them on one surface.
6. **Judge every output** against [Do and don't](#do-and-dont) and the contrast floors in [accessibility](docs/spec/accessibility.md) before calling it done.

## Essence

**What it is.** Knowledge Islands is a conceptual model for organising knowledge as a natural, evolving system. An **island** is a discrete, self-contained body of knowledge with boundaries and internal geography: in practice, a repository. Islands are governed together in **territories**, drawn as archipelagos, and all of them lie within the **Knowledge Islands Realm**. At the heart of each island is its **Capital**, the civic heart, holding the Library (canonical knowledge) and the Council Hall (governance). Knowledge Islands Principal, the island called **Arcadia**, is the Knowledge Island of Knowledge Islands: the legendary origin that holds the canonical model every other island derives its baseline from.

**Brand posture: calm intelligent infrastructure.** A navigable ecology of meaning, not a software product or a database. A modern atlas with environmental harmony in the manner of hand-painted animation backgrounds, and the gravity of the ancient library of Alexandria. Moss, slate, sea-glass and brass; soft daylight on warm paper; lantern-light at night. Settlements look grown rather than placed.

**The six canon principles** (use these exact words, in this order):

| # | Principle | What it means for design |
| --- | --- | --- |
| 1 | Stewardship over extraction | Show care and tending (condition, upkeep), never harvesting, scores or growth hacks |
| 2 | Wisdom over noise | Fewer, truer marks; whitespace as open sea; nothing decorative that carries no meaning |
| 3 | Navigation over consumption | Maps, routes and wayfinding before feeds and streams of cards |
| 4 | Continuity over disruption | Stable layouts (a repository stays where you learnt it was); slow motion; old things honoured as Ruins |
| 5 | Interconnectedness over fragmentation | Routes, currents and trade lanes visibly join things; every Voyage page links to its Atlas entries |
| 6 | Augmentation over automation | People and AI work side by side; AI is drawn as infrastructure, never as a humanoid |

**Knowledge and work at the centre; agents, human or AI, are workers in it.** Every screen answers "what is the state of the knowledge and the work?" before "what are the agents doing?". Agents (people, Claude, ChatGPT, Codex, Paperclip) are workers acting inside the realm, shown alongside one another by role, never the subject of the interface. In tables, who is working is a column, not a separate agents dashboard.

**One plan, local character.** Being a Knowledge Island means meeting a small set of expectations: the standards declared in `.ki.toml` and checked by `ki repo audit`, the five zones, a Capital, and governance through the Council Hall. Everything else belongs to the island: its tile set, palette, architectural family, culture of workers, extensions, even structures no one else has. The design shows the shared plan so islands stay legible to each other, and leaves the rest to the islanders.

## Principles of the design

- **Non-combative.** The symbol language never fortifies: no citadels, keeps, battlements or fortified towers, and no walls around the Capital. The Capital is a civic square, never a fortress. The Lighthouse keeps its tall form because it guides, not guards. Civic towers (a clock tower, a cloister tower) may stand as architecture, never fortified and never on the Capital ([GDR-KI-DESIGN-008](docs/decisions/GDR-KI-DESIGN-008-the-capital-and-non-combative.md), [GDR-KI-DESIGN-021](docs/decisions/GDR-KI-DESIGN-021-civic-towers.md)).
- **The painting is the legend; the chart is the map.** The painted Arcadia leads, as the home and `/arcadia/` hero. The engraved Modern chart follows it: on the site below the painting, in diagrams and in the local app ([GDR-KI-DESIGN-014](docs/decisions/GDR-KI-DESIGN-014-the-painting-as-home-hero.md)). Ancient is the only isometric tile set; the engraved treatment stays for flat top-down charts ([GDR-KI-DESIGN-038](docs/decisions/GDR-KI-DESIGN-038-ancient-is-the-isometric-set.md)).
- **Hex for logic, isometric for life.** The hex grid is the truth; the isometric painting is how that truth is shown. Every tile is data first and scenery second ([GDR-KI-DESIGN-003](docs/decisions/GDR-KI-DESIGN-003-hex-grid-geometry.md)).
- **Night is the reference rendering.** Judge night first, then light. Night is the same chart by lantern-light, not a separate theme ([GDR-KI-DESIGN-010](docs/decisions/GDR-KI-DESIGN-010-night-as-reference.md)).
- **Beauty meets truth.** Condition comes from evidence: a stale repository's workshop visibly weathers, so the map reports health without a chart. Condition is never a score.
- **70 % infographic clarity, 30 % illustrative warmth.** The home hero is the one place the painting leads; the local app is all clarity.
- **AI is infrastructure.** Show AI work as the things it moves and tends: vessels, lanterns, a turning waterwheel, an airship at its mast. Never a humanoid.

## The world in brief

- **Realm → territory → island → Capital.** The realm is the whole chart. A territory is an archipelago of islands governed together under one Capital. An island is a repository. Its Capital holds the Library and the Council Hall. The Map of Known Lands is the canonical chart of the realm.
- **Depth.** Elevation reads as maturity. From top to bottom: sky (guidance), ancient forest and high stone (wisdom, never built on), inhabited land (knowledge), coast and shallows (information), sea and currents (data).
- **The cycle.** **Capture** at the Port, **Connect** along routes and Streams, **Reflect** at the Observatory.
- **Zones.** A repository's own folders draw its island: Pillars in the Library, Calendar beside the Capital square (a clock tower or sundial), Resources beside the Library, Streams as rivers, Admin as the Council Hall (Governance) and the Mill (Operations). `+` and `-` are the Port's arrivals and departures quays.
- **The Port** is entry and exchange in any mode, drawn as districts: dock, rail depot, airport (a mooring mast with an airship) and customs house. The Harbour is retired.
- **The Lighthouse** means guidance. **The Council Hall** means governance. **The Observatory** means insight and is the local app's mark.
- **The Causeway** is the translation layer. "Bridge" names only the local app's Act command and is never drawn ([GDR-KI-DESIGN-018](docs/decisions/GDR-KI-DESIGN-018-the-causeway-and-the-bridge.md)). **The Mill** is operational systems, the drawn form of Admin/Operations.

The full world is in [world.md](docs/spec/world.md); every symbol is in [meaning.md](docs/spec/meaning.md).

## Hard rules

1. **Meaning is canon.** It changes in `ki-principal` first, through its Enactment Process; this repository follows ([governance](docs/spec/governance.md)).
2. **Tokens only.** Every colour, space and radius is a token. Never pure black (`#000`) or pure white (`#fff`).
3. **Contrast floors** in light and night: text at least 4.5:1 on its paper and its wash, even for large display text; control boundaries at least 3:1. Brass text on parchment is text gold, never gold.
4. **Colour is never the only carrier.** Every status has a word, every terrain a pattern, every signal a shape.
5. **One brass call to action per view.** Gold elsewhere means attention.
6. **No horizontal page scroll**, ever. **Tables never become cards**: columns drop and cells wrap.
7. **Density:** at 800 px viewport height the Beacon shows at least 12 ranked rows, at 1440 and 720 px widths. Glyphs cost zero rows.
8. **Pointy-top hexes, 2:1 dimetric, light from the top-left.** Painted art is never rotated.
9. **The tile-set contract is complete or it is nothing:** a set is valid only when it covers every id, every structure in every condition state, at 1× and 2×.
10. **The clock:** 12 fps, a 48-frame cycle, loops of 4, 6, 8, 12, 16, 24 or 48 frames. Frame 0 is the still, used under reduced motion, in print and in the local app.
11. **Only two shared components:** `<ki-glyph>` and `<ki-hexmap>`. Everything else is a pattern each surface builds from tokens.
12. **Every map has a text equivalent** rendered in the page, and is keyboard-operable along axial neighbours.
13. **No emoji, no hype, British English.** Sentence case; dates `YYYY-MM-DD`; times `YYYY-MM-DD HH:MM`.
14. **Never draw** humanoid robots, neon, cyberpunk, crystals, magic glow, monsters, weapons, game UI or scores, text baked into art, or walls and towers around the Capital ([illustration](docs/spec/illustration.md#never-draw)).
15. **Generated art is unlicensed** until the art-licensing decision is recorded.

## Status vocabulary

Every symbol, tile and decision carries one of four labels, always in this order: **Official · Agreed · Proposed · Open** ([GDR-KI-DESIGN-002](docs/decisions/GDR-KI-DESIGN-002-status-labels.md)).

| Label | Meaning |
| --- | --- |
| **Official** | Ratified in `ki-principal` |
| **Agreed** | Agreed with the owner (most in the 18 October 2026 brief), being enacted into `ki-principal`. Where an official and an agreed item conflict, the agreed one wins |
| **Proposed** | May be used in drafts and mockups, never shipped as settled |
| **Open** | A question still to answer, listed in [OPEN.md](docs/decisions/OPEN.md), and drawn as [meaning.md](docs/spec/meaning.md#open-items-how-to-draw-until-decided) says meanwhile |

The labels were Canon and Decided before 18 October 2026. The data keys are `official`, `agreed` and `proposed`; Open belongs to questions, not symbols. "Canonical knowledge" stays the Knowledge Islands term for ratified knowledge.

## Two dialects

| | Chart (site) | Instrument (app) |
| --- | --- | --- |
| Feel | Atmospheric, illustrated, narrative | Dense, legible, quietly themed |
| Type | Cormorant Garamond (24 px and up), Cormorant SC labels, Inter body | System stacks; nothing fetched |
| Art | The painting leads; the Modern chart follows | Flat Modern only, as data |
| Structure | The Voyage and the Atlas | Observe · Attend · Act · Extend |
| Space | Generous: whitespace is open sea | Density is the product |

## Do and don't

| Area | Do | Don't |
| --- | --- | --- |
| Meaning | Use only meanings in the symbol library; mark new ones _proposed_ | Invent symbols, or reuse one for a second meaning |
| Port | Draw a Port with its modes as districts | Write or draw "Harbour" |
| Capital | An open civic square holding the Library and the Council Hall | Walls, towers, keeps, battlements; "Citadel" |
| Translation / Act | The Causeway for translation; "Bridge" written only for the Act command | A bridge glyph for Act; "Bridge" for translation |
| Mark | The canon roundel as the logo | The compass, or the observatory dome, in place of the logo |
| Terrain | The twelve terrain ids; fog as a map state | Ruins, ancient forest or "uncharted" as terrain |
| Guidance / governance | Lighthouse = guidance; Council Hall = governance | Use the lighthouse for governance |
| Agents | Workers by role, on islands; AI as infrastructure | Humanoid robots; agents as islands; AI as hero or threat |
| Motion | Tide shimmer, drifting cloud, lantern flicker on the shared clock; frame 0 when reduced | Particles, bounce, auto-playing animation in tools |
| Progress | Condition states: thriving · quiet · weathered · ruined | Scores, "map completion 34 %", "96 % harmony", XP or progress bars |
| Colour | Tokens only; text gold for brass text on parchment | Gold text on parchment; pure black or white; colour alone |
| Type | Cormorant at 24 px and up; Cormorant SC labels tracked; Inter body | Cormorant body text; Playfair; sci-fi or playful faces |
| Tables | Drop columns, wrap cells | Turn rows into cards; horizontal scroll |
| Density | 12 Beacon rows at 800 px; glyphs cost zero rows | Padding that costs rows |
| Edges | Rule for separation, boundary for controls | Control edges in the rule colour |
| Icons | 24 grid, 1.5 stroke, round caps, line only, single-colour (brass applied by the consumer) | Emoji; filled duotone icons; third-party logos as glyphs |
| Tiles | Pointy-top hex, 2:1 dimetric, top-left light, hex plinth | Square plinths on the hex map; rotated painted art |
| Ancient forest | Leave it untouched | Build on it |
| Retired work | Ruins, honoured | Hide or delete it from the map |
| Copy | British English, calm declaratives, sentence case | Hype, exclamation marks, US spelling |
| Maps | Text equivalent, keyboard along neighbours, patterns | Map-only information |

## Where everything lives

**Data (the source of truth)**

| What | Where |
| --- | --- |
| Tokens: colour, fonts, space, radius, motion | [`packages/tokens/tokens.json`](packages/tokens/tokens.json) |
| Symbol library: meanings, statuses, glyphs, retired ids | [`packages/symbols/src/symbols.ts`](packages/symbols/src/symbols.ts) |
| Glyphs (73) | [`packages/icons/svg/`](packages/icons/svg/) |
| Tile contract and validator | [`packages/tiles/src/contract.ts`](packages/tiles/src/contract.ts) |
| Modern tile set | [`packages/tiles/sets/modern/manifest.json`](packages/tiles/sets/modern/manifest.json) |
| Hex map model and renderer | [`packages/hexmap`](packages/hexmap/README.md) |
| Shared components | [`packages/elements`](packages/elements/README.md) |

**The spec, one file per area** ([index](docs/spec/README.md))

| Area | File |
| --- | --- |
| Realm, territories, islands, depth, the cycle | [world.md](docs/spec/world.md) |
| How each symbol is drawn and surfaces; rules beyond the data | [meaning.md](docs/spec/meaning.md) |
| Glossary | [glossary.md](docs/spec/glossary.md) |
| Tone, words, examples, naming | [voice.md](docs/spec/voice.md) |
| Palette use, roles, washes, sea, terrain, island palettes | [colour.md](docs/spec/colour.md) |
| Two dialects, type scales, figures and dates | [typography.md](docs/spec/typography.md) |
| Spacing, radii, borders, grids, density, the Voyage and the Atlas | [layout.md](docs/spec/layout.md) |
| Glyph rules, roundels, value icons | [iconography.md](docs/spec/iconography.md) |
| The three directions, 70 / 30, agents, never draw | [illustration.md](docs/spec/illustration.md) |
| Geometry, footprints, decals, layering, building standards, budgets | [tiles-and-buildings.md](docs/spec/tiles-and-buildings.md) |
| The clock, what moves, UI motion | [motion.md](docs/spec/motion.md) |
| The two components; site and app patterns | [components.md](docs/spec/components.md) |
| Three maps, layers, keyboard, the IslandMap model | [maps.md](docs/spec/maps.md) |
| Floors | [accessibility.md](docs/spec/accessibility.md) |
| Canon and this repository, decisions, versioning, judging | [governance.md](docs/spec/governance.md) |
| Where each section of the old DESIGN.md went | [MIGRATION.md](docs/spec/MIGRATION.md) |

**Briefs, decisions and reviews**

| What | Where |
| --- | --- |
| Briefs for art and tiles, the prompt library, glyph briefs | [docs/briefs/](docs/briefs/README.md) |
| Decision records, one per decision | [docs/decisions/](docs/decisions/README.md) |
| Open questions, with recommendations (two, on 19 October) | [docs/decisions/OPEN.md](docs/decisions/OPEN.md) |
| Review boards and the Observatory design | [docs/design-review/](docs/design-review/README.md) |
| Prose canon: Visual Style, Symbol Library, Isometric Tiles, Logo | `ki-principal/Pillars/Aesthetics` |
