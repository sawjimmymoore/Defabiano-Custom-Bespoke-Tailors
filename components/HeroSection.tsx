"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollScrub } from "@/lib/use-scroll-scrub";

interface HeroProps {
  hero: {
    eyebrow: string;
    subhead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  stats: { value: string; label: string }[];
}

export default function HeroSection({ hero, stats }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useScrollScrub(containerRef, videoRef);

  return (
    <div ref={containerRef} className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        {/* Text column, bold editorial typography, light theme */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-gray"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            {hero.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="mt-5 font-display text-6xl font-extrabold uppercase leading-[0.9] tracking-tight text-ink md:text-7xl lg:text-8xl"
          >
            Cut to
            <br />
            You.
            <br />
            <span className="text-brass">Not Off</span>
            <br />
            The Rack.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-md text-sm text-gray md:text-base"
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href={hero.primaryCta.href}
              className="rounded-full bg-ink px-7 py-3 text-center font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-brass"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="rounded-full border border-line bg-white px-7 py-3 text-center font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-brass"
            >
              {hero.secondaryCta.label}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-paper-2/70 px-3 py-3 text-center backdrop-blur-sm">
                <div className="font-display text-lg font-bold text-ink md:text-xl">{s.value}</div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-gray">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Video column, contained panel, scroll-scrubbed, native portrait ratio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-line shadow-2xl"
        >
          <video
            ref={videoRef}
            src="/videos/hero-scrub.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
          <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink backdrop-blur">
            Scroll to explore
          </div>
        </motion.div>
      </div>
    </div>
  );
}
