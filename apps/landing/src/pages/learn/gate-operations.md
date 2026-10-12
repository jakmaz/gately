---
layout: ../../layouts/DocsLayout.astro
title: Basic gate operations
description: Understand binary inputs, gate outputs, and live simulation.
---

## Binary values

Gately works with two values: **0** and **1**. Input switches let you change those values. Gates combine or invert their inputs, and output components display the result.

The examples in Learn use gray for `0` and blue for `1`. Read the displayed values when checking a circuit.

## How gates respond

A gate's output depends on its input values:

- **AND:** outputs `1` when both inputs are `1`.
- **OR:** outputs `1` when at least one input is `1`.
- **NOT:** changes `0` to `1` and `1` to `0`.

See [AND, OR, NOT gates](/learn/basic-gates) for examples and truth tables.

## Live updates

Changing an input or a connection recalculates the circuit. There is no separate play button needed to try a combinational circuit.

A disconnected input is evaluated as `0`. Check the wires and input handles if an output does not behave as expected.

## Simulation scope

This is a Boolean simulation. It does not model electrical voltages or gate propagation delays.

Combinational circuits, whose outputs depend on current inputs, are the main supported use case. Feedback circuits need a stateful simulation model to represent memory reliably; see [Circuit patterns](/learn/patterns).
