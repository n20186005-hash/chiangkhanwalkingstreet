/**
 * Dictionary lookup usable outside of an Astro page context.
 *
 * `getI18n()` in `src/i18n/ui.ts` resolves translations from a request URL,
 * which is all an Astro page needs. Server functions such as the on-demand
 * weather endpoint run without a page context, so they need a plain
 * language → dictionary lookup instead. Both paths read the same JSON files,
 * so translations never diverge.
 */

import { defaultLang } from '../i18n/ui';
import en from '../i18n/en.json';
import th from '../i18n/th.json';
import zh from '../i18n/zh.json';

const dictionaries: Record<string, any> = { zh, en, th };

/** Coerce any value to a supported language code. */
export function normaliseLang(input: string | null | undefined): string {
  if (input && Object.prototype.hasOwnProperty.call(dictionaries, input)) return input;
  return defaultLang;
}

/** Raw dictionary for a language. */
export function dictionary(lang: string | null | undefined): any {
  return dictionaries[normaliseLang(lang)];
}

/** Resolve a dotted key such as `weather.groupItems`; empty string when missing. */
export function lookup(lang: string | null | undefined, key: string): string {
  const found = key
    .split('.')
    .reduce<any>((node, part) => (node == null ? undefined : node[part]), dictionary(lang));
  return typeof found === 'string' ? found : '';
}
