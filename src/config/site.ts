export const siteConfig = {
  name: 'Chiang Khan Walking Street (ถนนคนเดินเชียงคาน)',
  baseUrl: process.env.CURRENT_SITE_DOMAIN ? `https://${process.env.CURRENT_SITE_DOMAIN}` : 'https://chiangkhanwalkingstreet.com',
  slug: 'chiang-khan-walking-street',
  locales: ['zh', 'en', 'th'] as const,
};
