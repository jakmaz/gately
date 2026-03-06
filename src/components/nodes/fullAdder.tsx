"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, H, type LogicGateProps, W } from "./base/index";

const FA_W = W;
const FA_H = Math.round(H * 1.5);
const PAD = 10;
const RX = 5;

function rrPath(x: number, y: number, w: number, h: number, r: number) {
  return [
    `M${x + r} ${y}`,
    `L${x + w - r} ${y}`,
    `Q${x + w} ${y}     ${x + w} ${y + r}`,
    `L${x + w} ${y + h - r}`,
    `Q${x + w} ${y + h} ${x + w - r} ${y + h}`,
    `L${x + r} ${y + h}`,
    `Q${x}     ${y + h} ${x}     ${y + h - r}`,
    `L${x}     ${y + r}`,
    `Q${x}     ${y}     ${x + r} ${y}`,
    "Z",
  ].join(" ");
}

const FA_INPUT_YS = [FA_H * 0.25, FA_H * 0.5, FA_H * 0.75];
const FA_OUTPUT_YS = [FA_H * 0.37, FA_H * 0.63];

function getFullAdderGeometry(activeColor: string): GateGeometry {
  return {
    bodyPath: rrPath(PAD, 4, FA_W - PAD * 2, FA_H - 8, RX),
    outputX: FA_W - PAD,
    outputY: FA_H / 2,
    inputPinX: PAD,
    inputYOverrides: FA_INPUT_YS,
    outputYOverrides: FA_OUTPUT_YS,
    svgContent: (
      <>
        {/* subtle dividers */}
        <line
          x1={PAD + 4}
          y1={FA_H * 0.15}
          x2={FA_W - PAD - 4}
          y2={FA_H * 0.15}
          stroke={activeColor}
          strokeWidth="0.75"
          opacity="0.12"
        />
        <line
          x1={PAD + 4}
          y1={FA_H * 0.85}
          x2={FA_W - PAD - 4}
          y2={FA_H * 0.85}
          stroke={activeColor}
          strokeWidth="0.75"
          opacity="0.12"
        />

        <text
          x={FA_W / 2}
          y={FA_H * 0.1}
          textAnchor="middle"
          fontSize="5.5"
          fontFamily="monospace"
          fontWeight="700"
          letterSpacing="0.12em"
          fill={activeColor}
          opacity="0.3"
        >
          1-BIT
        </text>

        <text
          x={FA_W / 2}
          y={FA_H * 0.93}
          textAnchor="middle"
          fontSize="5.5"
          fontFamily="monospace"
          fontWeight="700"
          letterSpacing="0.12em"
          fill={activeColor}
          opacity="0.3"
        >
          FA
        </text>

        <text
          x={PAD + 4}
          y={FA_INPUT_YS[0] + 3.5}
          fontSize="7"
          fontFamily="monospace"
          fontWeight="700"
          fill={activeColor}
          opacity="0.55"
        >
          A
        </text>
        <text
          x={PAD + 4}
          y={FA_INPUT_YS[1] + 3.5}
          fontSize="7"
          fontFamily="monospace"
          fontWeight="700"
          fill={activeColor}
          opacity="0.55"
        >
          B
        </text>
        <text
          x={PAD + 4}
          y={FA_INPUT_YS[2] + 3.5}
          fontSize="7"
          fontFamily="monospace"
          fontWeight="700"
          fill={activeColor}
          opacity="0.55"
        >
          Cin
        </text>

        <text
          x={FA_W - PAD - 4}
          y={FA_OUTPUT_YS[0] + 3.5}
          fontSize="7"
          fontFamily="monospace"
          fontWeight="700"
          textAnchor="end"
          fill={activeColor}
          opacity="0.55"
        >
          S
        </text>
        <text
          x={FA_W - PAD - 4}
          y={FA_OUTPUT_YS[1] + 3.5}
          fontSize="7"
          fontFamily="monospace"
          fontWeight="700"
          textAnchor="end"
          fill={activeColor}
          opacity="0.55"
        >
          Co
        </text>
      </>
    ),
  };
}

export const FullAdderNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
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
      geometry={getFullAdderGeometry(activeColor)}
      label="FULL ADDER"
      symbol="FA"
      inputHandles={3}
      outputHandles={2}
      width={FA_W}
      height={FA_H}
    />
  );
});

FullAdderNode.displayName = "FullAdderNode";
