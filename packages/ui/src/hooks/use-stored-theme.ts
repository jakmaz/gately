import { useEffect, useState } from "react";
import { applyTheme, type ResolvedTheme, readTheme, setStoredTheme, THEME_STORAGE_KEY, type Theme } from "../theme";

export function useStoredTheme() {
  // Stable initial values keep Astro's server render and hydration consistent.
  const [state, setState] = useState<{ theme: Theme; resolvedTheme: ResolvedTheme }>({
    theme: "system",
    resolvedTheme: "light",
  });

  useEffect(() => {
    const refresh = () => {
      const theme = readTheme();
      setState({ theme, resolvedTheme: applyTheme(theme) });
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) refresh();
    };
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    refresh();
    window.addEventListener("gately:theme-change", refresh);
    window.addEventListener("storage", onStorage);
    media.addEventListener("change", refresh);
    return () => {
      window.removeEventListener("gately:theme-change", refresh);
      window.removeEventListener("storage", onStorage);
      media.removeEventListener("change", refresh);
    };
  }, []);

  return { ...state, setTheme: setStoredTheme };
}
