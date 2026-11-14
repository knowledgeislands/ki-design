# AGENTS.md — packages-tessera

`packages-tessera` is the canonical source of Tessera, the machine-readable Knowledge Islands design system; it was `ki-design` until 14 November 2026. The [README](README.md) is the entry point. [DESIGN.md](DESIGN.md) is the short design system: essence, principles, hard rules and status words, with a map to [docs/spec/](docs/spec/README.md), one self-contained file per area. [docs/spec/components.md](docs/spec/components.md) is the component library by atomic level. The data in `packages/` is the source of truth for values. This file keeps only standing contribution context.

## Layout

- `packages/tessera`, `packages/tessera-tokens`, `packages/tessera-icons`, `packages/tessera-symbols`, `packages/tessera-tiles` and `packages/tessera-hexmap` are the exact trees consumers vendor, each copied and locked on its own (ELEMENTS-MULTI). Each holds its source, tests, data and the vendoring tools in `tooling/`, and its `tsconfig.json` stands alone. `packages/tessera` also ships `custom-elements.json`.
- `packages/boundaries` (`tessera-boundaries`) proves the module boundaries `.dependency-cruiser.ts` states and the package rules, with the checker installed apart in `tooling/depcruise/`. It is never vendored.
- `apps/storybook/` is Storybook for web components on Vite, built to static files: every part on its own by atomic level, with the Observatory preview as a template and the site preview as pages. It is the visual check before a release.
- `scripts/manifest.ts` writes `packages/tessera/custom-elements.json` with the Custom Elements Manifest analyser; `bun run test` fails when it is stale.
- `CHANGELOG.md` records each release, with breaking changes marked.

## Working contract

- Meaning is canon. A symbol's meaning, a zone's name or a concept's definition changes in `ki-principal` (Philosophy or Aesthetics) through its Enactment Process first; this repository then follows. Never invent meaning here.
- Data is the source of truth. `tokens.json`, `symbols.ts`, the glyph SVGs and the tile contract and manifests hold the values; the spec in `docs/spec/` points to them and never restates their tables. Where prose and data disagree, fix the prose, or list the question in `docs/OPEN.md` when a decision is needed.
- One decision, one record in `docs/decisions/`. Open questions are not records; they live in `OPEN.md` until answered. Records keep the `KI-DESIGN` scope from before the rename.
- Values and drawings are authoritative here. Token values, glyph drawings, tile manifests and component behaviour are changed here and released; consumers take a tagged release.
- Keep the charter: things both surfaces render with. No app code, no data access, no instruments, no network calls at runtime.
- Every colour role keeps the contrast floor recorded in [docs/spec/accessibility.md](docs/spec/accessibility.md) (text 4.5:1, including large display text; control boundaries 3:1) in light and night. A change that drops a pair below its floor fails review.
- The tile-set contract is complete or it is nothing: a tile set is valid only when it covers every id in the inventory, in every condition state, at 1× and 2×.
- Animation follows the clock: 12 fps, a 48-frame master cycle, loops of 4, 6, 8, 12, 16, 24 or 48 frames; frame 0 is the still image.
- Web components exist only for elements both surfaces use. Each exports its stylesheet as a string so consumers' density and contrast tests can read it. Tags begin `tessera-`.
- British English throughout. No i18n in V1.
- Treat generated art as unlicensed until the art-licensing decision is recorded.
- Preserve unrelated dirty work, stage only explicitly owned paths, and do not push, publish or release without separate authority.

## Changing and releasing

- Every change to a package comes with its tests in that package and a look in Storybook; a new component gets a story at its atomic level and a row in [the component library](docs/spec/components.md). A change to an element's properties, events or CSS properties is followed by `bun run self:manifest`.
- The vendoring tools in `tooling/` are identical in every package; change them in all six at once, and `tessera-boundaries` fails when they differ.
- A release numbers every package alike. It bumps `version` in each `packages/tessera*/package.json`, adds a `CHANGELOG.md` section that marks breaking changes, and tags `v<version>`. The root `package.json` is never released. Nothing is published to a registry: the pushed tag is the release.
- Tessera keeps no list of the repositories that use it and sends them no notice: a consumer is any repository holding a `tessera*-lock.json`, and each finds a new release with its own `self:<package>:drift`.

## The sync rule

Each consuming repository's `AGENTS.md` carries this paragraph, word for word:

> Each `packages/tessera*/` folder is a vendored copy of one package of `packages-tessera`, at the release in its `<package>-lock.json`. Never edit one here. Change it upstream first, in `packages-tessera` where your brief allows or by asking its owner, then re-vendor with `bun run self:<package>:sync`. `self:<package>:verify` fails the build on any local edit; `self:<package>:drift` shows what upstream has changed since, to accept with `sync` or reject with `defer`.

A consumer exposes the tools of each package it vendors as `self:<package>:<verb>`, such as `"self:tessera-tokens:verify": "bun packages/tessera-tokens/tooling/tessera.ts verify"`.

## Common commands

Run commands from the repository root.

- `bun install` installs the tools and binds the commit hooks in `.githooks/`, which run lint-staged, Syncpack and Commitlint.
- `bun run test` runs each workspace's tests through Turborepo, including the boundary proof and the Observatory helpers, then the design-review generators and the manifest check.
- `bun run self:typecheck` type-checks every workspace.
- `bun run self:lint` runs Biome; `bunx rumdl check .` checks the Markdown.
- `bun run self:storybook` serves Storybook on <http://localhost:6006/>, and `bun run self:storybook:build` writes it to `apps/storybook/dist/`.
- `bun run self:manifest` regenerates `packages/tessera/custom-elements.json`.
