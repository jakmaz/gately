"use client";

import { useReactFlow } from "@xyflow/react";
import { Circle, CircleAlert, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebugData } from "@/hooks/use-debug-data";
import type { GateNodeProps } from "@/lib/types";

export function SimulationTab() {
  const reactFlow = useReactFlow();
  const { debugInfo } = useDebugData();

  const nodes = reactFlow.getNodes();
  const edges = reactFlow.getEdges();

  const getStateIcon = (state: boolean | undefined) => {
    if (state === undefined) {
      return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
    return <Circle className={`h-3 w-3 ${state ? "text-green-600 fill-green-600" : "text-red-600 fill-red-600"}`} />;
  };

  const getInputsDisplay = (inputs: boolean[] | undefined) => {
    if (!inputs || inputs.length === 0) {
      return <span className="text-xs text-muted-foreground">None</span>;
    }

    return (
      <div className="flex gap-1 flex-wrap">
        {inputs.map((input, index) => (
          <Badge key={`input-${index}`} variant={input ? "default" : "secondary"} className="text-xs px-1.5 py-0">
            {index}: {input ? "1" : "0"}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Circuit Summary */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Circuit Overview</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted rounded p-2">
            <div className="font-medium">Nodes</div>
            <div>{nodes.length}</div>
          </div>
          <div className="bg-muted rounded p-2">
            <div className="font-medium">Connections</div>
            <div>{edges.length}</div>
          </div>
        </div>
      </div>

      {/* Node States */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Node States</h4>
        <ScrollArea className="h-48 border rounded">
          <div className="p-2 space-y-2">
            {nodes.map((node) => {
              const data = node.data as GateNodeProps;
              return (
                <div key={node.id} className="border rounded p-2 space-y-1 text-xs bg-background">
                  <div className="flex items-center justify-between">
                    <div className="font-medium truncate">{node.id}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {node.type}
                      </Badge>
                      {getStateIcon(data?.state)}
                    </div>
                  </div>

                  {data?.inputs && (
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Inputs:</div>
                      {getInputsDisplay(data.inputs)}
                    </div>
                  )}

                  {data?.outputs && (
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Outputs:</div>
                      {getInputsDisplay(data.outputs)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Warnings & Errors */}
      {debugInfo.warnings.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <CircleAlert className="h-4 w-4 text-yellow-600" />
            Warnings
          </h4>
          <div className="space-y-1">
            {debugInfo.warnings.map((warning: string, index: number) => (
              <div
                key={`warning-${index}`}
                className="text-xs p-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded border"
              >
                {warning}
              </div>
            ))}
          </div>
        </div>
      )}

      {debugInfo.errors.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <CircleAlert className="h-4 w-4 text-red-600" />
            Errors
          </h4>
          <div className="space-y-1">
            {debugInfo.errors.map((error: string, index: number) => (
              <div
                key={`error-${index}`}
                className="text-xs p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded border"
              >
                {error}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
