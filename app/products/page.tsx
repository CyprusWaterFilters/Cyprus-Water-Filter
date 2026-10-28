import type { Metadata } from 'next';
import { ProductCatalogue } from '@/components/product-catalogue';

export const metadata: Metadata = {
  title: 'Our filters | Homewater',
  description: 'Browse all nine FX, HF2 and HF2-S water filters. Compare ranges and sizes, then ask us about your chosen model.',
};
export default function ProductsPage() { return <ProductCatalogue/>; }
