---
id: KI-DESIGN-MAP-002
area: MAP
title: Isometric renderer
kind: deliver
purpose: capability
project: ki-design
component: hexmap
horizon: next
status: draft
blocks: []
blocked_by: []
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T03:35:00Z
---

# Isometric renderer

## Goal

Render an IslandMap isometrically from a tile set's atlas in Canvas 2D, with per-cell painter's order, ground-level routes and decals.

## Context

Needed for the Living Map and the Arcadia page once the Ancient set exists.

## Boundary

Canvas 2D only (no PixiJS) so the local app can inline it if it ever wants it.

## Done when

Arcadia renders from the Modern set at 60 fps on a laptop and within the image budgets.
