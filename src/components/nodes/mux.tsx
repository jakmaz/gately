"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

function getMUXGeometry(): GateGeometry {
  return {
    bodyPath: `M10 8 L${W - 10} 16 L${W - 10} ${H - 16} L10 ${H - 8} Z`,
    outputX: W - 10,
    outputY: H / 2,
    inputPinX: 10,
    inputYOverrides: [H * 0.28, H * 0.72, null],
  };
}

export const MUXGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getMUXGeometry();

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="MUX"
      symbol="2:1"
      inputHandles={3}
      outputHandles={1}
    />
  );
});

MUXGateNode.displayName = "MUXGateNode";
