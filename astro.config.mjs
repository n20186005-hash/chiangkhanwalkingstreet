import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Every page is prerendered to static HTML. The single exception is the
// weather endpoint (`src/pages/api/weather.ts`), which opts out with
// `prerender = false` so it runs on demand at the edge and always returns a
// current forecast.
export default defineConfig({
  site: process.env.CURRENT_SITE_DOMAIN ? `https://${process.env.CURRENT_SITE_DOMAIN}` : 'https://chiangkhanwalkingstreet.com',
  output: 'static',
  // One canonical shape for every URL. Google indexed both `/th/terms` and
  // `/th/terms/`, which split impressions between duplicates, so the trailing
  // slash form is now the single indexable address everywhere: canonical tags,
  // hreflang alternates, internal links, the sitemap and the edge redirect.
  trailingSlash: 'always',
  build: { format: 'directory' },
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'th',
    locales: ['zh', 'en', 'th'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    // Emits sitemap-index.xml plus the per-language sitemap, with hreflang
    // alternates so each language version points at its siblings.
    sitemap({
      i18n: {
        defaultLocale: 'th',
        locales: { zh: 'zh-CN', en: 'en', th: 'th' },
      },
      // The bare root only issues a redirect to the default locale.
      filter: (page) => {
        try {
          return new URL(page).pathname !== '/';
        } catch {
          return true;
        }
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
