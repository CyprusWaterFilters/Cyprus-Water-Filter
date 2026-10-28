'use client';

import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { useLanguage } from './language-provider';
import { featuredCertificates } from '@/lib/certificates';

export function CertificateTrust() {
  const { t, language } = useLanguage();
  return <section className="certificate-trust section" aria-labelledby="certificate-trust-title">
    <div className="certificate-trust-heading">
      <div>
        <p className="eyebrow">{t('INDEPENDENTLY VERIFIED STANDARDS')}</p>
        <h2 id="certificate-trust-title">{t('Proof you can')} <em>{t('look into.')}</em></h2>
      </div>
      <div className="certificate-trust-intro">
        <p>{t('Microfilter’s certification portfolio includes recognised standards for drinking-water treatment performance.')}</p>
        <a href={`/certificates?lang=${language}`}>{t('Explore all certificates')} <ArrowUpRight size={18}/></a>
      </div>
    </div>
    <div className="certificate-feature-grid">
      {featuredCertificates.map((certificate, index) => <article className="certificate-feature-card" key={certificate.code}>
        <div className="certificate-feature-top"><span className="certificate-seal"><ShieldCheck size={22}/><b>{certificate.number}</b></span><span>0{index + 1}</span></div>
        <p className="certificate-code">{certificate.code}</p>
        <h3>{t(certificate.title)}</h3>
        <p>{t(certificate.description)}</p>
        <span className="certificate-verified"><Check size={14}/>{t('Independent product standard')}</span>
      </article>)}
    </div>
    <p className="certificate-scope-note">{t('Certification scope is model-specific. Ask us to confirm the current certification for your chosen filter.')}</p>
  </section>;
}
