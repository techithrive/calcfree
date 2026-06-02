// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// CalcFree.online — Astro project configuration.
// Output is fully static (the default in Astro 5). Every route is pre-rendered
// to HTML at build time so the whole site is crawlable without JavaScript.
export default defineConfig({
  site: 'https://calcfree.online',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    sitemap({
      // Keep legal/utility pages in the sitemap; exclude the CMS admin and 404.
      filter: (page) =>
        !page.includes('/admin') && !page.endsWith('/404/'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
  build: {
    // Cleaner, link-friendly output: /tools/cis-tax-refund-calculator/index.html
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: false,
});
