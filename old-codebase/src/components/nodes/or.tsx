"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

function getORGeometry(): GateGeometry {
  const tipX = W - 10;
  return {
    bodyPath: `M10 4 C28 4, ${tipX - 6} ${H * 0.18}, ${tipX} ${H / 2} C${tipX - 6} ${H * 0.82}, 28 ${H - 4}, 10 ${H - 4} Q21 ${H / 2}, 10 4 Z`,
    outputX: tipX,
    outputY: H / 2,
    inputPinX: 13,
  };
}

export const ORGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getORGeometry();

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="OR"
      symbol="≥1"
      inputHandles={2}
      outputHandles={1}
    />
  );
});

ORGateNode.displayName = "ORGateNode";
