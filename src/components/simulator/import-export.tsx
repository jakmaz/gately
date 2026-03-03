import { useReactFlow } from "@xyflow/react";
import { Download, Upload } from "lucide-react";
import { useExport } from "@/hooks/use-export";
import { useFileSystem } from "@/hooks/use-file-system";
import { Button } from "../ui/button";

export function ImportExportButtons() {
  const reactFlow = useReactFlow();
  const { getCurrentFile } = useFileSystem();
  const { exportCircuit, isExporting } = useExport();

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
        disabled
        variant="ghost"
        size="sm"
        onClick={() => console.log("import")}
        title="Import Circuit"
        className="p-2"
      >
        <Upload className="h-4 w-4" />
      </Button>
    </div>
  );
}
