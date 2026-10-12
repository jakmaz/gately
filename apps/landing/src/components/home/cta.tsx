import { ArrowRight, Github } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="closing studio-cta" aria-labelledby="cta-title">
      <div className="cta-copy">
        <h2 id="cta-title">
          Ready to build
          <br />
          smarter circuits?
        </h2>
        <p>Start with a gate. See where it takes you.</p>
      </div>
      <div className="cta-action-column">
        <div className="actions">
          <a className="button white" href="https://app.gately.dev">
            Open Editor <ArrowRight className="icon" aria-hidden="true" />
          </a>
          <a className="button outline-white" href="https://github.com/jakmaz/gately">
            View on GitHub <Github className="icon" aria-hidden="true" />
          </a>
        </div>
        <span className="cta-note">Free and open source. No account required.</span>
      </div>
    </section>
  );
}
