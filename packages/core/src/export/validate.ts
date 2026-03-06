import type { PortableCircuit, PortableConnection, PortableNode } from "./formats";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateCircuit(circuit: PortableCircuit): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check basic structure
  if (!circuit.version) {
    errors.push("Missing version field");
  }

  if (!circuit.metadata?.name) {
    warnings.push("Circuit has no name");
  }

  if (!circuit.circuit?.nodes || !Array.isArray(circuit.circuit.nodes)) {
    errors.push("Missing or invalid nodes array");
  }

  if (!circuit.circuit?.connections || !Array.isArray(circuit.circuit.connections)) {
    errors.push("Missing or invalid connections array");
  }

  // Validate nodes
  if (circuit.circuit?.nodes) {
    circuit.circuit.nodes.forEach((node, index) => {
      if (!validateNode(node)) {
        errors.push(`Invalid node at index ${index}: ${node.id}`);
      }
    });
  }

  // Validate connections
  if (circuit.circuit?.connections) {
    circuit.circuit.connections.forEach((conn, index) => {
      if (!validateConnection(conn)) {
        errors.push(`Invalid connection at index ${index}: ${conn.id}`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateNode(node: PortableNode): boolean {
  if (!node.id || typeof node.id !== "string") return false;
  if (!node.type || typeof node.type !== "string") return false;
  if (!node.position || typeof node.position.x !== "number" || typeof node.position.y !== "number") return false;
  if (!node.label || typeof node.label !== "string") return false;

  return true;
}

export function validateConnection(conn: PortableConnection): boolean {
  if (!conn.id || typeof conn.id !== "string") return false;
  if (!conn.source?.nodeId || typeof conn.source.nodeId !== "string") return false;
  if (!conn.target?.nodeId || typeof conn.target.nodeId !== "string") return false;

  return true;
}
