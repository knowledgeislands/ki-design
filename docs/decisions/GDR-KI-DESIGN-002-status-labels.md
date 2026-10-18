---
id: GDR-KI-DESIGN-002
title: 'Status labels: Official · Agreed · Proposed · Open'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-002: Status labels: Official · Agreed · Proposed · Open

## Context

Every symbol, tile and design decision in this repository carries a status word, and the public site's Field Guide shows it on each entry. The words were _canon_, _decided_ and _proposed_, with open questions listed separately. "Canon" confused readers as a label, and "decided" did not say that enactment into `ki-principal` was still owed.

On 18 October 2026 Kit (Kris Brown) accepted the proposal to rename the labels to Official · Agreed · Proposed · Open: "rename Cannon to official".

## Decision

**The design system has four status labels, always in this order: Official · Agreed · Proposed · Open.**

- **Official** - ratified in `ki-principal`. Formerly _canon_.
- **Agreed** - agreed with the owner and being enacted into `ki-principal`. Formerly _decided_; where an official and an agreed item conflict, the agreed one wins.
- **Proposed** - usable in drafts and mockups, never shipped as settled.
- **Open** - a question still to answer, drawn as DESIGN.md 3.9 says until it is answered.

The data keys change with the labels. `@knowledgeislands/symbols` uses `official`, `agreed` and `proposed`; Open belongs to questions rather than symbols, so it is not a symbol status.

The rename covers status labels only. Knowledge Islands Principal keeps its own use of "canon" and "canonical" for ratified knowledge in Pillars, and roadmap records keep the words they were written with.

## Consequences

- `packages/symbols` statuses, their tests and README, DESIGN.md's status vocabulary and status columns, and the review boards use the new labels.
- Consumers that vendor the symbol library, such as the KI Website's Field Guide, map `official` and `agreed` and show Official and Agreed chips.
- Prose that means the body of ratified knowledge may still say "canon"; a status cell or chip never does.

## References

- [DESIGN.md](../../DESIGN.md) - section 1 (status words) and section 3 (meaning).
- [`@knowledgeislands/symbols`](../../packages/symbols/README.md) - the statuses as data.
