"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, type LogicGateProps } from "./base/index";

export const XOR_GEOMETRY: GateGeometry = {
  bodyPath: "M22 12C40 12 54 25 62 35Q66 40 62 45C54 55 40 68 22 68Q16 68 19 62Q30 40 19 18Q16 12 22 12Z",
  extraPath: "M6 12Q22 40 6 68",
  ports: [
    {
      id: "input-0",
      kind: "input",
      index: 0,
      side: "left",
      x: 0,
      y: 20,
      bodyX: 28,
      bodyY: 20,
    },
    {
      id: "input-1",
      kind: "input",
      index: 1,
      side: "left",
      x: 0,
      y: 60,
      bodyX: 28,
      bodyY: 60,
    },
    {
      id: "output-0",
      kind: "output",
      index: 0,
      side: "right",
      x: 80,
      y: 40,
      bodyX: 64,
      bodyY: 40,
    },
  ],
};

export const XORGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => (
  <GateRenderer id={id} data={data} isConnectable={isConnectable} geometry={XOR_GEOMETRY} label="XOR" />
));

XORGateNode.displayName = "XORGateNode";
