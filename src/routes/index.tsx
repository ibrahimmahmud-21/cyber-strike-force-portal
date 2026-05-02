import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import { CyberBackground } from "@/components/CyberBackground";
import { useScrollReveal } from "@/hooks/useReveal";
import logo from "@/assets/csf-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cyber Strike Force — We fight for Bangladesh" },
      {
        name: "description",
        content:
          "Cyber Strike Force is Bangladesh's cyber defense team safeguarding the nation's digital frontier.",
      },
      { property: "og:title", content: "Cyber Strike Force — We fight for Bangladesh" },
      {
        property: "og:description",
        content: "Bangladesh's cyber defense team. We fight for Bangladesh.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <SiteHeader />

      {/* Brand header (compact, not landing) */}
      <section className="relative overflow-hidden border-b border-border px-6 py-16 sm:py-20">
        <CyberBackground />
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,207,255,0.12),transparent_65%)]" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="animate-fade-up relative mb-6">
            <div className="logo-aura" />
            <div className="float-y relative rounded-full bg-background/40 p-2 ring-1 ring-[var(--neon)]/60 backdrop-blur">
              <img
                src={logo}
                alt="Cyber Strike Force Logo"
                className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
              />
            </div>
          </div>

          <h1 className="animate-fade-up delay-100 font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
            CYBER STRIKE{" "}
            <span className="bg-[var(--gradient-neon)] bg-clip-text text-transparent">FORCE</span>
          </h1>

          <p className="animate-fade-up delay-200 mt-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            We fight for Bangladesh
          </p>
        </div>
      </section>

      {/* Mission Briefing — directly under header */}
      <section className="relative px-6 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,207,255,0.05),transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="reveal glass-card relative overflow-hidden rounded-2xl p-7 sm:p-10">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-[var(--gradient-gold)]" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80">
              // Mission Briefing
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Defending the digital frontier
            </h2>
            <p className="mt-5 text-base leading-[1.85] text-muted-foreground/95">
              Cyber Strike Force is an independent, mission-driven cybersecurity initiative
              committed to protecting Bangladesh's digital frontier. We safeguard vulnerable
              communities from cyber threats, online harassment, misinformation, and targeted
              digital attacks — standing united for a safer national cyberspace.
            </p>
            <p className="mt-5 text-sm font-semibold tracking-wide text-neon">
              We fight for Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative border-t border-border px-6 py-20">
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 text-center reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80">
              What we stand for
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Three{" "}
              <span className="bg-[var(--gradient-neon)] bg-clip-text text-transparent">pillars</span>
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
                className="reveal glass-card rounded-2xl p-7 transition duration-500"
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

      {/* Contact / Connect */}
      <section id="contact" className="relative border-t border-border px-6 py-20">
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-10 text-center reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80">
              // Contact
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Get in{" "}
              <span className="bg-[var(--gradient-neon)] bg-clip-text text-transparent">touch</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Email",
                v: "CyberStrikeforce@outlook.com",
                href: "mailto:CyberStrikeforce@outlook.com",
                icon: (
                  <path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm1.4 2L12 12.5 19.6 7H4.4zM20 8.3l-7.4 5.4a1 1 0 01-1.2 0L4 8.3V17h16V8.3z" />
                ),
              },
              {
                t: "Facebook",
                v: "facebook.com/cyberstrikeforceCSF",
                href: "https://facebook.com/cyberstrikeforceCSF",
                icon: (
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 3h-2.2v7A10 10 0 0022 12z" />
                ),
              },
            ].map((s, i) => (
              <a
                key={s.t}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="reveal glass-card group relative flex items-center gap-4 overflow-hidden rounded-xl px-5 py-5 transition hover:border-[var(--neon)] hover:shadow-[0_0_28px_-4px_var(--neon-soft)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-[var(--gradient-neon)] opacity-60 group-hover:opacity-100" />
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--neon-soft)]/30 ring-1 ring-[var(--neon)]/40 text-neon">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    {s.icon}
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/80">
                    {s.t}
                  </p>
                  <p className="truncate font-display text-sm font-semibold tracking-wide transition group-hover:text-neon sm:text-base">
                    {s.v}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
