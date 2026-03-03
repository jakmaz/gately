"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Switch } from "@/components/ui/switch";
import type { LogicGateProps } from "@/lib/types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";

const W = 80;
const H = 60;
const HANDLE_SIZE = 8;
const hs = HANDLE_SIZE / 2;

export const InputNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const activeColor = data.preview
    ? "var(--color-foreground)"
    : data.state
      ? "var(--color-success)"
      : "var(--color-primary)";
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
            I1
          </div>

          <Switch
            checked={data.state}
            id={`input-switch-${id}`}
            className="scale-75 data-[state=checked]:bg-success data-[state=unchecked]:bg-primary"
          />

          {!data.preview && (
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
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rename</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
});

InputNode.displayName = "InputNode";
