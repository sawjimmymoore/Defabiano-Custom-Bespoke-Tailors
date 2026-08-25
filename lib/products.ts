import productsData from "@/content/products.json";
import type { Product, ProductCategory } from "./types";

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory | "all"): Product[] {
  const all = getAllProducts();
  if (category === "all") return all;
  return all.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function getBestsellers(): Product[] {
  return getAllProducts().filter((p) => p.bestseller);
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  men: "Men",
  women: "Women",
  children: "Children",
  accessories: "Accessories",
};
