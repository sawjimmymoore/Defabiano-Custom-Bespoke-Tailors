"use client";

import { useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import AppointmentCalendar from "@/components/AppointmentCalendar";

const PURPOSES = [
  "New commission and measurement session",
  "Fitting for existing order",
  "Alteration assessment",
  "General consultation",
];

type Step = "datetime" | "details" | "done";

export default function AppointmentClient() {
  const [step, setStep] = useState<Step>("datetime");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: PURPOSES[0],
    notes: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          preferredDate: dateTime.date,
          preferredTime: dateTime.time,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStep("done");
    } catch {
      setError("Couldn't book your appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const prettyDate = dateTime.date
    ? new Date(dateTime.date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  if (step === "done") {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-brass/10 text-brass">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink">Appointment Requested</h1>
        <p className="mt-4 text-sm text-gray">
          Thanks, {form.name.split(" ")[0]}. You&apos;re booked for {prettyDate} at {dateTime.time} on
          Sukhumvit Road. De Fabiano will confirm by phone or email shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Book a Fitting</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Make an Appointment</h1>
      <p className="mt-3 text-sm text-gray">
        In-store at 762/12 Sukhumvit Road, Khlong Tan, Khlong Toei, Bangkok. Bring reference outfits
        if you have a specific look in mind.
      </p>

      <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gray">
        <span className={step === "datetime" ? "text-brass" : "text-ink"}>1. Date &amp; Time</span>
        <span className="h-px flex-1 bg-line" />
        <span className={step === "details" ? "text-brass" : ""}>2. Your Details</span>
      </div>

      {step === "datetime" && (
        <div className="mt-6">
          <AppointmentCalendar value={dateTime} onChange={setDateTime} />
          {dateTime.date && dateTime.time && (
            <button
              type="button"
              onClick={() => setStep("details")}
              className="mt-6 w-full rounded-sm bg-ink py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:bg-brass"
            >
              Continue with {prettyDate} at {dateTime.time}
            </button>
          )}
        </div>
      )}

      {step === "details" && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <button
            type="button"
            onClick={() => setStep("datetime")}
            className="font-mono text-xs uppercase tracking-widest text-gray hover:text-brass"
          >
            &#8249; Change date or time
          </button>
          <div className="rounded-sm border border-line bg-paper-2 px-4 py-3 text-sm text-ink">
            {prettyDate} at {dateTime.time}
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-brass"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-gray">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-brass"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-gray">Phone</label>
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-brass"
              />
            </div>
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray">Purpose</label>
            <select
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              className="mt-1 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-brass"
            >
              {PURPOSES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="mt-1 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-brass"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-sm bg-ink py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:bg-brass disabled:opacity-50"
          >
            {submitting ? "Booking…" : "Confirm Appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
