import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, MessageCircle, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { formatINR, getCategory, getProduct, products, whatsappLink } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — Bharat Furniture` : "Product unavailable — Bharat Furniture";
    const description = p ? p.description : "This product could not be found.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl text-primary">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block font-semibold text-accent">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const navigate = useNavigate();
  const cat = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug)
    .concat(products.filter((p) => p.category !== product.category)).slice(0, 4);

  return (
    <div className="container-page mt-10">
      <nav className="text-sm text-muted-foreground">
        <Link to="/shop" className="hover:text-primary">Shop</Link> / {cat && <Link to="/shop" search={{ category: cat.slug }} className="hover:text-primary">{cat.name}</Link>} / <span className="text-foreground">{product.name}</span>
      </nav>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <img src={product.image} alt={product.name} width={1024} height={1024} className="aspect-square w-full rounded-lg object-cover" />
        <div>
          <p className="eyebrow">{cat?.name}</p>
          <h1 className="mt-2 text-4xl text-primary md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">{formatINR(product.price)}</span>
            <span className="text-muted-foreground line-through">{formatINR(product.mrp)}</span>
            <span className="text-sm font-bold text-accent">Save {formatINR(product.mrp - product.price)}</span>
          </div>
          <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
          <p className="mt-6 leading-relaxed text-foreground/85">{product.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-secondary p-5 text-sm">
            <div><dt className="text-muted-foreground">Dimensions</dt><dd className="mt-1 font-semibold">{product.dimensions}</dd></div>
            <div><dt className="text-muted-foreground">Material</dt><dd className="mt-1 font-semibold">{product.material}</dd></div>
          </dl>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-semibold">Quantity</span>
            <div className="flex items-center rounded-md border border-input">
              <button aria-label="Decrease" className="p-3 hover:bg-muted" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button aria-label="Increase" className="p-3 hover:bg-muted" onClick={() => setQty(Math.min(10, qty + 1))}><Plus className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={() => { add(product.slug, qty); toast.success("Added to cart"); }} className="rounded-md border-2 border-primary py-3.5 font-bold text-primary hover:bg-secondary">Add to Cart</button>
            <button onClick={() => { add(product.slug, qty); navigate({ to: "/checkout" }); }} className="rounded-md bg-primary py-3.5 font-bold text-primary-foreground hover:opacity-90">Buy Now</button>
          </div>
          <a href={whatsappLink(`Hello, I'm interested in "${product.name}" (${formatINR(product.price)}), quantity ${qty}. Please share more details.`)} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-md bg-whatsapp py-3.5 font-bold text-whatsapp-foreground hover:opacity-90">
            <MessageCircle className="h-5 w-5" /> Enquire on WhatsApp
          </a>
          <div className="mt-8 space-y-2 text-sm text-muted-foreground">
            <p className="flex gap-2"><Truck className="h-4 w-4" /> Delivered in 5–8 business days across India</p>
            <p className="flex gap-2"><RotateCcw className="h-4 w-4" /> 7-day returns on damaged or defective items</p>
          </div>
        </div>
      </div>
      <section className="mt-24">
        <h2 className="text-3xl text-primary">You may also like</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">{related.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </section>
    </div>
  );
}
