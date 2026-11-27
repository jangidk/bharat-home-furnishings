import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { categories, products } from "@/lib/products";
import { resolveCatalogImage, toStorefrontProduct } from "@/lib/catalog";

const migration = readFileSync("drizzle/migrations/0000_create_storefront_catalog.sql", "utf8");
const imageNames: Record<string, string> = {
  "wall-shelves": "wall-shelf.jpg", "floating-shelves": "floating-shelf.jpg",
  "key-holders": "key-holder.jpg", "wall-decor": "wall-decor.jpg",
  "mdf-furniture": "mdf-furniture.jpg", "home-organization": "organization.jpg",
};
const literal = (value: string) => `'${value.replaceAll("'", "''")}'`;

describe("Existing catalog preservation", () => {
  it("imports exactly 12 existing products and six categories", () => {
    expect(products).toHaveLength(12);
    expect(categories).toHaveLength(6);
    expect((migration.match(/ON CONFLICT \(slug\) DO NOTHING/g) || []).length).toBe(2);
    expect(migration).not.toMatch(/\b(?:DELETE|TRUNCATE|UPDATE)\b/i);
  });
  for (const [index, product] of products.entries()) {
    it(`preserves every catalog value and image for ${product.slug}`, () => {
      const image = imageNames[product.category];
      if (!image) throw new Error("Missing category image");
      const tags = product.tags.length ? `ARRAY[${product.tags.map(literal).join(",")}]` : "ARRAY[]::text[]";
      const values = [product.slug, product.name, product.category].map(literal)
        .concat([String(product.price), String(product.mrp), literal(image)])
        .concat([product.description, product.dimensions, product.material].map(literal))
        .concat([tags, String(index)]).join(",");
      expect(migration).toContain(`(${values})`);
      expect(toStorefrontProduct({ ...product, image })).toEqual(product);
    });
  }
  for (const [index, category] of categories.entries()) {
    it(`preserves category ${category.slug}`, () => {
      const image = imageNames[category.slug];
      if (!image) throw new Error("Missing category image");
      expect(migration).toContain(`(${[category.slug, category.name, image, category.blurb].map(literal).join(",")},${index})`);
      expect(resolveCatalogImage(image)).toBe(category.image);
    });
  }
});