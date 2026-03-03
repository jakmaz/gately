import { create } from "zustand";

interface DebugInfo {
  // Simulation State
  performance: {
    totalNodes: number;
    totalEdges: number;
    evaluationTime: number;
    maxDepth: number;
    cycleDetected: boolean;
  };

  // Circuit Health
  warnings: string[];
  errors: string[];
  lastUpdate: Date;
}

interface DebugDataState {
  debugInfo: DebugInfo;
  updateDebugInfo: (info: Partial<DebugInfo>) => void;
  addWarning: (warning: string) => void;
  addError: (error: string) => void;
  clearMessages: () => void;
}

const initialDebugInfo: DebugInfo = {
  performance: {
    totalNodes: 0,
    totalEdges: 0,
    evaluationTime: 0,
    maxDepth: 0,
    cycleDetected: false,
  },
  warnings: [],
  errors: [],
  lastUpdate: new Date(),
};

export const useDebugData = create<DebugDataState>((set) => ({
  debugInfo: initialDebugInfo,

  updateDebugInfo: (info: Partial<DebugInfo>) =>
    set((state) => ({
      debugInfo: {
        ...state.debugInfo,
        ...info,
        lastUpdate: new Date(),
      },
    })),

  addWarning: (warning: string) =>
    set((state) => ({
      debugInfo: {
        ...state.debugInfo,
        warnings: [...state.debugInfo.warnings, warning],
        lastUpdate: new Date(),
      },
    })),

  addError: (error: string) =>
    set((state) => ({
      debugInfo: {
        ...state.debugInfo,
        errors: [...state.debugInfo.errors, error],
        lastUpdate: new Date(),
      },
    })),

  clearMessages: () =>
    set((state) => ({
      debugInfo: {
        ...state.debugInfo,
        warnings: [],
        errors: [],
        lastUpdate: new Date(),
      },
    })),
}));
