import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { useCart, shippingFor } from "@/lib/cart";
import { formatINR, whatsappLink } from "@/lib/products";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Bharat Furniture" }, { name: "description", content: "Enter your delivery address and place your Bharat Furniture order." }, { property: "og:title", content: "Checkout — Bharat Furniture" }, { property: "og:description", content: "Enter your delivery address and place your Bharat Furniture order." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Checkout,
});

const states = ["Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","Uttarakhand","West Bengal"];
const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email"),
  address: z.string().trim().min(8, "Enter your full address"),
  city: z.string().trim().min(2, "Enter your city"),
  state: z.string().min(1, "Select your state"),
  pincode: z.string().regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit PIN code"),
});

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const shipping = shippingFor(subtotal);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
    setErrors({});
    const v = r.data;
    const items = lines.map((l) => `• ${l.product.name} × ${l.qty} = ${formatINR(l.qty * l.product.price)}`).join("\n");
    const msg = `New order (Cash on Delivery)\n\n${items}\n\nSubtotal: ${formatINR(subtotal)}\nShipping: ${shipping ? formatINR(shipping) : "Free"}\nTotal: ${formatINR(subtotal + shipping)}\n\nName: ${v.name}\nPhone: ${v.phone}\nEmail: ${v.email}\nAddress: ${v.address}, ${v.city}, ${v.state} - ${v.pincode}`;
    window.open(whatsappLink(msg), "_blank");
    clear(); setDone(true);
  }

  if (done) return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow">Thank you</p>
      <h1 className="mt-2 text-4xl text-primary">Your order details were sent</h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">Send the WhatsApp message that just opened — our team will confirm your Cash on Delivery order and delivery date there.</p>
      <Link to="/shop" className="mt-8 inline-block rounded-md bg-primary px-8 py-3 font-bold text-primary-foreground">Continue Shopping</Link>
    </div>
  );
  if (lines.length === 0) return (
    <div className="container-page py-24 text-center"><p className="text-muted-foreground">Your cart is empty.</p><Link to="/shop" className="mt-4 inline-block font-semibold text-accent">Go to shop</Link></div>
  );

  const field = (name: string, label: string, props: Record<string, string> = {}) => (
    <label className="block text-sm">
      <span className="font-semibold">{label}</span>
      <input name={name} {...props} className="mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5 outline-none focus:border-ring" />
      {errors[name] && <span className="mt-1 block text-xs text-destructive">{errors[name]}</span>}
    </label>
  );

  return (
    <>
      <PageHeader eyebrow="Checkout" title="Delivery Details" />
      <form onSubmit={submit} noValidate className="container-page mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-5 sm:grid-cols-2">
          {field("name", "Full name", { autoComplete: "name" })}
          {field("phone", "Mobile number", { inputMode: "numeric", maxLength: "10", autoComplete: "tel" })}
          <div className="sm:col-span-2">{field("email", "Email", { type: "email", autoComplete: "email" })}</div>
          <div className="sm:col-span-2">{field("address", "House no., street, area", { autoComplete: "street-address" })}</div>
          {field("city", "City")}
          <label className="block text-sm">
            <span className="font-semibold">State</span>
            <select name="state" defaultValue="" className="mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5">
              <option value="" disabled>Select state</option>
              {states.map((s) => <option key={s}>{s}</option>)}
            </select>
            {errors["state"] && <span className="mt-1 block text-xs text-destructive">{errors["state"]}</span>}
          </label>
          {field("pincode", "PIN code", { inputMode: "numeric", maxLength: "6" })}
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-semibold">Payment method</legend>
            <label className="mt-2 flex items-center gap-3 rounded-md border-2 border-primary p-4"><input type="radio" checked readOnly /> <span><b>Cash on Delivery</b><br /><span className="text-xs text-muted-foreground">Pay when your order arrives</span></span></label>
            <div className="mt-2 flex items-center gap-3 rounded-md border border-border p-4 opacity-60"><input type="radio" disabled /> <span><b>Pay Online (UPI / Card)</b><br /><span className="text-xs text-muted-foreground">Coming soon</span></span></div>
          </fieldset>
        </div>
        <aside className="h-fit rounded-lg bg-secondary p-6">
          <h2 className="text-xl text-primary">Your Order</h2>
          <ul className="mt-4 space-y-2 text-sm">{lines.map((l) => <li key={l.slug} className="flex justify-between gap-3"><span>{l.product.name} × {l.qty}</span><span>{formatINR(l.qty * l.product.price)}</span></li>)}</ul>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span>Shipping</span><span>{shipping ? formatINR(shipping) : "Free"}</span></div>
            <div className="flex justify-between text-base font-bold"><span>Total</span><span>{formatINR(subtotal + shipping)}</span></div>
          </div>
          <button type="submit" className="mt-6 w-full rounded-md bg-primary py-3.5 font-bold text-primary-foreground">Place Order via WhatsApp</button>
          <p className="mt-3 text-xs text-muted-foreground">Your order details open in WhatsApp for our team to confirm.</p>
        </aside>
      </form>
    </>
  );
}
