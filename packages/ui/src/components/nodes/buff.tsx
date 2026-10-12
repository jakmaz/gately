"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, type LogicGateProps } from "./base/index";

export const BUFF_GEOMETRY: GateGeometry = {
  bodyPath: "M16 12L68 40L16 68Z",
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
      id: "output-0",
      kind: "output",
      index: 0,
      side: "right",
      x: 80,
      y: 40,
      bodyX: 68,
      bodyY: 40,
    },
  ],
};

export const BUFFGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => (
  <GateRenderer id={id} data={data} isConnectable={isConnectable} geometry={BUFF_GEOMETRY} label="BUFFER" />
));

BUFFGateNode.displayName = "BUFFGateNode";
