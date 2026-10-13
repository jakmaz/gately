import { themeInitScript } from "@gately/ui/theme";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "theme-before-paint",
      transformIndexHtml: () => [{ tag: "script", children: themeInitScript, injectTo: "head-prepend" }],
    },
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
});
