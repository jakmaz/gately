"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, type LogicGateProps } from "./base/index";

export const MUX_GEOMETRY: GateGeometry = {
  bodyPath: "M16 18Q16 12 22 13.5L58 22.5Q64 24 64 30V50Q64 56 58 57.5L22 66.5Q16 68 16 62Z",
  ports: [
    {
      id: "input-0",
      kind: "input",
      index: 0,
      side: "left",
      x: 0,
      y: 20,
      bodyX: 16,
      bodyY: 20,
    },
    {
      id: "input-1",
      kind: "input",
      index: 1,
      side: "left",
      x: 0,
      y: 60,
      bodyX: 16,
      bodyY: 60,
    },
    {
      id: "input-2",
      kind: "input",
      index: 2,
      side: "bottom",
      x: 40,
      y: 80,
      bodyX: 40,
      bodyY: 62,
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

export const MUXGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => (
  <GateRenderer id={id} data={data} isConnectable={isConnectable} geometry={MUX_GEOMETRY} label="MUX" />
));

MUXGateNode.displayName = "MUXGateNode";
