---
title: Meaning
status: draft
updated: 2026-10-18
---

# Meaning

Every visual element that carries meaning is a symbol, and each symbol means one thing. The symbol library is data: [`packages/symbols/src/symbols.ts`](../../packages/symbols/src/symbols.ts) holds each symbol's id, name, meaning, status, category and glyph, and `retiredSymbols` lists the ids that may never be reused. This file holds what the data cannot: how each symbol is drawn, where it surfaces, which rules govern change, and how to draw a symbol whose question is still open. Read it before drawing or naming anything.

## Rules

1. **Never invent meaning.** If a thing you want to draw has no entry in the symbol library or in the tables below, do not draw it. Propose it, marked _proposed_.
2. **One meaning per symbol.** Never reuse a symbol for a second meaning.
3. **Meaning is decided in `ki-principal` first** (`Pillars/Aesthetics` and `Pillars/Philosophy`), through its Enactment Process. This repository follows. See [governance.md](governance.md).
4. **The status word is the data's.** Read a symbol's status from `symbols.ts`, and show it with the four labels in [DESIGN.md](../../DESIGN.md#status-vocabulary). Where a row below has no entry in `symbols.ts`, its status is given in the table.
5. **Retired ids are never reused.** `harbour`, `citadel` and `tower` are retired. The `citadel` and `tower` glyphs stay in the icon package, mapped to no symbol.

Where `symbols.ts` and `ki-principal` disagree on a status or a meaning, the question is listed in [OPEN.md](../decisions/OPEN.md) rather than settled here.

### What the Port and the Capital superseded

GDR-KI-PRINCIPAL-010 (The Port) superseded three earlier canon rows:

- "Harbour = integration point" is now the Port.
- "Port = operational systems" moves to the Mill / Engine house (_proposed_).
- "Governance = lighthouses / citadels" is now the Council Hall. The Lighthouse is guidance only.

GDR-KI-PRINCIPAL-011 (The Capital) retired "Citadel" as a term and dropped the Tower. The Capital holds the Library and the Council Hall, and the Observatory is the local app's mark. See [GDR-KI-DESIGN-007](../decisions/GDR-KI-DESIGN-007-the-port.md), [GDR-KI-DESIGN-008](../decisions/GDR-KI-DESIGN-008-the-capital-and-non-combative.md) and [GDR-KI-DESIGN-009](../decisions/GDR-KI-DESIGN-009-the-observatory-mark.md).

## The canonical symbols: how they are drawn

Glyph ids are in [iconography.md](iconography.md) and `packages/icons/svg/`.

| Symbol | Drawn as | Site | App |
| --- | --- | --- | --- |
| Island | A land mass of hexes rising from the sea | Model, Landscapes | A repository |
| Archipelago | Several islands in one tinted sea region | Model | A territory |
| Route | A fine dotted or inked path between places | Model | Links |
| Trade Route | A brass sea lane with small sailing vessels; solid = active, dashed = awaiting reciprocity | Model | Trade routes layer |
| Current | Curved arrowed lines in the water | The Cycle | Flow between islands; Sessions are vessels on it |
| Weave / Fabric | Interlaced brass and teal threads meeting at points of light | Philosophy | Cross-island links |
| Lighthouse | A tall pale tower on a rocky headland. **Guidance only** | Principles, wayfinding | Guidance and help (not the Beacon: that is the Observatory's lamp, glyph `beacon`) |
| Observatory | A domed observatory on a hill or cliff | Home hero, Reflect | Activity, insight; the app's mark |
| Port | A port town of districts (see Port modes) | Capture | Review queue intake (`+/`) |
| Bridge | A stone arched bridge | Agents section | MCP servers |
| Reef | Sandstone rocks in shallows; in the app, a rust reef | — | Blocking signals |
| Terrain elevation | Contour terraces; higher = more mature | Philosophy | Elevation on the chart |
| Ancient Forest | One vast old tree among old growth; never built on | Philosophy | — |
| Cartographic Grid | Faint graticule; the hex lattice at shorelines | Field Guide | The grid itself |
| Celestial Guide | Eight-point star over constellations | Journey | Horizon, the Charter |
| Library | Domed building with colonnade, held in the Capital | Philosophy, Arcadia | Knowledge Bases, Documents |
| Council Hall | Colonnaded hall with pediment, on the Capital square. **Governance**: a parliament, decisions not storage | Model | Decisions |
| Harbour | Retired (GDR-KI-PRINCIPAL-010). Do not draw; use the Port | — | — |

**Value icons** label principles and values, never places. Their meanings are in [iconography.md](iconography.md#value-icons).

## Zones and working areas

Each canonical zone of a Knowledge Base is a place on its island, so a repository's own folders draw its island.

| Zone or area | Drawn as | App |
| --- | --- | --- |
| `Pillars` (owned, canonical knowledge) | The Library's hall of pillars, in the Capital | Knowledge Bases, Documents |
| `Calendar` (time-bound knowledge) | Clock tower or sundial on the Capital square | Activity, automation timing |
| `Resources` (external reference) | Archive and reading room beside the Library | Artifacts, references |
| `Streams` (knowledge in motion: initiatives, projects, roadmap) | Rivers and canals running to the sea | Roadmap, Sessions |
| `Admin/Governance` (what must hold: Charter, Known Lands, policies, decisions) | Council Hall, in the Capital | Decisions |
| `Admin/Operations` (how the island runs: activities, processes, live artefacts, lessons) | Mill / Engine house; the zone is official, its drawing _proposed_ and its name open | Automation, Rig, Extensions |
| `+` (inbound; not a zone) | The Port's arrivals quay | Review queue (intake) |
| `-` (outbound; not a zone) | The Port's departures quay | Outbound |
| `_TRADES` (exchange agreements with other islands) | Trade routes from the Port | Trade routes |

`_TRADES` has no entry in the symbol data; it is official. Canon names five zones: Calendar, Pillars, Resources, Streams and Admin. Admin is drawn as two places, Governance and Operations. `+` and `-` are working areas kept outside the zones; never draw them inside the Capital.

## The Capital and other structures

The full tile inventory is in [tiles-and-buildings.md](tiles-and-buildings.md).

| Structure | Drawn as | App | Status where not in the data |
| --- | --- | --- | --- |
| Capital | A civic square on a 7-hex flower, open and welcoming, never walled: a civic quarter and square (Modern), a hilltop forum or acropolis (Ancient) | Territory Principal | — |
| Workshop / Forge | Timber workshop with chimney, anvil yard | Repositories (`tools-*`, harnesses) | — |
| Mill / Engine house | Stone house with waterwheel or windmill; tile id `mill`; name open | Rig, Automation | — |
| Ruins | Broken walls, fallen lintel, ivy (columns stay the Library's) | Archived repositories and records | — |
| Cottage | Small house, one hearth, garden wall; the Personal Isle's hearth | — | In the tile contract |
| Commons | Community archetype: meeting hall, market square, shared gardens | — | Proposed |
| Logo roundel | The Knowledge Islands mark: an island and an arch in a roundel. Use the canon file `Pillars/Aesthetics/Logo/logo.png`; never redraw or restyle it | Site header lockup | Official |
| Compass rose | Eight-point brass rose; orientation of the Realm; candidate favicon. **Not the logo** | Orientation motif on charts and posters | Proposed (the mark is open) |

**The Observatory is the app's mark.** The Observatory means insight (Activity), and the local app is the Observatory, so the domed observatory is its mark. The Beacon is the Observatory's lamp.

**Non-combative.** The symbol language never fortifies: no citadels, towers, keeps or battlements, and no walls around the Capital. The Lighthouse keeps its tall form because it guides, not guards. Whether a territory's Principal repository is drawn with a **curtain wall** around its knowledge base is open ([OPEN.md](../decisions/OPEN.md)); any answer must stay within this principle.

## Port modes

A Port's modes are districts of one Port, so an island shows at a glance how knowledge reaches it: only a dock means hand-fed; a rail depot means it runs on schedules.

| Mode | Drawn as | App |
| --- | --- | --- |
| Dock (`dock`) | Wooden jetty, small sailing boats | Captures at Stage |
| Rail depot (`rail-depot`) | Small station, platform canopy, a short run of track inland | Automation-fed intake |
| Airport (`airport`) | **A tall mooring mast with a moored airship** (period-consistent; never jets or runways) | Agent and remote intake |
| Customs house (`customs-house`) | Gatehouse with a barrier at the port gate | What never reaches the browser; confirmations |

## Signals

| Mark | Drawn as | App | Status where not in the data |
| --- | --- | --- | --- |
| Lantern | Brass lantern hung on the structure | Beacon signal, gold (`--warn`) | — |
| Reef | Rust reef by the structure | Beacon blocking, rust (`--bad`) | — |
| Fog | Drifting fog over hexes; flat: the fog hatch ([colour.md](colour.md#fog)). A **map state** over any terrain, never a terrain tile | Proposals, drafts, unobserved | — |
| Storm | Storm cloud over an island | Beacon (blocking) | — |
| Whale song | A whale far out at sea | Beacon (long-horizon) | — |
| Tide line | Tide lines on the coast; change, trigger, opportunity | Automation triggers | Proposed |
| Solid / dashed lane | Brass sea lane: active / awaiting reciprocity | Trade routes | Agreed |

## Condition states

Condition is driven by evidence freshness. This is where beauty meets truth: a stale repository's workshop visibly weathers, so the map reports estate health without a chart. Condition is never a score and never a percentage.

| State | Drawn as (decal) | App wording |
| --- | --- | --- |
| Thriving | Clean, lit windows, smoke, flags | thriving |
| Quiet | Clean, unlit, no smoke | quiet |
| Weathered | Moss, ivy, a cracked wall, a missing shingle | weathered |
| Ruined | Fallen roof piece, broken walls, overgrowth: the Ruins look | ruined |

## Workers and steward roles

Workers are people or AI agents acting in the same cycle. All roles are **proposed** until written into `Philosophy/Model/Agents`. A role is a hat, not a species: the same role can be worn by a person or an agent.

| Role | Does | Drawn as (illustration) | Glyph |
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

Explainer-board roles map onto these: Curator → Archivist; Gardener → Steward; Harbourman → Navigator (at the Port); Observer → Historian or the Observatory; Governance → Guardian.

## Physical places: never drawn as land

| Concept | Meaning | Shown as |
| --- | --- | --- |
| Host | A physical machine by role (home, hub, agent host) | Not on the map; listed in Rig / Machine |
| Seat, standby | Where a territory is primarily tended; its replica | A small seat mark on the territory's cartouche |
| Address | `<territory>.<realm-domain>` | The local app's reach settings |
| Island GPS (_proposed_) | Global addressing, such as `isle://landscape/island/port/dock` | Coordinates in a cartouche; must reconcile with the address form |

## Open items: how to draw until decided

The questions themselves, with their recommendations, are in [OPEN.md](../decisions/OPEN.md). Meanwhile:

| Item | Until decided |
| --- | --- |
| **Bridge vs Causeway** (the app's _Bridge_ is command: plan / confirm / receipt; canon's _Bridge_ is translation) | Draw the stone bridge for translation. In the app write "Bridge" only for the Act job. Never put the bridge glyph on the Act job |
| **Mill vs Engine house** | Draw a stone house with a waterwheel; id `mill`; label "Mill (proposed)" |
| **Steward roles** | Mark them proposed in public copy |
| **The mark** | The canon roundel is the logo; the compass is only an orientation motif |
| **Local app name** | Write "Observatory"; its mark is the domed Observatory whatever it is finally called |
| **Curtain wall** around a Principal repository's knowledge base | Do not draw one; keep the Capital open |
| Commons, Ruins, compass rose, whale song, tide lines | Usable in drafts and mockups, marked proposed |
| Storm (official in the data, proposed in the earlier spec; see OPEN.md) | Usable in drafts and mockups; do not ship it as settled until the status is confirmed |

The terms used here are defined in the [glossary](glossary.md).
