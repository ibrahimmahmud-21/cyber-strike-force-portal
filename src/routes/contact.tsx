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
    {
      label: "Email",
      value: "CyberStrikeforce@outlook.com",
      href: "mailto:CyberStrikeforce@outlook.com",
    },
    {
      label: "Facebook",
      value: "facebook.com/cyberstrikeforceCSF",
      href: "https://facebook.com/cyberstrikeforceCSF",
    },
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
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {items.map((it, i) => (
            <a
              key={it.label}
              href={it.href}
              target={it.href.startsWith("http") ? "_blank" : undefined}
              rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`glass-card group block rounded-2xl p-7 text-center transition hover:border-[var(--neon)] hover:shadow-[0_0_28px_-4px_var(--neon-soft)] animate-fade-up delay-${(i + 1) * 100}`}
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground/80">{it.label}</p>
              <p className="mt-4 font-display text-base font-semibold tracking-tight transition group-hover:text-neon">
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
