import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductCatalogue } from '@/components/product-catalogue';
import { productRoutes } from '@/lib/product-routes';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(productRoutes).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!Object.hasOwn(productRoutes, slug)) notFound();
  return { title: `${productRoutes[slug]} | Water Filter Systems` };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  if (!Object.hasOwn(productRoutes, slug)) notFound();
  return <ProductCatalogue slug={slug}/>;
}
