import { useNodes, useEdges } from "reactflow";
import { useEffect } from "react";
import { FileExplorer } from "./file-explorer";
import { SimulatorCanvas } from "./simulator-canvas";
import { GateNodeProps } from "@/lib/types";
import { Node, Edge } from "reactflow";

interface SimulatorContentProps {
  sidebarCollapsed: boolean;
  currentFileName: string;
  currentFileId: string;
  switchToFile: (fileId: string) => void;
  updateFileContent: (fileId: string, data: { nodes: Node<GateNodeProps>[]; edges: Edge[] }) => void;
  ready: boolean;
}

export function SimulatorContent({
  sidebarCollapsed,
  currentFileName,
  currentFileId,
  switchToFile,
  updateFileContent,
  ready
}: SimulatorContentProps) {
  const nodes = useNodes<GateNodeProps>();
  const edges = useEdges();

  // Auto-save current circuit when nodes or edges change
  useEffect(() => {
    console.log("saving")
    if (currentFileId && ready && (nodes.length > 0 || edges.length > 0)) {
      const saveTimeout = setTimeout(() => {
        console.debug("Saving file", currentFileId);
        updateFileContent(currentFileId, { nodes, edges });
      }, 1000);

      return () => clearTimeout(saveTimeout);
    }
  }, [nodes, edges, currentFileId, ready, updateFileContent]);

  return (
    <>
      <FileExplorer
        isCollapsed={sidebarCollapsed}
        nodes={nodes}
        edges={edges}
        currentFileName={currentFileName}
        onFileSelect={switchToFile}
        currentFileId={currentFileId}
      />
      <SimulatorCanvas />
    </>
  );
}
