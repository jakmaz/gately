---
layout: ../../layouts/DocsLayout.astro
title: Saving and Loading Projects
description: Securely save your complex logic circuits directly in your browser or export them locally.
---

## Browser Local Storage

By default, Gately features an aggressive autosave system. Every time you place a gate or connect a wire, the entire node graph is serialized and stored in your browser's local memory.
- You can completely close the tab, restart your computer, and return to Gately days later—your circuit will perfectly resume from the exact state you left it in.
- *Note: Clearing your browser cache or site data will permanently wipe naturally auto-saved files.*

## Manual Export / Import

For permanent archiving or sharing your engineering accomplishments with peers, you should use local file generation.

### Exporting
Click the **Export** button in the top right corner. Gately compresses your entire workspace (including node positions, wire connections, and custom labels) into a tiny `.gately` JSON file and downloads it.

### Importing
Conversely, clicking **Import** allows you to upload any `.gately` file. This is fantastic for collaborating on complex full-adder circuits or sharing debugging states with the community.
