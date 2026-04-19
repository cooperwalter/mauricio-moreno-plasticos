import { client, urlForImage } from "./client";
import {
  FALLBACK_CATEGORIES,
  FALLBACK_PRODUCTS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_ZONES,
} from "@/lib/fallback-catalog";
import type {
  Category,
  CategoryId,
  Product,
  Testimonial,
  Zone,
} from "@/lib/types";

const LOCAL_PHOTO_BY_SKU = new Map(
  FALLBACK_PRODUCTS.filter((p) => p.photo).map((p) => [p.sku, p.photo as string]),
);

type RawCategory = {
  id: string;
  name: string;
  icon?: string;
  desc?: string;
  order?: number;
};

type RawProductPhoto = {
  asset?: { _ref?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

type RawProduct = {
  _id: string;
  name: string;
  sku: string;
  categoryId: string;
  price: number;
  unit: string;
  stock?: string;
  badge?: string;
  specs: string[];
  colors?: string[];
  photo?: RawProductPhoto;
  order?: number;
};

type RawZone = {
  name: string;
  speed: string;
  cost: string;
  areas?: string[];
  color?: string;
  order?: number;
};

type RawTestimonial = {
  _id: string;
  name: string;
  trade?: string;
  text: string;
  order?: number;
};

const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc, name asc) {
  "id": id, name, icon, desc, order
}`;

const PRODUCTS_QUERY = `*[_type == "product"] | order(order asc, name asc) {
  _id, name, sku,
  "categoryId": category->id,
  price, unit, stock, badge, specs, colors,
  photo { asset, hotspot, crop },
  order
}`;

const ZONES_QUERY = `*[_type == "zone"] | order(order asc, name asc) {
  name, speed, cost, areas, color, order
}`;

const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc, name asc) {
  _id, name, trade, text, order
}`;

export async function getCategories(): Promise<Category[]> {
  if (!client) return FALLBACK_CATEGORIES;
  try {
    const raw = await client.fetch<RawCategory[]>(CATEGORIES_QUERY);
    if (!raw || raw.length === 0) return FALLBACK_CATEGORIES;
    return raw.map((c) => ({
      id: c.id as CategoryId,
      name: c.name,
      icon: c.icon ?? "●",
      desc: c.desc ?? "",
    }));
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!client) return FALLBACK_PRODUCTS;
  try {
    const raw = await client.fetch<RawProduct[]>(PRODUCTS_QUERY);
    if (!raw || raw.length === 0) return FALLBACK_PRODUCTS;
    return raw.map((p) => ({
      id: p._id,
      cat: p.categoryId as CategoryId,
      name: p.name,
      sku: p.sku,
      price: p.price,
      unit: p.unit,
      stock: p.stock ?? "en bodega",
      badge: p.badge,
      specs: p.specs ?? [],
      colors: p.colors ?? ["Surtido"],
      photo:
        (p.photo ? urlForImage(p.photo) ?? undefined : undefined) ??
        LOCAL_PHOTO_BY_SKU.get(p.sku),
    }));
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function getZones(): Promise<Zone[]> {
  if (!client) return FALLBACK_ZONES;
  try {
    const raw = await client.fetch<RawZone[]>(ZONES_QUERY);
    if (!raw || raw.length === 0) return FALLBACK_ZONES;
    return raw.map((z) => ({
      name: z.name,
      speed: z.speed,
      cost: z.cost,
      areas: z.areas ?? [],
      color: z.color ?? "#6a5438",
    }));
  } catch {
    return FALLBACK_ZONES;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!client) return FALLBACK_TESTIMONIALS;
  try {
    const raw = await client.fetch<RawTestimonial[]>(TESTIMONIALS_QUERY);
    if (!raw || raw.length === 0) return FALLBACK_TESTIMONIALS;
    return raw.map((t) => ({
      id: t._id,
      name: t.name,
      trade: t.trade ?? "",
      text: t.text,
    }));
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

