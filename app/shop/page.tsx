import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description: "Bespoke suits, shirts, formalwear, and accessories, made to measure in Bangkok.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="px-6 py-16 text-center text-gray">Loading…</div>}>
      <ShopClient />
    </Suspense>
  );
}
