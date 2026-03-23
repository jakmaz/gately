---
layout: ../../layouts/DocsLayout.astro
title: Create a Full Adder
description: Expand standard addition by accepting carry-overs from previous computational columns.
---

## Processing Carries

A Half Adder adds two numbers beautifully, but it functionally breaks if you try to chain them together because it absolutely ignores 'Carry bits' spilling over from the previous mathematical column!

A **Full Adder** effectively addresses this by accepting *three* distinct inputs: `A`, `B`, and `Carry In`.

### The Component Checklist
- **2x XOR Gates**
- **2x AND Gates**
- **1x OR Gate**

### Building Blocks

Instead of wiring everything randomly, think modularly! A Full Adder is effectively just two Half Adders smashed together, bridged by a single OR Gate.

1. Construct a Half adder manipulating Inputs A and B. It produces a preliminary `Sum_1` and `Carry_1`.
2. Push `Sum_1` and your brand new `Carry In` signal into the second Half adder. 
3. This final phase produces your ultimate actual `SUM`.
4. Lastly, wire the `Carry_1` and `Carry_2` lines concurrently into the absolute final OR gate. This single OR gate routes your final, overarching `CARRY OUT`.

By sequentially linking multiple Full Adders in a row (Outputting a Carry directly into the Input Carry of the next module), you essentially construct a mathematical **Ripple Carry Processor** allowing you to rapidly compute arbitrarily large digits like `1011 + 0101`!
