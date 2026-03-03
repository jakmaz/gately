import type { Edge, Node } from "@xyflow/react";
import { toast } from "sonner";
import { create } from "zustand";
import { downloadJSON } from "@/lib/export/download";
import { transformToPortable } from "@/lib/export/transform";

interface ExportData {
  nodes: Node[];
  edges: Edge[];
  fileName?: string;
  fileId?: string;
}

interface ExportState {
  // Runtime state
  isExporting: boolean;

  // Actions
  exportCircuit: (data: ExportData) => Promise<void>;
}

export const useExport = create<ExportState>((set) => ({
  isExporting: false,

  exportCircuit: async (data: ExportData) => {
    set({ isExporting: true });

    try {
      const portableCircuit = transformToPortable(data.nodes, data.edges, {
        name: data.fileName || "circuit",
        originalId: data.fileId,
      });

      const filename = `${data.fileName || "circuit"}.json`;
      downloadJSON(portableCircuit, filename);

      toast.success(`Exported "${filename}" successfully`);
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export circuit");
    } finally {
      set({ isExporting: false });
    }
  },
}));
