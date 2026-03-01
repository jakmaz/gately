"use client";

import { memo } from "react";
import { LogicGateProps } from "@/lib/types";
import { BaseGateNode } from "./base";

export const DMUXGateNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return (
    <BaseGateNode
      id={id}
      data={data}
      isConnectable={isConnectable}
      label="DMUX"
      symbol="1:2"
      inputHandles={2}
      outputHandles={2}
      variant="dmux"
    />
  );
});

DMUXGateNode.displayName = "DMUXGateNode";
