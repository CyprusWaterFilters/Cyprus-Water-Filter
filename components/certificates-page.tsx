'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, ExternalLink, FileCheck2, MessageCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from './language-provider';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { EnquiryDialog } from './enquiry-dialog';
import { ScrollEntrances } from './scroll-entrances';
import { certificateArchive, featuredCertificates } from '@/lib/certificates';

export function CertificatesPage() {
  const { t, language } = useLanguage();
  const [selection, setSelection] = useState<string | null>(null);
  const enquire = (subject: string) => setSelection(subject);
  return <>
    <ScrollEntrances/>
    <SiteHeader onEnquire={enquire} certificatesPage/>
    <main id="main" className="certificates-page">
      <section className="certificates-hero">
        <nav className="certificates-breadcrumb" aria-label={t('Breadcrumb')}><a href={`/?lang=${language}`}>{t('Home')}</a><span>/</span><span>{t('Certificates')}</span></nav>
        <div className="certificates-hero-grid">
          <div><p className="eyebrow">{t('DOCUMENTED. VERIFIED. EXPLAINED.')}</p><h1>{t('Verified standards.')}<br/><em>{t('Clear context.')}</em></h1></div>
          <div className="certificates-hero-copy"><p>{t('See the standards, approvals and quality credentials behind Microfilter — with a clear view of what each document means.')}</p><a href="#featured">{t('See the key standards')} <ArrowUpRight size={18}/></a></div>
        </div>
        <div className="certificates-hero-proof"><span><ShieldCheck size={18}/>{t('Product standards')}</span><span><FileCheck2 size={18}/>{t('Manufacturer credentials')}</span><span><Check size={18}/>{t('Scope explained')}</span></div>
      </section>

      <section id="featured" className="certificates-featured section" aria-labelledby="featured-title">
        <div className="certificates-section-heading"><div><p className="eyebrow">{t('THE THREE TO KNOW')}</p><h2 id="featured-title">{t('The clearest signals for')}<br/><em>{t('drinking-water filtration.')}</em></h2></div><p>{t('For European households comparing filter performance, these internationally recognised NSF standards provide the most useful starting point. Certification remains model-specific.')}</p></div>
        <div className="certificates-featured-list">
          {featuredCertificates.map((certificate, index) => <article key={certificate.code}>
            <span className="featured-number">0{index + 1}</span>
            <div className="featured-seal"><ShieldCheck size={26}/><strong>{certificate.number}</strong></div>
            <div><p>{certificate.code}</p><h3>{t(certificate.title)}</h3><p>{t(certificate.description)}</p></div>
          </article>)}
        </div>
      </section>

      <section className="certificate-disclosure section">
        <div className="certificate-disclosure-mark"><FileCheck2 size={30}/></div>
        <div><p className="eyebrow">{t('CHECK THE EXACT MODEL')}</p><h2>{t('Certification has a scope.')}</h2></div>
        <p>{t('Certifications are product- and model-specific. Dates and scopes in the manufacturer archive vary, and some documents are historic. Ask us to confirm the current listing for your exact model before purchase.')}</p>
        <button onClick={() => enquire(t('the certification for a specific water filter'))}>{t('Ask us to verify a model')} <MessageCircle size={18}/></button>
      </section>

      <section className="certificate-library section" aria-labelledby="library-title">
        <div className="certificates-section-heading"><div><p className="eyebrow">{t('THE WIDER ARCHIVE')}</p><h2 id="library-title">{t('A broader record of')}<br/><em>{t('quality and innovation.')}</em></h2></div><p>{t('The manufacturer’s archive also includes market approvals, management-system certificates and intellectual-property records. Historic documents are labelled clearly below.')}</p></div>
        <div className="certificate-library-grid">
          {certificateArchive.map((certificate, index) => <article className="certificate-document" key={certificate.title}>
            <div className="certificate-document-image"><img src={certificate.image} alt={t('{title} document from the Microfilter archive', { title: certificate.title })} loading="lazy"/><span>{String(index + 1).padStart(2, '0')}</span></div>
            <div className="certificate-document-copy"><p>{t(certificate.category)}</p><h3>{t(certificate.title)}</h3><p>{t(certificate.note)}</p></div>
          </article>)}
        </div>
      </section>

      <section className="certificate-sources section">
        <div><p className="eyebrow">{t('GO TO THE SOURCE')}</p><h2>{t('See the original records.')}</h2><p>{t('Review the manufacturer archive or search the official NSF database for current, model-level listings.')}</p></div>
        <div className="certificate-source-links"><a href="https://microfilterkorea.com/?page_id=855" target="_blank" rel="noreferrer">{t('Microfilter certificate archive')}<ExternalLink size={18}/></a><a href="https://info.nsf.org/Certified/dwtu/listings.asp?CompanyName=microfilter&Program=DWTU" target="_blank" rel="noreferrer">{t('Official NSF listings')}<ExternalLink size={18}/></a></div>
      </section>
    </main>
    <SiteFooter onEnquire={enquire}/>
    <button className="floating-chat" aria-label={t('Contact us on WhatsApp')} onClick={() => enquire(t('the certification for a specific water filter'))}><MessageCircle size={25}/></button>
    <EnquiryDialog key={selection ?? 'closed'} selection={selection} onClose={() => setSelection(null)}/>
  </>;
}
