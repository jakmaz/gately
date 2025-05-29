"use client";

import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  addEdge,
  // Panel,
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
import { ORGateNode } from "../nodes/or";
import { SaveLoadPanel } from "./save-load-panel";
import { Toolbar } from "./toolbar";
import { NOTGateNode } from "../nodes/not";
import { NANDGateNode } from "../nodes/nand";
import { NORGateNode } from "../nodes/nor";
import { XORGateNode } from "../nodes/xor";
import { XNORGateNode } from "../nodes/xnor";
import AndGate from "../icons/and-gate";
import Link from "next/link";

const nodeTypes: NodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  andGate: ANDGateNode,
  orGate: ORGateNode,
  notGate: NOTGateNode,
  nandGate: NANDGateNode,
  norGate: NORGateNode,
  xorGate: XORGateNode,
  xnorGate: XNORGateNode,
};

export function LogicGateSimulator() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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

  // Function to update edge colors and animation based on source node states
  const updateEdgeStyles = useCallback((currentNodes: Node<GateNodeProps>[], currentEdges: Edge[]) => {
    const nodeStates = new Map<string, boolean>();
    
    // Create a map of node IDs to their states
    currentNodes.forEach(node => {
      nodeStates.set(node.id, node.data.state);
    });
    
    // Update edge colors and animation based on source node state
    const updatedEdges = currentEdges.map(edge => {
      const sourceState = nodeStates.get(edge.source) || false;
      return {
        ...edge,
        animated: sourceState, // Only animate when state is high (true)
        style: { 
          stroke: sourceState ? '#10b981' : '#3b82f6', // Green for high state, blue for low state
          strokeWidth: 2 
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: sourceState ? '#10b981' : '#3b82f6',
        },
      };
    });
    
    setEdges(updatedEdges);
  }, [setEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      // Create edges with default blue color and no animation (low state)
      const edge = {
        ...params,
        animated: false, // Default to not animated for low state
        style: { stroke: '#3b82f6', strokeWidth: 2 }, // Default to blue (low state)
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      };

      setEdges((eds) => addEdge(edge, eds));

      // Recalculate all node states after connection
      setTimeout(() => {
        const updatedNodes = calculateNodeStates(nodes, [...edges, edge as Edge]);
        setNodes(updatedNodes);
        
        // Update edge styles after node states are calculated
        updateEdgeStyles(updatedNodes, [...edges, edge as Edge]);
      }, 100);
    },
    [setEdges, nodes, edges, setNodes, updateEdgeStyles]
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
        
        // Update edge styles after node states are calculated
        updateEdgeStyles(calculatedNodes, edges);
      }, 100);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center bg-card">
        <Link href="/">
          <div className="flex flex-row gap-2">
            <div className="bg-primary p-0.5 rounded-md">
              <AndGate className="text-white h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold">gately</h1>
          </div>
        </Link>
        <SaveLoadPanel nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Toolbar />

        <div className="flex-1 h-full" ref={reactFlowWrapper}>
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
              <Controls className="bg-blue-500" />
              <MiniMap />
              <Background gap={12} size={1} />

              {/* <Panel position="bottom-center" className="bg-card rounded-t-lg shadow-lg"> */}
              {/*   <TruthTable nodes={nodes} edges={edges} /> */}
              {/* </Panel> */}
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
