"use client";

/*
 * Adapted from Originkit "Coverflow Gallery" (Smooth3DSlideshow), a 3D
 * coverflow where the active card sits upright while neighbours tilt back
 * in perspective. Simplified from the source and wired to PlaceholderVisual
 * (colored per slide) instead of hotlinked demo photography.
 */

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import PlaceholderVisual from "./PlaceholderVisual";

export interface CoverflowSlide {
  title: string;
  subtitle?: string;
  color: string;
}

const PERSPECTIVE = 1400;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 220;

export default function CoverflowGallery({
  slides,
  cardWidth = 420,
  cardHeight = 320,
  tilt = 10,
}: {
  slides: CoverflowSlide[];
  cardWidth?: number;
  cardHeight?: number;
  tilt?: number;
}) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const lockRef = useRef(false);

  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, 550);
  }, []);

  const step = useCallback(
    (dir: number) => {
      if (lockRef.current) return;
      lock();
      setActive((a) => (((a + dir) % n) + n) % n);
    },
    [n, lock]
  );

  useEffect(() => {
    const id = window.setInterval(() => step(1), 3200);
    return () => window.clearInterval(id);
  }, [step]);

  const rootStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    perspective: `${PERSPECTIVE}px`,
    overflow: "hidden",
    padding: "40px 0",
  };

  return (
    <div style={rootStyle}>
      <div
        style={{
          position: "relative",
          width: cardWidth,
          height: cardHeight,
          transformStyle: "preserve-3d",
        }}
      >
        {slides.map((slide, i) => {
          let rel = i - active;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const ax = Math.abs(rel);
          const visible = ax <= MAX_VISIBLE;
          const isActive = rel === 0;
          const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
          const tx = rel * (cardWidth * 0.55);
          const tz = -ax * DEPTH;
          const ry = -rel * tilt;

          const cardStyle: CSSProperties = {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: cardWidth,
            height: cardHeight,
            borderRadius: 4,
            overflow: "hidden",
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`,
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s",
            opacity: visible ? 1 : 0,
            cursor: isActive ? "default" : "pointer",
            pointerEvents: visible ? "auto" : "none",
          };

          return (
            <div
              key={slide.title}
              style={cardStyle}
              onClick={() => !isActive && setActive(i)}
            >
              <PlaceholderVisual color={slide.color} className="h-full w-full" showBadge={false} angle={rel * 20 + 45} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="font-display text-lg font-medium text-white">{slide.title}</div>
                {slide.subtitle && (
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/70">
                    {slide.subtitle}
                  </div>
                )}
              </div>
              <div
                className="absolute inset-0"
                style={{ opacity: isActive ? 0 : 0.45, background: "#000", transition: "opacity 0.6s" }}
              />
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => {
              if (lockRef.current) return;
              lock();
              setActive(i);
            }}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-brass" : "w-1.5 bg-line"
            }`}
            aria-label={`Go to ${s.title}`}
          />
        ))}
      </div>
    </div>
  );
}
