"use client";

/*
 * Word-by-word blur-in reveal, each word animates from blur(10px)/opacity 0
 * to sharp/opaque, staggered. A calmer companion to ScrambleText, used on
 * the hero for the words that shouldn't feel glitchy.
 */

import { motion } from "framer-motion";

export default function BlurText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: delay + i * 0.1, ease: "easeOut" }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
