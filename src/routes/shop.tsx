import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { z } from "zod";
import { catalogQueryOptions } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/shop")({
  validateSearch: z.object({ category: z.string().optional() }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(catalogQueryOptions); },
  head: () => ({ meta: [{ title: "Shop Wooden Furniture & Decor — Bharat Furniture" }, { name: "description", content: "Browse wall shelves, floating shelves, key holders, wall decor, MDF furniture and home organization pieces." }, { property: "og:title", content: "Shop Wooden Furniture & Decor — Bharat Furniture" }, { property: "og:description", content: "Browse wall shelves, floating shelves, key holders, wall decor, MDF furniture and home organization pieces." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Shop,
  errorComponent: ShopError,
  notFoundComponent: () => <div className="container-page py-24 text-center"><h1 className="text-3xl text-primary">Shop not found</h1><Link to="/shop">Back to shop</Link></div>,
});

function ShopError() {
  const router = useRouter();
  const boundary = useQueryErrorResetBoundary();
  return <div className="container-page py-24 text-center" role="alert">
    <h1 className="text-3xl text-primary">Products could not be loaded</h1>
    <p className="mt-4 text-muted-foreground">Please try again in a moment.</p>
    <Button className="mt-6" onClick={() => { boundary.reset(); void router.invalidate(); }}>Try again</Button>
  </div>;
}

function Shop() {
  const { category } = Route.useSearch();
  const { data: { products, categories } } = useSuspenseQuery(catalogQueryOptions);
  const cat = category ? categories.find((c) => c.slug === category) : undefined;
  const list = cat ? products.filter((p) => p.category === cat.slug) : products;
  const pill = "rounded-full border px-4 py-2 text-sm font-semibold transition-colors";
  return (
    <>
      <PageHeader eyebrow="Shop" title={cat ? cat.name : "All Products"}>{cat ? cat.blurb : "Handcrafted pieces for every corner of your home."}</PageHeader>
      <div className="container-page mt-10">
        <div className="flex flex-wrap gap-2">
          <Link to="/shop" search={{}} className={`${pill} ${!cat ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>All</Link>
          {categories.map((c) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} className={`${pill} ${cat?.slug === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{c.name}</Link>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
        {list.length === 0 && <p className="py-16 text-center text-muted-foreground">No products available.</p>}
      </div>
    </>
  );
}
