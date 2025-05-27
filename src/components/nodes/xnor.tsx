"use client";

import { memo } from "react";
import { LogicGateProps } from "@/lib/types";
import { BaseGateNode } from "./base";

export const XNORGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return (
    <BaseGateNode
      id={id}
      data={data}
      isConnectable={isConnectable}
      label="XNOR"
      symbol="=̅1"
      inputHandles={2}
      outputHandles={1}
    />
  );
});

XNORGateNode.displayName = "XNORGateNode";
