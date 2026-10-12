import type { LogicGateProps } from "@gately/core/types";
import type { ReactNode } from "react";

/** A port's connection point and the other end of its visible lead. */
export interface GatePort {
  id: string;
  kind: "input" | "output";
  index: number;
  side: "left" | "right" | "bottom";
  x: number;
  y: number;
  bodyX: number;
  bodyY: number;
}

export interface GateGeometry {
  bodyPath: string;
  extraPath?: string;
  bubble?: { cx: number; cy: number; r: number };
  terminal?: "toggle" | "push" | "output";
  ports: readonly GatePort[];
}

export interface GateRendererProps {
  id: string;
  data: LogicGateProps["data"];
  isConnectable: boolean;
  geometry: GateGeometry;
  label: string;
  children?: ReactNode;
  canToggle?: boolean;
}

export type { LogicGateProps };
