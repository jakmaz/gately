import type { GateNodeProps } from "@gately/core/types";
import type { Node } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import { Download, Upload } from "lucide-react";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { useExport } from "../../hooks/use-export";
import { useFileSystem } from "../../hooks/use-file-system";
import { Button } from "../ui/button";

export function ImportExportButtons() {
  const reactFlow = useReactFlow();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getCurrentFile, createItem, switchToFile } = useFileSystem();
  const { exportCircuit, importCircuit, isExporting, isImporting } = useExport();

  const handleExport = async () => {
    const nodes = reactFlow.getNodes();
    const edges = reactFlow.getEdges();
    const file = getCurrentFile();

    // Pass everything to store
    await exportCircuit({
      nodes,
      edges,
      fileName: file?.name || "circuit",
      fileId: file?.id,
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".json")) {
      return; // Error handling is done in the import function
    }

    const result = await importCircuit(file);
    if (result?.success) {
      // Create a new file with the imported data
      const newFileId = nanoid();
      const newFile = {
        id: newFileId,
        name: result.fileName,
        type: "file" as const,
        data: {
          nodes: result.nodes as Node<GateNodeProps>[],
          edges: result.edges,
        },
      };

      // Add to file system and switch to it
      createItem(null, newFile); // Add to root level
      switchToFile(newFileId);

      // Update the React Flow canvas with imported data
      reactFlow.setNodes(result.nodes);
      reactFlow.setEdges(result.edges);
    }

    // Reset the file input
    if (event.target) {
      (event.target as HTMLInputElement).value = "";
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleExport}
        disabled={isExporting}
        title="Export Circuit"
        className="p-2"
      >
        <Download className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleImportClick}
        disabled={isImporting}
        title="Import Circuit"
        className="p-2"
      >
        <Upload className="h-4 w-4" />
      </Button>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileSelect} style={{ display: "none" }} />
    </div>
  );
}
