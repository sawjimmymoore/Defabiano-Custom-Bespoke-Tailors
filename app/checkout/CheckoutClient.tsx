"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useAccount } from "@/lib/account-context";
import Eyebrow from "@/components/Eyebrow";

function formatTHB(n: number) {
  return `฿${n.toLocaleString("en-US")}`;
}

export default function CheckoutClient() {
  const { lines, subtotal, clearCart } = useCart();
  const { currentUser } = useAccount();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: currentUser?.name ?? "",
    email: currentUser?.email ?? "",
    phone: "",
    address: "",
    notes: "",
  });

  const deposit = Math.round(subtotal * 0.5);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (lines.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          lines,
          subtotal,
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      clearCart();
      router.push("/checkout/success");
    } catch {
      setError("Something went wrong placing the order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Eyebrow>Checkout</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Confirm Your Commission</h1>

      <div className="mt-6 rounded-sm border border-line bg-paper-2 px-4 py-3 text-sm text-gray">
        {currentUser ? (
          <>Checking out as <span className="text-ink">{currentUser.name}</span> ({currentUser.email})</>
        ) : (
          <>
            Checking out as a guest, no account needed.{" "}
            <a href="/account" className="underline hover:text-brass">Log in</a> to save this to your order history.
          </>
        )}
      </div>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-brass"
            />
          </div>
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
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray">
              Shipping Address (international only)
            </label>
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="mt-1 w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-brass"
            />
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
            {submitting ? "Placing Order…" : `Reserve Commission, Pay ${formatTHB(deposit)} Deposit`}
          </button>
          <p className="font-mono text-[10px] uppercase tracking-wider text-gray">
            Demo checkout, no real payment is processed. Production build wires this to Omise (Thai
            market) for real deposit collection.
          </p>
        </form>

        <div>
          <div className="rounded-sm border border-line bg-paper-2 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-gray">Order Summary</div>
            <div className="mt-4 space-y-3">
              {lines.map((l) => (
                <div key={`${l.slug}-${l.variantId}`} className="flex justify-between text-sm">
                  <span>
                    {l.name} <span className="text-gray">({l.variantLabel}) × {l.quantity}</span>
                  </span>
                  <span className="font-mono">{formatTHB(l.unitPrice * l.quantity)}</span>
                </div>
              ))}
              {lines.length === 0 && <p className="text-sm text-gray">Your cart is empty.</p>}
            </div>
            <div className="mt-4 space-y-1 border-t border-line pt-4 font-mono text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatTHB(subtotal)}</span>
              </div>
              <div className="flex justify-between text-brass">
                <span>Deposit due now (50%)</span>
                <span>{formatTHB(deposit)}</span>
              </div>
              <div className="flex justify-between text-gray">
                <span>Balance on delivery</span>
                <span>{formatTHB(subtotal - deposit)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
