/**
 * Weather → actionable advice engine.
 *
 * Visitors do not want a data dump; they want to know what to wear, what to
 * plan and what to put in their bag. This module turns a {@link WeatherData}
 * payload into a short, ordered list of advice tokens. Only tokens whose
 * condition is actually met are emitted — nothing is padded in "just in case".
 *
 * The engine emits **ids**, never prose. The caller resolves each id through
 * the i18n dictionaries, which keeps the whole rule set trilingual without
 * duplicating logic in three languages.
 *
 * Thresholds are deliberately conservative and written in everyday language
 * (Beaufort force, UV index, precipitation probability) rather than in
 * meteorological jargon.
 */

import { wmoGroup, type WeatherData } from './weather';

/** Geographical settings the rules can react to. */
export type Environment =
  | 'riverside'
  | 'urban'
  | 'mountain'
  | 'forest'
  | 'coastal'
  | 'cave'
  | 'desert';

export type AdviceGroup = 'alert' | 'outfit' | 'plan' | 'items';

/** `danger` items lead the section, `warn` sits under them, `info` is neutral. */
export type AdviceLevel = 'danger' | 'warn' | 'info';

export interface AdviceToken {
  /** Also the i18n key suffix: `weather.advice.<id>`. */
  id: string;
  group: AdviceGroup;
  level: AdviceLevel;
  icon: string;
  /** Values interpolated into the localized string, e.g. `{ range: '9' }`. */
  params?: Record<string, string | number>;
}

export interface AdviceContext {
  /** Physical setting of the attraction; drives the environment rule packs. */
  environments: readonly Environment[];
  /** Indoor shops/houses along the route that can be used as shelter. */
  indoorShelter?: boolean;
  /** Visitors are expected to cover shoulders and knees (temple etiquette). */
  dressCode?: boolean;
}

const BEAUFORT_STRONG = 39; // km/h gusts — Beaufort 6, "strong breeze"
const BEAUFORT_GALE = 50; // km/h gusts — Beaufort 7, "near gale"

/**
 * Build the full advice list, ordered for display:
 * alerts first (safety wins), then clothing, then planning, then packing.
 */
export function buildAdvice(w: WeatherData, ctx: AdviceContext): AdviceToken[] {
  const tokens: AdviceToken[] = [];
  const seen = new Set<string>();
  const add = (
    id: string,
    group: AdviceGroup,
    level: AdviceLevel,
    icon: string,
    params?: Record<string, string | number>,
  ) => {
    if (seen.has(id)) return;
    seen.add(id);
    tokens.push(params ? { id, group, level, icon, params } : { id, group, level, icon });
  };

  const now = w.current;
  const today = w.days[0];
  const win = w.next12h;

  const code = now.code;
  const group = wmoGroup(code);
  const todayGroup = today ? wmoGroup(today.code) : 'unknown';
  const windowGroup = wmoGroup(win.codeMax);

  const rainProb = Math.max(today?.precipProb ?? 0, win.precipProbMax);
  const eveningProb = w.eveningProb;
  const gust = Math.max(now.windGust, win.windGustMax);
  const tMax = today?.tMax ?? now.temp;
  const tMin = today?.tMin ?? now.temp;
  const diurnal = Math.round(tMax - tMin);
  const uv = today?.uv ?? 0;
  const visibility = Math.min(win.visibilityMin, w.morningVisibility);
  const cloud = now.cloud;

  const raining = now.precipitation > 0 || group === 'rain' || group === 'shower' || group === 'drizzle';
  const thunder = windowGroup === 'thunder' || group === 'thunder' || win.capeMax >= 1500;
  const heavyRain = win.precipSum >= 25 || (rainProb >= 80 && win.precipSum >= 15);
  const env = (name: Environment) => ctx.environments.includes(name);

  /* ---------------------------------------------------------------- alerts */

  if (thunder) {
    add('alertThunder', 'alert', 'danger', '⛈️');
  } else if (heavyRain) {
    add('alertHeavyRain', 'alert', 'danger', '🌧️');
  }

  if (gust >= BEAUFORT_GALE) {
    add('alertWind', 'alert', 'danger', '💨');
  }

  if (tMax >= 38) {
    add('alertHeat', 'alert', 'danger', '🌡️');
  }

  if (visibility <= 1200) {
    add('alertFog', 'alert', 'warn', '🌫️');
  }

  if (gust >= BEAUFORT_STRONG && gust < BEAUFORT_GALE) {
    add('alertWindy', 'alert', 'warn', '💨');
  }

  if (tMax >= 35 && tMax < 38) {
    add('alertHeatWarn', 'alert', 'warn', '🌡️');
  }

  if (uv >= 8) {
    add('alertUV', 'alert', 'warn', '☀️');
  }

  if (raining && (env('riverside') || env('urban') || env('forest') || env('cave'))) {
    add('alertSlippery', 'alert', 'warn', '🥾');
  }

  /* ---------------------------------------------------------------- outfit */

  if (tMax >= 32) add('outfitHot', 'outfit', 'info', '👕');
  else if (tMax >= 26) add('outfitWarm', 'outfit', 'info', '👕');
  else if (tMax >= 20) add('outfitMild', 'outfit', 'info', '👕');
  else if (tMax >= 14) add('outfitCool', 'outfit', 'info', '🧥');
  else add('outfitCold', 'outfit', 'warn', '🧥');

  if (diurnal > 8) add('outfitDiurnal', 'outfit', 'info', '🧥', { range: diurnal });

  if (rainProb >= 60 || raining) add('outfitRain', 'outfit', 'warn', '🧥');

  if (now.humidity >= 80 && tMax >= 28) add('outfitHumid', 'outfit', 'info', '👕');

  if (gust >= 30) add('outfitWind', 'outfit', 'info', '🧢');

  if (ctx.dressCode) add('outfitCover', 'outfit', 'info', '🧣');

  /* ------------------------------------------------------------------ plan */

  if (thunder) {
    add('planThunder', 'plan', 'danger', '⛈️');
  } else if (heavyRain) {
    add('planHeavyRain', 'plan', 'danger', '🌧️');
  }

  if (rainProb >= 60 && !heavyRain && !thunder) {
    add('planRain', 'plan', 'warn', '☂️');
  }

  if (tMax >= 32 && !thunder) add('planHeat', 'plan', 'warn', '🌡️');

  if (gust >= BEAUFORT_STRONG && !thunder) add('planWind', 'plan', 'warn', '💨');

  if (raining) add('planSlippery', 'plan', 'warn', '🥾');

  if (eveningProb >= 60 && !thunder && !heavyRain) add('planEvening', 'plan', 'warn', '🌆');

  if (ctx.indoorShelter && rainProb >= 60) add('planIndoor', 'plan', 'info', '🏠');

  if ((tMax - tMin) <= 6 && cloud <= 25 && !raining) {
    add('planSunny', 'plan', 'info', '🌤️');
  } else if (todayGroup === 'overcast') {
    add('planOvercast', 'plan', 'info', '☁️');
  } else if (todayGroup === 'partlyCloudy' || todayGroup === 'mainlyClear') {
    add('planPartly', 'plan', 'info', '⛅');
  }

  const mistyMorning = now.humidity >= 92 && w.morningVisibility <= 4000 && !raining;
  if (mistyMorning) add('planMist', 'plan', 'info', '🌫️');

  const cleanSunset = cloud <= 60 && !raining && windowGroup !== 'rain' && windowGroup !== 'thunder';
  if (cleanSunset) add('planSunset', 'plan', 'info', '🌇');
  else if (raining || cloud >= 85) add('planNoSunset', 'plan', 'info', '🌥️');

  const bugs = tMin >= 24 && now.humidity >= 70 && !thunder;
  if (bugs && (env('riverside') || env('forest'))) add('planInsect', 'plan', 'info', '🦟');

  /* ----------------------------------------------------------------- items */

  if (rainProb >= 60 || raining) add('itemUmbrella', 'items', 'info', '☂️');
  else if (rainProb >= 40) add('itemFoldingUmbrella', 'items', 'info', '🌂');

  if (gust >= BEAUFORT_STRONG) add('itemRaincoat', 'items', 'info', '🧥');

  if (uv >= 5 || cloud <= 30) add('itemSunscreen', 'items', 'info', '🧴');
  if (uv >= 5) add('itemSunglasses', 'items', 'info', '🕶️');

  if (tMax >= 32) add('itemWater', 'items', 'info', '💧');

  if (tMin <= 20 || diurnal > 8) add('itemJacket', 'items', 'info', '🧥');

  if (raining || rainProb >= 60) add('itemShoes', 'items', 'info', '🥾');

  if (bugs) add('itemRepellent', 'items', 'info', '🦟');

  if (tMax >= 30 && gust < 25 && uv >= 5) add('itemHat', 'items', 'info', '🧢');

  /* -------------------------------------------------- environment rule packs */
  // Each pack only fires when the attraction declares that environment, so a
  // riverside walking street never inherits mountain or desert advice.

  if (env('riverside')) {
    if (rainProb >= 60 || win.precipSum >= 15) add('envRiversideBank', 'alert', 'warn', '🌊');
    if (gust >= 25) add('envRiversideWind', 'plan', 'info', '💨');
  }

  if (env('urban')) {
    if (rainProb >= 60 && !ctx.indoorShelter) add('envUrbanShelter', 'plan', 'info', '🏠');
    if (tMax >= 33 && gust < 25) add('envUrbanHeat', 'plan', 'info', '🌡️');
  }

  if (env('mountain')) {
    if (diurnal > 9 || tMin <= 15) add('envMountainTemp', 'outfit', 'info', '🧥');
    if (visibility >= 10000 && cloud <= 40) add('envMountainView', 'plan', 'info', '🔭');
    if (heavyRain || thunder) add('envMountainStorm', 'alert', 'danger', '⛰️');
  }

  if (env('forest')) {
    if (rainProb >= 50) add('envForestTrail', 'plan', 'warn', '🥾');
    if (tMin >= 22 && now.humidity >= 65) add('envForestInsect', 'items', 'info', '🦟');
  }

  if (env('coastal')) {
    if (gust >= BEAUFORT_STRONG) add('envCoastalWind', 'alert', 'warn', '🌊');
    if (thunder || gust >= BEAUFORT_GALE) add('envCoastalSwim', 'alert', 'danger', '🏊');
    if (uv >= 6) add('envCoastalUV', 'alert', 'warn', '☀️');
  }

  if (env('cave')) {
    add('envCaveTemp', 'outfit', 'info', '🧥');
    if (raining || rainProb >= 60) add('envCaveSlick', 'alert', 'warn', '🥾');
  }

  if (env('desert')) {
    if (gust >= 30 && now.humidity <= 45) add('envDesertDust', 'alert', 'warn', '😷');
    if (diurnal > 12) add('envDesertDiurnal', 'outfit', 'info', '🧥');
  }

  /* ---------------------------------------------------------------- ordering */

  const groupRank: Record<AdviceGroup, number> = { alert: 0, outfit: 1, plan: 2, items: 3 };
  const levelRank: Record<AdviceLevel, number> = { danger: 0, warn: 1, info: 2 };

  return tokens.sort(
    (a, b) =>
      groupRank[a.group] - groupRank[b.group] ||
      levelRank[a.level] - levelRank[b.level] ||
      a.id.localeCompare(b.id),
  );
}

/** Split a token list into the four display buckets. */
export function groupAdvice(tokens: AdviceToken[]): Record<AdviceGroup, AdviceToken[]> {
  return {
    alert: tokens.filter((t) => t.group === 'alert'),
    outfit: tokens.filter((t) => t.group === 'outfit'),
    plan: tokens.filter((t) => t.group === 'plan'),
    items: tokens.filter((t) => t.group === 'items'),
  };
}

/** Resolve an advice token to display text using a lookup function. */
export function adviceText(
  token: AdviceToken,
  lookup: (key: string) => string | undefined,
): string {
  let text = lookup(`weather.advice.${token.id}`) ?? '';
  for (const [key, value] of Object.entries(token.params ?? {})) {
    text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return text;
}
