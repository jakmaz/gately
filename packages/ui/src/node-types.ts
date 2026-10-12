import type { NodeTypes } from "@xyflow/react";
import { AND_GEOMETRY, ANDGateNode } from "./components/nodes/and";
import { BUFF_GEOMETRY, BUFFGateNode } from "./components/nodes/buff";
import { DMUX_GEOMETRY, DMUXGateNode } from "./components/nodes/dmux";
import { MUX_GEOMETRY, MUXGateNode } from "./components/nodes/mux";
import { NAND_GEOMETRY, NANDGateNode } from "./components/nodes/nand";
import { NOR_GEOMETRY, NORGateNode } from "./components/nodes/nor";
import { NOT_GEOMETRY, NOTGateNode } from "./components/nodes/not";
import { OR_GEOMETRY, ORGateNode } from "./components/nodes/or";
import { OUTPUT_GEOMETRY, OutputNode } from "./components/nodes/output";
import { PUSH_GEOMETRY, PushNode } from "./components/nodes/push";
import { TOGGLE_GEOMETRY, ToggleNode } from "./components/nodes/toggle";
import { XNOR_GEOMETRY, XNORGateNode } from "./components/nodes/xnor";
import { XNOR3_GEOMETRY, XNOR3GateNode } from "./components/nodes/xnor3";
import { XOR_GEOMETRY, XORGateNode } from "./components/nodes/xor";

export const gateCatalog = {
  toggleNode: { component: ToggleNode, geometry: TOGGLE_GEOMETRY, label: "Toggle" },
  pushNode: { component: PushNode, geometry: PUSH_GEOMETRY, label: "Push" },
  outputNode: { component: OutputNode, geometry: OUTPUT_GEOMETRY, label: "Output" },
  andGate: { component: ANDGateNode, geometry: AND_GEOMETRY, label: "AND" },
  orGate: { component: ORGateNode, geometry: OR_GEOMETRY, label: "OR" },
  notGate: { component: NOTGateNode, geometry: NOT_GEOMETRY, label: "NOT" },
  nandGate: { component: NANDGateNode, geometry: NAND_GEOMETRY, label: "NAND" },
  norGate: { component: NORGateNode, geometry: NOR_GEOMETRY, label: "NOR" },
  xorGate: { component: XORGateNode, geometry: XOR_GEOMETRY, label: "XOR" },
  xnorGate: { component: XNORGateNode, geometry: XNOR_GEOMETRY, label: "XNOR" },
  muxGate: { component: MUXGateNode, geometry: MUX_GEOMETRY, label: "MUX" },
  xnor3Gate: { component: XNOR3GateNode, geometry: XNOR3_GEOMETRY, label: "XNOR3" },
  dmuxGate: { component: DMUXGateNode, geometry: DMUX_GEOMETRY, label: "DMUX" },
  buffGate: { component: BUFFGateNode, geometry: BUFF_GEOMETRY, label: "BUFFER" },
};

export type GateType = keyof typeof gateCatalog;

export function isGateType(value: string): value is GateType {
  return Object.hasOwn(gateCatalog, value);
}

export const nodeTypes = Object.fromEntries(
  Object.entries(gateCatalog).map(([type, gate]) => [type, gate.component]),
) satisfies NodeTypes;
