"use client";

import { Bug } from "lucide-react";
import { useSettingsStore } from "../../hooks/use-settings-store";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ExportTab } from "./debug-export-tab";
import { PerformanceTab } from "./debug-performance-tab";
import { SimulationTab } from "./debug-simulation-tab";

interface DebugPanelProps {
  isSimulating?: boolean;
}

export function DebugPanel({ isSimulating = false }: DebugPanelProps) {
  const { settings } = useSettingsStore();

  if (!settings.debugMode) {
    return null;
  }

  return (
    <div className="w-80 border-l bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b flex items-center justify-between">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Bug className="h-4 w-4" />
          Debug Panel
        </h3>
        <Badge variant={isSimulating ? "default" : "secondary"} className="text-xs">
          {isSimulating ? "Running" : "Idle"}
        </Badge>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="simulation" className="flex-1 flex flex-col">
        <TabsList className="mx-3 mt-2">
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="export">Export Data</TabsTrigger>
        </TabsList>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto">
          <TabsContent value="simulation" className="m-0 p-3">
            <SimulationTab />
          </TabsContent>
          <TabsContent value="performance" className="m-0 p-3">
            <PerformanceTab />
          </TabsContent>
          <TabsContent value="export" className="m-0 p-3">
            <ExportTab />
          </TabsContent>
        </div>
      </Tabs>

      {/* Footer Controls */}
      <div className="p-3 border-t">
        <Button variant="outline" size="sm" className="w-full">
          Export Debug Log
        </Button>
      </div>
    </div>
  );
}
