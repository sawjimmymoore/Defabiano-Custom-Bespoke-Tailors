import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Store",
  description: "Visit the De Fabiano showroom on Sukhumvit Road, Bangkok, hours, directions, and what to expect.",
};

const WHY_VISIT = [
  { title: "Craftsmanship You Can Feel", body: "Discover the quality of our tailoring up close. Our showroom showcases the meticulous details that make each De Fabiano garment stand out." },
  { title: "Perfect Fit, Every Time", body: "Get a flawless fit with personalized fittings. Our tailors ensure your clothing looks great and feels comfortable." },
  { title: "Personalized Journey", body: "Each visit is tailored to you, offering a unique and memorable experience that reflects your style." },
];

const HOURS = [
  { day: "Monday", hours: "09:00 – 21:00" },
  { day: "Tuesday", hours: "09:00 – 21:00" },
  { day: "Wednesday", hours: "09:00 – 21:00" },
  { day: "Thursday", hours: "09:00 – 21:00" },
  { day: "Friday", hours: "09:00 – 21:00" },
  { day: "Saturday", hours: "09:00 – 21:00" },
  { day: "Sunday", hours: "01:00 – 17:00" },
];

export default function OurStorePage() {
  return (
    <div>
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://img1.wsimg.com/isteam/ip/67ab67ce-c960-462a-af80-096829e33a41/03beadca2d5daa7d713d4dcfd9cdfc6319f09e7a.jpg/:/cr=t:2.83%25,l:2.83%25,w:94.34%25,h:94.34%25"
          alt="De Fabiano showroom"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>De Fabiano</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              A Space Where Style and Craftsmanship Converge
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <p className="max-w-2xl text-sm text-gray">
            Visit De Fabiano&apos;s showroom to experience bespoke tailoring in a refined setting.
            Discover premium fabrics, enjoy personalized service, and see your style come to life.
          </p>
          <Link
            href="/appointment"
            className="mt-6 inline-block rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-white hover:bg-brass"
          >
            Book Appointment
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {WHY_VISIT.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="rounded-sm border border-line bg-white p-5 shadow-sm">
                <h2 className="font-display text-base font-semibold text-ink">{w.title}</h2>
                <p className="mt-2 text-sm text-gray">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-xl font-semibold text-ink">How to Get to Our Store</h2>
            <div className="mt-4 space-y-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-brass">By BTS (Skytrain)</div>
                <p className="mt-1 text-sm text-gray">
                  Take the BTS to Thonglor Station. From there, it&apos;s a 250-meter walk to our
                  shop. Exit the station, head towards Sukhumvit Soi 32, and you&apos;ll find us at
                  the corner of Soi 32.
                </p>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-brass">By Car or Taxi</div>
                <p className="mt-1 text-sm text-gray">
                  762/12 Sukhumvit Road, Sukhumvit Soi 32, Khlong Tan, Khlong Toei, Bangkok 10110,
                  Thailand.
                </p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/iPQTVCLTuSbR4MBC6"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-brass underline"
            >
              Get Directions →
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-xl font-semibold text-ink">Hours</h2>
            <div className="mt-4 overflow-hidden rounded-sm border border-line">
              {HOURS.map((h, i) => (
                <div
                  key={h.day}
                  className={`flex justify-between px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-white" : "bg-paper-2"}`}
                >
                  <span className="text-ink">{h.day}</span>
                  <span className="font-mono text-gray">{h.hours}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
