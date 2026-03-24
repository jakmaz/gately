---
layout: ../../layouts/DocsLayout.astro
title: Wiring and Connections
description: Master the art of routing signals cleanly across dense architectural canvases.
---

## Drawing Wires

Wiring in Gately is completely organic. You don't need a specific 'wire tool' active at all times. 
Simply hover over any hollow circle (the literal input or output pins of a logic gate). Your cursor will change to a crosshair. Click, drag out the dynamic spline wire, and magnetically drop it onto another available node handle!

### Smart Routing Algorithms

Wires rarely travel in basic straight lines since that results in chaotic diagonal spiderwebs.
Gately natively enforces **Orthogonal Routing** (Bezier steps). The wires automatically pathfind around components by shooting out horizontally, pivoting 90 degrees vertically, and terminating cleanly into the target component. 

### Deleting Connections
To destroy an active wire routing, hover directly over the bold physical line. It will glow red. Press `Backspace` to instantly sever the connection, immediately updating the logic evaluation downstream.
