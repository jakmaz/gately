"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Switch } from "@/components/ui/switch";
import { LogicGateProps } from "@/lib/types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";

const W = 80;
const H = 60;
const HANDLE_SIZE = 8;
const hs = HANDLE_SIZE / 2;

export const InputNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const activeColor = data.state ? "#22c55e" : "#6366f1";
  const bgColor = "var(--card, #1a1a2e)";

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className="relative rounded-md border-2 flex flex-col items-center justify-center gap-1"
          style={{
            width: W,
            height: H,
            borderColor: activeColor,
            background: bgColor,
            boxShadow: `0 0 8px ${activeColor}40`,
          }}
        >
          <div className="text-xs font-bold tracking-widest uppercase" style={{ color: activeColor }}>
            IN
          </div>

          <Switch
            checked={data.state}
            id={`input-switch-${id}`}
            className="scale-75 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-indigo-500"
          />

          <div className="text-xs font-mono font-bold" style={{ color: activeColor }}>
            {data.state ? "1" : "0"}
          </div>

          <Handle
            type="source"
            position={Position.Right}
            id="output"
            style={{
              top: H / 2 - hs,
              left: W - hs,
              width: HANDLE_SIZE,
              height: HANDLE_SIZE,
              background: activeColor,
              border: `2px solid ${bgColor}`,
              borderRadius: "50%",
              transform: "none",
            }}
            isConnectable={isConnectable}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rename</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
});

InputNode.displayName = "InputNode";
