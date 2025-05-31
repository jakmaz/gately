"use client";

import { useEffect, useState } from "react";
import "reactflow/dist/style.css";
import { Header } from "./header";
import { useFileSystem } from "@/hooks/use-file-system";
import { SimulatorCanvas } from "./simulator-canvas";
import { useSimulatorState } from "@/hooks/use-simulator-state";
import { FileExplorer } from "./file-explorer";

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)


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
      setNodes(currentFile.data.nodes)
      setEdges(currentFile.data.edges)
    } else {
      setNodes([]);
      setEdges([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFileId, ready]); // 👈 include all dependencies


  const currentFileName = getCurrentFile()?.name || "Untitled Circuit";

  return (
    <div className="h-screen w-full flex flex-col">
      <Header
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentFileName={currentFileName}
      // onImportExample={handleImportExample}
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
        />
      </div>
    </div>
  );
}
