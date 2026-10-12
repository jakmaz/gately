"use client";

import { memo } from "react";
import { type GateGeometry, GateRenderer, type LogicGateProps } from "./base/index";
import { useGateActions } from "./base/use-gate-actions";

export const TOGGLE_GEOMETRY: GateGeometry = {
  bodyPath: "M20 12H60Q68 12 68 20V60Q68 68 60 68H20Q12 68 12 60V20Q12 12 20 12Z",
  terminal: "toggle",
  ports: [{ id: "output", kind: "output", index: 0, side: "right", x: 80, y: 40, bodyX: 68, bodyY: 40 }],
};

export const ToggleNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const { toggleState } = useGateActions(id);

  return (
    <GateRenderer
      id={id}
      data={data}
      isConnectable={isConnectable}
      geometry={TOGGLE_GEOMETRY}
      label="Toggle input"
      canToggle
    >
      <button
        type="button"
        className="nopan absolute left-3 top-3 size-14 cursor-grab rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:cursor-grabbing"
        aria-label={`${data.label}, toggle input: ${Number(data.state)}`}
        aria-pressed={data.state}
        onClick={(event) => {
          event.stopPropagation();
          toggleState();
        }}
      />
    </GateRenderer>
  );
});

ToggleNode.displayName = "ToggleNode";
