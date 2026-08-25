"use client";

import { useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import siteContent from "@/content/site-content.json";

export default function ContactClient() {
  const { contact } = siteContent;
  const waLink = `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Eyebrow>Get in Touch & Book Your Tailoring Experience</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
        Planning a custom suit during your visit to Bangkok?
      </h1>
      <p className="mt-3 max-w-xl text-sm text-gray">
        Whether you&apos;d like to book a consultation, ask about fabrics and styles, or simply
        learn more about our tailoring process, we&apos;re here to help.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-sm border border-brass bg-brass/5 px-4 py-3 text-sm shadow-sm transition-colors hover:bg-brass/10"
        >
          <span>
            <span className="block font-medium text-ink">Consult with Our Tailoring Specialist</span>
            <span className="block text-xs text-gray">Usually responds within minutes</span>
          </span>
        </a>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdkbzazhAe7-kjfV514nzYgBcHveDhm6UCk2-Q3zRwTvQsy8Q/viewform?usp=header"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-sm border border-line bg-white px-4 py-3 text-sm shadow-sm transition-colors hover:border-brass"
        >
          <span>
            <span className="block font-medium text-ink">Send Your Own Measurements</span>
            <span className="block text-xs text-gray">For a more precise fit</span>
          </span>
        </a>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-gray">Reach Us Directly</div>
          <div className="mt-4 space-y-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-sm border border-line bg-white px-4 py-3 text-sm shadow-sm transition-colors hover:border-brass"
            >
              <span>WhatsApp, usually responds within minutes</span>
              <span className="font-mono text-xs text-gray">{contact.whatsapp}</span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center justify-between rounded-sm border border-line bg-white px-4 py-3 text-sm shadow-sm transition-colors hover:border-brass"
            >
              <span>Email</span>
              <span className="font-mono text-xs text-gray">{contact.email}</span>
            </a>
            <a
              href={`https://facebook.com/${contact.facebook.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-sm border border-line bg-white px-4 py-3 text-sm shadow-sm transition-colors hover:border-brass"
            >
              <span>Facebook</span>
              <span className="font-mono text-xs text-gray">{contact.facebook}</span>
            </a>
            <a
              href={`https://instagram.com/${contact.instagram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-sm border border-line bg-white px-4 py-3 text-sm shadow-sm transition-colors hover:border-brass"
            >
              <span>Instagram</span>
              <span className="font-mono text-xs text-gray">{contact.instagram}</span>
            </a>
          </div>
          <div className="mt-6 border-t border-line pt-4">
            <div className="font-mono text-xs uppercase tracking-widest text-gray">Studio Address</div>
            <p className="mt-1 text-sm text-ink">{contact.address}</p>
            <div className="mt-3 font-mono text-xs uppercase tracking-widest text-gray">Hours</div>
            <p className="mt-1 text-sm text-ink">{contact.hours}</p>
          </div>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-gray">Or Send a Message</div>
          {submitted ? (
            <p className="mt-4 text-sm text-gray">Thanks, we&apos;ll get back to you shortly.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-sm border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brass"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-sm border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brass"
              />
              <textarea
                required
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-sm border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brass"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-ink py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-brass disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
