---
id: GDR-KI-DESIGN-013
title: 'DTCG tokens, vendored by digest'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-013: DTCG tokens, vendored by digest

## Context

Both surfaces must render from the same values. The local app fetches nothing at runtime and inlines everything into one document, so it cannot load tokens from a package server. PDR-KI-OBSERVA-002 already had the app vendor its tokens and pin them.

## Decision

**The tokens are one DTCG JSON file, and the local app vendors the built stylesheet by digest.**

- `packages/tokens/tokens.json` is the source, in DTCG format. The build emits CSS custom properties (bare roles and Tailwind v4 `--color-*`), a Tailwind theme, a typed module and a SHA-256 digest of the declarations in canonical form.
- Each release publishes the digest. The app vendors tokens by digest; a hand edit fails its test.
- Both apps render from one tagged kit release with matching digests.

## Consequences

- The app vendors its tokens and glyphs from `ki-design` at a pinned commit, as PDR-KI-OBSERVA-008 records; before it, the source was `ki-website`.
- A removed or renamed token is a major release.

## References

- [docs/spec/governance.md](../spec/governance.md#versioning).
- [`packages/tokens`](../../packages/tokens/README.md).
