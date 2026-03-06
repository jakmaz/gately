/** biome-ignore-all lint/suspicious/noArrayIndexKey: handles are positional */
"use client";

import { Position } from "@xyflow/react";
import { useState } from "react";
import { H, HANDLE_SIZE, hs, W } from "./constants";
import { InputHandle, OutputHandle } from "./gate-handle";
import type { GateRendererProps } from "./types";

export function GateRenderer({
  id,
  data,
  isConnectable,
  geometry,
  label,
  symbol,
  inputHandles = 2,
  outputHandles = 1,
  width: CW = W,
  height: CH = H,
}: GateRendererProps & { width?: number; height?: number }) {
  const [hovered, setHovered] = useState(false);
  const activeColor = data.preview
    ? "var(--color-foreground)"
    : data.state
      ? "var(--color-success)"
      : "var(--color-primary)";
  const bgColor = "var(--card, #1a1a2e)";
  const hasSelectPin = label === "MUX" || label === "DMUX";

  const inputYs: (number | null)[] = Array.from({ length: inputHandles }, (_, i) => {
    if (geometry.inputYOverrides && i < geometry.inputYOverrides.length) return geometry.inputYOverrides[i];
    if (inputHandles === 1) return CH / 2;
    return CH * 0.2 + ((CH * 0.6) / (inputHandles - 1)) * i;
  });
  const selectPinIndex = inputYs.indexOf(null);

  const outputYs = Array.from({ length: outputHandles }, (_, i) => {
    if (geometry.outputYOverrides && i < geometry.outputYOverrides.length) return geometry.outputYOverrides[i]!;
    if (outputHandles === 1) return geometry.outputY;
    return CH * 0.25 + ((CH * 0.5) / (outputHandles - 1)) * i;
  });

  return (
    <div
      className="relative"
      style={{ width: CW, height: CH }}
      onMouseEnter={() => !data.preview && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover tooltip */}
      <div
        style={{
          position: "absolute",
          bottom: CH + 8,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 50,
          opacity: hovered ? 1 : 0,
          translate: hovered ? "0 0" : "0 4px",
          transition: "opacity 150ms ease, translate 150ms ease",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            background: activeColor,
            color: "#0a0a0f",
            fontSize: 10,
            fontWeight: 800,
            fontFamily: "monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 4,
            boxShadow: `0 2px 12px ${activeColor}60`,
          }}
        >
          {label}
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            margin: "0 auto",
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: `5px solid ${activeColor}`,
          }}
        />
      </div>

      {/* Gate SVG or default rendering */}
      {geometry.bodyPath ? (
        <svg
          width={CW}
          height={CH}
          viewBox={`0 0 ${CW} ${CH}`}
          className="absolute top-0 left-0"
          style={{ overflow: "visible" }}
        >
          {/* Input stub wires */}
          {inputYs.map((y, i) =>
            y !== null ? (
              <line
                key={`wire-in-${i}`}
                x1={0}
                y1={y}
                x2={geometry.inputPinX}
                y2={y}
                stroke={activeColor}
                strokeWidth="1.5"
                opacity="0.5"
              />
            ) : null,
          )}

          {/* Select pin stub */}
          {hasSelectPin && (
            <line
              x1={CW / 2}
              y1={CH + hs}
              x2={CW / 2}
              y2={CH - 10}
              stroke={activeColor}
              strokeWidth="1.5"
              opacity="0.5"
            />
          )}

          {/* Output stub wires */}
          {outputYs.map((y, i) => (
            <line
              key={`wire-out-${i}`}
              x1={geometry.outputX}
              y1={y}
              x2={CW}
              y2={y}
              stroke={activeColor}
              strokeWidth="1.5"
              opacity="0.5"
            />
          ))}

          <path d={geometry.bodyPath} fill={bgColor} stroke={activeColor} strokeWidth="2" strokeLinejoin="round" />

          {geometry.extraPath && <path d={geometry.extraPath} fill="none" stroke={activeColor} strokeWidth="2" />}

          {geometry.bubble && (
            <circle
              cx={geometry.bubble.cx}
              cy={geometry.bubble.cy}
              r={geometry.bubble.r}
              fill={bgColor}
              stroke={activeColor}
              strokeWidth="2"
            />
          )}

          {/* Inline SVG label slots — rendered by child via geometry.svgContent */}
          {geometry.svgContent}
        </svg>
      ) : (
        <div
          className="absolute inset-0 rounded-md border-2 bg-card flex flex-col items-center justify-center"
          style={{
            borderColor: activeColor,
            boxShadow: `0 0 8px ${activeColor}40`,
          }}
        >
          <div className="text-xs font-bold" style={{ color: activeColor }}>
            {label}
          </div>
        </div>
      )}

      {/* INPUT HANDLES */}
      {!data.preview &&
        inputYs.map((y, index) =>
          y !== null ? (
            <InputHandle
              key={`input-${index}`}
              index={index}
              state={data.inputs?.[index] ?? false}
              y={y as number}
              isConnectable={isConnectable}
            />
          ) : null,
        )}

      {/* SELECT HANDLE */}
      {!data.preview && hasSelectPin && selectPinIndex !== -1 && (
        <InputHandle
          index={selectPinIndex}
          state={data.inputs?.[selectPinIndex] ?? false}
          y={H - hs}
          position={Position.Bottom}
          style={{
            bottom: -hs,
            left: CW / 2 - hs,
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

      {/* OUTPUT HANDLES */}
      {!data.preview &&
        outputYs.map((y, index) => (
          <OutputHandle
            key={`output-${index}`}
            index={index}
            state={data.state}
            y={y}
            outputX={geometry.outputX}
            isConnectable={isConnectable}
          />
        ))}
    </div>
  );
}
