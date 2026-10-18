---
id: KI-DESIGN-TOK-001
area: TOK
title: Design tokens v0
kind: deliver
purpose: capability
project: ki-design
component: tokens
horizon: now
status: draft
blocks: []
blocked_by: []
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T03:35:00Z
---

# Design tokens v0

## Goal

Publish the colour, type, space, radius and motion tokens as DTCG JSON, built to CSS custom properties (bare roles and Tailwind v4 `--color-*`), a typed module and a SHA-256 digest.

## Context

The site's `tokens.css` and the Observatory's PDR-KI-OBSERVA-002 values are today's two sources; the design brief makes this repository the single source for both.

## Boundary

Values only. No change of meaning; the Observatory keeps vendoring by digest.

## Done when

Every foreground role passes its contrast floor in light and night by test; the site and the Observatory can each consume the build output without hand edits.
