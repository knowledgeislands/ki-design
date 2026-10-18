---
id: KI-DESIGN-ELE-001
area: ELE
title: Lit SSR spike
kind: deliver
purpose: capability
project: ki-design
component: elements
horizon: now
status: draft
blocks: []
blocked_by: []
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T03:35:00Z
---

# Lit SSR spike

## Goal

Prove Lit server-side rendering with Declarative Shadow DOM in the site's Eleventy build under Bun, or decide to build the site under Node.

## Context

`@lit-labs/ssr` and the Eleventy plugin are labs packages needing Node VM modules.

## Boundary

A spike with a go / no-go note; no production change.

## Done when

`<ki-glyph>` and `<ki-hexmap>` render server-side on a test page and hydrate in the browser, or the no-go is recorded with the alternative.
