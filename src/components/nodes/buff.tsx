"use client";

import { memo } from "react";
import { LogicGateProps } from "@/lib/types";
import { BaseGateNode } from "./base";

export const BUFFGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return (
    <BaseGateNode
      id={id}
      data={data}
      isConnectable={isConnectable}
      label="BUFF"
      symbol="BUF(A)"
      inputHandles={1}
      outputHandles={1}
      variant="buff"
    />
  );
});

BUFFGateNode.displayName = "BUFFGateNode";
