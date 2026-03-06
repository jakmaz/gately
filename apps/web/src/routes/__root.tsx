import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "../providers/theme-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider>
      <div
        className="font-sans antialiased"
        style={{
          fontFamily: "var(--font-geist-sans, 'Geist Sans', sans-serif)",
        }}
      >
        <Outlet />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
