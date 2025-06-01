"use client";

import { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { Header } from "./header";
import { FileExplorer } from "./file-explorer";
import { SimulatorCanvas } from "./simulator-canvas";

export function LogicGateSimulator() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);


  return (
    <div className="h-screen w-full flex flex-col">
      <ReactFlowProvider>
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className="flex flex-1 overflow-hidden">
          <FileExplorer isCollapsed={sidebarCollapsed} />
          <SimulatorCanvas />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
