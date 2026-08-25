import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import HeroSection from "@/components/HeroSection";
import SuitDetailsScrollSection from "@/components/SuitDetailsScrollSection";
import MagneticCarousel, { type MagneticItem } from "@/components/MagneticCarousel";
import StackedDeck from "@/components/StackedDeck";
import MissionStatsBand from "@/components/MissionStatsBand";
import ProductCard from "@/components/ProductCard";
import LinkPreviewHover from "@/components/LinkPreviewHover";
import { getFeaturedProducts, getBestsellers, getAllProducts } from "@/lib/products";
import siteContent from "@/content/site-content.json";
import blogPosts from "@/content/blog-posts.json";

const CATEGORY_ITEMS: MagneticItem[] = [
  {
    label: "Men",
    sublabel: "Suits · Shirts · Formal",
    color: "#1F2937",
    href: "/shop?category=men",
    image: "/products/01_Navy_Suit_On_Model.jpg",
  },
  {
    label: "Women",
    sublabel: "Suits · Gowns",
    color: "#1F2937",
    href: "/shop?category=women",
    image: "/products/21_Womens_Navy_Tailored_Suit.jpg",
  },
  {
    label: "Children",
    sublabel: "Formalwear",
    color: "#1F2937",
    href: "/shop?category=children",
    image: "/products/31_Boys_Navy_Suit.jpg",
  },
  {
    label: "Accessories",
    sublabel: "Ties · Bow Ties",
    color: "#1B2740",
    href: "/shop?category=accessories",
    image: "/products/51_Navy_Silk_Tie.jpg",
  },
];

const PROCESS_STATS = [
  { value: "07", label: "Steps, Start to Finish" },
  { value: "1", label: "Uniquely Drafted Pattern" },
  { value: "2+", label: "Fittings, Typically" },
  { value: "50%", label: "Deposit to Begin" },
];

export default function Home() {
  const { hero, stats } = siteContent;
  const featured = getFeaturedProducts();
  const bestsellers = getBestsellers();
  const lookbookProducts = getAllProducts().slice(0, 6);

  return (
    <div>
      <HeroSection hero={hero} stats={stats} />

      <SuitDetailsScrollSection />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Eyebrow>Shop by Category</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Move Your Cursor Across
        </h2>
        <div className="mt-10 overflow-x-auto">
          <MagneticCarousel items={CATEGORY_ITEMS} />
        </div>
      </section>

      {/* Stacked-deck lookbook, TERRAIN-style overlapping card fan */}
      <section className="border-y border-line bg-paper-2/60 backdrop-blur-sm px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <Eyebrow>The Collection</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Browse the Fan
            </h2>
            <p className="mt-2 text-sm text-gray">Click a card, or use the arrows.</p>
          </div>
          <StackedDeck products={lookbookProducts} />
        </div>
      </section>

      {/* Dark process/mission band, TERRAIN scorecard pattern */}
      <MissionStatsBand
        eyebrow="How We Work"
        headline="Seven Deliberate Steps. Every Garment."
        body="From first consultation to final fitting, nothing is assumed. Every client gets a uniquely drafted pattern, not an adjusted house block."
        stats={PROCESS_STATS}
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <Eyebrow>Featured</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              This Season&apos;s Commissions
            </h2>
          </div>
          <Link href="/shop" className="font-mono text-xs uppercase tracking-widest text-gray hover:text-brass">
            View All Products →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper-2/60 backdrop-blur-sm px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Bestsellers</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            What Clients Book First
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <Eyebrow>From the Journal</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Recent Reading</h2>
        <p className="mt-4 text-sm text-gray">
          Hover a title to preview, {" "}
          {blogPosts.map((p, i) => (
            <span key={p.slug}>
              <LinkPreviewHover
                href={`/blog/${p.slug}`}
                label={p.title}
                previewColor={i % 2 === 0 ? "#2F5CFF" : "#1F2937"}
                previewLabel={p.category}
              />
              {i < blogPosts.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Ready for Your Fitting?
        </h2>
        <p className="mt-3 text-sm text-gray">
          Book a measurement session on Sukhumvit Road, or shop ready-to-commission pieces online.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/appointment"
            className="rounded-full bg-ink px-7 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-brass"
          >
            Book a Fitting
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-line px-7 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-brass"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
