# @knowledgeislands/icons

Line glyphs for Knowledge Islands: 72 drawn by hand on a 24 × 24 grid.

## The drawing contract

Every file in `svg/` carries exactly these root attributes, and `lintIcon` enforces them:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
```

- Geometry stays inside the 2 px safe margin (`[2, 22]` on both axes).
- Only `path`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `rect` and `g`; no fills, colours or stroke overrides on children (`stroke-dasharray` is allowed).
- No arc commands in paths: draw curves with Béziers and round things with `circle` or `ellipse`, so bounds can be checked exactly.
- File names are kebab-case and become the icon name.

Glyphs (72; the DESIGN.md 8.2 inventory, with `celestial` drawn as `celestial-guide`, plus `arrow`, `refresh` and `hourglass` for the previews): airport, ancient-forest, archipelago, arrow, beacon, bridge, calendar, capital, celestial-guide, check, chevron, citadel, close, commons, compass, council-hall, current, customs-house, dock, external, filter, fog, grid, hourglass, inbound, info, island, known-lands, lantern, lantern-signal, library, lighthouse, machine, menu, mill, observatory, outbound, port, rail-depot, reef, reef-signal, refresh, resources, role-archivist, role-builder, role-cartographer, role-guardian, role-historian, role-navigator, role-scout, role-steward, route, ruins, scroll, sea-lane, search, streams, terrain, theme, tide-gauge, tower, trade-route, value-community, value-creation, value-exploration, value-growth, value-sustainability, value-trust, vessel, weave, workbench, workshop.

## Adding a glyph

1. Add `svg/<name>.svg` following the contract.
2. Run `bun run build`. It lints every glyph and regenerates `src/icons.generated.ts` (committed).
3. Run `bun test`; add the name to the coverage list in `src/icons.test.ts`.
4. Regenerate `contact-sheet.png` with `bun run contact-sheet -- --new <name>` (64, 24, 20 and 16 px on parchment, the whole set on navy; the new glyph gets a brass border; it needs Playwright's Chromium) and check the glyph by eye beside its neighbours.

## API

```ts
import { iconNames, iconSvg, sprite } from '@knowledgeislands/icons'

iconSvg('lighthouse') // decorative: aria-hidden="true"
iconSvg('port', { size: 16, label: 'Port' }) // role="img" with a <title>
document.body.insertAdjacentHTML('afterbegin', sprite()) // then <svg><use href="#ki-lighthouse"/></svg>
```

- `iconNames` (const tuple) and `IconName` (union); `isIconName(name)` narrows a string.
- `iconSvg(name, { size?, label?, className? })`: a standalone SVG string.
- `sprite(names?)`: a hidden SVG of `<symbol id="ki-<name>">` elements.
- `iconBodies`: inner markup per glyph, for renderers that build their own root.
- `lintIcon(source)`, `parseSvg`, `requiredRootAttributes`, `safeArea`: the contract as code.
