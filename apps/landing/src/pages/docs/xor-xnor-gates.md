---
layout: ../../layouts/DocsLayout.astro
title: XOR and XNOR Gates
description: Learn how exclusive logic routing behaves, the cornerstone of modern cryptography and arithmetic.
---

## Exclusive Logic

Standard basic gates don't care if both inputs are active at once (e.g. an OR gate triggers on `1 and 1`). Exclusive logic gates are significantly stricter. They are highly specialized tools designed specifically to detect inequality or absolute equality.

### The XOR Gate (Exclusive OR)

The **XOR gate** outputs `1` if the inputs are **different** from each other.
* **Symbol:** Looks identical to an OR gate, but featuring a secondary curved "shield" slicing across the back inputs.
* **Truth behavior:** It detects imbalance. If you feed it a `1` and a `0`, it outputs `1`. If you feed it matching inputs (like `1` and `1`, or `0` and `0`), it strictly outputs `0`. 
* **Use Case:** XOR is the heart of Binary Addition. It perfectly mimics adding `1 + 1` producing a `0` (with a carry logic out).

### The XNOR Gate (Exclusive NOR)

The **XNOR gate** (Equivalence gate) outputs `1` if the inputs are precisely **identical**.
* **Symbol:** An XOR gate with an inversion bubble at the output tip.
* **Truth behavior:** It functions as a digital equality checker. If input A is exactly the same as input B, the gate lights up green (`1`). If there is a mismatch, it outputs `0`.
