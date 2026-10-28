'use client';
import { Droplets, ArrowUpRight, MessageCircle } from 'lucide-react';
import { useLanguage } from './language-provider';
import { business } from '@/lib/business';
import { BrandName } from './brand-name';
export function SiteFooter({ onEnquire }: { onEnquire: (subject: string) => void }) {
 const { t, language } = useLanguage();
 const home = `/?lang=${language}`;
 return <footer className="site-footer">
   <div className="footer-cta">
     <div><p className="eyebrow">{t('COMMERCIAL-GRADE. HOME-READY.')}</p><h2>{t('Bring a higher standard home.')}</h2><p>{t('Tell us about your home. We’ll help match the right system.')}</p></div>
     <button className="footer-whatsapp" onClick={() => onEnquire(t('a water filter for my home'))}><MessageCircle size={22}/><span>{t('Let’s talk on WhatsApp')}</span><ArrowUpRight size={20}/></button>
   </div>
   <div className="footer-main">
     <div className="footer-brand"><a className="wordmark" href={home} aria-label={`${business.name} · ${t('Home')}`}><Droplets/><BrandName/></a><p>{t('Commercial-grade filtration. Made for home.')}</p></div>
     <nav className="footer-links" aria-label={t('Main navigation')}>
       <div><p>{t('Explore the collection')}</p><a href={`${home}#why`}>{t('Why filtered water')}<ArrowUpRight size={14}/></a><a href={`/products?lang=${language}`}>{t('Our filters')}<ArrowUpRight size={14}/></a><a href={`/certificates?lang=${language}`}>{t('Certificates')}<ArrowUpRight size={14}/></a><a href={`${home}#how`}>{t('How it works')}<ArrowUpRight size={14}/></a></div>
       <div><p>{t('Filter ranges')}</p>{['FX', 'HF2', 'HF2-S'].map(range => <a key={range} href={`/products?lang=${language}&range=${range}#browse`}>{range}<ArrowUpRight size={14}/></a>)}</div>
     </nav>
   </div>
   <div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}</span><span>FX · HF2 · HF2-S</span><button onClick={() => onEnquire(t('a water filter for my home'))}>{t('Get in touch')}<ArrowUpRight size={14}/></button></div>
 </footer>;
}
