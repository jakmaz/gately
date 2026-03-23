---
layout: ../../layouts/DocsLayout.astro
title: Design a Multiplexer
description: Build a digital traffic director to route multiple incoming signals safely down a single bus.
---

## What is a Multiplexer (MUX)?

A multiplexer is effectively a highly complex digital train switch track. Imagine having four different data streams (like four separate video feeds), but you only own a single output wire to your television. 
You strictly need a mechanism allowing you to specify exactly *which* feed passes through the output wire while ignoring the others. This is a MUX!

### Implementing a 2-to-1 MUX

A baseline 2-to-1 multiplexer selects specifically between exactly two input streams (`Input 0` and `Input 1`) based fundamentally on a single `Selector` toggle.

**Components needed:**
- **1x NOT Gate**
- **2x AND Gates**
- **1x OR Gate**

**Wiring Logic:**
1. Connect `Input 0` to AND Gate 1.
2. Connect `Input 1` to AND Gate 2.
3. Wire your `Selector` directly to AND Gate 2, but route a split version *through* the NOT Gate into AND Gate 1.
4. Route both AND outputs explicitly into the ultimate OR Gate.

If your selector is `0`, only `Input 0` flows through the OR gate. Flip the selector to `1`, and the traffic entirely switches to evaluating `Input 1`! MUX components literally run the entirety of internet data switching networks worldwide!
