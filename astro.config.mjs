// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Defaults serve the custom domain at root. The GitHub Pages workflow
  // overrides these because the project page lives under /sb/.
  site: process.env.SITE_URL || 'https://sarojbaral.com.np',
  base: process.env.BASE_PATH || '/',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
