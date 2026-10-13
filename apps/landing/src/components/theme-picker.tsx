import { ThemeMenu } from "@gately/ui/components/theme-menu";
import { useStoredTheme } from "@gately/ui/hooks/use-stored-theme";

export function ThemePicker({ className }: { className?: string }) {
  return <ThemeMenu {...useStoredTheme()} className={className} />;
}
