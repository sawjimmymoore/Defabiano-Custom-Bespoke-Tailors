import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "How We Work",
  description: "The De Fabiano bespoke process, from consultation to final delivery.",
};

const STEPS = [
  {
    title: "Consultation",
    subtitle: "Understanding Your Vision",
    body: "Your journey begins with a consultation, either in-store or by appointment. We discuss occasion and purpose, personal style preferences, fit expectations, and fabric and construction options. This stage ensures the garment reflects not only your measurements, but your identity.",
  },
  {
    title: "Design & Fabric Selection",
    subtitle: "Defining the Details",
    body: "Once direction is established, we refine the design. You'll select fabric and weight, lining, lapel style, button choice, pocket style, and additional detailing. Every element is intentional, nothing is assumed.",
  },
  {
    title: "Measurement & Pattern Preparation",
    subtitle: "Precision Before Construction",
    body: "For in-store clients, detailed measurements are taken personally. For remote clients, we guide you step-by-step through the measurement process to ensure accuracy. From these measurements, your individual pattern is prepared and tailoring begins.",
  },
  {
    title: "Construction",
    subtitle: "Tailoring Begins",
    body: "Your garment is cut and assembled according to your specifications. Production timelines are discussed during consultation and vary depending on design complexity and fabric selection. Each stage is handled with structural attention and quality control.",
  },
  {
    title: "First Fitting",
    subtitle: "Refining the Structure",
    body: "Within the discussed timeframe, you return for your initial fitting. At this stage we assess shoulder balance, chest drape, sleeve length, trouser break, and overall silhouette. If adjustments are required, refinements are made.",
  },
  {
    title: "Final Fitting",
    subtitle: "Confirmation & Completion",
    body: "Once adjustments are completed, a final fitting ensures the garment sits correctly and comfortably. If further minor refinements are necessary, they're completed promptly. Only once the fit is confirmed does the garment reach its final form.",
  },
  {
    title: "Collection or Delivery",
    subtitle: "Ready to Wear",
    body: "After final approval, in-store clients may collect directly, delivery arrangements can be made upon request, and remote clients receive their garment via secure international shipping.",
  },
];

export default function HowWeWorkPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Eyebrow>Our Process</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
        A Structured Approach to Bespoke Tailoring
      </h1>
      <p className="mt-4 max-w-2xl text-sm text-gray">
        At De Fabiano, every garment is created through a deliberate and personal process. Whether
        you visit us in-store or commission remotely, each step is guided with precision, clarity,
        and craftsmanship.
      </p>

      <div className="mt-12 space-y-10">
        {STEPS.map((s, i) => (
          <div key={s.title} className="flex gap-6 border-b border-line pb-10 last:border-0">
            <div className="shrink-0 font-display text-3xl font-bold text-brass">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-gray">
                {s.subtitle}
              </div>
              <div className="mt-1 font-display text-xl font-semibold text-ink">{s.title}</div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
