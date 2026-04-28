import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import logo from "@/assets/csf-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cyber Strike Force — Join Bangladesh's Cyber Warriors" },
      {
        name: "description",
        content:
          "Cyber Strike Force is Bangladesh's premier cyber defense team. Join us to safeguard the nation's digital frontier.",
      },
      { property: "og:title", content: "Cyber Strike Force — Join Bangladesh's Cyber Warriors" },
      {
        property: "og:description",
        content: "Become a Cyber Warrior of Bangladesh. Join Cyber Strike Force.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.92_0.06_88/0.4),transparent_60%)]" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="animate-fade-up mb-8">
            <div className="rounded-full bg-foreground p-4 shadow-[0_20px_60px_-20px_rgba(212,175,55,0.5)] ring-1 ring-[var(--gold)]/40">
              <img
                src={logo}
                alt="Cyber Strike Force Logo"
                className="h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36"
              />
            </div>
          </div>

          <span className="font-bangla animate-fade-up delay-100 mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold-soft)]/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold-deep)]" />
            Cyber Strike Force
          </span>

          <h1 className="animate-fade-up delay-200 font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
            JOIN <span className="text-gold">TEAM</span>
          </h1>

          <div className="animate-fade-up delay-200 my-6 gold-divider" />

          <p className="animate-fade-up delay-300 font-bangla max-w-xl text-lg text-muted-foreground sm:text-xl">
            We fight for Bangladesh
          </p>

          <Link
            to="/join"
            className="animate-fade-up delay-400 group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-10 py-4 text-base font-semibold tracking-wide text-primary-foreground shadow-[0_12px_32px_-12px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(212,175,55,0.55)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--gradient-gold)] transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Join Now</span>
            <svg
              className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-border bg-secondary/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">What we stand for</p>
            <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
              Defending the digital <span className="text-gold">frontier</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Defense", d: "Protecting Bangladesh's digital infrastructure from emerging threats." },
              { t: "Intelligence", d: "Continuous monitoring, research and threat intelligence operations." },
              { t: "Community", d: "A united team of patriotic cyber warriors trained for the future." },
            ].map((c, i) => (
              <div
                key={c.t}
                className={`lift-card rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] animate-fade-up delay-${(i + 1) * 100}`}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-gold">
                  <span className="font-display text-sm font-bold">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-bold">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border px-6 py-20">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-50" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Ready to <span className="text-gold">join the force?</span>
          </h2>
          <p className="font-bangla mt-3 text-muted-foreground">
            Apply today and become part of Bangladesh's elite cyber team.
          </p>
          <Link
            to="/join"
            className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-9 py-3.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(212,175,55,0.55)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--gradient-gold)] transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Apply Now</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
