import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Measured",
  description: "How De Fabiano measures you for a bespoke commission.",
};

import Eyebrow from "@/components/Eyebrow";
import Link from "next/link";

const STEPS = [
  { title: "Chest", desc: "Measure around the fullest part of your chest, under the arms, keeping the tape level." },
  { title: "Waist", desc: "Measure around your natural waistline, where you'd wear trousers, not necessarily your navel." },
  { title: "Hips", desc: "Measure around the fullest part of your hips and seat." },
  { title: "Shoulder Width", desc: "Measure from the edge of one shoulder to the other, across the back." },
  { title: "Sleeve Length", desc: "From the shoulder seam to your wrist bone, with your arm slightly bent." },
  { title: "Inseam", desc: "From the crotch seam to the bottom of your ankle, following the inside of your leg." },
];

export default function MeasurementsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Get Measured</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
        How We Measure You
      </h1>
      <p className="mt-3 text-sm text-gray">
        This guide is for reference, every commission starts with an in-person measurement session
        at our Sukhumvit Road studio. If you&apos;re an international client, we still recommend
        visiting in person for your first commission so we can capture fit preferences a tape
        measure alone can&apos;t.
      </p>

      <div className="mt-10 space-y-6">
        {STEPS.map((s, i) => (
          <div key={s.title} className="flex gap-4 border-b border-line pb-6">
            <div className="font-display text-2xl text-brass">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div className="font-display text-lg font-medium text-ink">{s.title}</div>
              <p className="mt-1 text-sm text-gray">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-sm border border-line bg-paper-2 p-6 text-center">
        <p className="text-sm text-gray">Ready to get properly measured?</p>
        <Link
          href="/appointment"
          className="mt-4 inline-block rounded-sm bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper hover:bg-brass"
        >
          Book a Fitting
        </Link>
      </div>
    </div>
  );
}
