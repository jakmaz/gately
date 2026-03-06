"use client";

import { ChevronRight, Github, Menu, X } from "lucide-react";
import { Button } from "@gately/ui/components/ui/button";
import { cn } from "@gately/core/utils";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Docs", href: "/docs" },
  { label: "Download", href: "/download" },
  { label: "Changelog", href: "/changelog" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/90 shadow-xs border-b border-border/20">
      <div className="container mx-auto flex h-16 px-4 md:px-6 items-center justify-between">
        <a href="/">
          <div className="flex items-center gap-2 font-bold">
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
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="hidden md:flex gap-4 items-center cursor-pointer">
          <Button variant="ghost" asChild>
            <a
              href="https://github.com/jakmaz/gately"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              <Github />
            </a>
          </Button>

          <ThemeToggle />
          
          <Button className="rounded-full cursor-pointer transition-transform hover:scale-105 font-medium" asChild>
            <a href="/editor">
              Open Editor
              <ChevronRight className="ml-1 size-4" />
            </a>
          </Button>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b animate-in slide-in-from-top-4 duration-200">
          <div className="container mx-auto py-4 flex flex-col gap-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
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
