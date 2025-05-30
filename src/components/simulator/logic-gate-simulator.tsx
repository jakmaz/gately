"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
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
import { ORGateNode } from "../nodes/or";
import { Toolbar } from "./toolbar";
import { NOTGateNode } from "../nodes/not";
import { NANDGateNode } from "../nodes/nand";
import { NORGateNode } from "../nodes/nor";
import { XORGateNode } from "../nodes/xor";
import { XNORGateNode } from "../nodes/xnor";
import { FileExplorer } from "./file-explorer";
import { EnhancedHeader } from "./enhanced-header";
import { toast } from "sonner";
import { useSettings } from "@/hooks/use-settings";
import { useFileSystem } from "@/hooks/use-file-system";

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const { settings } = useSettings();
  const { currentFileId, getCurrentFile, updateFileContent, switchToFile, ready } = useFileSystem();


  // Auto-save current circuit when nodes or edges change
  useEffect(() => {
    if (currentFileId && (nodes.length > 0 || edges.length > 0)) {
      const saveTimeout = setTimeout(() => {
        console.log("Saving file", currentFileId);
        updateFileContent(currentFileId, { nodes, edges });
      }, 1000); // Auto-save after 1 second of inactivity

      return () => clearTimeout(saveTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges]);


  useEffect(() => {
    if (!ready) return; // ✅ wait until ready
    const currentFile = getCurrentFile();
    console.log("Loading file", currentFileId);

    if (currentFile?.data) {
      setNodes(currentFile.data.nodes)
      setEdges(currentFile.data.edges)
    } else {
      setNodes([]);
      setEdges([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFileId]); // 👈 include all dependencies



  const currentFileName = getCurrentFile()?.name || "Untitled Circuit";

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

  const updateEdgeStyles = useCallback((currentNodes: Node<GateNodeProps>[], currentEdges: Edge[]) => {
    const nodeStates = new Map<string, boolean>();

    currentNodes.forEach(node => {
      nodeStates.set(node.id, node.data.state);
    });

    const updatedEdges = currentEdges.map(edge => {
      const sourceState = nodeStates.get(edge.source) || false;
      return {
        ...edge,
        animated: sourceState,
        style: {
          stroke: sourceState ? '#10b981' : '#3b82f6',
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
      const edge = {
        ...params,
        id: `${params.source}-${params.target}-${Date.now()}`,
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      };

      setEdges((eds) => addEdge(edge, eds));

      setTimeout(() => {
        const updatedNodes = calculateNodeStates(nodes, [...edges, edge as Edge]);
        setNodes(updatedNodes);
        updateEdgeStyles(updatedNodes, [...edges, edge as Edge]);
      }, 100);
    },
    [setEdges, nodes, edges, setNodes, updateEdgeStyles]
  );

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

      setTimeout(() => {
        const calculatedNodes = calculateNodeStates(updatedNodes, edges);
        setNodes(calculatedNodes);
        updateEdgeStyles(calculatedNodes, edges);
      }, 100);
    }
  };

  // Handle importing example circuits
  const handleImportExample = useCallback((exampleNodes: Node<GateNodeProps>[], exampleEdges: Edge[], name: string) => {
    setNodes(exampleNodes);
    setEdges(exampleEdges);

    // Save the imported example to current file
    updateFileContent(currentFileId, { nodes: exampleNodes, edges: exampleEdges });

    // Recalculate node states after importing
    setTimeout(() => {
      const calculatedNodes = calculateNodeStates(exampleNodes, exampleEdges);
      setNodes(calculatedNodes);
      updateEdgeStyles(calculatedNodes, exampleEdges);
    }, 100);

    toast.success(`Example "${name}" imported successfully`);
  }, [setNodes, setEdges, updateEdgeStyles, updateFileContent, currentFileId]);

  return (
    <div className="h-screen w-full flex flex-col">
      <EnhancedHeader
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentFileName={currentFileName}
        onImportExample={handleImportExample}
      />

      <div className="flex flex-1 overflow-hidden">
        <FileExplorer
          isCollapsed={sidebarCollapsed}
          nodes={nodes}
          edges={edges}
          currentFileName={currentFileName}
          onFileSelect={switchToFile}
          currentFileId={currentFileId}
        />

        <Toolbar />

        <div className="flex-1 h-full" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
              className="bg-background"
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              snapToGrid={settings.snapToGrid}
              snapGrid={[20, 20]}
              nodeTypes={nodeTypes}
              onNodeClick={(_, node) => handleNodeClick(node)}
              // connectionLineType={settings.connectionType}
              fitView
            >
              <Controls className="bg-card" />
              {settings.showMinimap && <MiniMap className="bg-card" />}
              {settings.showGrid && <Background gap={12} size={1} />}
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
