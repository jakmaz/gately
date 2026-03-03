import type { LogicGateProps } from "@/lib/types";

export interface GateGeometry {
  bodyPath: string;
  extraPath?: string;
  bubble?: { cx: number; cy: number; r: number };
  outputX: number;
  outputY: number;
  inputPinX: number;
  inputYOverrides?: (number | null)[];
  outputYOverrides?: (number | null)[];
  svgContent?: React.ReactNode;
}

export interface GateRendererProps {
  id?: string;
  data: any;
  isConnectable: boolean;
  geometry: GateGeometry;
  label: string;
  symbol: string;
  inputHandles: number;
  outputHandles: number;
}

export type { LogicGateProps };
