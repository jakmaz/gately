import type { Edge, Node } from "@xyflow/react";
import type { GateNodeProps } from "./types";

type IncomingEdge = {
  sourceId: string;
  sourceHandle: string | null;
  targetHandle: string | null;
};

type Evaluation = {
  state: boolean;
  inputs: boolean[];
  outputs: boolean[];
};

const INPUT_COUNTS: Record<string, number> = {
  outputNode: 1,
  buffGate: 1,
  notGate: 1,
  andGate: 2,
  nandGate: 2,
  orGate: 2,
  norGate: 2,
  xorGate: 2,
  xnorGate: 2,
  xnor3Gate: 3,
  muxGate: 3,
  dmuxGate: 2,
};

const SOURCE_NODE_TYPES = new Set(["toggleNode", "pushNode"]);

function parseHandleIndex(handle: string | null, prefix: "input" | "output") {
  if (!handle || handle === prefix) return 0;

  const rawIndex = handle.startsWith(`${prefix}-`) ? handle.slice(prefix.length + 1) : "";
  const index = Number.parseInt(rawIndex, 10);

  return Number.isFinite(index) && index >= 0 ? index : 0;
}

function getInputCount(nodeType: string | undefined) {
  if (!nodeType) return 0;
  return INPUT_COUNTS[nodeType] ?? 0;
}

function evaluateGate(nodeType: string | undefined, inputs: boolean[]): Evaluation {
  switch (nodeType) {
    case "andGate": {
      const state = inputs.every(Boolean);
      return { state, inputs, outputs: [state] };
    }

    case "orGate": {
      const state = inputs.some(Boolean);
      return { state, inputs, outputs: [state] };
    }

    case "notGate": {
      const state = !inputs[0];
      return { state, inputs, outputs: [state] };
    }

    case "buffGate":
    case "outputNode": {
      const state = inputs[0] ?? false;
      return { state, inputs, outputs: [state] };
    }

    case "nandGate": {
      const state = !inputs.every(Boolean);
      return { state, inputs, outputs: [state] };
    }

    case "norGate": {
      const state = !inputs.some(Boolean);
      return { state, inputs, outputs: [state] };
    }

    case "xorGate": {
      const state = inputs.filter(Boolean).length % 2 === 1;
      return { state, inputs, outputs: [state] };
    }

    case "xnorGate":
    case "xnor3Gate": {
      const state = inputs.filter(Boolean).length % 2 === 0;
      return { state, inputs, outputs: [state] };
    }

    case "muxGate": {
      const [a, b, select] = inputs;
      const state = select ? b : a;
      return { state, inputs, outputs: [state] };
    }

    case "dmuxGate": {
      const [dataIn, select] = inputs;
      const outputs = [dataIn && !select, dataIn && select];
      return { state: outputs.some(Boolean), inputs, outputs };
    }

    default:
      return { state: false, inputs, outputs: [false] };
  }
}

export function calculateNodeStates(nodes: Node<GateNodeProps>[], edges: Edge[]): Node<GateNodeProps>[] {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const incomingByTarget = new Map<string, IncomingEdge[]>();
  const cache = new Map<string, Evaluation>();
  const visiting = new Set<string>();

  edges.forEach((edge) => {
    const incoming = incomingByTarget.get(edge.target) ?? [];
    incoming.push({
      sourceId: edge.source,
      sourceHandle: edge.sourceHandle ?? null,
      targetHandle: edge.targetHandle ?? null,
    });
    incomingByTarget.set(edge.target, incoming);
  });

  const evaluateNode = (nodeId: string): Evaluation => {
    const cached = cache.get(nodeId);
    if (cached) return cached;

    const node = nodeById.get(nodeId);
    if (!node) return { state: false, inputs: [], outputs: [false] };

    if (SOURCE_NODE_TYPES.has(node.type ?? "")) {
      const state = node.data.state;
      const evaluation = { state, inputs: [], outputs: [state] };
      cache.set(nodeId, evaluation);
      return evaluation;
    }

    if (visiting.has(nodeId)) {
      const inputCount = getInputCount(node.type);
      return { state: false, inputs: Array(inputCount).fill(false), outputs: [false] };
    }

    visiting.add(nodeId);

    const inputs = Array(getInputCount(node.type)).fill(false) as boolean[];
    const incoming = incomingByTarget.get(nodeId) ?? [];

    incoming.forEach((edge) => {
      const source = evaluateNode(edge.sourceId);
      const inputIndex = parseHandleIndex(edge.targetHandle, "input");
      const outputIndex = parseHandleIndex(edge.sourceHandle, "output");
      inputs[inputIndex] = source.outputs[outputIndex] ?? false;
    });

    const evaluation = evaluateGate(node.type, inputs);
    visiting.delete(nodeId);
    cache.set(nodeId, evaluation);

    return evaluation;
  };

  return nodes.map((node) => {
    const evaluation = evaluateNode(node.id);

    return {
      ...node,
      data: {
        ...node.data,
        state: evaluation.state,
        inputs: evaluation.inputs,
        outputs: evaluation.outputs,
      },
    };
  });
}
