import { ChevronRight, Github, Menu, X } from "lucide-react";
import { Button } from "@gately/ui/components/ui/button";
import { useGithubStars } from "../../hooks/use-github-stars";
import { cn, formatCompactNumber } from "@gately/core/utils";
import type { ReactNode } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Docs", href: "/docs" },
  { label: "Download", href: "/download" },
  { label: "Changelog", href: "/changelog" },
];

interface HeaderProps {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  themeToggle?: ReactNode;
}

export function Header({ isScrolled, mobileMenuOpen, setMobileMenuOpen, themeToggle }: HeaderProps) {
  const { stargazersCount } = useGithubStars("jakmaz", "gately");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-lg",
        isScrolled ? "bg-background/90 shadow-xs border-b border-border/20" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 px-4 md:px-6 items-center justify-between">
        <a href="/">
          <div className="flex items-center gap-2 font-bold">
            {/* <Logo className="size-6" /> */}
            <span>gately</span>
          </div>
        </a>
        <nav className="hidden md:flex gap-4 lg:gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs lg:text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        <div className="hidden md:flex gap-4 items-center cursor-pointer">
          <div>
            <Button variant="ghost" asChild>
              <a
                href="https://github.com/jakmaz/gately"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                <Github />
                {/* <GitHubIcon className="size-5" /> */}
                {stargazersCount > 0 && formatCompactNumber(stargazersCount)}
              </a>
            </Button>
          </div>

          <div>
            {themeToggle}
          </div>
          <div>
            <Button className="rounded-full cursor-pointer transition-transform hover:scale-105 font-medium" asChild>
              <a href="/editor">
                Open Editor
                <ChevronRight className="ml-1 size-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          {themeToggle}
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b">
          <div className="container mx-auto py-4 flex flex-col gap-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-border/30">
              <Button className="w-full rounded-full" asChild>
                <a href="/editor" onClick={() => setMobileMenuOpen(false)}>
                  Try It Now
                  <ChevronRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
