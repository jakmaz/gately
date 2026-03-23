---
layout: ../../layouts/DocsLayout.astro
title: AND, OR, NOT Basic Gates
description: A complete reference guide to the fundamental Boolean logic gates in Gately.
---

## The Foundation of Digital Logic

Every complex digital system on the planet—from calculators to modern smartphones—relies heavily on basic logic gates. Understanding how these elementary components behave is critical to mastering the Gately visual logic editor.

### The AND Gate

The **AND gate** is an operation that evaluates to true if and only if **all** of its inputs are true. 
* **Symbol:** A D-shaped component with straight back and curved front.
* **Truth behavior:** Think of it like a strict bouncer at a club. You need *both* an ID **AND** a ticket to enter. If one is missing, output is `0`.

### The OR Gate

The **OR gate** provides a true output when **at least one** of its inputs is true.
* **Symbol:** A shield-shaped component with a curved back.
* **Truth behavior:** Think of it like a multiple-choice question where choosing *any* correct answer gives you the point. If `Input A` **OR** `Input B` is ON, the output is `1`.

### The NOT Gate (Inverter)

The **NOT gate** simply reverses the input signal. It is the only gate with practically a single input and output.
* **Symbol:** A small triangle pointing right, followed by a slight circular bubble (representing inversion).
* **Truth behavior:** It fundamentally alters reality. If you input `1`, it outputs `0`. If you input `0`, it outputs `1`. 

## Combining Gates

You can assemble these three fundamental primitives to construct **compound gates** (like `NAND`, `XOR`, `XNOR`). For instance, stringing an `AND` gate directly into a `NOT` gate effectively performs the `NAND` operation!

> "In classical computing architectures, all complex logic can ultimately be reduced into interconnected strings of NAND operations."
