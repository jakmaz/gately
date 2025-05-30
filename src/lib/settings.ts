const LOCAL_STORAGE_KEY = "simulatorSettings";

export interface Settings {
  connectionType: "straight" | "curved" | "step";
  showGrid: boolean;
  showMinimap: boolean;
  animateConnections: boolean;
  snapToGrid: boolean;
  showNodeLabels: boolean;
}

export const loadSettings = () => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const saveSettings = (settings: Settings) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
};
