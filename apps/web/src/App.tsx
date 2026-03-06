import { LogicGateSimulator } from "@gately/ui/components/simulator/simulator";
import { Toaster } from "sonner";
import { ThemeProvider } from "./providers/theme-provider";

export function App() {
  return (
    <ThemeProvider>
      <div
        className="font-sans antialiased"
        style={{
          fontFamily: "var(--font-geist-sans, 'Geist Sans', sans-serif)",
        }}
      >
        <main className="min-h-screen bg-background">
          <LogicGateSimulator />
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
