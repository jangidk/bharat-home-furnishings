import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Bharat Furniture" }, { name: "description", content: "How Bharat Furniture collects and protects your personal information." }, { property: "og:title", content: "Privacy Policy — Bharat Furniture" }, { property: "og:description", content: "How Bharat Furniture collects and protects your personal information." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (
    <>
      <PageHeader eyebrow="Policy" title="Privacy Policy" />
      <div className="container-page mt-10 max-w-3xl space-y-5 leading-relaxed text-foreground/85">
        <p>We collect only the details needed to process and deliver your order: name, phone, email and delivery address.</p><p>Your information is used to fulfil orders, provide support and share order updates. We never sell your data to third parties.</p><p>Payment details for online payments are handled securely by our payment partner and are never stored by us.</p><p>To update or delete your information, contact us on WhatsApp at +91 80007 80330.</p>
      </div>
    </>
  ),
});
