"use client";

import { motion } from "framer-motion";
import SplitScrollVideo from "./SplitScrollVideo";

const DETAILS = [
  { title: "Full Canvas Construction", body: "Hair canvas floats between shell and lining, letting the jacket mold to your body over years of wear instead of holding a stiff, static shape." },
  { title: "Hand-Stitched Lapel Roll", body: "Padstitching by hand gives the lapel a soft roll that machine-pressed lapels can't replicate." },
  { title: "Working Cuff Buttons", body: "Surgeon's cuffs that actually function, a small detail that signals real construction, not a suit pulled off a rack." },
];

export default function SuitDetailsScrollSection() {
  return (
    <SplitScrollVideo
      src="/videos/details-scrub.mp4"
      side="left"
      eyebrow="Built to Last, Not Just to Look Good"
      title="The Details Nobody Sees, Everybody Feels"
    >
      <div className="space-y-5">
        {DETAILS.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border-l-2 border-brass pl-4"
          >
            <div className="font-display text-base font-bold text-ink">{d.title}</div>
            <p className="mt-1 text-sm text-gray">{d.body}</p>
          </motion.div>
        ))}
      </div>
    </SplitScrollVideo>
  );
}
