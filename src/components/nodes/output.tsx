"use client";

import { memo } from "react";
import type { LogicGateProps } from "@/lib/types";
import { InputHandle } from "./base/gate-handle";

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
        <InputHandle index={0} state={data.state} y={H / 2} customId="input" isConnectable={isConnectable} />
      )}
    </div>
  );
});

OutputNode.displayName = "OutputNode";
