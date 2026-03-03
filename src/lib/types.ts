import { ANDGateNode } from "@/components/nodes/and";
import { BUFFGateNode } from "@/components/nodes/buff";
import { DMUXGateNode } from "@/components/nodes/dmux";
import { HalfAdderNode } from "@/components/nodes/halfAdder";
import { InputNode } from "@/components/nodes/input";
import { MUXGateNode } from "@/components/nodes/mux";
import { NANDGateNode } from "@/components/nodes/nand";
import { NORGateNode } from "@/components/nodes/nor";
import { NOTGateNode } from "@/components/nodes/not";
import { ORGateNode } from "@/components/nodes/or";
import { OutputNode } from "@/components/nodes/output";
import { XNORGateNode } from "@/components/nodes/xnor";
import { XNOR3GateNode } from "@/components/nodes/xnor3";
import { XORGateNode } from "@/components/nodes/xor";
import { Edge, Node, NodeTypes } from "reactflow";

export const nodeTypes: NodeTypes = {
  inputNode: InputNode,
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
  halfAdder: HalfAdderNode,
};

export interface GateNodeProps {
  label: string;
  state: boolean;
  inputs?: boolean[];
  outputs?: boolean[];
  preview?: boolean;
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
