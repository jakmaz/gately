"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { LogicGateProps } from "@/lib/types";

const W = 80;
const H = 60;
const HANDLE_SIZE = 8;
const hs = HANDLE_SIZE / 2;

export const OutputNode = memo(({ data, isConnectable }: LogicGateProps) => {
  const activeColor = data.state ? "#22c55e" : "#6366f1";
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
      <div
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: activeColor }}
      >
        OUT
      </div>
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs"
        style={{
          background: activeColor,
          color: bgColor,
          boxShadow: data.state ? `0 0 8px #22c55e80` : "none",
        }}
      >
        {data.state ? "1" : "0"}
      </div>

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
    </div>
  );
});

OutputNode.displayName = "OutputNode";