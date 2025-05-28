import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col gap-8 px-4 md:px-6 py-10 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4 col-span-2 max-w-md">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span>Gately</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A visual logic editor for building, simulating, and sharing digital circuits with ease. Drag, drop, and explore logic.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#examples"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Examples
                </a>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} gately. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
