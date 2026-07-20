import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://chiang-khan-walking-street.com',
  output: 'static',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'th'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  redirects: {
    '/zh': '/zh/attraction/chiang-khan-walking-street',
    '/en': '/en/attraction/chiang-khan-walking-street',
    '/th': '/th/attraction/chiang-khan-walking-street',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
