import type { MetadataRoute } from 'next';
import { productRoutes } from '@/lib/product-routes';

const siteUrl = 'https://waterfilter-cyprus.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/products', '/certificates', ...Object.keys(productRoutes).map(slug => `/products/${slug}`)].map(route => ({
    url: new URL(route, siteUrl).href,
  }));
}
