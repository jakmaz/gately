import type { Edge, Node } from "@xyflow/react";

export interface GateNodeProps {
  label: string;
  state: boolean;
  inputs?: boolean[];
  outputs?: boolean[];
  preview?: boolean;
  [key: string]: unknown;
}

export interface LogicGateProps {
  id: string;
  data: GateNodeProps;
  isConnectable: boolean;
}

export interface CircuitData {
  nodes: Node<GateNodeProps>[];
  edges: Edge[];
}
