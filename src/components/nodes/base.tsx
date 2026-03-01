"use client";

import { useState } from "react";
import { Handle, Position } from "reactflow";
import type { LogicGateProps } from "@/lib/types";

interface BaseGateNodeProps extends LogicGateProps {
  label: string;
  symbol: string;
  inputHandles?: number;
  outputHandles?: number;
  variant?: "default" | "and" | "or" | "xor" | "nand" | "nor" | "xnor" | "not" | "mux" | "dmux" | "buff";
}

const W = 80;
const H = 60;
const HANDLE_SIZE = 8;
const hs = HANDLE_SIZE / 2;

interface GateGeometry {
  bodyPath: string;
  extraPath?: string;
  bubble?: { cx: number; cy: number; r: number };
  outputX: number;
  outputY: number;
  inputPinX: number;
  inputYOverrides?: (number | null)[];
}

function andGeometry(nand = false): GateGeometry {
  const bubR = 5;
  const bodyOutX = W - 14;
  return {
    bodyPath: `M10 4 L${W / 2 - 4} 4 A${H / 2 - 4} ${H / 2 - 4} 0 0 1 ${W / 2 - 4} ${H - 4} L10 ${H - 4} Z`,
    bubble: nand ? { cx: bodyOutX + bubR, cy: H / 2, r: bubR } : undefined,
    outputX: nand ? bodyOutX + bubR * 2 : bodyOutX,
    outputY: H / 2,
    inputPinX: 10,
  };
}

function orGeometry(nor = false): GateGeometry {
  const bubR = 5;
  const tipX = W - 10;
  return {
    bodyPath: `M10 4 C28 4, ${tipX - 6} ${H * 0.18}, ${tipX} ${H / 2} C${tipX - 6} ${H * 0.82}, 28 ${H - 4}, 10 ${H - 4} Q21 ${H / 2}, 10 4 Z`,
    bubble: nor ? { cx: tipX + bubR, cy: H / 2, r: bubR } : undefined,
    outputX: nor ? tipX + bubR * 2 : tipX,
    outputY: H / 2,
    inputPinX: 13,
  };
}

function xorGeometry(xnor = false): GateGeometry {
  const bubR = 5;
  const tipX = W - 10;
  return {
    bodyPath: `M14 4 C32 4, ${tipX - 6} ${H * 0.18}, ${tipX} ${H / 2} C${tipX - 6} ${H * 0.82}, 32 ${H - 4}, 14 ${H - 4} Q25 ${H / 2}, 14 4 Z`,
    extraPath: `M8 4 Q19 ${H / 2}, 8 ${H - 4}`,
    bubble: xnor ? { cx: tipX + bubR, cy: H / 2, r: bubR } : undefined,
    outputX: xnor ? tipX + bubR * 2 : tipX,
    outputY: H / 2,
    inputPinX: 15,
  };
}

function notGeometry(): GateGeometry {
  const bubR = 5;
  const tipX = W - 18;
  return {
    bodyPath: `M10 4 L${tipX} ${H / 2} L10 ${H - 4} Z`,
    bubble: { cx: tipX + bubR, cy: H / 2, r: bubR },
    outputX: tipX + bubR * 2,
    outputY: H / 2,
    inputPinX: 10,
  };
}

function buffGeometry(): GateGeometry {
  return {
    bodyPath: `M10 4 L${W - 10} ${H / 2} L10 ${H - 4} Z`,
    outputX: W - 10,
    outputY: H / 2,
    inputPinX: 10,
  };
}

function muxGeometry(): GateGeometry {
  return {
    bodyPath: `M10 8 L${W - 10} 16 L${W - 10} ${H - 16} L10 ${H - 8} Z`,
    outputX: W - 10,
    outputY: H / 2,
    inputPinX: 10,
    inputYOverrides: [H * 0.28, H * 0.72, null],
  };
}

function dmuxGeometry(): GateGeometry {
  return {
    bodyPath: `M10 8 L${W - 10} 16 L${W - 10} ${H - 16} L10 ${H - 8} Z`,
    outputX: W - 10,
    outputY: H / 2,
    inputPinX: 10,
    inputYOverrides: [H * 0.35, null],
  };
}

function getGeometry(variant: BaseGateNodeProps["variant"]): GateGeometry {
  switch (variant) {
    case "and":
      return andGeometry(false);
    case "nand":
      return andGeometry(true);
    case "or":
      return orGeometry(false);
    case "nor":
      return orGeometry(true);
    case "xor":
      return xorGeometry(false);
    case "xnor":
      return xorGeometry(true);
    case "not":
      return notGeometry();
    case "buff":
      return buffGeometry();
    case "mux":
      return muxGeometry();
    case "dmux":
      return dmuxGeometry();
    default:
      return { bodyPath: "", outputX: W, outputY: H / 2, inputPinX: 0 };
  }
}

export function BaseGateNode({
  data,
  isConnectable,
  label,
  symbol,
  inputHandles = 2,
  outputHandles = 1,
  variant = "default",
}: BaseGateNodeProps) {
  const [hovered, setHovered] = useState(false);
  const activeColor = data.state ? "var(--color-success)" : "var(--color-primary)";
  const bgColor = "var(--card, #1a1a2e)";
  const geo = getGeometry(variant);
  const hasSelectPin = variant === "mux" || variant === "dmux";

  const inputYs: (number | null)[] = Array.from({ length: inputHandles }, (_, i) => {
    if (geo.inputYOverrides && i < geo.inputYOverrides.length) return geo.inputYOverrides[i];
    if (inputHandles === 1) return H / 2;
    return H * 0.2 + ((H * 0.6) / (inputHandles - 1)) * i;
  });
  const selectPinIndex = inputYs.findIndex((y) => y === null);

  const outputYs = Array.from({ length: outputHandles }, (_, i) => {
    if (outputHandles === 1) return geo.outputY;
    return H * 0.25 + ((H * 0.5) / (outputHandles - 1)) * i;
  });

  return (
    <div
      className="relative"
      style={{ width: W, height: H }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          bottom: H + 8,
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
        {/* arrow */}
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

      {variant !== "default" ? (
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
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
                x2={geo.inputPinX}
                y2={y}
                stroke={activeColor}
                strokeWidth="1.5"
                opacity="0.5"
              />
            ) : null,
          )}

          {/* Select pin stub */}
          {hasSelectPin && (
            <line x1={W / 2} y1={H + hs} x2={W / 2} y2={H - 10} stroke={activeColor} strokeWidth="1.5" opacity="0.5" />
          )}

          {/* Output stub wires */}
          {outputYs.map((y, i) => (
            <line
              key={`wire-out-${i}`}
              x1={geo.outputX}
              y1={y}
              x2={W}
              y2={y}
              stroke={activeColor}
              strokeWidth="1.5"
              opacity="0.5"
            />
          ))}

          <path d={geo.bodyPath} fill={bgColor} stroke={activeColor} strokeWidth="2" strokeLinejoin="round" />

          {geo.extraPath && <path d={geo.extraPath} fill="none" stroke={activeColor} strokeWidth="2" />}

          {geo.bubble && (
            <circle
              cx={geo.bubble.cx}
              cy={geo.bubble.cy}
              r={geo.bubble.r}
              fill={bgColor}
              stroke={activeColor}
              strokeWidth="2"
            />
          )}

          <text
            x={(geo.inputPinX + (geo.bubble ? geo.bubble.cx - geo.bubble.r : geo.outputX)) / 2}
            y={H / 2 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="700"
            fontFamily="monospace"
            fill={activeColor}
            style={{ userSelect: "none" }}
          >
            {symbol}
          </text>
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
          <div className="text-base font-mono" style={{ color: activeColor }}>
            {symbol}
          </div>
        </div>
      )}

      {/* INPUT HANDLES */}
      {inputYs.map((y, index) =>
        y !== null ? (
          <Handle
            key={`input-${index}`}
            type="target"
            position={Position.Left}
            id={`input-${index}`}
            style={{
              top: (y as number) - hs,
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
        ) : null,
      )}

      {/* SELECT HANDLE */}
      {hasSelectPin && selectPinIndex !== -1 && (
        <Handle
          type="target"
          position={Position.Bottom}
          id={`input-${selectPinIndex}`}
          style={{
            bottom: -hs,
            left: W / 2 - hs,
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
      {outputYs.map((y, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`output-${index}`}
          style={{
            top: y - hs,
            left: geo.outputX - hs,
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            background: activeColor,
            border: `2px solid ${bgColor}`,
            borderRadius: "50%",
            transform: "none",
          }}
          isConnectable={isConnectable}
        />
      ))}
    </div>
  );
}
