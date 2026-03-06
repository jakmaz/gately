"use client";

import { useReactFlow } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";
import { useDebugData } from "@/hooks/use-debug-data";

export function PerformanceTab() {
  const reactFlow = useReactFlow();
  const { debugInfo } = useDebugData();

  const nodes = reactFlow.getNodes();
  const edges = reactFlow.getEdges();

  return (
    <div className="space-y-4">
      {/* Performance Metrics */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Performance Metrics</h4>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div className="bg-muted rounded p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Evaluation Time</span>
              <Badge variant="outline">{debugInfo.performance.evaluationTime.toFixed(2)}ms</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Nodes</span>
              <Badge variant="outline">{debugInfo.performance.totalNodes}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Edges</span>
              <Badge variant="outline">{debugInfo.performance.totalEdges}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Max Depth</span>
              <Badge variant="outline">{debugInfo.performance.maxDepth}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Circuit Health */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Circuit Health</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-muted rounded">
            <span className="text-xs font-medium">Cycle Detection</span>
            <Badge variant={debugInfo.performance.cycleDetected ? "destructive" : "default"} className="text-xs">
              {debugInfo.performance.cycleDetected ? "Cycle Detected" : "No Cycles"}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 bg-muted rounded">
            <span className="text-xs font-medium">Performance Rating</span>
            <Badge
              variant={
                debugInfo.performance.evaluationTime < 1
                  ? "default"
                  : debugInfo.performance.evaluationTime < 5
                    ? "secondary"
                    : "destructive"
              }
              className="text-xs"
            >
              {debugInfo.performance.evaluationTime < 1
                ? "Excellent"
                : debugInfo.performance.evaluationTime < 5
                  ? "Good"
                  : "Slow"}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 bg-muted rounded">
            <span className="text-xs font-medium">Complexity</span>
            <Badge
              variant={nodes.length < 10 ? "default" : nodes.length < 50 ? "secondary" : "outline"}
              className="text-xs"
            >
              {nodes.length < 10 ? "Simple" : nodes.length < 50 ? "Medium" : "Complex"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Memory Usage Simulation */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Resource Usage</h4>
        <div className="space-y-2 text-xs">
          <div className="bg-muted rounded p-2">
            <div className="font-medium mb-1">Component Breakdown</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Input Nodes:</span>
                <span>{nodes.filter((n) => n.type === "toggleNode").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Output Nodes:</span>
                <span>{nodes.filter((n) => n.type === "outputNode").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Logic Gates:</span>
                <span>{nodes.filter((n) => !["toggleNode", "outputNode"].includes(n.type || "")).length}</span>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded p-2">
            <div className="font-medium mb-1">Connection Analysis</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Total Connections:</span>
                <span>{edges.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Connections/Node:</span>
                <span>{nodes.length > 0 ? (edges.length / nodes.length).toFixed(1) : 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Update */}
      <div className="text-xs text-muted-foreground">Last updated: {debugInfo.lastUpdate.toLocaleTimeString()}</div>
    </div>
  );
}
