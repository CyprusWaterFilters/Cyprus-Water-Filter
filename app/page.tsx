'use client';
import { useLanguage } from '@/components/language-provider';


import { useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, Droplets, GlassWater, Leaf, MessageCircle, Check, Coffee, CookingPot } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SupportSections } from '@/components/support-sections';
import { ProductEnquiry } from '@/components/product-enquiry';
import { ranges, modelName, productImage } from '@/lib/products';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { EnquiryDialog } from '@/components/enquiry-dialog';
import { ScrollEntrances } from '@/components/scroll-entrances';
import { CertificateTrust } from '@/components/certificate-trust';


export default function Home() {
  const { t, language } = useLanguage();
  const [selection, setSelection] = useState<string | null>(null);
  function enquire(product: string) { setSelection(product); }
  return (
    <>
      <ScrollEntrances/>
      <SiteHeader onEnquire={enquire}/>
      <main id="main">
        <section className="water-hero" aria-labelledby="hero-title">
          <picture className="water-hero-scene">
            <source media="(max-width: 56rem)" srcSet="/images/water-hero-mobile.png"/>
            <img src="/images/water-hero.png" alt={t("Sunlight sparkling through a freshly poured glass of water")} fetchPriority="high" width="1672" height="940"/>
          </picture>
          <div className="water-hero-wash" aria-hidden="true"/>
          <div className="water-hero-content">
            <p className="water-hero-kicker"><span aria-hidden="true"/> {t("COMMERCIAL-GRADE WATER, AT HOME.")}</p>
            <h1 id="hero-title"><span>{t("Commercial filtration.")}</span><span>{t("Made for")} <em>{t("home.")}</em></span></h1>
            <p className="water-hero-copy">{t("Built for demanding settings.")}<br className="water-hero-copy-break"/> {t("Professionally matched to everyday life at home.")}</p>
            <a className="water-hero-cta" href="#collection"><span>{t("Explore the systems")}</span><span className="water-hero-cta-icon" aria-hidden="true"><ArrowUpRight size={23}/></span></a>
            <p className="water-hero-reassurance"><Check size={15} aria-hidden="true"/> {t("Commercial-grade systems. Local guidance.")}</p>
          </div>
          <a href="#why" className="water-hero-discover"><span className="water-hero-discover-icon"><ArrowDown size={18}/></span><span>{t("A stronger standard.")}<br/><strong>{t("Right at home.")}</strong></span></a>
        </section>
        <div className="benefit-strip"><span><GlassWater/> {t("Commercial-grade filtration at your tap")}</span><span><Leaf/> {t("Sized for your household")}</span><span><MessageCircle/> {t("Local guidance from selection to fit")}</span></div>
        <section className="intro section" id="why">
          <p className="eyebrow">{t("COMMERCIAL PERFORMANCE. HOME COMFORT.")}</p>
          <h2>{t("A higher standard of filtration.")}<br/>{t("Made practical")} <em>{t("for home.")}</em></h2>
          <p className="intro-copy">{t("Commercial-grade filters are built for demanding use. We help bring that capability into your home, with the right range and size for your water, space and routine.")}</p>
          <div className="moments"><div><GlassWater/><h3>{t("Your everyday sip")}</h3><p>{t("Reduce chlorine taste and odour with a filter suited to your water.")}</p></div><div><Coffee/><h3>{t("Your morning ritual")}</h3><p>{t("Let the flavours in your favourite cup take centre stage.")}</p></div><div><CookingPot/><h3>{t("Your family table")}</h3><p>{t("Make filtered water part of cooking, filling and refilling.")}</p></div></div>
        </section>
        <CertificateTrust/>
        <section id="collection" className="collection section">
          <div className="section-heading"><div><p className="eyebrow">{t("COMMERCIAL-GRADE. HOME-READY.")}</p><h2>{t("Serious filtration.")} <em>{t("Made personal.")}</em></h2></div><p>{t("Three commercial-grade ranges.")}<br/>{t("One professionally matched fit.")}</p></div>
          <Tabs defaultValue="FX" className="range-tabs">
            <TabsList className="range-list" aria-label={t("Filter ranges")}>{ranges.map(range => <TabsTrigger className="range-trigger" key={range.name} value={range.name}>{range.name} <span>{t("Series")}</span></TabsTrigger>)}</TabsList>
            {ranges.map(range => <TabsContent key={range.name} value={range.name} className="range-panel">
              <div className="range-intro"><div><h3>{t(range.label)}</h3><p>{t(range.description)}</p></div><span className="range-feature"><Droplets size={17}/>{t(range.detail)}</span></div>
              <div className="product-grid" role="region" aria-label={t('{range} filters', { range: range.name })} tabIndex={0}>{[10,15,17].map((size,index) => <article className={`product-card ${range.tone}`} key={size}>
                <div className="product-visual"><span className="product-kicker">{range.name} {t("COLLECTION")}</span><span className="size-tag">{size}″</span>
                  {productImage(range.name, size) ? <img src={productImage(range.name, size)} alt={t('FLUUX {model} water filter cartridge', { model: modelName(range.name, size) })} loading="lazy" width="1122" height="1402"/> : <div className="type-product"><span>FLUUX</span><strong>{range.name}</strong><b>{size}<small>{t("inches")}</small></b><span>{t(range.purpose)}</span></div>}
                  <span className="visual-index">0{index + 1}</span>
                </div>
                <div className="product-info"><div><h3>{modelName(range.name,size)}</h3><span>{t('{size}-inch filter · {range} series', { size, range: range.name })}</span></div></div>
                <ProductEnquiry model={modelName(range.name,size)} onEnquire={enquire}/>
              </article>)}</div>
            </TabsContent>)}
          </Tabs>
          <div className="collection-browse"><a className="button primary" href={`/products?lang=${language}`}>{t("View all filters")} <ArrowUpRight size={18}/></a></div><div className="collection-foot"><p>{t("Not sure which one? Tell us a little about your home.")}</p><button className="text-link" onClick={() => enquire(t("choosing the right water filter"))}>{t("Help me choose")} <ArrowUpRight size={17}/></button></div>
        </section>
        <section className="statement"><p className="eyebrow">{t("BUILT FOR MORE. BROUGHT HOME.")}</p><h2>{t("Bring commercial-grade")}<br/><em>{t("filtration home.")}</em></h2><p>{t("Professional capability, made simple for everyday residential use.")}</p><a className="button white" href="#collection">{t("Explore the range")} <ArrowUpRight size={20}/></a><span className="statement-word" aria-hidden="true">{t("upgrade.")}</span></section>
        <SupportSections onEnquire={enquire}/>
        <section className="contact"><p className="eyebrow">{t("A COMMERCIAL STANDARD FOR YOUR HOME.")}</p><h2>{t("Commercial grade.")}<br/>{t("Chosen for")} <em>{t("your home.")}</em></h2><button className="button white" onClick={() => enquire(t("a commercial-grade water filter for my home"))}><MessageCircle size={21}/> {t("Find my system on WhatsApp")} <ArrowUpRight size={20}/></button><p>{t("Tell us about your home. We’ll help match the right system.")}</p></section>
      </main>
      <SiteFooter onEnquire={enquire}/>
      <button className="floating-chat" aria-label={t("Contact us on WhatsApp")} onClick={() => enquire(t("a water filter for my home"))}><MessageCircle size={25}/></button>
      <EnquiryDialog key={selection ?? "closed"} selection={selection} onClose={() => setSelection(null)}/>
    </>
  );
}


