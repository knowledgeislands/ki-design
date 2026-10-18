# Working in this repository

Install the toolchain once, run the same checks the commit gate and CI run before you commit, and open the previews to see a change in context. A change of meaning starts in Knowledge Islands Principal; a change of value or drawing starts here.

## Install

The repository is a Bun workspace. `mise` pins Bun and Node, so with `mise` installed:

```bash
mise install
bun install
git config core.hooksPath .githooks
```

The last line binds the committed commit gate in `.githooks/`, which runs the Husky hooks once `bun install` has put their tools in `node_modules/.bin`. Without that install the gate refuses the commit rather than letting it through unchecked.

## Check before you commit

```bash
bun run test            # every package's tests through Turbo, then the Observatory preview's tests
bun run self:typecheck  # tsc --noEmit in every package
bunx @biomejs/biome check
bunx syncpack format --check
bunx rumdl check .
```

CI runs `ki repo audit --repo .` and then `bun run test`. Run the audit locally with an installed `ki` to see the same findings.

## See a change

- `bun run self:preview -- --fixtures` serves the Observatory preview from local fixtures at <http://127.0.0.1:1676/>; without `--fixtures` it reads a running Observatory through a read-only proxy. The fixtures folder is ignored because it holds estate data.
- `bun examples/site-preview/serve.ts` serves the site preview at <http://127.0.0.1:1677/>.

## Where a change belongs

- Meaning — what a symbol, zone or concept stands for — changes in Knowledge Islands Principal through its Enactment Process first. Only then does `packages/symbols` mark it canon here.
- Values and drawings — token values, glyphs, tile manifests and component behaviour — change here, with tests, and consumers take a tagged release.
- Every colour role keeps its contrast floor in light and night; the tokens package tests fail a change that drops a pair below it.
