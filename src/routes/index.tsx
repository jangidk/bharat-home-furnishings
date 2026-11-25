import { createFileRoute, Link } from "@tanstack/react-router";
import { Hammer, Truck, ShieldCheck, Wallet, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Bharat Furniture — Elegant Wooden Furniture from Jaipur" }, { name: "description", content: "Wall shelves, floating shelves, key holders, wall decor and MDF furniture handcrafted in Jaipur. Delivered across India with COD." }, { property: "og:title", content: "Bharat Furniture — Elegant Wooden Furniture from Jaipur" }, { property: "og:description", content: "Wall shelves, floating shelves, key holders, wall decor and MDF furniture handcrafted in Jaipur. Delivered across India with COD." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});

const reviews = [
  { name: "Priya Sharma", city: "Delhi", text: "The floating shelves look exactly like the photos. Solid finish and the installation was easy." },
  { name: "Rahul Mehta", city: "Mumbai", text: "Ordered the mandala panel for our living room — guests always ask where it's from!" },
  { name: "Ananya Iyer", city: "Bengaluru", text: "Quick delivery, well packed, and the WhatsApp support was very helpful." },
];
const why = [
  { icon: Hammer, title: "Crafted in Jaipur", text: "Made by skilled karigars in our own workshop." },
  { icon: ShieldCheck, title: "Quality Assured", text: "Every piece is checked before it ships." },
  { icon: Truck, title: "Pan-India Delivery", text: "Safe, sturdy packaging to your doorstep." },
  { icon: Wallet, title: "Fair Prices", text: "Factory-direct pricing with Cash on Delivery." },
];

function Section({ eyebrow, title, items }: { eyebrow: string; title: string; items: typeof products }) {
  return (
    <section className="container-page mt-24">
      <div className="flex items-end justify-between gap-4">
        <div><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 text-3xl text-primary md:text-4xl">{title}</h2></div>
        <Link to="/shop" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">View all</Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {items.slice(0, 4).map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Elegant oak wall shelves in a warm living room" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/40 to-transparent" />
        <div className="container-page relative flex min-h-[78vh] flex-col justify-center py-20">
          <p className="eyebrow">Handcrafted in Jaipur</p>
          <h1 className="mt-4 max-w-2xl text-5xl leading-[1.05] text-primary-foreground md:text-7xl">Transform Your Home with Elegant Furniture</h1>
          <p className="mt-6 max-w-lg text-lg text-primary-foreground/85">Beautiful Designs. Quality Craftsmanship. Affordable Prices.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/shop" className="rounded-md bg-accent px-8 py-3.5 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5">Shop Now</Link>
            <Link to="/about" className="rounded-md border border-primary-foreground/60 px-8 py-3.5 font-semibold text-primary-foreground hover:bg-primary-foreground/10">Our Story</Link>
          </div>
        </div>
      </section>

      <section className="container-page mt-20">
        <p className="eyebrow">Categories</p>
        <h2 className="mt-2 text-3xl text-primary md:text-4xl">Shop by room & need</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="group">
              <div className="overflow-hidden rounded-lg"><img src={c.image} alt={c.name} loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <p className="mt-3 font-display text-lg text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <Section eyebrow="Curated" title="Featured Products" items={products.filter((p) => p.tags.includes("featured"))} />
      <Section eyebrow="Loved by homes" title="Best Sellers" items={products.filter((p) => p.tags.includes("bestseller"))} />
      <Section eyebrow="Just in" title="New Arrivals" items={products.filter((p) => p.tags.includes("new"))} />

      <section className="mt-24 bg-secondary py-20">
        <div className="container-page">
          <p className="eyebrow">Why us</p>
          <h2 className="mt-2 text-3xl text-primary md:text-4xl">Why Choose Bharat Furniture</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.title}>
                <w.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-4 text-xl text-primary">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page mt-24">
        <p className="eyebrow">Reviews</p>
        <h2 className="mt-2 text-3xl text-primary md:text-4xl">What our customers say</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-lg border border-border bg-card p-7 shadow-soft">
              <div className="flex gap-0.5 text-accent">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-4 font-display text-lg leading-relaxed">"{r.text}"</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-muted-foreground">{r.name} · {r.city}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
