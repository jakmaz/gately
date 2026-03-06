"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

function getBUFFGeometry(): GateGeometry {
  return {
    bodyPath: `M10 4 L${W - 10} ${H / 2} L10 ${H - 4} Z`,
    outputX: W - 10,
    outputY: H / 2,
    inputPinX: 10,
  };
}

export const BUFFGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getBUFFGeometry();

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="BUFF"
      symbol="BUF(A)"
      inputHandles={1}
      outputHandles={1}
    />
  );
});

BUFFGateNode.displayName = "BUFFGateNode";
