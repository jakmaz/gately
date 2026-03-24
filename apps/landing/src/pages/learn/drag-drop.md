---
layout: ../../layouts/DocsLayout.astro
title: Drag and Drop Components
description: Discover advanced canvas interactions to build circuits rapidly.
---

## Smooth Interactivity

Gately's node engine heavily utilizes native browser Drag APIs integrated with custom physics mapping to bring your canvas alive.

To place a component:
1. Simply click any item in the left-hand Toolbox.
2. Hold down your mouse completely.
3. Drag the semi-transparent "ghost" of the node over the canvas and deliberately release.

## Snapping and Grids

By default, nodes move with pixel-perfect freeform precision. However, when placing dense arrays of logic gates (like building 8-bit registers), this can get messy.

**Grid Snapping:**
You can toggle "Snap to Grid" in the Editor configuration menu. When active, gates will magnetically pull to strict grid intersections, allowing you to perfectly align inputs with subsequent logic ranks in beautiful, perfectly straight lines.

> "A beautiful circuit architecture is a debuggable circuit architecture."
