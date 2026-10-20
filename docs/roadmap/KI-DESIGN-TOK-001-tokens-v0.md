---
id: KI-DESIGN-TOK-001
area: TOK
title: Design tokens v0
kind: deliver
purpose: capability
project: ki-design
component: tokens
status: done
blocks: []
blocked_by: []
baseline_ref: 4f73f6db4fafdb5bb1cbf8a70442ef5f7378a9d1
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-20T04:23:51Z
---

# Design tokens v0

## Goal

Publish the colour, type, space, radius and motion tokens as DTCG JSON, built to CSS custom properties (bare roles and Tailwind v4 `--color-*`), a typed module and a SHA-256 digest.

## Context

The site's `tokens.css` and the Observatory's PDR-KI-OBSERVA-002 values are today's two sources; the design brief makes this repository the single source for both.

## Boundary

Values only. No change of meaning; the Observatory keeps vendoring by digest.

## Current state

v0 landed in `04b2761`: DTCG source in `packages/tokens/tokens.json`, the CSS and Tailwind v4 builds, the typed module and the digest, with contrast tests. The site and the Observatory have not yet both consumed the build output.

## Steps

- [x] Confirm every foreground role passes its contrast floor in light and night in the package tests: add a role-coverage test so that every role in `tokens.json` is a text role (4.5:1), the boundary (3:1), the paper or the decorative rule, and no role escapes the floors.
- [x] Confirm the site and the Observatory each consume the build output without hand edits, read-only: the site's vendored `tokens.css` and `theme.css` against a fresh `bun run build`, and the Observatory's `vendor-ki-design.ts` in check mode.

## Files touched

`packages/tokens/`

## Verify

Every foreground role passes its contrast floor in light and night by test; the site and the Observatory can each consume the build output without hand edits.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: this item delivers within decisions already recorded in the design brief.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

Close this item on acceptance; both consumers take the build.

## Review

### Delivered

Within the boundary above, from baseline `4f73f6d`: a role-coverage test in the token package, and read-only confirmation that both consumers take the build unchanged. No token value, meaning or consumer file changed.

### Change Summary

`packages/tokens/src/contrast.test.ts` gains a `role coverage` block: every name in `roleNames` is a text role, the boundary, the paper or the rule (the floors in [accessibility.md](../spec/accessibility.md)), and each theme in `tokens.json` declares exactly those roles, so a new role cannot land without a floor.

### Verification

- Token package tests: 55 pass, 0 fail, the contrast floors included for both themes.
- The site (`apps-knowledgeislands.info`, `apps/site/src/assets/css/ki-design/`, vendored at `481ebef`, no token change since) holds `tokens.css` and `theme.css` byte-identical to a fresh build below their provenance comment.
- The Observatory's `bun scripts/design/vendor-ki-design.ts ../ki-design`, in check mode, exits 0: its vendored role tokens, glyphs and hexmap-with-tokens copy match their pinned commits.
- Repository gates: the tokens, icons, symbols, tiles and hexmap package tests and typechecks, the 86 preview and generator tests, `tsc -p examples/observatory-preview`, `biome check .`, `rumdl check .` and `build-boards.ts --check` pass; the `ki-work-roadmap` and `ki-authoring` audits report FAIL=0. Offline, the `elements` package's `lit` and `happy-dom` and the local `rumdl` devDependency could not be installed, so the `elements` tests and typecheck did not run and `knip` reports `rumdl` unused, as it does at baseline; neither touches this item.

### Outstanding concerns

None for this item. Both consumers pin older commits by design; refreshing them is their own work.

### Post-change review

The goal holds: the floors are tested for every foreground role, and both consumers take the build without hand edits. The change is one test block, so regression risk is nil. Ready for acceptance.

### Mini recap

Added the role-coverage test, confirmed both consumers read-only. No learning to route.

## Done

Accepted 2026-10-20 by Kris Brown on the review packet above.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.

### Acceptance

Accepted on 20 October 2026 under ACCEPT-BUNDLE, SWEEP-ACCEPT-OBSERVATORY a), as recorded in Knowledge Islands Principal `+/_WORK/ki.ways-of-working/decisions.md` (05:20 BST). Kris: "let's sweep through all the acceptance of the observatory, and then get everything that's been accepted so far pruned." The bundle covered exactly KI-OBSERVA-VIS-022, KI-OBSERVA-APP-045, KI-OBSERVA-VIS-041, KI-OBSERVA-VIS-043, KI-OBSERVA-VIS-044, KI-OBSERVA-APP-046, KI-DESIGN-TOK-001, KI-DESIGN-MAP-001, KI-DESIGN-OBS-015, KI-DESIGN-SYM-001 and KI-DESIGN-TIL-001, after a blind review of each packet; the six exceptions it named stay open.
