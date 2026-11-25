import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
export const Route = createFileRoute("/shipping-policy")({
  head: () => ({ meta: [{ title: "Shipping Policy — Bharat Furniture" }, { name: "description", content: "Delivery timelines and shipping charges for Bharat Furniture across India." }, { property: "og:title", content: "Shipping Policy — Bharat Furniture" }, { property: "og:description", content: "Delivery timelines and shipping charges for Bharat Furniture across India." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Policy" title="Shipping Policy" />
      <div className="container-page mt-10 max-w-3xl space-y-5 leading-relaxed text-foreground/85">
        <p>We deliver across India. Orders are dispatched from Jaipur within 2–3 business days and usually arrive in 5–8 business days.</p><p>Shipping is free on orders of ₹2,999 and above. A flat ₹149 shipping fee applies to smaller orders.</p><p>Cash on Delivery is available on most PIN codes. You will receive tracking updates on WhatsApp once your order ships.</p>
      </div>
    </>
  ),
});
