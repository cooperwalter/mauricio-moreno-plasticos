"use client";

import { useState } from "react";
import { Categories } from "./categories";
import { Catalog } from "./catalog";
import type { Category, CategoryId, Product } from "@/lib/types";

type Props = {
  categories: Category[];
  products: Product[];
};

export function CatalogShelf({ categories, products }: Props) {
  const [category, setCategory] = useState<CategoryId | "all">("all");

  return (
    <>
      <Categories categories={categories} onSelect={setCategory} />
      <Catalog
        products={products}
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
      />
    </>
  );
}
