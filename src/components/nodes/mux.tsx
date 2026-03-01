"use client";

import { memo } from "react";
import { LogicGateProps } from "@/lib/types";
import { BaseGateNode } from "./base";

export const MUXGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return (
    <BaseGateNode
      id={id}
      data={data}
      isConnectable={isConnectable}
      label="MUX"
      symbol="2:1"
      inputHandles={3}
      outputHandles={1}
    />
  );
});

MUXGateNode.displayName = "MUXGateNode";
