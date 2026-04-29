import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import { CyberBackground } from "@/components/CyberBackground";
import { useScrollReveal } from "@/hooks/useReveal";
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
      <section className="relative overflow-hidden px-6 py-28 sm:py-36">
        <CyberBackground />
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,207,255,0.18),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px sheen-band" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="animate-fade-up relative mb-10">
            <div className="logo-aura" />
            <div className="float-y relative rounded-full bg-background/40 p-2 ring-1 ring-[var(--neon)]/60 backdrop-blur">
              <img
                src={logo}
                alt="Cyber Strike Force Logo"
                className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"
              />
            </div>
          </div>

          <span className="animate-fade-up delay-100 mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--neon)]/40 bg-[var(--neon-soft)]/20 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_10px_var(--neon)]" />
            Cyber Strike Force
          </span>

          <h1 className="animate-fade-up delay-200 font-display text-6xl font-black leading-[1] tracking-tight text-foreground sm:text-7xl md:text-8xl">
            JOIN <span className="bg-[var(--gradient-neon)] bg-clip-text text-transparent">TEAM</span>
          </h1>

          <p className="animate-fade-up delay-300 mt-8 max-w-xl text-base font-light tracking-wide text-muted-foreground/80 sm:text-lg">
            We fight for Bangladesh
          </p>

          <Link
            to="/join"
            className="btn-premium animate-fade-up delay-400 group mt-12 inline-flex items-center gap-3 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em]"
          >
            <span>Join Now</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
      <section className="relative border-t border-border px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,207,255,0.06),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 text-center reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80">What we stand for</p>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Defending the digital{" "}
              <span className="bg-[var(--gradient-neon)] bg-clip-text text-transparent">frontier</span>
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Defense", d: "Protecting Bangladesh's digital infrastructure from emerging threats." },
              { t: "Intelligence", d: "Continuous monitoring, research and threat intelligence operations." },
              { t: "Community", d: "A united team of patriotic cyber warriors trained for the future." },
            ].map((c, i) => (
              <div
                key={c.t}
                className="reveal glass-card rounded-2xl p-8 transition duration-500"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--neon-soft)]/30 text-neon ring-1 ring-[var(--neon)]/40">
                  <span className="font-display text-sm font-bold">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border px-6 py-24">
        <CyberBackground />
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px sheen-band" />
        <div className="relative mx-auto max-w-3xl text-center reveal">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to{" "}
            <span className="bg-[var(--gradient-neon)] bg-clip-text text-transparent">join the force?</span>
          </h2>
          <p className="mt-4 text-muted-foreground/80">
            Apply today and become part of Bangladesh's elite cyber team.
          </p>
          <Link
            to="/join"
            className="btn-premium group mt-10 inline-flex items-center gap-3 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em]"
          >
            <span>Apply Now</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
