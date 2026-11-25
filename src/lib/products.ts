import wallShelf from "@/assets/wall-shelf.jpg";
import floatingShelf from "@/assets/floating-shelf.jpg";
import keyHolder from "@/assets/key-holder.jpg";
import wallDecor from "@/assets/wall-decor.jpg";
import mdf from "@/assets/mdf-furniture.jpg";
import organization from "@/assets/organization.jpg";

export const WHATSAPP_NUMBER = "918000780330";
export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export type Category = { slug: string; name: string; image: string; blurb: string };
export const categories: Category[] = [
  { slug: "wall-shelves", name: "Wall Shelves", image: wallShelf, blurb: "Display what you love" },
  { slug: "floating-shelves", name: "Floating Shelves", image: floatingShelf, blurb: "Clean, invisible support" },
  { slug: "key-holders", name: "Key Holders", image: keyHolder, blurb: "Never lose keys again" },
  { slug: "wall-decor", name: "Wall Decor", image: wallDecor, blurb: "Hand-finished art" },
  { slug: "mdf-furniture", name: "MDF Furniture", image: mdf, blurb: "Smart, sturdy pieces" },
  { slug: "home-organization", name: "Home Organization", image: organization, blurb: "A place for everything" },
];

export type Product = {
  slug: string; name: string; category: string; price: number; mrp: number; image: string;
  description: string; dimensions: string; material: string; tags: ("featured" | "bestseller" | "new")[];
};

export const products: Product[] = [
  { slug: "zigzag-wall-shelf", name: "Zig-Zag Wall Shelf", category: "wall-shelves", price: 1499, mrp: 2199, image: wallShelf, description: "A sculptural four-tier shelf that turns books and plants into a feature wall. Pre-drilled for easy installation.", dimensions: "90 × 15 × 60 cm", material: "Engineered wood, oak laminate", tags: ["featured", "bestseller"] },
  { slug: "ladder-wall-shelf", name: "Ladder Wall Shelf", category: "wall-shelves", price: 1899, mrp: 2599, image: wallShelf, description: "Stepped shelving for living rooms and study corners, finished in warm natural tones.", dimensions: "60 × 18 × 90 cm", material: "Sheesham wood", tags: ["new"] },
  { slug: "walnut-floating-shelf-set", name: "Walnut Floating Shelf (Set of 3)", category: "floating-shelves", price: 2299, mrp: 3199, image: floatingShelf, description: "Hidden-bracket floating shelves that hold up to 8 kg each. A timeless walnut finish.", dimensions: "80 × 20 × 4 cm each", material: "MDF, walnut veneer", tags: ["featured", "bestseller"] },
  { slug: "oak-floating-shelf", name: "Oak Floating Shelf", category: "floating-shelves", price: 999, mrp: 1399, image: floatingShelf, description: "A single minimal ledge for photos, plants or spices.", dimensions: "60 × 15 × 4 cm", material: "MDF, oak veneer", tags: ["new"] },
  { slug: "little-house-key-holder", name: "Little House Key Holder", category: "key-holders", price: 649, mrp: 899, image: keyHolder, description: "A charming house-shaped key holder with four brass hooks for your entryway.", dimensions: "28 × 3 × 22 cm", material: "Pine wood, brass hooks", tags: ["bestseller", "new"] },
  { slug: "entryway-key-rack", name: "Entryway Key Rack", category: "key-holders", price: 799, mrp: 1099, image: keyHolder, description: "Slim key rack with a mail ledge on top.", dimensions: "35 × 6 × 15 cm", material: "Mango wood", tags: [] },
  { slug: "carved-mandala-panel", name: "Carved Mandala Wall Panel", category: "wall-decor", price: 3499, mrp: 4999, image: wallDecor, description: "Hand-finished mandala panel inspired by Rajasthani jaali work. A true statement piece.", dimensions: "75 cm diameter", material: "MDF, hand-stained", tags: ["featured", "bestseller"] },
  { slug: "lotus-wall-art", name: "Lotus Wall Art", category: "wall-decor", price: 1999, mrp: 2799, image: wallDecor, description: "Delicate lotus motif in layered wood for prayer rooms and living spaces.", dimensions: "50 cm diameter", material: "MDF, antique finish", tags: ["new"] },
  { slug: "nordic-bedside-table", name: "Nordic Bedside Table", category: "mdf-furniture", price: 4299, mrp: 5999, image: mdf, description: "A bedside table with a soft-close drawer and open shelf on splayed legs.", dimensions: "45 × 35 × 55 cm", material: "MDF, oak laminate, solid wood legs", tags: ["featured", "new"] },
  { slug: "compact-study-cabinet", name: "Compact Study Cabinet", category: "mdf-furniture", price: 5499, mrp: 7499, image: mdf, description: "Sturdy cabinet with a drawer and shelf, sized for compact homes.", dimensions: "50 × 40 × 75 cm", material: "Pre-laminated MDF", tags: ["bestseller"] },
  { slug: "wall-organizer-with-baskets", name: "Wall Organizer with Baskets", category: "home-organization", price: 2799, mrp: 3699, image: organization, description: "Wall rack with hooks, a top shelf and three woven baskets.", dimensions: "80 × 20 × 55 cm", material: "Pine wood, cane baskets", tags: ["featured"] },
  { slug: "desk-organizer-set", name: "Desk Organizer Set", category: "home-organization", price: 1199, mrp: 1599, image: organization, description: "Three-piece modular desk organizer with mini drawers.", dimensions: "45 × 15 × 18 cm", material: "Engineered wood", tags: ["new", "bestseller"] },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
