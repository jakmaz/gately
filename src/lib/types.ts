import type { Edge, Node, NodeTypes } from "@xyflow/react";
import { ANDGateNode } from "@/components/nodes/and";
import { BUFFGateNode } from "@/components/nodes/buff";
import { DMUXGateNode } from "@/components/nodes/dmux";
import { MUXGateNode } from "@/components/nodes/mux";
import { NANDGateNode } from "@/components/nodes/nand";
import { NORGateNode } from "@/components/nodes/nor";
import { NOTGateNode } from "@/components/nodes/not";
import { ORGateNode } from "@/components/nodes/or";
import { OutputNode } from "@/components/nodes/output";
import { PushNode } from "@/components/nodes/push";
import { ToggleNode } from "@/components/nodes/toggle";
import { XNORGateNode } from "@/components/nodes/xnor";
import { XNOR3GateNode } from "@/components/nodes/xnor3";
import { XORGateNode } from "@/components/nodes/xor";

export const nodeTypes: NodeTypes = {
  toggleNode: ToggleNode,
  pushNode: PushNode,
  outputNode: OutputNode,
  andGate: ANDGateNode,
  orGate: ORGateNode,
  notGate: NOTGateNode,
  nandGate: NANDGateNode,
  norGate: NORGateNode,
  xorGate: XORGateNode,
  xnorGate: XNORGateNode,
  muxGate: MUXGateNode,
  xnor3Gate: XNOR3GateNode,
  dmuxGate: DMUXGateNode,
  buffGate: BUFFGateNode,
};

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
