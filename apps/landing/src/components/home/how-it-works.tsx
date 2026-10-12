"use client";

import { type TransitionEventHandler, useEffect, useId, useState } from "react";
import { GateDrawing } from "./visuals";

type Demonstration = "place" | "connect" | "simulate";

const steps = [
  { kind: "place", title: "Place a gate.", description: "Drag a component from the toolbox onto your canvas." },
  { kind: "connect", title: "Connect the handles.", description: "Draw wires from the input switches to the gate." },
  {
    kind: "simulate",
    title: "Change an input.",
    description: "Toggle a switch. Gates and outputs update immediately.",
  },
] as const;

function Cursor({
  x,
  y,
  className,
  onTransitionEnd,
}: {
  x: number;
  y: number;
  className: string;
  onTransitionEnd?: TransitionEventHandler<SVGGElement>;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`workflow-cursor ${className}`} onTransitionEnd={onTransitionEnd}>
        <path d="M0 0L6 18L10 10L18 6Z" />
      </g>
    </g>
  );
}

function StepTerminal({ x, y, value, label }: { x: number; y: number; value: boolean; label: string }) {
  return (
    <g className={`workflow-terminal signal${value ? " high" : ""}`}>
      <rect x={x - 18} y={y - 18} width="36" height="36" rx="5" />
      <text x={x} y={y + 6}>
        {Number(value)}
      </text>
      <text className="workflow-terminal-label" x={x} y={y - 28}>
        {label}
      </text>
    </g>
  );
}

function WorkflowDemo({ kind, title }: { kind: Demonstration; title: string }) {
  const canvasPatternId = useId();
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [inputEnabled, setInputEnabled] = useState(false);
  const active = hovered || selected;
  const signalHigh = active && inputEnabled;

  useEffect(() => {
    if (kind !== "simulate") return;
    if (!active) {
      setInputEnabled(false);
      return;
    }
    // Reduced motion skips the cursor transition, so it cannot emit transitionend.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enableWithoutMotion = () => {
      if (reducedMotion.matches) setInputEnabled(true);
    };
    enableWithoutMotion();
    reducedMotion.addEventListener("change", enableWithoutMotion);
    return () => reducedMotion.removeEventListener("change", enableWithoutMotion);
  }, [active, kind]);

  return (
    <button
      type="button"
      className={`workflow-demo${active ? " is-active" : ""}`}
      data-demo={kind}
      aria-label={`Try: ${title}`}
      aria-pressed={active}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onClick={() => setSelected((previous) => !previous)}
    >
      <svg viewBox="0 0 300 175" aria-hidden="true">
        {kind === "place" ? (
          <>
            <defs>
              <pattern id={canvasPatternId} width="10" height="10" patternUnits="userSpaceOnUse">
                <circle className="workflow-grid-dot" cx="5" cy="5" r="0.65" />
              </pattern>
            </defs>
            <text className="workflow-label" x="64" y="25" textAnchor="middle">
              Toolbox
            </text>
            <text className="workflow-label" x="210" y="25" textAnchor="middle">
              Canvas
            </text>
            <rect className="workflow-toolbox" x="12" y="43" width="104" height="104" rx="6" />
            <rect className="workflow-canvas" x="132" y="39" width="156" height="112" rx="6" />
            <rect x="132" y="39" width="156" height="112" rx="6" fill={`url(#${canvasPatternId})`} />
            <g className="placing-gate">
              <GateDrawing type="AND" x={28} y={65} />
            </g>
            <Cursor x={80} y={105} className="placing-cursor" />
          </>
        ) : kind === "connect" ? (
          <g className="connecting-circuit" transform="translate(16.5 0)">
            <path className="connection-guide" d="M63 54H108V70H160 M63 124H130V106H160" />
            <path className="connecting-wire first" pathLength="1" d="M63 54H108V70H160" />
            <path className="connecting-wire second" pathLength="1" d="M63 124H130V106H160" />
            <GateDrawing type="AND" x={160} y={58} state={false} />
            <StepTerminal x={45} y={54} value={false} label="A" />
            <StepTerminal x={45} y={124} value={false} label="B" />
            <circle className="workflow-pin" cx="63" cy="54" r="3" />
            <circle className="workflow-pin" cx="63" cy="124" r="3" />
            <circle className="workflow-pin" cx="160" cy="70" r="3" />
            <circle className="workflow-pin" cx="160" cy="106" r="3" />
            <Cursor x={63} y={54} className="connecting-cursor" />
          </g>
        ) : (
          <>
            <path className="wire signal high" d="M63 54H108V70H160" />
            <path className={`wire signal${signalHigh ? " high" : ""}`} d="M63 124H130V106H160 M240 88H255" />
            <GateDrawing type="AND" x={160} y={58} state={signalHigh} />
            <StepTerminal x={45} y={54} value label="A" />
            <StepTerminal x={45} y={124} value={signalHigh} label="B" />
            <StepTerminal x={273} y={88} value={signalHigh} label="Out" />
            <Cursor
              x={106}
              y={150}
              className="toggling-cursor"
              onTransitionEnd={(event) => {
                if (active && event.target === event.currentTarget && event.propertyName === "transform") {
                  setInputEnabled(true);
                }
              }}
            />
          </>
        )}
      </svg>
      <span className="workflow-demo-hint">{selected ? "Select again to reset" : "Hover or select to try"}</span>
    </button>
  );
}

export function HowItWorks() {
  return (
    <section id="explore" className="wrap section studio-workflow" aria-labelledby="workflow-title">
      <div className="section-head">
        <h2 id="workflow-title">An idea becomes a circuit.</h2>
        <p>Place it. Connect it. Try an input.</p>
      </div>
      <div className="workflow">
        {steps.map(({ kind, title, description }) => (
          <figure key={kind}>
            <WorkflowDemo kind={kind} title={title} />
            <figcaption>
              <h3>{title}</h3>
              <p>{description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
