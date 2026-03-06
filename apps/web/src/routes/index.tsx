import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@gately/ui/components/home/hero";
import { Features } from "@gately/ui/components/home/features";
import { HowItWorks } from "@gately/ui/components/home/how-it-works";
import { Roadmap } from "@gately/ui/components/home/roadmap";
import { FAQ } from "@gately/ui/components/home/faq";
import { CTA } from "@gately/ui/components/home/cta";
import { PageLayout } from "@gately/ui/components/layouts/page-layout";
import { ThemeToggle } from "../components/theme-toggle-wrapper";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <PageLayout themeToggle={<ThemeToggle />}>
      <Hero />
      <Features />
      <HowItWorks />
      <Roadmap />
      <FAQ />
      <CTA />
    </PageLayout>
  );
}
