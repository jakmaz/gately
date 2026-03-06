import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@gately/ui/components/home/header";
import { Hero } from "@gately/ui/components/home/hero";
import { Features } from "@gately/ui/components/home/features";
import { HowItWorks } from "@gately/ui/components/home/how-it-works";
import { Roadmap } from "@gately/ui/components/home/roadmap";
import { FAQ } from "@gately/ui/components/home/faq";
import { CTA } from "@gately/ui/components/home/cta";
import { Footer } from "@gately/ui/components/home/footer";
import { ThemeToggle } from "../components/theme-toggle-wrapper";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
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
        themeToggle={<ThemeToggle />}
      />
      <main className="flex-1 w-full">
        <Hero />
        <Features />
        <HowItWorks />
        <Roadmap />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
