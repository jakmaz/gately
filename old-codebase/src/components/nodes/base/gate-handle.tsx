import { Handle, Position, useNodeConnections } from "@xyflow/react";
import type React from "react";

interface OutputHandleProps {
  index: number;
  state: boolean;
  y: number;
  outputX: number;
  isConnectable?: boolean;
  customId?: string;
}

export function OutputHandle({ index, state, y, outputX, isConnectable = true, customId }: OutputHandleProps) {
  const handleId = customId || `output-${index}`;
  const connections = useNodeConnections({
    handleType: "source",
    handleId,
  });

  const canConnect = connections.length === 0 && isConnectable;

  const activeColor = state ? "var(--color-success)" : "var(--color-primary)";
  const bgColor = "var(--card, #1a1a2e)";
  const HANDLE_SIZE = 8;
  const hs = HANDLE_SIZE / 2;

  // Outputs can have unlimited connections (fan-out is allowed)
  return (
    <Handle
      key={handleId}
      type="source"
      position={Position.Right}
      id={handleId}
      style={{
        top: y - hs,
        left: outputX - hs,
        width: HANDLE_SIZE,
        height: HANDLE_SIZE,
        background: activeColor,
        border: `2px solid ${bgColor}`,
        borderRadius: "50%",
        transform: "none",
      }}
      isConnectable={canConnect}
    />
  );
}

interface InputHandleProps {
  index: number;
  state: boolean;
  y: number;
  isConnectable?: boolean;
  position?: Position;
  style?: React.CSSProperties;
  customId?: string;
}

export function InputHandle({
  index,
  state,
  y,
  isConnectable = true,
  position = Position.Left,
  style,
  customId,
}: InputHandleProps) {
  const handleId = customId || `input-${index}`;
  const connections = useNodeConnections({
    handleType: "target",
    handleId,
  });

  const activeColor = state ? "var(--color-success)" : "var(--color-primary)";
  const bgColor = "var(--card, #1a1a2e)";
  const HANDLE_SIZE = 8;
  const hs = HANDLE_SIZE / 2;

  // Input handles can only have 1 connection (no multiple inputs to same handle)
  const canConnect = connections.length === 0 && isConnectable;

  const defaultStyle = {
    top: y - hs,
    left: position === Position.Left ? -hs : undefined,
    bottom: position === Position.Bottom ? -hs : undefined,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    background: activeColor,
    border: `2px solid ${bgColor}`,
    borderRadius: "50%",
    transform: "none",
  };

  return (
    <Handle
      key={handleId}
      type="target"
      position={position}
      id={handleId}
      style={{ ...defaultStyle, ...style }}
      isConnectable={canConnect}
    />
  );
}
