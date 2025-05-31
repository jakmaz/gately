"use client";

import { useFileSystem } from "@/hooks/use-file-system";
import { useSimulatorState } from "@/hooks/use-simulator-state";
import { useCallback, useEffect, useState } from "react";
import { ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";
import { FileExplorer } from "./file-explorer";
import { Header } from "./header";
import { SimulatorCanvas } from "./simulator-canvas";

export function LogicGateSimulator() {
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnectEdge,
    onNodeClick,
  } = useSimulatorState();
  const { currentFileId, getCurrentFile, updateFileContent, switchToFile, ready } = useFileSystem();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // Canvas control functions
  const handleCenterCanvas = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.1, duration: 800 });
    }
  }, [reactFlowInstance]);

  const handleZoomIn = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomIn({ duration: 300 });
    }
  }, [reactFlowInstance]);

  const handleZoomOut = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomOut({ duration: 300 });
    }
  }, [reactFlowInstance]);

  const handleToggleLock = useCallback(() => {
    setIsLocked(!isLocked);
  }, [isLocked]);

  // Auto-save current circuit when nodes or edges change
  useEffect(() => {
    if (currentFileId && (nodes.length > 0 || edges.length > 0)) {
      const saveTimeout = setTimeout(() => {
        console.debug("Saving file", currentFileId);
        updateFileContent(currentFileId, { nodes, edges });
      }, 1000); // Auto-save after 1 second of inactivity

      return () => clearTimeout(saveTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFileId, ready]);

  const currentFileName = getCurrentFile()?.name || "Untitled Circuit";

  return (
    <div className="h-screen w-full flex flex-col">
      <Header
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentFileName={currentFileName}
        onCenterCanvas={handleCenterCanvas}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onToggleLock={handleToggleLock}
        isLocked={isLocked}
        canvasControlsEnabled={!!reactFlowInstance}
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
        <SimulatorCanvas
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnectEdge={onConnectEdge}
          onNodeClick={onNodeClick}
          onReactFlowInit={setReactFlowInstance}
          nodesDraggable={isLocked}
        />
      </div>
    </div>
  );
}
