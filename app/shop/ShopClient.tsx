"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Eyebrow from "@/components/Eyebrow";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, CATEGORY_LABELS } from "@/lib/products";
import type { ProductCategory } from "@/lib/types";

const CATEGORIES: (ProductCategory | "all")[] = ["all", "men", "women", "children", "accessories"];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initial = (searchParams.get("category") as ProductCategory | null) ?? "all";
  const [category, setCategory] = useState<ProductCategory | "all">(initial);

  const products = useMemo(() => {
    const all = getAllProducts();
    if (category === "all") return all;
    return all.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Eyebrow>Full Collection</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">Shop</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
              category === c ? "border-brass bg-paper-2 text-ink" : "border-line text-gray hover:text-ink"
            }`}
          >
            {c === "all" ? "All" : CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="mt-10 text-sm text-gray">No products in this category yet.</p>
      )}
    </div>
  );
}
