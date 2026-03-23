---
layout: ../../layouts/DocsLayout.astro
title: Creating Your First Circuit
description: Learn how to assemble and simulate a simple digital logic circuit in Gately.
---

## Overview

Welcome to Gately! In this tutorial, we will construct our very first logic circuit: a simple mechanism to turn on a light bulb when two inputs are active simultaneously. This will intimately introduce you to the core interface and workflow of our visual editor.

## Step 1: Add Input Switches

Input elements allow you to feed binary data (`0` or `1`) into your circuit.
1. Open the **Tools Palette** located on the left side of the editor.
2. Drag and drop two **Toggle Nodes** onto your canvas.
3. Click the labels on these nodes to rename them `Input A` and `Input B`.

## Step 2: Place an AND Gate

An `AND` gate only outputs a high signal (`1`) if absolutely all of its connected inputs are high.
1. Return to the **Tools Palette**.
2. Locate the **Logic Gates** category.
3. Drag and drop the **AND Gate** into the middle of your canvas, slightly to the right of your inputs.

## Step 3: Wire it Together

Wiring connects the output of one node to the input of another, transferring logic signals in real-time.
- Click and drag directly from the right-side glowing circle (output handle) of `Input A` to the top-left circle (input handle) of the `AND Gate`. 
- Repeat the process to wire `Input B` to the bottom-left handle of the `AND Gate`.

## Step 4: Add an Output Display

To observe our circuit's final output, we require an output node.
1. Drag an **Output Node** onto the canvas, placing it to the far right.
2. Connect the output of your `AND Gate` to the input of this `Output Node`.

## Running the Simulation

Gately is entirely event-driven, which means your circuit is *already* simulating! 

Click the **Toggle Nodes** to switch their binary states between `0` and `1`. Notice how the wires glow brilliantly in green or pulse indicating data flow. When both inputs are turned ON, the `AND` gate activates, and your Output Node will light up! 

Congratulations, you've just built your very first digital logic circuit! 🚀
