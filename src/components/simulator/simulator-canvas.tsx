/* eslint-disable react-hooks/exhaustive-deps */

import {
  Background,
  type Edge,
  MiniMap,
  type Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useFileSystem } from "@/hooks/use-file-system";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { useSimulatorLogic } from "@/hooks/use-simulator-logic";
import { type GateNodeProps, nodeTypes } from "@/lib/types";
import { Toolbar } from "./toolbar";

export function SimulatorCanvas() {
  const hasMounted = useHasMounted();
  const { settings } = useSettingsStore();
  const { currentFileId, updateFileContent, ready, getCurrentFile } = useFileSystem();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<GateNodeProps>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { onConnectEdge, onNodeClick, onEdgesChangeWithSimulation, onDrop, onDragOver } = useSimulatorLogic(
    setNodes,
    setEdges,
  );

  // Auto-save current circuit when nodes or edges change
  useEffect(() => {
    if (currentFileId && (nodes.length > 0 || edges.length > 0)) {
      const saveTimeout = setTimeout(() => {
        console.debug("Saving file", currentFileId);
        updateFileContent(currentFileId, { nodes, edges });
      }, 1000); // Auto-save after 1 second of inactivity

      return () => clearTimeout(saveTimeout);
    }
  }, [nodes, edges]);

  useEffect(() => {
    if (!ready) return;
    const currentFile = getCurrentFile();
    console.debug("Loading file", currentFileId);

    if (currentFile?.data) {
      setNodes(currentFile.data.nodes);
      setEdges(currentFile.data.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [currentFileId, ready]);

  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center w-full h-full text-xl text-muted-foreground">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 h-full">
      <ReactFlow<Node<GateNodeProps>, Edge>
        className="bg-background"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChangeWithSimulation}
        onConnect={onConnectEdge}
        onDrop={onDrop}
        onDragOver={onDragOver}
        snapToGrid={settings.snapToGrid}
        snapGrid={[20, 20]}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onNodeClick(node)}
        fitView
      >
        <Panel position="top-left">
          <Toolbar />
        </Panel>
        {settings.showMinimap && <MiniMap className="bg-card" />}
        {settings.showGrid && <Background gap={12} size={1} />}
      </ReactFlow>
    </div>
  );
}
