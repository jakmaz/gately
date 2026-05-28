"use client";

import { calculateNodeStates } from "@gately/core/simulator";
import type { GateNodeProps, LogicGateProps } from "@gately/core/types";
import { useReactFlow } from "@xyflow/react";
import { Copy, Power, Trash2, Unplug } from "lucide-react";
import { nanoid } from "nanoid";
import { memo, useCallback } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Switch } from "../ui/switch";
import { OutputHandle } from "./base/gate-handle";

const W = 60;
const H = 60;

export const ToggleNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const { getNodes, setNodes, getEdges, setEdges, addNodes, deleteElements } = useReactFlow();

  const activeColor = data.preview
    ? "var(--color-foreground)"
    : data.state
      ? "var(--color-success)"
      : "var(--color-primary)";
  const bgColor = "var(--card, #1a1a2e)";

  const handleDuplicate = () => {
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
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    const edges = getEdges();
    const filtered = edges.filter((e) => e.source !== id && e.target !== id);
    setEdges(filtered);
    const nodes = getNodes() as import("@xyflow/react").Node<GateNodeProps>[];
    const calculated = calculateNodeStates(nodes, filtered);
    setNodes(calculated);
  };

  const handleToggle = () => {
    const nodes = getNodes() as import("@xyflow/react").Node<GateNodeProps>[];
    const edges = getEdges();
    const updatedNodes = nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, state: !n.data.state } } : n));
    const calculated = calculateNodeStates(updatedNodes, edges);
    setNodes(calculated);
  };

  const handleSwitchToggle = useCallback(
    (checked: boolean) => {
      const nodes = getNodes() as import("@xyflow/react").Node<GateNodeProps>[];
      const edges = getEdges();
      const updatedNodes = nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, state: checked } } : n));
      const calculated = calculateNodeStates(updatedNodes, edges);
      setNodes(calculated);
    },
    [id, getNodes, getEdges, setNodes],
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={
          <div
            className="relative rounded-md border-2 flex flex-col items-center justify-center gap-1"
            style={{
              width: W,
              height: H,
              borderColor: activeColor,
              background: bgColor,
              boxShadow: `0 0 8px ${activeColor}40`,
            }}
          />
        }
      >
        <div className="text-xs font-bold tracking-widest uppercase" style={{ color: activeColor }}>
          I1
        </div>

        <Switch
          checked={data.state}
          id={`input-switch-${id}`}
          onCheckedChange={handleSwitchToggle}
          className="scale-75 data-[state=checked]:bg-success data-[state=unchecked]:bg-primary"
        />

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
        <ContextMenuItem onClick={handleToggle}>
          <Power className="h-4 w-4 mr-2" />
          Toggle State
        </ContextMenuItem>
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
});

ToggleNode.displayName = "ToggleNode";
