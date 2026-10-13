"use client";

import { Logo } from "@gately/ui/components/Logo";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemePicker } from "../theme-picker";

export function PageHeader({ learn = false }: { learn?: boolean }) {
  const navLinks = [
    { label: "Explore", href: learn ? "/#explore" : "#explore" },
    { label: "Learn", href: "/learn/first-circuit" },
    { label: "GitHub", href: "https://github.com/jakmaz/gately" },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header" ref={header}>
        <div className="nav-inner">
          <a className="brand" href="/" aria-label="Gately home" onClick={() => setMenuOpen(false)}>
            <Logo width={28} height={28} aria-hidden="true" />
            gately
          </a>
          <nav id="site-navigation" className={`navigation${menuOpen ? " open" : ""}`} aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                aria-current={learn && label === "Learn" ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <ThemePicker className="theme-picker icon-button" />
            <a className="button primary" href="https://app.gately.dev">
              Open Editor <ArrowRight className="icon" aria-hidden="true" />
            </a>
            <button
              ref={menuButton}
              className="menu-toggle icon-button"
              type="button"
              aria-controls="site-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="icon" aria-hidden="true" /> : <Menu className="icon" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
