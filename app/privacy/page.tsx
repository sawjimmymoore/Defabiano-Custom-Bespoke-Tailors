import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How De Fabiano collects, uses, and protects your information.",
};

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "Personal information: full name, email address, phone number, shipping and billing address, and body measurements (for bespoke garments). Payment information is processed through third-party payment providers. We do not store your credit card details on our servers. Technical information: IP address, browser type, device information, cookies, and usage data.",
  },
  {
    title: "How We Use Your Information",
    body: "To process and fulfill orders, provide consultations and customer support, communicate regarding production and delivery, improve website performance, and comply with legal obligations. We do not sell or rent your personal information.",
  },
  {
    title: "Data Sharing",
    body: "We may share limited information with payment processors, shipping carriers, website hosting providers, and analytics services. These third parties only receive information necessary to perform their services.",
  },
  {
    title: "Data Retention",
    body: "We retain personal information only as long as necessary to fulfill orders, maintain business records, and comply with legal requirements.",
  },
  {
    title: "Cookies",
    body: "Our website may use cookies and analytics tools to improve user experience and monitor performance. You may disable cookies through your browser settings; however, some features of the website may not function properly.",
  },
  {
    title: "Data Security",
    body: "We implement reasonable security measures to protect your personal information. However, no online transmission or storage system can be guaranteed to be 100% secure.",
  },
  {
    title: "Your Rights",
    body: "Depending on your location, you may have the right to request access to your personal data, request correction of inaccurate data, request deletion of your data, and withdraw consent for marketing communications.",
  },
  {
    title: "International Clients",
    body: "As De Fabiano serves international clients, your information may be processed in accordance with applicable laws in the country of operation.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-gray">
        De Fabiano respects your privacy and is committed to protecting your personal information.
        This Privacy Policy explains how we collect, use, and safeguard your information when you
        visit our website or place an order.
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
            If you have questions regarding this Privacy Policy, please contact info@defabiano.com.
          </p>
        </div>
      </div>
    </div>
  );
}
