import { useStoredTheme } from "@gately/ui/hooks/use-stored-theme";
import { ThemeContext } from "@gately/ui/hooks/use-theme";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useStoredTheme();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
