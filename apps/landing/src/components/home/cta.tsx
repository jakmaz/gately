import { ArrowRight, Github } from "lucide-react";

export function CTA() {
  return (
    <section className="closing studio-cta" aria-labelledby="cta-title">
      <div>
        <h2 id="cta-title">
          Ready to build
          <br />
          smarter circuits?
        </h2>
        <p>Start with a gate. See where it takes you.</p>
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
      <svg className="cta-circuit" viewBox="0 0 360 210" aria-hidden="true">
        <path d="M48 55H110V78H165 M48 155H110V122H165 M235 100H312" />
        <rect x="6" y="34" width="42" height="42" rx="6" />
        <rect x="6" y="134" width="42" height="42" rx="6" />
        <path d="M165 62H197a38 38 0 0 1 0 76H165Z" />
        <rect x="312" y="79" width="42" height="42" rx="6" />
      </svg>
    </section>
  );
}
