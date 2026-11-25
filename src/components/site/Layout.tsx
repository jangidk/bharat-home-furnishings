import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, ShoppingBag, X, MessageCircle, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import { categories, whatsappLink } from "@/lib/products";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="bg-primary py-2 text-center text-xs font-medium tracking-wide text-primary-foreground">Free delivery above ₹2,999<span className="hidden sm:inline"> · Cash on Delivery available</span></div>
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-semibold text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative rounded-full p-2 hover:bg-muted" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[0.65rem] font-bold text-accent-foreground">{count}</span>}
          </Link>
          <button className="rounded-full p-2 hover:bg-muted md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="container-page flex flex-col gap-1 pb-4 md:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 font-semibold hover:bg-muted">{n.label}</Link>)}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl">Bharat Furniture</p>
          <p className="mt-3 text-sm text-primary-foreground/70">Handcrafted wooden furniture and decor, made in Jaipur and delivered across India.</p>
        </div>
        <div>
          <p className="eyebrow">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            {categories.map((c) => <li key={c.slug}><Link to="/shop" search={{ category: c.slug }} className="hover:text-accent">{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Help</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-accent">Shipping Policy</Link></li>
            <li><Link to="/return-policy" className="hover:text-accent">Return & Refund Policy</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-accent">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="space-y-3 text-sm text-primary-foreground/80">
          <p className="eyebrow">Visit</p>
          <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" /> Jaipur, Rajasthan, India</p>
          <p className="flex gap-2"><Phone className="h-4 w-4 shrink-0" /> +91 80007 80330</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/60">© {new Date().getFullYear()} Bharat Furniture. All rights reserved.</div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a href={whatsappLink("Hello Bharat Furniture, I have a question.")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-soft transition-transform hover:scale-110">
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-secondary py-14">
      <div className="container-page">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-4xl text-primary md:text-5xl">{title}</h1>
        {children && <div className="mt-3 max-w-2xl text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}
