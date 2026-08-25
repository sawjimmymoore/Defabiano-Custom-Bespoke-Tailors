"use client";

/*
 * Dark, high-contrast stats band, the TERRAIN reference pattern: big bold
 * numbers on a near-black background, a mission line, and a scorecard-style
 * detail panel. Adapted here for a bespoke tailor rather than a
 * sustainability metric, but the visual language (bold caps, thin accent
 * rule, numbers as the hero) is the same.
 */

import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

export default function MissionStatsBand({
  eyebrow,
  headline,
  body,
  stats,
}: {
  eyebrow: string;
  headline: string;
  body: string;
  stats: Stat[];
}) {
  return (
    <section className="bg-navy-deep px-6 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brass-light" />
            {eyebrow}
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold leading-tight md:text-3xl">
            {headline}
          </h2>
          <p className="mt-3 max-w-sm text-sm text-white/60">{body}</p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-navy-deep px-4 py-6 text-center"
            >
              <div className="font-display text-3xl font-bold text-brass-light md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
