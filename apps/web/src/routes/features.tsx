import { createFileRoute } from "@tanstack/react-router";
import { FeaturesHero } from "@gately/ui/components/features/features-hero";
import { FeatureShowcase } from "@gately/ui/components/features/feature-showcase";
import { Features } from "@gately/ui/components/home/features";
import { PageLayout } from "@gately/ui/components/layouts/page-layout";
import { ThemeToggle } from "../components/theme-toggle-wrapper";

export const Route = createFileRoute("/features")({
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <PageLayout themeToggle={<ThemeToggle />}>
      <FeaturesHero />
      <FeatureShowcase />
      <Features />
    </PageLayout>
  );
}
