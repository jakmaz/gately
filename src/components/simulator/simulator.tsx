"use client";

import { ReactFlowProvider } from "reactflow";
import { useFileSystem } from "@/hooks/use-file-system";
import { useCallback, useState } from "react";
import "reactflow/dist/style.css";
import { Header } from "./header";
import { SimulatorContent } from "./simulator-content";

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
          <SimulatorContent
            sidebarCollapsed={sidebarCollapsed}
            currentFileName={currentFileName}
            currentFileId={currentFileId}
            switchToFile={switchToFile}
            updateFileContent={updateFileContent}
            ready={ready}
          />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
