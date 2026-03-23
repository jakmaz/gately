---
layout: ../../layouts/DocsLayout.astro
title: Complex Circuit Patterns
description: Move beyond basic arithmetic and explore sequential memory logic like latches and flip-flops.
---

## Combinational vs. Sequential Logic 

Everything built in primitive tutorials (Adders, MUXes) evaluates as completely **Combinational Logic**. This strictly means the current physical output depends *exclusively* on the immediate current inputs. If you turn off the inputs, the circuit entirely forgets it calculated anything.

**Sequential Logic** fundamentally breaks this limitation.

## The SR Latch (Memory)

A Set/Reset (SR) Latch is the absolute smallest unit of digital memory. It actively remembers its physical state.

To construct an SR Latch:
Take two massive **NOR gates** and aggressively route the unique physical output of NOR 1 entirely backwards into the input of NOR 2. In conjunction, simultaneously route the physical output of NOR 2 forcefully backwards into the input of NOR 1. 

By strategically creating this cross-coupled massive structural paradox loop, the system physically traps a High (`1`) signal endlessly circling the gates. 
- Pulsing the `Set` input forces the state to `1` perpetually.
- Pulsing the `Reset` input actively clears the memory matrix back down to a pure `0`. 

By strapping literally billions of microscopic SR Latches together, humanity engineered Static RAM—the literal memory blocks storing these very words you are actively reading right now!
