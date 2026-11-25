import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, shippingFor } from "@/lib/cart";
import { formatINR } from "@/lib/products";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Bharat Furniture" }, { name: "description", content: "Review the furniture and decor in your cart before checkout." }, { property: "og:title", content: "Your Cart — Bharat Furniture" }, { property: "og:description", content: "Review the furniture and decor in your cart before checkout." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal } = useCart();
  const shipping = shippingFor(subtotal);
  return (
    <>
      <PageHeader eyebrow="Cart" title="Your Shopping Cart" />
      <div className="container-page mt-10">
        {lines.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">Your cart is empty.</p>
            <Link to="/shop" className="mt-6 inline-block rounded-md bg-primary px-8 py-3 font-bold text-primary-foreground">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-border">
              {lines.map((l) => (
                <li key={l.slug} className="flex gap-4 py-5">
                  <img src={l.product.image} alt={l.product.name} width={96} height={96} className="h-24 w-24 rounded-md object-cover" />
                  <div className="flex flex-1 flex-col">
                    <Link to="/products/$slug" params={{ slug: l.slug }} className="font-display text-lg">{l.product.name}</Link>
                    <span className="text-sm text-muted-foreground">{formatINR(l.product.price)} each</span>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="flex items-center rounded-md border border-input">
                        <button aria-label="Decrease" className="p-2" onClick={() => setQty(l.slug, l.qty - 1)}><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm font-semibold">{l.qty}</span>
                        <button aria-label="Increase" className="p-2" onClick={() => setQty(l.slug, l.qty + 1)}><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button onClick={() => remove(l.slug)} className="text-muted-foreground hover:text-destructive" aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <span className="font-bold">{formatINR(l.qty * l.product.price)}</span>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-lg bg-secondary p-6">
              <h2 className="text-xl text-primary">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping ? formatINR(shipping) : "Free"}</span></div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-bold"><span>Total</span><span>{formatINR(subtotal + shipping)}</span></div>
              </div>
              <Link to="/checkout" className="mt-6 block rounded-md bg-primary py-3.5 text-center font-bold text-primary-foreground">Proceed to Checkout</Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
