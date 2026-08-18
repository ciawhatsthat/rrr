import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploy target. Default is the temporary GitHub Pages project URL.
// When the custom domain goes live: set SITE_URL=https://www.red-rock-remodeling.net and
// SITE_BASE=/ (or change these two defaults), and restore public/CNAME.
const SITE_URL = process.env.SITE_URL ?? 'https://ciawhatsthat.github.io';
const SITE_BASE = process.env.SITE_BASE ?? '/rrr';

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thanks')
    })
  ]
});
