'use client';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp';
import { enquiryMessage, enquiryUrl } from '@/lib/business';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Search, X, Droplets, SlidersHorizontal, MessageCircle, Check } from 'lucide-react';
import { useLanguage } from './language-provider';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { ProductEnquiry } from './product-enquiry';
import { ScrollEntrances } from './scroll-entrances';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { ranges, catalogueRanges, platinumWasser, sizes, products, productImage, hf2Specifications, hf2sSpecifications, fxSpecifications, type Product } from '@/lib/products';
import { defaultFilters, isStandaloneRange, readFilters, filterProducts, type CatalogueFilters } from '@/lib/catalogue';

const threeStagePlusVariants = [
  { variant: 1, model: 'D-250', price: 210, maintenance: 100, minMicrons: 0.01, maxMicrons: 0.1, photo: 'three-stage-plus-cartridges.svg' },
  { variant: 2, model: 'D-230', price: 190, maintenance: 80, minMicrons: 1, maxMicrons: 1, photo: 'three-stage-plus-d230-cartridges.svg' },
];

function ProductVisual({ product, eager = false }: { product: Product; eager?: boolean }) {
  const { t } = useLanguage();
  if (product.size === null) return <div className="catalogue-visual platinum-wasser"><img src={product.image} alt={t(product.model)} width={1121} height={1403} loading={eager ? 'eager' : 'lazy'}/></div>;
  return <div className={`catalogue-visual ${product.tone}`}>
    <span className="catalogue-range-tag">{product.name}</span><span className="catalogue-size-tag">{product.size}″</span>
    {productImage(product.name, product.size) ? <img src={productImage(product.name, product.size)} alt={t('FLUUX {model} water filter cartridge', { model: product.model })} width={1122} height={1402} loading={eager ? 'eager' : 'lazy'}/> : <div className="catalogue-type-product"><span>FLUUX</span><strong>{product.name}</strong><span>{product.size} {t('inches')}</span><p>{t(product.purpose)}</p></div>}
    {product.name === 'HF2-S' && <img className="catalogue-hf2s-head" src="/images/hf2s-filter-head.webp" alt={t('FLUUX filter head')} width={320} height={320} loading={eager ? 'eager' : 'lazy'}/>}
  </div>;
}

export function ProductCatalogue() {
  const { t, language } = useLanguage();
  const [filters, setFilters] = useState<CatalogueFilters>(defaultFilters);
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
  function enquire(subject: string) { setDetail(null); window.location.assign(enquiryUrl(t(enquiryMessage, { subject: t(subject) }))); }
  const fx = detail?.name === 'FX' && detail.size !== null ? fxSpecifications[detail.size] : undefined;
  const number = new Intl.NumberFormat(language);
  const euro = new Intl.NumberFormat(language, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  function renderFxSpecifications(fx: (typeof fxSpecifications)[number]) {
    return (
fx && <dl className="catalogue-detail-specs">
          <div><dt>{t('Rated capacity')}</dt><dd>{t('{value} L', { value: number.format(fx.capacity) })}</dd></div>
          <div><dt>{t('Filtration media and performance')}</dt><dd>{t('Coconut-based activated carbon block reduces chlorine taste and odour. A sediment layer captures suspended particles before ultrafiltration.')} {t('The manufacturer’s performance sheet lists reduction claims for specific substances under test conditions.')}</dd></div>
          <div><dt>{t('Rated flow')}</dt><dd>{t('{value} L/min', { value: number.format(fx.flow) })}</dd></div>
          <div><dt>{t('Replacement cartridge')}</dt><dd><bdi>{fx.cartridge}</bdi></dd></div>
          <div><dt>{t('Operating pressure')}</dt><dd><bdi>{'30–125 psi'}</bdi></dd></div>
          <div><dt>{t('Water temperature')}</dt><dd><bdi>{'4–38 °C'}</bdi></dd></div>
          <div><dt>{t('System inlet and outlet')}</dt><dd><bdi>3/8″</bdi></dd></div>
          <div><dt>{t('Filter head valve')}</dt><dd>{t('Automatic water shut-off')}</dd></div>
        </dl>
    );
  }
  function renderHf2Specifications(size: number) {
    const specs = hf2Specifications[size];
    if (!specs) return null;
    return <dl className="catalogue-detail-specs">
      <div><dt>{t('HF2 catalogue capacity')}</dt><dd>{t('{value} L', { value: number.format(specs.capacity) })}</dd></div>
      <div><dt>{t('HF2 catalogue flow')}</dt><dd>{t('{value} L/min', { value: number.format(specs.flow) })}</dd></div>
      <div><dt>{t('Replacement cartridge')}</dt><dd><bdi>{specs.cartridge}</bdi></dd></div>
      <div><dt>{t('Operating pressure')}</dt><dd><bdi>{'30–125 psi'}</bdi></dd></div>
      <div><dt>{t('Water temperature')}</dt><dd><bdi>{'4–38 °C'}</bdi></dd></div>
      <div><dt>{t('Filter head connections')}</dt><dd>{t('3/8″ connection, with a 1/4″ inlet option')}</dd></div>
      <div><dt>{t('Filtration media and performance')}</dt><dd>{t('Activated carbon reduces chlorine taste and odour. The built-in sediment filter captures suspended particles. The version we supply includes scale inhibition to help limit limescale buildup.')}</dd></div>
    </dl>;
  }
  function renderHf2sSpecifications(size: number, full = false) {
    const specs = hf2sSpecifications[size];
    if (!specs) return null;
    return <dl className="catalogue-detail-specs">
      <div><dt>{t('Rated capacity')}</dt><dd>{t('{value} L', { value: number.format(specs.capacity) })}</dd></div>
      <div><dt>{t('Rated flow')}</dt><dd>{t('{value} L/min', { value: number.format(specs.flow) })}</dd></div>
      <div><dt>{t('Filter head connections')}</dt><dd>{t('3/8″ connection, with a 1/4″ inlet option')}</dd></div>
      <div><dt>{t('Filter head valve')}</dt><dd>{t('Automatic water shut-off')}</dd></div>
      {full && <>
        <div><dt>{t('Replacement cartridge')}</dt><dd><bdi>{specs.cartridge}</bdi></dd></div>
        <div><dt>{t('Filtration media and performance')}</dt><dd>{t('Mechanical filtration captures sediment, activated carbon block reduces chlorine taste and odour, and polyphosphate helps limit scale deposits in equipment.')}</dd></div>
      </>}
    </dl>;
  }
  function renderProductCard(product: Product, index: number) {
    return <article className="catalogue-card" key={product.model}>
            <button className="catalogue-visual-button" onClick={() => setDetail(product)} aria-label={t('View details for {model}', { model: product.model })}><ProductVisual product={product} eager={index < 3}/></button>
            <div className="catalogue-card-copy"><div className="catalogue-card-heading"><h3>{product.size === null ? t(product.model) : product.model}</h3><button onClick={() => setDetail(product)} aria-label={t('View details for {model}', { model: product.model })}><ArrowUpRight size={19}/></button></div><p className="catalogue-card-purpose">{t(product.purpose)}</p><div className="catalogue-card-spec"><Droplets size={15}/><span>{t(product.detail)}</span></div><button className="catalogue-details-link" onClick={() => setDetail(product)}>{t('View details')}<ArrowRight size={15}/></button>{product.size === null && <dl className="catalogue-detail-specs">
              <div><dt>{t('Model code')}</dt><dd><bdi>{product.modelCode}</bdi></dd></div>
              <div><dt>{t('Sediment prefilters')}</dt><dd><bdi>{'5 µm + 1 µm'}</bdi></dd></div>
              <div><dt>{t('Post-filtration')}</dt><dd>{t('Activated carbon and remineralisation')}</dd></div>
            </dl>}{product.name === 'FX' && product.size !== null && renderFxSpecifications(fxSpecifications[product.size])}{product.name === 'HF2' && product.size !== null && renderHf2Specifications(product.size)}{product.name === 'HF2-S' && product.size !== null && renderHf2sSpecifications(product.size)}<ProductEnquiry model={product.model} onEnquire={enquire}/></div>
          </article>;
  }
  const visible = filterProducts(filters);
  const cartridges = visible.filter(product => product.size !== null);
  const reverseOsmosisSystems = visible.filter(product => product.size === null);
  const active = filters.range !== 'all' || filters.size !== 'all' || filters.query !== '';
  return <>
    <ScrollEntrances/>
    <SiteHeader onEnquire={enquire} productsPage/>
    <main id="main" className="catalogue-page">
      <section className="catalogue-hero" aria-labelledby="catalogue-title">
        <div className="catalogue-hero-copy">
          <nav className="catalogue-breadcrumb" aria-label={t('Breadcrumb')}><a href={`/?lang=${language}`}>{t('Home')}</a><span aria-hidden="true">/</span><span>{t('Our filters')}</span></nav>
          <div className="catalogue-hero-heading"><p className="eyebrow">{t('COMMERCIAL-GRADE. HOME-READY.')}</p><h1 id="catalogue-title">{t('Commercial-grade filtration')}<br/><em>{t('fitted for home.')}</em></h1></div>
          <div className="catalogue-hero-details"><p className="catalogue-hero-description">{t('Compare cartridge filtration and pumped reverse osmosis systems for your home.')}</p><a className="catalogue-hero-link" href="#browse">{t('Explore all systems')}<ArrowRight size={19}/></a><div className="catalogue-hero-facts"><span><Check size={15}/>{t('3 cartridge ranges and reverse osmosis')}</span><span><Check size={15}/>{t('10, 15 & 17 inches')}</span><span><Check size={15}/>{t('Local fitting guidance')}</span></div></div>
        </div>
      </section>
      <section className="catalogue-browser" id="browse" aria-labelledby="browse-title">
        <div className="catalogue-browser-heading"><div><p className="eyebrow">{t('COMMERCIAL SYSTEMS FOR THE HOME')}</p><h2 id="browse-title">{t('Choose your')} <em>{t('system.')}</em></h2></div><a href="#catalogue-help">{t('Need help matching your home?')}<ArrowUpRight size={17}/></a></div>
        <div className="catalogue-controls">
          <fieldset className="catalogue-range-controls"><legend>{t('Filter ranges')}</legend><div>
            <button aria-pressed={filters.range === 'all'} onClick={() => updateFilters({ ...filters, range: 'all' })}>{t('All filters')}<span>{products.length}</span></button>
            {catalogueRanges.map(range => <button key={range} aria-pressed={filters.range === range} onClick={() => updateFilters({ ...filters, range, size: isStandaloneRange(range) ? 'all' : filters.size })}>{t(range)}<span>{products.filter(product => product.name === range).length}</span></button>)}
          </div></fieldset>
          <label className="catalogue-search"><Search size={18} aria-hidden="true"/><span className="sr-only">{t('Search by model')}</span><input type="search" maxLength={80} value={filters.query} placeholder={t('Search by model')} onChange={event => updateFilters({ ...filters, query: event.target.value })}/>{filters.query && <button aria-label={t('Clear search')} onClick={() => updateFilters({ ...filters, query: '' })}><X size={16}/></button>}</label>
          <div className="catalogue-size-row"><fieldset className="catalogue-size-controls" disabled={isStandaloneRange(filters.range)}><legend><SlidersHorizontal size={16} aria-hidden="true"/>{t('Cartridge size')}</legend><div><button aria-pressed={filters.size === 'all'} onClick={() => updateFilters({ ...filters, size: 'all' })}>{t('All sizes')}</button>{sizes.map(size => <button key={size} aria-pressed={filters.size === String(size)} onClick={() => updateFilters({ ...filters, size: String(size) })}>{size}″</button>)}</div></fieldset><p role="status" aria-live="polite">{t('Showing {count} of {total} filters', { count: visible.length, total: products.length })}</p>{active && <button className="catalogue-reset" onClick={() => updateFilters(defaultFilters)}>{t('Reset filters')}<X size={14}/></button>}</div>
        </div>
        {visible.some(product => product.name === 'HF2-S') && (filters.range === 'HF2-S' || visible.every(product => product.name === 'HF2-S')) &&
          <section className="catalogue-hf2s-applications" aria-labelledby="hf2s-title">
            <h3 id="hf2s-title">{'FLUUX HF2-S'}</h3>
            <p>{t('Professional filtration for coffee and ice machines.')}</p>
            <div>
              <figure><img src="/images/hf2s-espresso.webp" alt="" width={768} height={512} loading="lazy"/><figcaption>{t('Commercial espresso machine')}</figcaption></figure>
              <figure><img src="/images/hf2s-ice.webp" alt="" width={768} height={512} loading="lazy"/><figcaption>{t('Commercial ice machine')}</figcaption></figure>
            </div>
          </section>
        }
        {cartridges.length > 0 && <div className="catalogue-grid">{cartridges.map(renderProductCard)}</div>}
        {visible.length === 0 && <div className="catalogue-empty"><Search size={28}/><h3>{t('No filters found')}</h3><p>{t('Try another model or clear your filters to see the full collection.')}</p><button className="button primary" onClick={() => updateFilters(defaultFilters)}>{t('View all filters')}<ArrowRight size={18}/></button></div>}
      </section>
      <section className="catalogue-browser" id="three-stage-plus" aria-labelledby="three-stage-plus-title">
        <div className="catalogue-browser-heading">
          <h2 id="three-stage-plus-title">{t('Three Stage Plus Filters')}</h2>
        </div>
        <div className="catalogue-grid">
          {threeStagePlusVariants.map(({ variant, model, price, maintenance, minMicrons, maxMicrons, photo }) => (
            <article className="catalogue-card" key={variant}>
              <div className="mx-3 my-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-lg font-semibold">{t('{price} with installation', { price: euro.format(price) })}</p>
                <p className="text-sm font-medium">{t('Annual maintenance {price}', { price: euro.format(maintenance) })}</p>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img className="block h-full w-full" src="/images/three-stage-plus.svg" alt="" width={850} height={850} loading="lazy"/>
                <div aria-hidden="true" dir="ltr" className="absolute inset-x-[9.75%] top-[59%] grid grid-cols-3 place-items-center gap-1 text-xs font-semibold text-green-950">
                  {['5 µm', '1 µm', model].map(label => (
                    <span key={label} className="whitespace-nowrap rounded-full bg-white px-2 py-1 shadow-sm ring-1 ring-green-900/20">{label}</span>
                  ))}
                </div>
              </div>
              <img className="mx-auto block w-[80.5%]" src={`/images/${photo}`} alt="" width={540} height={220} loading="lazy"/>
              <div className="catalogue-card-copy">
                <div className="catalogue-card-heading"><h3>{`Three Stage Plus ${variant}`}</h3></div>
                <ol className="mt-3 list-decimal space-y-1 ps-5">
                  <li><bdi>{'Sediment MX D-105 · 5 µm'}</bdi></li>
                  <li><bdi>{'Sediment MX D-100 · 1 µm'}</bdi></li>
                  <li><bdi>{`Pure Aqua ${model}`}</bdi> · {t('Activated carbon block filter')}{model === 'D-230' && <> · {t('Filtration with scale inhibition')}</>} · <bdi>{minMicrons === maxMicrons ? `${number.format(minMicrons)} µm` : `${number.format(minMicrons)}–${number.format(maxMicrons)} µm`}</bdi> · {t('{value} L/min', { value: number.format(4) })} · {t('Recommended replacement: 12 months or {capacity}', { capacity: t('{value} L', { value: number.format(40000) }) })}</li>
                </ol>
                <figure className="mt-3 flex items-center gap-3">
                  <img className="size-20 shrink-0 rounded-lg object-contain" src="/images/water-leak-detector.svg" alt="" width={320} height={320} loading="lazy"/>
                  <figcaption className="text-sm font-medium">{t('Installation includes a leak detector with water shut-off.')}</figcaption>
                </figure>
              </div>
            </article>
          ))}
        </div>
      </section>
      {reverseOsmosisSystems.length > 0 && (
        <section className="catalogue-browser" id="reverse-osmosis" aria-labelledby="reverse-osmosis-title">
          <div className="catalogue-browser-heading">
            <h2 id="reverse-osmosis-title">{t('Reverse osmosis water filters')}</h2>
          </div>
          <div className="catalogue-grid">{reverseOsmosisSystems.map(renderProductCard)}</div>
        </section>
      )}
      <section className="catalogue-help" id="catalogue-help"><div><p className="eyebrow">{t('COMMERCIAL CAPABILITY. THE RIGHT HOME FIT.')}</p><h2>{t('Your water. Your home.')}<br/><em>{t('Your system.')}</em></h2><p>{t('Tell us about your water, available space and current setup. We’ll translate the commercial specifications into a clear residential recommendation.')}</p><button className="button white" onClick={() => enquire(t('choosing a commercial-grade water filter for my home'))}><MessageCircle size={20}/>{t('Match my home')}<ArrowUpRight size={18}/></button></div><div className="catalogue-range-guide">{ranges.map(range => <div key={range.name}><span>{range.name}</span><p>{t(range.purpose)}</p></div>)}<p className="catalogue-fit-note">{t('We’ll confirm price, compatibility and fitting options before you decide.')}</p></div></section>
    </main>
    <SiteFooter onEnquire={enquire}/>
    <FloatingWhatsAppButton onClick={() => enquire(t('a water filter for my home'))}/>
    <Dialog open={detail !== null} onOpenChange={open => { if (!open) setDetail(null); }}><DialogContent className="catalogue-detail-dialog">{detail && <>
      <ProductVisual product={detail} eager/>
      <div className="catalogue-detail-copy"><p className="eyebrow">{detail.name} · {t('Series')}</p><DialogTitle className="catalogue-detail-title">{detail.size === null ? t(detail.model) : detail.model}</DialogTitle><DialogDescription className="catalogue-detail-description">{t(detail.description)}</DialogDescription>
        {detail.size !== null && <fieldset className="catalogue-detail-sizes"><legend>{t('Cartridge size')}</legend><div>{sizes.map(size => <button key={size} aria-pressed={detail.size === size} onClick={() => setDetail(products.find(product => product.name === detail.name && product.size === size) ?? detail)}>{size}″</button>)}</div></fieldset>}
        <dl className="catalogue-detail-specs"><div><dt>{t('Filtration')}</dt><dd>{t(detail.detail)}</dd></div><div><dt>{detail.name === 'HF2-S' ? t('Applications') : t('Everyday use')}</dt><dd>{t(detail.purpose)}</dd></div></dl>
        {renderFxSpecifications(fx)}
        {detail.name === 'HF2' && detail.size !== null && renderHf2Specifications(detail.size)}
        {detail.name === 'HF2-S' && detail.size !== null && <>
          {renderHf2sSpecifications(detail.size, true)}
          <p className="catalogue-detail-note"><a href="https://kr.fluux.co.kr/92">{t('Microfilter FLUUX specifications')}</a></p>
        </>}
        {detail === platinumWasser ? <>
          <section aria-label={t('Six filtration stages')} className="catalogue-filtration-stages">
            <h3>{t('Six filtration stages')}</h3>
            <ol>{platinumWasser.stages.map(stage => <li key={stage.label}><strong>{t(stage.label)}{stage.rating && <> · <bdi>{stage.rating}</bdi></>}</strong><p>{t(stage.description)}</p></li>)}</ol>
          </section>
          <dl className="catalogue-detail-specs"><div><dt>{t('Installation')}</dt><dd>{t('Uses a separate storage tank and drinking-water tap. Requires a cold-water feed, drain connection and power outlet.')}</dd></div></dl>
          <p className="catalogue-detail-note"><a href={platinumWasser.specificationsUrl}>{t('Platinum Wasser product specifications')}</a></p>
        </> : detail.size !== null && detail.name !== 'HF2-S' && <p className="catalogue-detail-note">{t('Size alone does not confirm compatibility. Ask us to check the connection and the right model for your home.')}</p>}
        <ProductEnquiry model={detail.model} onEnquire={enquire}/>
      </div>
    </>}</DialogContent></Dialog>
  </>;
}
