import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import ScrollGallery from "@/components/ScrollGallery";
import Reveal from "@/components/Reveal";
import fabricCategories from "@/content/fabric-images.json";

export const metadata: Metadata = {
  title: "Fabric Gallery",
  description: "Browse the De Fabiano cloth library, real fabric photography across 11 shirting collections, from 100% cotton basic weaves to water-repellent Nano finishes.",
};

export default function FabricGalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Reveal>
        <Eyebrow>Premium Fabric Gallery</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
          The Cloth Library
        </h1>
        <p className="mt-3 max-w-xl text-sm text-gray">
          Real fabric photography from our shirting collections. Scroll or use the arrows to browse
          each range, click through to a fitting to see swatches in person.
        </p>
      </Reveal>

      <div className="mt-12 space-y-14">
        {fabricCategories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 0.05}>
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">{cat.name}</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray">
                {cat.images.length}+ swatches
              </span>
            </div>
            <ScrollGallery images={cat.images} alt={cat.name} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
