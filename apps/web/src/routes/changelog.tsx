import { createFileRoute } from "@tanstack/react-router";
import { ChangelogHero } from "@gately/ui/components/changelog/changelog-hero";
import { VersionList } from "@gately/ui/components/changelog/version-list";
import { PageLayout } from "@gately/ui/components/layouts/page-layout";
import { ThemeToggle } from "../components/theme-toggle-wrapper";

export const Route = createFileRoute("/changelog")({
  component: ChangelogPage,
});

function ChangelogPage() {
  return (
    <PageLayout themeToggle={<ThemeToggle />}>
      <ChangelogHero />
      <VersionList />
    </PageLayout>
  );
}
