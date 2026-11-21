import type { Metadata } from 'next';
import { ProductCatalogue } from '@/components/product-catalogue';

export const metadata: Metadata = {
  title: 'Our filters | Homewater',
  description: 'Compare FX, HF2 and HF2-S cartridge filters and the Platinum Wasser reverse osmosis system with booster pump.',
};
export default function ProductsPage() { return <ProductCatalogue/>; }
