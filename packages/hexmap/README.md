# @knowledgeislands/hexmap

A pure TypeScript hex map engine: no DOM, no dependencies beyond the tokens. It covers coordinates, flat and isometric geometry, the `islandmap/v1` model, a deterministic SVG renderer and archipelago charts laid out from a list of islands.

## Coordinates

Pointy-top axial `{ q, r }` (`r` grows southward). Directions, in neighbour-mask bit order: e, ne, nw, w, sw, se.

- `hex`, `hexKey`, `parseHexKey`, `hexEquals`, `hexAdd`, `hexScale`, `axialToCube`, `cubeToAxial`, `hexRound`
- `neighbour(h, d)`, `neighbours(h)`, `distance(a, b)`, `ring(c, k)`, `spiral(c, k)`, `line(a, b)`
- `axialToOffset` / `offsetToAxial` (odd-r)
- `neighbourMask(h, test)` gives a 6-bit mask for picking coast, river and road variants; `maskDirections(mask)` names the bits.

## Geometry

- Flat top-down: `toPixel(h, size)`, `fromPixel(p, size)`, `hexCorners(h, size)`.
- Isometric (the tile sets' 2:1 dimetric): `isoPosition(h, w = 256)` is the centre of the top face; `isoProject(h, w = 256)` is the top-face polygon (256 × 148 at the reference width, rows stepping 111, odd rows shifted 128); `isoSort(hexes)` gives painter's order.

## Island maps

```ts
interface IslandMap {
  schema: 'islandmap/v1'
  id: string
  name: string
  hexes: { q: number; r: number; terrain: TerrainName; structure?: string; condition?: Condition }[]
  routes?: { from: Axial; to: Axial; kind: 'active' | 'pending' }[]
  labels?: { q: number; r: number; text: string }[]
}
```

`validateIslandMap(value)` collects every problem (`{ ok: true, map } | { ok: false, errors }`); `assertIslandMap` throws instead.

`structureAliases` maps deprecated structure ids to their replacements (`citadel` is `capital`, GDR-KI-PRINCIPAL-011; `bridge` is `causeway`, GDR-KI-DESIGN-018) and `resolveStructure(id)` follows them; the renderer resolves before asking for a glyph or a name, so an older map that still says `citadel` draws the Capital and one that says `bridge` draws the Causeway.

## Rendering

```ts
import { assertIslandMap, renderFlatSvg } from '@knowledgeislands/hexmap'
import { iconBodies, isIconName } from '@knowledgeislands/icons'
import arcadia from '@knowledgeislands/hexmap/examples/arcadia.islandmap.json' with { type: 'json' }

const svg = renderFlatSvg(assertIslandMap(arcadia), {
  theme: 'night',
  glyph: (id) => (isIconName(id) ? iconBodies[id] : undefined),
  selected: { q: 0, r: 0 }
})
```

`renderFlatSvg` draws a naturalist's chart, layer by layer (`renderFlatLayers` returns the same drawing without the root `<svg>`):

- **Paper and neat line**: the theme's paper with a hairline frame (`frame: false` leaves them out).
- **Sea**: the theme's sea token, a pale band of shallows along the coast edged by a hairline water line.
- **Terrain**: token fills with a low-contrast `<pattern>` per terrain, so terrain is never colour alone: grass tufts, pine ticks, contour arcs, peaks, shore dashes, cliff hatching, sand stipple, river flow lines, marsh reeds, snow dots, volcanic fissures (gold) and sea waves. Each pattern's pen is ink or parchment, whichever reads better on its fill. `patterns: false` turns them off.
- **Coastline**: a deep-ink stroke along every land edge that meets the ocean, joined into runs.
- **Routes**: brass (`#c8963c`) quadratic curves with round caps on a faint paper casing; pending ones are dashed.
- **Structures**: the glyph from the injected `glyph` resolver (inner markup of a 24-grid line glyph), in ink on a small parchment roundel with a hairline ring, with a `<title>`. Without a resolver, or for an unknown id, a small neutral marker. The engine has no dependency on the glyph set.
- **Labels**: small capitals (`font-variant: small-caps`, Cormorant SC by default, `labelFont` to change) on a paper halo (`paint-order: stroke`), so they read on any terrain.
- **Selected**: a brass ring inside the hex.

`theme: 'night'` is the same chart by lantern-light: navy paper, parchment ink, the night sea, and terrain fills mixed 45 % into navy (`nightTerrain` from the tokens). Output is byte-stable: hexes are drawn north to south, numbers are rounded to two decimals, ids are prefixed per map (`ki-map-<id>-…`). `layoutFlat` returns the same geometry as data, which `<ki-hexmap>` renders.

## Example

`examples/arcadia.islandmap.json` is Arcadia, hand-made on 61 hexes: a sea ring, a ragged coast, the Old Wood around an ancient-forest heart, a mountain core with a snowfield, the Capital on the central high ground, the Observatory on a hill, a Lighthouse on the eastern headland, a river with a Mill running to a marshy mouth, a Workshop quarter, a Library, ruins on the north-west ridge and the Port on the south coast. `bun run build` re-renders `examples/arcadia.svg` (day) and `examples/arcadia-night.svg` with the icons package as the glyph resolver (a development dependency only); a test checks the committed SVGs match. `arcadia.png` and `arcadia-night.png` are Chromium renders of them for review.

## Archipelago charts

A territory drawn as an archipelago ([GDR-KI-DESIGN-015](../../docs/decisions/GDR-KI-DESIGN-015-repositories-are-islands-territories-are-archipelagos.md)), laid out from a list of islands rather than hand-placed hexes:

```ts
import { renderArchipelagoSvg } from '@knowledgeislands/hexmap'
import { iconBodies, isIconName } from '@knowledgeislands/icons'

const svg = renderArchipelagoSvg(
  {
    id: 'arcadia',
    name: 'Arcadia',
    islands: [
      { id: 'ki-principal', role: 'Capital', href: 'https://github.com/knowledgeislands/ki-principal', glyph: 'capital', capital: true },
      { id: 'tools-ki', role: 'Tool', href: 'https://github.com/knowledgeislands/tools-ki', glyph: 'workshop' }
    ]
  },
  { theme: 'auto', glyph: (id) => (isIconName(id) ? iconBodies[id] : undefined), frame: false }
)
```

- **Layout** is deterministic. The Capital sits at the centre as a 7-hex flower ([GDR-KI-DESIGN-008](../../docs/decisions/GDR-KI-DESIGN-008-the-capital-and-the-non-combative-principle.md)); without a Capital the first island takes the centre. The rest sit on a coarse lattice `spacing` hexes apart (default 4), filled ring by ring and clockwise from north in list order, so islands listed together sit together. `aspect` stretches the rings: 1 (the default) is a round cluster, below 1 stacks it tall for a narrow screen. `archipelagoSlots` returns the positions alone.
- **Islands** are small isles of two or three hexes whose shape follows the island's id, never its place in the list, with nothing south of the centre so the label below stays on open sea. Each has its glyph on a parchment roundel and its name in small capitals on a paper halo, broken after hyphens (`labelWrap`, default 18 characters).
- **The sea region** is every hex within `margin` (default 2) of an island, any enclosed lake filled, edged by one tinted border.
- **Links.** An island with an `href` is an `<a>` with a `<title>` and `aria-label` (its `title`, or `name — role`); a hover or keyboard focus rings it in gold. The root is `role="group"` with a `<title>` (and `<desc>` from `description`), not `role="img"`, so the links stay reachable. There is no script. A page still lists the islands in text beside it ([GDR-KI-DESIGN-032](../../docs/decisions/GDR-KI-DESIGN-032-the-living-map-without-javascript.md)).
- **Theme.** `day` and `night` pin the token colours, as the flat chart does. `auto` follows the page: the chart's colours (`archipelagoColours`) are custom properties `--ki-chart-*` set with the token stylesheet's own selectors, so the nearest `data-theme` surface or the OS scheme decides. `frame: false` leaves the paper out so the page shows through; `variant` keeps ids apart when one archipelago is drawn twice, a wide and a tall layout say.

`layoutArchipelago` returns the same geometry as data. `examples/arcadia-territory.archipelago.json` is Arcadia's public islands as the website charted them on 19 October 2026, with the glyphs [maps.md](../../docs/spec/maps.md#how-islands-are-typed-app) gives single-purpose islands; `bun run build` renders `examples/arcadia-territory.svg` and `-night.svg`, a test checks they are current, and the PNGs are Chromium renders for review.
