import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import PlaceholderVisual from "@/components/PlaceholderVisual";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service",
  description: "Bespoke tailoring, alterations, branding, shuttle, and home-service tailoring at De Fabiano, Bangkok.",
};

const SERVICES = [
  {
    title: "Bespoke Fashion / Tailored Garments",
    color: "#1F2937",
    body: "At De Fabiano, we offer tailored services that reflect your unique style and fit preferences. Our skilled craftsmen create custom garments with unmatched quality and attention to detail. Elevate your wardrobe with De Fabiano's bespoke fashion.",
  },
  {
    title: "Alteration Services",
    color: "#5B7CFF",
    body: "Achieve the perfect fit with De Fabiano's Alteration Services. Our skilled tailors can make precise adjustments to any garment, ensuring it fits your body like a glove. From minor tweaks to complete overhauls, we take pride in perfecting every detail so that your attire not only looks exceptional but feels comfortable too.",
  },
  {
    title: "Branding Clothes",
    color: "#C1613D",
    body: "Make a lasting impression with De Fabiano's Branding Clothes service. We create custom apparel that reflects your brand's identity, from corporate uniforms to promotional wear. Trust us to deliver quality and style that align with your brand image.",
  },
  {
    title: "Shuttle Service",
    color: "#8A8A82",
    body: "De Fabiano offers more than just delivery. If you're staying at a hotel and need help getting to our shop, we provide a shuttle service to bring you directly to us. Whether for a fitting or to collect your garments, we ensure your visit is easy and stress-free.",
  },
  {
    title: "Personal Service (Home Service)",
    color: "#0F1B33",
    body: "Enjoy the luxury of bespoke tailoring without leaving the comfort of your home. With our Home Service Booking, De Fabiano brings the expertise of our master tailors directly to you. From initial consultations to precise measurements and fittings, our home service ensures that your custom garments are crafted to perfection.",
  },
];

const FAQ = [
  { q: "What materials do you work with?", a: "We work with a variety of materials including wool, cotton, silk, and linen. We can also work with specialty fabrics upon request." },
  { q: "Is every garment drafted individually?", a: "Yes. Each client receives a unique drafted pattern rather than an adjusted house block." },
  { q: "What level of canvas construction do you use?", a: "We offer structured canvas construction options, including full-canvas configurations for enhanced longevity and shape retention." },
  { q: "How do you address posture imbalance?", a: "Postural deviations are corrected at the drafting stage through shoulder adjustment, front balance correction, and sleeve pitch recalibration." },
  { q: "What determines the number of fittings required?", a: "Structural complexity, asymmetry, and garment type influence whether one fitting is sufficient or additional refinement is required." },
  { q: "How do you ensure durability in humid climates?", a: "We carefully select breathable fabrics and appropriate internal structure to prevent collapse or distortion in tropical conditions." },
  { q: "Can garments be altered after weight fluctuation?", a: "Moderate adjustments are possible due to seam allowances. Significant changes may require partial recutting." },
];

export default function ServicePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <Eyebrow>What We Offer</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
          Elevating Style Through Exceptional Service
        </h1>
        <p className="mt-3 max-w-xl text-sm text-gray">
          At De Fabiano, we offer tailored solutions to meet your unique needs. Our expert team
          ensures every detail enhances your style and comfort. Discover how we can elevate your
          experience.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div className="flex gap-4 rounded-sm border border-line bg-white p-5 shadow-sm">
              <PlaceholderVisual color={s.color} className="h-16 w-16 shrink-0 rounded-sm" showBadge={false} />
              <div>
                <h2 className="font-display text-base font-semibold text-ink">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray">{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h2 className="font-display text-xl font-semibold text-ink">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-3">
          {FAQ.map((item) => (
            <details key={item.q} className="rounded-sm border border-line bg-white p-4">
              <summary className="cursor-pointer font-display text-sm font-medium text-ink">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-gray">{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-14 rounded-sm border border-line bg-paper-2 p-8 text-center">
        <p className="text-sm text-gray">Ready to book one of our services?</p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-white hover:bg-brass"
        >
          Book Now
        </Link>
      </Reveal>
    </div>
  );
}
