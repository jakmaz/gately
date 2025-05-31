import { calculateNodeStates } from "@/lib/simulator";
import { nanoid } from "nanoid";
import { GateNodeProps } from "@/lib/types";
import { useCallback } from "react";
import {
  addEdge,
  Connection,
  Edge,
  MarkerType,
  Node,
  useReactFlow,
} from "reactflow";

export function useSimulatorLogic() {
  const { setNodes, setEdges, getNodes, getEdges, screenToFlowPosition } =
    useReactFlow();

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
        id: nanoid(),
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

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

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
    onDragOver,
    onDrop,
  };
}
