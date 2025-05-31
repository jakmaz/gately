import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface SettingsState {
  settings: Settings;
  ready: boolean;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      ready: false,
      updateSetting: (key, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        })),
    }),
    {
      name: "settings-store",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.ready = true;
        }
      },
    },
  ),
); 