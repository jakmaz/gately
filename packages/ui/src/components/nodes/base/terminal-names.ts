import type { GateNodeProps } from "@gately/core/types";
import type { Node } from "@xyflow/react";

type TerminalType = "toggleNode" | "pushNode" | "outputNode";

export function isTerminalType(type: string | undefined): type is TerminalType {
  return type === "toggleNode" || type === "pushNode" || type === "outputNode";
}

/** Toggle and push inputs share the same numbering; existing labels are reserved. */
export function getNextTerminalName(type: TerminalType, nodes: readonly Node<GateNodeProps>[]) {
  const prefix = type === "outputNode" ? "Q" : "I";
  const names = new Set(nodes.map((node) => node.data.label.trim()));
  let index = 1;
  while (names.has(`${prefix}${index}`)) index++;
  return `${prefix}${index}`;
}
