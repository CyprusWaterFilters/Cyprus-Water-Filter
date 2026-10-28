'use client';

import { useEffect } from 'react';

// Keep SSR and unsupported browsers fully visible. Enhance only after observing.
const entranceTargets = [
  '.catalogue-hero-copy > :not(.catalogue-breadcrumb)', '.catalogue-browser-heading > *', '.catalogue-card', '.catalogue-help > *',
  '.benefit-strip > span', '.intro > .eyebrow', '.intro > h2', '.intro-copy', '.moments > div',
  '.section-heading > *', '.range-list', '.range-intro', '.product-card', '.collection-foot',
  '.statement > :not(.statement-word)', '.local-help-story > *', '.conversation-start', '.local-help-path',
  '.water-faq-intro > *', '.water-faq-card', '.contact > *', '.footer-top', '.footer-bottom',
  '.certificate-trust-heading > *', '.certificate-feature-card', '.certificates-hero-grid > *', '.certificates-hero-proof > span',
  '.certificates-section-heading > *', '.certificates-featured-list > article', '.certificate-disclosure > *', '.certificate-document', '.certificate-sources > *',
].join(',');

export function ScrollEntrances() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;
    const tracked = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;
    function reveal(element: HTMLElement, immediate = false) {
      if (immediate) element.style.setProperty('--entrance-duration', '0ms');
      element.dataset.entrance = 'visible';
      observer?.unobserve(element);
    }
    function collect() {
      document.querySelectorAll<HTMLElement>(entranceTargets).forEach(element => {
        if (tracked.has(element)) return;
        tracked.add(element);
        // A short stagger is shared by related siblings, never by page position.
        const siblings = Array.from(element.parentElement?.children ?? []).filter(child => child.matches(entranceTargets));
        element.style.setProperty('--entrance-delay', `${Math.min(siblings.indexOf(element), 2) * 65}ms`);
        element.dataset.entrance = 'pending';
        observer?.observe(element);
      });
    }
    function configure() {
      observer?.disconnect();
      mutations?.disconnect();
      tracked.forEach(element => { delete element.dataset.entrance; element.style.removeProperty('--entrance-duration'); });
      tracked.clear();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
      }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
      collect();
      // Product tabs mount new cards; those receive the same entrance treatment.
      mutations = new MutationObserver(collect);
      const main = document.getElementById('main');
      if (main) mutations.observe(main, { childList: true, subtree: true });
    }
    function handleFocus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>('[data-entrance="pending"]');
      if (element) reveal(element, true);
    }
    configure();
    preference.addEventListener('change', configure);
    document.addEventListener('focusin', handleFocus);
    return () => {
      observer?.disconnect();
      mutations?.disconnect();
      preference.removeEventListener('change', configure);
      document.removeEventListener('focusin', handleFocus);
      tracked.forEach(element => { delete element.dataset.entrance; element.style.removeProperty('--entrance-delay'); element.style.removeProperty('--entrance-duration'); });
    };
  }, []);
  return null;
}
