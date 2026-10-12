"use client";

import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function PageHeader({ learn = false }: { learn?: boolean }) {
  const navLinks = [
    { label: "Explore", href: learn ? "/#explore" : "#explore" },
    { label: "Learn", href: "/learn/first-circuit" },
    { label: "FAQ", href: learn ? "/#faq" : "#faq" },
    { label: "GitHub", href: "https://github.com/jakmaz/gately" },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

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

  function toggleTheme() {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.classList.toggle("light", !nextDark);
    setDark(nextDark);
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch {
      // The theme still works when browser storage is unavailable.
    }
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header" ref={header}>
        <div className="nav-inner">
          <a className="brand" href="/" aria-label="Gately home">
            <img src="/favicon.svg" alt="" width="28" height="28" />
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
            <button
              className="theme-toggle icon-button"
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            >
              <Sun className="icon sun" aria-hidden="true" />
              <Moon className="icon moon" aria-hidden="true" />
            </button>
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
