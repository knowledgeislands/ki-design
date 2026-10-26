# Glyph briefs

One line per glyph, saying what to draw. Use it when drawing a new glyph, redrawing one at an optical size, or asking an image model for a tracing reference with the icon prompt in the [prompt library](prompt-library.md#icon-description-for-vector-tracing). The drawn glyphs are the truth: they are in [`packages/icons/svg/`](../../packages/icons/svg/), and the rules every drawing follows are in [docs/spec/iconography.md](../spec/iconography.md).

The inventory is 78 glyphs. It is grouped here as the spec grouped it. Where a brief mentions brass or rust, it describes an accent the consumer applies; the glyph files stay single-colour ([GDR-KI-DESIGN-024](../decisions/GDR-KI-DESIGN-024-glyphs-stay-single-colour.md)). `celestial` is drawn as `celestial-guide`, `arrow`, `refresh` and `hourglass` were added for the previews, and `realm`, `pillars` and the three conditions so that every Official or Agreed symbol has a glyph; a territory is drawn with `archipelago`.

## Symbols

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
| `causeway` | Low stone causeway across shallow water: a flat deck sloping down to each shore, two culvert arches, a wave line above and below (the translation layer) |
| `reef` | Three jagged rocks breaking a single water line |
| `terrain` | Three stacked contour lines rising to the right |
| `ancient-forest` | One broad old tree with a heavy trunk and spreading crown, two small conifers behind |
| `grid` | A pointy-top hex with one neighbour drawn partially at its upper right |
| `celestial-guide` | Eight-point star with a thin circle behind it |
| `compass` | Eight-point compass rose, north point longer, small brass centre (orientation motif; not the logo) |
| `fog` | Three horizontal wavy strokes of decreasing length |
| `ruins` | Two broken columns of unequal height and a fallen lintel |
| `realm` | A globe: circle, one meridian ellipse, the equator and two parallels (the whole standard world) |

## Places within an island

| Id | Draw |
| --- | --- |
| `capital` | The Capital (GDR-KI-PRINCIPAL-011): a small dome on a two-column drum (the Library) beside a low pedimented front of three columns (the Council Hall), both on one stepped base, the square they share. Civic, never fortified: no tower, wall or battlement |
| `citadel` | _Retired_ (GDR-KI-PRINCIPAL-011): kept in the package, mapped to no symbol. Wall line with three rooftops behind it: dome, pediment, slender tower |
| `library` | Small dome over four columns on a stepped base |
| `council-hall` | Pediment over four columns on a wide stepped base, no dome |
| `tower` | _Retired_ (GDR-KI-PRINCIPAL-011): kept in the package, mapped to no symbol. Slender square tower with a crenellated top and one lit window (brass dot) |
| `bridge` | _Unmapped_ (GDR-KI-DESIGN-018): kept in the package, mapped to no symbol; the translation layer is `causeway`, and the Act command is never drawn with it. Stone arch with two piers and a wave line under the arch |
| `calendar` | Clock face on a short tower top, hands at ten past ten |
| `resources` | Open archive drawer with two card edges |
| `streams` | A river branching once and widening to the bottom edge |
| `pillars` | Three free-standing columns, each with a capital block and a base, on one ground line; no pediment, so it never reads as the Council Hall |
| `mill` | Small gabled house with a waterwheel on its side (the Mill) |
| `workshop` | Anvil with a hammer above it (proposed; also "forge") |
| `commons` | Market canopy with three posts over a short ground line (proposed) |
| `inbound` | Small chevron arrow entering an open square from the left (`+`) |
| `outbound` | Small chevron arrow leaving an open square to the right (`-`) |

## Conditions

One gabled house with a chimney, a window and a door, varied by state; `ruined` draws `ruins`.

| Id | Draw |
| --- | --- |
| `thriving` | The house with smoke curling from the chimney |
| `quiet` | The house, no smoke |
| `weathered` | The house with a tile missing from the roof line and a crack down the wall |

## Port modes

| Id | Draw |
| --- | --- |
| `dock` | Jetty in perspective with three posts and a small boat |
| `rail-depot` | Two rails with sleepers converging, a platform canopy above |
| `airport` | Mooring mast with a small airship tethered at its top |
| `customs-house` | Gatehouse arch with a horizontal barrier across it |

## Instruments and app concepts

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
| `lantern` | A lantern: the Lantern signal as a symbol |
| `lantern-signal` | Hanging lantern, brass fill in the glass (attention marker) |
| `reef-signal` | Single reef rock with a short rust underline (blocking marker) |

## Steward roles

| Id | Draw |
| --- | --- |
| `role-steward` | Upright staff with a small hooked crook |
| `role-archivist` | Closed tome with a ribbon bookmark |
| `role-cartographer` | Pair of dividers, legs apart |
| `role-builder` | Claw hammer, head up |
| `role-navigator` | Sextant arc with its index arm |
| `role-scout` | Extended spyglass, angled up |
| `role-historian` | Unrolled scroll with a quill |
| `role-guardian` | _Not adopted_ (GDR-KI-PRINCIPAL-014): kept in the package, mapped to no symbol; boundary-keeping is the Steward. Heater shield with a single vertical band; no weapon |

## UI basics

| Id | Draw |
| --- | --- |
| `search` | Spyglass lens circle with a short handle (not a magnifier on a stick: the same geometry, a slightly longer barrel) |
| `filter` | Funnel of three decreasing lines |
| `external` | Square with an arrow leaving the top-right corner |
| `close` | Two crossing strokes |
| `chevron` | Single open chevron (rotate for direction) |
| `check` | Single tick |
| `info` | Circle with a short stroke and a dot |
| `menu` | Three horizontal strokes, the middle shortest |
| `theme` | Half-filled circle drawn as an outline crescent beside a small star (night chart) |
| `arrow` | A straight arrow pointing right (added for the previews) |
| `refresh` | A circular arrow (added for the previews) |
| `hourglass` | An hourglass (added for the previews) |

## Value icons

| Id | Draw |
| --- | --- |
| `value-trust` | Shield with an eight-point star |
| `value-community` | Three heads-and-shoulders outlines, no faces |
| `value-growth` | Seedling, two leaves |
| `value-exploration` | `compass` inside a circle |
| `value-creation` | Pen nib |
| `value-sustainability` | Single leaf with a vein |

The Library and Governance values reuse `library` and `council-hall`.
