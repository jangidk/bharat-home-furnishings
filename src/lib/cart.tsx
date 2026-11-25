import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

export type CartLine = { slug: string; qty: number };
type Ctx = {
  lines: (CartLine & { product: Product })[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};
const CartContext = createContext<Ctx | null>(null);
const KEY = "bf-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { setRaw(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(raw)); }, [raw, loaded]);

  const lines = raw.flatMap((l) => { const product = getProduct(l.slug); return product ? [{ ...l, product }] : []; });
  const value: Ctx = {
    lines,
    add: (slug, qty = 1) => setRaw((r) => r.some((l) => l.slug === slug) ? r.map((l) => l.slug === slug ? { ...l, qty: Math.min(10, l.qty + qty) } : l) : [...r, { slug, qty }]),
    setQty: (slug, qty) => setRaw((r) => r.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, Math.min(10, qty)) } : l))),
    remove: (slug) => setRaw((r) => r.filter((l) => l.slug !== slug)),
    clear: () => setRaw([]),
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
export const shippingFor = (subtotal: number) => (subtotal === 0 || subtotal >= 2999 ? 0 : 149);
