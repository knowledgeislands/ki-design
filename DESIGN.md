---
title: Knowledge Islands Design System
status: draft
version: 0.1.0
date: 2026-10-18
owner: Kit (Kristopher Brown)
repository: ki-design
canon: ki-principal/Pillars/Aesthetics (prose canon); this file is the machine-readable authority beside it
language: British English
---

# Knowledge Islands Design System

One visual world — a hand-drawn, natural archipelago built on a hex grid with isometric structures — expressed in two dialects: the **Chart** (the public site, knowledgeislands.info: atmospheric, illustrated, narrative) and the **Instrument** (the local app, working name Observatory, `127.0.0.1:1675`: dense, legible, quietly themed). Both draw from one token set, one glyph set and one tile kit.

## How to use this document

1. **Everyone:** this file is self-contained. Sections 1–4 say what Knowledge Islands is and means; 5–13 say how it looks, moves and behaves; 14 holds copy-paste prompts; 15–16 hold the floors and the rules for changing anything.
2. **For AI designers (ChatGPT, Claude): read sections 1–4 before producing anything.** Use section 14's prompts for imagery. **Never invent meaning — section 3 is the meaning.** If a thing you want to draw has no row in section 3, do not draw it; propose it, marked _proposed_.
3. **Status words are binding.** _Canon_ = ratified in `ki-principal`; _decided_ = taken in the 18 Oct 2026 brief, being enacted into canon; _proposed_ = may be used in drafts and mockups, never shipped as settled. Where canon and a _decided_ item conflict, _decided_ wins.
4. **Pick a dialect first.** Site work follows the Chart columns; local-app work follows the Instrument columns and PDR-KI-OBSERVA-002, which is law for that dialect. Never mix them on one surface.
5. **Judge every output** against Appendix A (Do / Don't) and the contrast tables in section 5 before calling it done.

---

## 1. Essence

**What it is.** Knowledge Islands is a conceptual model for organising knowledge as a natural, evolving system. An **island** is a discrete, self-contained body of knowledge with boundaries and internal geography — in practice, a repository. Islands are governed together in **territories**, drawn as archipelagos, and all of them lie within the **Knowledge Islands Realm**. At the heart of each island is a **Capital**, and at its heart a **Citadel** holding the Library (canonical knowledge), the Council Hall (governance) and the Tower (watching and guiding). Knowledge Islands Principal — the island called **Arcadia** — is the Knowledge Island of Knowledge Islands: the legendary origin that holds the canonical model every other island derives its baseline from.

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

**Knowledge and work at the centre; agents, human or AI, are workers in it.** Every screen answers "what is the state of the knowledge and the work?" before "what are the agents doing?". Agents — people, Claude, ChatGPT, Codex, Paperclip — are workers acting inside the realm, shown alongside one another by role, never the subject of the interface. In tables, who is working is a column, not a separate agents dashboard.

**One plan, local character.** Being a Knowledge Island means meeting a small set of expectations — the standards declared in `.ki.toml` and checked by `ki repo audit`: the five zones, a Capital, governance through the Council Hall. Everything else belongs to the island: its tile set, palette, architectural family, culture of workers, extensions, even structures no one else has. The design shows the shared plan so islands stay legible to each other, and leaves the rest to the islanders.

---

## 2. The world

### 2.1 From realm to island

| Level | Meaning | Drawn as | Local-app term |
| --- | --- | --- | --- |
| **Realm** | The governed environment: its rules of identity, capability and crossing. The **Knowledge Islands Realm** is the standard (and first) realm | The whole chart; other realms beyond its edge, in fog | Scope picker: "Known Lands" |
| **Map of Known Lands** | The canonical chart of the realm's territories and islands (after `Admin/Governance/Known Lands.md`) | The chart itself, with compass rose and scale bar | The Known Lands chart instrument |
| **Territory** | Islands governed together under one Capital, one accountable authority and one harness. **A territory is an archipelago** | An archipelago: a group of islands in one sea region with a tinted border; an island may sit apart as an **exclave** | Scope `territory:<handle>` |
| **Island** | A discrete, self-contained body of knowledge; in practice a **repository** | A land mass of hexes | A repository |
| **Capital** | An island's (or a territory's) civic centre; the Principal island holds the territory's governance | The Citadel and its square, on a 7-hex footprint | Territory Principal repository |
| **Citadel** | The civic heart of a Capital: **Library + Council Hall + Tower** | Three buildings on one walled terrace spanning a 7-hex flower — never a single-hex building | — |

"Estate" is only Kit's local word for the places visited most often; display copy says **realm**. **Repositories are islands; territories are archipelagos** (decided 18 Oct 2026). An earlier draft made the archipelago a non-governing "character" grouping; that reading is withdrawn, so never draw a second grouping line that crosses territories.

### 2.2 Depth: layers and durability

The map has vertical meaning. Elevation reads as maturity; sea floor and sky are layers the map can show, not backdrop.

| Layer | Knowledge | Drawn as | Durability |
| --- | --- | --- | --- |
| Sky | Guidance (long-range) | Celestial guide, constellations, weather | Changes slowly; guides everything |
| Ancient forest and high stone | Wisdom | Old growth, mountains | Outlives its makers; **never built on** |
| Inhabited land | Knowledge | Settlements, structures, roads | Tended; changes with use |
| Coast and shallows | Information | Ports, beaches, reefs | Arrives and is sorted |
| Sea and currents | Data | Open water, currents, the deep | Raw; always moving |

### 2.3 The cycle

| Step | Meaning | Place | Local app |
| --- | --- | --- | --- |
| **Capture** | Information arrives without immediate judgement; routing, not filtering | The **Port** | Review queue / "Waiting for you" |
| **Connect** | Material is contextualised and linked; received information becomes owned knowledge | Routes, Streams | Trade routes, Roadmap |
| **Reflect** | Periodic review surfaces what is stale, changed or obsolete | Tower and Observatory | Beacon, Activity |

The explainer boards draw a longer **tide loop** (Discover → Curate → Govern → Nurture → Connect → Learn) as a band at the foot of a poster — _proposed_; it elaborates the cycle and never replaces Capture → Connect → Reflect in canonical copy.

### 2.4 Hex for logic, isometric for life

The hex grid is the truth; the isometric painting is how that truth is shown. A hex holds identity, terrain, owner, layers and adjacency; routes and influence are computed on the grid. The isometric render adds height, buildings, weather and light. The same map renders **flat** (local app, print, small screens) or **isometric** (hero, Living Map) in either tile set, without changing its data. Every tile is data first and scenery second.

---

## 3. Meaning

This is the symbol library. Every visual element that carries meaning appears here once. Columns: **Status** (canon / decided / proposed), **Drawn as** (illustration and tile), **Site** (where it surfaces on knowledgeislands.info), **App** (where it surfaces in the local app). Glyph ids refer to section 8.

### 3.1 The canonical symbols

| Symbol | Meaning | Status | Drawn as | Site | App | Glyph |
| --- | --- | --- | --- | --- | --- | --- |
| Island | A domain of knowledge; a repository | canon | A land mass of hexes rising from the sea | Model, Landscapes | A repository | `island` |
| Archipelago | A federated knowledge ecosystem; the drawn form of a territory | canon (territory = archipelago decided) | Several islands in one tinted sea region | Model | A territory | `archipelago` |
| Route | A relationship | canon | A fine dotted or inked path between places | Model | Links | `route` |
| Trade Route | Collaboration / exchange | canon | A brass sea lane with small sailing vessels; solid = active, dashed = awaiting reciprocity | Model | Trade routes layer | `trade-route` |
| Current | Information flow | canon | Curved arrowed lines in the water | The Cycle | Flow between islands; Sessions are vessels on it | `current` |
| Weave / Fabric | Cross-domain synthesis | canon | Interlaced brass and teal threads meeting at points of light | Philosophy | Cross-island links | `weave` |
| Lighthouse | **Guidance** only | decided (canon said "guidance / governance") | A tall pale tower on a rocky headland | Principles, wayfinding | Guidance and help (not the Beacon: that is the Tower's lamp, glyph `beacon`) | `lighthouse` |
| Observatory | Insight / analytics | canon | A domed observatory on a hill or cliff | Home hero, Reflect | Activity, insight | `observatory` |
| Port | **Entry and exchange, in any mode** | decided (replaces Harbour) | A port town of districts (3.4) | Capture | Review queue intake (`+/`) | `port` |
| Bridge | Translation layer between systems | canon (name clash open, 3.9) | A stone arched bridge | Agents section | MCP servers | `bridge` |
| Reef | Risk / ambiguity; blocking | canon | Sandstone rocks in shallows; in the app, a rust reef | — | Blocking signals | `reef` |
| Terrain elevation | Depth / maturity | canon | Contour terraces; higher = more mature | Philosophy | Elevation on the chart | `terrain` |
| Ancient Forest | Wisdom / continuity; never built on | canon | One vast old tree among old growth | Philosophy | — | `ancient-forest` |
| Cartographic Grid | Structure / orientation | canon | Faint graticule; the hex lattice at shorelines | Field Guide | The grid itself | `grid` |
| Celestial Guide | Long-range orientation | canon | Eight-point star over constellations | Journey | Horizon, the Charter | `celestial` |
| Library | Knowledge resources; canonical knowledge (Pillars) | canon in the model (not in the canon Symbol Library); symbol decided | Domed building with colonnade | Philosophy, Arcadia | Knowledge Bases, Documents | `library` |
| Council Hall | **Governance** — a parliament or Capitol; decisions, not storage | decided | Colonnaded hall with pediment, on the Citadel square | Model | Decisions | `council-hall` |
| Harbour | Was "integration point" — retired | retired 18 Oct 2026 (by GDR) | Do not draw; use Port | — | — | — |

The 18 Oct decisions supersede three canon rows (canon files still carry them until the GDR is enacted): "Harbour = integration point" (now the Port); "Port = operational systems" (operational systems move to the Mill / Engine house, _proposed_); and "Governance = lighthouses / citadels" (governance is the Council Hall; the Lighthouse is guidance only).

**Value icons** (canon, Symbol Library sheet; glyphs in 8.2) label principles and values, never places.

### 3.2 Zones and working areas

Each canonical zone of a Knowledge Base is a place on its island, so a repository's own folders draw its island.

| Zone or area | Meaning | Status | Drawn as | App |
| --- | --- | --- | --- | --- |
| `Pillars` | Owned, canonical knowledge | canon | The Library's hall of pillars, in the Citadel | Knowledge Bases, Documents |
| `Calendar` | Time-bound knowledge | canon | Clock tower or sundial on the Capital square | Activity, automation timing |
| `Resources` | External reference | canon | Archive and reading room beside the Library | Artifacts, references |
| `Streams` | Knowledge in motion: initiatives, projects, roadmap | canon | Rivers and canals running to the sea | Roadmap, Sessions |
| `Admin/Governance` | What must hold: Charter, Known Lands, policies, decisions | canon | Council Hall, in the Citadel | Decisions |
| `Admin/Operations` | How the island runs: activities, processes, live artefacts, lessons | canon zone; drawing proposed | Mill / Engine house (_proposed_, name open) | Automation, Rig, Extensions |
| `+` (inbound) | Material received for triage; not a zone | canon | The Port's arrivals quay | Review queue (intake) |
| `-` (outbound) | Material prepared to leave; not a zone | canon | The Port's departures quay | Outbound |
| `_TRADES` | Exchange agreements with other islands | canon | Trade routes from the Port | Trade routes |

Canon names five zones — Calendar, Pillars, Resources, Streams, Admin — with Admin drawn as two places (Governance, Operations). `+` and `-` are working areas kept outside the zones; never draw them inside the Citadel.

### 3.3 The Citadel and other structures

Structures already defined in 3.1 (Library, Council Hall, Observatory, Lighthouse, Port, Bridge, Ancient Forest) are not repeated here; the full tile inventory is 10.4.

| Structure | Meaning | Status | Drawn as | App |
| --- | --- | --- | --- | --- |
| Citadel | Civic heart of a Capital: Library, Council Hall, Tower | decided | Walled rise, 7-hex flower, three buildings | Territory Principal |
| Tower | Watching, seeing and guiding — a keep, a control tower | decided (part of Citadel) | Slender watchtower with a lit lamp room | The local app itself; the Beacon is its lamp |
| Workshop / Forge | Building tools and harnesses | proposed | Timber workshop with chimney, anvil yard | Repositories (`tools-*`, harnesses) |
| Mill / Engine house | Operational systems | proposed; name open (16.5); tile id `mill` | Stone house with waterwheel or windmill | Rig, Automation |
| Ruins | Retired knowledge — honoured, not hidden | proposed | Broken walls, fallen lintel, ivy (columns stay the Library's) | Archived repos and records |
| Cottage | Generic dwelling; the Personal Isle's hearth | in the tile contract | Small house, one hearth, garden wall | — |
| Commons | Community archetype: shared space | proposed | Meeting hall, market square, shared gardens | — |
| Logo roundel | The Knowledge Islands mark: an island and an arch in a roundel | canon (`Pillars/Aesthetics/Logo/logo.png`) | Use the canon file; never redraw or restyle it | Site header lockup |
| Compass rose | Orientation of the Realm; candidate favicon and app mark — **not the logo** (open, 16.5) | proposed | Eight-point brass rose | Orientation motif on charts and posters |

**Two Observatories.** The _Observatory structure_ means insight (Activity). The local app's working name is also "Observatory", but the app is drawn as the **Tower**. Never draw the domed observatory as the app's mark.

### 3.4 Port modes

A Port's modes are districts of one Port, so an island shows at a glance how knowledge reaches it: only a dock means hand-fed; a rail depot means it runs on schedules.

| Mode | Meaning | Status | Drawn as | App |
| --- | --- | --- | --- | --- |
| Dock (`dock`) | Material carried in by hand | decided | Wooden jetty, small sailing boats | Captures at Stage |
| Rail depot (`rail-depot`) | Scheduled, regular feeds | decided | Small station, platform canopy, a short run of track inland | Automation-fed intake |
| Airport (`airport`) | Long-range arrivals from other systems and agents | decided | **A tall mooring mast with a moored airship** (period-consistent; never jets or runways) | Agent and remote intake |
| Customs house (`customs-house`) | A governed boundary where things are checked | decided | Gatehouse with a barrier at the port gate | What never reaches the browser; confirmations |

### 3.5 Signals

| Mark | Meaning | Status | Drawn as | App |
| --- | --- | --- | --- | --- |
| Lantern | Attention: the Beacon ranks it as unusual | decided | Brass lantern hung on the structure | Beacon signal, gold (`--warn`) |
| Reef | Risk; blocking | canon | Rust reef by the structure | Beacon blocking, rust (`--bad`) |
| Fog | Experimental, or not yet observed (uncharted). A **map state** over any terrain, never a terrain tile | canon | Drifting fog over hexes; flat: `--fog` hatch (5.6) | Proposals, drafts, unobserved |
| Storm | Risks, conflicts, policy violations | proposed | Storm cloud over an island | Beacon (blocking) |
| Whale song | High-value, long-range signal | proposed | A whale far out at sea | Beacon (long-horizon) |
| Tide line | Change, trigger, opportunity | proposed | Tide lines on the coast | Automation triggers |
| Solid / dashed lane | Active / awaiting reciprocity | decided | Brass sea lane | Trade routes |

### 3.6 Condition states

Driven by evidence freshness. Where beauty meets truth: a stale repository's workshop visibly weathers, so the map reports estate health without a chart.

| State | Meaning | Drawn as (decal) | App wording |
| --- | --- | --- | --- |
| Thriving | Fresh evidence, actively tended | Clean, lit windows, smoke, flags | thriving |
| Quiet | Healthy but little recent activity | Clean, unlit, no smoke | quiet |
| Weathered | Stale evidence | Moss, ivy, a cracked wall, a missing shingle | weathered |
| Ruined | Retired / archived | Fallen roof piece, broken walls, overgrowth — the Ruins look | ruined |

Condition is never a score and never a percentage.

### 3.7 Workers and steward roles

Workers are people or AI agents acting in the same cycle. All roles are **proposed** until written into `Philosophy/Model/Agents`.

| Role | Does | Drawn as | Glyph |
| --- | --- | --- | --- |
| Steward | Tends and ratifies an island | Figure with a staff | `role-steward` |
| Archivist | Curates the Library | Figure with a tome | `role-archivist` |
| Cartographer | Maps links and routes (Connect) | Figure with dividers | `role-cartographer` |
| Builder | Builds tools and harnesses | Figure with a hammer | `role-builder` |
| Navigator | Works the trade routes between islands | Figure with a sextant | `role-navigator` |
| Scout | Acquires and captures new material | Figure with a spyglass | `role-scout` |
| Historian | Reflects on history; retrospect | Figure with a scroll | `role-historian` |
| Guardian | Holds boundaries and authority | Figure with a shield, **no weapon** | `role-guardian` |
| Avatar | The one persona that crosses cultures and realms (emerging) | Figure bearing the compass mark | — |
| Culture | A territory's population of agents (norms from its harness) | Figures in the territory's tint | — |
| Operator / Architect | External privileged role | **Not drawn on the map** | — |

Explainer-board roles map onto these: Curator → Archivist; Gardener → Steward; Harbourman → Navigator (at the Port); Observer → Historian or the Tower; Governance → Guardian. A role is a hat, not a species: the same role can be worn by a person or an agent.

### 3.8 Physical places — never drawn as land

| Concept | Meaning | Shown as |
| --- | --- | --- |
| Host | A physical machine by role (home, hub, agent host) | Not on the map; listed in Rig / Machine |
| Seat, standby | Where a territory is primarily tended; its replica | A small seat mark on the territory's cartouche |
| Address | `<territory>.<realm-domain>` | The local app's reach settings |
| Island GPS (_proposed_) | Global addressing, e.g. `isle://landscape/island/port/dock` | Coordinates in a cartouche; must reconcile with the address form |

### 3.9 Open items in meaning: how to draw until decided

The questions themselves are listed once, in 16.5.

| Item | Until decided |
| --- | --- |
| **Bridge vs Causeway** (the app's _Bridge_ is command — plan / confirm / receipt; canon's _Bridge_ is translation) | Draw the stone bridge for translation; in the app write "Bridge" only for the Act job; never put the bridge glyph on the Act job |
| **Mill vs Engine house** | Draw a stone house with a waterwheel; id `mill`; label "Mill (proposed)" |
| **Steward roles** (3.7) | Mark them proposed in public copy |
| **The mark** | The canon roundel is the logo; the compass is only an orientation motif |
| **Local app name** | Write "Observatory" (working name) until Gate B; draw the app as the Tower |
| Commons, Ruins, compass rose, storm, whale song, tide lines | Usable in drafts and mockups, marked proposed |

---

## 4. Voice and copy

### 4.1 Tone

Calm, exact, unhurried, hopeful. Write like a good atlas or a scientific publication: confident statements, plain words, one idea per sentence. The metaphor carries warmth; the sentences carry precision. Never breathless, never salesy, never cute.

| Be | Not |
| --- | --- |
| Calm and declarative | Hype, exclamation marks, "revolutionary", "supercharge" |
| Specific: name the place, the record, the time | Vague: "stuff", "things", "magic" |
| Metaphor that maps to meaning (section 3) | Decorative fantasy: quests, spells, levelling up |
| Human-centred: people and agents work _in_ the realm | AI as hero or threat |
| British English: organise, colour, centre, catalogue, programme, licence (noun) | US spelling |

### 4.2 Words

| Use | Avoid | Why |
| --- | --- | --- |
| realm, territory, island, Capital, Citadel | estate (in display copy), workspace, tenant | Section 2 |
| Port | Harbour | Retired 18 Oct 2026 |
| steward, tend, ratify, chart, voyage | own, harvest, crush, hack | Stewardship over extraction |
| workers; Steward, Archivist… | bots, minions, copilots (as a class) | Agents are workers, human or AI |
| thriving · quiet · weathered · ruined | health score, 96 % harmony, map completion 34 % | No game scores |
| Known Lands | the metaverse, the grid | Canon name |
| Capture · Connect · Reflect | ingest · process · output | Canon cycle |
| observe, attend, act, extend | monitor, alert, execute, plugin | The local app's four jobs |

### 4.3 Sentence style

- Sentence case for headings, buttons and labels; Title Case only for proper names (Council Hall, Map of Known Lands).
- Cartouche and map labels are set in small caps by the typeface, not typed in capitals.
- Headlines: one short declarative sentence ending in a full stop. Subheads: one sentence, under 20 words.
- Microcopy: verb first, under six words. Errors say what happened and what to do.
- Numbers: figures for all counts; dates `YYYY-MM-DD`; times `YYYY-MM-DD HH:MM` (24-hour, local); never "3 days ago" alone in the app (relative may follow the stamp in muted text).
- No emoji anywhere. Use glyphs (section 8).

### 4.4 Examples

| Kind | Good | Why it works |
| --- | --- | --- |
| Headline (home) | **Knowledge is a civilisation question.** | Canonical; declarative; stays |
| Banner | **Tools change. Landscapes endure.** | Canonical; two beats |
| Section head | The Port — Capture | Place, then cycle step (replaces "The Harbour — Capture") |
| Subhead | Information arrives without judgement and is routed inward. | Says what happens |
| CTA (brass) | Enter Arcadia | Place as verb; one primary per page |
| Secondary CTA | Begin the journey · Explore the map | Quiet outline |
| Archetype card | Engineering Forge — Build, ship and evolve software systems. | Name + one line |
| Empty state (app) | No signals. The realm is quiet. | Calm, true |
| Foot-of-view note (app) | Ranked by severity, then by last change. Gold: attention. Rust: blocking. | Rules below the data |
| Confirmation (app) | Pull 3 repositories in territory `hnr`? This changes files on disk. | Names scope and effect |
| Receipt (app) | Pulled 3 of 3 · 2026-10-18 09:42 · via loopback | Outcome, time, way in |
| Don't | 🚀 Supercharge your knowledge with AI! | Emoji, hype, AI as hero |

### 4.5 Naming conventions

| Thing | Convention | Example |
| --- | --- | --- |
| Product names | Title Case, no articles | Knowledge Islands, Map of Known Lands, Living Map |
| Places in copy | "the" + Title Case | the Port, the Council Hall, the Citadel |
| Repository / record ids | Monospace, exact case | `ki-principal`, `PDR-KI-OBSERVA-002` |
| Tokens | kebab-case, role first | `--paper`, `--ok-wash`, `--terrain-marsh` |
| Glyph ids | kebab-case noun, matching the tile name where both exist | `council-hall`, `rail-depot` |
| Tile manifest ids | `<kind>.<name>` | `terrain.marsh`, `structure.dock`, `decal.ivy` |
| Components | `ki-` prefix; only the two shared elements (12.1) | `<ki-glyph>`, `<ki-hexmap>` |
| Packages | `@knowledgeislands/<name>` | `@knowledgeislands/tokens` |
| Repo | `ki-design` | — |
| Decision records | Existing series only; ids never rewritten | `PDR-KI-OBSERVA-007` |

---

## 5. Colour

### 5.1 Core palette

The site's palette is kept verbatim; the local app's derived values are promoted to core.

| Token | Hex | Group | Role |
| --- | --- | --- | --- |
| `--color-navy` | `#0f2440` | Sea & sky | Night paper; deep sea; hero ground |
| `--color-ocean` | `#1b3a5c` | Sea & sky | Accent; links; open sea |
| `--color-teal` | `#317070` | Sea & sky | Shallows; currents; secondary accent |
| `--color-mist` | `#eef1f5` | Sea & sky | Cool alternate surface |
| `--color-forest` | `#2d5a3d` | Land | OK; forests |
| `--color-moss` | `#4a7a5a` | Land | Secondary land; growth |
| `--color-sandstone` | `#c4a882` | Land | Limestone, sand, warm rules on hero |
| `--color-parchment` | `#f5efe0` | Paper & ink | Light paper; night ink |
| `--color-ink` | `#1a2030` | Paper & ink | Light text (never pure black) |
| `--color-ink-light` | `#4a5568` | Paper & ink | Muted text, light |
| `--color-border` | `#d4c9b4` | Paper & ink | Rule, light |
| `--color-border-light` | `#e8e0d0` | Paper & ink | Faint internal divisions (site only) |
| `--color-gold` | `#c8963c` | Brass | Brass fills, CTAs, lanterns, gold on navy |
| `--color-text-gold` | `#8a5a12` | Brass | **Brass text on parchment** |
| `--color-rust` | `#9b2c1c` | Hazard | Blocking, reefs |

### 5.2 Semantic roles (light = printed chart; night = chart by lantern-light)

Exact values from PDR-KI-OBSERVA-002 (which calls night "dark"); every foreground role is ≥ 4.5:1 on its paper. **Night is the reference rendering**: mock up and judge night first, then check light. The app shell follows the OS theme (`prefers-color-scheme`); the site's behaviour is open (16.5).

| Role | Maps to | Light | Ratio on parchment | Night | Ratio on navy |
| --- | --- | --- | --- | --- | --- |
| `--paper` | — | `#f5efe0` | — | `#0f2440` | — |
| `--ink` | ink | `#1a2030` | 14.16 | `#f5efe0` | 13.59 |
| `--muted` | muted | `#4a5568` | 6.56 | `#a9b4c4` | 7.43 |
| `--accent` | ocean | `#1b3a5c` | 10.13 | `#9fbbd8` | 7.85 |
| `--ok` | forest | `#2d5a3d` | 6.93 | `#8fc4a0` | 7.85 |
| (teal) | teal | `#317070` | 4.97 | `#7fc2c0` | 7.71 |
| `--warn` | gold | `#8a5a12` | 5.15 | `#c8963c` | 5.85 |
| `--bad` | rust | `#9b2c1c` | 6.61 | `#f0947a` | 6.85 |

Night muted is a cool neutral on purpose: sandstone shares gold's hue, so metadata would read as warning. Gold means attention, alone.

### 5.3 Washes

A wash is the role mixed into the paper; status chips and the Beacon's severity column are drawn on it. Each keeps its own role's text at ≥ 4.5:1.

| Wash | Mix | Light hex | Text ratio | Night hex | Text ratio |
| --- | --- | --- | --- | --- | --- |
| `--ok-wash` | forest 12 % into paper | `#ddddcc` | 5.79 | `#1e374c` | 6.20 |
| `--warn-wash` | gold 8 % into paper | `#f1e8d3` | 4.85 | `#1e2d40` | 5.24 |
| `--bad-wash` | rust 12 % into paper | `#ead8c8` | 5.47 | `#2a3147` | 5.66 |

The hex values are computed from the mixes; the mix is the source of truth and the token build emits it.

### 5.4 Rule vs boundary

Two edges, two jobs. The **rule** separates rows and panes and recedes; it has no floor (ratios are recorded so a change is deliberate). The **boundary** is a control's edge — where a reader can act — held to 3:1 (WCAG 1.4.11).

| Role | Light | Ratio | Night | Ratio | Used for |
| --- | --- | --- | --- | --- | --- |
| `--rule` | `#d4c9b4` | 1.43 | `#24476e` | 1.63 | Table rows, pane edges, hairline frames |
| `--boundary` | `#9a8358` | 3.18 | `#5f7896` | 3.43 | Inputs, selects, buttons, pickers, focusable hexes |

Never draw a control's edge in the rule colour.

### 5.5 Sea fills (maps)

| Token | Light | Night | Use |
| --- | --- | --- | --- |
| `--sea-deep` | `#b9cfd2` | `#0b1b31` | Open ocean far from land |
| `--sea` | `#d6e3e1` | `#0f2440` | Default water |
| `--sea-shallow` | `#e4ece4` | `#17345a` | Within one hex of land |
| `--current` | `#317070` | `#7fc2c0` | Current lines |
| `--lane` | `#8a5a12` | `#c8963c` | Trade-route lanes |

### 5.6 Terrain palette (flat fills)

Twelve terrain fills for the flat renderer; isometric art is painted to match. _Proposed values_ (the authority is `packages/tokens/tokens.json`; this table mirrors it), chosen to sit inside the palette and to keep a pattern or label legible. Every terrain also carries a **pattern** so colour is never the only carrier. Forest (4.30) and mountain (4.44) fall just under 4.5:1 for text set directly on them, so map labels always carry a paper halo and never sit bare on a fill. Night fill = day fill mixed 45 % into navy (emitted by the token build).

| Token | Light fill | Ink on fill | Pattern (drawn in) | Night fill |
| --- | --- | --- | --- | --- |
| `--terrain-grassland` | `#a9b97c` | ink 7.67 | Sparse grass ticks (ink 40 %) | `#647661` |
| `--terrain-forest` | `#4f7a57` | parchment 4.30 | Small pines (parchment) | `#32534d` |
| `--terrain-hills` | `#b9a56f` | ink 6.71 | Contour ticks (ink) | `#6d6b5a` |
| `--terrain-mountain` | `#8c8577` | ink 4.44 | Chevron peaks (ink) | `#54595e` |
| `--terrain-coastal` | `#cfc79a` | ink 9.50 | Stipple dots (ink 40 %) | `#797e72` |
| `--terrain-cliffs` | `#a2927c` | ink 5.37 | Vertical strata lines under a hard top edge (ink) | `#606061` |
| `--terrain-sand` | `#e4d4a6` | ink 11.03 | Dune arcs (ink 40 %) | `#848578` |
| `--terrain-river` | `#6f9db5` | ink 5.54 | Two flowing lines (parchment) | `#446780` |
| `--terrain-marsh` | `#7f9070` | ink 4.74 | Short horizontal dashes with reeds (ink) | `#4d5f5a` |
| `--terrain-snow` | `#eef1f5` | ink 14.33 | Sparse crosses (ink 30 %) | `#8a95a4` |
| `--terrain-volcanic` | `#5b4743` | parchment 7.54 | Radiating cracks (gold) | `#393742` |
| `--terrain-ocean` | `--sea` `#d6e3e1` | ink 12.32 | Short wave dashes (ink 30 %) | `--sea` `#0f2440` (not mixed) |

**Fog is a map state, not a terrain.** `--fog` (`#cfd3d6`, ink 10.78; night `#657384`) is a diagonal hatch laid over whatever lies beneath, marking uncharted or unobserved hexes. Ruins and ancient forest are **structures** (10.4) standing on grassland or forest; there is no ruins or uncharted terrain fill.

Map labels never rely on fill contrast: they sit on a paper halo (section 13).

### 5.7 Per-island palettes

The canon's four palettes become per-island options within any tile set. Five colours each, in the order **sea · land · accent land · stone/built · brass**. _Proposed values._

| Palette | Sea | Land | Accent land | Stone / built | Brass | Character |
| --- | --- | --- | --- | --- | --- | --- |
| **Archipelago** (default) | `#1b3a5c` | `#4a7a5a` | `#2d5a3d` | `#e3d3a8` | `#c8963c` | Deep blue sea, green islands, pale sand; the brand at rest |
| **Savanna** | `#3f6f7a` | `#b8a061` | `#6b7a3e` | `#a65a3a` | `#c79a4b` | Dry grass, acacia green, terracotta roofs, ochre light |
| **Natural Colours** | `#6f9fb0` | `#a3b26f` | `#4a7a5a` | `#8c8a80` | `#6b4f3a` | Meadow, moss, grey stone, bark brown; no gilt — the "brass" slot is timber |
| **Glass and Stone** | `#4f8f86` | `#9cc5bf` | `#4f5b66` | `#e8e1d0` | `#b0843a` | Limestone, slate, sea-glass, verdigris; the classical observatory look |

A palette recolours terrain and buildings in the art; it never changes semantic roles (`--ok`, `--warn`, `--bad`), which stay identical on every island so signals mean the same thing everywhere.

### 5.8 Usage rules

1. **Brass text on parchment is `#8a5a12`** (text-gold). Gold `#c8963c` on parchment is 2.32:1 and fails; use it only for fills, rules, lanterns, and text on navy (5.85:1). Ink on a gold button is 6.1:1; navy on gold is 5.85:1.
2. **Never pure black (`#000`) or pure white (`#fff`).** Ink is `#1a2030`; light is `#f5efe0`.
3. **Colour is never the only carrier of meaning.** Every status has a word; every terrain has a pattern; every signal has a shape (lantern, reef, fog).
4. One brass call to action per view. Gold elsewhere means attention.
5. No neon, no saturated RGB, no gradients beyond soft atmospheric ones in illustration. UI surfaces are flat.
6. Night is the same chart by lantern-light, not a separate "gamer" theme: same hues, adjusted lightness.

---

## 6. Typography

### 6.1 Two dialects

| | Chart (site) | Instrument (app) |
| --- | --- | --- |
| Display | **Cormorant Garamond** 500–600, at **24 px and above only** | System serif: `ui-serif, "New York", "Iowan Old Style", Georgia, serif` |
| Labels, cartouches, map labels | **Cormorant SC** 500–600, tracked **0.14–0.18 em**, with a brass hairline beneath | Monospace for identifiers and map labels; no small caps |
| Body | **Inter** 400 / 500 / 600 | System sans: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| Code / identifiers | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace` | Same stack (`--font-identifier`) |
| Leading | Ratio (unitless) | **Fixed pixel** leading, so row heights can be summed by test |
| Loading | Google Fonts or self-hosted WOFF2, `font-display: swap`, subset Latin | **Nothing fetched or bundled** |

Cormorant replaces Playfair Display on the site. Cormorant's small x-height makes it unfit below 24 px; never set body, buttons or table text in it.

### 6.2 Site type scale

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

### 6.3 App type scale (reference values)

Fixed pixel leading. The shell's published scale is authoritative; these are the reference values a designer should mock up with. Only tokens from the scale may be used — a raw pixel length fails a test.

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

### 6.4 Figures and dates

- Counts, dates, times and ranks use **tabular figures** in both dialects (`font-variant-numeric: tabular-nums lining-nums`), so columns align digit under digit.
- Time format: **`YYYY-MM-DD HH:MM`**, local, 24-hour; sorts as it reads. Date alone: `YYYY-MM-DD`. On the site's narrative pages a long form ("18 October 2026") is allowed in running prose only.
- Percentages only for real measurements, never for scores.

---

## 7. Space, shape and layout

### 7.1 Spacing scale (4 / 8 based)

| Token | px | Typical use |
| --- | --- | --- |
| `--space-0` | 0 | — |
| `--space-1` | 2 | Hairline offsets, chip inner gap |
| `--space-2` | 4 | Icon-to-text in dense rows |
| `--space-3` | 8 | Table cell vertical padding, small gaps |
| `--space-4` | 12 | Table cell horizontal padding, control padding |
| `--space-5` | 16 | Phone gutter, card padding (app) |
| `--space-6` | 24 | Pane padding, card padding (site) |
| `--space-7` | 32 | Between groups |
| `--space-8` | 48 | Section padding on phones |
| `--space-9` | 64 | Section padding on desktop |
| `--space-10` | 96 | Hero rhythm, "open sea" between Voyage chapters |

Whitespace is open sea and navigable distance: on the site be generous; in the app, density is the product — never add space that costs Beacon rows.

### 7.2 Radii

| Token | px | Use |
| --- | --- | --- |
| `--radius-sm` | 4 | Chips, tags, inputs, buttons (app and site) |
| `--radius-md` | 8 | Site cards, panels, popovers |
| `--radius-lg` | 16 | Site feature panels, archetype cards, illustration frames |
| `--radius-round` | 999 | Glyph roundels, journey step markers |

The app uses `sm` almost exclusively; tables and panes are square-edged.

### 7.3 Borders and elevation

- **Hairline only.** Borders are 1 px in `--rule` (separation) or `--boundary` (controls). Focus is a 2 px ring (section 15).
- **No drop shadows** in either dialect's UI. Elevation is shown by a hairline and a change of surface (`--paper` → mist or a wash), never by blur.
- **Deckled hairline frame** (site only): a parchment panel with a 1 px `--rule` outer line and a second 1 px line inset 4 px, corners optionally marked with a small brass tick — the printed-atlas frame.
- Painted art may carry soft shadows inside the picture; UI chrome never does.

### 7.4 Grids and widths

| Context | Grid |
| --- | --- |
| Site, desktop | 12 columns, 24 px gutters, max content 1200 px; prose column max 68 ch (~680 px) |
| Site, tablet | 8 columns, 24 px gutters |
| Site, phone | 4 columns, **16 px side gutter**, 16 px gutters |
| App, wide | 1440 px reference (laptop given to the app); frame gutter 16 px |
| App, narrow | **720 px** reference (half screen beside an editor); at ≤ 760 px the frame gutter narrows to 8 px |

### 7.5 Density targets (app)

- At 800 px viewport height, the **Beacon shows ≥ 12 ranked rows** without scrolling, at both 1440 and 720 widths. Asserted against the shipped stylesheet.
- A row is one line of `--text-base` (20 px) + two row paddings + one 1 px rule; any change to these is a change to the density model.
- Shell glyphs (tabs, subject column) cost **zero rows**: sized to the existing line height.

### 7.6 Responsive rules

1. **No horizontal page scroll**, ever, at any width, in either dialect. The only sideways scroller is the app's instrument tab bar, inside its own width, with no scrollbar drawn and an edge fade only while that edge hides tabs.
2. **Tables never become cards.** At narrow widths the least load-bearing columns drop (declared per table), rank and subject survive, and cells wrap (section 12).
3. Site at phone width: 16 px gutter; hero map crops to the Citadel and Port, cartouches collapse into a district list beneath; journey rail becomes a vertical list.
4. Maps scale inside their container; the container is covered by the no-horizontal-scroll test.
5. Touch targets ≥ 44 × 44 px on the site; app controls follow the published control height (reference 28 px) because it is a pointer-first desktop tool.

### 7.7 Site structure: the Voyage and the Atlas

Navigation: **Philosophy · Model · Arcadia · Landscapes · Docs · Projects**, with **Enter Arcadia** as the one brass CTA. Stable routes (`/install/ki`, `/harness/bootstrap`, `/specifications/…`) never move.

| Half | Read how | Pages |
| --- | --- | --- |
| **Voyage** | Once, in order, to understand | Home → Philosophy → Model → Arcadia → Landscapes → Create |
| **Atlas** | Returned to, to look things up | Field Guide (symbols, structures, terrain, roles, "How the map works"), Docs, Specifications, Projects / Journal |

Every Voyage page links to the Atlas entries it mentions; every Atlas entry links back to where the Voyage explains it.

| Page | Purpose | Key components |
| --- | --- | --- |
| Home | One-screen promise, then the journey | Cartographic hero (Arcadia, district cartouches); "Knowledge is a civilisation question."; journey rail (The Problem · A New Paradigm · The Islands · Stewardship · Landscapes · Create); principle strip (six principles); "Tools change. Landscapes endure." banner |
| Philosophy | Information → Knowledge → Wisdom; the cycle | Three-layer island cross-section; tide-cycle diagram of Capture / Connect / Reflect |
| Model | Island, Capital, Territory, Archipelago, Agents | Living Map with legend; click a structure to read its concept |
| Arcadia | The reference island | Arcadia map; districts link to source repositories |
| Landscapes | Archetypes | Filterable archetype cards: Engineering, Research, Creative, Learning, Enterprise, Personal, Community |
| Create | Start an island | Six-step wizard (archetype → governance → stewards & agents → landscape → ports → launch) ending in the real bootstrap command |
| Docs | Get started, `ki`, harness, prompting | Quiet parchment layout, glyph sidebar, section-header illustration only |
| Projects / Journal | Repositories and updates | Card per project with structure glyph and condition state |

---

## 8. Iconography

### 8.1 The line-glyph specification

| Property | Rule |
| --- | --- |
| Grid | 24 × 24 px artboard, `viewBox="0 0 24 24"` |
| Safe margin | 2 px on every side; live area 20 × 20 |
| Stroke | 1.5 px at 24 px, `stroke-linecap: round`, `stroke-linejoin: round`, `vector-effect` off (stroke scales) |
| Optical sizes | **16, 20, 24 px**. At 16 px redraw with fewer details (drop windows, inner lines) and stroke 1.25 px, snapped to the pixel grid; at 20 px stroke 1.5 px; never scale a 24 px drawing below 20 px |
| Colour | `currentColor`. **Ink on paper** in light; **paper (parchment) on navy** at night |
| Fills | **None**, except small brass accents (a lamp, a flame, a star point) ≤ 10 % of the live area, in `--color-gold` on navy or `--color-text-gold` on parchment |
| Style | Engraved, cartographic: straight sides and gentle arcs; perspective is front elevation or slight three-quarter, never isometric; no gradients, no shading, no outline-plus-fill duotone |
| Forbidden | Emoji; brand logos of third parties in the glyph set; weapons; faces with expressions; robot heads |
| Delivery | One SVG sprite (`<symbol id="ki-…">`) with a typed name union; `<ki-glyph>` renders it (section 12) |
| Labelling | Decorative glyphs `aria-hidden="true"`; meaningful glyphs carry a label |

The site may additionally use glyphs inside a **roundel**: a circle of 1 px brass hairline at 40 px or 56 px, glyph at 24 px centred — for the journey rail, principle strip and Field Guide. The Illustrated explainer style may colour the roundel's interior with a single per-role tint at 15 % (section 9.3); the app never uses roundels.

### 8.2 Glyph inventory

Sixty-one glyphs, plus six value icons (below). "Draw" is a one-line brief for the vector artist.

**Symbols**

| Id | Draw |
| --- | --- |
| `island` | A low hump of land with two contour lines, three short wave strokes beneath |
| `archipelago` | Three small island humps of different sizes joined by a dotted arc |
| `route` | A dotted S-curve between two small open circles |
| `trade-route` | A small two-masted sail over a dashed curved line |
| `current` | Two parallel flowing curves, each ending in an open arrowhead |
| `weave` | Two sinuous strands crossing twice, a small brass dot at one crossing |
| `lighthouse` | Tapered tower with a lamp room and two short light rays to one side, on a rock line |
| `observatory` | Dome on a drum with a vertical slit and a telescope tip emerging |
| `port` | Anchor whose stock is a short quay line |
| `bridge` | Stone arch with two piers and a wave line under the arch |
| `reef` | Three jagged rocks breaking a single water line |
| `terrain` | Three stacked contour lines rising to the right |
| `ancient-forest` | One broad old tree with a heavy trunk and spreading crown, two small conifers behind |
| `grid` | A pointy-top hex with one neighbour drawn partially at its upper right |
| `celestial` | Eight-point star with a thin circle behind it |
| `compass` | Eight-point compass rose, north point longer, small brass centre (orientation motif; not the logo) |
| `fog` | Three horizontal wavy strokes of decreasing length |
| `ruins` | Two broken columns of unequal height and a fallen lintel |

**Places within an island**

| Id | Draw |
| --- | --- |
| `citadel` | Wall line with three rooftops behind it: dome, pediment, slender tower |
| `library` | Small dome over four columns on a stepped base |
| `council-hall` | Pediment over four columns on a wide stepped base, no dome |
| `tower` | Slender square tower with a crenellated top and one lit window (brass dot) |
| `calendar` | Clock face on a short tower top, hands at ten past ten |
| `resources` | Open archive drawer with two card edges |
| `streams` | A river branching once and widening to the bottom edge |
| `mill` | Small gabled house with a waterwheel on its side (proposed; name open: Mill or Engine house) |
| `workshop` | Anvil with a hammer above it (proposed; also "forge") |
| `commons` | Market canopy with three posts over a short ground line (proposed) |
| `inbound` | Small chevron arrow entering an open square from the left (`+`) |
| `outbound` | Small chevron arrow leaving an open square to the right (`-`) |

**Port modes**

| Id | Draw |
| --- | --- |
| `dock` | Jetty in perspective with three posts and a small boat |
| `rail-depot` | Two rails with sleepers converging, a platform canopy above |
| `airport` | Mooring mast with a small airship tethered at its top |
| `customs-house` | Gatehouse arch with a horizontal barrier across it |

**Instruments and app concepts**

| Id | Draw |
| --- | --- |
| `beacon` | Lantern with a brass flame (the Beacon's tab; distinct from `lighthouse` at small sizes) |
| `vessel` | Small single-sail boat on one wave line (Sessions) |
| `scroll` | Rolled scroll with one line of text (Documents) |
| `workbench` | Trestle bench with a set square on it (Artifacts / Extensions) |
| `tide-gauge` | Vertical graduated post standing in water (Activity) |
| `sea-lane` | Dashed curve with a small sail at its midpoint (Trade routes tab) |
| `known-lands` | Folded map with a hex outline on its face |
| `machine` | The `mill` gable with a small gear in the window (Machine / Rig) |
| `lantern-signal` | Hanging lantern, brass fill in the glass (attention marker) |
| `reef-signal` | Single reef rock with a short rust underline (blocking marker) |

**Steward roles** (proposed)

| Id | Draw |
| --- | --- |
| `role-steward` | Upright staff with a small hooked crook |
| `role-archivist` | Closed tome with a ribbon bookmark |
| `role-cartographer` | Pair of dividers, legs apart |
| `role-builder` | Claw hammer, head up |
| `role-navigator` | Sextant arc with its index arm |
| `role-scout` | Extended spyglass, angled up |
| `role-historian` | Unrolled scroll with a quill |
| `role-guardian` | Heater shield with a single vertical band; no weapon |

Roles are drawn as **tools**, not faces, in the glyph set; figures appear only in illustration.

**UI basics**

| Id | Draw |
| --- | --- |
| `search` | Spyglass lens circle with a short handle (not a magnifier on a stick — the same geometry, a slightly longer barrel) |
| `filter` | Funnel of three decreasing lines |
| `external` | Square with an arrow leaving the top-right corner |
| `close` | Two crossing strokes |
| `chevron` | Single open chevron (rotate for direction) |
| `check` | Single tick |
| `info` | Circle with a short stroke and a dot |
| `menu` | Three horizontal strokes, the middle shortest |
| `theme` | Half-filled circle drawn as an outline crescent beside a small star (night chart) |

**Value icons** (canon meanings, from the Symbol Library sheet): Library — knowledge resources (reuses `library`); Governance — stewardship and ethics (reuses `council-hall`); `value-trust` — security and reliability (shield with an eight-point star); `value-community` — people and collaboration (three heads-and-shoulders outlines, no faces); `value-growth` — emergence and evolution (seedling, two leaves); `value-exploration` — discovery and curiosity (`compass` inside a circle); `value-creation` — ideas and expression (pen nib); `value-sustainability` — balance and regeneration (single leaf with a vein).

---

## 9. Illustration and art direction

### 9.1 The three directions

| | **Modern** (tile set) | **Ancient** (tile set) | **Illustrated explainer** (diagram style) |
| --- | --- | --- | --- |
| Reference | The "Hex tile kit" sketch on the early design canvas, and the "Hex maps + isometrics" board: clean engraved linework, flat token fills | The two dusk website mood boards; "Age of Empires-esque" | The "How gstack works" and "Agentic operating system" boards |
| Character | Crisp engraved outlines in deep ink; flat fills from section 5.6 with each terrain's small ink motif; buildings as simple isometric line drawings with low-opacity fills; brass only for small accents | Painted, dusk-lit atlas art: layered terrain, lamp-lit dense settlements, cloud banks, glints on navy water; buildings crisp and readable as silhouettes at small scale | Daylight watercolour islands on a pale sea; parchment cartouches; coloured line icons in roundels; dashed routes; a tide loop at the foot |
| Light | Even, shadowless or one flat 15 % shade on south-east faces | Low warm sun from top-left at dusk, warm window light, cool sea | Soft overcast daylight, gentle cast shadows |
| Palette | Tokens exactly; island palette applied to fills | Navy and ocean dominant, forest and moss, sandstone, warm lamp gold; night is a tint layer | Pale sea `#d6e3e1`-ish, parchment, greens; one tint per role column (teal, ocean, forest, gold, rust, moss), each desaturated |
| Used for | The local app, docs, diagrams, print, small sizes, the flat twin of everything | Public hero, Living Map, Arcadia, posters, archetype cards | Explainers, the Field Guide's "How the map works", architecture posters, decks |
| Do | Constant stroke weight; legible at 32 px; pattern per terrain | Hundreds of tiny lights; fog at the map's edge; honoured ruins; ancient forest untouched | Generous whitespace; numbered steps; one idea per panel; real labels |
| Don't | Gradients, painted texture, perspective tricks | Glow, bloom, crystals, monsters, close-up faces, text baked into art | Heavy black outlines, saturated primaries, clip-art, crowded panels |

**Reference images, in words.**

- _Dusk mood boards (two variants):_ a navy page with a full-bleed painted island seen from high three-quarter view, hex lattice faintly visible on its terraces; a pale Citadel on the summit; districts labelled in dark translucent cartouches with Cormorant SC titles and a one-line subtitle ("The Archives — Memory & History"); a journey rail of six hex badges on parchment; archetype cards with painted thumbnails; a parchment principle strip of engraved glyphs; a compass rose in brass on parchment in the closing CTA.
- _Hex maps + isometrics board:_ a parchment explainer showing a hex topology beside its isometric render, then terrain swatches, settlements with leader-line labels, territory tint, routes (gold trade route, blue sea route), stacked data layers, and a four-step strip: hex layout → data / layers → isometric render → final map.
- _Explainer boards:_ tall posters on a pale blue sea; a lighthouse islet top-left; rows of rounded parchment cards, each headed by a coloured roundel glyph; small watercolour islands beneath each card; dashed coloured connectors; a bottom band titled "the tide" with six numbered roundels.
- _Canon sheets:_ hand-painted isometric tiles on a **square** grid under soft daylight (teal roofs, limestone domes, a 4×4 lighthouse landmark) — re-cut them to hexes (10.2); their prop list includes crystals, which this system excludes.

### 9.2 The 70 / 30 balance

Canon: **70 % infographic clarity, 30 % illustrative warmth.** Practically:

| Surface | Infographic | Illustrative |
| --- | --- | --- |
| Home hero | 30 | 70 (the one place the painting leads) |
| Voyage pages | 70 | 30 |
| Explainer posters | 70 | 30 |
| Field Guide | 80 | 20 |
| Docs | 95 | 5 (section header only) |
| Local app | 100 | 0 (flat Modern only, as data) |

Semi-flat, lightly painterly, premium infographic quality; detailed but clean; atmospheric without becoming fantasy art. No photorealism, comic-book, childish or clip-art styles.

### 9.3 Agent representation

- Humans represent stewardship, interpretation, context, wisdom and judgement. AI agents represent augmentation, operational scale, synthesis, continuity and infrastructure support. They coexist and collaborate; neither dominates.
- **AI is drawn as infrastructure, never as a humanoid.** Show AI work as the things it moves and tends: vessels on currents, lit lanterns along a route, a waterwheel turning, an airship at the mooring mast, light in the Tower. Never robots, androids, glowing eyes, brains, circuit faces.
- People are drawn small, grounded and diverse (age, build, skin tone, dress), in practical clothes of no single period, carrying their role's tool. No close-up faces in brand art; a figure is at most 1/12 of the image height except in a deliberate role portrait in the Field Guide.
- In diagrams, a worker is a **role glyph** plus a label ("Archivist — Claude Code"), never an avatar.
- Explainer boards that draw agents as islands are wrong for this system: agents work _on_ islands.

### 9.4 Never draw

Humanoid robots; glowing evil AI; neon; cyberpunk cities; circuit boards; blockchain cubes; node-graph hairballs; crystals; magic glow or spell effects; monsters or creatures (the whale is the one sea creature, and only far out at sea as a signal); temples or religious buildings; fantasy armour; weapons; skulls; game UI (XP bars, health bars, "map completion 34 %", "96 % harmony"); emoji; third-party logos inside the art; text baked into images; photographs of real people; pure black or pure white.

---

## 10. Tiles and buildings

### 10.1 Geometry

| Property | Value |
| --- | --- |
| Grid | **Pointy-top** hexes, axial `(q, r)`; cube coordinates for distance and pathing |
| Projection | 2:1 dimetric; every sprite normalised to it |
| Top face | **256 × 148 px** at 1× (512 × 296 at 2×) |
| Horizontal step | 256 px |
| Row step | **111 px** |
| Odd rows | Offset **+128 px** (odd-r offset layout) |
| Plinth | **48 px** deep: a darker cliff face with stratified rock bands |
| Sprite cell | **256 × 196 px** at 1× (512 × 392 at 2×); taller structures extend upward from the anchor |
| Scales | 1× and 2× for every raster; flat SVG twin at any size |
| Light | **Top-left**, fixed; never rotate painted art |

### 10.2 Footprints

| Footprint | Hexes | Orientation | Re-cut rule from square sheets |
| --- | --- | --- | --- |
| Single | 1 | — | 1×1 → 1 hex |
| Pair | 2 (oriented) | 0–5 (which neighbour) | 1×2 / 2×1 → pair |
| Flower | 7 (centre + ring) | — | 2×2 to 4×4 → flower; square plinth matted out, hex plinth repainted |

The Citadel (`structure.citadel`, at the heart of a Capital) is always a compound across a 7-hex flower: Library, Council Hall and Tower on one terrace around a central square. It may be drawn as one terrace sprite spanning the flower (as the Modern set does) or as separate buildings on ring hexes, but never as a single-hex building.

### 10.3 Terrain inventory

Each terrain has **3 variants** plus a flat SVG fill (section 5.6). Ids are `terrain.<name>`.

| Id | Flat token | Notes |
| --- | --- | --- |
| `terrain.ocean` | `--terrain-ocean` (`--sea`, `--sea-deep`) | Includes deep variant; animated shimmer |
| `terrain.coastal` | `--terrain-coastal` | Beach and shallows; water edge auto-tiled |
| `terrain.grassland` | `--terrain-grassland` | Default inhabited ground |
| `terrain.forest` | `--terrain-forest` | Ordinary woodland |
| `terrain.hills` | `--terrain-hills` | |
| `terrain.mountain` | `--terrain-mountain` | High stone; stable foundational knowledge |
| `terrain.cliffs` | `--terrain-cliffs` | Elevation step; edge overlay |
| `terrain.sand` | `--terrain-sand` | Dry, shifting sands (experimental ground) |
| `terrain.river` | `--terrain-river` | A river hex; a river along edges is `connector.river` |
| `terrain.marsh` | `--terrain-marsh` | Unsettled, emerging ground |
| `terrain.snow` | `--terrain-snow` | |
| `terrain.volcanic` | `--terrain-volcanic` | Rare; volatile knowledge; no lava glow, dull ember only |

These twelve are the whole terrain contract. **Not terrain:** `ancient-forest` and `ruins` are structures (10.4); uncharted is fog, a map state (3.5).

Jungle (emerging knowledge) is a variant of forest in tropical palettes, not a separate id.

### 10.4 Structure inventory

Ids are `structure.<name>`. Every structure has **3 variants** and **4 condition states**; hero structures also have one variant per architectural family. (The Modern brief's first release requires 3 variants only for terrain and the five hero structures.)

| Id | Footprint | Hero | Status |
| --- | --- | --- | --- |
| `structure.citadel` | flower (compound: Library, Council Hall, Tower around a square) | yes | decided |
| `structure.library` | single or pair | yes | canon (model) |
| `structure.council-hall` | pair | yes | decided |
| `structure.tower` | single | — | decided |
| `structure.observatory` | single | — | canon |
| `structure.lighthouse` | single (on coast) | yes | decided |
| `structure.port` | pair or flower (its modes as districts) | yes | decided |
| `structure.dock` | single (coast edge) | — | decided |
| `structure.rail-depot` | single | — | decided |
| `structure.airport` | single (mooring mast) | — | decided |
| `structure.customs-house` | single | — | decided |
| `structure.bridge` | single (the stone arch as a landmark) | — | canon (name open) |
| `structure.workshop` | pair | — | proposed |
| `structure.mill` | single | — | proposed (name open) |
| `structure.ruins` | single or pair | — | proposed |
| `structure.ancient-forest` | single or flower | — | canon; never shares a hex with another structure |
| `structure.cottage` | single | — | generic dwelling |

**Decals** (`decal.ivy`, `decal.cracks`, `decal.moss`, `decal.fallen-roof`) draw condition states (10.5). **Connectors** (`connector.road`, `connector.river`, `connector.bridge-span`, `connector.quay`) run across hex edges. These 12 terrain, 17 structures, 4 decals and 4 connectors are the v0 tile-set contract, matching the tile-set briefs.

**Beyond the contract** (_proposed_; a tile set need not cover them): `structure.calendar` (clock tower or sundial), `structure.archive` (Resources reading room), `structure.commons`; `prop.*` (trees, rocks, lamps, barrels, wells, boats, carts, statues — no crystals); ground ribbons `overlay.route`, `overlay.lane`, `overlay.current`; markers `signal.lantern`, `signal.reef`, `signal.fog`, `signal.storm` (3.5).

### 10.5 Condition states as decals

To keep the matrix shippable, condition states are **alpha decal overlays under the same light**, not full repaints: `thriving` (lit windows, chimney smoke, a flag), `quiet` (base art, unlit), `weathered` (moss, ivy, a crack, a missing tile), `ruined` (fallen roof piece, broken wall, overgrowth), built from the four `decal.*` ids. Sprite sheets carry one row per state and one column per frame; frame 0 of each row is the still.

### 10.6 Auto-tiling per edge

Painted art under fixed light cannot be rotated, so transitions are composited per edge: for each transition (water/land, cliff/land, sand/grass, river/land) draw **6 edge and 6 corner overlays**; a **6-bit neighbour mask** (bit 0 = east, counting anticlockwise in pointy-top axial order: E, NE, NW, W, SW, SE) chooses which overlays to stack. Water edges animate in phase with their neighbours on the shared clock.

### 10.7 Layering

| Flat renderer (SVG) | Isometric renderer (Canvas 2D) |
| --- | --- |
| 1. Terrain fills + patterns | Per cell, painter's order, **back row to front**, left to right: |
| 2. Water edges (auto-tiled) | a. terrain + edge overlays |
| 3. Structures (flat glyph-tiles) | b. plinth |
| 4. Routes and currents | c. ground ribbons (routes, currents) and influence tint / hex outline |
| 5. Influence tint (territory) | d. structure |
| 6. Signal markers | e. decals (condition, signals) |
| 7. Labels (on halo) | After all cells: markers, labels, fog banks |

### 10.8 Building standards

1. **Light top-left**, warm; shadows fall bottom-right at a consistent length (≈ 0.35 × height, _proposed_).
2. **Anchor** at the centre of the anchor hex's top face; recorded in pixels in the manifest.
3. **Overhang** beyond the footprint's top-face outline ≤ **8 %** of tile width; nothing overhangs the front plinth edge.
4. **Outline** 1.25 px at 1× (2.5 px at 2×), in deep ink (Modern) or a darkened local colour (Ancient) — **never pure black**.
5. **Palette from tokens** and the island palette; no colour that is not in section 5.
6. **Scale** (_proposed_): a door is ≈ 12 px tall at 1×; a storey ≈ 18 px; a hero structure may reach two cells' height.
7. **Silhouette first:** every structure reads as a silhouette at 25 % scale (64 px wide); Modern tiles are recognisable at 32 px wide.
8. **No text**, logos or worded flags on any building.
9. **Families** apply only to the five hero structures (Citadel, Library, Council Hall, Port, Lighthouse); other structures share one vernacular per set:

| Archetype | Family | Materials and silhouette |
| --- | --- | --- |
| Engineering Forge | Industrial vernacular | Slate roofs, stone and timber, chimneys, waterwheels |
| Research Archipelago | Classical observatory | Pale limestone, domes, colonnades, telescopes |
| Creative Wilderness | Organic | Thatch, living roofs, treehouses, carved wood |
| Learning Realm | Collegiate | Cloisters, towers, courtyards, ivy |
| Enterprise Territory | Civic harbour town | Brick, clock towers, cranes, warehouses |
| Personal Isle | Cottage | Single hearth, garden wall, a small jetty |
| Community | Commons | Meeting hall, market square, shared gardens |

### 10.9 The tile-set contract

A tile set is a skin over the same manifest ids. Two sets ship (**Modern**, **Ancient**); a community set is valid when it covers **every contract id** (10.3, 10.4) and passes `validateTileSet` and the Building standards. An island may adopt any valid set as local character; the local app defaults to Modern.

Manifest entry fields:

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | string | `terrain.marsh`, `structure.dock`… |
| `kind` | `terrain` · `structure` · `decal` · `connector` · `prop` · `overlay` · `signal` | |
| `footprint` | `single` · `pair` · `flower` · `edge` | |
| `orientation` | 0–5 or `null` | Which neighbour a pair or connector points to |
| `anchor` | `{ hex: [q, r], px: [x, y] }` | Anchor hex relative to footprint; pixel anchor in the sprite cell |
| `variants` | integer (≥ 3) | Number of art variants |
| `states` | `["thriving","quiet","weathered","ruined"]` | Rows in the sheet (structures) |
| `frames` | 1 (still) or 4 · 6 · 8 · 12 · 16 · 24 · 48 | Loop length |
| `fps` | 12 | Fixed |
| `scales` | `[1, 2]` | Raster scales provided |
| `flat` | path | The flat SVG twin |
| `family` | string or `null` | Architectural family (hero only) |
| `palette` | string | Archipelago · Savanna · Natural Colours · Glass and Stone |

### 10.10 Budgets

| Asset | Budget |
| --- | --- |
| Home hero at 1440 px | ≤ 400 KB, AVIF (WebP fallback), explicit width and height |
| Living Map atlas | ≤ 1.5 MB, lazy-loaded after first paint |
| Local app | Flat SVG only; any isometric view drawn in Canvas 2D from the same atlas; no PixiJS; everything inlined into one document |
| A single flat glyph-tile SVG | ≤ 4 KB after SVGO |
| Night | A tint layer (the one place a filter is allowed), not separate art |

---

## 11. Motion

### 11.1 The clock

- One global clock at **12 frames per second**; one master cycle of **48 frames (4 s)**.
- Every loop is a divisor of 48: **4, 6, 8, 12, 16, 24 or 48** frames. All loops realign every 4 s; neighbouring tiles never drift.
- Frame index = `floor(t × 12) mod 48`, shared by every tile on screen. A loop of length _n_ shows `frame mod n`.
- Nothing faster than a 4-frame loop. Tidal and celestial motion use the full 48.
- Frame 0 is the still: used under `prefers-reduced-motion`, in print, in the local app and as the thumbnail.

### 11.2 What moves

Defaults, as in `docs/briefs/animation-standard.md`:

| Element | Loop (frames) | Motion |
| --- | --- | --- |
| Sea and tide | 48 | Slow wave drift and glints; foam breathing at the shore, in phase across edges |
| Clouds and fog banks | 48 | Drift across one hex per cycle |
| Lanterns and windows | 8 | Gentle flicker, never strobing |
| Lighthouse lamp | 24 | Slow sweep |
| Mill wheel, windmill | 12 | One full turn per loop |
| Chimney smoke | 16 | Rise and fade |
| Sails and flags | 12 | Light flutter |
| Airship at mast (_proposed_) | 48 | Slight sway |
| Vessels on routes (_proposed_) | — | Moved along the lane path at ≤ 1 hex per 4 s |

### 11.3 UI motion

Slow, tidal, intentional: easing `cubic-bezier(0.4, 0, 0.2, 1)`; durations 160 ms (state), 240 ms (panel), 400 ms (map pan/zoom). No bounce, no overshoot, no spring, no parallax, no auto-playing carousels. Site scroll reveals: a 12 px rise with fade, once, never on text the reader is already reading. The local app has **no motion beyond state change**. Under `prefers-reduced-motion: reduce`, every animation shows frame 0 and every transition is instant.

---

## 12. Components

### 12.1 The web components toolkit

**Only elements both surfaces share become components: `<ki-glyph>` and `<ki-hexmap>`** (decided 18 Oct 2026). Everything else — buttons, dialogs, forms, tables, cartouches — is a pattern each surface builds from tokens (12.2, 12.3). The two are framework-neutral Custom Elements, built with **Lit** (_proposed_; spike KI-DESIGN-ELE-001), styled from tokens only (custom properties pierce Shadow DOM, so light and night reach inside), and server-rendered on the site with Declarative Shadow DOM so every page reads without JavaScript. Each element exports its stylesheet as a string so the app's density and contrast tests read it.

| Layer | Package | What it is |
| --- | --- | --- |
| 1 | `@knowledgeislands/tokens` | DTCG JSON → CSS custom properties (`--color-*` for Tailwind v4 `@theme` and bare roles `--paper`, `--ink`, `--accent`…), plus the app's vendored module with SHA-256 digest |
| 2 | `@knowledgeislands/hexmap` | Pure TypeScript: axial/cube maths, layout, neighbour masks, pathing; `IslandMap` in → SVG string out; no DOM |
| 3 | `@knowledgeislands/elements` | Thin Lit wrappers adding interaction |
| — | `@knowledgeislands/glyphs`, `@knowledgeislands/tiles` | Sprite + typed name union; atlases + manifest |

**Shared (both surfaces)** — attributes and events below are the proposed interface:

| Element | Attributes | Events | Rules |
| --- | --- | --- | --- |
| `<ki-glyph>` | `name` (typed union), `size` (`16` · `20` · `24`), `label` (omit = decorative, `aria-hidden`), `tone` (`ink` · `muted` · `accent` · `warn` · `bad`) | — | Renders the optical size, not a scaled drawing; inherits `currentColor` by default |
| `<ki-hexmap>` | `src` (URL of `IslandMap` JSON) or inline `<script type="application/json">` child; `renderer` (`flat` · `iso`); `tileset` (`modern` · `ancient`); `palette`; `layers` (space-separated: `terrain routes currents influence signals labels workers`); `selected` (island or hex id); `window` (`7` · `14` · `30` days); `static` (no interaction) | `ki-hex-focus` `{q, r, id}`, `ki-hex-select` `{q, r, id, island}`, `ki-layer-change` `{layers}` | Server-rendered static SVG first; enhancement adds roving tabindex and selection; text equivalent always rendered (section 13) |

**Site only (patterns, not kit components):** cartouche, journey rail, principle strip, archetype card (12.2); the site may build them as its own elements, outside `ki-design`. **App only (patterns):** status chip, tag, table with drop-columns, foot-of-view note, job switch, instrument tabs, plan / confirm / receipt panel, living under each instrument's root per PDR-002. PDR-002's "shared values, never shared rendering" stands except for the two shared components; that exception, and moving the vendored tokens' source from `ki-website` to `ki-design`, will be recorded in PDR-KI-OBSERVA-007 (not yet written; see the Observatory handoff).

### 12.2 Site patterns (Chart)

| Pattern | Anatomy | Rules |
| --- | --- | --- |
| **Cartouche** | Translucent navy panel (navy at 82 %), 1 px gold hairline, `--radius-sm`; Cormorant SC `label` title in parchment; Inter `meta` subtitle in `#a9b4c4`; a 6 px gold dot on a leader line to its place | Labels a place on a map; ≤ 3 words + ≤ 4-word subtitle; never floats free of a place; collapses to a list on phones |
| **Journey rail** | Six hex badges (56 px) joined by a hairline; number, title (Inter 600), one-line description (muted); current step in a navy badge with a gold ring | Always the canon sequence; links to its Voyage page; vertical list on phones |
| **Archetype card** | Painted thumbnail (Ancient set) 4:5 at top, `--radius-lg`, title in Cormorant `display-xs` on a navy scrim, one-line purpose in Inter | Filter chips above (All · Research · Engineering · Creative · Personal · Enterprise · Community); no ratings or counts |
| **Principle strip** | Six roundel glyphs on parchment, each with the principle's two halves on two lines ("Stewardship / over extraction") | Exact canon words and order; no added principles |
| **Cartographic hero** | Full-bleed Ancient painting; headline left in Cormorant `display-xl` parchment; brass rule; lead; primary brass CTA + outline CTA; district cartouches; the logo roundel in the header (16.5) | ≤ 400 KB; headline never over busy art (scrim from the left at navy 0→70 %); text list of districts beneath for no-JS and screen readers |
| **Parchment panel** | `--paper` with deckled hairline frame (7.3), Cormorant SC kicker with brass rule beneath | The default container for Voyage content |
| **Buttons** | Primary: gold `#c8963c` fill, ink text (6.1:1), `--radius-sm`; Secondary: 1 px boundary outline, ink or parchment text | One primary per view; sentence case; no icons-only buttons without labels |

### 12.3 App patterns (Instrument)

| Pattern | Anatomy | Rules |
| --- | --- | --- |
| **Table with drop-columns** | Header row (muted `--text-sm`, no fill), rows separated by `--rule`, rank and subject columns first; each instrument **declares** which columns drop at ≤ 760 px | Tables never become cards and never scroll sideways; surviving cells wrap; a test requires the declaration |
| **Status chip on wash** | Role text (`--ok` / `--warn` / `--bad`) on its wash, `--radius-sm`, `--text-xs` 600, word always present | A chip only where status asks for attention; a quiet value is a tag or plain text, so a chip always means something |
| **Tag** | Muted text in a 1 px muted outline, no fill | For labels that are values, not states |
| **Pane edge** | One `--rule` line | Never a shadow, never a double line |
| **Foot-of-view note** | `--text-xs` muted, below the data | Every ordering rule and legend sits here, under the data, not above it |
| **Status line** | Subject · summary · observed time on one line; truncates with full text on hover | Frame stays one height on every instrument |
| **Job switch** | Four text segments **Observe · Attend · Act · Extend**; current in accent text on a gold underline | Shows only that job's instruments; Act is visibly distinct (it mutates) |
| **Instrument tabs** | Text tabs (a 16 px glyph is proposed, pending PDR-007): current = accent text on gold underline; others muted | One row; scrolls inside its own width with an edge fade; active tab kept clear of the fade |
| **Known Lands chart panel** | Flat `<ki-hexmap>` filling the pane; layer toggles and time window (7 / 14 / 30 days) above as controls with boundary edges; legend in the foot-of-view note; isometric toggle | Selecting an island applies the shell's **filter, not a scope**; positions stored; covered by the no-horizontal-scroll test |
| **Bridge: plan / confirm / receipt** | Plan pane: declared tier, every input visible, effect stated, scope named. Confirm: a single boundary-edged button naming the action ("Pull 3 repositories"). Receipt: outcome, counts, `YYYY-MM-DD HH:MM`, way in ("via loopback" / "via tailnet as …") | Every mutation goes through all three; no mutation from a row click; Act is absent over the tailnet |
| **Who is working** | A column with role glyph + worker name (`role-archivist` Claude Code) | A column, not a dashboard; evidence-sourced only |

---

## 13. Maps

### 13.1 Three maps

| Map | Surface | Shows | Renderer | Interaction |
| --- | --- | --- | --- | --- |
| **Map of Known Lands** | Canon artefact; Field Guide; posters | The whole realm: territories as sea regions, islands, Capitals, trade lanes, fog at the edge | Either | Static or read-only zoom |
| **Living Map** | Site (Model, Arcadia, Landscapes) | An island or archipelago with structures and a legend; click a structure to read its concept | Isometric (Ancient) by default; viewer may switch to Modern | Zoom island → archipelago; select to read; set switcher |
| **Known Lands chart** | Local app instrument | The selected scope: each registered repository an island, zones as structures, condition states, Beacon signals, trade lanes, who is working | Flat SVG (Modern) default; isometric toggle | Select = filter; layers; time window |

### 13.2 Layers

`terrain` · `routes` (trade lanes; dashed = awaiting reciprocity) · `currents` · `influence` (territory tint or outline) · `signals` (lantern, reef, fog, storm) · `condition` (always on for structures) · `workers` (figures or vessels on the structures and routes touched) · `labels`. In the app, map labels are monospace on a paper halo (`paint-order: stroke`, 3 px stroke in `--paper`); on the site they are Cormorant SC cartouches.

### 13.3 How islands are typed (app)

A Knowledge Base island shows its zones as structures (Library, Council Hall, Port, Streams). A single-purpose repository is a small isle typed by its dominant building: Capital for a Principal, Workshop for `tools-*`, Bridge for `mcp-*`, Library for knowledge bases, Port for intake-heavy repositories. Layout is **deterministic**: positions are stored, so a repository stays where the operator learnt it was.

### 13.4 Interaction and keyboard

- One tab stop for the map (roving tabindex); **arrow keys move along axial neighbours** (Left/Right = W/E; Up = NW or NE, Down = SW or SE, with Shift choosing the east-side neighbour); Home = Capital; Enter = select; Escape = clear selection.
- Focus ring drawn on the **hex outline**, 2 px in `--accent`, plus a 1 px paper inner stroke.
- Pointer: click selects, drag pans, wheel or pinch zooms (site only); the app does not zoom by wheel inside a table frame.

### 13.5 Accessibility

Every map has a **text equivalent** rendered in the page (not only `aria-label`): a list of territories → islands → structures, each with its condition and signals as words and a link. Terrain is never colour alone (pattern per terrain, 5.6); signals are shapes plus words; the twelve terrain fills pass a colour-vision check (deuteranopia, protanopia, tritanopia simulation) for adjacent distinctness with patterns on. The no-JS Living Map is the static SVG plus the district list.

### 13.6 The IslandMap model (`islandmap/v1`, in brief)

| Object | Fields |
| --- | --- |
| Map | `schema: "islandmap/v1"`, `realm`, `tileset`, `generatedAt` (`YYYY-MM-DD HH:MM`) |
| Territory | `handle`, `name`, `capital` (island id), `tint`, `seat`, `standby` |
| Island | `id` (repository identity), `territory`, `archetype`, `palette`, `family`, `cells[]` |
| Cell | `q`, `r`, `terrain`, `elevation` (0–4), `variant` |
| Structure | `id` (manifest id), `anchor {q, r}`, `footprint`, `orientation`, `state` (thriving · quiet · weathered · ruined), `signals[]`, `zone` |
| Route | `from`, `to`, `kind` (trade · current · route), `status` (active · awaiting) |
| Worker | `role`, `name`, `kind` (human · agent), `at` (structure or route id), `source` (evidence) |

Positions are authored once and stored: per territory in a `[map]` table inside `.ki.toml` of its Principal; the realm layout with Known Lands in `ki-principal`; personal overrides in XDG state. Roster, roles, freshness and routes come from `ki` at build time (site) or observation time (app). The schema moves to `ki-specifications` once it settles.

---

## 14. Prompt library

All prompts are written for ChatGPT image generation (or any capable image model). Paste the **master prompt** first, then the asset template, then the **negative list**. Replace `{…}` placeholders. For the Ancient set, also attach the chosen picture of Arcadia (`docs/briefs/references/arcadia.png`) as the style reference; the Ancient brief's shorter per-tile prompt is an equivalent. Generate at the largest square or 3:2 size available, then clean, normalise and slice (section 10).

### 14.1 Master prompt (canon, verbatim)

```text
Create a premium Knowledge Islands visual in a calm, human-centred systems aesthetic. Blend elegant cartography, modern infographic design, organic interconnected knowledge systems, and subtle civilisational library influences. Use oceanic and natural colour palettes with deep blues, greens, sandstone, parchment, and restrained gold accents. The style should feel intelligent, timeless, exploratory, and structured - combining knowledge architecture, archipelago metaphors, woven connective fabric, and thoughtful technological futurism. Represent knowledge as a navigable ecology rather than a database. Prioritise breathable layouts, soft gradients, smooth curves, atmospheric depth, layered terrain, and calm infrastructural clarity. Motion and composition should evoke ocean currents, celestial navigation, and interconnected ecosystems. Avoid cyberpunk, harsh corporate aesthetics, neon colours, rigid technical diagrams, and generic AI imagery. Prioritise clarity, stewardship, wisdom, interconnectedness, and elegant systems thinking.
```

### 14.2 The picture of Arcadia (verbatim from the brief)

The defining image of the Ancient set; every later tile is painted to its light and palette.

```text
[Visual Style master prompt], then: A legendary, timeless painted map-illustration of Arcadia, the origin island of the Knowledge Islands Realm, seen from a high three-quarter isometric angle at dusk. The island rises from a deep navy sea in hexagonal terraces whose cliff edges show the faint geometry of a hex grid at the shoreline. On the highest ground stands the Citadel in pale limestone: a domed Library, a colonnaded Council Hall and a slender watchtower, lit from within. Below it, a Port town spreads to the coast: stone quays and wooden docks with small sailing ships, a caravan road winding inland, a tall mooring mast, and a customs house at the harbour gate. A domed observatory sits on a hill; a lighthouse stands on a far headland. Rivers run from the mountains to the sea past a watermill and a quarter of workshops. At the island's heart is an ancient forest of enormous old trees, untouched. On an outer ridge, honoured ruins of older buildings. Hundreds of small warm lamp-lights in windows and along roads; soft cloud banks drifting in from one edge; a fog bank where the map ends; gentle glints of light on the water and faint sea lanes curving away towards other islands. Painterly, richly detailed, calm and harmonious, in the tradition of illustrated atlases and environmental animation art, with buildings as crisp, readable silhouettes in the manner of a classic isometric strategy game. Palette of deep ocean blues, forest and moss greens, sandstone, parchment and restrained brass gold. No people in close-up, no text, no creatures, no crystals, no magic glow, no fantasy armour.
```

### 14.3 Terrain tile

```text
[Master prompt], then: A single isometric terrain tile for a strategy-map tile set, {tileset: "Ancient — painted, dusk-lit atlas art" | "Modern — clean engraved linework with flat colour fills, no texture"}. The tile is one pointy-top hexagon seen in 2:1 dimetric projection, top face exactly filling a 256 × 148 pixel hexagon, with a 48-pixel-deep stratified rock plinth visible on the three front faces. Terrain: {terrain, e.g. "marsh: low wet ground, reeds, small pools, a few stepping stones"}. Variant {1|2|3}: vary only small details. Light from the top-left, warm, soft; shadows fall to the bottom-right. Palette: {island palette, e.g. "Archipelago: deep ocean #1b3a5c, moss #4a7a5a, forest #2d5a3d, sand #e3d3a8, brass #c8963c"}. Centred on a plain transparent or flat light-grey background, nothing outside the hex, no neighbouring tiles, no buildings, no text, no border.
```

### 14.4 Structure tile (with family and condition)

```text
[Master prompt], then: A single isometric building sprite for a strategy-map tile set, {tileset}. Structure: {structure, e.g. "Library — a domed building with a colonnade, the island's canonical record"}. Architectural family: {family, e.g. "Classical observatory — pale limestone, domes, colonnades, telescopes"}. Footprint: {"one pointy-top hexagon" | "two adjacent hexagons, long axis running to the upper right" | "a flower of seven hexagons"}, seen in 2:1 dimetric projection, standing on a hexagonal, 48-pixel-deep stratified rock plinth; the building must not overhang the plinth by more than a sliver. Condition: {"thriving — lit windows, a thin wisp of chimney smoke, a small pennant" | "quiet — clean, unlit, still" | "weathered — moss and ivy on the walls, one cracked stone, a missing roof tile" | "ruined — roof partly fallen, broken walls, overgrown, honoured not grim"}. Light from the top-left; fine outlines in darkened local colour, never black. Crisp, readable silhouette at small size, like a classic isometric strategy game. Palette: {island palette}. Isolated on a plain transparent or flat light-grey background, no people, no text, no surrounding terrain beyond the plinth.
```

### 14.5 Port district

```text
[Master prompt], then: An isometric Port district for a Knowledge Islands map, {tileset}, on a flower of seven pointy-top hexagons along a coastline in 2:1 dimetric projection. The Port is where knowledge enters and is exchanged, shown as distinct quarters of one port town: {include the modes this island has: "a wooden dock with small sailing boats (hand-carried material)", "a small rail depot with a platform canopy and a short line of track running inland (scheduled feeds)", "a tall mooring mast with a moored airship (long-range arrivals from other systems)", "a stone customs house with a barrier at the port gate (a governed boundary where things are checked)"}. Arrivals quay on the left, departures quay on the right. Stone quays, timber warehouses, carts, coiled rope, lamps. {family}. Light from the top-left at {"dusk with warm lamp-light" | "soft daylight"}. Palette: {island palette}. Small figures only, distant, unarmed, in practical clothes. No jets, no runways, no modern containers, no text.
```

### 14.6 Illustrated explainer poster

```text
[Master prompt], then: A tall illustrated explainer poster, portrait 2:3, in a daylight watercolour style on warm parchment: small watercolour islands on a pale sea-glass blue sea (#d6e3e1), rounded parchment cards with thin hairline borders, each card headed by a coloured line icon inside a circular roundel, dashed coloured routes connecting cards and islands, and a band at the foot showing a numbered six-step loop titled with a tide motif. Subject: {subject, e.g. "how a Knowledge Island captures, connects and reflects: the Port receives material, routes carry it to the Library and Streams, the Tower and Observatory review it"}. Panels: {list panels}. Use generous whitespace, one idea per panel, a lighthouse islet in one top corner and a brass compass rose in a cartouche. Leave every text area blank or as soft placeholder lines so real typography can be set afterwards. Muted colours: ocean blue, teal, forest green, moss, sandstone, restrained gold, one desaturated rust for risk. No robots, no avatars of AI, no emoji, no neon, no heavy black outlines.
```

### 14.7 Icon description for vector tracing

```text
A single line icon for tracing into SVG: {glyph id and one-line drawing from section 8.2, e.g. "lighthouse — tapered tower with a lamp room and two short light rays to one side, standing on a rock line"}. Drawn on a 24 × 24 grid with a 2-unit empty margin, uniform 1.5-unit stroke, round line caps and round joins, no fills except {none | "a small gold fill in the lamp"}, front elevation (not isometric), engraved cartographic character, geometric and calm. Dark ink line (#1a2030) on a flat parchment (#f5efe0) background, centred, large, high contrast, nothing else in the image — no shadow, no gradient, no texture, no text, no frame.
```

### 14.8 Negative list (append to every prompt)

```text
Avoid: humanoid robots, androids, glowing eyes, AI brains, circuit boards, blockchain cubes, node-graph hairballs, cyberpunk, neon, bloom, lens flare, sci-fi HUDs, glossy 3D, plastic render, photorealism, photographs of real people, close-up faces, comic-book style, childish cartoon, clip-art, crystals, magic glow, spells, monsters, dragons, creatures (except a distant whale when asked), temples, religious buildings, fantasy armour, weapons, skulls, game UI, health or XP bars, percentages, scores, emoji, logos, watermarks, signatures, any text or lettering, pure black, pure white, oversaturated RGB colour.
```

---

## 15. Accessibility

| Area | Floor |
| --- | --- |
| Text contrast | ≥ **4.5:1** for every foreground role on its paper and on its wash (tables 5.2, 5.3), both themes, both dialects; held by test in the app |
| Large display text (site, ≥ 24 px) | Still ≥ 4.5:1 — Cormorant's thin strokes do not earn the large-text allowance |
| Control boundaries | ≥ **3:1** (`--boundary`) |
| Focus | Visible on every focusable element: 2 px `--accent` outline, 2 px offset (on gold buttons, 2 px ink outline); on hexes, the hex outline; never removed |
| Keyboard | Everything operable by keyboard; logical tab order; skip link on the site; maps use roving tabindex with axial-neighbour arrows (13.4); job switch and tabs follow the ARIA tabs pattern |
| Motion | `prefers-reduced-motion` → frame 0 everywhere, transitions instant; no motion is ever required to understand state; nothing flashes more than 3 times a second |
| Images | Meaningful art has alt text describing what it shows _and_ means ("Arcadia: the Citadel above the Port, ancient forest at the heart"); decorative art `alt=""` |
| Language | `lang="en-GB"`; plain language; abbreviations expanded on first use |
| Zoom | Usable at 200 % zoom and 320 px CSS width without horizontal scroll |

---

## 16. Governance and versioning

### 16.1 Canon vs this repository

| | `ki-principal/Pillars/Aesthetics` | `ki-design` (this repo) |
| --- | --- | --- |
| Holds | Prose canon: Visual Style, Symbol Library, Isometric Tiles, Diagrams, Logo; meaning | Machine-readable authority: tokens, glyphs, tile manifest and atlases, hexmap, elements, this file |
| Changes by | ki-principal **Enactment Process** (Stream ↔ Council → Pillars) and GDRs | Pull request, Kit's approval, semver release |
| Wins on | **Meaning** | **Values** (hex, px, ids), within the meaning canon sets |

### 16.2 How meaning changes

Meaning (section 3) never changes in `ki-design` first. A new symbol, renamed concept (Harbour → Port) or role is proposed as a Stream, reviewed in the Council Hall and ratified into the Aesthetics pillar (and, for a model zone, Home of Knowledge and Structure; Port is enacted by a GDR as a Phase 0 item). Only then is it marked _canon_ here.

### 16.3 Versioning

- `ki-design` and every `@knowledgeislands/*` package follow **semver**: a removed or renamed token, glyph id or manifest id is **major**; a new one is **minor**; a value tweak within its floor is **patch**.
- Each release publishes a **SHA-256 digest** of the token declarations. The local app vendors tokens by digest (PDR-KI-OBSERVA-002; today from `ki-website`, from `ki-design` once PDR-007 records the switch); a hand edit fails its test.
- Both apps render from one tagged kit release with matching digests.
- Packages are pinned by exact version and lockfile integrity in the app.

### 16.4 How designs are judged

Kit approves token changes. Mockups (as Design artifacts) are judged against **Appendix A** and the **contrast tables** (5.2–5.4), with the verdict recorded as a comment on the artifact. A design passes when: every meaning used has a row in section 3; every colour is a token; every text pair meets its floor; the app's density (12 Beacon rows at 800 px) and width (720 px, no horizontal scroll) budgets hold; and no item on the Never-draw list (9.4) appears.

Success: a newcomer can name Island, Capital, Library, Council Hall, Port and Streams after reading the home page (five-person hallway test); the Known Lands chart v0 shows the real realm with condition states inside the density and width budgets.

### 16.5 Open questions

Still open after 18 Oct 2026. (Decided, not open: the hex geometry, Port, the Lighthouse / Council Hall split, the Citadel, the four jobs Observe · Attend · Act · Extend, the site and app type, the repo name `ki-design`.) Section 3.9 says how to draw each item meanwhile.

- [ ] **Bridge vs Causeway:** rename the canon translation symbol to Causeway, freeing Bridge for the app's command concept? (Review recommends Causeway.)
- [ ] **Mill vs Engine house** for operational systems? (Review prefers Mill; tile id `mill` meanwhile.)
- [ ] **Steward roles into canon:** write them into Philosophy/Model/Agents, or map them onto its existing roles, before the Field Guide publishes them?
- [ ] **Product name of the local app:** keep "Observatory" until Gate B; the Tower is its structure and mark either way.
- [ ] **The primary mark:** the canon logo is a roundel (island and arch, `ki-principal/Pillars/Aesthetics/Logo/logo.png`); the site header and mood boards use a compass rose. Which is primary? **Recommendation:** the roundel stays the logo; the compass is the Realm's orientation motif and the candidate for favicon and app mark (the app's mark is the Tower meanwhile). Until decided, never substitute the compass for the logo.
- [ ] **Night on the public site:** follow the OS like the app shell, with or without a manual toggle?
- [ ] **Arcadia page from live data:** publish the territory roster and freshness at build time, or keep it illustrative?
- [ ] **Art licensing:** ownership and generator terms for AI-generated art (KI-DESIGN-ART-002); state the "Ghibli-like" style risk plainly. Treat references and generated art as unlicensed until recorded.
- [ ] **Living Map without JavaScript:** confirm the no-JS state is the static SVG plus a text list of districts.
- [ ] **Instrument restructure:** adopt the ten-instrument grouping under the four jobs?
- [ ] **Lore sheet:** one page of 8–10 named motifs (the Great Library, the Citadel, the Port and its customs house, the Mill, the tides as the cycle, the Known Lands and their fog, the compass, Ruins as honoured retirement), with creatures, magic and crystals ruled out.
- [ ] **Further references:** file the extra isometric building images into `Pillars/Aesthetics/Isometric Tiles`.

---

## Appendix A: Do / Don't

| Area | Do | Don't |
| --- | --- | --- |
| Meaning | Use only section 3's meanings; mark new ones _proposed_ | Invent symbols, or reuse one for a second meaning |
| Port | Draw a Port with its modes as districts | Write or draw "Harbour" |
| Mark | The canon roundel as the logo | The compass, or the observatory dome, in place of the logo |
| Terrain | The twelve terrain ids; fog as a map state | Ruins, ancient forest or "uncharted" as terrain |
| Guidance / governance | Lighthouse = guidance; Council Hall = governance | Use the lighthouse for governance |
| Agents | Workers by role, on islands; AI as infrastructure | Humanoid robots; agents as islands; AI as hero or threat |
| Motion | Tide shimmer, drifting cloud, lantern flicker on the shared clock; frame 0 when reduced | Particles, bounce, auto-playing animation in tools |
| Progress | Condition states: thriving · quiet · weathered · ruined | Scores, "map completion 34 %", "96 % harmony", XP or progress bars |
| Colour | Tokens only; text-gold for brass text on parchment | Gold text on parchment; pure black or white; colour alone |
| Type | Cormorant ≥ 24 px; Cormorant SC labels tracked; Inter body | Cormorant body text; Playfair; sci-fi or playful faces |
| Tables | Drop columns, wrap cells | Turn rows into cards; horizontal scroll |
| Density | 12 Beacon rows at 800 px; glyphs cost zero rows | Padding that costs rows |
| Edges | Rule for separation, boundary for controls | Control edges in the rule colour |
| Icons | 24 grid, 1.5 stroke, round caps, line only | Emoji; filled duotone icons; third-party logos as glyphs |
| Tiles | Pointy-top hex, 2:1 dimetric, top-left light, hex plinth | Square plinths on the hex map; rotated painted art |
| Ancient forest | Leave it untouched | Build on it |
| Retired work | Ruins, honoured | Hide or delete it from the map |
| Copy | British English, calm declaratives, sentence case | Hype, exclamation marks, US spelling |
| Maps | Text equivalent, keyboard along neighbours, patterns | Map-only information |

## Appendix B: Glossary

| Term | Definition |
| --- | --- |
| Act | The local app's mutating job, through the Bridge (plan / confirm / receipt) |
| Ancient (set) | The painted, dusk-lit tile set for hero, Living Map, posters |
| Arcadia | Knowledge Islands Principal as the origin island and reference Capital |
| Archipelago | How a territory is drawn and named: its islands in one sea region |
| Atlas | The reference half of the site: Field Guide, Docs, Specifications, Projects |
| Attend | The local app's job of noticing: Beacon, Waiting for you |
| Beacon | The ranked list of what warrants notice; the Tower's lamp; glyph `beacon` |
| Boundary | The 3:1 colour role for control edges |
| Bridge | Canon: translation layer (MCP servers). App: the command path for Act. Clash open |
| Capital | An island's or territory's civic centre; holds the Citadel |
| Cartouche | A labelled panel tied to a place on a map (site) |
| Chart | The site's dialect: atmospheric, illustrated, narrative |
| Citadel | Library + Council Hall + Tower at the heart of a Capital |
| Condition state | Thriving · quiet · weathered · ruined, from evidence freshness |
| Council Hall | Governance: decisions, not storage |
| Customs house | Port mode: a governed boundary where things are checked |
| Fog | A map state over uncharted or experimental hexes; never a terrain |
| Exclave | An island sitting apart from its territory's region |
| Extend | The local app's job of hosting core and island extensions |
| Field Guide | The site's catalogue of symbols, structures, terrain and roles |
| Flower | A 7-hex footprint |
| Frame 0 | The still image of any animation |
| Illustrated explainer | The daylight watercolour diagram style |
| Instrument | The local app's dialect; also each view in it |
| Island | A body of knowledge; a repository |
| IslandMap | The `islandmap/v1` JSON model of a map |
| Known Lands | The canonical chart of the realm; the app's chart instrument |
| Lighthouse | Guidance; serves others |
| Mill / Engine house | Proposed structure for operational systems; id `mill`; name open |
| Living Map | The site's interactive map |
| Modern (set) | The engraved, flat-fill tile set; default in the app |
| Observe | The local app's read-only job: instruments |
| Port | Entry and exchange in any mode: dock, rail depot, airport, customs house |
| Realm | The governed environment; the Knowledge Islands Realm is the standard |
| Rule | The receding colour role for separating rows and panes |
| Ruins | Retired knowledge, honoured |
| Territory | Islands governed together under one Capital |
| Tile set | A skin over the manifest ids (Modern, Ancient) |
| Tower | Watching, seeing and guiding; the local app's structure and mark |
| Voyage | The narrative half of the site, read in order |
| Wash | A role mixed into the paper, for status surfaces |
| Worker | A person or AI agent acting in the realm, shown by role |
