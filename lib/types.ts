export type ProductCategory = "men" | "women" | "children" | "accessories";

export interface ProductVariant {
  id: string;
  label: string; // e.g. "Navy Wool", "Charcoal Herringbone"
  swatchColor: string; // hex, used for the swatch dot
  priceModifier: number; // added to base price
  image?: string; // real product photo path, if photographed, falls back to procedural placeholder if absent
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  basePrice: number; // THB
  currency: "THB";
  description: string;
  details: string[];
  turnaround: string;
  images: string[]; // used as the 360 spin frame set (placeholder set, real photos to replace)
  variants: ProductVariant[];
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CartLine {
  slug: string;
  name: string;
  variantId: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
}
