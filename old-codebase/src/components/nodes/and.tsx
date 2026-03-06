"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

function getANDGeometry(): GateGeometry {
  return {
    bodyPath: `M10 4 L${W / 2 - 4} 4 A${H / 2 - 4} ${H / 2 - 4} 0 0 1 ${W / 2 - 4} ${H - 4} L10 ${H - 4} Z`,
    outputX: W - 14,
    outputY: H / 2,
    inputPinX: 10,
  };
}

export const ANDGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const geometry = getANDGeometry();

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={geometry}
      label="AND"
      symbol="&"
      inputHandles={2}
      outputHandles={1}
    />
  );
});

ANDGateNode.displayName = "ANDGateNode";
