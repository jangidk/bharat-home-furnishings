import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { PageHeader } from "@/components/site/Layout";
export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us — Bharat Furniture, Jaipur" }, { name: "description", content: "Bharat Furniture designs and manufactures wooden furniture and decor in Jaipur, Rajasthan." }, { property: "og:title", content: "About Us — Bharat Furniture, Jaipur" }, { property: "og:description", content: "Bharat Furniture designs and manufactures wooden furniture and decor in Jaipur, Rajasthan." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Our story" title="Made in Jaipur, made to last" />
      <div className="container-page mt-12 grid items-center gap-12 lg:grid-cols-2">
        <img src={hero} alt="Bharat Furniture shelves" width={1600} height={1008} loading="lazy" className="rounded-lg" />
        <div className="space-y-5 leading-relaxed text-foreground/85">
          <p>Bharat Furniture began as a small workshop in Jaipur, the Pink City known for centuries of craftsmanship. Today we design and manufacture wall shelves, decor and compact furniture for modern Indian homes.</p>
          <p>Every piece is cut, finished and quality-checked by our own team — so we can offer honest, factory-direct prices without compromising on finish.</p>
          <p>We ship across India in protective packaging, with Cash on Delivery and friendly support on WhatsApp.</p>
        </div>
      </div>
    </>
  ),
});
