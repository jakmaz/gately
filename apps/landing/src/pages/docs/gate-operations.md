---
layout: ../../layouts/DocsLayout.astro
title: Basic Gate Operations
description: Learn the programmatic differences of how logic gates evaluate inputs and handle active states.
---

## Event-Driven Updates

Unlike static circuit diagrams, Gately simulates exactly like physical hardware. When you modify an input node, the signal propagates instantaneously through the wires. 

Basic gate operations rely on a Boolean framework:
- A signal is either `High` (represented as **1** or brightly lit green).
- A signal is either `Low` (represented as **0** or dark gray).

## Propagation Delay

In the real world, electricity takes microscopic amounts of time to travel through logic gates. Gately accurately simulates this **propagation delay**. 

If you run incredibly complex logic chains or create feedback loops (where the output of a gate wires back into its own input), you might observe the signals visibly "racing" across the wires. This makes debugging oscillating circuits highly intuitive.

## Visual Feedback

You can always tell what a gate is actively operating on via its **pin colors**.
- A glowing green input pin means that specific entry point is receiving a High signal.
- The body of the logic gate pulses when it evaluates an output state change.
- Wires animate signal flow directionally from left to right.
