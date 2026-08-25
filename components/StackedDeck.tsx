"use client";

/*
 * Stacked-card deck, the TERRAIN "The Collection" pattern: a fan of
 * overlapping cards, the front one detailed (name, price, badges), the
 * rest peeking out behind. Click a side card or use the arrows to bring it
 * forward. Distinct from CoverflowGallery (3D tilt), this is a flat,
 * offset-stack look.
 */

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderVisual from "./PlaceholderVisual";
import StarRating from "./StarRating";
import type { Product } from "@/lib/types";

function formatTHB(n: number) {
  return `฿${n.toLocaleString("en-US")}`;
}

export default function StackedDeck({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const n = products.length;

  const step = (dir: number) => setActive((a) => (((a + dir) % n) + n) % n);

  return (
    <div className="relative mx-auto max-w-md">
      <div className="relative h-[420px]">
        {products.map((p, i) => {
          let rel = i - active;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const ax = Math.abs(rel);
          if (ax > 2) return null;
          const isActive = rel === 0;

          return (
            <div
              key={p.slug}
              onClick={() => !isActive && setActive(i)}
              className="absolute inset-0 overflow-hidden rounded-lg border border-line shadow-xl transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${rel * 26}px) translateY(${ax * 10}px) rotate(${rel * 3}deg) scale(${1 - ax * 0.06})`,
                zIndex: 10 - ax,
                opacity: ax > 2 ? 0 : 1,
                cursor: isActive ? "default" : "pointer",
              }}
            >
              <PlaceholderVisual color={p.variants[0].swatchColor} className="h-full w-full" showBadge={false} />
              {p.variants[0].image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.variants[0].image}
                  alt={p.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              )}
              {isActive && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/60 to-transparent p-5">
                  {p.bestseller && (
                    <span className="inline-block rounded-full bg-brass px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white">
                      Bestseller
                    </span>
                  )}
                  <div className="mt-2 font-display text-lg font-semibold text-white">{p.name}</div>
                  {p.rating && (
                    <div className="mt-1 [&_span]:text-white/70">
                      <StarRating rating={p.rating} reviewCount={p.reviewCount} size={11} />
                    </div>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-sm text-white">from {formatTHB(p.basePrice)}</span>
                    <Link
                      href={`/product/${p.slug}`}
                      className="rounded-full bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink transition-colors hover:bg-brass hover:text-white"
                    >
                      View
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          onClick={() => step(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white shadow-sm transition-colors hover:border-brass"
          aria-label="Previous"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {products.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-brass" : "w-1.5 bg-line"}`}
              aria-label={`Go to ${p.name}`}
            />
          ))}
        </div>
        <button
          onClick={() => step(1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white shadow-sm transition-colors hover:border-brass"
          aria-label="Next"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
