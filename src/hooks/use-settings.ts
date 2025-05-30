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
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem("settings");
      return stored ? JSON.parse(stored) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return { settings, updateSetting };
}
