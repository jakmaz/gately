"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, type LogicGateProps } from "./base/index";

export const DMUX_GEOMETRY: GateGeometry = {
  bodyPath: "M16 30Q16 24 22 22.5L58 13.5Q64 12 64 18V62Q64 68 58 66.5L22 57.5Q16 56 16 50Z",
  ports: [
    {
      id: "input-0",
      kind: "input",
      index: 0,
      side: "left",
      x: 0,
      y: 40,
      bodyX: 16,
      bodyY: 40,
    },
    {
      id: "input-1",
      kind: "input",
      index: 1,
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
      y: 20,
      bodyX: 64,
      bodyY: 20,
    },
    {
      id: "output-1",
      kind: "output",
      index: 1,
      side: "right",
      x: 80,
      y: 60,
      bodyX: 64,
      bodyY: 60,
    },
  ],
};

export const DMUXGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => (
  <GateRenderer id={id} data={data} isConnectable={isConnectable} geometry={DMUX_GEOMETRY} label="DMUX" />
));

DMUXGateNode.displayName = "DMUXGateNode";
