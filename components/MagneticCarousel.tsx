"use client";

/*
 * Adapted from Originkit "Magnetic Carousel", a row of bars that magnify
 * dock-style as the cursor nears, click to open large. Re-themed to the
 * light/blue palette and wired to render our PlaceholderVisual (colored by
 * each item's product variant) instead of hotlinked demo images, since this
 * needs to work with real product data, not Originkit's stock photography.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PlaceholderVisual from "./PlaceholderVisual";

export interface MagneticItem {
  label: string;
  sublabel?: string;
  color: string;
  href?: string;
  image?: string;
}

export default function MagneticCarousel({
  items,
  collapsedWidth = 90,
  hoverWidth = 170,
  collapsedHeight = 300,
  hoverHeight = 360,
  gap = 10,
  influence = 180,
}: {
  items: MagneticItem[];
  collapsedWidth?: number;
  hoverWidth?: number;
  collapsedHeight?: number;
  hoverHeight?: number;
  gap?: number;
  influence?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [factors, setFactors] = useState<number[]>(() => items.map(() => 0));
  const targetRef = useRef<number[]>(items.map(() => 0));
  const curRef = useRef<number[]>(items.map(() => 0));
  const loopRef = useRef(0);

  useEffect(() => {
    return () => cancelAnimationFrame(loopRef.current);
  }, []);

  const startLoop = () => {
    if (loopRef.current) return;
    const step = () => {
      const tgt = targetRef.current;
      const cur = curRef.current;
      let moving = false;
      for (let i = 0; i < cur.length; i++) {
        const d = (tgt[i] ?? 0) - cur[i];
        if (Math.abs(d) > 0.001) {
          cur[i] += d * 0.2;
          moving = true;
        } else {
          cur[i] = tgt[i] ?? 0;
        }
      }
      setFactors([...cur]);
      loopRef.current = moving ? requestAnimationFrame(step) : 0;
    };
    loopRef.current = requestAnimationFrame(step);
  };

  const setTargetFromCursor = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = clientX - rect.left;
    const n = items.length;
    const totalBase = n * collapsedWidth + (n - 1) * gap;
    const startX = (rect.width - totalBase) / 2;
    targetRef.current = items.map((_, i) => {
      const center = startX + i * (collapsedWidth + gap) + collapsedWidth / 2;
      const dist = Math.abs(cx - center);
      const f = Math.max(0, 1 - dist / influence);
      return f * f * (3 - 2 * f);
    });
    startLoop();
  };

  const onLeave = () => {
    targetRef.current = items.map(() => 0);
    startLoop();
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center"
      style={{ gap }}
      onMouseMove={(e) => setTargetFromCursor(e.clientX)}
      onMouseLeave={onLeave}
    >
      {items.map((item, i) => {
        const f = factors[i] ?? 0;
        const width = collapsedWidth + (hoverWidth - collapsedWidth) * f;
        const height = collapsedHeight + (hoverHeight - collapsedHeight) * f;
        const content = (
          <div
            className="relative shrink-0 cursor-pointer overflow-hidden rounded-sm"
            style={{ width, height, willChange: "width, height" }}
          >
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.label} className="h-full w-full object-cover" />
            ) : (
              <PlaceholderVisual color={item.color} className="h-full w-full" showBadge={false} />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-ink/70 px-2 py-2 text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white">
                {item.label}
              </div>
              {item.sublabel && f > 0.3 && (
                <div className="mt-0.5 font-mono text-[9px] text-white/70">{item.sublabel}</div>
              )}
            </div>
          </div>
        );
        return item.href ? (
          <Link key={item.label} href={item.href}>
            {content}
          </Link>
        ) : (
          <div key={item.label}>{content}</div>
        );
      })}
    </div>
  );
}
