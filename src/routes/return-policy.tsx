import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
export const Route = createFileRoute("/return-policy")({
  head: () => ({ meta: [{ title: "Return & Refund Policy — Bharat Furniture" }, { name: "description", content: "Returns, replacements and refunds for Bharat Furniture orders." }, { property: "og:title", content: "Return & Refund Policy — Bharat Furniture" }, { property: "og:description", content: "Returns, replacements and refunds for Bharat Furniture orders." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Policy" title="Return & Refund Policy" />
      <div className="container-page mt-10 max-w-3xl space-y-5 leading-relaxed text-foreground/85">
        <p>If your product arrives damaged or defective, contact us within 7 days of delivery with photos of the item and packaging.</p><p>We will arrange a free replacement or a full refund after verification. Refunds are processed to the original payment method, or by bank transfer/UPI for Cash on Delivery orders, within 7–10 business days.</p><p>Custom-made or personalised items cannot be returned unless defective.</p>
      </div>
    </>
  ),
});
