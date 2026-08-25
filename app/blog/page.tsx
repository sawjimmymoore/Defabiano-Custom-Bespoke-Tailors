import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "Tailoring insights, care guides, and behind-the-scenes from De Fabiano Bangkok.",
};

import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import PlaceholderVisual from "@/components/PlaceholderVisual";
import posts from "@/content/blog-posts.json";

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Eyebrow>Tailoring Insights</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">Journal</h1>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-sm border border-line"
          >
            <PlaceholderVisual color="#3A3A3A" className="aspect-[4/3]" angle={60} showBadge={false} />
            <div className="p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-gray">
                {post.category} · {post.readTime}
              </div>
              <div className="mt-2 font-display text-base font-medium text-ink group-hover:text-brass">
                {post.title}
              </div>
              <p className="mt-2 text-sm text-gray">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
