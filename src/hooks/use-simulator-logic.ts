import {
  addEdge,
  applyEdgeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  MarkerType,
  type Node,
  useReactFlow,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { type Dispatch, type SetStateAction, useCallback, useEffect } from "react";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { calculateNodeStates } from "@/lib/simulator";
import type { GateNodeProps } from "@/lib/types";

export function useSimulatorLogic(
  setNodes: Dispatch<SetStateAction<Node<GateNodeProps>[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
) {
  const { getNodes, getEdges, screenToFlowPosition } = useReactFlow();

  const { settings } = useSettingsStore();

  const updateEdgeStyles = useCallback(
    (currentNodes: Node<GateNodeProps>[], currentEdges: Edge[]) => {
      const nodeStates = new Map<string, boolean>();
      currentNodes.forEach((node) => {
        nodeStates.set(node.id, node.data.state);
      });

      const updatedEdges = currentEdges.map((edge) => {
        const sourceState = nodeStates.get(edge.source) || false;
        return {
          ...edge,
          animated: sourceState && settings.animateConnections, // Apply animation toggle
          type: settings.connectionType, // Apply the selected connection type
          style: {
            stroke: sourceState ? "var(--color-success)" : "var(--color-primary)",
            strokeWidth: 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: sourceState ? "var(--color-success)" : "var(--color-primary)",
          },
        };
      });

      return updatedEdges;
    },
    [settings.animateConnections, settings.connectionType],
  );

  useEffect(() => {
    const nodes = getNodes() as Node<GateNodeProps>[];
    const edges = getEdges();
    const styledEdges = updateEdgeStyles(nodes, edges);
    setEdges(styledEdges);
  }, [getNodes, getEdges, updateEdgeStyles, setEdges]);

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
        type: settings.connectionType, // Set initial type from settings
        style: { stroke: "#3b82f6", strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#3b82f6",
        },
      };

      setEdges((eds) => addEdge(edge, eds));

      const updatedNodes = calculateNodeStates(nodes, [...edges, edge as Edge]);
      setNodes(updatedNodes);
      const styledEdges = updateEdgeStyles(updatedNodes, [...edges, edge as Edge]);
      setEdges(styledEdges);
    },
    [setNodes, setEdges, updateEdgeStyles, getNodes, getEdges, settings.connectionType],
  );

  const onNodeClick = useCallback(
    (node: Node<GateNodeProps>) => {
      if (node.type !== "toggleNode") return;

      const nodes = getNodes() as Node<GateNodeProps>[];
      const edges = getEdges();

      const updatedNodes = nodes.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, state: !n.data.state } } : n,
      );

      setNodes(updatedNodes);

      const calculatedNodes = calculateNodeStates(updatedNodes, edges);
      setNodes(calculatedNodes);
      const styledEdges = updateEdgeStyles(calculatedNodes, edges);
      setEdges(styledEdges);
    },
    [setNodes, updateEdgeStyles, getNodes, getEdges, setEdges],
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
        const updatedNodes = calculateNodeStates(currentNodes, updatedEdges);
        setNodes(updatedNodes);

        // Update edge styles based on new node states and set edges once
        const styledEdges = updateEdgeStyles(updatedNodes, updatedEdges);
        setEdges(styledEdges);
      } else {
        // For other changes (select, etc.), just update edges without restyling
        setEdges(updatedEdges);
      }
    },
    [getEdges, getNodes, setEdges, setNodes, updateEdgeStyles],
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
