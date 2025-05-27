"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Switch } from "@/components/ui/switch";
import { LogicGateProps } from "@/lib/types";

export const InputNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  return (
    <div className="bg-card p-3 rounded-md border-2 shadow-md flex flex-col items-center min-w-[100px] transition-all duration-300"
      style={{ borderColor: data.state ? '#10b981' : '#ef4444' }}>
      <div className="text-lg font-bold mb-2">Input</div>

      <Switch
        checked={data.state}
        id={`input-switch-${id}`}
        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
      />

      <div className="mt-2 text-sm font-mono">
        {data.state ? '1' : '0'}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: data.state ? '#10b981' : '#ef4444' }}
        isConnectable={isConnectable}
      />
    </div>
  );
});

InputNode.displayName = "InputNode";
