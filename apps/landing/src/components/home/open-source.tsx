import { ArrowRight } from "lucide-react";

export function OpenSource() {
  return (
    <div className="wrap open-note">
      <p>
        <strong>Open source, all the way down.</strong> Explore the editor and simulation code. Gately is a
        student-built project, developed as time allows.
      </p>
      <a className="text-link" href="https://github.com/jakmaz/gately">
        Explore the source <ArrowRight className="icon" aria-hidden="true" />
      </a>
    </div>
  );
}
