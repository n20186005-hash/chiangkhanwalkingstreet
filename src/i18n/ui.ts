import zh from './zh.json';
import en from './en.json';
import th from './th.json';
// Type-only import (erased at build time), so this does not couple the i18n
// runtime to the data layer. It exists so `getLangFromUrl` can return the
// union `Lang` instead of `string`, which is what lets `pick(tr, lang)`
// type-check at every call site.
import type { Lang } from '../data/attractions';

export const defaultLang = 'th';
export const languagesList = ['zh', 'en', 'th'] as const;

/**
 * Short labels for the language switcher.
 *
 * Thai is the default locale, so a first-time visitor sees Thai content and a
 * compact switcher reading 中 / en / ไทย.
 */
export const languages: Record<string, string> = {
  zh: '中',
  en: 'en',
  th: 'ไทย',
};

/** Full language names, used for `title` and `aria-label` where space allows. */
export const languageNames: Record<string, string> = {
  zh: '中文',
  en: 'English',
  th: 'ไทย',
};

const ui: Record<string, any> = { zh, en, th };

export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/').filter(Boolean);
  const lang = seg[0];
  return (languagesList as readonly string[]).includes(lang) ? (lang as Lang) : defaultLang;
}

export function getI18n(url: URL) {
  const lang = getLangFromUrl(url);
  const messages = ui[lang];
  const t = (key: string): string => {
    const found = key
      .split('.')
      .reduce<any>((o, i) => (o == null ? undefined : o[i]), messages);
    return found ?? '';
  };
  return { lang, messages, t };
}

/**
 * Build the per-language URL for a content path, in the site's one canonical
 * shape: always a leading slash, always a trailing slash.
 *
 * The slash matters for SEO here — Google had indexed both `/th/terms` and
 * `/th/terms/` as separate URLs, halving the impressions each one earned.
 */
export function buildAlternates(path = ''): Record<string, string> {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const mk = (l: string) => (clean ? `/${l}/${clean}/` : `/${l}/`);
  return {
    zh: mk('zh'),
    en: mk('en'),
    th: mk('th'),
    xDefault: mk('th'),
  };
}

export function htmlLangAttr(lang: string): string {
  if (lang === 'zh') return 'zh-CN';
  return lang;
}

/** Fill `{placeholder}` tokens in a template string with the given variables. */
export function format(template: string, vars: Record<string, string>): string {
  if (!template) return '';
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}
