import { useReactFlow } from "@xyflow/react";
import { memo, useCallback } from "react";
import { calculateNodeStates } from "@gately/core/simulator";
import type { LogicGateProps } from "@gately/core/types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { OutputHandle } from "./base/gate-handle";

const W = 60;
const H = 60;

export const PushNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const { getNodes, getEdges, setNodes } = useReactFlow();

  const updateState = useCallback(
    (newState: boolean) => {
      const nodes = getNodes() as any[];
      const edges = getEdges();

      const updatedNodes = nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, state: newState } } : n));

      setNodes(updatedNodes);

      const calculatedNodes = calculateNodeStates(updatedNodes, edges);
      setNodes(calculatedNodes);
    },
    [id, getNodes, getEdges, setNodes],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent ReactFlow from handling this event
      updateState(true);

      // Add global mouse up listener to handle mouse release anywhere
      const handleMouseUp = () => {
        updateState(false);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mouseleave", handleMouseUp);
      };

      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mouseleave", handleMouseUp);
    },
    [updateState],
  );

  const activeColor = data.preview
    ? "var(--color-foreground)"
    : data.state
      ? "var(--color-success)"
      : "var(--color-primary)";
  const bgColor = "var(--card, #1a1a2e)";

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className="relative rounded-md border-2 flex flex-col items-center justify-center"
          style={{
            width: W,
            height: H,
            borderColor: activeColor,
            background: bgColor,
            boxShadow: `0 0 8px ${activeColor}40`,
          }}
        >
          {/* Push Button Circle */}
          <div
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-all duration-150 cursor-pointer select-none"
            style={{
              borderColor: activeColor,
              backgroundColor: data.state ? activeColor : "transparent",
              color: data.state ? bgColor : activeColor,
              transform: data.state ? "scale(0.9)" : "scale(1)",
              boxShadow: data.state ? `inset 0 2px 4px rgba(0,0,0,0.2)` : `0 2px 4px ${activeColor}20`,
            }}
            onMouseDown={handleMouseDown}
            onDragStart={(e) => e.preventDefault()} // Prevent dragging
          >
            I1
          </div>

          {!data.preview && (
            <OutputHandle
              index={0}
              state={data.state}
              y={H / 2}
              outputX={W}
              customId="output"
              isConnectable={isConnectable}
            />
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rename</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
});

PushNode.displayName = "PushNode";
