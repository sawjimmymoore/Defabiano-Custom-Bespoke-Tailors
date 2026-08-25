"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Scramble-in text: characters resolve from random glyphs to the final
 * string, left to right, on mount/in-view. Used for hero and section
 * headlines to give the page real motion instead of a static page load.
 */
export default function ScrambleText({
  text,
  as: Tag = "span",
  className = "",
  duration = 900,
  triggerOnView = true,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  triggerOnView?: boolean;
}) {
  const [display, setDisplay] = useState(triggerOnView ? text.replace(/[^\s]/g, " ") : text);
  const ref = useRef<HTMLElement>(null);
  const played = useRef(false);

  useEffect(() => {
    function play() {
      if (played.current) return;
      played.current = true;
      const start = performance.now();
      function frame(now: number) {
        const progress = Math.min(1, (now - start) / duration);
        const revealCount = Math.floor(progress * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            out += " ";
          } else if (i < revealCount) {
            out += text[i];
          } else {
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(out);
        if (progress < 1) requestAnimationFrame(frame);
        else setDisplay(text);
      }
      requestAnimationFrame(frame);
    }

    if (!triggerOnView) {
      play();
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) play();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref as never} className={className}>
      {display}
    </Tag>
  );
}
