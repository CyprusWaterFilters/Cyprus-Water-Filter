import { useLanguage } from '@/components/language-provider';
import { ArrowUpRight } from 'lucide-react';
import { enquiryUrl } from '@/lib/business';

export function ProductEnquiry({ model, onEnquire }: { model: string; onEnquire: (subject: string) => void }) {
  const { t } = useLanguage();
  const href = enquiryUrl(t("Hello! I'm interested in the {model} water filter. Could you tell me the price, availability and whether it is suitable for my home?", { model }));
  const content = <>
    <svg className="filter-whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.59 5.96L0 24l6.27-1.64a11.92 11.92 0 0 0 5.78 1.47h.01C18.63 23.83 24 18.48 24 11.9a11.85 11.85 0 0 0-3.48-8.42ZM12.06 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.97.99-3.63-.24-.37a9.85 9.85 0 0 1-1.52-5.25c0-5.47 4.46-9.92 9.93-9.92a9.85 9.85 0 0 1 7.01 2.91A9.85 9.85 0 0 1 22 11.93c0 5.46-4.46 9.87-9.94 9.87Zm5.45-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.21 3.09c.15.2 2.11 3.22 5.11 4.52.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.18-1.42-.08-.12-.28-.2-.58-.35Z"/></svg>
    <span className="filter-whatsapp-copy">{t("Ask on WhatsApp")}</span>
    <span className="filter-whatsapp-arrow" aria-hidden="true"><ArrowUpRight size={18}/></span>
  </>;
  return <div className="filter-enquiry-wrap">
    {href ? <a className="filter-whatsapp-cta" href={href} target="_blank" rel="noopener noreferrer" aria-label={t('Ask about {model} on WhatsApp (opens in a new tab)', { model })}>{content}</a>
      : <button className="filter-whatsapp-cta" onClick={() => onEnquire(t('the {model} filter', { model }))} aria-label={t('Prepare a WhatsApp enquiry about {model}', { model })}>{content}</button>}
    <p className="filter-whatsapp-note">{t(href ? '{model} enquiry · Opens WhatsApp' : 'Enquire about the {model}', { model })}</p>
  </div>;
}
