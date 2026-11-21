import { products, catalogueRanges, platinumWasser, sizes } from './products';
export type CatalogueFilters = { range: string; size: string; query: string };
export const defaultFilters: CatalogueFilters = { range: 'all', size: 'all', query: '' };
export function readFilters(params: URLSearchParams): CatalogueFilters {
  const range = params.get('range') ?? 'all';
  const size = params.get('size') ?? 'all';
  return { range: catalogueRanges.includes(range) ? range : 'all', size: range !== platinumWasser.name && sizes.some(item => String(item) === size) ? size : 'all', query: (params.get('q') ?? '').slice(0, 80) };
}
export function filterProducts(filters: CatalogueFilters) {
  const query = filters.query.trim().toLowerCase().replace(/[\s-]/g, '');
  return products.filter(product => (filters.range === 'all' || product.name === filters.range) && (filters.size === 'all' || String(product.size) === filters.size) && (!query || `${product.model} ${product.name}`.toLowerCase().replace(/[\s-]/g, '').includes(query)));
}
