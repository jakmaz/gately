import type { LogicGateProps } from "@gately/core/types";

export interface GateGeometry {
  bodyPath: string;
  extraPath?: string;
  bubble?: { cx: number; cy: number; r: number };
  outputX: number;
  outputY: number;
  inputPinX: number;
  inputYOverrides?: (number | null)[];
}

export interface GateRendererProps {
  id?: string;
  data: LogicGateProps["data"];
  isConnectable: boolean;
  geometry: GateGeometry;
  label: string;
  symbol: string;
  inputHandles: number;
  outputHandles: number;
}

export type { LogicGateProps };
