"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { useState } from "react";
import "@xyflow/react/dist/style.css";
import { DebugPanel } from "./debug-panel";
import { FileExplorer } from "./file-explorer";
import { Header } from "./header";
import { SimulatorCanvas } from "./simulator-canvas";

export function LogicGateSimulator() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <div className="h-screen w-full flex flex-col">
      <ReactFlowProvider>
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="flex flex-1 overflow-hidden">
          <FileExplorer isCollapsed={sidebarCollapsed} />
          <SimulatorCanvas />
          <DebugPanel />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
