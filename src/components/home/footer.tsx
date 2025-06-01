import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col gap-6 px-4 md:px-6 py-10 lg:py-16 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 max-w-md">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span>Gately</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            A visual logic editor for building, simulating, and sharing digital circuits with ease. Drag, drop, and explore logic.
          </p>
          <span className="text-xs">&copy; {new Date().getFullYear()} Gately</span>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground sm:items-end">
          <a
            href="mailto:contact@jakmaz.com"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </a>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
