import type { GateNodeProps } from "@gately/core/types";
import {
  addEdge,
  applyEdgeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  useReactFlow,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { type Dispatch, type SetStateAction, useCallback, useEffect } from "react";
import { simulateCircuit, styleSimulationEdges } from "./simulator-utils";
import { useSettingsStore } from "./use-settings-store";

export function useSimulatorLogic(
  setNodes: Dispatch<SetStateAction<Node<GateNodeProps>[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
) {
  const { getNodes, getEdges, screenToFlowPosition } = useReactFlow();

  const { settings } = useSettingsStore();

  const applySimulation = useCallback(
    (nextNodes: Node<GateNodeProps>[], nextEdges: Edge[]) => {
      const simulated = simulateCircuit(nextNodes, nextEdges, settings);
      setNodes(simulated.nodes);
      setEdges(simulated.edges);
    },
    [setEdges, setNodes, settings],
  );

  useEffect(() => {
    const nodes = getNodes() as Node<GateNodeProps>[];
    const edges = getEdges();
    const styledEdges = styleSimulationEdges(nodes, edges, settings);
    setEdges(styledEdges);
  }, [getNodes, getEdges, settings, setEdges]);

  const onConnectEdge = useCallback(
    (params: Connection | Edge) => {
      const nodes = getNodes() as Node<GateNodeProps>[];
      const edges = getEdges();

      const edge: Edge = {
        id: nanoid(),
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        animated: false,
        type: settings.connectionType,
        style: { stroke: "var(--color-primary)", strokeWidth: 2 },
      };

      applySimulation(nodes, addEdge(edge, edges));
    },
    [applySimulation, getNodes, getEdges, settings.connectionType],
  );

  const onNodeClick = useCallback(
    (node: Node<GateNodeProps>) => {
      if (node.type !== "toggleNode") return;

      const nodes = getNodes() as Node<GateNodeProps>[];
      const edges = getEdges();

      const updatedNodes = nodes.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, state: !n.data.state } } : n,
      );

      applySimulation(updatedNodes, edges);
    },
    [applySimulation, getNodes, getEdges],
  );

  const onEdgesChangeWithSimulation = useCallback(
    (changes: EdgeChange[]) => {
      const currentEdges = getEdges();
      const currentNodes = getNodes() as Node<GateNodeProps>[];

      // Apply the edge changes first (add, remove, etc.)
      const updatedEdges = applyEdgeChanges(changes, currentEdges);

      // Check if any edges were removed
      const hasRemoval = changes.some((change) => change.type === "remove");

      if (hasRemoval) {
        // When edges are removed, recalculate all node states
        // Disconnected nodes should become false (no power = false)
        applySimulation(currentNodes, updatedEdges);
      } else {
        // For other changes (select, etc.), just update edges without restyling
        setEdges(updatedEdges);
      }
    },
    [applySimulation, getEdges, getNodes, setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/@xyflow/react");

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: nanoid(), // instead of `${type}-${getNodes.length + 1}`
        type,
        position,
        data: { label: type, state: false },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  return {
    onConnectEdge,
    onNodeClick,
    onEdgesChangeWithSimulation,
    onDragOver,
    onDrop,
  };
}
