"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

function getNOTGeometry(): GateGeometry {
  const bubR = 5;
  const tipX = W - 18;
  return {
    bodyPath: `M10 4 L${tipX} ${H / 2} L10 ${H - 4} Z`,
    bubble: { cx: tipX + bubR, cy: H / 2, r: bubR },
    outputX: tipX + bubR * 2,
    outputY: H / 2,
    inputPinX: 10,
  };
}

export const NOTGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getNOTGeometry();

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="NOT"
      symbol="¬"
      inputHandles={1}
      outputHandles={1}
    />
  );
});

NOTGateNode.displayName = "NOTGateNode";
