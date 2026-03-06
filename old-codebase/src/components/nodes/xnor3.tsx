"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

function getXNOR3Geometry(): GateGeometry {
  const bubR = 5;
  const tipX = W - 10;
  return {
    bodyPath: `M14 4 C32 4, ${tipX - 6} ${H * 0.18}, ${tipX} ${H / 2} C${tipX - 6} ${H * 0.82}, 32 ${H - 4}, 14 ${H - 4} Q25 ${H / 2}, 14 4 Z`,
    extraPath: `M8 4 Q19 ${H / 2}, 8 ${H - 4}`,
    bubble: { cx: tipX + bubR, cy: H / 2, r: bubR },
    outputX: tipX + bubR * 2,
    outputY: H / 2,
    inputPinX: 15,
  };
}

export const XNOR3GateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getXNOR3Geometry();

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="XNOR3"
      symbol="3:1"
      inputHandles={3}
      outputHandles={1}
    />
  );
});

XNOR3GateNode.displayName = "XNOR3GateNode";
