"use client";

import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  MarkerType,
  Node,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";

import { GateNodeProps } from "@/lib/types";
import { calculateNodeStates } from "@/lib/simulator";
import { InputNode } from "../nodes/input";
import { OutputNode } from "../nodes/output";
import { ANDGateNode } from "../nodes/and";
import { ORGateNode } from "../nodes/or";
import { SaveLoadPanel } from "./save-load-panel";
import { Toolbar } from "./toolbar";
import { TruthTable } from "./truth-table";
import { Workflow } from "lucide-react";

const nodeTypes: NodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  andGate: ANDGateNode,
  orGate: ORGateNode,
  // notGate: NOTGateNode,
  // nandGate: NANDGateNode,
  // norGate: NORGateNode,
  // xorGate: XORGateNode,
  // xnorGate: XNORGateNode,
};

export function LogicGateSimulator() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

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
      }, 100);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center bg-card">
        <div className="flex flex-row gap-2">
          <div className="bg-blue-500 p-1 rounded-md">
            <Workflow className="text-background h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Gately - Logic Gate Simulator</h1>
        </div>
        <SaveLoadPanel nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Toolbar />

        <div className="flex-1 h-full" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
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
              <Controls />
              <MiniMap />
              <Background gap={12} size={1} />

              <Panel position="bottom-center" className="bg-card rounded-t-lg shadow-lg">
                <TruthTable nodes={nodes} edges={edges} />
              </Panel>
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
