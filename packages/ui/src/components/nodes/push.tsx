"use client";

import { memo, useEffect } from "react";
import { type GateGeometry, GateRenderer, type LogicGateProps } from "./base/index";
import { useGateActions } from "./base/use-gate-actions";

export const PUSH_GEOMETRY: GateGeometry = {
  bodyPath: "M40 12A28 28 0 1 1 40 68A28 28 0 1 1 40 12Z",
  terminal: "push",
  ports: [{ id: "output", kind: "output", index: 0, side: "right", x: 80, y: 40, bodyX: 68, bodyY: 40 }],
};

export const PushNode = memo(({ id, data, isConnectable }: LogicGateProps) => {
  const { updateState } = useGateActions(id);

  useEffect(() => {
    const release = () => updateState(false);
    window.addEventListener("blur", release);
    return () => window.removeEventListener("blur", release);
  }, [updateState]);

  return (
    <GateRenderer id={id} data={data} isConnectable={isConnectable} geometry={PUSH_GEOMETRY} label="Push input">
      <button
        type="button"
        className="nopan absolute left-3 top-3 size-14 touch-none cursor-grab rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:cursor-grabbing"
        aria-label={`${data.label}, push input: ${Number(data.state)}. Hold to send 1`}
        aria-pressed={data.state}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          updateState(true);
        }}
        onPointerUp={(event) => {
          updateState(false);
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => updateState(false)}
        onLostPointerCapture={() => updateState(false)}
        onBlur={() => updateState(false)}
        onKeyDown={(event) => {
          if (event.key !== " " && event.key !== "Enter") return;
          event.preventDefault();
          if (!event.repeat) updateState(true);
        }}
        onKeyUp={(event) => {
          if (event.key !== " " && event.key !== "Enter") return;
          event.preventDefault();
          updateState(false);
        }}
        onClick={(event) => event.stopPropagation()}
      />
    </GateRenderer>
  );
});

PushNode.displayName = "PushNode";
