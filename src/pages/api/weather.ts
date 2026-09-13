import type { APIRoute } from 'astro';
import { siteConfig } from '../../config/site';
import { normaliseLang } from '../../lib/i18n-server';
import { getWeather } from '../../lib/weather';
import { adviceContextFrom, buildWeatherView } from '../../lib/weather-view';

/**
 * On-demand forecast endpoint.
 *
 * Rendered at the edge rather than at build time so the numbers and the advice
 * a visitor reads are current. The response is cached by the CDN for 30 minutes
 * and may be served stale for a further hour while it revalidates, which keeps
 * upstream traffic low without the visitor ever seeing a slow request.
 *
 * The payload is already localized (`?lang=th|en|zh`), so the browser can swap
 * in fresh numbers and fresh advice without carrying any rule or wording of its
 * own.
 */
export const prerender = false;

const CONTEXT = adviceContextFrom(siteConfig);
const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };

export const GET: APIRoute = async ({ url }) => {
  const lang = normaliseLang(url.searchParams.get('lang'));
  const data = await getWeather(siteConfig.latitude, siteConfig.longitude);

  if (!data) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 503,
      headers: { ...JSON_HEADERS, 'cache-control': 'no-store' },
    });
  }

  const view = buildWeatherView(lang, data, CONTEXT);

  return new Response(JSON.stringify({ ok: true, ...view }), {
    headers: {
      ...JSON_HEADERS,
      'cache-control': 'public, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
};
