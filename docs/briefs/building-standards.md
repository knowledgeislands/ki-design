# Standard: buildings and tiles

Every tile in every tile set follows these rules, so tiles from different sets, artists and generators sit together on one map.

## Geometry

| Item | Value at 1× | Notes |
| --- | --- | --- |
| Grid | Pointy-top hexes, axial coordinates `(q, r)`; odd-r offset for rows | Cube coordinates for distance and pathing |
| Projection | 2:1 dimetric | Every sprite is normalised to it, whatever its source |
| Top face | 256 × 148 px | 512 × 296 at 2× |
| Neighbour steps | Horizontal 256; row 111; odd rows offset 128 | All integers |
| Plinth | 48 px deep | Darker cliff face, stratified rock bands |
| Sprite cell | 256 × 196 px | Top face plus plinth; taller structures extend upward from the anchor |
| Footprints | 1 hex · an oriented 2-hex pair · a 7-hex flower | Re-cut rule for the old square sheets: 1×1 → 1; 1×2 → pair; 2×2 to 4×4 → flower, square plinth matted out, hex plinth repainted |
| Anchor | Centre of the footprint's anchor hex, at ground level | Recorded in the manifest as pixels |

## Light and drawing

1. Light always from the top-left; shadows fall bottom-right.
2. Nothing overhangs the plinth by more than 8 % of the tile width.
3. Outlines 1.25 px at 1×, in deep ink, never pure black.
4. Colours from the tokens; an island's palette option (Archipelago, Savanna, Natural Colours, Glass and Stone) shifts hue within the set, not the light.
5. No text, logos or worded flags on any building.
6. Buildings read as crisp silhouettes at 25 % scale: distinct roof, wall and opening shapes.

## Structures, variants and states

- Every structure has 4 condition states: **thriving · quiet · weathered · ruined**. Terrain and the five hero structures have 3 variants; other structures have 1. Condition reports evidence freshness: a stale repository visibly weathers.
- States are decal overlays (ivy, cracks, moss, a fallen roof piece) painted under the same light, not separate full drawings; thriving adds smoke and lit windows, quiet removes them.
- Night is a tint layer over the same art (the one place a filter is allowed).
- Every structure has a flat SVG twin for UI, print and small sizes.

## Architectural families

Applied to the five hero structures (Capital, Library, Council Hall, Port, Lighthouse); other structures share one vernacular per set.

| Archetype | Family | Materials and silhouette |
| --- | --- | --- |
| Engineering Forge | Industrial vernacular | Slate roofs, stone and timber, chimneys, waterwheels |
| Research Archipelago | Classical observatory | Pale limestone, domes, colonnades, telescopes |
| Creative Wilderness | Organic | Thatch, living roofs, treehouses, carved wood |
| Learning Realm | Collegiate | Cloisters, towers, courtyards, ivy |
| Enterprise Territory | Civic harbour town | Brick, clock towers, cranes, warehouses |
| Personal Isle | Cottage | Single hearth, garden wall, a small jetty |
| Community | Commons | Meeting hall, market square, shared gardens |

## Terrain transitions

Composite per edge, not per tile: for each transition (water/land, cliff/land, sand/grass) draw 6 edge overlays and 6 corner overlays; the 6-bit neighbour mask chooses which overlays sit on a base hex. Painted art under fixed light cannot be rotated, so never rely on rotating a coast tile.

## Layering

- Flat renderer: terrain → water edges → structure → routes and currents → influence tint → signal markers → labels.
- Isometric renderer: per-cell painter's order, back row to front (terrain, plinth, structure, decals); routes and currents as ground-level ribbons in the same pass; influence as a ground tint or hex outline beneath structures; markers and labels last.

## Budgets

Hero ≤ 400 KB at 1440 px (AVIF); Living Map atlas ≤ 1.5 MB, lazy-loaded; the local app uses flat SVG only.
