import { calculateNodeStates } from "@gately/core/simulator";
import type { GateNodeProps } from "@gately/core/types";
import { type Edge, MarkerType, type Node } from "@xyflow/react";
import type { Settings } from "./use-settings-store";

function parseOutputHandleIndex(handle: string | null | undefined) {
  if (!handle || handle === "output") return 0;

  const rawIndex = handle.startsWith("output-") ? handle.slice("output-".length) : "";
  const index = Number.parseInt(rawIndex, 10);

  return Number.isFinite(index) && index >= 0 ? index : 0;
}

export function styleSimulationEdges(nodes: Node<GateNodeProps>[], edges: Edge[], settings: Settings) {
  const nodeStates = new Map(nodes.map((node) => [node.id, node.data]));

  return edges.map((edge) => {
    const sourceData = nodeStates.get(edge.source);
    const sourceOutputIndex = parseOutputHandleIndex(edge.sourceHandle);
    const sourceState = sourceData?.outputs?.[sourceOutputIndex] ?? sourceData?.state ?? false;
    const color = sourceState ? "var(--color-success)" : "var(--color-primary)";

    return {
      ...edge,
      animated: sourceState && settings.animateConnections,
      type: settings.connectionType,
      style: {
        stroke: color,
        strokeWidth: 2,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color,
      },
    };
  });
}

export function simulateCircuit(nodes: Node<GateNodeProps>[], edges: Edge[], settings: Settings) {
  const simulatedNodes = calculateNodeStates(nodes, edges);
  const styledEdges = styleSimulationEdges(simulatedNodes, edges, settings);

  return { nodes: simulatedNodes, edges: styledEdges };
}
