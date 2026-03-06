"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

function getNANDGeometry(): GateGeometry {
  const bubR = 5;
  const bodyOutX = W - 14;
  return {
    bodyPath: `M10 4 L${W / 2 - 4} 4 A${H / 2 - 4} ${H / 2 - 4} 0 0 1 ${W / 2 - 4} ${H - 4} L10 ${H - 4} Z`,
    bubble: { cx: bodyOutX + bubR, cy: H / 2, r: bubR },
    outputX: bodyOutX + bubR * 2,
    outputY: H / 2,
    inputPinX: 10,
  };
}

export const NANDGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getNANDGeometry();

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="NAND"
      symbol="&̅"
      inputHandles={2}
      outputHandles={1}
    />
  );
});

NANDGateNode.displayName = "NANDGateNode";
