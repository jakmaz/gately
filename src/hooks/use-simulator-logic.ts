/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import {
  addEdge,
  MarkerType,
  Edge,
  Node,
  Connection,
  useReactFlow,
} from "reactflow";
import { GateNodeProps } from "@/lib/types";
import { calculateNodeStates } from "@/lib/simulator";

export function useSimulatorLogic() {
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

  const updateEdgeStyles = useCallback(
    (currentNodes: Node<GateNodeProps>[], currentEdges: Edge[]) => {
      const nodeStates = new Map<string, boolean>();
      currentNodes.forEach((node) => nodeStates.set(node.id, node.data.state));

      const updatedEdges = currentEdges.map((edge) => {
        const sourceState = nodeStates.get(edge.source) || false;
        return {
          ...edge,
          animated: sourceState,
          style: {
            stroke: sourceState ? "#10b981" : "#3b82f6",
            strokeWidth: 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: sourceState ? "#10b981" : "#3b82f6",
          },
        };
      });

      setEdges(updatedEdges);
    },
    [setEdges],
  );

  const onConnectEdge = useCallback(
    (params: Connection | Edge) => {
      const nodes = getNodes();
      const edges = getEdges();

      const edge = {
        ...params,
        id: `${params.source}-${params.target}-${Date.now()}`,
        animated: false,
        style: { stroke: "#3b82f6", strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#3b82f6",
        },
      };

      setEdges((eds) => addEdge(edge, eds));

      setTimeout(() => {
        const updatedNodes = calculateNodeStates(nodes, [
          ...edges,
          edge as Edge,
        ]);
        setNodes(updatedNodes);
        updateEdgeStyles(updatedNodes, [...edges, edge as Edge]);
      }, 100);
    },
    [setEdges, setNodes, updateEdgeStyles, getNodes, getEdges],
  );

  const onNodeClick = useCallback(
    (node: Node<GateNodeProps>) => {
      if (node.type !== "inputNode") return;

      const nodes = getNodes();
      const edges = getEdges();

      const updatedNodes = nodes.map((n) =>
        n.id === node.id
          ? { ...n, data: { ...n.data, state: !n.data.state } }
          : n,
      );

      setNodes(updatedNodes);

      setTimeout(() => {
        const calculatedNodes = calculateNodeStates(updatedNodes, edges);
        setNodes(calculatedNodes);
        updateEdgeStyles(calculatedNodes, edges);
      }, 100);
    },
    [setNodes, updateEdgeStyles, getNodes, getEdges],
  );

  const onNodesChange = useCallback(
    (changes: any) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      setEdges((eds) => {
        return changes.reduce((acc: Edge[], change: any) => {
          if (change.type === "remove") {
            return acc.filter((edge) => edge.id !== change.id);
          }
          return acc;
        }, eds);
      });
    },
    [setEdges],
  );

  return {
    onNodesChange,
    onEdgesChange,
    onConnectEdge,
    onNodeClick,
  };
}
