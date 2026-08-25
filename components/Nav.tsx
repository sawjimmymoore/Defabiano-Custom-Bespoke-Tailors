"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, User, Heart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAccount } from "@/lib/account-context";
import { useSavedItems } from "@/lib/saved-items-context";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/service", label: "Service" },
  { href: "/our-store", label: "Our Store" },
  { href: "/fabric-gallery", label: "Fabric Gallery" },
  { href: "/appointment", label: "Book Fitting" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const { itemCount, openDrawer } = useCart();
  const { currentUser } = useAccount();
  const { savedSlugs } = useSavedItems();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          DE FABIANO
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-line bg-paper-2/70 p-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-gray transition-colors hover:bg-white hover:text-brass"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="relative flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink shadow-sm transition-colors hover:border-brass hover:text-brass"
            aria-label="Saved items"
          >
            <Heart size={14} />
            {savedSlugs.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brass font-mono text-[10px] text-white">
                {savedSlugs.length}
              </span>
            )}
          </Link>
          <Link
            href="/account"
            className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink shadow-sm transition-colors hover:border-brass hover:text-brass"
          >
            <User size={14} />
            <span className="hidden sm:inline">
              {currentUser ? currentUser.name.split(" ")[0] : "Account"}
            </span>
          </Link>
          <button
            onClick={openDrawer}
            className="relative flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink shadow-sm transition-colors hover:border-brass hover:text-brass"
          >
            <ShoppingBag size={14} />
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brass font-mono text-[10px] text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-line px-6 py-4 lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 font-mono text-xs uppercase tracking-widest text-gray hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
