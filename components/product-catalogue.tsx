'use client';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Search, X, Droplets, SlidersHorizontal, MessageCircle, Check } from 'lucide-react';
import { useLanguage } from './language-provider';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { ProductEnquiry } from './product-enquiry';
import { EnquiryDialog } from './enquiry-dialog';
import { ScrollEntrances } from './scroll-entrances';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { ranges, sizes, products, productImage, type Product } from '@/lib/products';
import { defaultFilters, readFilters, filterProducts, type CatalogueFilters } from '@/lib/catalogue';

function ProductVisual({ product, eager = false }: { product: Product; eager?: boolean }) {
  const { t } = useLanguage();
  return <div className={`catalogue-visual ${product.tone}`}>
    <span className="catalogue-range-tag">{product.name}</span><span className="catalogue-size-tag">{product.size}″</span>
    {productImage(product.name, product.size) ? <img src={productImage(product.name, product.size)} alt={t('FLUUX {model} water filter cartridge', { model: product.model })} width={1122} height={1402} loading={eager ? 'eager' : 'lazy'}/> : <div className="catalogue-type-product"><span>FLUUX</span><strong>{product.name}</strong><span>{product.size} {t('inches')}</span><p>{t(product.purpose)}</p></div>}
  </div>;
}

export function ProductCatalogue() {
  const { t, language } = useLanguage();
  const [filters, setFilters] = useState<CatalogueFilters>(defaultFilters);
  const [selection, setSelection] = useState<string | null>(null);
  const [detail, setDetail] = useState<Product | null>(null);
  useEffect(() => {
    const read = () => setFilters(readFilters(new URLSearchParams(window.location.search)));
    read();
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, []);
  function updateFilters(next: CatalogueFilters) {
    setFilters(next);
    const url = new URL(window.location.href);
    for (const [key, value] of [['range', next.range], ['size', next.size], ['q', next.query]]) {
      if (!value || (key !== 'q' && value === 'all')) url.searchParams.delete(key); else url.searchParams.set(key, value);
    }
    window.history.replaceState({}, '', url);
  }
  function enquire(subject: string) { setDetail(null); setSelection(subject); }
  const visible = filterProducts(filters);
  const active = filters.range !== 'all' || filters.size !== 'all' || filters.query !== '';
  return <>
    <ScrollEntrances/>
    <SiteHeader onEnquire={enquire} productsPage/>
    <main id="main" className="catalogue-page">
      <section className="catalogue-hero" aria-labelledby="catalogue-title">
        <div className="catalogue-hero-copy">
          <nav className="catalogue-breadcrumb" aria-label={t('Breadcrumb')}><a href={`/?lang=${language}`}>{t('Home')}</a><span aria-hidden="true">/</span><span>{t('Our filters')}</span></nav>
          <div className="catalogue-hero-heading"><p className="eyebrow">{t('COMMERCIAL-GRADE. HOME-READY.')}</p><h1 id="catalogue-title">{t('Commercial-grade filtration')}<br/><em>{t('fitted for home.')}</em></h1></div>
          <div className="catalogue-hero-details"><p className="catalogue-hero-description">{t('Explore commercial-grade systems selected for residential use, then let us match the right range and size to your home.')}</p><a className="catalogue-hero-link" href="#browse">{t('Explore all systems')}<ArrowRight size={19}/></a><div className="catalogue-hero-facts"><span><Check size={15}/>{t('3 commercial-grade ranges')}</span><span><Check size={15}/>{t('10, 15 & 17 inches')}</span><span><Check size={15}/>{t('Local fitting guidance')}</span></div></div>
        </div>
      </section>
      <section className="catalogue-browser" id="browse" aria-labelledby="browse-title">
        <div className="catalogue-browser-heading"><div><p className="eyebrow">{t('COMMERCIAL SYSTEMS FOR THE HOME')}</p><h2 id="browse-title">{t('Choose your')} <em>{t('system.')}</em></h2></div><a href="#catalogue-help">{t('Need help matching your home?')}<ArrowUpRight size={17}/></a></div>
        <div className="catalogue-controls">
          <fieldset className="catalogue-range-controls"><legend>{t('Filter ranges')}</legend><div>
            <button aria-pressed={filters.range === 'all'} onClick={() => updateFilters({ ...filters, range: 'all' })}>{t('All filters')}<span>9</span></button>
            {ranges.map(range => <button key={range.name} aria-pressed={filters.range === range.name} onClick={() => updateFilters({ ...filters, range: range.name })}>{range.name}<span>3</span></button>)}
          </div></fieldset>
          <label className="catalogue-search"><Search size={18} aria-hidden="true"/><span className="sr-only">{t('Search by model')}</span><input type="search" maxLength={80} value={filters.query} placeholder={t('Search by model')} onChange={event => updateFilters({ ...filters, query: event.target.value })}/>{filters.query && <button aria-label={t('Clear search')} onClick={() => updateFilters({ ...filters, query: '' })}><X size={16}/></button>}</label>
          <div className="catalogue-size-row"><fieldset className="catalogue-size-controls"><legend><SlidersHorizontal size={16} aria-hidden="true"/>{t('Cartridge size')}</legend><div><button aria-pressed={filters.size === 'all'} onClick={() => updateFilters({ ...filters, size: 'all' })}>{t('All sizes')}</button>{sizes.map(size => <button key={size} aria-pressed={filters.size === String(size)} onClick={() => updateFilters({ ...filters, size: String(size) })}>{size}″</button>)}</div></fieldset><p role="status" aria-live="polite">{t('Showing {count} of 9 filters', { count: visible.length })}</p>{active && <button className="catalogue-reset" onClick={() => updateFilters(defaultFilters)}>{t('Reset filters')}<X size={14}/></button>}</div>
        </div>
        <div className="catalogue-grid">
          {visible.map((product, index) => <article className="catalogue-card" key={product.model}>
            <button className="catalogue-visual-button" onClick={() => setDetail(product)} aria-label={t('View details for {model}', { model: product.model })}><ProductVisual product={product} eager={index < 3}/></button>
            <div className="catalogue-card-copy"><div className="catalogue-card-heading"><h3>{product.model}</h3><button onClick={() => setDetail(product)} aria-label={t('View details for {model}', { model: product.model })}><ArrowUpRight size={19}/></button></div><p className="catalogue-card-purpose">{t(product.purpose)}</p><div className="catalogue-card-spec"><Droplets size={15}/><span>{t(product.detail)}</span></div><button className="catalogue-details-link" onClick={() => setDetail(product)}>{t('View details')}<ArrowRight size={15}/></button><ProductEnquiry model={product.model} onEnquire={enquire}/></div>
          </article>)}
        </div>
        {visible.length === 0 && <div className="catalogue-empty"><Search size={28}/><h3>{t('No filters found')}</h3><p>{t('Try another model or clear your filters to see the full collection.')}</p><button className="button primary" onClick={() => updateFilters(defaultFilters)}>{t('View all filters')}<ArrowRight size={18}/></button></div>}
      </section>
      <section className="catalogue-help" id="catalogue-help"><div><p className="eyebrow">{t('COMMERCIAL CAPABILITY. THE RIGHT HOME FIT.')}</p><h2>{t('Your water. Your home.')}<br/><em>{t('Your system.')}</em></h2><p>{t('Tell us about your water, available space and current setup. We’ll translate the commercial specifications into a clear residential recommendation.')}</p><button className="button white" onClick={() => enquire(t('choosing a commercial-grade water filter for my home'))}><MessageCircle size={20}/>{t('Match my home')}<ArrowUpRight size={18}/></button></div><div className="catalogue-range-guide">{ranges.map(range => <div key={range.name}><span>{range.name}</span><p>{t(range.purpose)}</p></div>)}<p className="catalogue-fit-note">{t('We’ll confirm price, compatibility and fitting options before you decide.')}</p></div></section>
    </main>
    <SiteFooter onEnquire={enquire}/>
    <FloatingWhatsAppButton onClick={() => enquire(t('a water filter for my home'))}/>
    <Dialog open={detail !== null} onOpenChange={open => { if (!open) setDetail(null); }}><DialogContent className="catalogue-detail-dialog">{detail && <>
      <ProductVisual product={detail} eager/>
      <div className="catalogue-detail-copy"><p className="eyebrow">{detail.name} · {t('Series')}</p><DialogTitle className="catalogue-detail-title">{detail.model}</DialogTitle><DialogDescription className="catalogue-detail-description">{t(detail.description)}</DialogDescription>
        <fieldset className="catalogue-detail-sizes"><legend>{t('Cartridge size')}</legend><div>{sizes.map(size => <button key={size} aria-pressed={detail.size === size} onClick={() => setDetail(products.find(product => product.name === detail.name && product.size === size) ?? detail)}>{size}″</button>)}</div></fieldset>
        <dl className="catalogue-detail-specs"><div><dt>{t('Filtration')}</dt><dd>{t(detail.detail)}</dd></div><div><dt>{t('Everyday use')}</dt><dd>{t(detail.purpose)}</dd></div></dl>
        <p className="catalogue-detail-note">{t('Size alone does not confirm compatibility. Ask us to check the connection and the right model for your home.')}</p>
        <ProductEnquiry model={detail.model} onEnquire={enquire}/>
      </div>
    </>}</DialogContent></Dialog>
    <EnquiryDialog key={selection ?? 'closed'} selection={selection} onClose={() => setSelection(null)}/>
  </>;
}
