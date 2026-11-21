import translations from './translations.json';

export type Language = 'en' | 'el' | 'ru' | 'he';
export function isLanguage(value: unknown): value is Language { return value === 'en' || value === 'el' || value === 'ru' || value === 'he'; }
export function translate(language: Language, text: string, values: Record<string, string | number> = {}) {
  const entry = (translations as Record<string, string[]>)[text];
  const translated = language === 'en' ? text : entry?.[{ el: 0, ru: 1, he: 2 }[language]] ?? text;
  return translated.replace(/\{(\w+)\}/g, (token, key: string) => String(values[key] ?? token));
}
