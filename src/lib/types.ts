import { Node, Edge } from "reactflow";

export interface GateNodeProps {
  label: string;
  state: boolean;
  inputs?: boolean[];
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
