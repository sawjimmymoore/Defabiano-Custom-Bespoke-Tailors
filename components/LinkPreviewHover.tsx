"use client";

/*
 * Adapted from Originkit "Link Preview", an underlined inline link that
 * reveals a floating preview on hover. Source used a live screenshot API
 * (microlink.io); replaced with our own PlaceholderVisual since this needs
 * to work for internal product/journal links without an external
 * screenshot service dependency.
 */

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import PlaceholderVisual from "./PlaceholderVisual";

export default function LinkPreviewHover({
  href,
  label,
  previewColor = "#2F5CFF",
  previewLabel,
  className = "",
}: {
  href: string;
  label: string;
  previewColor?: string;
  previewLabel?: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={href}
        className={`underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-brass hover:text-brass ${className}`}
      >
        {label}
      </Link>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-20 -translate-x-1/2 overflow-hidden rounded-sm border border-line shadow-xl"
            style={{ width: 220, height: 130 }}
          >
            <PlaceholderVisual color={previewColor} className="h-full w-full" showBadge={false} label={previewLabel} />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
