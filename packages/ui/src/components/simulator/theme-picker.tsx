"use client";

import { useTheme } from "../../hooks/use-theme";
import { ThemeMenu } from "../theme-menu";

export function ThemePicker() {
  return <ThemeMenu {...useTheme()} />;
}
