---
layout: ../../layouts/DocsLayout.astro
title: Truth Tables Explained
description: Learn to read and generate truth tables to mathematically profile your circuits.
---

## What is a Truth Table?

A truth table is a mathematical grid utilized in logic processing specifically to compute the functional values of logical expressions on each possible combination of their logical variables.

In human terms: It’s basically a cheat sheet showing exactly what an output will do for every single possible input scenario.

### A Basic AND Gate Truth Table

Let's imagine an AND gate with two inputs, A and B, and one output, Q. Since there are 2 inputs in binary, there are exactly 4 total possible states (`2^n`).

| Input A | Input B | Output (Q) |
|---------|---------|------------|
| 0 | 0 | **0** |
| 0 | 1 | **0** |
| 1 | 0 | **0** |
| 1 | 1 | **1** |

Gately features automated truth table generation. When you select a cluster of interconnected logic gates, you can mathematically generate exactly how those gates compute entirely without manually toggling inputs!
