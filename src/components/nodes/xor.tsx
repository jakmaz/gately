"use client";

import { memo } from "react";
import { LogicGateProps } from "@/lib/types";
import { BaseGateNode } from "./base";

export const XORGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return (
    <BaseGateNode
      id={id}
      data={data}
      isConnectable={isConnectable}
      label="XOR"
      symbol="=1"
      inputHandles={2}
      outputHandles={1}
    />
  );
});

XORGateNode.displayName = "XORGateNode";
