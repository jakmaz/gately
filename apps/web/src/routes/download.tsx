import { createFileRoute } from "@tanstack/react-router";
import { DownloadHero } from "@gately/ui/components/download/download-hero";
import { DesktopFeatures } from "@gately/ui/components/download/desktop-features";
import { InstallationGuide } from "@gately/ui/components/download/installation-guide";
import { SystemRequirements } from "@gately/ui/components/download/system-requirements";
import { PageLayout } from "@gately/ui/components/layouts/page-layout";
import { ThemeToggle } from "../components/theme-toggle-wrapper";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <PageLayout themeToggle={<ThemeToggle />}>
      <DownloadHero />
      <DesktopFeatures />
      <InstallationGuide />
      <SystemRequirements />
    </PageLayout>
  );
}
