export interface PortableCircuit {
  version: "1.0.0";
  metadata: {
    name: string; // From file name
    exported: string; // Auto-timestamp
    originalId?: string; // File ID for re-import
  };
  circuit: {
    nodes: PortableNode[]; // Essential node data only
    connections: PortableConnection[];
  };
}

export interface PortableNode {
  id: string;
  type: string; // "andGate", "toggleNode", etc.
  position: { x: number; y: number };
  label: string;

  // Current state (optional - for debugging/state export)
  state?: boolean;

  // Configuration for dynamic gates
  configuration?: {
    inputCount?: number; // For dynamic input gates
    outputCount?: number; // For dynamic output gates
    customProperties?: Record<string, unknown>;
  };

  // Runtime state (optional - debugging only)
  runtime?: {
    inputs?: boolean[];
    outputs?: boolean[];
  };
}

export interface PortableConnection {
  id: string;
  source: {
    nodeId: string;
    handleId?: string; // "output", "output-0", etc.
  };
  target: {
    nodeId: string;
    handleId?: string; // "input-0", "input-1", etc.
  };

  // Optional metadata
  metadata?: {
    signalState?: boolean; // For debugging
    connectionType?: "data" | "control" | "select";
  };
}
