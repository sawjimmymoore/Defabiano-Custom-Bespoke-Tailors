import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Commission Received</h1>
      <p className="mt-4 text-sm text-gray">
        Thank you, your order has been recorded. De Fabiano will reach out to confirm your fitting
        appointment and deposit details before production begins.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-sm bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper hover:bg-brass"
      >
        Continue Browsing
      </Link>
    </div>
  );
}
