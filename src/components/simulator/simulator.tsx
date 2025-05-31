"use client";

import { useFileSystem } from "@/hooks/use-file-system";
import { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { Header } from "./header";
import { FileExplorer } from "./file-explorer";
import { SimulatorCanvas } from "./simulator-canvas";

export function LogicGateSimulator() {
  const { currentFileId, getCurrentFile, updateFileContent, switchToFile, ready } = useFileSystem();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const currentFileName = getCurrentFile()?.name || "Untitled Circuit";

  return (
    <div className="h-screen w-full flex flex-col">
      <ReactFlowProvider>
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentFileName={currentFileName}
        />
        <div className="flex flex-1 overflow-hidden">
          <FileExplorer
            isCollapsed={sidebarCollapsed}
            currentFileName={currentFileName}
            onFileSelect={switchToFile}
            currentFileId={currentFileId}
          />
          <SimulatorCanvas />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
