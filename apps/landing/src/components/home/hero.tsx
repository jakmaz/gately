import { ArrowRight } from "lucide-react";
import { MiniPreview } from "./mini-preview";

export function Hero() {
  return (
    <section className="studio-hero wrap" aria-labelledby="hero-title">
      <div className="studio-intro">
        <p className="eyebrow">Free, open-source logic circuit editor</p>
        <h1 id="hero-title">
          Build a circuit.
          <br />
          <span>See the logic.</span>
        </h1>
        <p>Drag gates onto a canvas, connect them, and watch your circuit respond. Digital logic, made tangible.</p>
        <div className="actions">
          <a className="button primary" href="https://app.gately.dev">
            Open Editor <ArrowRight className="icon" aria-hidden="true" />
          </a>
          <a className="button secondary" href="/learn/first-circuit">
            Build your first circuit <ArrowRight className="icon" aria-hidden="true" />
          </a>
        </div>
      </div>
      <MiniPreview />
      <div className="caption">
        <span>Click inputs A and B. The sum and carry update together.</span>
        <span className="legend">
          <span>
            <i aria-hidden="true" />0 · Low
          </span>
          <span>
            <i className="high" aria-hidden="true" />1 · High
          </span>
        </span>
      </div>
    </section>
  );
}
