import { ArrowRight, FileJson } from "lucide-react";
import { GateDrawing } from "./visuals";

export function CourseMarketing() {
  return (
    <section id="learn" className="wrap section studio-features" aria-label="Learning and saving your work">
      <article>
        <div className="learning-preview">
          <span className="small-title">Inside a lesson · The AND gate</span>
          <div className="lesson-example">
            <svg viewBox="0 0 290 160" role="img" aria-label="An AND gate with inputs one and zero produces zero">
              <path className="wire signal high" d="M57 44H100V62H145" />
              <path className="wire signal" d="M57 116H119V98H145 M225 80H247" />
              <GateDrawing type="AND" x={145} y={50} state={false} />
              <g className="lesson-bit signal high">
                <rect x="21" y="26" width="36" height="36" rx="5" />
                <text x="39" y="50">
                  1
                </text>
              </g>
              <g className="lesson-bit signal">
                <rect x="21" y="98" width="36" height="36" rx="5" />
                <text x="39" y="122">
                  0
                </text>
                <rect x="247" y="62" width="36" height="36" rx="5" />
                <text x="265" y="86">
                  0
                </text>
              </g>
              <text className="diagram-label" x="39" y="16">
                A
              </text>
              <text className="diagram-label" x="39" y="152">
                B
              </text>
            </svg>
            <table className="lesson-truth-table" aria-label="AND gate truth table">
              <thead>
                <tr>
                  <th>A</th>
                  <th>B</th>
                  <th>Out</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                </tr>
                <tr className="current">
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="subcopy">The output is 1 only when both inputs are 1.</p>
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
