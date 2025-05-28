"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { LogicGateProps } from "@/lib/types";

export const OutputNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const stateColor = data.state ? "green-500" : "primary";

  return (
    <div
      className={`bg-card p-3 rounded-md border-2 shadow-md flex flex-col items-center min-w-[100px] transition-all duration-300 border-${stateColor}`}
    >
      <div className="text-lg font-bold mb-2">Output</div>

      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-${stateColor}`}
      >
        {data.state ? '1' : '0'}
      </div>

      <div className="mt-2 text-sm opacity-75">
        {data.state ? 'HIGH' : 'LOW'}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="!bg-blue-500"
        isConnectable={isConnectable}
      />
    </div>
  );
});

OutputNode.displayName = "OutputNode";
