import {
  downloadJSON,
  type PortableCircuit,
  transformFromPortable,
  transformToPortable,
  validateCircuit,
} from "@gately/core/export";
import type { Edge, Node } from "@xyflow/react";
import { toast } from "sonner";
import { create } from "zustand";

interface ExportData {
  nodes: Node[];
  edges: Edge[];
  fileName?: string;
  fileId?: string;
}

interface ImportResult {
  success: boolean;
  nodes: Node[];
  edges: Edge[];
  fileName: string;
}

interface ExportState {
  // Runtime state
  isExporting: boolean;
  isImporting: boolean;

  // Actions
  exportCircuit: (data: ExportData) => Promise<void>;
  importCircuit: (file: File) => Promise<ImportResult | null>;
  importFromJSON: (jsonString: string, fileName?: string) => Promise<ImportResult | null>;
}

export const useExport = create<ExportState>((set, get) => ({
  isExporting: false,
  isImporting: false,

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

  importCircuit: async (file: File) => {
    set({ isImporting: true });

    try {
      const text = await file.text();
      const result = await get().importFromJSON(text, file.name.replace(".json", ""));
      return result;
    } catch (error) {
      console.error("Import failed:", error);
      toast.error(`Failed to import "${file.name}"`);
      return null;
    } finally {
      set({ isImporting: false });
    }
  },

  importFromJSON: async (jsonString: string, fileName?: string) => {
    try {
      // Parse JSON
      const portableCircuit: PortableCircuit = JSON.parse(jsonString);

      // Validate the circuit data
      const validation = validateCircuit(portableCircuit);

      if (!validation.valid) {
        const errorMsg = `Invalid circuit file: ${validation.errors.join(", ")}`;
        toast.error(errorMsg);
        return null;
      }

      // Show warnings if any
      if (validation.warnings.length > 0) {
        validation.warnings.forEach((warning) => {
          toast.warning(warning);
        });
      }

      // Transform to ReactFlow format
      const { nodes, edges } = transformFromPortable(portableCircuit);

      const finalFileName = fileName || portableCircuit.metadata?.name || "imported-circuit";

      toast.success(`Imported "${finalFileName}" successfully`);

      return {
        success: true,
        nodes,
        edges,
        fileName: finalFileName,
      };
    } catch (error) {
      console.error("JSON parsing failed:", error);
      toast.error("Invalid JSON format");
      return null;
    }
  },
}));
