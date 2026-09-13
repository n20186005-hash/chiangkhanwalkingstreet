/**
 * Server-side weather data access.
 *
 * Fetches the forecast for the attraction coordinates, normalises it into a
 * small stable shape and keeps it in a short-lived in-process cache so that
 * page renders and API requests do not hammer the upstream service.
 *
 * The module never throws: on any failure it returns the last good payload, or
 * `null` when nothing has ever been fetched. Callers render a graceful empty
 * state in that case, so a build or an edge request can never break because of
 * a transient network problem.
 */

const UPSTREAM = 'https://api.open-meteo.com/v1/forecast';

/** Refresh cycle for the server-side cache (30 minutes). */
const CACHE_TTL_MS = 30 * 60 * 1000;

export interface WeatherCurrent {
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  windGust: number;
  precipitation: number;
  code: number;
  isDay: boolean;
  cloud: number;
}

export interface WeatherDay {
  date: string;
  code: number;
  tMax: number;
  tMin: number;
  precipSum: number;
  precipProb: number;
  uv: number;
  sunrise: string;
  sunset: string;
  windMax: number;
  windGustMax: number;
}

/** Aggregates over the next 12 hours, used by the alert rules. */
export interface WeatherWindow {
  precipProbMax: number;
  precipSum: number;
  codeMax: number;
  visibilityMin: number;
  capeMax: number;
  windGustMax: number;
  tempMax: number;
  tempMin: number;
}

export interface WeatherData {
  current: WeatherCurrent;
  days: WeatherDay[];
  /** Aggregates for the next 12 hours. */
  next12h: WeatherWindow;
  /** Highest precipitation probability between 17:00 and 22:00 today — market hours. */
  eveningProb: number;
  /** Lowest visibility expected between 05:00 and 09:00 today, in metres. */
  morningVisibility: number;
  timezone: string;
  /** ISO timestamp of the fetch, used for the freshness line. */
  fetchedAt: string;
  units: { temp: string; wind: string; precip: string };
}

type Json = Record<string, any>;

let cache: { at: number; data: WeatherData } | null = null;

function buildUrl(lat: number, lng: number): string {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'cloud_cover',
      'wind_speed_10m',
      'wind_gusts_10m',
    ].join(','),
    hourly: [
      'temperature_2m',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'visibility',
      'cape',
      'wind_gusts_10m',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
    ].join(','),
    timezone: 'Asia/Bangkok',
    forecast_days: '7',
  });
  return `${UPSTREAM}?${params.toString()}`;
}

function num(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

/** Index of the first hourly step at or after the current observation. */
function leadIndex(hourly: Json | undefined, currentTime: string): number {
  const times: string[] = hourly?.time ?? [];
  const hour = String(currentTime).slice(0, 13);
  const found = times.findIndex((t) => String(t).slice(0, 13) >= hour);
  return found < 0 ? 0 : found;
}

function windowOver(hourly: Json | undefined, from: number, hours: number): WeatherWindow {
  const collect = (key: string): number[] =>
    ((hourly?.[key] ?? []) as unknown[]).slice(from, from + hours).map((v) => num(v));

  const probs = collect('precipitation_probability');
  const precs = collect('precipitation');
  const codes = collect('weather_code');
  const vis = collect('visibility');
  const capes = collect('cape');
  const gusts = collect('wind_gusts_10m');
  const temps = collect('temperature_2m');

  return {
    precipProbMax: probs.length ? Math.max(...probs) : 0,
    precipSum: precs.reduce((a, b) => a + b, 0),
    codeMax: codes.length ? Math.max(...codes) : 0,
    visibilityMin: vis.length ? Math.min(...vis) : 20000,
    capeMax: capes.length ? Math.max(...capes) : 0,
    windGustMax: gusts.length ? Math.max(...gusts) : 0,
    tempMax: temps.length ? Math.max(...temps) : 0,
    tempMin: temps.length ? Math.min(...temps) : 0,
  };
}

/** Largest precipitation probability inside a local hour band on a given day. */
function bandProbability(hourly: Json | undefined, day: string, from: number, to: number): number {
  const times: string[] = hourly?.time ?? [];
  const probs: number[] = hourly?.precipitation_probability ?? [];
  let best = 0;
  for (let i = 0; i < times.length; i += 1) {
    const stamp = String(times[i]);
    if (!stamp.startsWith(day)) continue;
    const hour = Number(stamp.slice(11, 13));
    if (Number.isFinite(hour) && hour >= from && hour <= to) best = Math.max(best, num(probs[i]));
  }
  return best;
}

/** Smallest visibility inside a local hour band on a given day, in metres. */
function bandVisibility(hourly: Json | undefined, day: string, from: number, to: number): number {
  const times: string[] = hourly?.time ?? [];
  const vis: number[] = hourly?.visibility ?? [];
  let best = Number.POSITIVE_INFINITY;
  for (let i = 0; i < times.length; i += 1) {
    const stamp = String(times[i]);
    if (!stamp.startsWith(day)) continue;
    const hour = Number(stamp.slice(11, 13));
    if (Number.isFinite(hour) && hour >= from && hour <= to) best = Math.min(best, num(vis[i], 20000));
  }
  return Number.isFinite(best) ? best : 20000;
}

function normalise(json: Json): WeatherData {
  const current = json?.current ?? {};
  const daily = json?.daily ?? {};
  const hourly: Json | undefined = json?.hourly;
  const dates: string[] = daily.time ?? [];

  const days: WeatherDay[] = dates.map((date, i) => ({
    date: String(date),
    code: num(daily.weather_code?.[i]),
    tMax: num(daily.temperature_2m_max?.[i]),
    tMin: num(daily.temperature_2m_min?.[i]),
    precipSum: num(daily.precipitation_sum?.[i]),
    precipProb: num(daily.precipitation_probability_max?.[i]),
    uv: num(daily.uv_index_max?.[i]),
    sunrise: String(daily.sunrise?.[i] ?? '').slice(11, 16),
    sunset: String(daily.sunset?.[i] ?? '').slice(11, 16),
    windMax: num(daily.wind_speed_10m_max?.[i]),
    windGustMax: num(daily.wind_gusts_10m_max?.[i]),
  }));

  const today = days[0];
  const start = leadIndex(hourly, String(current.time ?? ''));

  return {
    current: {
      temp: num(current.temperature_2m),
      feelsLike: num(current.apparent_temperature),
      humidity: num(current.relative_humidity_2m),
      wind: num(current.wind_speed_10m),
      windGust: num(current.wind_gusts_10m),
      precipitation: num(current.precipitation),
      code: num(current.weather_code),
      cloud: num(current.cloud_cover),
      isDay: current.is_day === 1 || current.is_day === true,
    },
    days,
    next12h: windowOver(hourly, start, 12),
    eveningProb: today ? bandProbability(hourly, today.date, 17, 22) : 0,
    morningVisibility: today ? bandVisibility(hourly, today.date, 5, 9) : 20000,
    timezone: String(json?.timezone ?? 'Asia/Bangkok'),
    fetchedAt: new Date().toISOString(),
    units: {
      temp: String(json?.current_units?.temperature_2m ?? '°C'),
      wind: String(json?.current_units?.wind_speed_10m ?? 'km/h'),
      precip: String(json?.current_units?.precipitation ?? 'mm'),
    },
  };
}

/**
 * Return the forecast for a coordinate pair.
 * Cached for {@link CACHE_TTL_MS}; falls back to stale data and finally to `null`.
 */
export async function getWeather(lat: number, lng: number): Promise<WeatherData | null> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.data;

  try {
    const res = await fetch(buildUrl(lat, lng), {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = normalise((await res.json()) as Json);
    cache = { at: Date.now(), data };
    return data;
  } catch {
    // Serve the most recent good payload rather than nothing.
    return cache?.data ?? null;
  }
}

/** Plain-language condition group for a WMO weather code. */
export function wmoGroup(code: number): string {
  if (code === 0) return 'clear';
  if (code === 1) return 'mainlyClear';
  if (code === 2) return 'partlyCloudy';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 65) return 'rain';
  if (code === 66 || code === 67) return 'freezingRain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'shower';
  if (code >= 85 && code <= 86) return 'snowShower';
  if (code >= 95) return 'thunder';
  return 'unknown';
}

/** Emoji glyph for a WMO code, day/night aware. */
export function wmoIcon(code: number, isDay = true): string {
  if (code === 0) return isDay ? '☀️' : '🌙';
  if (code === 1) return isDay ? '🌤️' : '🌙';
  if (code === 2) return isDay ? '⛅' : '☁️';
  if (code === 3) return '☁️';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '🌨️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95) return '⛈️';
  return isDay ? '🌤️' : '🌙';
}

/** Short weekday label for an ISO date, localised through `Intl`. */
export function weekdayLabel(date: string, lang: string, style: 'short' | 'narrow' = 'short'): string {
  const locale = lang === 'zh' ? 'zh-CN' : lang === 'th' ? 'th-TH' : 'en-GB';
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(locale, { weekday: style }).format(parsed);
  } catch {
    return parsed.toISOString().slice(0, 3);
  }
}

/** `MM/DD` display label. */
export function shortDate(date: string): string {
  return date.slice(5).replace('-', '/');
}

/** `YYYY-MM-DD` for "today" in the attraction timezone. */
export function todayInZone(timezone = 'Asia/Bangkok'): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: timezone }).format(new Date());
}
