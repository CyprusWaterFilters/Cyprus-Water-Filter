import { products } from './products';

export function productSlug(model: string) {
  return model.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const productRoutes: Record<string, string> = {
  ...Object.fromEntries(products.map(({ model }) => [productSlug(model), model])),
  'three-stage-plus-1': 'Three Stage Plus 1',
  'three-stage-plus-2': 'Three Stage Plus 2',
  'reverse-osmosis-system': 'Reverse Osmosis',
  'ecosoft-standard-pro': 'Ecosoft Standard Pro',
  'ecosoft-absolute': 'Ecosoft Absolute',
  'pure-ux6-600g': 'Pure Water Filters UX6 600G',
  'ecosoft-cross-90': 'Ecosoft CROSS 90',
  'krausen-pro-800': 'Krausen Pro Series 800 GPD · 10″ Big Blue',
  'krausen-new-line': 'Krausen New Line 800 / 1600 GPD',
  'ecosoft-mo36000': 'Ecosoft MO 36000',
};
