import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import AddToCartClient from "@/components/AddToCartClient";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.description} From ฿${product.basePrice.toLocaleString("en-US")}, ${product.turnaround} turnaround.`,
    openGraph: {
      title: `${product.name} | De Fabiano Bespoke Tailor`,
      description: product.description,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getAllProducts()
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <Link href="/shop" className="font-mono text-xs uppercase tracking-widest text-gray hover:text-ink">
        ← Back to Shop
      </Link>

      <div className="mt-6">
        <AddToCartClient product={product} />
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-line pt-10">
          <h2 className="font-display text-xl font-semibold text-ink">You Might Also Like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
