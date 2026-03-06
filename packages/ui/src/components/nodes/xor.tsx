"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

function getXORGeometry(): GateGeometry {
  const tipX = W - 10;
  return {
    bodyPath: `M14 4 C32 4, ${tipX - 6} ${H * 0.18}, ${tipX} ${H / 2} C${tipX - 6} ${H * 0.82}, 32 ${H - 4}, 14 ${H - 4} Q25 ${H / 2}, 14 4 Z`,
    extraPath: `M8 4 Q19 ${H / 2}, 8 ${H - 4}`,
    outputX: tipX,
    outputY: H / 2,
    inputPinX: 15,
  };
}

export const XORGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getXORGeometry();

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="XOR"
      symbol="=1"
      inputHandles={2}
      outputHandles={1}
    />
  );
});

XORGateNode.displayName = "XORGateNode";
