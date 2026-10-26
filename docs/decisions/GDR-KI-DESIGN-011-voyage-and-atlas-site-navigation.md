---
id: GDR-KI-DESIGN-011
title: 'Voyage and Atlas site navigation'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-011: Voyage and Atlas site navigation

## Context

The public site has two kinds of reading: a story read once, in order, and a reference returned to. The design brief kept the site's narrative order from Philosophy to Model to Arcadia as the spine and added a separate reference half. DESIGN.md set it out as the site's structure. The Decisions board marked it agreed and noted that DESIGN.md had not listed it among its decided items, so this record states it as DESIGN.md wrote it.

## Decision

**The site has two halves.**

- The **Voyage** is read once, in order, to understand: Home → Philosophy → Model → Arcadia → Landscapes → Create.
- The **Atlas** is returned to, to look things up: the Field Guide, Docs, Specifications and Projects / Journal.
- Navigation reads Philosophy · Model · Arcadia · Landscapes · Docs · Projects, with **Enter Arcadia** as the one brass call to action.
- Every Voyage page links to the Atlas entries it mentions, and every Atlas entry links back to where the Voyage explains it.

## Consequences

- Stable routes (`/install/ki`, `/harness/bootstrap`, `/specifications/…`) never move.
- The page list and their key components are in the spec. Kit can revise this record if the structure changes.

## References

- docs/spec/layout.md.
- Design brief, "Public site".
