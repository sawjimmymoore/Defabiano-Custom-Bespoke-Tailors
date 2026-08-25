"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import PlaceholderVisual from "./PlaceholderVisual";
import StarRating from "./StarRating";
import { useSavedItems } from "@/lib/saved-items-context";
import type { Product } from "@/lib/types";

function formatTHB(n: number) {
  return `฿${n.toLocaleString("en-US")}`;
}

export default function ProductCard({ product }: { product: Product }) {
  const primary = product.variants[0];
  const { isSaved, toggleSaved } = useSavedItems();
  const saved = isSaved(product.slug);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleSaved(product.slug);
        }}
        aria-label={saved ? "Remove from saved items" : "Save item"}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow transition-transform hover:scale-110"
      >
        <Heart size={15} className={saved ? "fill-brass text-brass" : "text-gray"} />
      </button>

      <Link
        href={`/product/${product.slug}`}
        className="group block overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-shadow hover:shadow-xl"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          {primary.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={primary.image}
              alt={product.name}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <PlaceholderVisual
              color={primary.swatchColor}
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {product.bestseller && (
            <span className="absolute left-2 top-2 rounded-full bg-brass px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white shadow">
              Bestseller
            </span>
          )}
          {product.isNew && !product.bestseller && (
            <span className="absolute left-2 top-2 rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white shadow">
              New Arrival
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-gray">
            {product.subcategory}
          </div>
          <div className="mt-1 font-display text-base font-semibold text-ink">{product.name}</div>
          {product.rating && (
            <div className="mt-1">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size={11} />
            </div>
          )}
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-sm text-ink">from {formatTHB(product.basePrice)}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-gray">
              {product.turnaround}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
