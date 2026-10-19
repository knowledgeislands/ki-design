# Knowledge Islands — Design Brief

Oct 18, 2026 · @Kit

> **Dated 18 October 2026 and kept as written.** Kit's later answers win where this differs: the Capital replaced the Citadel and the Tower (GDR-KI-PRINCIPAL-011), the Causeway replaced the Bridge as the translation symbol so that "Bridge" names only the Act command, the Mill replaced the Engine house, and the open questions were answered on 19 October as [GDR-KI-DESIGN-018 to 036](../decisions/README.md).

Knowledge Islands gets one visual world — a hand-drawn, natural archipelago built on a hex grid with isometric structures — expressed in two dialects: a rich, atmospheric public site at knowledgeislands.info and a dense, legible local Observatory. Both draw from one shared token set and one tile kit.

Every concept is mapped once in the Concept atlas tab.

**Where the work lives.** The repository `knowledgeislands/ki-design` (public) holds `DESIGN.md` — the design system's entry point, written to be read cold by people, the local app or ChatGPT, with one file per area in `docs/spec/` — plus the briefs in `docs/briefs/` (tile sets, building and animation standards, the picture of Arcadia, the explainer style, reference images), the toolkit packages, roadmap items, and a read-only preview of the restructured local app in `examples/observatory-preview/`.

## Scope

This brief sets the visual direction for every Knowledge Islands surface and the tooling that produces its assets. It decides the world, the shared tokens, the tile kit and the shape of each surface; it does not fix final artwork.

| Surface | Repo | Reader | Job | Dialect |
| --- | --- | --- | --- | --- |
| Public site — knowledgeislands.info | `apps-knowledgeislands.info` (Eleventy + Tailwind) | Newcomers, adopters, contributors | Explain the model, invite the journey, publish canonical routes (`/install/ki`, `/harness/bootstrap`) | **Chart** — atmospheric, illustrated, narrative |
| Observatory — 127.0.0.1:1675 | `apps-observatory.local` (Bun, instrument shell) | The operator, beside their editor | Observe the estate, rank attention, run governed operations | **Instrument** — dense, legible, quietly themed |
| Shared kit (new) | Proposed `ki-design` package or Design System artifact | Both apps, decks, diagrams | One source for tokens, iconography, tiles and structures | Core |

Out of scope: changing canonical ownership. The website still vendors source-labelled material; the Observatory still copies tokens by digest (PDR-KI-OBSERVA-002), now from the shared kit rather than from `ki-website` directly.

## Where we are

Both surfaces already share a cartographic palette, but neither shows the world: the site tells the island story in text and cards, and the Observatory is a well-governed table with no sense of place.

**knowledgeislands.info today**

- Strong copy and a clear model: Information → Knowledge → Wisdom; Capture (Harbour) → Connect (Routes) → Reflect (Observatory); the Capital with Library, Council Hall, Streams, Harbour; Island → Territory → Archipelago.
- Visual layer is thin: navy hero, a faint dome silhouette, parchment sections, emoji in the Capital diagram, one `og-image.png` and no illustration assets.
- Tokens in `apps/site/src/assets/css/tokens.css`: ocean `#1b3a5c`, navy `#0f2440`, forest `#2d5a3d`, moss `#4a7a5a`, sandstone `#c4a882`, parchment `#f5efe0`, teal `#317070`, gold `#c8963c`, ink `#1a2030`; Playfair Display + Inter. Light only.

**Observatory today**

- 14 instruments in one shell: Beacon, Trade routes, Roadmap, Sessions, Review queue, Decisions, Knowledge Bases, Documents, Artifacts, Repositories, Activity, MCP servers, Automation, Rig.
- PDR-KI-OBSERVA-002 is a mature design language: light = printed chart, dark = chart at night; meaning roles (`--accent`, `--ok`, `--warn`, `--bad`) with washes; WCAG floors held by test; 12 Beacon rows at 800 px height; 720 px half-screen width; tables never become cards.
- It explicitly puts character in type, colour and metaphor, not ornament or animation. This brief keeps that rule and adds place without breaking density.
- The Trade routes map is the one spatial instrument; it rendered empty for the estate at 03:27, so the map has no design to inherit yet.

**The references you sent** set the target: an isometric island under a hex lattice, labelled districts (Observatory, Archives, Steward's Council, Harbours, Wilds, Builders' Quarter), a six-step journey, archetype cards, a Living Map with legend, a Create-your-island wizard, principle glyphs, and a catalogue of terrain, structures and steward classes.

## The world

The world is a living archipelago drawn as a naturalist's chart: the hex grid is the truth, the isometric painting is how that truth is shown. Every tile is data first and scenery second.

**Principle: hex for logic, isometric for life.** A hex holds identity, terrain, owner, layers and adjacency; routes and influence are computed on the grid. The isometric render adds height, buildings, weather and light. The same hex map can render flat (Observatory, print, small screens) or isometric (hero, Living Map) without changing the data.

**The Realm and the Map of Known Lands.** The standard world is the **Knowledge Islands Realm**. Within it lie territories, drawn geographically: a territory is mostly one contiguous region, though an island may sit apart from it as an exclave. The canonical chart of it all is the **Map of Known Lands** (after `Admin/Governance/Known Lands.md`); “estate” is only the local word for the places visited most often. Later realms may join the map.

**One plan, local character.** Every territory keeps its own character. Being a Knowledge Island means meeting a small set of expectations — the standards it declares in `.ki.toml` and that `ki repo audit` checks (the five zones, a Capital, governance through the Council Hall) — not looking the same. Everything else is the territory's own: its palette option, its architectural family, its culture of workers, its extensions, even structures no one else has. The map shows the shared plan so islands stay legible to each other, and leaves the rest to the islanders. (A philosophy point first; the design follows it.)

**Depth, not just surface.** The map has vertical meaning, following the philosophy's layers and their durability:

| Layer | Knowledge | Drawn as | Durability |
| --- | --- | --- | --- |
| Sky | Long-range guidance | Celestial guide, constellations, weather | Changes slowly, guides everything |
| Ancient forest and high stone | Wisdom | Old-growth heart, mountains | Outlives its makers |
| Inhabited land | Knowledge | Settlements, structures, roads | Tended, changes with use |
| Coast and shallows | Information | Ports, beaches, reefs | Arrives and is sorted |
| Sea and currents | Data | Open water, currents, the deep | Raw, constantly moving |

Elevation therefore reads as maturity, as canon already says, and the sea floor and sky are layers the map can show, not just backdrop.

**The Capital.** At the heart of each island stands the Capital, holding its two civic functions: the **Library** (canonical knowledge) and the **Council Hall** (governance — a parliament or Capitol, decisions not storage). It is drawn civic and welcoming, a square and never a fortress. The Lighthouse remains a coastal symbol of guidance on the public site; the Observatory remains the symbol of insight and is the local app's mark. (This brief first proposed a Citadel and a Tower; GDR-KI-PRINCIPAL-011 retired the Citadel and dropped the Tower.)

**Living tiles: one animation clock.** Animation is eventually part of the world (tide, smoke, lanterns, sails, turning mills), so every animated asset follows one standard so tiles stay in step when placed side by side:

- One global clock at **12 frames per second**; one master cycle of **48 frames (4 s)**.
- Every loop is a divisor of 48 — 4, 6, 8, 12, 16, 24 or 48 frames — so all loops realign every 4 s and neighbouring tiles never drift.
- Frame index = `floor(t × 12) mod 48`, shared by every tile on screen; water edges animate in phase with their neighbours.
- Sprite sheets per asset, one row per condition state; frame 0 is the still image used under `prefers-reduced-motion`, in print and in the Observatory's tables.
- Slow by canon: nothing faster than a 4-frame loop; tidal and celestial motion use the full 48.

**Canon first.** `ki-principal/Pillars/Aesthetics` already defines the brand: Visual Style (tone, palette, typography direction, motion, the 70% infographic / 30% illustrative balance, the master image prompt), the Symbol Library (16 symbols with fixed meanings), Isometric Tiles (two asset sheets), Diagrams and the Logo. This brief implements that canon; where it proposes something new, it says so, and the change goes back into the pillar.

**Mood.** Calm intelligent infrastructure — a modern atlas with Ghibli-like environmental harmony and an Alexandrian library's gravity. Moss, slate, sea-glass and brass; soft daylight on warm paper, lantern-light at night. Settlements look grown rather than placed. Never cyberpunk, neon, hacker-dark, stock-corporate or cartoonish.

**Symbolic layer.** The canonical symbols carry the meaning; the world arranges them:

- **Island** is a domain, **Archipelago** a federation, **Route** a relationship, **Trade Route** collaboration.
- **Lighthouse** is guidance (the Beacon); Council Hall is governance; **Observatory** is insight; **Celestial Guide** is long-range orientation.
- **Harbour** **(now Port) is the point of entry and exchange in any mode — dock, rail depot, airport, customs house; Bridge is** a translation layer.
- **Current** is information flow; **Weave** cross-domain synthesis.
- **Reef** is risk and ambiguity; **Terrain elevation** is depth and maturity; the **Ancient Forest** is wisdom, never built on; mountains and stone are stable foundational knowledge, jungle and new growth are emerging knowledge.
- Proposed additions: **Ruins** for retired knowledge (honoured, not hidden) and the **compass rose** as the mark of the Realm's orientation (it is the logo's own motif, so not a stewardship mark) — orientation, not ownership.

| Do | Don't |
| --- | --- |
| Hand-painted texture, ink linework, restrained gold | Glossy 3D, neon, bloom, sci-fi HUDs |
| Labels as cartouches on the map | Floating tooltips everywhere |
| Calm motion: tide shimmer, drifting cloud, lantern flicker (all respect `prefers-reduced-motion`) | Particle effects, auto-playing animation in tools |
| Diverse, grounded steward figures | Fantasy armour, weapons, monsters, crystals, magic glow, temples; game scores (“map completion 34%”, “96% harmony”), XP or progress bars |
| Night palette as the same chart by lantern-light | A separate “gamer” dark mode |

## Design system

One core, two dialects. The core owns values; each surface owns its rendering — the same rule PDR-KI-OBSERVA-002 already applies between instruments.

**Layer 1 — Core tokens (shared, versioned, digest-checked).** Keep today's palette verbatim and add what the world needs:

| Group | Tokens | Note |
| --- | --- | --- |
| Sea & sky | navy `#0f2440`, ocean `#1b3a5c`, teal `#317070`, mist `#eef1f5` | Existing |
| Land | forest `#2d5a3d`, moss `#4a7a5a`, sandstone `#c4a882` | Existing |
| Paper & ink | parchment `#f5efe0`, ink `#1a2030`, ink-light `#4a5568`, border `#d4c9b4` | Existing |
| Brass | gold `#c8963c` (+ text-gold `#8a5a12` from the Observatory) | Promote the Observatory's derived value to core; the site's gold text on parchment is 2.32:1 today and fails the floor, so the site adopts text-gold |
| Hazard | rust `#9b2c1c` | Promote from the Observatory |
| Terrain (new) | `--terrain-forest`, `-meadow`, `-hills`, `-mountain`, `-coast`, `-river`, `-marsh`, `-snow`, `-desert`, `-volcanic`, `-ruins`, `-uncharted` | Flat-render fills; isometric art is painted to match |
| Night (new) | Dark values from PDR-KI-OBSERVA-002 | Promote to core so the public site gains a night chart too |

**Layer 2 — Semantic roles.** `--paper`, `--ink`, `--muted`, `--rule`, `--boundary`, `--accent`, `--ok`, `--warn`, `--bad` and washes, with the contrast table from PDR-KI-OBSERVA-002 as the floor for both surfaces.

**Layer 3 — Dialects.**

|  | Chart (public site) | Instrument (Observatory) |
| --- | --- | --- |
| Display type | Cormorant Garamond for headlines at 24 px and above, Cormorant SC for cartouches and map labels; replaces Playfair Display | System serif stack (unchanged) |
| Body | Inter | System sans |
| Labels | Tracked small caps, brass rule beneath | Monospace for identifiers, tabular figures |
| Surfaces | Full-bleed painted maps, parchment panels with deckled hairline frames | Flat paper, single rules, washes for status |
| Iconography | Engraved glyphs (compass, anchor, tower, tome, lantern) | Same glyph set at 16/20 px, line-only |
| Motion | Calm ambient, scroll reveals | None beyond state change |
| Theme | Light by default, night chart available | Follows OS; dark is first-class |

**Glyph set.** One set of \~40 line glyphs drawn on a 24 px grid with a 1.5 px stroke, covering the canonical symbols (listed in the Field Guide), the eight value icons on the Symbol Library sheet (Library, Governance, Trust, Community, Growth, Exploration, Creation, Sustainability), steward roles and instrument tabs. Used as SVG sprites on both surfaces; replaces emoji on the site.

## The tile kit

Every structure on the map is a canonical symbol, so the map is legible to anyone who knows the model — and teaches it to anyone who doesn't. The existing sheets (`isometric-tiles-basic.png`, `isometric-tiles-structures.png`) already provide grassland, forest, hills, coastal, cliffs, sand, special terrain, 1×1 to 4×4 structures, bridges, docks, walls and props.

**Structures → meaning → where they surface**

| Structure | Canonical meaning | Existing art | Public site | Observatory |
| --- | --- | --- | --- | --- |
| Capital (civic square) | An island's governing centre (site copy) | Compound 7-hex footprint: Library and Council Hall around a square — never one single-hex sprite, never walled | Model, Arcadia | Territory Principal repo |
| Library | Knowledge resources | Domed 2×2 | Philosophy, Arcadia | Knowledge Bases, Documents |
| Lighthouse | Guidance | 4×4 landmark | Principles | **Beacon** |
| Council Hall | Governance | Large 3×3 | Model | Decisions |
| Observatory | Insight / analytics | 2×2 domed | Home hero, Reflect | Insight (Activity uses a tide gauge) |
| **Port** (replaces Harbour) | Entry and exchange, multi-modal | 4×4 harbour landmark + new modes | Capture | Review queue intake (`+/`) |
|  Dock | Material carried in by hand | Docks connector | Capture | Captures at Stage |
|  Rail depot | Scheduled, regular feeds | New | Capture | Automation-fed intake |
|  Airport | Long-range arrivals from other systems and agents | New | Capture | Agent and remote intake |
|  Customs house | A governed boundary where things are checked | Gate prop | Boundary | What never reaches the browser; confirmations |
| Bridge | Translation layer | Stone bridge connector | Agents section | MCP servers |
| Trade Route | Collaboration / exchange | Sea lane overlay | Model | Trade routes |
| Current | Information flow | Water overlay | The Cycle | Information flow between islands (Sessions are vessels) |
| Celestial Guide | Long-range orientation | Sky overlay | Journey | Horizon and direction (Charter, the realm compass) |
| Workshop / Forge (proposed) | Building tools and harnesses | Windmill / workshop 2×1 | Landscapes | Repositories (`tools-*`, harnesses) |
| Engine house (proposed) | Operational systems, formerly Port | Windmill / waterwheel | Docs | Rig, Automation |
| Reef | Risk / ambiguity | Rocks prop | — | Blocking signals |
| Fog | Experimental ideas | Cloud special tile | Create | Proposals, drafts |
| Ruins (proposed) | Retired knowledge | Broken-wall prop (columns stay the Library's) | Journal | Archived records |
| Ancient Forest | Wisdom / continuity | Forest 4×4 | Philosophy | — |

A Port's modes are drawn as districts of one Port, so an island shows at a glance how knowledge reaches it: an island with only a dock is hand-fed; one with a rail depot runs on schedules.

**Building styles.** Each landscape archetype gets an architectural family drawn from the same kit, so islands differ while sharing a plan:

| Archetype | Family | Materials and silhouette |
| --- | --- | --- |
| Engineering Forge | Industrial vernacular | Slate roofs, stone and timber, chimneys, waterwheels |
| Research Archipelago | Classical observatory | Pale limestone, domes, colonnades, telescopes |
| Creative Wilderness | Organic | Thatch, living roofs, treehouses, carved wood |
| Learning Realm | Collegiate | Cloisters, towers, courtyards, ivy |
| Enterprise Territory | Civic harbour town | Brick, clock towers, cranes, warehouses |
| Personal Isle | Cottage | Single hearth, garden wall, a small jetty |

The four canonical palettes on the basic sheet (Archipelago, Savanna, Natural Colours, Glass and Stone) become per-island palette options. The seventh archetype, Community, is the Commons: meeting hall, market square, shared gardens.

**Grid — the one real decision.** The canonical sheets sit on a square isometric grid (1×1 to 4×4). Your new references, and the Observatory's need for adjacency, territory and pathing, point to hexes. Recommendation: **hex for logic and maps; reuse the existing structure art on hex plinths; draw a new hex terrain set.** Most structures need their square plinth repainted as a hex. Terrain transitions are composited per edge — 6 edge and 6 corner overlays per transition (water/land, cliff/land, sand/grass) — with the 6-bit neighbour mask choosing overlays, because painted art under fixed light cannot be rotated.

**Tile specification (draft, hex)**

- Grid: pointy-top hexes, axial coordinates `(q, r)`; cube coordinates for distance and pathing.
- Projection: 2:1 dimetric; every re-cut sprite is normalised to it. Base tile 256 × 148 px top face at 1× (512 × 296 at 2×): horizontal step 256, row step 111, odd rows offset 128; 48 px plinth; sprite cell 256 × 196.
- Layers. Flat renderer: terrain → water edges (auto-tiled by neighbour mask) → structure → route and current → influence tint → signal markers → labels. Isometric renderer: per-cell painter's order, back row to front (terrain, plinth, structure, decals), with routes and currents as ground-level ribbons in the same pass and influence as a ground tint or hex outline beneath structures; markers and labels last.
- Footprints: 1 hex, an oriented 2-hex pair, or a 7-hex flower. Re-cut rule: 1×1 → 1 hex; 1×2 → pair; 2×2 to 4×4 → flower, with the square plinth matted out and a hex plinth repainted. Manifest per asset: anchor hex, footprint, orientation 0–5, pixel anchor.
- Terrain: grassland, forest, hills, mountain, coastal, cliffs, sand, river, marsh, snow, volcanic, ocean — 3 variants each, plus a flat SVG fill.
- Every structure has three variants and four **condition states** driven by evidence freshness: thriving, quiet, weathered (stale), ruined (retired). Every asset has a flat SVG twin for small sizes, print and the Observatory.

Condition states are where beauty meets truth: a stale repository's workshop visibly weathers, so the map reports estate health without a chart.

**Art budget.** The full matrix (about 20 structures × 3 variants × 4 conditions × 6 families, plus terrain) is over 1,400 sprites — too much to paint and too heavy to ship. So: condition states are alpha decal overlays (cracks, ivy, moss, a fallen roof piece) under the same light, not full variants; night is a tint layer (the one place a filter is allowed); architectural families apply only to the five hero structures (Capital compound, Library, Council Hall, Port, Lighthouse). Budgets: hero ≤ 400 KB at 1440 px (AVIF), Living Map atlas ≤ 1.5 MB lazy-loaded; the local app uses flat SVG only, with any isometric view drawn in Canvas 2D from the same atlas (no PixiJS, since the app inlines everything into one document).

**Tile sets: one map, several skins.** Because the hex data never changes with the drawing, a tile set is a skin over the same manifest ids (every terrain, structure, condition and Port mode exists in each set). Two sets to start, more later:

| Set | Look | Used for |
| --- | --- | --- |
| **Modern** | Clean engraved linework, flat fills from the tokens, crisp at any size; the style of the Hex tile kit board | The local app, docs, diagrams, print, small sizes, the flat twin of everything |
| **Ancient** | Painted, dusk-lit atlas art: layered terrain, lamp-lit settlements, cloud banks; the style of the mood boards | The public hero, the Living Map, Arcadia, posters |

The canon's four palettes (Archipelago, Savanna, Natural Colours, Glass and Stone) apply within a set, so an island chooses a set and a palette as part of its local character. A viewer can switch sets on the Living Map; the local app defaults to Modern. Adding a set later (say, a blueprint or a night-only set) is only new art against the same manifest.

**Three art directions, from Kit's favourite references.**

| Direction | Reference | Character | Used for |
| --- | --- | --- | --- |
| Modern (tile set) | The Hex tile kit board | Engraved linework, flat token fills | The local app, docs, small sizes |
| Ancient (tile set) | The two dusk website mood boards; “Age of Empires-esque” | Painted, lamp-lit, dense settlements; buildings crisp and readable as silhouettes at small scale, like a classic isometric strategy game | Hero, Living Map, Arcadia, posters |
| Illustrated explainer (diagram style, not a tile set) | The “How gstack works” and “Agentic operating system” boards | Daylight watercolour islands on a pale sea, parchment cartouches, coloured line icons in roundels, dashed routes, a tide loop at the foot | Explainers, the Field Guide's “How the map works”, architecture posters, decks |

**Open tile sets.** Others will make their own sets. The manifest (ids, footprints, anchors, condition states, Port modes, the 12 fps / 48-frame clock) is published with the kit as a tile-set contract, so a community set is valid when it covers every id and passes the Building standards; an island may adopt any valid set as part of its local character.

**The picture of Arcadia.** The defining image of the Ancient set is a single painting of Arcadia, as if from a legendary time between times: the reference every later tile is painted to. It is generated from the Visual Style master prompt plus the Arcadia brief below, then the kit's sprites are sliced from it and from follow-up generations at the same light and palette.

```text
[Visual Style master prompt], then: A legendary, timeless painted map-illustration of Arcadia, the origin island of the Knowledge Islands Realm, seen from a high three-quarter isometric angle at dusk. The island rises from a deep navy sea in hexagonal terraces whose cliff edges show the faint geometry of a hex grid at the shoreline. On the highest ground lies the Capital in pale limestone, an open civic square with no walls: a domed Library and a colonnaded Council Hall facing each other across it, lit from within. Below it, a Port town spreads to the coast: stone quays and wooden docks with small sailing ships, a caravan road winding inland, a tall mooring mast, and a customs house at the harbour gate. A domed observatory sits on a hill; a lighthouse stands on a far headland. Rivers run from the mountains to the sea past a watermill and a quarter of workshops. At the island's heart is an ancient forest of enormous old trees, untouched. On an outer ridge, honoured ruins of older buildings. Hundreds of small warm lamp-lights in windows and along roads; soft cloud banks drifting in from one edge; a fog bank where the map ends; gentle glints of light on the water and faint sea lanes curving away towards other islands. Painterly, richly detailed, calm and harmonious, in the tradition of illustrated atlases and environmental animation art, with buildings as crisp, readable silhouettes in the manner of a classic isometric strategy game. Palette of deep ocean blues, forest and moss greens, sandstone, parchment and restrained brass gold. No people in close-up, no text, no creatures, no crystals, no magic glow, no fantasy armour.
```

## Public site

The site becomes a guided voyage: the homepage is the chart, each section is a place on it, and the existing copy stays the backbone. Eleventy and Tailwind stay; the map is a progressively enhanced island, so every page still reads without JavaScript.

**Navigation:** Philosophy · Model · Arcadia · Landscapes · Docs · Projects, with **Enter Arcadia** as the brass call to action. Stable routes (`/install/ki`, `/harness/bootstrap`, `/specifications/…`) are untouched.

**Two halves: the Voyage and the Atlas.** The site keeps its narrative order — the existing sequence from Philosophy to Model to Arcadia is deliberate and stays the spine — and adds a clearly separate reference half. The **Voyage** is read once, in order, to understand (Home → Philosophy → Model → Arcadia → Landscapes → Create). The **Atlas** is returned to, to look things up (Field Guide of symbols, structures, terrain and roles; Docs; Specifications; Projects). Every Voyage page links to the Atlas entries it mentions, and every Atlas entry links back to where the Voyage explains it.

| Page | Purpose | Key components | Reference panel |
| --- | --- | --- | --- |
| Home | One-screen promise, then the journey | Full-bleed isometric Arcadia with district cartouches; headline (“Knowledge is a civilisation question.” stays); six-step journey rail (The Problem · A New Paradigm · The Islands · Stewardship · Landscapes · Create, each mapped to a section of the canon's reading order); the canon's six principles (Stewardship over extraction, Wisdom over noise, Navigation over consumption, Continuity over disruption, Interconnectedness over fragmentation, Augmentation over automation); “Tools change. Landscapes endure.” banner | Image 1 hero, Journey |
| Philosophy | Information → Knowledge → Wisdom; the cycle | Three-layer cross-section of an island (terrain, inhabited, ancient forest); tide-cycle diagram for Capture/Connect/Reflect | New |
| Model | Island, Capital, Territory, Archipelago, Agents | **Living Map** — interactive hex map with legend; click a structure to read its concept; zoom from island to archipelago | Living Map |
| Arcadia | The reference island, live | Arcadia map rendered from real `ki` data at build time; districts link to their source repos | Arcadia panel |
| Landscapes | Archetypes and examples | Filterable archetype cards (Engineering, Research, Creative, Learning, Enterprise, Personal, Community) | Landscape Archetypes |
| Create | Start your own island | Six-step wizard (archetype → governance → stewards & agents → landscape → ports → launch) that ends in the real bootstrap command | Create Your Own Island |
| Docs | Get started, `ki`, harness, prompting | Quiet parchment layout, glyph sidebar, no illustration beyond a section header | — |
| Projects / Journal | Repos and updates | Card per project with its structure glyph and condition state | — |

**Catalogue pages** (from your second reference) become a public **Field Guide**: terrain types, structures and steward classes (Steward, Archivist, Cartographer, Builder, Navigator, Scout, Historian, Guardian), each with what it means in the model. It also carries a “How the map works” page built from the hex + isometric explainer board.

**Accessibility and performance.** Every map has a text equivalent (a list of districts with links); images ship as AVIF/WebP with explicit sizes; hero under 400 KB at 1440 px; motion off under `prefers-reduced-motion`; contrast floors from the core.

## The local app (working name: Observatory)

**Knowledge and work are at the centre; agents are workers in it.** The local app is where a person meets their knowledge and the work moving through it. It does not replace agentic harnesses or agent apps (Claude, ChatGPT, Codex, Paperclip); those are workers that act inside the estate, shown alongside people, never the subject of the interface. Every screen answers “what is the state of the knowledge and the work?” before “what are the agents doing?”

The local app is the operator's own vessel for the estate, not only a place to look from. It does four jobs, and the design must make each one legible:

| Job | Concept today | Authority | Examples |
| --- | --- | --- | --- |
| Observe | Instruments | Read-only | Roadmap, Decisions, Activity, Documents |
| Attend | Beacon | Read-only, derived | Ranked signals, what changed |
| Act | Bridge (Rig is its first aspect) | Mutating: declared tier, visible inputs, confirmation, receipt | Fetch / pull / push, service control |
| Extend | Live artifacts, one set per island | Each island's own, inside the app's boundary | An island's own dashboards and tools |

**Who is working.** Across all four jobs the app shows who is at work: workers — human or AI, “humans and robots” — as stewards of the same realm, by role (Steward, Archivist, Cartographer, Builder, Navigator, Scout…), each tied to the island, record or route they are touching. On the Known Lands chart, active work appears as figures or vessels on the structures and routes involved; in tables it is a column, not a separate agents dashboard. Evidence today: agent runs from Sessions and commit authors from Git; people beyond that need a named source before they appear.

**Extension model.** Live artifacts are the app's extension points, from two sources: **core extensions** the app ships itself, and **island extensions** each Knowledge Island brings (today: same-stem manifest pairs under a KB's `Admin/Operations/Live Artifacts/`, per the artifacts spec). Every extension can be switched on or off per scope; the shell treats them as first-class — a structure on the Known Lands chart, a tab or panel, the shared tokens and components, and, when one mutates, the Bridge's plan / confirm / receipt path. Extensions never get their own route to credentials or processes; the backend boundary holds. Today the artifacts host is read-only (writes are refused, a recorded OBS-ART gap), so Bridge-routed writes are the intended path, not current behaviour. Tokens reach an artifact only if the bridge script sets them on the frame root, and shared elements only as a pinned script like the Mermaid runtime — both are changes to OBS-ART-003. Core extensions are toggleable native instruments (a registry; toggles are host preferences in XDG state); island extensions are artifacts under a KB's Admin/Operations/Live Artifacts/, drawn as a building on that KB's island.

**First worked example: the Git repo tracker.** Your existing Kit Git Repo Audit live artifact (in Personal) becomes the reference case: the native Repositories instrument covers discovery, health, detail and governed fetch / pull / push; commit composition, bulk operations and editor launchers come in as Bridge aspects only when separately agreed (per the 16 Oct intake in `+/personal-repo-manager-2026-10-16`). Visually, each repository is a structure on the Known Lands chart whose condition state is its Git health.

**Naming.** PDR-KI-OBSERVA-001 chose “Observatory” so that observation reads as the default and authority as the exception, and rejected “Lighthouse” because a lighthouse serves other vessels rather than its keeper. With Act and Extend now first-class, the product name is reopened as an open question; Instrument, Beacon and Bridge stay as concepts whatever it is called. Review view: keep “Observatory” until Gate B, when slices 2 and 5 show whether Act has become the primary job, and use the Observatory as the app's mark on the map either way (GDR-KI-PRINCIPAL-011 dropped the Tower). Candidates if renamed: Wheelhouse, Chartroom, Tower (clashes with the Tower Git client, awkward when the first worked example is a Git tracker), Keep (clashes with Google Keep). KI-OBSERVA stays as a codename that outlives any product name; record ids are never rewritten.

**Reach: one web app, three ways in.** The app stays a browser application first, so any of your machines can open it; one host machine runs the backend and owns all files, processes and credentials.

| Way in | How | Authority |
| --- | --- | --- |
| Local browser | The primary listener on `127.0.0.1:1675`, unchanged: OBS-BOUND-001, -012 (Host check) and -013 (Origin check) stay exactly as they are | Full, as today |
| Tailnet browser | A second, opt-in listener (`--tailnet`) on another loopback port or a Unix socket, which `tailscale serve` targets. It serves the page and read routes only: the acting routes are absent (404), so “no Bridge” is structural, not a setting. Its Host rule accepts only the tailnet FQDN; it requires `Tailscale-User-Login` to match the operator; a Tailscale ACL limits it to your own devices; Funnel never | Read-only, strictly less than loopback, so a forged header can never raise authority |
| Desktop shell (later) | Tauri around the same web app, loading `http://127.0.0.1:1675` directly (bundled `tauri://` assets would fail the Origin check); adds tray status, notifications, deep links | Same as the local browser |

Bridge over the tailnet is a later, separate PDR (an ACL-tagged device plus a one-time code shown on the host for destructive operations). Worth stating as the baseline: `ssh -L 1675:127.0.0.1:1675` over the tailnet already works today with full authority, which is exactly why the designed path is least-privilege. Receipts and the status line record the way in (“via tailnet as …”).

Service management for an always-on host (the hub seat in Known World) belongs to Rig as a Bridge aspect, not to the app shell.

The world enters the Observatory as one new instrument and a set of small marks, never as decoration on the tables. Every rule in PDR-KI-OBSERVA-002 stands: 12 Beacon rows at 800 px, no horizontal scroll at 720 px, tables stay tables, contrast held by test.

**1. A new instrument: the Known Lands chart.** A hex map of the selected scope.

- Each registered repository is an island: a Knowledge Base island shows its zones as structures (Library, Council Hall, Port, Streams); a single-purpose repository is a small isle typed by its dominant building (Capital for Principal, Workshop for `tools-*`, Bridge for `mcp-*`, Library for knowledge bases, Port for intake-heavy repos).
- The chart is the Map of Known Lands: the Knowledge Islands Realm, its territories as archipelagos in mostly contiguous sea regions (an island may sit apart from its territory, as an exclave), and islands within them. “Estate” stays a local word for the places you visit often; the display term is realm.
- Condition state comes from evidence freshness; Beacon signals appear on the structure they concern: a gold lantern for attention, a reef in rust for blocking.
- Trade routes draw as sea lanes from the existing Trade routes data; dashed while awaiting reciprocity, as today.
- Renders as flat SVG by default (fast, crisp, theme-aware); an isometric view is a toggle. Selecting an island applies the shell's filter (a filter, not a scope) for that repository, so it holds across instruments.
- Layout is deterministic: hex positions are stored, so a repository stays where the operator learnt it was.

**2. Small marks in the shell.** A compass glyph and wordmark in the header; one line glyph per instrument tab (lighthouse for Beacon, sea lane for Trade routes, council hall for Decisions, library for Knowledge Bases, forge for Repositories, bridge for MCP servers, engine house for Automation and Rig, port for Review queue, streams for Roadmap, vessel for Sessions, scroll for Documents, workbench for Artifacts, tide gauge for Activity; the Observatory is the app's own mark); the structure glyph in the subject column of the Beacon. All sized to the existing row height, so the density model is unchanged. Glyphs on tabs change a decided element (PDR-002: tabs are text), so PDR-007 updates the tab-width model in the same change; map labels in the app stay monospace, and cartouches are for the site.

**3. Night is the reference rendering.** Dark stays first-class: navy paper with lantern-gold attention reads as the chart at night, which is where an operator beside an editor usually is.

**4. Governance of the change.** Record it as PDR-KI-OBSERVA-007 (“The Known Lands chart”), refresh the vendored tokens from the shared kit with a new digest, add the map container to the no-horizontal-scroll test, and add a density check that the shell glyphs cost zero rows.

**5. Restructure the instruments around the four jobs (proposal).** The fourteen instruments grew one at a time; grouped by job they consolidate to ten, with every existing capability kept:

| Job | Proposed instrument | Absorbs | Why |
| --- | --- | --- | --- |
| Attend | **Beacon** | Beacon; “what changed” from Activity | One place for what warrants notice |
| Attend | **Waiting for you** | Review queue | A person's own inbox: open queries, records awaiting review, intake under `+/`, captures at Stage |
| Observe | **Known Lands** | Trade routes (as a layer); Activity's 7 / 14 / 30-day window (as a time control) | The map is the overview; routes and recent movement are layers on it |
| Observe | **Library** | Knowledge Bases; Documents | Both read an island's canonical prose; one reader, two sources |
| Observe | **Council** | Decisions | Governance records and how they layer |
| Observe | **Streams** | Roadmap | Work in motion, as the zone is named |
| Observe | **Workers** | Sessions; Automation's run history | People and agents at work, and which runs stopped reporting |
| Act | **Repositories** | Repositories | The Git tracker: health, detail, governed fetch / pull / push |
| Act | **Machine** | Rig; MCP servers; Automation's schedules | The host: tooling, drift, services, connections, jobs |
| Extend | **Extensions** | Artifacts; the switchboard | Core and island extensions, on or off per scope |

The shell's job switch (Observe · Attend · Act · Extend) shows only that job's instruments, so the tab bar shrinks from fourteen to two to five. Existing work items (KI-OBSERVA-VIS-021 to -024) carry over to the instrument that absorbs them; the change is a PDR in its own right.

## Tooling and asset pipeline

Four pieces of tooling make the world repeatable: a token build, a glyph sprite, a hex map engine and a cartographer's workbench. All TypeScript, all Bun, all consumed by both apps.

| Tool | What it does | Lives in | Consumed by |
| --- | --- | --- | --- |
| **Design tokens** | Tokens as DTCG JSON → CSS custom properties, Tailwind `@theme`, and the Observatory's vendored module with its SHA-256 digest | New `ki-design` repo | Site, Observatory, decks |
| **Glyph sprite** | SVG sources on a 24 px grid → SVGO → one sprite + typed name union | `ki-design` | Site, Observatory |
| **Hex map engine** — `@knowledgeislands/hexmap` | Axial/cube maths, layout, neighbour masks for auto-tiling, pathing for routes; a `IslandMap` JSON model; two renderers: flat SVG and isometric Canvas (PixiJS if needed) | `ki-design` | Living Map, Arcadia page, Known Lands chart |
| **Tile atlas** | Sliced PNG/AVIF tiles packed into atlases, with a manifest of anchor, footprint, variants and condition states per asset | `ki-design`, built from sources in `ki-principal/Pillars/Aesthetics` | Isometric renderer |
| **Cartographer** (workbench) | A local page to paint terrain, place structures, preview condition states and night mode, and export `IslandMap` JSON | A standalone local dev page (authoring writes map data, so it is neither a read-only Instrument nor a Bridge aspect; the local app only reads the result) in `ki-design` | Whoever draws maps — you, or an agent |

**Component layer — Web Components, built with Lit.** Components are framework-neutral standard Custom Elements, so the static site and the framework-free Observatory consume the same thing as plain HTML. Rendering never depends on the component:

| Layer | Package | What it is | Site (Eleventy, static) | Observatory (app) |
| --- | --- | --- | --- | --- |
| 1 | `@knowledgeislands/tokens` | CSS custom properties from DTCG JSON; they pierce Shadow DOM, so light and night theming reach inside every component | Tailwind `@theme` + `:root` vars | Vendored module + digest (PDR-KI-OBSERVA-002) |
| 2 | `@knowledgeislands/hexmap` | Pure TypeScript: geometry, layout, data in → SVG string out; no DOM, no Lit | Called at build time; maps ship as static SVG | Called server- or client-side |
| 3 | `@knowledgeislands/elements` | Thin Lit wrappers adding interaction: `<ki-hexmap>`, `<ki-glyph>`, `<ki-cartouche>`, `<ki-status-chip>`, `<ki-journey>` | Server-rendered via `@lit-labs/eleventy-plugin-lit` with Declarative Shadow DOM; works without JS, enhances where it loads | Used directly. This is shared rendering, which PDR-KI-OBSERVA-002 rules out (“shared values, never shared rendering”), so PDR-007 explicitly supersedes that sentence for these elements only; each exports its stylesheet as a string so the density, contrast and scale tests read it, and packages are pinned by exact version and lockfile integrity, inlined into the single document |

Rules for the layer:

- **A dozen components, not a UI library.** Only what both surfaces genuinely share; buttons, dialogs and forms stay in each app. This is the guard against `ki-design` becoming a dumping ground.
- **Styled from tokens only.** Tailwind does not reach into Shadow DOM, so components carry their own styles; Tailwind stays for page layout on the site.
- **Observatory tests extend inward.** Its density and contrast checks read shipped stylesheets; component styles must be exported so those checks cover them — part of PDR-KI-OBSERVA-007.
- **Why not React:** it would force a framework into the Observatory for no gain. Stencil (adds React/Vue wrappers) is the upgrade path only if outside teams adopt the kit.

**Review notes on the layer.** Lit earns its place through `<ki-hexmap>`'s interaction; on the “both surfaces” test only `<ki-hexmap>` and `<ki-glyph>` qualify today, so `<ki-cartouche>` and `<ki-journey>` stay site components and `<ki-status-chip>` stays the Observatory's own pattern. Risks to clear in a Phase 0 spike: Lit SSR is a labs package needing Node VM modules, so confirm it runs under Bun or build the site under Node; set `window.litNonce` from the page nonce for CSP; each element carries its own reset (Tailwind Preflight does not cross the shadow boundary); the token build emits both `--color-*` for Tailwind v4 `@theme` and the bare roles (`--paper`, `--ink`, `--accent`) from one source.

**Map data.** Positions are authored once and stored (proposed: `.ki/map.toml` beside `.ki.toml` in each territory's Principal — better a \[map\] table inside .ki.toml, since .ki/ would be a directory), so layout is stable. The realm layout, where islands sit relative to each other, belongs with Known Lands in ki-principal, with personal overrides in XDG state. Everything else — roster, roles, freshness, routes — comes from `ki` at build time (site) or observation time (Observatory). The `IslandMap` schema belongs in `ki-specifications` once it settles; while ki-specifications is dormant, the schema lives in the kit as islandmap/v1 with a conformance fixture.

**Producing art.**

1. Generate from the master prompt in Visual Style, with the archetype family and palette appended.
2. Clean and normalise in an editor: fixed light direction (top-left), fixed plinth height, transparent background.
3. Slice onto the hex template; record anchor and footprint in the manifest.
4. Derive condition states (weathering, ivy, collapse) as variants, not filters.
5. Trace or redraw a flat SVG twin for small sizes.
6. Commit sources to the Aesthetics pillar; build atlases in `ki-design`.

**Where Claude Design fits.** Page mockups (home, Living Map, Create wizard, Observatory shell with the Known Lands chart) are made as Design artifacts for review; the token set and glyphs are recorded as a Design System artifact so every later deck, design and page draws from the same values.

## Success criteria and governance

The design is working when three things are true:

1. A newcomer can name Island, Capital, Library, Council Hall, Port and Streams after reading the home page (a five-person hallway test).
2. The Known Lands chart v0 shows the real realm with condition states, inside the PDR-002 density and width budgets.
3. Both apps render from one tagged kit release with matching digests.

**Journeys.** Newcomer: Home → Philosophy → Create. Adopter: Docs → bootstrap. Contributor: Projects → repository.

**Map accessibility.** Every map has a text equivalent; hexes are keyboard-navigable (roving tabindex, arrow keys along axial neighbours) with a focus ring on the hex outline; terrain is never colour alone (pattern or glyph on the flat render); the twelve terrain fills pass a colour-vision check.

**Kit governance.** Kit approves token changes; packages follow semver; the Observatory re-vendors by digest at each kit release; mockups are judged against the Do / Don't table and the contrast table, with the verdict recorded as a comment on the Design artifact. British English throughout; no i18n in V1. The OG image and favicon are regenerated from the new hero and compass.

**Art production.** Painted art comes from an image generator working to the Building standards and the Visual Style master prompt, then sliced into the kit; hand-coded SVG is for the flat twins and mockups only. A short art-licensing decision (ownership, generator terms, style-reference risk) comes before production.

## The complete design set

The early Aesthetics pillar was input; the output is a complete, governed design set, each part with a home:

| Part | What it holds | Lives in |
| --- | --- | --- |
| Visual Style v2 | Tone, palette, type (Cormorant + Inter), motion, illustration balance, master prompt | `ki-principal` Aesthetics (canon) |
| Concept atlas | Every concept mapped once: Realm → territory → island → Capital → structures; workers and roles; layers and durability; with its symbol, structure, terrain, glyph and UI surface | `ki-principal` Aesthetics (canon) |
| Symbol Library v2 | The 16 symbols plus Port modes, the Capital, Ruins, compass rose, Engine house; one line glyph and one illustration each | Canon + `@knowledgeislands/glyphs` |
| Isometric tile kit v2 | Hex terrain set, structures re-cut to hex, connectors, props | Canon sources + `@knowledgeislands/tiles` |
| Building standards | Footprints, scale, light direction, plinth height, materials per architectural family, condition states, flat SVG twin | Canon |
| Animation standard | The 12 fps / 48-frame clock and its rules | Canon + `hexmap` |
| Design tokens and components | Tokens, Lit components, hex map engine | `ki-design` |
| Design System artifact | The above, browsable and usable by decks and designs | Claude Design |
| Mockups | Home, Living Map, Create, the local app with the Known Lands chart | Claude Design |

## First slices — value from the Observatory now

The Observatory ships value before the tile kit, the website or any painted art exists. Each slice uses evidence the app already observes, is small enough to land in days, and moves the long-term design forward rather than around it.

| # | Slice | Value to you | Builds on (exists today) | Design step it takes |
| --- | --- | --- | --- | --- |
| 1 | **Reach across the tailnet, read-only** | Open the Observatory from any of your machines | Loopback service; `tailscale serve`; boundary spec | Records the boundary change (PDR); Bridge stays host-only |
| 2 | **Git repo tracker parity** | Replaces the Personal Git Repo Audit artifact day to day | Repositories instrument, native Git evidence, governed fetch / pull / push | First worked example of “Act” with receipts |
| 3 | **Known Lands chart v0 (flat SVG)** | See the whole estate at a glance: territories as islands, repos as structures, health as condition, Beacon signals as lanterns and reefs | Repository, Beacon and Trade-route evidence | First use of `hexmap` and the structure glyphs; no art needed |
| 4 | **Who is working** | See which people and agent runs are touching which repos and records | Sessions instrument, Automation, Activity | A steward-role column and markers, shared across instruments |
| 5 | **Extensions switchboard** | Turn core and island live artifacts on or off per scope | Artifacts host (`KI-OBSERVA-INT-002`) | Makes “Extend” visible; registry for later extensions |
| 6 | **Tokens and glyphs from `ki-design` v0** | The app looks like Knowledge Islands, in light and night | PDR-KI-OBSERVA-002 digest vendoring | First consumer of the shared kit |

Slices 1 and 2 need no design decisions still open; 3 and 6 need only the grid and kit-home decisions already taken (Gate A is effectively passed). Each slice goes through the Observatory's own roadmap as a `KI-OBSERVA` work item. Slice 1 is Observatory roadmap rather than design; slice 3 is Phase 1's exit test.

## Delivery

&#91;embedded content: delivery · 5 phases, 4 gates\]

Phases 2 and 3 can run in parallel once Gate B passes; no dates are set until Gate A.

## Open questions

**Decided 18 Oct 2026**

- **Grid:** hex for logic and maps; existing square-iso structures re-cut onto hex plinths; a new hex terrain set.
- **Port replaces Harbour:** a multi-modal point of entry and exchange (dock, rail depot, airport, customs house — the canon's Customs at each boundary). The site's “The Harbour — Capture” copy and the Symbol Library change to match; operational systems move to a proposed Engine house. Because Harbour is a zone of the model, not only a symbol, this is enacted by a GDR (Home of Knowledge, Structure, Symbol Library, Visual Style terrain table) as a Phase 0 item.
- **Lighthouse guides, Council Hall governs:** Lighthouse = guidance (the Beacon); Council Hall = governance (Decisions). Canon updated to match.
- **Kit home:** a new `ki-design` repo.

**Still open**

- [ ] **Display face:** keep Playfair Display, or move to an engraved serif (Cormorant or EB Garamond) for cartouches and headlines?
- [ ] **Night chart on the public site:** a theme toggle, or follow the OS only?
- [ ] **Arcadia page from live data:** publish the territory roster and freshness at build time, or keep it illustrative?
- [ ] **Engine house:** right name and symbol for operational systems, now that Port means entry?
- [ ] **Further references:** the extra isometric building images — into `Pillars/Aesthetics/Isometric Tiles`.
- [ ] **Bridge clash:** rename the canon symbol to Causeway (translation layer), freeing Bridge for the app's command concept — the reviewer's recommendation, and cheaper than renaming specs and code?
- [ ] **Art licensing:** ownership and generator terms for AI-generated brand art; the “Ghibli-like” reference is a style risk to state plainly.
- [ ] **Living Map without JavaScript:** confirm the no-JS state is the static SVG plus a text list of districts.
- [x] **Kit repo name:** you chose `apps-common`; the review recommends `ki-design` — `apps-*` are deployable apps and “common” names a bucket, while `ki-design` would be the machine-readable authority beside the Aesthetics prose canon, as `ki-specifications` is beside the Philosophy. Package names (`@knowledgeislands/*`) are unaffected. Decided 18 Oct: ki-design (repo created at knowledgeislands/ki-design).
- [ ] **Instrument restructure:** adopt the ten-instrument grouping above?
- [ ] **Mill or Engine house** for operational systems? The review prefers Mill (shorter, natural, matches the waterwheel art); Workshop then stays the only “forge”.
- [ ] **Steward classes into canon:** write Steward, Archivist, Cartographer, Builder, Navigator, Scout, Historian and Guardian into Philosophy/Model/Agents (or map them onto its existing roles) before the Field Guide publishes them.
- [ ] **Lore sheet:** a one-page set of 8–10 named motifs (the Great Library, the Capital, the Port and its Customs house, the Mill, the tides as the cycle, the Known Lands and their fog, the compass, Ruins as honoured retirement) for the Aesthetics pillar — symbolic depth named, with creatures, magic and crystals explicitly ruled out.
