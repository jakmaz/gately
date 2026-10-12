"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, type LogicGateProps } from "./base/index";

export const XNOR_GEOMETRY: GateGeometry = {
  bodyPath: "M16 12C38 12 56 20 64 40C56 60 38 68 16 68Q32 40 16 12Z",
  extraPath: "M6 12Q22 40 6 68",
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
      bodyX: 72,
      bodyY: 40,
    },
  ],
};

export const XNORGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => (
  <GateRenderer id={id} data={data} isConnectable={isConnectable} geometry={XNOR_GEOMETRY} label="XNOR" />
));

XNORGateNode.displayName = "XNORGateNode";
