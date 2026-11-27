import { queryOptions } from "@tanstack/react-query";
import wallShelf from "@/assets/wall-shelf.jpg";
import floatingShelf from "@/assets/floating-shelf.jpg";
import keyHolder from "@/assets/key-holder.jpg";
import wallDecor from "@/assets/wall-decor.jpg";
import mdf from "@/assets/mdf-furniture.jpg";
import organization from "@/assets/organization.jpg";
import type { Product } from "./products";
import { getCatalog } from "./catalog.functions";

const catalogImages: Record<string, string> = {
  "wall-shelf.jpg": wallShelf,
  "floating-shelf.jpg": floatingShelf,
  "key-holder.jpg": keyHolder,
  "wall-decor.jpg": wallDecor,
  "mdf-furniture.jpg": mdf,
  "organization.jpg": organization,
};

export function resolveCatalogImage(image: string): string {
  const bundled = catalogImages[image];
  if (bundled) return bundled;
  if (image.startsWith("https://")) return image;
  throw new Error("A product image is unavailable.");
}

type CatalogProduct = Omit<Product, "tags"> & { tags: string[] };
export function toStorefrontProduct(row: CatalogProduct): Product {
  return {
    ...row,
    image: resolveCatalogImage(row.image),
    tags: row.tags.filter((tag): tag is Product["tags"][number] => tag === "featured" || tag === "bestseller" || tag === "new"),
  };
}

export const catalogQueryOptions = queryOptions({
  queryKey: ["storefront", "catalog"],
  queryFn: async () => {
    const catalog = await getCatalog();
    return {
      products: catalog.products.map(toStorefrontProduct),
      categories: catalog.categories.map((row) => ({ ...row, image: resolveCatalogImage(row.image) })),
    };
  },
  staleTime: 60_000,
});