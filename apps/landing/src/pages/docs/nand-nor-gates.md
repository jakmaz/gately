---
layout: ../../layouts/DocsLayout.astro
title: NAND and NOR Gates
description: Understand inverted universal logic gates and how they can build any digital system.
---

## The Power of Universal Gates

Did you know that you can build literally *any* logic circuit in existence using nothing but NAND gates? This is called universal logic. 

NAND and NOR gates are simply their base counterparts (AND / OR) permanently fused with an integrated NOT inverter on their output.

### The NAND Gate

The **NAND gate** (NOT-AND) acts precisely opposite to an AND gate. It evaluates to true unless **both** of its inputs are true.
* **Symbol:** An AND gate structure, but capped with an inversion "bubble" at the output tip.
* **Truth behavior:** If you wire two High (`1`) inputs into a NAND gate, you get a `0`. Any other combination (`0 and 0`, `0 and 1`) outputs a `1`.

### The NOR Gate

The **NOR gate** (NOT-OR) evaluates to true if and only if **both** inputs are false.
* **Symbol:** An OR gate shield shape, capped with an inversion bubble.
* **Truth behavior:** Think of it as a complete blocker. The exact moment *any* single input turns `1`, the entire NOR gate violently shuts down and outputs `0`. It only outputs `1` when utterly undisturbed (`0 and 0`).
