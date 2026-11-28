'use client';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp';
import { enquiryMessage, enquiryUrl } from '@/lib/business';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Search, X, SlidersHorizontal, MessageCircle, Check } from 'lucide-react';
import { useLanguage } from './language-provider';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { ProductEnquiry } from './product-enquiry';
import { ScrollEntrances } from './scroll-entrances';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { productSlug } from '@/lib/product-routes';
import { ranges, catalogueRanges, platinumWasser, sizes, products, productImage, hf2Specifications, hf2sSpecifications, fxSpecifications, type Product } from '@/lib/products';
import { defaultFilters, isStandaloneRange, readFilters, filterProducts, type CatalogueFilters } from '@/lib/catalogue';

const threeStagePlusVariants = [
  { variant: 1, model: 'D-250', price: 210, maintenance: 100, minMicrons: 0.01, maxMicrons: 0.1, photo: 'three-stage-plus-cartridges.svg' },
  { variant: 2, model: 'D-230', price: 190, maintenance: 80, minMicrons: 1, maxMicrons: 1, photo: 'three-stage-plus-d230-cartridges.svg' },
];

const krausenSystems = [
  {
    id: 'krausen-pro-800',
    model: 'Krausen Pro Series 800 GPD · 10″ Big Blue',
    terms: '800 GPD Big Blue 800G-3213',
    flow: '1.6–2.1 L/min',
    membranes: '1 × 800 GPD (800G-3213)',
    dimensions: '450 × 200 × 600 mm',
    stages: [
      '10″ Big Blue sediment filter, 5 μm',
      '10″ Big Blue coconut carbon block, 10 μm',
      'Reverse osmosis membrane',
      'Coconut-shell activated carbon postfilter',
    ],
    source: 'https://www.neowater.com.cy/product-page/krausen-pro-series-800gpd-10-big-blue-r-o-water-system',
  },
  {
    id: 'krausen-new-line',
    model: 'Krausen New Line 800 / 1600 GPD',
    terms: '800 GPD 1600 GPD 3113-800-S',
    flow: '800 GPD ≈ 2 L/min · 1600 GPD ≈ 4 L/min',
    membranes: '1 × 800 GPD / 2 × 800 GPD (KRAUSEN-3113-800-S)',
    dimensions: null,
    stages: [
      '10″ polypropylene sediment filter, 5 μm',
      '10″ polypropylene sediment filter, 1 μm',
      '10″ activated carbon prefilter',
      'Reverse osmosis membrane',
      'Activated carbon postfilter',
    ],
    source: 'https://www.neowater.com.cy/product-page/krausen-800-1600-gpd-direct-flow-water-system-smart-controller-leak-detector',
  },
];

function ProductVisual({ product, eager = false }: { product: Product; eager?: boolean }) {
  const { t } = useLanguage();
  if (product.size === null) return <div className="catalogue-visual platinum-wasser">
    <span className="catalogue-origin-label" lang="en" dir="ltr">{'Made in Germany'}</span>
    <img src={product.image} alt={t(product.model)} width={1121} height={1403} loading={eager ? 'eager' : 'lazy'}/>
  </div>;
  return <div className={`catalogue-visual ${product.tone}`}>
    <span className="catalogue-range-tag">{product.name}</span><span className="catalogue-size-tag">{product.size}″</span>
    {productImage(product.name, product.size) ? <img src={productImage(product.name, product.size)} alt={t('FLUUX {model} water filter cartridge', { model: product.model })} width={1122} height={1402} loading={eager ? 'eager' : 'lazy'}/> : <div className="catalogue-type-product"><span>FLUUX</span><strong>{product.name}</strong><span>{product.size} {t('inches')}</span><p>{t(product.purpose)}</p></div>}
    {product.name === 'HF2-S' && <img className="catalogue-hf2s-head" src="/images/hf2s-filter-head.webp" alt={t('FLUUX filter head')} width={320} height={320} loading={eager ? 'eager' : 'lazy'}/>}
  </div>;
}

export function ProductCatalogue({ slug }: { slug?: string }) {
  const { t, language } = useLanguage();
  const [filters, setFilters] = useState<CatalogueFilters>(defaultFilters);
  const detail = products.find(product => productSlug(product.model) === slug);
  useEffect(() => {
    const read = () => setFilters(readFilters(new URLSearchParams(window.location.search)));
    if (slug) return;
    read();
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, [slug]);
  function updateFilters(next: CatalogueFilters) {
    setFilters(next);
    const url = new URL(window.location.href);
    for (const [key, value] of [['range', next.range], ['size', next.size], ['q', next.query]]) {
      if (!value || (key !== 'q' && value === 'all')) url.searchParams.delete(key); else url.searchParams.set(key, value);
    }
    window.history.replaceState({}, '', url);
  }
  function enquire(subject: string) { window.location.assign(enquiryUrl(t(enquiryMessage, { subject: t(subject) }))); }
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
  const platinumCapacity = t('{gpd} (up to {litres} L/day)', {
    gpd: platinumWasser.capacity,
    litres: number.format(platinumWasser.litresPerDay),
  });
  function renderPlatinumStages(Heading: 'h3' | 'h4' = 'h3') {
    return <section aria-label={t('Six filtration stages')} className="catalogue-filtration-stages">
      <Heading className="font-semibold">{t('Six filtration stages')}</Heading>
      <ol>
        {platinumWasser.stages.map(stage => (
          <li key={stage.label}>
            <strong>{t(stage.label)}{stage.rating && <> · <bdi>{stage.rating}</bdi></>}</strong>
            <p>{t(stage.description)}</p>
          </li>
        ))}
      </ol>
    </section>;
  }

  function renderInstallationPrice(model: string) {
    if (model === platinumWasser.model) return <>
      <p className="text-lg font-semibold">{t('{price} with installation', { price: euro.format(550) })}</p>
      <p className="text-sm font-medium">{t('Annual maintenance {price}', { price: euro.format(120) })}</p>
    </>;

    const amount = model === 'FX-10' ? 240 : model === 'HF2-10' ? 220 : null;
    if (amount === null) return null;

    const price = euro.format(amount);
    return <p className="text-lg font-semibold">{language === 'el'
      ? `${price} με εφαρμογή`
      : t('{price} with installation', { price })}</p>;
  }

  function productHref(id: string) {
    return `/products/${id}?lang=${language}`;
  }

  function renderCard(id: string, name: string, media: ReactNode, details?: ReactNode) {
    if (slug) {
      if (slug !== id) return null;
      return <article className="product-profile" key={id}>
        <div className="product-profile-media">{media}</div>
        <div className="catalogue-card-copy product-profile-copy">
          <h1>{name}</h1>
          {details}
        </div>
      </article>;
    }

    return <article className="catalogue-card product-tile" id={id} key={id}>
      <div className="product-tile-media">{media}</div>
      <div className="product-tile-copy">
        <h3>{name}</h3>
        <Link className="button primary" href={productHref(id)} aria-label={`${t('Learn more')} · ${name}`}>
          {t('Learn more')}<ArrowRight size={16} aria-hidden="true"/>
        </Link>
      </div>
    </article>;
  }

  function renderProductCard(product: Product, index: number) {
    return renderCard(productSlug(product.model), product.size === null ? t(product.model) : product.model,
      <ProductVisual product={product} eager={index < 3}/>);
  }
  const visible = filterProducts(filters);
  const cartridges = visible.filter(product => product.size !== null);
  const reverseOsmosisSystems = visible.filter(product => product.size === null);
  const reverseOsmosisModel = t('Reverse osmosis system');
  const showReverseOsmosisSystem = filters.range === 'all' && filters.size === 'all'
    && [reverseOsmosisModel, 'Reverse osmosis system'].some(model => model.toLowerCase().includes(filters.query.trim().toLowerCase()));
  const ecosoftModel = 'Ecosoft Standard Pro';
  const showEcosoft = filters.range === 'all' && filters.size === 'all'
    && ecosoftModel.toLowerCase().includes(filters.query.trim().toLowerCase());
  const absoluteModel = 'Ecosoft Absolute';
  const showAbsolute = filters.range === 'all' && filters.size === 'all'
    && absoluteModel.toLowerCase().includes(filters.query.trim().toLowerCase());
  const ux6Model = 'Pure Water Filters UX6 600G';
  const showUx6 = filters.range === 'all' && filters.size === 'all'
    && [ux6Model, '520696401707'].some(term => term.toLowerCase().includes(filters.query.trim().toLowerCase()));
  const crossModel = 'Ecosoft CROSS 90';
  const crossCode = 'MO3600PECO';
  const showCross = filters.range === 'all' && filters.size === 'all'
    && [crossModel, 'CROSS90', crossCode].some(term => term.toLowerCase().includes(filters.query.trim().toLowerCase()));
  const searchTerm = filters.query.trim().toLowerCase().replace(/[\s-]/g, '');
  const visibleKrausen = filters.range === 'all' && filters.size === 'all'
    ? krausenSystems.filter(({ model, terms }) => `${model} ${terms}`.toLowerCase().replace(/[\s-]/g, '').includes(searchTerm))
    : [];
  const industrialModel = 'Ecosoft MO 36000';
  const showIndustrial = filters.range === 'all' && filters.size === 'all'
    && ['ecosoftmo36000', 'industrialreverseosmosis', 'm36vctfwe', '396gph'].some(term => term.includes(searchTerm));
  const otherOsmosisCards = [showReverseOsmosisSystem, showEcosoft, showAbsolute, showUx6, showCross, showIndustrial];
  const visibleThreeStage = threeStagePlusVariants.filter(({ variant, model }) =>
    filters.range === 'all' && filters.size === 'all' &&
    `Three Stage Plus ${variant} ${model}`.toLowerCase().replace(/[\s-]/g, '').includes(searchTerm));
  const visibleCount = visibleThreeStage.length + visible.length + visibleKrausen.length + otherOsmosisCards.filter(Boolean).length;
  const totalCount = threeStagePlusVariants.length + products.length + krausenSystems.length + otherOsmosisCards.length;
  const hasOtherOsmosis = otherOsmosisCards.some(Boolean);
  const active = filters.range !== 'all' || filters.size !== 'all' || filters.query !== '';
  return <>
    <ScrollEntrances/>
    <SiteHeader onEnquire={enquire} productsPage/>
    <main id="main" className={slug ? "catalogue-page product-page" : "catalogue-page"}>
      {slug && <nav className="product-back" aria-label={t('Breadcrumb')}>
        <Link href={`/products?lang=${language}#${slug}`}><ArrowRight className="product-back-arrow" size={18} aria-hidden="true"/>{t('Our filters')}</Link>
      </nav>}
      {detail && <article className="product-profile">
        <div className="product-profile-media">
          <ProductVisual product={detail} eager/>
          {(detail.model === 'FX-10' || detail.model === 'HF2-10') && <img
            src={`/images/${detail.model.toLowerCase()}-installation.webp`}
            alt={t('{model} installation under the sink', { model: detail.model })}
            loading="lazy"
          />}
        </div>
      <div className="catalogue-card-copy product-profile-copy"><p className="eyebrow">{detail.name} · {t('Series')}</p><h1>{detail.size === null ? t(detail.model) : detail.model}</h1><p className="catalogue-detail-description">{t(detail.description)}</p>
        {detail.size !== null && <fieldset className="catalogue-detail-sizes"><legend>{t('Cartridge size')}</legend><div>{sizes.map(size => <Link key={size} aria-current={detail.size === size ? 'page' : undefined} href={productHref(productSlug(products.find(product => product.name === detail.name && product.size === size)?.model ?? detail.model))}>{size}″</Link>)}</div></fieldset>}
        <dl className="catalogue-detail-specs"><div><dt>{t('Filtration')}</dt><dd>{t(detail.detail)}</dd></div><div><dt>{detail.name === 'HF2-S' ? t('Applications') : t('Everyday use')}</dt><dd>{t(detail.purpose)}</dd></div></dl>
        {renderFxSpecifications(fx)}
        {detail.name === 'HF2' && detail.size !== null && renderHf2Specifications(detail.size)}
        {detail.name === 'HF2-S' && detail.size !== null && <>
          {renderHf2sSpecifications(detail.size, true)}
          <p className="catalogue-detail-note"><a href="https://kr.fluux.co.kr/92">{t('Microfilter FLUUX specifications')}</a></p>
        </>}
        {detail === platinumWasser ? <>
          <dl className="catalogue-detail-specs">
            <div><dt>{t('Rated daily production')}</dt><dd><bdi>{platinumCapacity}</bdi></dd></div>
            {platinumWasser.specifications.map(spec => (
              <div key={spec.label}><dt>{t(spec.label)}</dt><dd><bdi>{spec.value}</bdi></dd></div>
            ))}
          </dl>
          {renderPlatinumStages()}
          <dl className="catalogue-detail-specs"><div><dt>{t('Installation')}</dt><dd>{t('Uses a separate storage tank and drinking-water tap. Requires a cold-water feed, drain connection and power outlet.')}</dd></div></dl>
          <p className="catalogue-detail-note"><a href={platinumWasser.specificationsUrl}>{t('Platinum Wasser product specifications')}</a></p>
        </> : detail.size !== null && detail.name !== 'HF2-S' && <p className="catalogue-detail-note">{t('Size alone does not confirm compatibility. Ask us to check the connection and the right model for your home.')}</p>}
        {renderInstallationPrice(detail.model)}
        <ProductEnquiry model={detail.model} onEnquire={enquire}/>
      </div>
      </article>}
      {!slug && <>
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
            <button aria-pressed={filters.range === 'all'} onClick={() => updateFilters({ ...filters, range: 'all' })}>{t('All filters')}<span>{totalCount}</span></button>
            {catalogueRanges.map(range => <button key={range} aria-pressed={filters.range === range} onClick={() => updateFilters({ ...filters, range, size: isStandaloneRange(range) ? 'all' : filters.size })}>{t(range)}<span>{products.filter(product => product.name === range).length}</span></button>)}
          </div></fieldset>
          <label className="catalogue-search"><Search size={18} aria-hidden="true"/><span className="sr-only">{t('Search by model')}</span><input type="search" maxLength={80} value={filters.query} placeholder={t('Search by model')} onChange={event => updateFilters({ ...filters, query: event.target.value })}/>{filters.query && <button aria-label={t('Clear search')} onClick={() => updateFilters({ ...filters, query: '' })}><X size={16}/></button>}</label>
          <div className="catalogue-size-row"><fieldset className="catalogue-size-controls" disabled={isStandaloneRange(filters.range)}><legend><SlidersHorizontal size={16} aria-hidden="true"/>{t('Cartridge size')}</legend><div><button aria-pressed={filters.size === 'all'} onClick={() => updateFilters({ ...filters, size: 'all' })}>{t('All sizes')}</button>{sizes.map(size => <button key={size} aria-pressed={filters.size === String(size)} onClick={() => updateFilters({ ...filters, size: String(size) })}>{size}″</button>)}</div></fieldset><p role="status" aria-live="polite">{t('Showing {count} of {total} filters', { count: visibleCount, total: totalCount })}</p>{active && <button className="catalogue-reset" onClick={() => updateFilters(defaultFilters)}>{t('Reset filters')}<X size={14}/></button>}</div>
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
        {visibleCount === 0 && <div className="catalogue-empty"><Search size={28}/><h3>{t('No filters found')}</h3><p>{t('Try another model or clear your filters to see the full collection.')}</p><button className="button primary" onClick={() => updateFilters(defaultFilters)}>{t('View all filters')}<ArrowRight size={18}/></button></div>}
      </section>
      </>}
      {!detail && <>
      {(slug ? slug.startsWith('three-stage-plus-') : visibleThreeStage.length > 0) && <section className={slug ? undefined : 'catalogue-browser'} id="three-stage-plus" aria-labelledby={slug ? undefined : "three-stage-plus-title"}>
        {!slug && <div className="catalogue-browser-heading">
          <h2 id="three-stage-plus-title">{t('Three Stage Plus Filters')}</h2>
        </div>}
        <div className={slug ? undefined : "catalogue-grid"}>
          {visibleThreeStage.map(({ variant, model, price, maintenance, minMicrons, maxMicrons, photo }) => (
            renderCard(`three-stage-plus-${variant}`, `Three Stage Plus ${variant}`,
              <img src="/images/three-stage-plus.svg" alt={`Three Stage Plus ${variant}`} width={850} height={850} loading={slug ? 'eager' : 'lazy'}/>,
              <>
              <p className="text-lg font-semibold">{t('{price} with installation', { price: euro.format(price) })}</p>
                <p className="text-sm font-medium">{t('Annual maintenance {price}', { price: euro.format(maintenance) })}</p>
                <ol className="mt-3 list-decimal space-y-1 ps-5">
                  <li><bdi>{'Sediment MX D-105 · 5 µm'}</bdi></li>
                  <li><bdi>{'Sediment MX D-100 · 1 µm'}</bdi></li>
                  <li><bdi>{`Pure Aqua ${model}`}</bdi> · {t('Activated carbon block filter')}{model === 'D-230' && <> · {t('Filtration with scale inhibition')}</>} · <bdi>{minMicrons === maxMicrons ? `${number.format(minMicrons)} µm` : `${number.format(minMicrons)}–${number.format(maxMicrons)} µm`}</bdi> · {t('{value} L/min', { value: number.format(4) })} · {t('Recommended replacement: 12 months or {capacity}', { capacity: t('{value} L', { value: number.format(40000) }) })}</li>
                </ol>
                <figure className="mt-3 flex items-center gap-3">
                  <img className="size-20 shrink-0 rounded-lg object-contain" src="/images/water-leak-detector.svg" alt="" width={320} height={320} loading="lazy"/>
                  <figcaption className="text-sm font-medium">{t('Installation includes a leak detector with water shut-off.')}</figcaption>
                </figure>
                <img className="product-secondary-image" src={`/images/${photo}`} alt="" width={540} height={220} loading="lazy"/>
                <ProductEnquiry model={`Three Stage Plus ${variant}`} onEnquire={enquire}/>
              </>)
          ))}
        </div>
      </section>}
      {(!slug || !slug.startsWith('three-stage-plus-')) && (hasOtherOsmosis || reverseOsmosisSystems.length > 0 || visibleKrausen.length > 0) && (
        <section className={slug ? undefined : "catalogue-browser"} id="reverse-osmosis" aria-labelledby={slug ? undefined : "reverse-osmosis-title"}>
          {!slug && <div className="catalogue-browser-heading">
            <h2 id="reverse-osmosis-title">{t('Reverse osmosis water filters')}</h2>
          </div>}
          <div className={slug ? undefined : 'catalogue-grid'}>
          {!slug && reverseOsmosisSystems.map(renderProductCard)}
          {showReverseOsmosisSystem && renderCard('reverse-osmosis-system', reverseOsmosisModel,
              <img src="/images/reverse-osmosis-system.webp" alt={reverseOsmosisModel} width={768} height={880} loading={slug ? 'eager' : 'lazy'}/>,
              <>
              <p className="text-lg font-semibold">{t('{price} with installation', { price: euro.format(380) })}</p>
              <p className="text-sm font-medium">{t('Annual maintenance {price}', { price: euro.format(100) })}</p>
              <p className="catalogue-card-purpose">{t('Six-stage reverse osmosis system with pump and remineralisation filter')}</p>
              <ul className="list-disc space-y-1 ps-5 text-sm">
                <li>{t('75 GPD membrane and 3.0 G storage tank')}</li>
                <li>{t('Up to 60 L per day, with a 1:3 ratio of filtered water to reject water')}</li>
                <li>{t('Built-in pressure gauge, solenoid valve and flow restrictor')}</li>
                <li>{t('Complete installation kit with tap')}</li>
              </ul>
              <ProductEnquiry model={reverseOsmosisModel} onEnquire={enquire}/>
              </>)}
          {showEcosoft && renderCard('ecosoft-standard-pro', ecosoftModel,
              <img src="/images/ecosoft-standard-pro.webp" alt={ecosoftModel} width={1000} height={1000} loading={slug ? 'eager' : 'lazy'}/>,
              <>
              <p className="text-lg font-semibold">{t('{price} with installation', { price: euro.format(490) })}</p>
              <p className="text-sm font-medium">{t('Annual maintenance {price}', { price: euro.format(100) })}</p>
              <p className="catalogue-card-purpose">{t('Six-stage reverse osmosis system with pump and remineralisation filter')}</p>
              <ol className="list-decimal space-y-1 ps-5 text-sm">
                <li>{t('Polypropylene sediment prefilter, 5 µm')}</li>
                <li>{t('Granular coconut-shell activated carbon prefilter')}</li>
                <li>{t('Polypropylene sediment prefilter, 1 µm')}</li>
                <li>{t('Reverse osmosis membrane')} <bdi>{'Ecosoft 50 GPD'}</bdi></li>
                <li>{t('Coconut-shell activated carbon postfilter')}</li>
                <li>{t('Remineralisation filter')}</li>
              </ol>
              <ProductEnquiry model={ecosoftModel} onEnquire={enquire}/>
              </>)}
          {showAbsolute && renderCard('ecosoft-absolute', absoluteModel,
              <img src="/images/ecosoft-absolute.webp" alt={absoluteModel} width={850} height={1200} loading={slug ? 'eager' : 'lazy'}/>,
              <>
              <p className="text-lg font-semibold">{t('{price} with installation', { price: euro.format(550) })}</p>
              <p className="text-sm font-medium">{t('Annual maintenance {price}', { price: euro.format(120) })}</p>
              <p className="catalogue-card-purpose">{t('Six-stage reverse osmosis system with pump and remineralisation filter')}</p>
              <ol className="list-decimal space-y-1 ps-5 text-sm">
                <li>{t('10-inch polypropylene sediment prefilter')}</li>
                <li>{t('10″ activated carbon prefilter')}</li>
                <li>{t('10-inch fine polypropylene sediment prefilter')}</li>
                <li>{t('Reverse osmosis membrane')} <bdi>{'Ecosoft 75 GPD'}</bdi></li>
                <li>{t('Coconut-shell activated carbon postfilter')} <bdi>{'(inline)'}</bdi></li>
                <li>{t('Remineralisation filter')}</li>
              </ol>
              <p className="text-sm">{t('Uses a separate storage tank and drinking-water tap. Requires a cold-water feed, drain connection and power outlet.')}</p>
              <ProductEnquiry model={absoluteModel} onEnquire={enquire}/>
              </>)}
          {showUx6 && renderCard('pure-ux6-600g', ux6Model,
              <img src="/images/pure-ux6-600g.webp" alt={ux6Model} width={750} height={750} loading={slug ? 'eager' : 'lazy'}/>,
              <>
              <p className="text-lg font-semibold">{t('{price} with installation', { price: euro.format(590) })}</p>
              <p className="catalogue-card-purpose">{t('Tankless under-sink reverse osmosis with direct flow')}</p>
              <ul className="list-disc space-y-1 ps-5 text-sm">
                <li>{t('Five-stage filtration with a 3-in-1 PCF filter and a 600 GPD reverse osmosis membrane')}</li>
                <li>{t('Maximum flow of 90 litres per hour (1.5 litres per minute)')}</li>
                <li>{t('1 litre of filtered water per 0.5 litre sent to the drain')}</li>
                <li>{t('Built-in pump and automatic membrane flushing')}</li>
                <li>{t('Complete installation kit with tap')}</li>
              </ul>
              <dl className="catalogue-detail-specs">
                <div><dt>{t('Model code')}</dt><dd><bdi>520696401707</bdi></dd></div>
                <div><dt>{t('Dimensions')}</dt><dd><bdi>{t('13 × 39.7 × 37.6 cm')}</bdi></dd></div>
              </dl>
              <ProductEnquiry model={ux6Model} onEnquire={enquire}/>
              </>)}
          {showCross && renderCard('ecosoft-cross-90', crossModel,
              <img src="/images/ecosoft-cross-90.webp" alt={crossModel} width={850} height={850} loading={slug ? 'eager' : 'lazy'}/>,
              <>
              <p className="catalogue-card-purpose">{t('Tankless under-sink reverse osmosis with direct flow')}</p>
              <ul className="list-disc space-y-1 ps-5 text-sm">
                <li>{t('Maximum flow of 90 litres per hour (1.5 litres per minute)')}</li>
                <li>{t('Three-stage filtration with a sediment and carbon prefilter, a 600 GPD reverse osmosis membrane and a carbon postfilter')}</li>
                <li>{t('Built-in pump and automatic membrane flushing')}</li>
                <li>{t('Smart tap, water quality and filter replacement indicators, and leak protection')}</li>
              </ul>
              <dl className="catalogue-detail-specs">
                <div><dt>{t('Model code')}</dt><dd><bdi>{crossCode}</bdi></dd></div>
              </dl>
              <ProductEnquiry model={crossModel} onEnquire={enquire}/>
              </>)}
          {visibleKrausen.length > 0 && (!slug || slug.startsWith('krausen-')) && (
            <section className={slug ? undefined : "product-commercial"} id="commercial-reverse-osmosis" aria-labelledby={slug ? undefined : "commercial-ro-title"}>
              {!slug && <>
              <h3 id="commercial-ro-title" className="text-2xl font-semibold">{t('Commercial reverse osmosis systems')}</h3>
              <figure className="mt-4 overflow-hidden rounded-2xl bg-white">
                <img className="block h-auto w-full" src="/images/commercial-coffee-and-ice.webp" alt={t('Commercial espresso machine and ice maker in a coffee shop')} width={1200} height={600} loading="lazy"/>
                <figcaption className="px-4 py-3">{t('For coffee shops, espresso machines and ice makers.')}</figcaption>
              </figure></>}
              <div className={slug ? undefined : 'catalogue-grid'}>
              {visibleKrausen.map(system => (
                renderCard(system.id, system.model,
              <img src={`/images/${system.id}.webp`} alt={system.model} width={1080} height={759} loading={slug ? 'eager' : 'lazy'}/>,
              <>
                    <p className="catalogue-card-purpose">{t('Direct-flow reverse osmosis with booster pump and no storage tank')}</p>
                    <dl className="catalogue-detail-specs">
                      <div><dt>{t('Filtered water flow')}</dt><dd><bdi>{system.flow}</bdi></dd></div>
                      <div><dt>{t('Reverse osmosis membrane')}</dt><dd><bdi>{system.membranes}</bdi></dd></div>
                      {system.dimensions && <div><dt>{t('Dimensions')}</dt><dd><bdi>{system.dimensions}</bdi></dd></div>}
                    </dl>
                    <p className="font-semibold">{t('Filtration stages')} · {system.stages.length}</p>
                    <ol className="list-decimal space-y-1 ps-5 text-sm">
                      {system.stages.map(stage => <li key={stage}>{t(stage)}</li>)}
                    </ol>
                    <p>{t('Smart controller with filter-change indicator, flow monitoring, automatic membrane flushing and leak detection.')}</p>
                    <p className="catalogue-detail-note"><a href={system.source}>{t('NeoWater technical specifications')}</a></p>
                    <ProductEnquiry model={system.model} onEnquire={enquire} commercial/>
              </>)
              ))}
              </div>
            </section>
          )}
          {showIndustrial && renderCard('ecosoft-mo36000', industrialModel,
              <img src="/images/ecosoft-mo36000.webp" alt={industrialModel} width={1000} height={1000} loading={slug ? 'eager' : 'lazy'}/>,
              <>
              <p className="catalogue-card-purpose">{t('Industrial reverse osmosis system')}</p>
              <dl className="catalogue-detail-specs">
                <div><dt>{t('Model code')}</dt><dd><bdi>{'M36VCTFWE'}</bdi></dd></div>
                <div><dt>{t('Filtered water flow')}</dt><dd><bdi>{t('1,500 L/h (396 US gal/h)')}</bdi></dd></div>
                <div><dt>{t('Reverse osmosis membrane')}</dt><dd><bdi>{'6 × XLE-4040'}</bdi></dd></div>
                <div><dt>{t('Power supply')}</dt><dd><bdi>{'230 V / 50 Hz · 1.9 kW'}</bdi></dd></div>
                <div><dt>{t('Operating pressure')}</dt><dd><bdi>{'8–12 bar'}</bdi></dd></div>
                <div><dt>{t('Dimensions')}</dt><dd><bdi>{'900 × 620 × 1500 mm'}</bdi></dd></div>
              </dl>
              <p className="text-sm">{t('Rated flow at 25 °C and feed water TDS of 1,000 mg/L. Actual output depends on feed water conditions.')}</p>
              <p className="catalogue-detail-note"><a href="https://ecosoft.ua/upload/iblock/e82/mo36000_tech.pdf">{t('Ecosoft technical datasheet')}</a></p>
              <ProductEnquiry model={industrialModel} onEnquire={enquire} message={t('Hello! I am interested in the {model} industrial reverse osmosis system for my business.', { model: industrialModel })}/>
              </>)}
          </div>
        </section>
      )}
      </>}
      {!slug && <section className="catalogue-help" id="catalogue-help"><div><p className="eyebrow">{t('COMMERCIAL CAPABILITY. THE RIGHT HOME FIT.')}</p><h2>{t('Your water. Your home.')}<br/><em>{t('Your system.')}</em></h2><p>{t('Tell us about your water, available space and current setup. We’ll translate the commercial specifications into a clear residential recommendation.')}</p><button className="button white" onClick={() => enquire(t('choosing a commercial-grade water filter for my home'))}><MessageCircle size={20}/>{t('Match my home')}<ArrowUpRight size={18}/></button></div><div className="catalogue-range-guide">{ranges.map(range => <div key={range.name}><span>{range.name}</span><p>{t(range.purpose)}</p></div>)}<p className="catalogue-fit-note">{t('We’ll confirm price, compatibility and fitting options before you decide.')}</p></div></section>}
    </main>
    <SiteFooter onEnquire={enquire}/>
    <FloatingWhatsAppButton onClick={() => enquire(t('a water filter for my home'))}/>
  </>;
}
