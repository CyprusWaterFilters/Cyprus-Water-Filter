'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Globe2, ChevronDown } from 'lucide-react';
import { isLanguage, translate, type Language } from '@/lib/i18n';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';

const LanguageContext = createContext({ language: 'en' as Language, setLanguage: (_language: Language) => {}, t: (text: string, values?: Record<string, string | number>) => translate('en', text, values) });
export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, updateLanguage] = useState<Language>('en');
  useEffect(() => {
    const readLanguage = () => {
      const query = new URL(window.location.href).searchParams.get('lang');
      let saved: string | null = null;
      try { saved = localStorage.getItem('homewater-language'); } catch { /* Preferences are optional. */ }
      updateLanguage(isLanguage(query) ? query : isLanguage(saved) ? saved : 'en');
    };
    readLanguage();
    window.addEventListener('popstate', readLanguage);
    return () => window.removeEventListener('popstate', readLanguage);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    const pathname = window.location.pathname.replace(/\/$/, '');
    const productsPage = pathname === '/products';
    const certificatesPage = pathname === '/certificates';
    const title = certificatesPage ? 'Certificates | Homewater' : productsPage ? 'Commercial-grade filters | Homewater' : 'Homewater | Commercial-grade water filtration for your home';
    const description = certificatesPage ? 'Explore Microfilter product certifications, approvals and quality credentials with clear context on their scope.' : productsPage ? 'Compare nine commercial-grade FX, HF2 and HF2-S filters selected for residential use.' : 'Explore commercial-grade FX, HF2 and HF2-S water filtration systems selected and fitted for residential use.';
    document.title = translate(language, title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', translate(language, description));
  }, [language]);
  function setLanguage(next: Language) {
    updateLanguage(next);
    try { localStorage.setItem('homewater-language', next); } catch { /* Navigation works without storage. */ }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.pushState({}, '', url);
  }
  return <LanguageContext.Provider value={{ language, setLanguage, t: (text, values) => translate(language, text, values) }}>{children}</LanguageContext.Provider>;
}

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const languages = [{ code: 'en', name: 'English' }, { code: 'el', name: 'Ελληνικά' }, { code: 'ru', name: 'Русский' }];
  return <DropdownMenu modal={false}>
    <DropdownMenuTrigger className="language-switcher" aria-label={`${t('Language')}: ${languages.find(item => item.code === language)?.name}`}>
      <Globe2 size={16} aria-hidden="true"/>
      <span>{language.toUpperCase()}</span>
      <ChevronDown className="language-chevron" size={12} aria-hidden="true"/>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="language-menu" align="end" sideOffset={10}>
      <DropdownMenuGroup>
        <DropdownMenuLabel className="language-menu-label">{t('Language')}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={language} onValueChange={value => { if (isLanguage(value)) setLanguage(value); }}>
          {languages.map(item => <DropdownMenuRadioItem className="language-option" key={item.code} value={item.code} label={item.name} closeOnClick>
            <span className="language-code" aria-hidden="true">{item.code.toUpperCase()}</span>
            <span className="language-name" lang={item.code}>{item.name}</span>
          </DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>;
}
