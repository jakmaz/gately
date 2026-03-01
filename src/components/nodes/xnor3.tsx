"use client";

import { memo } from "react";
import { LogicGateProps } from "@/lib/types";
import { BaseGateNode } from "./base";

export const XNOR3GateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return (
    <BaseGateNode
      id={id}
      data={data}
      isConnectable={isConnectable}
      label="XNOR3"
      symbol="3:1"
      inputHandles={3}
      outputHandles={1}
      variant="xnor"
    />
  );
});

XNOR3GateNode.displayName = "XNOR3GateNode";
