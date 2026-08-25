import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import posts from "@/content/blog-posts.json";
import PlaceholderVisual from "@/components/PlaceholderVisual";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/blog" className="font-mono text-xs uppercase tracking-widest text-gray hover:text-ink">
        ← Journal
      </Link>
      <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-gray">
        {post.category} · {post.readTime} · {post.date}
      </div>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">{post.title}</h1>
      <PlaceholderVisual color="#3A3A3A" className="mt-6 aspect-[16/9] rounded-sm" angle={30} showBadge={false} />
      <div className="mt-8 space-y-4">
        {post.content.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-gray">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
