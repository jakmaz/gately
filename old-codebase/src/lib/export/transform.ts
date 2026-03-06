import type { Edge, Node } from "@xyflow/react";
import type { CircuitData, GateNodeProps } from "../types";
import type { PortableCircuit, PortableConnection, PortableNode } from "./formats";

interface NodeDataPartial {
  label?: string;
  state?: boolean;
  inputs?: boolean[];
  outputs?: boolean[];
}

interface TransformMetadata {
  name: string;
  originalId?: string;
}

export function transformToPortable(nodes: Node[], edges: Edge[], metadata: TransformMetadata): PortableCircuit {
  // Transform nodes - handle generic Node type with type-safe data access
  const portableNodes: PortableNode[] = nodes.map((node) => {
    const nodeData = node.data as NodeDataPartial;

    return {
      id: node.id,
      type: node.type || "unknown",
      position: node.position,
      label: nodeData?.label || node.type || "Unknown",
      state: nodeData?.state,
      runtime: {
        inputs: nodeData?.inputs,
        outputs: nodeData?.outputs,
      },
    };
  });

  // Transform connections
  const portableConnections: PortableConnection[] = edges.map((edge) => ({
    id: edge.id,
    source: {
      nodeId: edge.source,
      handleId: edge.sourceHandle || undefined,
    },
    target: {
      nodeId: edge.target,
      handleId: edge.targetHandle || undefined,
    },
  }));

  return {
    version: "1.0.0",
    metadata: {
      name: metadata.name,
      exported: new Date().toISOString(),
      originalId: metadata.originalId,
    },
    circuit: {
      nodes: portableNodes,
      connections: portableConnections,
    },
  };
}

// Reverse transformation (for future import)
export function transformFromPortable(circuit: PortableCircuit): CircuitData {
  // Transform portable nodes back to ReactFlow nodes
  const nodes: Node<GateNodeProps>[] = circuit.circuit.nodes.map((portableNode) => ({
    id: portableNode.id,
    type: portableNode.type,
    position: portableNode.position,
    data: {
      label: portableNode.label,
      state: portableNode.state || false,
      inputs: portableNode.runtime?.inputs,
      outputs: portableNode.runtime?.outputs,
    },
  }));

  // Transform portable connections back to ReactFlow edges
  const edges: Edge[] = circuit.circuit.connections.map((connection) => ({
    id: connection.id,
    source: connection.source.nodeId,
    target: connection.target.nodeId,
    sourceHandle: connection.source.handleId || null,
    targetHandle: connection.target.handleId || null,
  }));

  return { nodes, edges };
}
