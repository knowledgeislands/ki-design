---
id: GDR-KI-DESIGN-017
title: 'ki-design is the home of the design kit'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-017: ki-design is the home of the design kit

## Context

The shared design kit needed a home. Kit first chose `apps-common`. The review recommended `ki-design`: `apps-*` repositories are deployable apps and "common" names a bucket, while `ki-design` would sit beside the Aesthetics prose canon as `ki-specifications` sits beside the Philosophy. Kit chose `ki-design` on 18 October 2026, and the repository was created and made public that day.

## Decision

**`knowledgeislands/ki-design` holds the machine-readable design system:** tokens, glyphs, the symbol library, the tile contract and sets, the hex map engine, the shared elements and the spec.

- Its charter is things both surfaces render with: no app code, no data access, no instruments, no network calls at runtime.
- `ki-principal` wins on meaning; `ki-design` wins on values.
- It is public under the MIT licence and conforms to the Knowledge Islands repository standard.

## Consequences

- Package names are `@knowledgeislands/*`.
- Consumers take tagged releases, each with a token digest.
- Generated art in the repository is treated as unlicensed until the art-licensing decision is recorded.

## References

- README and docs/spec/governance.md.
