import type { Edge, Node } from "@xyflow/react";
import type { GateNodeProps } from "./types";

export function calculateNodeStates(nodes: Node<GateNodeProps>[], edges: Edge[]): Node<GateNodeProps>[] {
  const updatedNodes = [...nodes];

  const nodeMap = new Map<string, number>();
  updatedNodes.forEach((node, index) => {
    nodeMap.set(node.id, index);
  });
  const incomingEdges = new Map<
    string,
    {
      sourceId: string;
      sourceHandle: string | null;
      targetHandle: string | null;
    }[]
  >();
  edges.forEach((edge) => {
    if (!incomingEdges.has(edge.target)) incomingEdges.set(edge.target, []);
    const targetEdges = incomingEdges.get(edge.target);
    if (targetEdges) {
      targetEdges.push({
        sourceId: edge.source,
        sourceHandle: edge.sourceHandle ?? null,
        targetHandle: edge.targetHandle ?? null,
      });
    }
  });

  const evaluateNode = (nodeId: string, sourceHandle: string | null = null, visited = new Set<string>()): boolean => {
    const visitKey = `${nodeId}:${sourceHandle ?? ""}`;
    if (visited.has(visitKey)) return false;
    visited.add(visitKey);

    const nodeIndex = nodeMap.get(nodeId);
    if (nodeIndex === undefined) return false;

    const node = updatedNodes[nodeIndex];

    if (node.type === "toggleNode") return node.data.state;

    const incoming = incomingEdges.get(nodeId) || [];
    if (incoming.length === 0) {
      if (node.type === "dmuxGate") {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          data: { ...updatedNodes[nodeIndex].data, state: false, outputs: [false, false], inputs: [] },
        };
      } else {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          data: { ...updatedNodes[nodeIndex].data, state: false, inputs: [] },
        };
      }
      return false;
    }

    const evalSource = (e: { sourceId: string; sourceHandle: string | null }) =>
      evaluateNode(e.sourceId, e.sourceHandle, new Set(visited));

    // Unified input collection function
    const collectInputs = (
      incoming: { sourceId: string; sourceHandle: string | null; targetHandle: string | null }[],
    ) => {
      const inputs: boolean[] = [];

      // Collect all inputs by handle index
      incoming.forEach((edge) => {
        let handleIndex = 0;

        if (edge.targetHandle?.startsWith("input-")) {
          // Standard format: "input-0", "input-1", etc.
          handleIndex = parseInt(edge.targetHandle.replace("input-", ""), 10);
        } else if (edge.targetHandle === "input") {
          // Custom format: just "input" (for output nodes)
          handleIndex = 0;
        }

        inputs[handleIndex] = evalSource(edge);
      });

      // Fill missing slots with false (unconnected inputs)
      return inputs.map((input) => input ?? false);
    };

    const inputs = collectInputs(incoming);

    let result = false;

    switch (node.type) {
      case "andGate":
        result = inputs.every(Boolean);
        break;

      case "orGate":
        result = inputs.some(Boolean);
        break;

      case "notGate":
        result = !inputs[0];
        break;

      case "buffGate":
        result = inputs[0] ?? false;
        break;

      case "nandGate":
        result = !inputs.every(Boolean);
        break;

      case "norGate":
        result = !inputs.some(Boolean);
        break;

      case "xorGate":
        result = inputs.filter(Boolean).length % 2 === 1;
        break;

      case "xnorGate":
      case "xnor3Gate":
        result = inputs.filter(Boolean).length % 2 === 0;
        break;
      case "muxGate": {
        const A = inputs[0];
        const B = inputs[1];
        const S = inputs[2];
        result = S ? B : A;
        break;
      }
      case "dmuxGate": {
        const dataIn = inputs[0];
        const sel = inputs[1];
        const Y0 = dataIn && !sel;
        const Y1 = dataIn && sel;

        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          data: {
            ...updatedNodes[nodeIndex].data,
            outputs: [Y0, Y1],
            state: Y0 || Y1,
            inputs: inputs,
          },
        };

        if (sourceHandle === "output-1") return Y1;
        return Y0;
      }
    case "halfAdder": {
      const A = inputs[0] ?? false;
      const B = inputs[1] ?? false;

      const S = A !== B; // Soma (XOR)
      const C = A && B;  // Carry

      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        data: {
          ...updatedNodes[nodeIndex].data,
          outputs: [S, C],
          state: S || C,
          inputs: inputs,
        },
      };

      if (sourceHandle === "output-1") return C;
      return S;
    }

    case "fullAdder": {
      const A   = inputs[0] ?? false;
      const B   = inputs[1] ?? false;
      const Cin = inputs[2] ?? false;

      const sum3 = [A, B, Cin].filter(Boolean).length;
      const S    = sum3 % 2 === 1;   // Sum
      const Co   = sum3 >= 2;        // Carry out

      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        data: {
          ...updatedNodes[nodeIndex].data,
          outputs: [S, Co],
          state: S || Co,
          inputs: inputs,
        },
      };

      if (sourceHandle === "output-1") return Co;
      return S;
    }
      case "outputNode":
        result = inputs[0] ?? false;
        break;

      default:
        result = false;
    }

    updatedNodes[nodeIndex] = {
      ...updatedNodes[nodeIndex],
      data: {
        ...updatedNodes[nodeIndex].data,
        state: result,
        inputs: inputs,
      },
    };

    return result;
  };

  updatedNodes
    .filter((n) => n.type !== "toggleNode")
    .forEach((n) => {
      evaluateNode(n.id);
    });

  return updatedNodes;
}
