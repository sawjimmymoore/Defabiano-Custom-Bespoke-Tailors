"use client";

/*
 * Horizontal gallery that supports BOTH arrow buttons AND native
 * scroll/drag/touch, addresses "not just arrow but also scroll function".
 * Uses real <img> tags (no config needed for external domains).
 */

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScrollGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="group relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[3/4] w-40 shrink-0 snap-start overflow-hidden rounded-sm border border-line bg-paper-2 sm:w-48"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollBy(-1)}
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 -translate-x-3 rounded-full border border-line bg-white p-2 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
        aria-label="Scroll left"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => scrollBy(1)}
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-3 rounded-full border border-line bg-white p-2 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
        aria-label="Scroll right"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
