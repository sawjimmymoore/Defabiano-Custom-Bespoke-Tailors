"use client";

import { useEffect, useState } from "react";
import { useAccount } from "@/lib/account-context";
import { useSavedItems } from "@/lib/saved-items-context";
import { getAllProducts } from "@/lib/products";
import Eyebrow from "@/components/Eyebrow";
import ProductCard from "@/components/ProductCard";

interface OrderRecord {
  id: string;
  createdAt: string;
  customer: { name: string; email: string };
  lines: { name: string; variantLabel: string; unitPrice: number; quantity: number }[];
  subtotal: number;
  status: string;
}

function formatTHB(n: number) {
  return `฿${n.toLocaleString("en-US")}`;
}

export default function AccountClient() {
  const { currentUser, signUp, logIn, logOut } = useAccount();
  const { savedSlugs } = useSavedItems();
  const savedProducts = getAllProducts().filter((p) => savedSlugs.includes(p.slug));
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        const mine = (data.orders as OrderRecord[]).filter(
          (o) => o.customer.email.toLowerCase() === currentUser.email.toLowerCase()
        );
        setOrders(mine.reverse());
      })
      .catch(() => setOrders([]));
  }, [currentUser]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result =
      mode === "signup"
        ? signUp(form.name, form.email, form.password)
        : logIn(form.email, form.password);
    if (!result.ok) setError(result.error ?? "Something went wrong.");
  }

  if (currentUser) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Eyebrow>My Account</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
          Welcome back, {currentUser.name.split(" ")[0]}
        </h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gray">
          {currentUser.email}
        </p>

        <button
          onClick={logOut}
          className="mt-4 rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-brass"
        >
          Log Out
        </button>

        <div className="mt-10 border-t border-line pt-6">
          <h2 className="font-display text-lg font-semibold text-ink">Order History</h2>
          {orders.length === 0 ? (
            <p className="mt-3 text-sm text-gray">
              No commissions placed yet under this account, {" "}
              <a href="/shop" className="underline hover:text-brass">
                browse the shop
              </a>
              .
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="rounded-sm border border-line p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-brass">
                      {o.status}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {o.lines.map((l, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>
                          {l.name} ({l.variantLabel}) × {l.quantity}
                        </span>
                        <span className="font-mono">{formatTHB(l.unitPrice * l.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 border-t border-line pt-2 text-right font-mono text-sm">
                    Total: {formatTHB(o.subtotal)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            Saved Items ({savedProducts.length})
          </h2>
          {savedProducts.length === 0 ? (
            <p className="mt-3 text-sm text-gray">
              Nothing saved yet. Tap the heart icon on any product to save it here.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {savedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      {savedProducts.length > 0 && (
        <div className="mb-12 border-b border-line pb-10">
          <Eyebrow>Saved Items</Eyebrow>
          <h2 className="mt-3 font-display text-xl font-semibold text-ink">
            {savedProducts.length} Item{savedProducts.length !== 1 ? "s" : ""} Saved
          </h2>
          <p className="mt-1 text-sm text-gray">
            Saved on this device. Log in or create an account to keep them permanently.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {savedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}

      <Eyebrow>Account</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        {mode === "login" ? "Log In" : "Create Account"}
      </h1>
      <p className="mt-2 text-sm text-gray">
        {mode === "login"
          ? "Log in to view your commission history."
          : "Create an account to track your commissions, or checkout as a guest, no account required."}
      </p>

      <div className="mt-6 flex gap-1 rounded-full border border-line bg-paper-2 p-1">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
            mode === "login" ? "bg-white text-ink shadow-sm" : "text-gray"
          }`}
        >
          Log In
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
            mode === "signup" ? "bg-white text-ink shadow-sm" : "text-gray"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-gray">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-sm border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brass"
            />
          </div>
        )}
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-gray">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-sm border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brass"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-gray">Password</label>
          <input
            required
            type="password"
            minLength={4}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full rounded-sm border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brass"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-full bg-ink py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-brass"
        >
          {mode === "login" ? "Log In" : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-gray">
        Demo account system, stored locally on this device. Not a real server.
      </p>
    </div>
  );
}
