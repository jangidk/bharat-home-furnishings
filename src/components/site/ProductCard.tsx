import { Link } from "@tanstack/react-router";
import { formatINR, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const off = Math.round((1 - product.price / product.mrp) * 100);
  return (
    <div className="group flex flex-col">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="relative block overflow-hidden rounded-lg bg-muted">
        <img src={product.image} alt={product.name} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-background px-2.5 py-1 text-xs font-bold text-primary">{off}% off</span>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <Link to="/products/$slug" params={{ slug: product.slug }} className="font-display text-lg text-foreground hover:text-accent">{product.name}</Link>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-bold text-primary">{formatINR(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatINR(product.mrp)}</span>
        </div>
        <button onClick={() => { add(product.slug); toast.success(`${product.name} added to cart`); }} className="mt-3 rounded-md border border-primary py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
