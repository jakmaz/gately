"use client";

import {
  addEdge,
  Background,
  type Connection,
  type Edge,
  MarkerType,
  type Node,
  type NodeTypes,
  ReactFlow,
  type ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useRef, useState } from "react";
import "@xyflow/react/dist/style.css";

import confetti from "canvas-confetti";
import { calculateNodeStates } from "@/lib/simulator";
import type { GateNodeProps } from "@/lib/types";
import { ANDGateNode } from "../nodes/and";
import { OutputNode } from "../nodes/output";
import { ToggleNode } from "../nodes/toggle";

const nodeTypes: NodeTypes = {
  toggleNode: ToggleNode,
  outputNode: OutputNode,
  andGate: ANDGateNode,
};

const initialNodes = [
  {
    id: "input-1",
    type: "toggleNode",
    position: { x: 0, y: 0 },
    data: { label: "Input A", state: false },
  },
  {
    id: "input-2",
    type: "toggleNode",
    position: { x: 0, y: 120 },
    data: { label: "Input B", state: false },
  },
  {
    id: "and-1",
    type: "andGate",
    position: { x: 190, y: 60 },
    data: { label: "AND", state: false },
  },
  {
    id: "output-1",
    type: "outputNode",
    position: { x: 400, y: 47 },
    data: { label: "Output", state: false },
  },
];

const initialEdges = [
  {
    id: "input-1-and-1",
    source: "input-1",
    target: "and-1",
    targetHandle: "input-0",
    animated: false,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
  },
  {
    id: "input-2-and-1",
    source: "input-2",
    target: "and-1",
    targetHandle: "input-1",
    animated: false,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
  },
  {
    id: "and-1-output-1",
    source: "and-1",
    target: "output-1",
    animated: false,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
  },
];

export function MiniPreview() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<GateNodeProps>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<Node<GateNodeProps>, Edge> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper function to get confetti origin relative to container center
  const getConfettiOrigin = useCallback(() => {
    if (!containerRef.current) {
      return { x: 0.5, y: 0.5 }; // fallback to center
    }

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return {
      x: centerX / window.innerWidth,
      y: centerY / window.innerHeight,
    };
  }, []);

  // Function to update edge colors and animation based on source node states
  const updateEdgeStyles = useCallback(
    (currentNodes: Node<GateNodeProps>[], currentEdges: Edge[]) => {
      const nodeStates = new Map<string, boolean>();

      // Create a map of node IDs to their states
      currentNodes.forEach((node) => {
        nodeStates.set(node.id, node.data.state);
      });

      // Update edge colors and animation based on source node state
      const updatedEdges = currentEdges.map((edge) => {
        const sourceState = nodeStates.get(edge.source) || false;
        return {
          ...edge,
          animated: sourceState, // Only animate when state is high (true)
          style: {
            stroke: sourceState ? "#10b981" : "#3b82f6", // Green for high state, blue for low state
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

  // Add a new node to the flow
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/@xyflow/react");

      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: type, state: false },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, setNodes],
  );

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      // Create edges with default blue color and no animation (low state)
      const edge = {
        ...params,
        animated: false, // Default to not animated for low state
        style: { stroke: "#3b82f6", strokeWidth: 2 }, // Default to blue (low state)
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#3b82f6",
        },
      };

      setEdges((eds) => addEdge(edge, eds));

      // Recalculate all node states after connection
      setTimeout(() => {
        const updatedNodes = calculateNodeStates(nodes, [...edges, edge as Edge]);
        setNodes(updatedNodes);

        // Update edge styles after node states are calculated
        updateEdgeStyles(updatedNodes, [...edges, edge as Edge]);

        const outputNode = updatedNodes.find((n) => n.type === "outputNode");
        if (outputNode?.data?.state === true) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: getConfettiOrigin(),
          });
        }
      }, 100);
    },
    [setEdges, nodes, edges, setNodes, updateEdgeStyles, getConfettiOrigin],
  );

  // Toggle input node state
  const handleNodeClick = (node: Node<GateNodeProps>) => {
    if (node.type === "toggleNode") {
      const updatedNodes = nodes.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              state: !n.data.state,
            },
          };
        }
        return n;
      });

      setNodes(updatedNodes);

      // Recalculate all node states after input change
      setTimeout(() => {
        const calculatedNodes = calculateNodeStates(updatedNodes, edges);
        setNodes(calculatedNodes);

        // Update edge styles after node states are calculated
        updateEdgeStyles(calculatedNodes, edges);

        const outputNode = calculatedNodes.find((n) => n.type === "outputNode");
        if (outputNode?.data?.state === true) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: getConfettiOrigin(),
          });
        }
      }, 100);
    }
  };

  return (
    <div ref={containerRef} className="h-40 sm:h-82 w-full">
      <ReactFlowProvider>
        <ReactFlow<Node<GateNodeProps>, Edge>
          className="bg-b"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => handleNodeClick(node)}
          fitView
        >
          <Background gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
