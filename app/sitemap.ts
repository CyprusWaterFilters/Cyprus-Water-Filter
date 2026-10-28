import type { MetadataRoute } from 'next';

const siteUrl = 'https://waterfilter-cyprus.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/products', '/certificates'].map(route => ({
    url: new URL(route, siteUrl).href,
  }));
}
