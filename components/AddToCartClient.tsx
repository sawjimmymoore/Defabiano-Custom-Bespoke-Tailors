"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useSavedItems } from "@/lib/saved-items-context";
import PhotoSpin360 from "./PhotoSpin360";
import ProductImageDisplay from "./ProductImageDisplay";
import StarRating from "./StarRating";
import type { Product } from "@/lib/types";

function formatTHB(n: number) {
  return `฿${n.toLocaleString("en-US")}`;
}

export default function AddToCartClient({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const { addLine } = useCart();
  const { isSaved, toggleSaved } = useSavedItems();
  const saved = isSaved(product.slug);

  const variant = product.variants.find((v) => v.id === variantId)!;
  const unitPrice = product.basePrice + variant.priceModifier;

  function handleAdd() {
    addLine({
      slug: product.slug,
      name: product.name,
      variantId: variant.id,
      variantLabel: variant.label,
      unitPrice,
      quantity,
      image: variant.image ?? product.images[0] ?? "",
    });
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      {variant.image ? (
        <ProductImageDisplay src={variant.image} alt={`${product.name}, ${variant.label}`} />
      ) : (
        <PhotoSpin360 color={variant.swatchColor} frameCount={24} productName={product.name} />
      )}

      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-gray">
          {product.subcategory}
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{product.name}</h1>
        {product.rating && (
          <div className="mt-2">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
        )}
        <p className="mt-3 text-sm leading-relaxed text-gray">{product.description}</p>

        <div className="mt-6 font-display text-2xl text-ink">{formatTHB(unitPrice)}</div>

        <div className="mt-6">
          <div className="font-mono text-xs uppercase tracking-widest text-gray">Fabric / Color</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                  v.id === variantId ? "border-brass bg-paper-2" : "border-line hover:border-gray"
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full border border-line"
                  style={{ backgroundColor: v.swatchColor }}
                />
                {v.label}
                {v.priceModifier > 0 && (
                  <span className="text-gray">+{formatTHB(v.priceModifier)}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="font-mono text-xs uppercase tracking-widest text-gray">Qty</div>
          <div className="flex items-center rounded-full border border-line">
            <button
              className="px-3 py-1 text-ink"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="px-2 font-mono text-sm">{quantity}</span>
            <button className="px-3 py-1 text-ink" onClick={() => setQuantity((q) => q + 1)}>
              +
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleAdd}
            className="flex-1 rounded-full bg-ink py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-brass"
          >
            Add to Cart
          </button>
          <button
            onClick={() => toggleSaved(product.slug)}
            aria-label={saved ? "Remove from saved items" : "Save item"}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-brass"
          >
            <Heart size={18} className={saved ? "fill-brass text-brass" : "text-gray"} />
          </button>
        </div>

        <div className="mt-8 space-y-2 border-t border-line pt-6">
          {product.details.map((d) => (
            <div key={d} className="flex items-start gap-2 text-sm text-gray">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brass" />
              {d}
            </div>
          ))}
        </div>

        <div className="mt-4 font-mono text-xs uppercase tracking-widest text-gray">
          Turnaround: {product.turnaround} · 50% deposit to begin production
        </div>
      </div>
    </div>
  );
}
