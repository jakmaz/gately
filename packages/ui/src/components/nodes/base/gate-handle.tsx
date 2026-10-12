import { Handle, Position, useNodeConnections } from "@xyflow/react";
import { HANDLE_SIZE } from "./constants";
import type { GatePort } from "./types";

const POSITIONS = { left: Position.Left, right: Position.Right, bottom: Position.Bottom };

export function GateHandle({
  port,
  state,
  isConnectable = true,
}: {
  port: GatePort;
  state: boolean;
  isConnectable?: boolean;
}) {
  const type = port.kind === "input" ? "target" : "source";
  const connections = useNodeConnections({ handleType: type, handleId: port.id });

  return (
    <Handle
      type={type}
      position={POSITIONS[port.side]}
      id={port.id}
      title={`${port.kind} ${port.index + 1}`}
      style={{
        left: port.x - HANDLE_SIZE / 2,
        top: port.y - HANDLE_SIZE / 2,
        right: "auto",
        bottom: "auto",
        width: HANDLE_SIZE,
        height: HANDLE_SIZE,
        background: state ? "var(--signal-high)" : "var(--signal-low)",
        border: "2px solid var(--card)",
        borderRadius: "50%",
        transform: "none",
      }}
      isConnectable={isConnectable && (port.kind === "output" || connections.length === 0)}
    />
  );
}
