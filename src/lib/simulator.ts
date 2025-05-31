import { Node, Edge } from "reactflow";
import { GateNodeProps } from "./types";

// Evaluate the state of all nodes in the circuit
export function calculateNodeStates(
  nodes: Node<GateNodeProps>[],
  edges: Edge[],
): Node<GateNodeProps>[] {
  // Create a copy of the nodes to work with
  const updatedNodes = [...nodes];

  // Create a map of node IDs to their indices in the array for quick lookups
  const nodeMap = new Map<string, number>();
  updatedNodes.forEach((node, index) => {
    nodeMap.set(node.id, index);
  });

  // Create a dependency graph to track which nodes need to be updated when an input changes
  const dependencies = new Map<string, string[]>();
  edges.forEach((edge) => {
    if (!dependencies.has(edge.target)) {
      dependencies.set(edge.target, []);
    }
    dependencies.get(edge.target)?.push(edge.source);
  });

  // Function to evaluate a node's state based on its inputs
  const evaluateNode = (
    nodeId: string,
    visited = new Set<string>(),
  ): boolean => {
    // Prevent infinite loops in case of cyclic connections
    if (visited.has(nodeId)) {
      return false;
    }
    visited.add(nodeId);

    const nodeIndex = nodeMap.get(nodeId);
    if (nodeIndex === undefined) {
      return false;
    }

    const node = updatedNodes[nodeIndex];

    // Input nodes already have their state set
    if (node.type === "inputNode") {
      return node.data.state;
    }

    // Get incoming edges for this node
    const incomingEdgeSourceIds = dependencies.get(nodeId) || [];

    // No inputs yet, return false
    if (incomingEdgeSourceIds.length === 0) {
      return false;
    }

    // Evaluate all inputs
    const inputStates = incomingEdgeSourceIds.map((sourceId) =>
      evaluateNode(sourceId, new Set(visited)),
    );

    // Store input states on the node
    updatedNodes[nodeIndex] = {
      ...node,
      data: {
        ...node.data,
        inputs: inputStates,
      },
    };

    // Calculate the output based on gate type
    let result = false;

    switch (node.type) {
      case "andGate":
        result = inputStates.every((state) => state);
        break;
      case "orGate":
        result = inputStates.some((state) => state);
        break;
      case "notGate":
        result = !inputStates[0];
        break;
      case "nandGate":
        result = !inputStates.every((state) => state);
        break;
      case "norGate":
        result = !inputStates.some((state) => state);
        break;
      case "xorGate":
        result = inputStates.filter((state) => state).length % 2 === 1;
        break;
      case "xnorGate":
        result = inputStates.filter((state) => state).length % 2 === 0;
        break;
      case "outputNode":
        result = inputStates[0] || false;
        break;
      default:
        result = false;
    }

    // Update the node state
    updatedNodes[nodeIndex] = {
      ...updatedNodes[nodeIndex],
      data: {
        ...updatedNodes[nodeIndex].data,
        state: result,
      },
    };

    return result;
  };

  // Evaluate all output nodes to trigger the evaluation of their dependencies
  updatedNodes
    .filter(
      (node) =>
        node.type === "outputNode" ||
        [
          "andGate",
          "orGate",
          "notGate",
          "nandGate",
          "norGate",
          "xorGate",
          "xnorGate",
        ].includes(node.type || ""),
    )
    .forEach((node) => {
      evaluateNode(node.id);
    });

  return updatedNodes;
}
