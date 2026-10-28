'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Droplets, MessageCircle } from 'lucide-react';
import { useLanguage, LanguageSwitcher } from './language-provider';
import { business } from '@/lib/business';
import { BrandName } from './brand-name';
export function SiteHeader({ onEnquire, productsPage = false, certificatesPage = false }: { onEnquire: (subject: string) => void; productsPage?: boolean; certificatesPage?: boolean }) {
  const { t, language } = useLanguage();
  const homeLink = productsPage || certificatesPage ? '/?lang=' + language : '';
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const navigation = useRef<HTMLElement>(null);
  function highlightLink(link: Element | null) {
    const nav = navigation.current;
    if (!nav || !window.matchMedia('(min-width: 64.001rem)').matches) return;
    if (!(link instanceof HTMLElement)) { nav.style.setProperty('--nav-highlight-opacity', '0'); return; }
    const bounds = link.getBoundingClientRect();
    const navBounds = nav.getBoundingClientRect();
    nav.style.setProperty('--nav-highlight-x', `${bounds.left - navBounds.left - nav.clientLeft}px`);
    nav.style.setProperty('--nav-highlight-width', `${bounds.width}px`);
    nav.style.setProperty('--nav-highlight-opacity', '1');
  }
  function restoreHighlight() {
    const nav = navigation.current;
    const focused = nav?.contains(document.activeElement) && document.activeElement?.matches('a') ? document.activeElement : null;
    highlightLink(focused || nav?.querySelector('a[aria-current="page"]') || null);
  }
  useEffect(() => {
    restoreHighlight();
    if (!navigation.current || !('ResizeObserver' in window)) return;
    const observer = new ResizeObserver(restoreHighlight);
    observer.observe(navigation.current);
    return () => observer.disconnect();
  }, [language, productsPage, certificatesPage]);
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 64rem)');
    const updateNavigation = () => {
      if (navigation.current) navigation.current.inert = mobile.matches && !menu;
      if (!mobile.matches) setMenu(false);
    };
    updateNavigation();
    mobile.addEventListener('change', updateNavigation);
    return () => mobile.removeEventListener('change', updateNavigation);
  }, [menu]);
  useEffect(() => {
    if (!menu) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(false); menuButton.current?.focus(); }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setMenu(false);
    };
    const desktop = window.matchMedia('(min-width: 64.001rem)');
    const closeOnDesktop = () => { if (desktop.matches) setMenu(false); };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [menu]);
  return <>
      <a className="skip-link" href="#main">{t("Skip to content")}</a>
      <div className="announcement">{t("Commercial-grade filtration. Made for home.")} <Droplets size={14}/></div>
      <header className="header" ref={header} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMenu(false); }}>
        <a className="wordmark" href={`/?lang=${language}`} aria-label={`${business.name} · ${t('Home')}`}><Droplets strokeWidth={1.8}/><BrandName/></a>
        <nav ref={navigation} id="main-navigation" aria-label={t("Main navigation")} className={menu ? 'nav open' : 'nav'} onPointerOver={event => { if (event.target instanceof Element) highlightLink(event.target.closest('a')); }} onPointerLeave={restoreHighlight} onFocusCapture={event => { if (event.target instanceof Element) highlightLink(event.target.closest('a')); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) highlightLink(navigation.current?.querySelector('a[aria-current="page"]') || null); }}>
          <a href={`${homeLink}#why`} onClick={() => setMenu(false)}><span>{t("Why filtered water")}</span><ArrowUpRight className="nav-link-arrow" size={20} aria-hidden="true"/></a><a href={`/products?lang=${language}`} aria-current={productsPage ? "page" : undefined} onClick={() => setMenu(false)}><span>{t("Our filters")}</span><ArrowUpRight className="nav-link-arrow" size={20} aria-hidden="true"/></a><a href={`/certificates?lang=${language}`} aria-current={certificatesPage ? "page" : undefined} onClick={() => setMenu(false)}><span>{t("Certificates")}</span><ArrowUpRight className="nav-link-arrow" size={20} aria-hidden="true"/></a><a href={`${homeLink}#how`} onClick={() => setMenu(false)}><span>{t("How it works")}</span><ArrowUpRight className="nav-link-arrow" size={20} aria-hidden="true"/></a>
          <div className="mobile-nav-contact">
            <button className="mobile-nav-whatsapp" onClick={() => { setMenu(false); onEnquire(t('a water filter for my home')); }}>
              <MessageCircle size={20} aria-hidden="true"/>
              <span>{t('Let’s talk on WhatsApp')}</span>
              <ArrowUpRight size={18} aria-hidden="true"/>
            </button>
          </div>
        </nav>
        <button className="nav-cta" onClick={() => onEnquire(t("a water filter for my home"))}>{t("Let’s talk water")} <ArrowUpRight size={17}/></button>
        <LanguageSwitcher/>
        <button ref={menuButton} className="mobile-menu" aria-label={menu ? t("Close navigation") : t("Open navigation")} aria-controls="main-navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}><span className="menu-glyph" aria-hidden="true"><span/><span/></span></button>
      </header>
  </>;
}
