import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/site/Layout";
import { whatsappLink } from "@/lib/products";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us — Bharat Furniture" }, { name: "description", content: "Reach Bharat Furniture in Jaipur by phone or WhatsApp for orders, custom sizes and support." }, { property: "og:title", content: "Contact Us — Bharat Furniture" }, { property: "og:description", content: "Reach Bharat Furniture in Jaipur by phone or WhatsApp for orders, custom sizes and support." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Contact,
});

function Contact() {
  const [err, setErr] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!d["name"]?.trim() || !d["message"]?.trim()) { setErr("Please add your name and message."); return; }
    setErr("");
    window.open(whatsappLink(`Hi, I'm ${d["name"]}.\n${d["message"]}`), "_blank");
  }
  return (
    <>
      <PageHeader eyebrow="Contact" title="We'd love to hear from you">Questions, bulk orders or custom sizes — message us anytime.</PageHeader>
      <div className="container-page mt-12 grid gap-12 lg:grid-cols-2">
        <div className="space-y-5">
          <p className="flex gap-3"><MapPin className="h-5 w-5 text-accent" /> Jaipur, Rajasthan, India</p>
          <p className="flex gap-3"><Phone className="h-5 w-5 text-accent" /> <a href="tel:+918000780330">+91 80007 80330</a></p>
          <a href={whatsappLink("Hello Bharat Furniture!")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-whatsapp px-6 py-3 font-bold text-whatsapp-foreground"><MessageCircle className="h-5 w-5" /> Chat on WhatsApp</a>
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-lg bg-secondary p-7">
          <input name="name" placeholder="Your name" className="w-full rounded-md border border-input bg-card px-3 py-2.5" />
          <textarea name="message" rows={5} placeholder="Your message" className="w-full rounded-md border border-input bg-card px-3 py-2.5" />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="w-full rounded-md bg-primary py-3 font-bold text-primary-foreground">Send on WhatsApp</button>
        </form>
      </div>
    </>
  );
}
