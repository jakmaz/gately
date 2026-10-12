import type { GateNodeProps } from "@gately/core/types";
import { H, W } from "./constants";
import type { GateGeometry, GatePort } from "./types";

export function getPortState(port: GatePort, data?: GateNodeProps) {
  if (!data || data.preview) return false;
  return port.kind === "input" ? (data.inputs?.[port.index] ?? false) : (data.outputs?.[port.index] ?? data.state);
}

/** Pure SVG shared by the canvas and toolbox; it does not require React Flow. */
export function GateSymbol({
  geometry,
  data,
  size = W,
  label,
  showName = true,
}: {
  geometry: GateGeometry;
  data?: GateNodeProps;
  size?: number;
  label?: string;
  showName?: boolean;
}) {
  const active = Boolean(data?.state && !data.preview);
  const color = active ? "var(--signal-high)" : "var(--signal-low)";
  const strokeWidth = !data || data.preview ? 3 : 2.5;
  const fill = active ? "color-mix(in srgb, var(--signal-high) 12%, var(--card))" : "var(--card)";
  const name = data?.label.trim() || (geometry.terminal === "output" ? "Q1" : "I1");
  const words = name.split(/\s+/);
  const lines = Array.from(name).length > 6 && words.length === 2 ? words : [name];
  const nameSize = Math.min(
    lines.length === 2 ? 14 : 22,
    44 / (Math.max(...lines.map((line) => Array.from(line).length)) * 0.62),
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${W} ${H}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ overflow: "visible" }}
    >
      {geometry.ports.map((port) => (
        <line
          key={port.id}
          x1={port.x}
          y1={port.y}
          x2={port.bodyX}
          y2={port.bodyY}
          stroke={getPortState(port, data) ? "var(--signal-high)" : "var(--signal-low)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      ))}
      <path
        d={geometry.bodyPath}
        fill={fill}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {geometry.extraPath && (
        <path d={geometry.extraPath} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      )}
      {geometry.bubble && <circle {...geometry.bubble} fill={fill} stroke={color} strokeWidth={strokeWidth} />}
      {geometry.terminal &&
        showName &&
        lines.map((line, index) => (
          <text
            key={index === 0 ? "first" : "second"}
            x="40"
            y={40 + (index - (lines.length - 1) / 2) * 14}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="var(--font-mono)"
            fontSize={nameSize}
            fontWeight="500"
            fill={active ? "var(--signal-high)" : "var(--foreground)"}
          >
            {line}
          </text>
        ))}
    </svg>
  );
}
