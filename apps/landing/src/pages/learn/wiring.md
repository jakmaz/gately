---
layout: ../../layouts/DocsLayout.astro
title: Wiring and connections
description: Connect inputs to gates and follow the result through your circuit.
---

## Connect two components

Drag from an output handle to an input handle on another component. Output handles are usually on the right; input handles are on the left.

For a two-input gate, connect each switch to a different input handle. One output can feed more than one gate.

## Connection styles

Open **Settings**, then **Connections**, to choose **Straight**, **Curved**, or **Step** wires.

These options change the way connections are drawn. They do not change the circuit's logic or automatically route around other components.

## Remove a connection

Select a wire and press **Backspace**. You can also use a component's context menu to disconnect its connections.

Deleting a wire recalculates the affected circuit. An input without a connection is evaluated as `0`.

## Check your wiring

If the result is unexpected:

- Follow each wire from its source to its destination.
- Check that a two-input gate receives both inputs.
- Check which output you are observing.
- Try the input combinations in the gate's truth table.
