---
layout: ../../layouts/DocsLayout.astro
title: Build a Half Adder
description: Combine fundamental gates to perform your absolute first arithmetic logic.
---

## The Arithmetic Threshold

Computers process logic using gates, but they perform math using Adders. A Half Adder fundamentally adds two separate 1-bit binary inputs (`A` and `B`) producing a total `Sum` bit, and if it exceeds 1, pushing out a `Carry` bit.

### The Component List
You literally only need two logic gates for this:
- **1x XOR Gate**
- **1x AND Gate**
- 2x Input Switches (A, B)
- 2x Output LEDs (Sum, Carry)

### Schematic Assembly
1. Connect Input `A` to the first pin of the **XOR Gate**.
2. Connect Input `B` to the second pin of the **XOR Gate**.
3. Now, uniquely, drag *another* wire from Input `A` and connect it simultaneously to the first pin of the **AND Gate**! (Nodes can split signals infinitely).
4. Do the same for Input `B`, sending a duplicate signal to the second pin of the **AND Gate**.

### Execution
Wire the output of the XOR gate to your `Sum` LED. Wire the output of the AND gate to your `Carry` LED.

**Result:**
Turn Input A to `1`. The Output Sum is `1`.
Turn BOTH Input A and B to `1`. The Sum violently turns to `0`, but your AND Gate activates, pushing out the `Carry` indicator!
You just proved `1 + 1 = 2` mathematically inside a visually rendered physics circuit!
