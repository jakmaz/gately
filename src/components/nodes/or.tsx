"use client";

import { memo } from "react";
import { LogicGateProps } from "@/lib/types";
import { BaseGateNode } from "./base";

export const ORGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return (
    <BaseGateNode
      id={id}
      data={data}
      isConnectable={isConnectable}
      label="OR"
      symbol="≥1"
      inputHandles={2}
      outputHandles={1}
    />
  );
});

ORGateNode.displayName = "ORGateNode";
