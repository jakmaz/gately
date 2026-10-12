"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, type LogicGateProps } from "./base/index";

export const OR_GEOMETRY: GateGeometry = {
  bodyPath: "M12 12C34 12 56 20 64 40C56 60 34 68 12 68Q28 40 12 12Z",
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
      bodyX: 64,
      bodyY: 40,
    },
  ],
};

export const ORGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => (
  <GateRenderer id={id} data={data} isConnectable={isConnectable} geometry={OR_GEOMETRY} label="OR" />
));

ORGateNode.displayName = "ORGateNode";
