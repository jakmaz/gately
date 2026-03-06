import { createFileRoute } from "@tanstack/react-router";
import { DocsHero } from "@gately/ui/components/docs/docs-hero";
import { DocsGrid } from "@gately/ui/components/docs/docs-grid";
import { DocsResources } from "@gately/ui/components/docs/docs-resources";
import { PageLayout } from "@gately/ui/components/layouts/page-layout";
import { ThemeToggle } from "../components/theme-toggle-wrapper";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
});

function DocsPage() {
  return (
    <PageLayout themeToggle={<ThemeToggle />}>
      <DocsHero />
      <DocsGrid />
      <DocsResources />
    </PageLayout>
  );
}
