"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { CartLine } from "./types";

interface CartContextValue {
  lines: CartLine[];
  addLine: (line: CartLine) => void;
  removeLine: (slug: string, variantId: string) => void;
  updateQuantity: (slug: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "defabiano-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time localStorage hydration on mount, intentional
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  function addLine(newLine: CartLine) {
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.slug === newLine.slug && l.variantId === newLine.variantId
      );
      if (existing) {
        return prev.map((l) =>
          l.slug === newLine.slug && l.variantId === newLine.variantId
            ? { ...l, quantity: l.quantity + newLine.quantity }
            : l
        );
      }
      return [...prev, newLine];
    });
    setDrawerOpen(true);
  }

  function removeLine(slug: string, variantId: string) {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.variantId === variantId)));
  }

  function updateQuantity(slug: string, variantId: string, quantity: number) {
    if (quantity <= 0) {
      removeLine(slug, variantId);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.slug === slug && l.variantId === variantId ? { ...l, quantity } : l))
    );
  }

  function clearCart() {
    setLines([]);
  }

  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        addLine,
        removeLine,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        isDrawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
