export function PageFooter() {
  return (
    <footer className="footer">
      <a className="brand" href="/" aria-label="Gately home">
        <img src="/favicon.svg" alt="" width="24" height="24" />
        gately
      </a>
      <p>A little logic goes a long way.</p>
      <nav aria-label="Footer navigation">
        <a href="https://github.com/jakmaz/gately">Source code</a>
        <a href="/privacy">Privacy</a>
        <a href="mailto:contact@jakmaz.com">Contact</a>
      </nav>
      <span className="copyright">© {new Date().getFullYear()} Gately</span>
    </footer>
  );
}
