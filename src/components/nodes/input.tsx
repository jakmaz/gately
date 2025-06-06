"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Switch } from "@/components/ui/switch";
import { LogicGateProps } from "@/lib/types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";

export const InputNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const stateColor = data.state ? "green-500" : "primary";

  return (
    <ContextMenu>
      <ContextMenuTrigger
        className={`bg-card p-3 rounded-md border-2 shadow-md flex flex-col items-center min-w-[100px] border-${stateColor}`}
      >
        <div className="text-lg font-bold mb-2">Input</div>

        <Switch
          checked={data.state}
          id={`input-switch-${id}`}
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-primary"
        />

        <div className="mt-2 text-sm font-mono">
          {data.state ? "1" : "0"}
        </div>

        <Handle
          type="source"
          position={Position.Right}
          id="output"
          className={`!w-3 !h-3 !border-${stateColor}`}
          isConnectable={isConnectable}
        />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rename</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
});

InputNode.displayName = "InputNode";
