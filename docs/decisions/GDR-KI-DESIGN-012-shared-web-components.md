---
id: GDR-KI-DESIGN-012
title: 'Only two shared web components'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-012: Only two shared web components

## Context

PDR-KI-OBSERVA-002 in the Observatory says "shared values, never shared rendering". The design brief proposed five Lit components, but on the test of "both surfaces use it" only the glyph and the hex map qualify. The site's cartouche and journey rail, and the app's status chip, are each used by one surface.

## Decision

**Only elements both surfaces share become components: `<ki-glyph>` and `<ki-hexmap>`** (decided 18 October 2026). Everything else (buttons, dialogs, forms, tables, cartouches) is a pattern each surface builds from tokens.

- The two are framework-neutral Custom Elements, styled from tokens only, and server-rendered on the site with Declarative Shadow DOM so pages read without JavaScript.
- Each exports its stylesheet as a string so the app's density and contrast tests can read it.
- Lit is the proposed implementation, pending the spike KI-DESIGN-ELE-001.

## Consequences

- `@knowledgeislands/elements` holds the two components and nothing else.
- The exception to PDR-002 is to be recorded in PDR-KI-OBSERVA-007, which is not yet written.
- Site-only and app-only patterns live in their own repositories.

## References

- [docs/spec/components.md](../spec/components.md).
- [`packages/elements`](../../packages/elements/README.md).
