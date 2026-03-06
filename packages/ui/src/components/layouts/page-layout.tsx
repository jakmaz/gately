"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Header } from "../home/header";
import { Footer } from "../home/footer";

interface PageLayoutProps {
  children: ReactNode;
  themeToggle?: ReactNode;
}

export function PageLayout({ children, themeToggle }: PageLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-dvh justify-items-center items-center flex-col bg-background text-foreground">
      <Header
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        themeToggle={themeToggle}
      />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
