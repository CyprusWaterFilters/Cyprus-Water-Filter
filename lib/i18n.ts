import translations from './translations.json';

export type Language = 'en' | 'el' | 'ru';
export function isLanguage(value: unknown): value is Language { return value === 'en' || value === 'el' || value === 'ru'; }
export function translate(language: Language, text: string, values: Record<string, string | number> = {}) {
  const entry = (translations as Record<string, string[]>)[text];
  const translated = language === 'en' ? text : entry?.[language === 'el' ? 0 : 1] ?? text;
  return translated.replace(/\{(\w+)\}/g, (token, key: string) => String(values[key] ?? token));
}
