import type { GateNodeProps } from "@gately/core/types";
import { type Edge, type Node, useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { useCallback } from "react";
import { simulateCircuit } from "../../../hooks/simulator-utils";
import { useSettingsStore } from "../../../hooks/use-settings-store";
import { GRID_SIZE } from "./constants";
import { getNextTerminalName, isTerminalType } from "./terminal-names";

export function useGateActions(id: string) {
  const { getNode, getNodes, getEdges, setNodes, setEdges, addNodes, deleteElements } = useReactFlow<
    Node<GateNodeProps>,
    Edge
  >();

  const applySimulation = useCallback(
    (nodes: Node<GateNodeProps>[], edges: Edge[]) => {
      const simulated = simulateCircuit(nodes, edges, useSettingsStore.getState().settings);
      setNodes(simulated.nodes);
      setEdges(simulated.edges);
    },
    [setNodes, setEdges],
  );

  const updateState = useCallback(
    (nextState: boolean | ((state: boolean) => boolean)) => {
      const node = getNode(id);
      if (!node) return;
      const state = typeof nextState === "function" ? nextState(node.data.state) : nextState;
      const nodes = getNodes().map((node) => (node.id === id ? { ...node, data: { ...node.data, state } } : node));
      applySimulation(nodes, getEdges());
    },
    [id, getNode, getNodes, getEdges, applySimulation],
  );

  const duplicate = () => {
    const node = getNode(id);
    if (!node) return;
    addNodes({
      ...node,
      id: nanoid(),
      data: {
        ...node.data,
        label: isTerminalType(node.type) ? getNextTerminalName(node.type, getNodes()) : node.data.label,
      },
      position: { x: node.position.x + GRID_SIZE * 2, y: node.position.y + GRID_SIZE * 2 },
      selected: false,
    });
  };

  const disconnect = () => {
    const edges = getEdges().filter((edge) => edge.source !== id && edge.target !== id);
    applySimulation(getNodes(), edges);
  };

  return {
    updateState,
    toggleState: () => updateState((state) => !state),
    duplicate,
    disconnect,
    rename: (name: string) => {
      const label = name.trim();
      if (!label) return;
      setNodes((nodes) => nodes.map((node) => (node.id === id ? { ...node, data: { ...node.data, label } } : node)));
    },
    remove: () => deleteElements({ nodes: [{ id }] }),
  };
}
