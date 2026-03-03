"use client";

import { memo } from "react";
import { Switch } from "@/components/ui/switch";
import type { LogicGateProps } from "@/lib/types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { OutputHandle } from "./base/gate-handle";

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
            <OutputHandle
              index={0}
              state={data.state}
              y={H / 2}
              outputX={W}
              customId="output"
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
