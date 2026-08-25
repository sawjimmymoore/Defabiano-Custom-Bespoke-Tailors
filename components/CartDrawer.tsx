"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import PlaceholderVisual from "./PlaceholderVisual";

function formatTHB(n: number) {
  return `฿${n.toLocaleString("en-US")}`;
}

export default function CartDrawer() {
  const { lines, isDrawerOpen, closeDrawer, updateQuantity, removeLine, subtotal } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/50" onClick={closeDrawer} />
      <div className="relative flex h-full w-full max-w-md flex-col bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="font-display text-lg font-semibold">Your Cart</span>
          <button onClick={closeDrawer} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-sm text-gray">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {lines.map((l) => (
                <div key={`${l.slug}-${l.variantId}`} className="flex gap-3">
                  {l.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={l.image}
                      alt={l.name}
                      className="h-16 w-16 shrink-0 rounded-sm object-cover object-top"
                    />
                  ) : (
                    <PlaceholderVisual
                      color="#3A3A3A"
                      className="h-16 w-16 shrink-0 rounded-sm"
                      showBadge={false}
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-display text-sm font-medium">{l.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-gray">
                      {l.variantLabel}
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          className="px-2 py-0.5 text-xs"
                          onClick={() => updateQuantity(l.slug, l.variantId, l.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="px-2 font-mono text-xs">{l.quantity}</span>
                        <button
                          className="px-2 py-0.5 text-xs"
                          onClick={() => updateQuantity(l.slug, l.variantId, l.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <span className="font-mono text-xs">{formatTHB(l.unitPrice * l.quantity)}</span>
                    </div>
                    <button
                      onClick={() => removeLine(l.slug, l.variantId)}
                      className="mt-1 font-mono text-[10px] uppercase tracking-wider text-gray underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-line px-5 py-4">
          <div className="mb-3 flex items-center justify-between font-mono text-sm">
            <span>Subtotal</span>
            <span>{formatTHB(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={closeDrawer}
            className={`block w-full rounded-sm py-3 text-center font-mono text-xs uppercase tracking-widest transition-colors ${
              lines.length === 0
                ? "pointer-events-none bg-line text-gray"
                : "bg-ink text-paper hover:bg-brass"
            }`}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
