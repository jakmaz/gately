"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, type LogicGateProps } from "./base/index";

export const OUTPUT_GEOMETRY: GateGeometry = {
  bodyPath: "M18 12H62Q68 12 68 18V62Q68 68 62 68H18Q12 68 12 62V18Q12 12 18 12Z",
  terminal: "output",
  ports: [{ id: "input", kind: "input", index: 0, side: "left", x: 0, y: 40, bodyX: 12, bodyY: 40 }],
};

export const OutputNode = memo(({ id, data, isConnectable }: LogicGateProps) => (
  <GateRenderer id={id} data={data} isConnectable={isConnectable} geometry={OUTPUT_GEOMETRY} label="Output" />
));

OutputNode.displayName = "OutputNode";
