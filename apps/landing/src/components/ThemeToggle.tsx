"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@gately/ui/components/ui/button";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [theme, setThemeState] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Read current theme from DOM
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    
    // Update DOM
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    
    // Update localStorage
    localStorage.setItem("theme", newTheme);
    
    // Update state
    setThemeState(newTheme);
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
