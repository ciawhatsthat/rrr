import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.red-rock-remodeling.net',
  output: 'static',
  integrations: [sitemap()]
});
