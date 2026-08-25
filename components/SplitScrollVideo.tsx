"use client";

/*
 * Split-panel scroll-scrub section, video contained to one side (left or
 * right) at its native portrait aspect ratio, NOT full-bleed. Content sits
 * beside it. Typography follows the bold-editorial reference (huge tight
 * black display type, small mono label top, generous whitespace) rather
 * than overlaying text on the video itself.
 */

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollScrub } from "@/lib/use-scroll-scrub";

export default function SplitScrollVideo({
  src,
  side = "right",
  eyebrow,
  title,
  body,
  children,
}: {
  src: string;
  side?: "left" | "right";
  eyebrow: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useScrollScrub(containerRef, videoRef);

  const videoPanel = (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-line shadow-2xl">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
    </div>
  );

  const textPanel = (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-gray"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brass" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-5 font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-ink md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {body && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-5 max-w-md text-sm leading-relaxed text-gray md:text-base"
        >
          {body}
        </motion.p>
      )}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8"
        >
          {children}
        </motion.div>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div
        className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
          side === "left" ? "" : "md:[&>*:first-child]:order-2"
        }`}
      >
        {videoPanel}
        {textPanel}
      </div>
    </div>
  );
}
