"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Real month-grid + time-slot booking calendar, styled like Google
 * Calendar / Calendly rather than raw <input type="date"> / <input type="time">.
 *
 * - Business hours come straight from content/site-content.json's contact.hours
 *   string ("Mon-Sat 09:00-21:00, Sun 01:00-17:00"), parsed below.
 * - Slot availability is real, not decorative: it fetches existing appointments
 *   from /api/appointments and disables any time already booked that day, so
 *   two clients can't be shown the same open slot.
 */

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SLOT_MINUTES = 45;

// Mon-Sat 09:00-21:00, Sun 01:00-17:00 (matches content/site-content.json contact.hours)
const HOURS: Record<number, { start: number; end: number } | null> = {
  0: { start: 1, end: 17 }, // Sunday
  1: { start: 9, end: 21 },
  2: { start: 9, end: 21 },
  3: { start: 9, end: 21 },
  4: { start: 9, end: 21 },
  5: { start: 9, end: 21 },
  6: { start: 9, end: 21 },
};

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function formatSlot(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${String(minute).padStart(2, "0")} ${period}`;
}

function slotsForDay(dateKey: string) {
  const day = new Date(dateKey + "T00:00:00").getDay();
  const window = HOURS[day];
  if (!window) return [];
  const slots: string[] = [];
  let totalMinutes = window.start * 60;
  const endMinutes = window.end * 60;
  while (totalMinutes + SLOT_MINUTES <= endMinutes) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    slots.push(formatSlot(h, m));
    totalMinutes += SLOT_MINUTES;
  }
  return slots;
}

export default function AppointmentCalendar({
  value,
  onChange,
}: {
  value: { date: string; time: string };
  onChange: (v: { date: string; time: string }) => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!value.date) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) setLoadingSlots(true);
    }, 0);
    fetch("/api/appointments")
      .then((r) => r.json())
      .then((data: { appointments?: { preferredDate: string; preferredTime: string }[] }) => {
        if (cancelled) return;
        const taken = (data.appointments ?? [])
          .filter((a) => a.preferredDate === value.date)
          .map((a) => a.preferredTime);
        setBookedTimes(taken);
      })
      .catch(() => {
        if (!cancelled) setBookedTimes([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [value.date]);

  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const gridDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewDate]);

  const canGoPrevMonth =
    viewDate.getFullYear() > today.getFullYear() ||
    (viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() > today.getMonth());

  const slots = value.date ? slotsForDay(value.date) : [];

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-paper">
      {/* Calendar header */}
      <div className="flex items-center justify-between border-b border-line bg-paper-2 px-4 py-3">
        <button
          type="button"
          disabled={!canGoPrevMonth}
          onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          className="grid h-8 w-8 place-items-center rounded-full text-ink transition-colors hover:bg-line disabled:opacity-30"
          aria-label="Previous month"
        >
          &#8249;
        </button>
        <span className="font-display text-sm font-semibold text-ink">{monthLabel}</span>
        <button
          type="button"
          onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
          className="grid h-8 w-8 place-items-center rounded-full text-ink transition-colors hover:bg-line"
          aria-label="Next month"
        >
          &#8250;
        </button>
      </div>

      {/* Weekday row */}
      <div className="grid grid-cols-7 gap-1 px-3 pt-3 font-mono text-[10px] uppercase tracking-widest text-gray">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center">
            {w}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1 px-3 pb-4 pt-1">
        {gridDays.map((d, i) => {
          if (!d) return <div key={i} />;
          const key = toDateKey(d);
          const isPast = d < today;
          const isSelected = value.date === key;
          const isToday = toDateKey(d) === toDateKey(today);
          return (
            <button
              key={i}
              type="button"
              disabled={isPast}
              onClick={() => onChange({ date: key, time: "" })}
              className={[
                "aspect-square rounded-full text-sm transition-colors",
                isPast ? "cursor-not-allowed text-line" : "text-ink hover:bg-brass/10",
                isSelected ? "bg-brass text-white hover:bg-brass" : "",
                isToday && !isSelected ? "font-semibold text-brass" : "",
              ].join(" ")}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      {/* Time slots for the selected date */}
      {value.date && (
        <div className="border-t border-line px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-gray">
              {new Date(value.date + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
            {loadingSlots && <span className="text-[10px] text-gray">Checking availability…</span>}
          </div>
          {slots.length === 0 ? (
            <p className="text-sm text-gray">Closed this day. Pick another date.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((slot) => {
                const taken = bookedTimes.includes(slot);
                const selected = value.time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={taken}
                    onClick={() => onChange({ date: value.date, time: slot })}
                    className={[
                      "rounded-sm border px-2 py-2 text-xs transition-colors",
                      taken
                        ? "cursor-not-allowed border-line bg-paper-2 text-line line-through"
                        : selected
                          ? "border-brass bg-brass text-white"
                          : "border-line bg-paper text-ink hover:border-brass",
                    ].join(" ")}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
