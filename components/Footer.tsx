import Link from "next/link";
import siteContent from "@/content/site-content.json";

const { contact } = siteContent;

export default function Footer() {
  const waLink = `https://wa.me/66851124295`;

  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="font-display text-lg font-bold">DE FABIANO</div>
          <p className="mt-3 text-sm text-white/70">
            Bespoke tailoring on Sukhumvit Road, Bangkok. Since 2006.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-white/50">
            {contact.address}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-white/50">
            Mon–Sat 09:00–21:00 · Sun 01:00–17:00
          </p>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-brass-light">Shop</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><Link href="/shop?category=men" className="hover:text-brass-light">Men</Link></li>
            <li><Link href="/shop?category=women" className="hover:text-brass-light">Women</Link></li>
            <li><Link href="/shop?category=children" className="hover:text-brass-light">Children</Link></li>
            <li><Link href="/shop?category=accessories" className="hover:text-brass-light">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-brass-light">Visit</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><Link href="/appointment" className="hover:text-brass-light">Book a Fitting</Link></li>
            <li><Link href="/measurements" className="hover:text-brass-light">Get Measured</Link></li>
            <li><Link href="/our-store" className="hover:text-brass-light">Our Store</Link></li>
            <li><Link href="/service" className="hover:text-brass-light">Service</Link></li>
            <li><Link href="/fabric-gallery" className="hover:text-brass-light">Fabric Gallery</Link></li>
            <li><Link href="/how-we-work" className="hover:text-brass-light">How We Work</Link></li>
            <li><Link href="/blog" className="hover:text-brass-light">Journal</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-brass-light">Reach Us</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><a href={waLink} target="_blank" rel="noreferrer" className="hover:text-brass-light">WhatsApp: +66 85 112 4295</a></li>
            <li><a href="mailto:sam@defabiano.com" className="hover:text-brass-light">sam@defabiano.com</a></li>
            <li><a href={`https://facebook.com/${contact.facebook.replace("@", "")}`} target="_blank" rel="noreferrer" className="hover:text-brass-light">Facebook</a></li>
            <li><a href={`https://instagram.com/${contact.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" className="hover:text-brass-light">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            © 2025 De Fabiano · Bespoke Suit and Shirt Makers, All Rights Reserved
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <Link href="/how-we-work" className="hover:text-brass-light">How We Work</Link>
            <Link href="/terms" className="hover:text-brass-light">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-brass-light">Privacy Policy</Link>
            <Link href="/shipping-returns" className="hover:text-brass-light">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
