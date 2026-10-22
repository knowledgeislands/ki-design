---
id: KI-DESIGN-ELE-001
area: ELE
title: Lit SSR spike
kind: investigate
purpose: learning
component: elements
size: l
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-22T02:16:45Z
---

# Lit SSR spike

## Goal

Establish whether the site's two shared elements can render meaningful HTML without JavaScript and hydrate correctly when Eleventy runs under Bun. Compare Node on the same fixture and recommend an evidenced rendering route and Eleventy runtime, without changing production.

## Context

[`packages/elements`](../../packages/elements/README.md) contains `<ki-glyph>` and `<ki-hexmap>`, using `lit` 3.3.1. Its private package exports TypeScript and depends on the local icons and hexmap workspaces; the site currently vendors design outputs through `sync:design`, not this package. The spike is a temporary research exception to tagged-release consumption, never a package publication or a new production dependency.

[`GDR-KI-DESIGN-012`](../decisions/GDR-KI-DESIGN-012-shared-web-components.md) and the existing [component specification](../spec/components.md) require Declarative Shadow DOM and readable pages without JavaScript; Lit remains proposed pending this spike. Direct `@lit-labs/ssr` rendering and the Eleventy plugin are separate experiments: a plugin worker or VM failure alone does not establish that Bun cannot render Lit.

## Boundary

Work spans ki-design and the local `apps-knowledgeislands.info` checkout. Run one isolated fixture at `apps/site/examples/ssr-spike/` in the site repository on the disposable branch `spike/ki-design-ele-001`; its configuration and output are separate from the production site. The authorised successor brief must name both checkouts and authorise their local writes and isolated registry installation. This draft and its reviews confer no execution authority.

No production page, deployment, publication, release, change to `sync:design`, production build scripts, the site's `main`, or the review state of `KI-WEBSITE-SITE-044`. A Node recommendation concerns the Eleventy rendering process only: existing Bun verification scripts and commit gates remain unchanged. No production consumer integration ships in this investigation.

Keep generated bundles and installation artefacts in the disposable fixture, uncommitted. Home the complete reproducible fixture sources, commands and findings in ki-design before deleting the site branch and scratch files; do not merge that branch. Stop if deleting the branch or scratch directory would remove unrelated work. Ordinary interactive work uses the primary checkout; any unattended execution requiring isolation must name its runtime-owned worktree outside repository and estate-discovery roots.

## Current state

Not started; Draft and `baseline_ref: null`. At the In progress transition, set an immutable ki-design baseline and record the site's corresponding full HEAD in the evidence note. The planning observations were ki-design `f603f56` and site `31d02de84d91c89452a1de3dad5c764bc3da11f5`; recheck both before execution.

Bun 1.4.2 and Node 24.22.0 are installed, and the site has Eleventy 3.1.6 installed. The three Lit Labs packages are not installed in the site. Missing packages are setup work, not evidence of runtime incompatibility. Registry metadata verified the pins below; no installation, rendering or browser experiment has run.

## Steps

- [ ] Recheck both baselines, clean owned paths, execution grants and the readiness approval. Capture baseline gate results in both repositories and the local Chrome version. Create the disposable site branch and isolated fixture, with its own `package.json` (`type: module`) and `bun.lock`; copy the pinned dependency list below into its devDependencies and run `bun install --cwd apps/site/examples/ssr-spike` from the site root only after the successor's registry-install grant. Do not change either repository's root manifest or lockfile, or `apps/site/package.json`. Inside the fixture, record `bun --version` and `mise exec node@24.22.0 -- node --version` as invoked; stop on any mismatch with Bun 1.4.2 or Node 24.22.0. Use that explicit mise invocation for every Node matrix and verifier command, and record the reported runtime version beside each matrix cell.
- [ ] Write `build.mjs` using `Bun.build` to consume the local ki-design `packages/elements/src/index.ts`, bundling its icons and hexmap dependencies into `generated/elements.mjs`. Externalise `lit`, `lit/*`, `lit-html`, `lit-html/*`, `lit-element`, `lit-element/*`, `@lit/reactive-element` and its subpaths; resolve all of them from the isolated fixture. Both runtime experiments load this same generated JavaScript module, so Node never needs to load `.ts` specifiers or use type-stripping flags. No `file:` or `link:` dependency may expose unresolved `workspace:*` references.
- [ ] Build `src/assets/browser.mjs` from that same elements module and the hydration-support entry in one browser module graph, using the fixture's pinned Lit resolution. Await `@lit-labs/ssr-client/lit-element-hydrate-support.js` before dynamically importing the component definitions; ensure importing the support entry does not eagerly import the definitions. Record `import.meta.resolve('lit')` and equivalent resolution from the elements and SSR entry points, plus the browser build metafile, to prove one Lit instance per server context and per browser graph. Stop on duplicate Lit or a mismatched transitive Lit dependency.
- [ ] Create `src/index.11ty.js` with a labelled lighthouse glyph and a deterministic, inline `islandmap/v1` map containing adjacent selectable cells. The fixture page writes the map's text equivalent as its own list outside and next to `<ki-hexmap>`, following [GDR-KI-DESIGN-032](../decisions/GDR-KI-DESIGN-032-living-map-without-javascript.md); do not place the list in the host's light DOM, because the element has no slot. Use the `src` JSON attribute in both paths, not a property only the direct renderer can set. Include isolated assets, token CSS and a delayed hydration trigger for the browser DOM-identity checks. Write `eleventy.config.mjs`: input `src/`, separate output per case, direct mode calling `render()` from a shortcode after installing the SSR DOM shim and registering the elements, or plugin mode registering the generated component module. Never run both renderers on the same HTML.
- [ ] Run direct rendering under Bun, then the plugin under Bun, using the commands below. Use plugin `mode: 'worker'` as the primary isolated mode; also diagnose `mode: 'vm'` with `--experimental-vm-modules`, recording the distinction. The registry README documents workers as the default and VM as a separate mode requiring that flag; do not assume all SSR needs VM modules. Save stdout, stderr, exit status and generated HTML for each attempt.
- [ ] Run the identical direct and plugin cases under Node 24.22.0, with the same pins, bundle, fixture and assertions, even if Bun passed. Repeat the plugin VM diagnostic with the Node flag. Separate package/configuration, bundle resolution, VM/worker and component-lifecycle failures before attributing a failure to a runtime. A setup failure leaves the experiment blocked.
- [ ] Implement and run `verify-html.mjs` and `verify-browser.mjs` against every successful matrix output. Use `playwright-core` with the already-installed local Chrome executable, headless and served on loopback only; download no browser. Test no-JavaScript rendering, delayed hydration with retained DOM identity, glyph updates, map selection and keyboard navigation as specified below. Capture console messages and page errors, assertions and screenshots.
- [ ] Repeat the named repository gates, record the two-by-two result and VM diagnostic, and apply the decision procedure below. Write the evidence note and proposed ki-design decision. Record any site-owned runtime or alternative proposal in the evidence note's handoff section and return the proposed message line in the run report's Queries; the supervisor posts it to the work that owns the site for its owner to capture under `ki-next`. The site has no open work package under `+/_WORK/`; do not create one or write to a third repository. Update the affected specification and guides consistently with the result, and identify receiver-owned follow-up work. Preserve all evidence before cleaning up the disposable branch; do not accept this record or change production.

## Files touched

In ki-design, the durable procedure and evidence go in `docs/guides/developer/lit-ssr-spike.md`, including the complete fixture source, package manifest and lockfile digest, reproduction commands and matrix. The outcome goes in one new correctly allocated Decision Record under `docs/decisions/` with slug `lit-ssr-spike`, linked from the note; allocate the identifier at execution to avoid collisions. Also assess `docs/spec/components.md`, `packages/elements/README.md` and this work record. No design-package source or compatibility edit is authorised by this plan: if the unchanged elements cannot pass, record the exact defect and replan that edit separately. Add its index entry in `docs/guides/developer/README.md`.

In `apps-knowledgeislands.info`, the disposable `apps/site/examples/ssr-spike/` contains `package.json`, `bun.lock`, `build.mjs`, `eleventy.config.mjs`, `src/index.11ty.js`, `src/assets/browser.mjs`, `src/assets/tokens.css`, `verify-html.mjs` and `verify-browser.mjs`; `generated/`, `node_modules/` and `out/{bun,node}-{direct,plugin}/` are temporary outputs. The local ki-design checkout supplies the elements entry and its workspace dependencies. The production `apps/site/src/`, `apps/site/eleventy.config.ts`, `apps/site/package.json` and root `bun.lock` are excluded. The isolated configuration prevents scratch pages entering `verify:reachable`, `verify:prose` or `verify:routes`; no exemption weakens those gates.

Any site-owned runtime decision belongs under that repository's `docs/decisions/`, slug `eleventy-lit-ssr-runtime` and its next allocated identifier. Record any site-owned runtime or alternative proposal in the evidence note's handoff section and return the proposed message line in the run report's Queries; the supervisor posts it to the work that owns the site for its owner to capture under `ki-next`. The site has no open work package under `+/_WORK/`; do not create one or write to a third repository. The investigation does not write the site's roadmap, approve its decision, or change its Eleventy invocation in production.

## Verify

From the isolated fixture directory, first run `bun run build.mjs`; all outputs must use the same generated elements module. `eleventy.config.mjs` reads `SSR_PATH=direct|plugin` and `SSR_PLUGIN_MODE=worker|vm`, while `--output` keeps each result separate. These are commands for the successor to implement and execute, not evidence that they have passed:

```sh
SSR_PATH=direct bun node_modules/@11ty/eleventy/cmd.cjs --config=eleventy.config.mjs --output=out/bun-direct
SSR_PATH=plugin SSR_PLUGIN_MODE=worker bun node_modules/@11ty/eleventy/cmd.cjs --config=eleventy.config.mjs --output=out/bun-plugin
SSR_PATH=direct mise exec node@24.22.0 -- node node_modules/@11ty/eleventy/cmd.cjs --config=eleventy.config.mjs --output=out/node-direct
SSR_PATH=plugin SSR_PLUGIN_MODE=worker mise exec node@24.22.0 -- node node_modules/@11ty/eleventy/cmd.cjs --config=eleventy.config.mjs --output=out/node-plugin
SSR_PATH=plugin SSR_PLUGIN_MODE=vm bun --experimental-vm-modules node_modules/@11ty/eleventy/cmd.cjs --config=eleventy.config.mjs --output=out/bun-plugin-vm
SSR_PATH=plugin SSR_PLUGIN_MODE=vm mise exec node@24.22.0 -- node --experimental-vm-modules node_modules/@11ty/eleventy/cmd.cjs --config=eleventy.config.mjs --output=out/node-plugin-vm
mise exec node@24.22.0 -- node verify-html.mjs out/bun-direct/index.html
mise exec node@24.22.0 -- node verify-browser.mjs out/bun-direct
```

Repeat the final two commands with each successful output directory. Each verifier must return non-zero on a failed assertion; record the exact command, exit status and evidence for failures rather than replacing a failed run with a generic no-go note.

HTML assertions: both custom-element hosts contain `<template shadowrootmode="open">`, Lit part markers and meaningful SVG, including non-empty lighthouse geometry. The map's shadow root contains the expected number of `role="option"` cells, and their `aria-label` values name the fixture's cells. The fixture-owned text list outside and next to `<ki-hexmap>` names those same cells. An empty host or template fails. Record the actual glyph and cell counts and input map in the evidence note.

Browser assertions: in a JavaScript-disabled Chrome context, both native declarative shadow roots show the expected SVG and the fixture-owned text list outside and next to `<ki-hexmap>` is readable and names the fixture's cells. In a separate JavaScript-enabled context, hold component loading, retain references to both existing shadow roots and their SVG nodes, then release hydration. Await both definitions and `updateComplete`; root and SVG identities must be retained, with no replacement on initial adoption, no hydration mismatch, page error or unexpected console warning. Changing the glyph name must update its drawing; clicking a map cell must select it and emit the expected `ki-select` detail; Arrow navigation must move the single roving tabindex and focus to the expected adjacent cell, and Enter and Space must select it. Capture before/after assertions and screenshots. Happy-dom alone cannot verify Declarative Shadow DOM or hydration.

Repository gates: in ki-design, run DESIGN-2 (`bun run --cwd packages/boundaries test`), `bun run --cwd packages/elements test`, `bun run self:typecheck`, `bun run build` and `bun run test`, plus rumdl on authored Markdown. In the site, run `bun run ki:site:build` (including every existing `verify:*` gate), `bun run self:typecheck` and `bun run test`, with no deploy command. Both commit hooks must run normally for any authorised durable commit. Record pre-existing failures separately and add none; do not repair unrelated findings in this spike.

Decision procedure: the matrix records direct and plugin results for Bun and Node independently, with browser verification required for a pass. **Go** means Bun passes at least one complete render-and-hydrate path; select the proven path and retain any plugin-specific limitation. **Conditional go** means no complete Bun path passes but at least one Node path passes; propose a site-owned decision about the Eleventy process only. **No-go** requires completed, diagnosed failures of both paths under both runtimes and an evidenced alternative; evaluate build-time pre-rendering beside `sync:design` or a changed component lifecycle in separately approved work. An untested alternative, unresolved setup problem or inconclusive result stays blocked rather than being declared completed no-go. A plugin failure with a passing Bun direct path is a Bun go, not a Bun no-go.

## Dependencies / blocks

No predecessor record is required (`blocked_by: []`), but execution depends on the two named checkouts and immutable baselines, Bun 1.4.2, Node 24.22.0, local Chrome, isolated install authority and successful package resolution. It must not depend on an unpublished elements package being available from a registry. The site fixture owns its devDependencies and lockfile; neither root workspace installation is changed.

Exact fixture devDependencies are `lit` 3.3.1, `@lit-labs/ssr` 4.1.0, `@lit-labs/ssr-client` 1.1.8, `@lit-labs/eleventy-plugin-lit` 1.0.6, `@11ty/eleventy` 3.1.6, `@types/node` 24.10.0 and `playwright-core` 1.56.1. Do not use ranges for these direct pins. Pin `@types/node` below 25 here because SSR's peer range excludes the root workspaces' Node 26 types. Save the resolved transitive graph and lockfile digest, and verify all Lit-family ranges resolve to one compatible graph. A range mismatch blocks execution rather than prompting a silent upgrade.

On 22 October 2026, read-only registry queries `npm view <package>@<pin> version dependencies peerDependencies engines --json` returned this compatibility evidence:

- [`@lit-labs/ssr` 4.1.0](https://www.npmjs.com/package/@lit-labs/ssr/v/4.1.0) requires `lit` `^3.1.2`, `lit-html` `^3.1.2`, `lit-element` `^4.0.4`, `@lit/reactive-element` `^2.0.4` and `@lit-labs/ssr-client` `^1.1.7`. Its Node engine is `>=13.9.0`; its `@types/node` peer is `>=20.0.0 <25.0.0`.
- [`@lit-labs/ssr-client` 1.1.8](https://www.npmjs.com/package/@lit-labs/ssr-client/v/1.1.8) requires `lit` and `lit-html` `^3.1.2`, and `@lit/reactive-element` `^2.0.4`. Its exports include `./lit-element-hydrate-support.js`, the browser hydration entry required here.
- [`@lit-labs/eleventy-plugin-lit` 1.0.6](https://www.npmjs.com/package/@lit-labs/eleventy-plugin-lit/v/1.0.6) requires SSR `^4.0.0` and `lit` `^2.7.0 || ^3.0.0`, with Node `>=12.16.0`. Its registry README documents worker and VM modes and loading hydration support before Lit component definitions.
- [`lit` 3.3.1](https://www.npmjs.com/package/lit/v/3.3.1) requires `lit-html` `^3.3.0`, `lit-element` `^4.2.0` and `@lit/reactive-element` `^2.1.0`; these ranges are subsets of the corresponding SSR ranges. Lit 3.3.1 satisfies all three direct Lit ranges, SSR 4.1.0 satisfies the plugin's SSR range, and client 1.1.8 satisfies SSR's client range. Node 24.22.0 and types 24.10.0 satisfy the declared engine and peer constraints. This establishes package-metadata compatibility only; runtime and hydration compatibility remain the spike's experiments.

The additional pins were checked against the local Eleventy installation and read-only registry metadata for types and `playwright-core` (Node `>=18`). No package or browser was installed during planning. The successor brief must expressly grant the isolated registry installation; browser downloads, package publication and any production runtime change remain outside that grant.

## Delegation

Size is `l`: one serial investigation across two repositories. The successor brief must name the disposable site branch or authorised runtime-owned worktree, both baselines, the isolated registry-install grant, permitted paths, the evidence destination and the return contract. It must keep this item Draft until the separate readiness decision and may not infer implementation authority from this replan.

After this amendment, obtain fresh independent high-confidence agreement from all three planning reviewers: Codex at xhigh, Opus 5.5 at high and Fable 5.1 at high. The prior NOT READY reviews do not satisfy that gate. The supervisor owns review dispatch and the later Ready transition under the 22 October 02:26 BST approval; this run neither dispatches background agents nor marks the record Ready, accepted or done.

Escalate missing grants, contested checkout state, unavailable runtimes or Chrome, incompatible resolution, any required production or package-source change, or inconclusive evidence. Return the two-by-two matrix, VM diagnostics, exact reproduction commands, browser evidence, gate outcomes, proposed decision and receiver-owned follow-ups. Do not expand into implementation or change the site's pending review. Record any site-owned runtime or alternative proposal in the evidence note's handoff section and return the proposed message line in the run report's Queries; the supervisor posts it to the work that owns the site for its owner to capture under `ki-next`. The site has no open work package under `+/_WORK/`; do not create one or write to a third repository.

## Documentation impact

### Decision Records

Every outcome needs one ki-design Decision Record under `docs/decisions/` with slug `lit-ssr-spike`: go records the proven Lit path and its conditions; conditional go records the Node limitation and site handoff; no-go records the demonstrated limitation and alternative and proposes the necessary reconsideration of GDR-KI-DESIGN-012. The site owns any separate `docs/decisions/` record. Record any site-owned runtime or alternative proposal in the evidence note's handoff section and return the proposed message line in the run report's Queries; the supervisor posts it to the work that owns the site for its owner to capture under `ki-next`. The site has no open work package under `+/_WORK/`; do not create one or write to a third repository.

### Specifications

Update the existing `docs/spec/components.md` toolkit wording after the result: distinguish the proven route and its conditions from the production rollout still pending. If no route passes, link the reconsideration of GDR-KI-DESIGN-012 and retain the no-JavaScript requirement pending its owner's decision. Do not claim that this repository has no specifications. Record separately that the v0 element renders SVG with per-cell labels but does not render the text equivalent required by the component specification. This is a follow-up finding under Documentation impact, independent of the SSR/runtime matrix, and does not make a spike path fail. The fixture-owned adjacent list supplies the spike's text equivalent; no package-source fix is authorised here.

### Guides

`docs/guides/developer/lit-ssr-spike.md` is the durable reproduction procedure and conclusion for developers, including the full temporary fixture sources, evidence and handoff section; add its index entry in `docs/guides/developer/README.md`, following the declared `ki-guides` collection. Assess `packages/elements/README.md` for confirmed consumption or hydration constraints; change it only where the experiment substantiates the guidance. Generic check and preview guidance does not replace the spike procedure.

### Roadmap

A go identifies separately planned follow-up to ship server-rendered elements; conditional go additionally returns the site runtime proposal, and no-go identifies the tested limitation and alternative work. Record any site-owned runtime or alternative proposal in the evidence note's handoff section and return the proposed message line in the run report's Queries; the supervisor posts it to the work that owns the site for its owner to capture under `ki-next`. The site has no open work package under `+/_WORK/`; do not create one or write to a third repository. This record delivers findings only and stays Draft until the three-reviewer gate is met.

## Discussion

### Review reconciliation

The stricter cross-repository scope is explicit, while the stricter dependency-isolation requirement selects a site-owned fixture with its own manifest and lockfile. This replaces the alternative of adding devDependencies to `apps/site/package.json` and changing the site's root `bun.lock`; the production Eleventy configuration is likewise replaced by a separate fixture configuration. These choices preserve the site gates and the prohibition on production changes while testing its installed Eleventy version and runtime invocation.

### Origin

Captured from the design system on 18 October 2026; the original “Done when” condition is now the Verify section. This plan is an investigation, not delivery of production SSR.
