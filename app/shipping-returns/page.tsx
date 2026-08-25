import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Shipping & Returns Policy",
  description: "Shipping timelines, duties, and our returns policy for bespoke garments.",
};

const SECTIONS = [
  {
    title: "Production Timeline",
    body: "All garments are bespoke or made-to-measure and are produced upon order confirmation. Estimated production timelines will be communicated during consultation and may vary depending on fabric availability, design complexity, and seasonal demand.",
  },
  {
    title: "About Shipping",
    body: "We offer domestic and international shipping. Shipping timeframes depend on destination and carrier services. Once dispatched, a tracking number will be provided where available. De Fabiano is not responsible for delays caused by customs clearance, import procedures, shipping carrier disruptions, or force majeure events.",
  },
  {
    title: "Duties & Taxes",
    body: "International orders may be subject to customs duties, taxes, or import fees imposed by the destination country. These charges are the responsibility of the client.",
  },
  {
    title: "Returns & Refunds",
    body: "Due to the custom nature of our garments, all bespoke and made-to-measure items are final sale. Returns are not accepted for change of mind. Refunds are not available for garments produced according to submitted measurements. If a significant manufacturing defect is identified, the matter will be reviewed and resolved at our discretion.",
  },
  {
    title: "Alterations",
    body: "Minor fit refinements may be required. For international clients, local alteration costs are the responsibility of the client unless otherwise agreed in writing.",
  },
];

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Shipping & Returns Policy</h1>
      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title} className="border-t border-line pt-6">
            <h2 className="font-display text-lg font-semibold text-ink">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-sm border border-line bg-paper-2 p-6 text-center">
        <p className="text-sm text-gray">Questions about shipping or an existing order?</p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-white hover:bg-brass"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
