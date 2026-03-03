import { Node, Edge } from "reactflow";
import { GateNodeProps } from "./types";

export function calculateNodeStates(nodes: Node<GateNodeProps>[], edges: Edge[]): Node<GateNodeProps>[] {
  const updatedNodes = [...nodes];

  const nodeMap = new Map<string, number>();
  updatedNodes.forEach((node, index) => nodeMap.set(node.id, index));

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
    incomingEdges.get(edge.target)!.push({
      sourceId: edge.source,
      sourceHandle: edge.sourceHandle ?? null,
      targetHandle: edge.targetHandle ?? null,
    });
  });

  const evaluateNode = (nodeId: string, sourceHandle: string | null = null, visited = new Set<string>()): boolean => {
    const visitKey = `${nodeId}:${sourceHandle ?? ""}`;
    if (visited.has(visitKey)) return false;
    visited.add(visitKey);

    const nodeIndex = nodeMap.get(nodeId);
    if (nodeIndex === undefined) return false;

    const node = updatedNodes[nodeIndex];

    if (node.type === "inputNode") return node.data.state;

    const incoming = incomingEdges.get(nodeId) || [];
    if (incoming.length === 0) {
      if (node.type === "dmuxGate") {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          data: { ...updatedNodes[nodeIndex].data, state: false, outputs: [false, false] },
        };
      } else {
        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          data: { ...updatedNodes[nodeIndex].data, state: false },
        };
      }
      return false;
    }

    const evalSource = (e: { sourceId: string; sourceHandle: string | null }) =>
      evaluateNode(e.sourceId, e.sourceHandle, new Set(visited));

    const getByHandle = (handleId: string): boolean => {
      const match = incoming.find((e) => e.targetHandle === handleId);
      return match ? evalSource(match) : false;
    };

    const orderedInputs = [...incoming]
      .sort((a, b) => {
        const ai = parseInt(a.targetHandle?.replace("input-", "") ?? "0");
        const bi = parseInt(b.targetHandle?.replace("input-", "") ?? "0");
        return ai - bi;
      })
      .map(evalSource);

    let result = false;

    switch (node.type) {
      case "andGate":
        result = orderedInputs.every(Boolean);
        break;

      case "orGate":
        result = orderedInputs.some(Boolean);
        break;

      case "notGate":
        result = !orderedInputs[0];
        break;

      case "buffGate":
        result = orderedInputs[0] ?? false;
        break;

      case "nandGate":
        result = !orderedInputs.every(Boolean);
        break;

      case "norGate":
        result = !orderedInputs.some(Boolean);
        break;

      case "xorGate":
        result = orderedInputs.filter(Boolean).length % 2 === 1;
        break;

      case "xnorGate":
      case "xnor3Gate":
        result = orderedInputs.filter(Boolean).length % 2 === 0;
        break;
      case "muxGate": {
        const A = getByHandle("input-0");
        const B = getByHandle("input-1");
        const S = getByHandle("input-2");
        result = S ? B : A;
        break;
      }
      case "dmuxGate": {
        const dataIn = getByHandle("input-0");
        const sel = getByHandle("input-1");
        const Y0 = dataIn && !sel;
        const Y1 = dataIn && sel;

        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          data: {
            ...updatedNodes[nodeIndex].data,
            outputs: [Y0, Y1],
            state: Y0 || Y1,
          },
        };

        if (sourceHandle === "output-1") return Y1;
        return Y0;
      }
    case "halfAdder": {
        const A = getByHandle("input-0");
        const B = getByHandle("input-1");
        const S  = A !== B;        
        const C  = A && B;          

        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          data: {
            ...updatedNodes[nodeIndex].data,
            outputs: [S, C],
            state: S || C,
          },
        };

        if (sourceHandle === "output-1") return C;
        return S; 
      }

      // input-0 = A, input-1 = B, input-2 = Cin
      // output-0 = Sum, output-1 = Cout
      case "fullAdder": {
        const A   = getByHandle("input-0");
        const B   = getByHandle("input-1");
        const Cin = getByHandle("input-2");

        const sum3  = [A, B, Cin].filter(Boolean).length;
        const S     = sum3 % 2 === 1;    
        const Co    = sum3 >= 2;         

        updatedNodes[nodeIndex] = {
          ...updatedNodes[nodeIndex],
          data: {
            ...updatedNodes[nodeIndex].data,
            outputs: [S, Co],
            state: S || Co,
          },
        };

        if (sourceHandle === "output-1") return Co;
        return S;
      }
      case "outputNode":
        result = orderedInputs[0] ?? false;
        break;

      default:
        result = false;
    }

    updatedNodes[nodeIndex] = {
      ...updatedNodes[nodeIndex],
      data: { ...updatedNodes[nodeIndex].data, state: result },
    };

    return result;
  };

  updatedNodes.filter((n) => n.type !== "inputNode").forEach((n) => evaluateNode(n.id));

  return updatedNodes;
}
