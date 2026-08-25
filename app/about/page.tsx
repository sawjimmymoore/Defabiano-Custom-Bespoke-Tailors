import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "18+ years of bespoke tailoring on Sukhumvit Road, Bangkok.",
};

import Eyebrow from "@/components/Eyebrow";
import siteContent from "@/content/site-content.json";

export default function AboutPage() {
  const { about } = siteContent;
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Eyebrow>Our Story</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">{about.title}</h1>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://img1.wsimg.com/isteam/ip/67ab67ce-c960-462a-af80-096829e33a41/03beadca2d5daa7d713d4dcfd9cdfc6319f09e7a.jpg/:/cr=t:2.83%25,l:2.83%25,w:94.34%25,h:94.34%25"
          alt="De Fabiano showroom, Sukhumvit Road"
          className="aspect-[4/5] w-full rounded-sm object-cover"
        />
        <div>
          {about.body.map((p, i) => (
            <p key={i} className="mb-4 text-sm leading-relaxed text-gray">
              {p}
            </p>
          ))}
          <div className="mt-6 border-t border-line pt-4">
            <div className="font-mono text-xs uppercase tracking-widest text-gray">Visit Us</div>
            <div className="mt-1 text-sm text-ink">{about.address}</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-widest text-brass">
              {about.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {siteContent.faq.map((item) => (
            <details key={item.q} className="rounded-sm border border-line p-4">
              <summary className="cursor-pointer font-display text-sm font-medium text-ink">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-gray">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
