"use client";

import { memo } from "react";
import { LogicGateProps } from "@/lib/types";
import { BaseGateNode } from "./base";

export const NANDGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return (
    <BaseGateNode
      id={id}
      data={data}
      isConnectable={isConnectable}
      label="NAND"
      symbol="&̅"
      inputHandles={2}
      outputHandles={1}
    />
  );
});

NANDGateNode.displayName = "NANDGateNode";
