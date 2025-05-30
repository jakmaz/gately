import { useEffect, useState } from "react";

export interface Settings {
  connectionType: "straight" | "curved" | "step";
  showGrid: boolean;
  showMinimap: boolean;
  animateConnections: boolean;
  snapToGrid: boolean;
  showNodeLabels: boolean;
}

const defaultSettings: Settings = {
  connectionType: "curved",
  showGrid: true,
  showMinimap: true,
  animateConnections: true,
  snapToGrid: false,
  showNodeLabels: true,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null); // null until loaded

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("settings");
      setSettings(stored ? JSON.parse(stored) : defaultSettings);
    } catch {
      setSettings(defaultSettings);
    }
  }, []);

  // Save to localStorage when settings change
  useEffect(() => {
    if (settings) {
      try {
        localStorage.setItem("settings", JSON.stringify(settings));
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [settings]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    if (!settings) return;
    setSettings((prev) => ({ ...prev!, [key]: value }));
  };

  return {
    settings: settings ?? defaultSettings, // fallback while loading
    updateSetting,
    isReady: settings !== null,
  };
}
