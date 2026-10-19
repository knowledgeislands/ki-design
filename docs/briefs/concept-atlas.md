---
title: Concept atlas
status: draft
source: https://claude.ai/code/artifact/01ee18ce-7756-4f70-bc29-f26699c44711
exported_at: 2026-10-18T04:03:34Z
---

> Exported from the living Claude Doc, the source of truth while the brief is in draft. Re-export rather than editing here.

**Dated 18 October 2026 and kept as written.** Kit's later answers win where this differs: the Capital replaced the Citadel and the Tower (GDR-KI-PRINCIPAL-011), the Causeway replaced the Bridge as the translation symbol so that "Bridge" names only the Act command, the Mill replaced the Engine house, and the open questions were answered on 19 October as [GDR-KI-DESIGN-018 to 036](../decisions/README.md).

# Concept atlas

Every Knowledge Islands concept is mapped once here: what it means, where the meaning comes from, and how it is drawn and where it surfaces. Canon wins; rows marked _proposed_ go back to `ki-principal` for adoption.

## 1. Geography — from realm to island

| Concept | Meaning | Source | Drawn as | Shows on site | Shows in local app |
| --- | --- | --- | --- | --- | --- |
| Realm | The governed environment: its rules of identity, capability and crossing. Knowledge Islands is the first | Realm Model, Known World (emerging) | The whole chart; other realms beyond its edge, in fog | Philosophy, Model | Scope picker: “Known Lands” |
| Map of Known Lands | The canonical chart of the realm's territories and islands | Known Lands (governance) | The chart itself, with compass rose and scale | Model (Living Map), Arcadia | The Known Lands chart |
| Territory | Islands governed together under one Capital, one accountable authority and one harness | Territories and Archipelagos; Known Lands | An archipelago: its islands grouped in one mostly contiguous sea region, with a tinted boundary; exclaves allowed | Model | Scope: `territory:<handle>` |
| Archipelago | Islands grouped together; per the review, a territory is drawn as an archipelago (Philosophy overview), and the site copy's separate proximity grouping is withdrawn | Site copy; Symbol Library | A dotted grouping line across territories | Model | A grouping, not a scope |
| Island | A discrete, self-contained body of knowledge; in practice a repository | Philosophy; Known World | A land mass of hexes | Model, Landscapes | A repository |
| Capital | An island's (or a territory's) civic centre; the Principal island holds the territory's governance | Site copy; Known Lands | The Citadel and its square | Model, Arcadia | Territory Principal repo |
| Landscape | The structure and navigable terrain of knowledge; also an archetype of island | Realm Model (emerging); site | Terrain and architectural family | Landscapes | Island palette and family |

## 2. Places within an island — the five zones and the working areas

Each canonical zone of a Knowledge Island is a place on its map, so a repository's own folders draw its island.

| Zone or area | Meaning | Drawn as | Local app |
| --- | --- | --- | --- |
| `Pillars` | Owned, canonical knowledge | The Library's hall of pillars, in the Citadel | Knowledge Bases, Documents |
| `Calendar` | Time-bound knowledge | Clock tower or sundial in the Capital square | Activity, Automation timing |
| `Resources` | External reference | Archive and reading room beside the Library | Artifacts, references |
| `Streams` | Knowledge in motion: initiatives, projects, roadmap | Rivers and canals running to the sea | Roadmap, Sessions |
| `Admin/Governance` | What must hold: Charter, Known Lands, policies, decisions | Council Hall, in the Citadel | Decisions |
| `Admin/Operations` | How the island runs: activities, processes, live artifacts, lessons | Engine house _(proposed)_ | Automation, Rig, Extensions |
| `+` incoming | Material received for triage | The Port's arrivals quay | Review queue (intake) |
| `-` outbound | Material prepared to send elsewhere | The Port's departures quay | Outbound / trades |
| `_TRADES` | Exchange agreements with other islands | Trade routes from the Port | Trade routes |

## 3. The Citadel and other structures

| Structure | Meaning | Status | Local app |
| --- | --- | --- | --- |
| Citadel | The civic heart of a Capital, holding Library, Council Hall and Tower | _proposed_ | Territory Principal |
| Library | Canonical knowledge (Pillars) | canon | Knowledge Bases |
| Council Hall | Governance — a parliament or Capitol; decisions, not storage | canon (site) | Decisions |
| Tower | Watching, seeing and guiding — a keep, a control tower | _proposed_ | The app itself; Beacon is its lamp |
| Observatory | Insight and analytics | canon | Activity |
| Lighthouse | Guidance (coastal); a lighthouse serves others, so not the app's name | canon | Public-site wayfinding |
| Port | Entry and exchange in any mode: dock, rail depot, airport, customs house | decided 18 Oct (replaces Harbour) | Review queue, intake |
| Bridge | Translation layer between systems (open: rename to Causeway, freeing Bridge for the app's command concept) | canon | MCP servers |
| Workshop / Forge | Building tools and harnesses | _proposed_ | Repositories (tools, harnesses) |
| Engine house | Operational systems | _proposed_ (canon's old Port meaning) | Rig, Automation |
| Ruins | Retired knowledge, honoured not hidden | _proposed_ | Archived repos and records |
| Ancient Forest | Wisdom and continuity; never built on | canon | — |

**Name clash to resolve.** The Observatory's _Bridge_ means command (a ship's bridge); the Symbol Library's _Bridge_ means a translation layer (a stone bridge). If the local app becomes the Tower, its command concept could be renamed _Helm_ or _Gate_, freeing Bridge for translation.

## 4. The cycle

| Step | Meaning | Place | Local app |
| --- | --- | --- | --- |
| Capture | Information arrives without immediate judgement; routing, not filtering | Port | Review queue |
| Connect | Material is contextualised and linked; received information becomes owned knowledge | Routes, Streams | Trade routes, Roadmap |
| Reflect | Periodic review surfaces what is stale, changed or obsolete | Tower and Observatory | Beacon, Activity |

## 5. Layers and durability

| Layer | Knowledge | Drawn as | Durability |
| --- | --- | --- | --- |
| Sky | Long-range guidance | Celestial guide, constellations, weather | Changes slowly, guides everything |
| Ancient forest, high stone | Wisdom | Old growth, mountains | Outlives its makers |
| Inhabited land | Knowledge | Settlements, structures, roads | Tended; changes with use |
| Coast and shallows | Information | Ports, beaches, reefs | Arrives and is sorted |
| Sea and currents | Data | Open water, currents, the deep | Raw; always moving |

## 6. Workers and roles — humans and robots

Workers are people or AI agents acting in the same cycle; neither is the subject of the interface.

| Concept | Meaning | Source | Drawn as |
| --- | --- | --- | --- |
| Avatar | The one persona that crosses cultures and realms | Known World, Fictional Lineage (emerging) | A figure with the compass mark |
| Culture | A territory's population of agents: norms from its harness, runtimes Claude Code, Codex, Paperclip | Known World (emerging) | Figures in the territory's tint |
| Operator, Architect | External privileged role; the role that shapes the world's rules | Fictional Lineage (emerging) | Not drawn on the map |
| Steward | Tends and ratifies an island | _proposed_ (from mood boards) | Figure with a staff |
| Archivist | Curates the Library | _proposed_ | Figure with a tome |
| Cartographer | Maps links and routes (Connect) | _proposed_ | Figure with dividers |
| Builder | Builds tools and harnesses | _proposed_ | Figure with a hammer |
| Navigator | Works the trade routes between islands | _proposed_ | Figure with a sextant |
| Scout | Acquires and captures new material | _proposed_ | Figure with a spyglass |
| Historian | Reflects on history and retrospect | _proposed_ | Figure with a scroll |
| Guardian | Holds boundaries and authority | _proposed_ | Figure with a shield (no weapon) |

## 7. Physical places — not drawn as land

| Concept | Meaning | Source | Shown as |
| --- | --- | --- | --- |
| Host | A physical machine by role: home, hub, agent host | Known World | Not on the map; listed in Rig |
| Seat, standby | Where a territory is primarily tended; its replica | ADR-KI-PRINCIPAL-007 | A small seat mark on the territory's cartouche |
| Address | `<territory>.<realm-domain>`; tailnet DNS beneath | Known World | The local app's reach settings |

## 8. Signals and states

| Mark | Meaning | Drawn as |
| --- | --- | --- |
| Lantern | Attention: the Beacon ranks it as unusual | Brass lantern on the structure |
| Reef | Risk; blocking | Rust reef by the structure |
| Fog | Experimental, or not yet observed | Drifting fog over hexes |
| Thriving · quiet · weathered · ruined | Evidence freshness | The structure's condition state |
| Solid · dashed route | Active · awaiting reciprocity | Brass sea lane |

## 9. The Knowledge Seas and addressing — from the explainer boards _(proposed)_

| Concept | Meaning | Drawn as | Local app |
| --- | --- | --- | --- |
| Context current | Real-time signals and events | A current in the sea | Activity, live updates |
| MCP trade routes | Secure agent-to-agent and system communication | Brass sea lanes between ports | MCP servers, Trade routes |
| Tide events | Changes, triggers, opportunities | Tide lines on the coast | Automation triggers |
| Whale songs | High-value, long-range signals | A whale far out at sea | Beacon (long-horizon) |
| Storm alerts | Risks, conflicts, policy violations | Storm cloud over an island | Beacon (blocking) |
| Island GPS | Global addressing, e.g. `isle://landscape/island/port/doc` | Coordinates in a cartouche | Deep links |
| The tide (loop) | The iteration cycle: Discover → Curate → Govern → Nurture → Connect → Learn | A tide band at the foot of explainers | — |

Two cautions. Island GPS must reconcile with Known World's addresses (`<territory>.<realm-domain>`). And the boards draw agents as islands; the brief keeps agents as workers _on_ islands, since knowledge and work are the subject — the agent roles on those boards (Cartographer, Curator, Governance, Gardener, Harbourman, Archivist, Observer) map onto section 6's roles instead.
