import { LogicGateSimulator } from "@gately/ui/components/simulator/simulator";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Listen for the native Tauri menu event "open-settings"
    const unlistenPromise = listen("open-settings", () => {
      // Dispatch a custom DOM event so the UI package can pick it up
      // without needing to know about Tauri.
      window.dispatchEvent(new CustomEvent("open-settings"));
    });

    return () => {
      unlistenPromise.then((unlisten) => unlisten());
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <LogicGateSimulator />
    </div>
  );
}

export default App;
