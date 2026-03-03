"use client";

import { useReactFlow } from "@xyflow/react";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebugData } from "@/hooks/use-debug-data";
import { useExport } from "@/hooks/use-export";
import { useFileSystem } from "@/hooks/use-file-system";
import type { GateNodeProps } from "@/lib/types";

export function ExportTab() {
  const reactFlow = useReactFlow();
  const { exportCircuit } = useExport();
  const { getCurrentFile } = useFileSystem();
  const { debugInfo } = useDebugData();

  const nodes = reactFlow.getNodes();
  const edges = reactFlow.getEdges();
  const currentFile = getCurrentFile();

  const handleExportCircuit = async () => {
    await exportCircuit({
      nodes,
      edges,
      fileName: currentFile?.name || "debug-circuit",
      fileId: currentFile?.id,
    });
  };

  const handleCopyDebugData = () => {
    const debugData = {
      timestamp: new Date().toISOString(),
      circuit: {
        nodes: nodes.length,
        edges: edges.length,
        fileName: currentFile?.name || "untitled",
      },
      performance: debugInfo.performance,
      warnings: debugInfo.warnings,
      errors: debugInfo.errors,
      nodeDetails: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        state: (node.data as GateNodeProps)?.state,
        inputs: (node.data as GateNodeProps)?.inputs,
        outputs: (node.data as GateNodeProps)?.outputs,
      })),
    };

    navigator.clipboard
      .writeText(JSON.stringify(debugData, null, 2))
      .then(() => {
        toast.success("Debug data copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy debug data");
      });
  };

  const circuitSummary = {
    metadata: {
      name: currentFile?.name || "untitled",
      timestamp: new Date().toISOString(),
      nodeCount: nodes.length,
      edgeCount: edges.length,
    },
    performance: debugInfo.performance,
    health: {
      warnings: debugInfo.warnings.length,
      errors: debugInfo.errors.length,
    },
  };

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Quick Actions</h4>
        <div className="flex flex-col gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCircuit} className="justify-start">
            <Download className="h-4 w-4 mr-2" />
            Export Circuit
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyDebugData} className="justify-start">
            <Copy className="h-4 w-4 mr-2" />
            Copy Debug Data
          </Button>
        </div>
      </div>

      {/* Circuit Summary */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Circuit Summary</h4>
        <ScrollArea className="h-32 border rounded">
          <pre className="p-2 text-xs font-mono">{JSON.stringify(circuitSummary, null, 2)}</pre>
        </ScrollArea>
      </div>

      {/* Node Details */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Current Node States</h4>
        <ScrollArea className="h-48 border rounded">
          <div className="p-2 text-xs font-mono space-y-2">
            {nodes.map((node) => {
              const data = node.data as GateNodeProps;
              return (
                <div key={node.id} className="border rounded p-2 bg-background">
                  <div className="font-medium">{node.id}</div>
                  <div className="text-muted-foreground mt-1">
                    Type: {node.type}
                    <br />
                    State: {String(data?.state)}
                    <br />
                    {data?.inputs && `Inputs: [${data.inputs.map((i: boolean) => (i ? "1" : "0")).join(", ")}]`}
                    <br />
                    {data?.outputs && `Outputs: [${data.outputs.map((o: boolean) => (o ? "1" : "0")).join(", ")}]`}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Help */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>
          <strong>Export Circuit:</strong> Downloads the circuit as a portable JSON file
        </p>
        <p>
          <strong>Copy Debug Data:</strong> Copies detailed debug information to clipboard
        </p>
      </div>
    </div>
  );
}
