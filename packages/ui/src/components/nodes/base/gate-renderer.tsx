/** biome-ignore-all lint/suspicious/noArrayIndexKey: handles are positional */
"use client";

import { calculateNodeStates } from "@gately/core/simulator";
import type { GateNodeProps } from "@gately/core/types";
import { Position, useReactFlow } from "@xyflow/react";
import { Copy, Power, Trash2, Unplug } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../../ui/context-menu";
import { H, hs, W } from "./constants";
import { InputHandle, OutputHandle } from "./gate-handle";
import type { GateRendererProps } from "./types";

export function GateRenderer({
  id,
  data,
  isConnectable,
  geometry,
  label,
  inputHandles,
  outputHandles,
}: GateRendererProps) {
  const [hovered, setHovered] = useState(false);
  const { getNodes, setNodes, getEdges, setEdges, addNodes, deleteElements } = useReactFlow();
  const activeColor = data.preview
    ? "var(--color-foreground)"
    : data.state
      ? "var(--color-success)"
      : "var(--color-primary)";
  const bgColor = "var(--card, #1a1a2e)";
  const hasSelectPin = label === "MUX" || label === "DMUX";
  const isInputNode = label === "TOGGLE" || label === "PUSH";

  const inputYs: (number | null)[] = Array.from({ length: inputHandles }, (_, i) => {
    if (geometry.inputYOverrides && i < geometry.inputYOverrides.length) return geometry.inputYOverrides[i];
    if (inputHandles === 1) return H / 2;
    return H * 0.2 + ((H * 0.6) / (inputHandles - 1)) * i;
  });
  const selectPinIndex = inputYs.indexOf(null);

  const outputYs = Array.from({ length: outputHandles }, (_, i) => {
    if (outputHandles === 1) return geometry.outputY;
    return H * 0.25 + ((H * 0.5) / (outputHandles - 1)) * i;
  });

  const handleDuplicate = () => {
    if (!id) return;
    const node = getNodes().find((n) => n.id === id);
    if (!node) return;
    const newNode = {
      ...node,
      id: nanoid(),
      position: { x: node.position.x + 40, y: node.position.y + 40 },
      selected: false,
    };
    addNodes(newNode);
  };

  const handleDelete = () => {
    if (!id) return;
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    if (!id) return;
    const edges = getEdges();
    const filtered = edges.filter((e) => e.source !== id && e.target !== id);
    setEdges(filtered);
    const nodes = getNodes() as import("@xyflow/react").Node<GateNodeProps>[];
    const calculated = calculateNodeStates(nodes, filtered);
    setNodes(calculated);
  };

  const handleToggle = () => {
    if (!id || !isInputNode) return;
    const nodes = getNodes() as import("@xyflow/react").Node<GateNodeProps>[];
    const edges = getEdges();
    const updatedNodes = nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, state: !n.data.state } } : n));
    const calculated = calculateNodeStates(updatedNodes, edges);
    setNodes(calculated);
  };

  const gateContent = (
    <>
      {/* Hover tooltip */}
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

      {/* Gate SVG or default rendering */}
      {geometry.bodyPath ? (
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
            <line x1={W / 2} y1={H + hs} x2={W / 2} y2={H - 10} stroke={activeColor} strokeWidth="1.5" opacity="0.5" />
          )}

          {/* Output stub wires */}
          {outputYs.map((y, i) => (
            <line
              key={`wire-out-${i}`}
              x1={geometry.outputX}
              y1={y}
              x2={W}
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
            left: W / 2 - hs,
            top: undefined,
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
            state={data.outputs?.[index] ?? data.state}
            y={y}
            outputX={geometry.outputX}
            isConnectable={isConnectable}
          />
        ))}
    </>
  );

  if (data.preview || !id) {
    return (
      <div className="relative" style={{ width: W, height: H }}>
        {gateContent}
      </div>
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={
          <div
            className="relative"
            style={{ width: W, height: H }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        }
      >
        {gateContent}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleDuplicate}>
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDisconnect}>
          <Unplug className="h-4 w-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        {isInputNode && (
          <ContextMenuItem onClick={handleToggle}>
            <Power className="h-4 w-4 mr-2" />
            Toggle State
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={handleDelete}
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
