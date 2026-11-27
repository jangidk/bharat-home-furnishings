import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const getCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("The catalog connection is unavailable.");
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } },
  });
  const [products, categories] = await Promise.all([
    client.from("products").select("slug,name,category,price,mrp,image,description,dimensions,material,tags").order("sort_order").order("slug").range(0, 999),
    client.from("categories").select("slug,name,image,blurb").order("sort_order").order("slug").range(0, 999),
  ]);
  if (products.error || categories.error) {
    console.error("Catalog read failed", products.error?.code, categories.error?.code);
    throw new Error("Products could not be loaded. Please try again.");
  }
  return { products: products.data, categories: categories.data };
});