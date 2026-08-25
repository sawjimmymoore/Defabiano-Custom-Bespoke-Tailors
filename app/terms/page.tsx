import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for bespoke commissions at De Fabiano.",
};

const SECTIONS = [
  {
    title: "General",
    body: "De Fabiano provides bespoke and made-to-measure garments, including suits, shirts, and related apparel. All garments are custom-produced based on client specifications. By using this website, you agree to comply with these Terms.",
  },
  {
    title: "Orders & Payment",
    body: "All orders are considered confirmed once payment (full or deposit) has been received. Deposits are non-refundable. Production will begin only after confirmation of payment. Prices are subject to change without prior notice. For custom commissions, full payment may be required before production.",
  },
  {
    title: "Made-to-Measure & Bespoke Policy",
    body: "All garments produced by De Fabiano are custom-made according to measurements and specifications provided by the client. By submitting measurements (whether in-person or remotely), the client acknowledges responsibility for the accuracy of those measurements. Garments produced based on client-submitted measurements are considered custom commissions and are not eligible for refund. Minor variations in fit, fabric tone, or detailing may occur and do not constitute defects.",
  },
  {
    title: "Remote Consultations",
    body: "Consultations may be conducted virtually. When orders are placed without in-person fitting, the client assumes responsibility for measurement accuracy. Alterations, if required, are the responsibility of the client unless otherwise agreed in writing.",
  },
  {
    title: "Alterations",
    body: "De Fabiano may offer alteration guidance; however, international clients are responsible for local alteration costs. Alterations do not qualify as grounds for refund unless a significant production error has occurred.",
  },
  {
    title: "Production & Delivery",
    body: "Production timelines are estimates and may vary due to fabric availability, workload, or unforeseen circumstances. De Fabiano is not liable for delays caused by shipping carriers, customs processing, or force majeure events. Clients are responsible for any customs duties, import taxes, or local charges in their country.",
  },
  {
    title: "Returns & Refunds",
    body: "Due to the custom nature of our garments, all sales are final. Refunds are not available for bespoke or made-to-measure items. Exceptions may apply only in cases of significant manufacturing defects, subject to review.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this website, including images, designs, logos, text, and branding elements, are the intellectual property of De Fabiano. Unauthorized reproduction, distribution, modification, or commercial use of any materials is strictly prohibited.",
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, De Fabiano shall not be liable for indirect or consequential damages, fit dissatisfaction resulting from inaccurate measurements, or delays beyond reasonable control. Liability, where applicable, shall not exceed the amount paid for the garment in question.",
  },
  {
    title: "Governing Law",
    body: "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of Thailand.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Terms & Conditions</h1>
      <p className="mt-4 text-sm text-gray">
        Welcome to De Fabiano. By accessing this website or placing an order, you agree to the
        following Terms & Conditions. Please read them carefully.
      </p>
      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title} className="border-t border-line pt-6">
            <h2 className="font-display text-lg font-semibold text-ink">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray">{s.body}</p>
          </div>
        ))}
        <div className="border-t border-line pt-6">
          <h2 className="font-display text-lg font-semibold text-ink">Contact</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray">
            For any inquiries regarding these Terms, please contact info@defabiano.com.
          </p>
        </div>
      </div>
    </div>
  );
}
