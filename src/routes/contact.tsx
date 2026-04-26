import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Cyber Strike Force" },
      {
        name: "description",
        content: "Get in touch with Cyber Strike Force — Bangladesh's cyber defense team.",
      },
      { property: "og:title", content: "Contact — Cyber Strike Force" },
      {
        property: "og:description",
        content: "Get in touch with Cyber Strike Force.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    { label: "Email", value: "contact@cyberstrikeforce.bd", href: "mailto:contact@cyberstrikeforce.bd" },
    { label: "WhatsApp", value: "+880 1XXX-XXXXXX", href: "#" },
    { label: "Facebook", value: "facebook.com/cyberstrikeforce", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border px-6 py-20">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-50" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="animate-fade-up font-display text-4xl font-bold sm:text-5xl">
            Get in <span className="text-gold">touch</span>
          </h1>
          <div className="animate-fade-up delay-100 mx-auto my-5 gold-divider" />
          <p className="animate-fade-up delay-200 font-bangla mx-auto max-w-xl text-muted-foreground">
            For inquiries, partnerships or media, reach out through any of the channels below.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
          {items.map((it, i) => (
            <a
              key={it.label}
              href={it.href}
              className={`lift-card group block rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)] animate-fade-up delay-${(i + 1) * 100}`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{it.label}</p>
              <p className="mt-3 font-display text-base font-semibold transition group-hover:text-gold">
                {it.value}
              </p>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
