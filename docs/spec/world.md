---
title: The world
status: draft
updated: 2026-10-18
---

# The world

Knowledge Islands draws knowledge as a natural world. The realm holds territories, each drawn as an archipelago; a territory holds islands, and each island is a repository with a Capital at its heart. The map has depth, from sky to sea floor, and a cycle of Capture, Connect and Reflect runs through it. The hex grid holds the truth and the isometric painting shows it. Read this file to know what is being drawn before deciding how to draw it; [meaning.md](meaning.md) says what each symbol means.

## From realm to island

| Level | Meaning | Drawn as | Local-app term |
| --- | --- | --- | --- |
| **Realm** | The governed environment: its rules of identity, capability and crossing. The **Knowledge Islands Realm** is the standard (and first) realm | The whole chart; other realms beyond its edge, in fog | Scope picker: "Known Lands" |
| **Map of Known Lands** | The canonical chart of the realm's territories and islands (after `Admin/Governance/Known Lands.md` in `ki-principal`) | The chart itself, with compass rose and scale bar | The Known Lands chart instrument |
| **Territory** | Islands governed together under one Capital, one accountable authority and one harness. **A territory is an archipelago** | An archipelago: a group of islands in one sea region with a tinted border; an island may sit apart as an **exclave** | Scope `territory:<handle>` |
| **Island** | A discrete, self-contained body of knowledge; in practice a **repository** | A land mass of hexes | A repository |
| **Capital** | An island's (or a territory's) civic heart: **Library + Council Hall** (GDR-KI-PRINCIPAL-011); the Principal island holds the territory's governance | A civic square, never a fortress, on a 7-hex footprint; never a single-hex building | Territory Principal repository |

- "Estate" is only Kit's local word for the places he visits most often. Display copy says **realm**.
- **Repositories are islands; territories are archipelagos** ([GDR-KI-DESIGN-015](../decisions/GDR-KI-DESIGN-015-islands-and-archipelagos.md)). An earlier draft made the archipelago a non-governing "character" grouping. That reading is withdrawn, so never draw a second grouping line that crosses territories.
- Knowledge Islands Principal is the island called **Arcadia**: the Knowledge Island of Knowledge Islands, the legendary origin that holds the canonical model every other island derives its baseline from.

## One plan, local character

Being a Knowledge Island means meeting a small set of expectations: the standards declared in `.ki.toml` and checked by `ki repo audit`, the five zones, a Capital, and governance through the Council Hall. Everything else belongs to the island: its tile set, palette, architectural family, culture of workers, extensions, even structures no one else has. The design shows the shared plan so islands stay legible to each other, and leaves the rest to the islanders.

## Depth: layers and durability

The map has vertical meaning. Elevation reads as maturity. Sea floor and sky are layers the map can show, not backdrop.

| Layer | Knowledge | Drawn as | Durability |
| --- | --- | --- | --- |
| Sky | Guidance (long-range) | Celestial guide, constellations, weather | Changes slowly; guides everything |
| Ancient forest and high stone | Wisdom | Old growth, mountains | Outlives its makers; **never built on** |
| Inhabited land | Knowledge | Settlements, structures, roads | Tended; changes with use |
| Coast and shallows | Information | Ports, beaches, reefs | Arrives and is sorted |
| Sea and currents | Data | Open water, currents, the deep | Raw; always moving |

## The cycle

| Step | Meaning | Place | Local app |
| --- | --- | --- | --- |
| **Capture** | Information arrives without immediate judgement; routing, not filtering | The **Port** | Review queue / "Waiting for you" |
| **Connect** | Material is contextualised and linked; received information becomes owned knowledge | Routes, Streams | Trade routes, Roadmap |
| **Reflect** | Periodic review surfaces what is stale, changed or obsolete | The Observatory | Beacon, Activity |

The explainer boards draw a longer **tide loop** (Discover → Curate → Govern → Nurture → Connect → Learn) as a band at the foot of a poster. It is _proposed_. It elaborates the cycle and never replaces Capture → Connect → Reflect in canonical copy.

## Hex for logic, isometric for life

The hex grid is the truth; the isometric painting is how that truth is shown ([GDR-KI-DESIGN-003](../decisions/GDR-KI-DESIGN-003-hex-grid-geometry.md)).

- A hex holds identity, terrain, owner, layers and adjacency. Routes and influence are computed on the grid.
- The isometric render adds height, buildings, weather and light.
- The same map renders **flat** (local app, print, small screens) or **isometric** (hero, Living Map) in either tile set, without changing its data.
- Every tile is data first and scenery second.

The geometry itself is in [tiles-and-buildings.md](tiles-and-buildings.md); the three maps are in [maps.md](maps.md).
