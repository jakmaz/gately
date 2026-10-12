"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, type LogicGateProps } from "./base/index";

export const NOR_GEOMETRY: GateGeometry = {
  bodyPath: "M18 12C38 12 54 25 62 35Q66 40 62 45C54 55 38 68 18 68Q12 68 15 62Q26 40 15 18Q12 12 18 12Z",
  bubble: {
    cx: 68,
    cy: 40,
    r: 4,
  },
  ports: [
    {
      id: "input-0",
      kind: "input",
      index: 0,
      side: "left",
      x: 0,
      y: 20,
      bodyX: 24,
      bodyY: 20,
    },
    {
      id: "input-1",
      kind: "input",
      index: 1,
      side: "left",
      x: 0,
      y: 60,
      bodyX: 24,
      bodyY: 60,
    },
    {
      id: "output-0",
      kind: "output",
      index: 0,
      side: "right",
      x: 80,
      y: 40,
      bodyX: 72,
      bodyY: 40,
    },
  ],
};

export const NORGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => (
  <GateRenderer id={id} data={data} isConnectable={isConnectable} geometry={NOR_GEOMETRY} label="NOR" />
));

NORGateNode.displayName = "NORGateNode";
