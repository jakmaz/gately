"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

function getNORGeometry(): GateGeometry {
  const bubR = 5;
  const tipX = W - 10;
  return {
    bodyPath: `M10 4 C28 4, ${tipX - 6} ${H * 0.18}, ${tipX} ${H / 2} C${tipX - 6} ${H * 0.82}, 28 ${H - 4}, 10 ${H - 4} Q21 ${H / 2}, 10 4 Z`,
    bubble: { cx: tipX + bubR, cy: H / 2, r: bubR },
    outputX: tipX + bubR * 2,
    outputY: H / 2,
    inputPinX: 13,
  };
}

export const NORGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getNORGeometry();

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="NOR"
      symbol="≥̅1"
      inputHandles={2}
      outputHandles={1}
    />
  );
});

NORGateNode.displayName = "NORGateNode";
