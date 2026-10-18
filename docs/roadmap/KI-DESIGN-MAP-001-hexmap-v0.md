---
id: KI-DESIGN-MAP-001
area: MAP
title: Hex map engine v0
kind: deliver
purpose: capability
project: ki-design
component: hexmap
horizon: now
status: draft
blocks: []
blocked_by: []
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T03:35:00Z
---

# Hex map engine v0

## Goal

Pure TypeScript hex geometry (pointy-top, axial, odd-r), 2:1 dimetric projection, the `islandmap/v1` model with a validator, and a deterministic flat SVG renderer.

## Context

One data model, two renderers is the brief's core architecture; the flat renderer gives value before any painted art exists.

## Boundary

No DOM in the core; isometric rendering is MAP-002.

## Done when

Arcadia's example map renders to SVG in tests; the Known Lands chart in the preview uses it.
