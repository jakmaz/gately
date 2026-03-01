"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

function getDMUXGeometry(): GateGeometry {
  return {
    bodyPath: `M10 8 L${W - 10} 16 L${W - 10} ${H - 16} L10 ${H - 8} Z`,
    outputX: W - 10,
    outputY: H / 2,
    inputPinX: 10,
    inputYOverrides: [H * 0.35, null],
  };
}

export const DMUXGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getDMUXGeometry();

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="DMUX"
      symbol="1:2"
      inputHandles={2}
      outputHandles={2}
    />
  );
});

DMUXGateNode.displayName = "DMUXGateNode";
