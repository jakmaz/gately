"use client";

import { calculateNodeStates } from "@gately/core/simulator";
import type { GateNodeProps } from "@gately/core/types";
import type { Edge, Node } from "@xyflow/react";
import { useId, useState } from "react";
import { GateDrawing, GateShelf } from "./visuals";

const HALF_ADDER_EDGES: Edge[] = [
  { id: "a-sum", source: "a", target: "xor", targetHandle: "input-0" },
  { id: "b-sum", source: "b", target: "xor", targetHandle: "input-1" },
  { id: "a-carry", source: "a", target: "and", targetHandle: "input-0" },
  { id: "b-carry", source: "b", target: "and", targetHandle: "input-1" },
  { id: "sum", source: "xor", target: "sum" },
  { id: "carry", source: "and", target: "carry" },
];

function evaluateHalfAdder(a: boolean, b: boolean) {
  const nodes: Node<GateNodeProps>[] = [
    { id: "a", type: "toggleNode", position: { x: 0, y: 0 }, data: { label: "A", state: a } },
    { id: "b", type: "toggleNode", position: { x: 0, y: 0 }, data: { label: "B", state: b } },
    { id: "xor", type: "xorGate", position: { x: 0, y: 0 }, data: { label: "XOR", state: false } },
    { id: "and", type: "andGate", position: { x: 0, y: 0 }, data: { label: "AND", state: false } },
    { id: "sum", type: "outputNode", position: { x: 0, y: 0 }, data: { label: "Sum", state: false } },
    { id: "carry", type: "outputNode", position: { x: 0, y: 0 }, data: { label: "Carry", state: false } },
  ];
  const evaluated = calculateNodeStates(nodes, HALF_ADDER_EDGES);
  return {
    sum: evaluated.find((node) => node.id === "sum")?.data.state ?? false,
    carry: evaluated.find((node) => node.id === "carry")?.data.state ?? false,
  };
}

function Terminal({ x, y, label, state }: { x: number; y: number; label: string; state: boolean }) {
  return (
    <g className={`terminal signal${state ? " high" : ""}`}>
      <rect x={x - 23} y={y - 23} width="46" height="46" rx="6" />
      <text x={x} y={y + 7} className="bit">
        {Number(state)}
      </text>
      <text x={x} y={y - 38} className="terminal-label">
        {label}
      </text>
    </g>
  );
}

export function MiniPreview() {
  const [inputs, setInputs] = useState({ a: true, b: false });
  const titleId = useId();
  const { sum, carry } = evaluateHalfAdder(inputs.a, inputs.b);
  const signal = (state: boolean) => `wire signal${state ? " high" : ""}`;
  return (
    <div className="studio-window panel">
      <div className="panel-top">
        <strong>Half adder</strong>
        <span>Interactive circuit example</span>
      </div>
      <div className="studio-workspace">
        <aside className="tool-tray" aria-label="Examples from the component toolbox">
          <h3>Components</h3>
          <p>A few of the building blocks.</p>
          <GateShelf />
        </aside>
        <div className="circuit-widget">
          <div className="circuit-canvas">
            <div className="circuit-board">
              <svg className="circuit-svg" viewBox="0 0 520 310" role="img" aria-labelledby={titleId}>
                <title id={titleId}>
                  Half adder: A and B feed an XOR gate for the sum and an AND gate for the carry.
                </title>
                <path className={signal(inputs.a)} d="M83 90H145V66H250 M145 90V196H250" />
                <path className={signal(inputs.b)} d="M83 220H180V114H250 M180 220V244H250" />
                <circle className={`junction signal${inputs.a ? " high" : ""}`} cx="145" cy="90" r="3" />
                <circle className={`junction signal${inputs.b ? " high" : ""}`} cx="180" cy="220" r="3" />
                <path className={signal(sum)} d="M335 90H425" />
                <path className={signal(carry)} d="M331 220H425" />
                <GateDrawing type="XOR" x={238} y={51} scale={1.3} state={sum} label />
                <GateDrawing type="AND" x={238} y={181} scale={1.3} state={carry} label />
                <Terminal x={448} y={90} label="Sum" state={sum} />
                <Terminal x={448} y={220} label="Carry" state={carry} />
              </svg>
              {(["a", "b"] as const).map((input) => (
                <button
                  key={input}
                  className={`circuit-input signal${inputs[input] ? " high" : ""}`}
                  style={{ left: `${(60 / 520) * 100}%`, top: `${((input === "a" ? 90 : 220) / 310) * 100}%` }}
                  type="button"
                  aria-label={`Input ${input.toUpperCase()}`}
                  aria-pressed={inputs[input]}
                  onClick={() => setInputs((previous) => ({ ...previous, [input]: !previous[input] }))}
                >
                  <span className="circuit-input-label" aria-hidden="true">
                    {input.toUpperCase()}
                  </span>
                  {Number(inputs[input])}
                </button>
              ))}
            </div>
          </div>
          <output className="sr-only" aria-live="polite" aria-atomic="true">
            Sum {Number(sum)} · Carry {Number(carry)}
          </output>
        </div>
        <aside className="circuit-note">
          <span className="mono">Two bits in.</span>
          <h3>
            Add them
            <br />
            with two gates.
          </h3>
          <p>
            XOR finds the sum.
            <br />
            AND finds the carry.
          </p>
          <div className="note-equation">
            {Number(inputs.a)} + {Number(inputs.b)} = {Number(carry)}
            {Number(sum)}
          </div>
          <small>The result is in binary.</small>
        </aside>
      </div>
    </div>
  );
}
