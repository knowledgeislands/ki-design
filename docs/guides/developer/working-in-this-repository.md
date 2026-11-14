# Working in this repository

Install the toolchain once, run the same checks the commit gate and CI run before you commit, and open Storybook to see a change in context. A change of meaning starts in Knowledge Islands Principal; a change of value or drawing starts here.

## Install

The repository is a Bun workspace. `mise` pins Bun and Node, so with `mise` installed:

```bash
mise install
bun install
```

`bun install` runs the `prepare` script, which binds the committed commit gate in `.githooks/` with `git config core.hooksPath .githooks`. The gate runs lint-staged, the Syncpack format check and Commitlint from `node_modules/.bin`; without that install it refuses the commit rather than letting it through unchecked.

## Check before you commit

```bash
bun run test            # every workspace's tests through Turbo, then the generators and the manifest check
bun run self:typecheck  # tsc --noEmit in every package
bunx @biomejs/biome check
bunx syncpack format --check
bunx rumdl check .
```

CI runs `ki repo audit --repo .` and then `bun run test`. Run the audit locally with an installed `ki` to see the same findings.

## See a change

- `bun run self:storybook` serves Storybook at <http://localhost:6006/>: every part by atomic level, the Observatory preview on an invented sample estate, and the site preview's pages. `bun run self:storybook:build` writes it as static files to `apps/storybook/dist/`.
- `bun run self:manifest` regenerates `packages/tessera/custom-elements.json` after a change to an element's interface; `bun run test` fails while it is stale.

## Where a change belongs

- Meaning — what a symbol, zone or concept stands for — changes in Knowledge Islands Principal through its Enactment Process first. Only then does `packages/tessera-symbols` mark it canon here.
- Values and drawings — token values, glyphs, tile manifests and component behaviour — change here, with tests, and consumers take a tagged release by re-vendoring each package they use ([AGENTS.md](../../../AGENTS.md#changing-and-releasing)).
- Every colour role keeps its contrast floor in light and night; the tokens package tests fail a change that drops a pair below it.
