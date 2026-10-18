# Knowledge Islands Design

Knowledge Islands Design is the machine-readable design system for every Knowledge Islands surface: the design tokens, icons, symbol library, tile sets, hex map engine and web components that the public site and the local app both render with.

**Charter: things the surfaces render with.** No app code, no data access, no instruments. If both [knowledgeislands.info](https://knowledgeislands.info) and the local app (the Observatory) can use it to look like Knowledge Islands, it belongs here; if only one can, it stays in that app.

## Start here

| You are | Read |
| --- | --- |
| A person or an AI designer (Claude, ChatGPT, a design tool) picking this up cold | [DESIGN.md](DESIGN.md) — the complete design system in one document |
| Producing art or tiles | [docs/briefs/](docs/briefs/README.md) — the tile-set, building, animation and Arcadia briefs, with the reference images |
| Wondering why it looks this way | [docs/briefs/design-brief.md](docs/briefs/design-brief.md) and [docs/briefs/concept-atlas.md](docs/briefs/concept-atlas.md) |
| Building with the toolkit | [packages/](#packages) below |
| Planning work | [docs/roadmap/](docs/roadmap/) |

## Place in the Knowledge Islands ecosystem

The prose canon stays where it is: [Knowledge Islands Principal](https://github.com/knowledgeislands/ki-principal)'s `Pillars/Aesthetics` holds Visual Style, the Symbol Library, the Isometric Tiles and the Logo, and `Pillars/Philosophy` holds the meaning every symbol carries. This repository is to that canon what [KI Specifications](https://github.com/knowledgeislands/ki-specifications) is to the philosophy: the machine-readable authority built from it. A change of meaning is made in Principal first; a change of value or drawing is made here.

Consumers:

- [apps-knowledgeislands.info](https://github.com/knowledgeislands/apps-knowledgeislands.info) — Eleventy and Tailwind; takes tokens as CSS custom properties and Tailwind `@theme`, the icons, the hex map renderer at build time, and the web components.
- [apps-observatory.local](https://github.com/knowledgeislands/apps-observatory.local) — the local app; vendors the tokens by digest (PDR-KI-OBSERVA-002) and takes the hex map renderer and the shared elements pinned by exact version.

## Packages

| Package | What it is | State |
| --- | --- | --- |
| [`@knowledgeislands/tokens`](packages/tokens) | Colour, type, space, radius and motion tokens in DTCG JSON, built to CSS custom properties (bare roles and Tailwind `--color-*`) with a digest | v0 |
| [`@knowledgeislands/icons`](packages/icons) | Line glyphs on a 24 grid, 1.5 stroke; an SVG sprite and a typed name list | v0: 71 glyphs, the full DESIGN.md inventory |
| [`@knowledgeislands/symbols`](packages/symbols) | The symbol library as data: every canonical symbol, its meaning, status, glyph and where it surfaces | v0 |
| [`@knowledgeislands/hexmap`](packages/hexmap) | Pure TypeScript hex geometry (pointy-top, axial), 2:1 dimetric projection, `IslandMap` model and a flat SVG renderer with no DOM | v0 |
| [`@knowledgeislands/tiles`](packages/tiles) | The tile-set contract: manifest schema, the id inventory every tile set must cover, and the sets themselves (Modern, Ancient) | contract v0; Modern set v0 drawn (37 tiles); Ancient set waits on art |
| [`@knowledgeislands/elements`](packages/elements) | Web Components: `<ki-glyph>` and `<ki-hexmap>` (the two shared by both surfaces) | v0: Lit, tested in happy-dom |

Toolchain: Bun workspaces, Turbo, Biome, rumdl; `mise` pins Bun and Node. Run `bun install`, then `bun run test`.

## Examples

| Example | What it shows | Run |
| --- | --- | --- |
| [`examples/observatory-preview`](examples/observatory-preview) | The local app restructured around Observe · Attend · Act · Extend, in the new design, reading the real Observatory's API through a read-only proxy | `bun run preview` (live) or `bun run preview -- --fixtures`, then <http://127.0.0.1:1676/> |
| [`examples/site-preview`](examples/site-preview) | The Voyage home and the Field Guide for knowledgeislands.info, drawn with the Modern set | `bun examples/site-preview/serve.ts`, then <http://127.0.0.1:1677/> |

Renders worth opening: `packages/tiles/sets/modern/arcadia-iso.png`, `packages/tiles/sets/modern/contact-sheet.png`, `packages/hexmap/examples/arcadia.png` and `arcadia-night.png`, `packages/icons/contact-sheet.png`.

## Living sources while in draft

- Design brief (Claude Doc, the source of truth until adopted): <https://claude.ai/code/artifact/01ee18ce-7756-4f70-bc29-f26699c44711>
- Early design canvas (Claude Design): <https://claude.ai/artifact/HDoCgCDLMqMarEDToTU9i4>
- Design System (Claude Design): <https://claude.ai/artifact/LWcv6ZziyZFCU8Xq8r1Z4A>

All three are private until shared from their Share menus.
