"use client";

import { ArrowRight, BookOpen, FileJson } from "lucide-react";
import { useId, useState } from "react";
import { GateDrawing } from "./visuals";

const AND_INPUTS = [
  [false, false],
  [false, true],
  [true, false],
  [true, true],
] as const;

export function CourseMarketing() {
  const [inputs, setInputs] = useState({ a: true, b: false });
  const circuitTitleId = useId();
  const tableTitleId = useId();
  const output = inputs.a && inputs.b;

  return (
    <section id="learn" className="wrap section studio-features" aria-label="Learning and saving your work">
      <article>
        <div className="learning-preview">
          <div className="lesson-preview-heading">
            <BookOpen className="icon" aria-hidden="true" />
            <strong>AND gate</strong>
            <span>Lesson preview</span>
          </div>
          <div className="lesson-example">
            <div className="lesson-circuit-pane">
              <div className="lesson-circuit-board">
                <svg viewBox="0 0 290 160" role="img" aria-labelledby={circuitTitleId}>
                  <title id={circuitTitleId}>
                    {`AND gate: A ${Number(inputs.a)}, B ${Number(inputs.b)}, output ${Number(output)}.`}
                  </title>
                  <path className={`wire signal${inputs.a ? " high" : ""}`} d="M57 44H100V62H145" />
                  <path className={`wire signal${inputs.b ? " high" : ""}`} d="M57 116H119V98H145" />
                  <path className={`wire signal${output ? " high" : ""}`} d="M225 80H247" />
                  <GateDrawing type="AND" x={145} y={50} state={output} />
                  <g className={`lesson-bit signal${output ? " high" : ""}`}>
                    <rect x="247" y="62" width="36" height="36" rx="5" />
                    <text x="265" y="86">
                      {Number(output)}
                    </text>
                  </g>
                  <text className="lesson-output-label" x="265" y="52">
                    Out
                  </text>
                </svg>
                {(["a", "b"] as const).map((input) => (
                  <button
                    key={input}
                    type="button"
                    className={`lesson-input signal${inputs[input] ? " high" : ""}`}
                    style={{ left: `${(39 / 290) * 100}%`, top: `${((input === "a" ? 44 : 116) / 160) * 100}%` }}
                    data-lesson-input={input}
                    aria-label={`Lesson input ${input.toUpperCase()}`}
                    aria-pressed={inputs[input]}
                    onClick={() => setInputs((previous) => ({ ...previous, [input]: !previous[input] }))}
                  >
                    <span className="lesson-input-label" aria-hidden="true">
                      {input.toUpperCase()}
                    </span>
                    {Number(inputs[input])}
                  </button>
                ))}
              </div>
              <p className="lesson-input-hint">Toggle A or B.</p>
            </div>
            <div className="lesson-table-pane">
              <span className="lesson-table-title" id={tableTitleId}>
                Truth table
              </span>
              <div className="lesson-table-frame">
                <table className="lesson-truth-table" aria-labelledby={tableTitleId}>
                  <thead>
                    <tr>
                      <th scope="col">A</th>
                      <th scope="col">B</th>
                      <th scope="col">Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AND_INPUTS.map(([a, b]) => {
                      const current = a === inputs.a && b === inputs.b;
                      return (
                        <tr
                          key={`${Number(a)}${Number(b)}`}
                          className={current ? "current" : undefined}
                          aria-current={current ? "true" : undefined}
                        >
                          <td>{Number(a)}</td>
                          <td>{Number(b)}</td>
                          <td>{Number(a && b)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <output className="sr-only" aria-live="polite" aria-atomic="true">
            AND output {Number(output)}
          </output>
        </div>
        <h2>Learn the logic behind your circuit.</h2>
        <p>
          Short explanations, truth tables, and working circuits. Start with a gate, then build up to binary addition.
        </p>
        <a className="text-link" href="/learn/first-circuit">
          Start with your first circuit <ArrowRight className="icon" aria-hidden="true" />
        </a>
      </article>
      <article>
        <div
          className="files-visual"
          role="img"
          aria-label="Example local circuit files, exported from the canvas as JSON"
        >
          <div className="file-heading">
            <FileJson className="icon" aria-hidden="true" /> My circuits <span>Saved locally</span>
          </div>
          <div className="file-row active">
            <FileJson className="icon" aria-hidden="true" /> half-adder.json <span>6 nodes</span>
          </div>
          <div className="file-row">
            <FileJson className="icon" aria-hidden="true" /> first-circuit.json <span>4 nodes</span>
          </div>
          <div className="file-transfer">
            <span>Canvas</span>
            <ArrowRight className="icon" aria-hidden="true" />
            <span className="file-chip">.json</span>
            <ArrowRight className="icon" aria-hidden="true" />
            <span>Your files</span>
          </div>
        </div>
        <h2>
          Keep your experiments.
          <br />
          Build on what works.
        </h2>
        <p>
          Organize multiple circuits locally. Export and import JSON files to back up your work or move it between
          devices.
        </p>
        <a className="text-link" href="/learn/saving-projects">
          How saving works <ArrowRight className="icon" aria-hidden="true" />
        </a>
      </article>
    </section>
  );
}
