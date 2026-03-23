// @ts-check

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],

  redirects: {
    '/docs': '/docs/first-circuit',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
