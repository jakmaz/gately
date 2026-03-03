"use client";

import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import type { LogicGateProps } from "@/lib/types";

const W = 80;
const H = 60;
const HANDLE_SIZE = 8;
const hs = HANDLE_SIZE / 2;

export const OutputNode = memo(({ data, isConnectable }: LogicGateProps) => {
  const activeColor = data.preview
    ? "var(--color-foreground)"
    : data.state
      ? "var(--color-success)"
      : "var(--color-primary)";
  const bgColor = "var(--card, #1a1a2e)";

  return (
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
        Q1
      </div>
      {!data.preview && (
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          style={{
            top: H / 2 - hs,
            left: -hs,
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
  );
});

OutputNode.displayName = "OutputNode";
