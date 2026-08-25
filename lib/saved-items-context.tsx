"use client";

/**
 * Wishlist / "Saved Items", persisted in localStorage, same pattern as the
 * cart. Addresses the requested "savings" e-commerce feature: heart-toggle
 * on any product, viewable from the account page.
 */

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface SavedItemsContextValue {
  savedSlugs: string[];
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string) => void;
}

const SavedItemsContext = createContext<SavedItemsContextValue | undefined>(undefined);
const STORAGE_KEY = "defabiano-saved-v1";

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration, intentional
      if (raw) setSavedSlugs(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSlugs));
  }, [savedSlugs, hydrated]);

  function isSaved(slug: string) {
    return savedSlugs.includes(slug);
  }

  function toggleSaved(slug: string) {
    setSavedSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  return (
    <SavedItemsContext.Provider value={{ savedSlugs, isSaved, toggleSaved }}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const ctx = useContext(SavedItemsContext);
  if (!ctx) throw new Error("useSavedItems must be used within SavedItemsProvider");
  return ctx;
}
