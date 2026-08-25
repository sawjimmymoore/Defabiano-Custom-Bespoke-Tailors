import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import posts from "@/content/blog-posts.json";

const BASE = "https://defabiano.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/service",
    "/our-store",
    "/about",
    "/fabric-gallery",
    "/appointment",
    "/measurements",
    "/blog",
    "/contact",
    "/how-we-work",
    "/terms",
    "/privacy",
    "/shipping-returns",
    "/account",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
