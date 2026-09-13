/**
 * Turn a raw forecast plus the advice engine output into a single, fully
 * localized view model.
 *
 * Both the server-rendered module and the on-demand endpoint build this same
 * object, so what a visitor reads on first paint and what the browser fetches
 * a moment later are guaranteed to be identical in shape and wording.
 */

import {
  adviceText,
  buildAdvice,
  groupAdvice,
  type AdviceContext,
  type AdviceGroup,
  type AdviceLevel,
  type AdviceToken,
} from './advice';
import { lookup, normaliseLang } from './i18n-server';
import { shortDate, weekdayLabel, wmoGroup, wmoIcon, type WeatherData } from './weather';

export interface LocalizedAdvice {
  group: AdviceGroup;
  level: AdviceLevel;
  icon: string;
  text: string;
}

export interface WeatherViewDay {
  date: string;
  label: string;
  dateLabel: string;
  icon: string;
  condition: string;
  tMax: number;
  tMin: number;
  precipProb: number;
  precipSum: number;
  uv: number;
  windGustMax: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherView {
  lang: string;
  fetchedAt: string;
  /** Local time of the observation, `HH:MM`. */
  updatedAt: string;
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    wind: number;
    gust: number;
    precipitation: number;
    cloud: number;
    isDay: boolean;
    code: number;
    icon: string;
    condition: string;
  };
  metrics: {
    uv: number;
    visibilityKm: number;
    eveningProb: number;
    sunrise: string;
    sunset: string;
  };
  days: WeatherViewDay[];
  advice: Record<AdviceGroup, LocalizedAdvice[]>;
  strings: {
    noAlert: string;
    updated: string;
    groupAlert: string;
    groupOutfit: string;
    groupPlan: string;
    groupItems: string;
  };
  units: { temp: string; wind: string; precip: string };
}

/** Order of the four advice buckets as rendered. */
export const ADVICE_ORDER: AdviceGroup[] = ['alert', 'outfit', 'plan', 'items'];

function localTime(iso: string, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(iso));
  } catch {
    return iso.slice(11, 16);
  }
}

export function buildWeatherView(
  langInput: string | null | undefined,
  w: WeatherData,
  ctx: AdviceContext,
): WeatherView {
  const lang = normaliseLang(langInput);
  const text = (key: string): string => lookup(lang, key);
  const condition = (code: number): string => text(`weather.cond.${wmoGroup(code)}`) || '—';

  const grouped = groupAdvice(buildAdvice(w, ctx));
  const localize = (token: AdviceToken): LocalizedAdvice => ({
    group: token.group,
    level: token.level,
    icon: token.icon,
    text: adviceText(token, (key) => text(key)),
  });

  const advice: Record<AdviceGroup, LocalizedAdvice[]> = {
    alert: grouped.alert.map(localize),
    outfit: grouped.outfit.map(localize),
    plan: grouped.plan.map(localize),
    items: grouped.items.map(localize),
  };

  const days: WeatherViewDay[] = w.days.map((day, index) => ({
    date: day.date,
    label:
      index === 0
        ? text('weather.today') || 'Today'
        : index === 1
          ? text('weather.tomorrow') || 'Tomorrow'
          : weekdayLabel(day.date, lang),
    dateLabel: shortDate(day.date),
    icon: wmoIcon(day.code, true),
    condition: condition(day.code),
    tMax: Math.round(day.tMax),
    tMin: Math.round(day.tMin),
    precipProb: Math.round(day.precipProb),
    precipSum: Math.round(day.precipSum * 10) / 10,
    uv: Math.round(day.uv),
    windGustMax: Math.round(day.windGustMax),
    sunrise: day.sunrise,
    sunset: day.sunset,
  }));

  const today = w.days[0];

  return {
    lang,
    fetchedAt: w.fetchedAt,
    updatedAt: localTime(w.fetchedAt, w.timezone),
    current: {
      temp: Math.round(w.current.temp),
      feelsLike: Math.round(w.current.feelsLike),
      humidity: Math.round(w.current.humidity),
      wind: Math.round(w.current.wind),
      gust: Math.round(w.current.windGust),
      precipitation: Math.round(w.current.precipitation * 10) / 10,
      cloud: Math.round(w.current.cloud),
      isDay: w.current.isDay,
      code: w.current.code,
      icon: wmoIcon(w.current.code, w.current.isDay),
      condition: condition(w.current.code),
    },
    metrics: {
      uv: Math.round(today?.uv ?? 0),
      visibilityKm: Math.round(Math.min(w.next12h.visibilityMin, w.morningVisibility) / 100) / 10,
      eveningProb: Math.round(w.eveningProb),
      sunrise: today?.sunrise ?? '',
      sunset: today?.sunset ?? '',
    },
    days,
    advice,
    strings: {
      noAlert: text('weather.noAlert'),
      updated: text('weather.updated'),
      groupAlert: text('weather.groupAlert'),
      groupOutfit: text('weather.groupOutfit'),
      groupPlan: text('weather.groupPlan'),
      groupItems: text('weather.groupItems'),
    },
    units: w.units,
  };
}

/** The weather context an attraction declares, in the shape the rules expect. */
export function adviceContextFrom(config: {
  environments: readonly string[];
  indoorShelter?: boolean;
  dressCode?: boolean;
}): AdviceContext {
  return {
    environments: config.environments as AdviceContext['environments'],
    indoorShelter: config.indoorShelter,
    dressCode: config.dressCode,
  };
}
