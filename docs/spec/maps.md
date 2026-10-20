---
title: Maps
status: draft
updated: 2026-10-19
---

# Maps

Three maps draw one world: the Map of Known Lands (the canon chart of the realm), the Living Map (the site's interactive map) and the Known Lands chart (the local app's instrument). Each is drawn from an `islandmap/v1` model on the hex grid, flat or isometric, with a text equivalent always rendered. The model and the renderer are code in [`packages/hexmap`](../../packages/hexmap/README.md); this file holds what each map shows, its layers, how islands are typed, keyboard and pointer interaction, accessibility, and the fuller model still proposed.

## Two scales: the Territory Map and the Island Map

Agreed with the owner on 19 October 2026. Every map is drawn at one of two scales, and the two serve different purposes. Both use the same pointy-top axial hex grid and the same code in `packages/hexmap`; what a hex means differs.

| Scale | Purpose | A hex is | Shows | Rendering |
| --- | --- | --- | --- | --- |
| **Territory Map** | Orientation and navigation: which islands exist, what each is for, how they relate, and where attention is needed | A chart cell for laying islands out across a sea region | Islands as small clusters of hexes with their glyphs and names, the Capital as the seven-hex flower, routes, signals | Top-down and flat. No heights, no painted ground |
| **Island Map** | Understanding one island: how its knowledge and work are arranged, as a place to explore | A cell of ground inside one island | Terrain, heights, cliffs, rivers, waterfalls and buildings; the Capital as seven cells of actual ground | Isometric and painted (Ancient); a flat top-down rendering of the same cells serves as its overview |

- An island's cluster on the Territory Map is a symbol: its size and shape place and identify the island, and measure no ground. The Territory Map stays as it is.
- The Capital appears at both scales, as a symbol on the Territory Map and as ground on the Island Map; both keep the seven-hex rule.
- Selecting an island on the Territory Map is the natural way into its Island Map.
- The [hex terrain composition proposal](hex-terrain-composition.md) is about the Island Map only.
- The `islandmap/v1` model name predates these terms. It describes a map at either scale.

## Three maps

| Map | Surface | Shows | Renderer | Interaction |
| --- | --- | --- | --- | --- |
| **Map of Known Lands** | Canon artefact; Field Guide; posters | The whole realm: territories as sea regions, islands, Capitals, trade lanes, fog at the edge | Either | Static or read-only zoom |
| **Living Map** | Site (Model, Arcadia, Landscapes) | An island or archipelago with structures and a legend; click a structure to read its concept | Isometric, Ancient only | Zoom island → archipelago; select to read |
| **Known Lands chart** | Local app instrument | The selected scope: each registered repository an island, zones as structures, condition states, Beacon signals, trade lanes, who is working | Flat SVG (the engraved flat treatment) by default; an isometric toggle draws Ancient | Select = filter; layers; time window |

Until the Ancient tiles exist, the site shows the painting as the legend and the engraved isometric chart as an interim map ([GDR-KI-DESIGN-014](../decisions/GDR-KI-DESIGN-014-the-painting-as-home-hero.md)). Ancient is the only isometric tile set; the engraved Modern treatment remains for flat top-down charts ([GDR-KI-DESIGN-038](../decisions/GDR-KI-DESIGN-038-ancient-is-the-isometric-set.md)).

## Layers

`terrain` · `routes` (trade lanes; dashed = awaiting reciprocity) · `currents` · `influence` (territory tint or outline) · `signals` (lantern, reef, fog, storm) · `condition` (always on for structures) · `workers` (figures or vessels on the structures and routes touched) · `labels`.

- In the app, map labels are monospace on a paper halo (`paint-order: stroke`, a 3 px stroke in `--paper`).
- On the site, labels are Cormorant SC cartouches ([components.md](components.md#site-patterns-chart)).
- No label ever relies on fill contrast.

## How islands are typed (app)

- A Knowledge Base island shows its zones as structures (Library, Council Hall, Port, Streams).
- A single-purpose repository is a small isle typed by its dominant building: Capital for a Principal, Workshop for `tools-*`, Causeway for `mcp-*`, Library for knowledge bases, Port for intake-heavy repositories.
- Layout is **deterministic**: positions are stored, so a repository stays where the operator learnt it was.
- Until positions are stored, `renderArchipelagoSvg` in `packages/hexmap` lays a territory out from its island list: the Capital at the centre, the rest ring by ring in list order, each a small isle with its glyph, label and link, in one sea region with a tinted border. The site's Arcadia page draws its dated snapshot with it.

## Interaction and keyboard

- One tab stop for the map (roving tabindex). **Arrow keys move along axial neighbours**: Left and Right are W and E; Up is NW or NE and Down is SW or SE, with Shift choosing the east-side neighbour. Home goes to the Capital; Enter selects; Escape clears the selection.
- The focus ring is drawn on the **hex outline**: 2 px in `--accent`, plus a 1 px paper inner stroke.
- Pointer: click selects, drag pans, wheel or pinch zooms (site only). The app does not zoom by wheel inside a table frame.

`<ki-hexmap>` v0 implements the roving tabindex, arrow keys along axial neighbours (up and down to the diagonal that keeps the visual column), and Enter, Space or click to select. Home, Escape and Shift-selection are not yet built.

## Accessibility

- Every map has a **text equivalent** rendered in the page, not only an `aria-label`: a list of territories → islands → structures, each with its condition and signals as words and a link.
- Terrain is never colour alone (a pattern per terrain); signals are shapes plus words.
- The twelve terrain fills pass a colour-vision check (deuteranopia, protanopia and tritanopia simulation) for adjacent distinctness with patterns on.
- The no-JS Living Map is the static SVG plus the district list ([GDR-KI-DESIGN-032](../decisions/GDR-KI-DESIGN-032-living-map-without-javascript.md)).

## The IslandMap model

The implemented `islandmap/v1` schema is in [`packages/hexmap/src/model.ts`](../../packages/hexmap/src/model.ts): a map has an id, a name, hexes (axial position, terrain, an optional structure and condition), optional routes and optional labels. `validateIslandMap` reports every problem.

The fuller model below is _proposed_. It is not yet in the schema.

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
