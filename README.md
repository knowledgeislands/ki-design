# Tessera

Tessera is the Knowledge Islands design system. A tessera is one tile of a mosaic; here each package is one: the design tokens, line glyphs, symbol library, tile sets, hex map engine and web components that the public site and the local app both render with. It lives at [`knowledgeislands/packages-tessera`](https://github.com/knowledgeislands/packages-tessera), formerly `ki-design`.

Each consumer copies the packages it uses whole into `packages/<package>/` and locks each one on its own, by SHA-256, in `<package>-lock.json`; nothing in a consumer's build fetches this repository. The tools that verify, compare and re-vendor a copy ship inside every package, in `tooling/`.

**Charter: things the surfaces render with.** No app code, no data access, no instruments. If both [knowledgeislands.info](https://knowledgeislands.info) and the local app (the Observatory) can use it to look like Knowledge Islands, it belongs here; if only one can, it stays in that app.

## Start here

| You are | Read |
| --- | --- |
| A person or an AI designer (Claude, ChatGPT, a design tool) picking this up cold | [DESIGN.md](DESIGN.md) — the short entry point: essence, principles, hard rules, status words and a map of the rest |
| Working on one area (colour, type, tiles, maps…) | [docs/spec/](docs/spec/README.md) — one self-contained file per area |
| Looking for why something was decided, or what is still open | [docs/decisions/](docs/decisions/README.md) and [OPEN.md](docs/OPEN.md) |
| Producing art or tiles | [docs/briefs/](docs/briefs/README.md) — the tile-set, building, animation and Arcadia briefs, the prompt library and the glyph briefs, with the reference images |
| Wondering why it looks this way | [docs/briefs/design-brief.md](docs/briefs/design-brief.md) and [docs/briefs/concept-atlas.md](docs/briefs/concept-atlas.md) |
| Building with the toolkit | [packages/](#packages) below, and the [component library](docs/spec/components.md) by atomic level |
| Seeing every part on its own | [Storybook](#storybook) below |
| Planning work | [docs/roadmap/](docs/roadmap/) |
| Changing, releasing or vendoring a package | [AGENTS.md](AGENTS.md) and the [changelog](CHANGELOG.md) |

## Place in the Knowledge Islands ecosystem

The prose canon stays where it is: [Knowledge Islands Principal](https://github.com/knowledgeislands/ki-principal)'s `Pillars/Aesthetics` holds Visual Style, the Symbol Library, the Isometric Tiles and the Logo, and `Pillars/Philosophy` holds the meaning every symbol carries. This repository is to that canon what [KI Specifications](https://github.com/knowledgeislands/ki-specifications) is to the philosophy: the machine-readable authority built from it. A change of meaning is made in Principal first; a change of value or drawing is made here.

Consumers:

Tessera keeps no list of its consumers: a consumer is any repository that holds a `tessera*-lock.json`, and each finds a new release with its own `self:<package>:drift`. Today they are the public site, which takes the tokens, glyphs, symbols and hex map renderer at build time, and the Observatory, which vendors the tokens by digest (PDR-KI-OBSERVA-002).

## Packages

Six packages, each vendored and locked on its own, one per layer. One release numbers them all.

| Package | What it is | Level |
| --- | --- | --- |
| [`tessera-tokens`](packages/tessera-tokens) | Colour, type, space, radius and motion tokens in DTCG JSON, built to CSS custom properties (bare roles and Tailwind `--color-*`) with a digest | Tokens |
| [`tessera-icons`](packages/tessera-icons) | Line glyphs on a 24 grid, 1.5 stroke; an SVG sprite and a typed name list ([glyph briefs](docs/briefs/glyph-briefs.md)) | Tokens |
| [`tessera-symbols`](packages/tessera-symbols) | The symbol library as data: every canonical symbol, its meaning, status, glyph and where it surfaces | Tokens |
| [`tessera-tiles`](packages/tessera-tiles) | The tile-set contract: manifest schema, the id inventory every tile set must cover, and the sets themselves (Modern drawn, Ancient waiting on art) | Tokens |
| [`tessera-hexmap`](packages/tessera-hexmap) | Pure TypeScript hex geometry (pointy-top, axial), 2:1 dimetric projection, the `IslandMap` model, and flat and archipelago SVG renderers with no DOM | Organisms (renderers) |
| [`tessera`](packages/tessera) | Web components: `<tessera-glyph>` (an atom) and `<tessera-hexmap>` (an organism), in Lit, with `custom-elements.json` | Atoms, organisms |

[`packages/boundaries`](packages/boundaries) (`tessera-boundaries`) proves the module boundaries and the package rules; it is a repository check and never vendored.

Toolchain: Bun workspaces, Turbo, Biome, rumdl; `mise` pins Bun and Node. Run `bun install`, then `bun run test`.

## Storybook

[`apps/storybook`](apps/storybook) is Storybook for web components on Vite, built to static files. It shows every part by atomic level: the tokens, `<tessera-glyph>`, `<tessera-hexmap>` and the archipelago renderer, the [Observatory preview](apps/storybook/observatory) as a template on an invented sample estate, and the [site preview](apps/storybook/site-preview)'s Voyage home and Field Guide as pages. Each element's controls and docs come from `packages/tessera/custom-elements.json`.

```sh
bun run self:storybook          # serves it on http://localhost:6006/
bun run self:storybook:build    # writes apps/storybook/dist/
bun run self:manifest           # regenerates packages/tessera/custom-elements.json
```

Renders worth opening: `packages/tessera-tiles/sets/modern/arcadia-iso.png`, `packages/tessera-tiles/sets/modern/contact-sheet.png`, `packages/tessera-hexmap/examples/arcadia.png` and `arcadia-night.png`, `packages/tessera-icons/contact-sheet.png`.

## Living sources while in draft

- Design brief (Claude Doc, the source of truth until adopted): <https://claude.ai/code/artifact/01ee18ce-7756-4f70-bc29-f26699c44711>
- Early design canvas (Claude Design): <https://claude.ai/artifact/HDoCgCDLMqMarEDToTU9i4>
- Design System (Claude Design): <https://claude.ai/artifact/LWcv6ZziyZFCU8Xq8r1Z4A>

All three are private until shared from their Share menus.

## Licence

The code and documentation in this repository are released under the [MIT License](LICENSE). AI-generated reference images and art are tracked separately: until the art-licensing decision ([KI-DESIGN-ART-002](docs/roadmap/KI-DESIGN-ART-002-art-licensing.md)) is recorded, treat them as unlicensed.
