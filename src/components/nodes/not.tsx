"use client";

import { memo } from "react";
import { LogicGateProps } from "@/lib/types";
import { BaseGateNode } from "./base";

export const NOTGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return (
    <BaseGateNode
      id={id}
      data={data}
      isConnectable={isConnectable}
      label="NOT"
      symbol="¬"
      inputHandles={1}
      outputHandles={1}
      variant="not"
    />
  );
});

NOTGateNode.displayName = "NOTGateNode";
