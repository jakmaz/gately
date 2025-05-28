"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  MarkerType,
  Node,
  NodeTypes,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { GateNodeProps } from "@/lib/types";
import { calculateNodeStates } from "@/lib/simulator";
import { InputNode } from "../nodes/input";
import { OutputNode } from "../nodes/output";
import { ANDGateNode } from "../nodes/and";
import confetti from 'canvas-confetti';

const nodeTypes: NodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  andGate: ANDGateNode,
};

const initialNodes = [
  {
    id: "input-1",
    type: "inputNode",
    position: { x: 0, y: 0 },
    data: { label: "Input A", state: false },
  },
  {
    id: "input-2",
    type: "inputNode",
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
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: "input-2-and-1",
    source: "input-2",
    target: "and-1",
    targetHandle: "input-1",
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: "and-1-output-1",
    source: "and-1",
    target: "output-1",
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
];

export function MiniPreview() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  // Add a new node to the flow
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

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
    [reactFlowInstance, nodes, setNodes]
  );

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      // Create edges with animated, colored lines
      const edge = {
        ...params,
        animated: true,
        style: { stroke: '#10b981', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#10b981',
        },
      };

      setEdges((eds) => addEdge(edge, eds));

      // Recalculate all node states after connection
      setTimeout(() => {
        const updatedNodes = calculateNodeStates(nodes, [...edges, edge as Edge]);
        setNodes(updatedNodes);

        const outputNode = updatedNodes.find(n => n.type === 'outputNode');
        if (outputNode?.data?.state === true) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.75, y: 0.4 }
          });
        }
      }, 100);
    },
    [setEdges, nodes, edges, setNodes]
  );

  // Toggle input node state
  const handleNodeClick = (node: Node<GateNodeProps>) => {
    if (node.type === 'inputNode') {
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

        const outputNode = calculatedNodes.find(n => n.type === 'outputNode');
        if (outputNode?.data?.state === true) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.75, y: 0.4 }
          });
        }
      }, 100);
    }
  };

  return (
    <div className="h-82 w-full">
      <ReactFlowProvider>
        <ReactFlow
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
    </div >
  );
}
