// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://gately.dev",
  integrations: [react(), mdx(), sitemap()],

  redirects: {
    "/docs": "/learn/first-circuit",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
