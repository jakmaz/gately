"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

const HA_W = W;
const HA_H = H;
const PAD  = 10;
const RX   = 5;

function rrPath(x: number, y: number, w: number, h: number, r: number) {
  return [
    `M${x + r} ${y}`,
    `L${x + w - r} ${y}`,     `Q${x + w} ${y}     ${x + w} ${y + r}`,
    `L${x + w} ${y + h - r}`, `Q${x + w} ${y + h} ${x + w - r} ${y + h}`,
    `L${x + r} ${y + h}`,     `Q${x}     ${y + h} ${x}     ${y + h - r}`,
    `L${x}     ${y + r}`,     `Q${x}     ${y}     ${x + r} ${y}`,
    "Z",
  ].join(" ");
}

const HA_INPUT_YS  = [HA_H * 0.35, HA_H * 0.65];
const HA_OUTPUT_YS = [HA_H * 0.35, HA_H * 0.65];

function getHalfAdderGeometry(activeColor: string): GateGeometry {
  return {
    bodyPath: rrPath(PAD, 4, HA_W - PAD * 2, HA_H - 8, RX),
    outputX:   HA_W - PAD,
    outputY:   HA_H / 2,
    inputPinX: PAD,
    inputYOverrides:  HA_INPUT_YS,
    outputYOverrides: HA_OUTPUT_YS,
    svgContent: (
      <>
        <text x={HA_W / 2} y={HA_H * 0.14} textAnchor="middle"
          fontSize="5.5" fontFamily="monospace" fontWeight="700"
          letterSpacing="0.12em" fill={activeColor} opacity="0.3">1-BIT</text>

        <text x={HA_W / 2} y={HA_H * 0.91} textAnchor="middle"
          fontSize="5.5" fontFamily="monospace" fontWeight="700"
          letterSpacing="0.12em" fill={activeColor} opacity="0.3">HA</text>

        <text x={PAD + 4} y={HA_INPUT_YS[0] + 3.5}
          fontSize="7" fontFamily="monospace" fontWeight="700"
          fill={activeColor} opacity="0.55">A</text>
        <text x={PAD + 4} y={HA_INPUT_YS[1] + 3.5}
          fontSize="7" fontFamily="monospace" fontWeight="700"
          fill={activeColor} opacity="0.55">B</text>

        <text x={HA_W - PAD - 4} y={HA_OUTPUT_YS[0] + 3.5}
          fontSize="7" fontFamily="monospace" fontWeight="700"
          textAnchor="end" fill={activeColor} opacity="0.55">S</text>
        <text x={HA_W - PAD - 4} y={HA_OUTPUT_YS[1] + 3.5}
          fontSize="7" fontFamily="monospace" fontWeight="700"
          textAnchor="end" fill={activeColor} opacity="0.55">C</text>
      </>
    ),
  };
}

export const HalfAdderNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const activeColor = data.preview
    ? "var(--color-foreground)"
    : data.state
    ? "var(--color-success)"
    : "var(--color-primary)";

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={getHalfAdderGeometry(activeColor)}
      label="HALF ADDER"
      symbol="HA"
      inputHandles={2}
      outputHandles={2}
      width={HA_W}
      height={HA_H}
    />
  );
});

HalfAdderNode.displayName = "HalfAdderNode";