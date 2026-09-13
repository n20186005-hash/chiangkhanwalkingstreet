import type { APIRoute } from 'astro';

/**
 * robots.txt is generated rather than kept in `public/` so the sitemap URL
 * always matches the canonical domain configured through `site` — one place to
 * change when the site moves to a custom domain.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site ?? 'https://chiangkhanwalkingstreet.com');

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /api/',
    '',
    `Sitemap: ${sitemap.href}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
