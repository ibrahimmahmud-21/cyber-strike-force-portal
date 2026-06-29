import { Link } from "react-router-dom";
import { useEffect } from "react";
import { SiteHeader, SiteFooter, BackToTop } from "@/components/SiteHeader";
import { CyberBackground } from "@/components/CyberBackground";
import { StatCounter } from "@/components/StatCounter";
import { useScrollReveal } from "@/hooks/useReveal";
import logo from "@/assets/csf-logo.png";

const STATS = [
  { value: 24, suffix: "/7", label: "Continuous Monitoring", sub: "Always-on threat watch" },
  { value: 350, suffix: "+", label: "Active Operators", sub: "Trained volunteers nationwide" },
  { value: 99.9, suffix: "%", label: "Response Uptime", sub: "Coordinated incident readiness", decimals: 1 },
  { value: 18, suffix: "min", label: "Avg. Triage Time", sub: "From report to action" },
] as const;

const SERVICES = [
  {
    title: "Threat Intelligence",
    body: "Real-time intelligence on emerging threats, campaigns, and infrastructure abuse targeting Bangladeshi assets.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
  },
  {
    title: "Incident Response",
    body: "Coordinated triage, containment, and remediation playbooks built on a 24/7 volunteer operations cadence.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Vulnerability Research",
    body: "Coordinated disclosure, deep-dive analysis, and tooling that hardens Bangladesh's most exposed surfaces.",
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </>
    ),
  },
  {
    title: "Community Defense",
    body: "Protecting journalists, activists, and vulnerable communities from harassment, doxxing, and targeted attacks.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: "Awareness & Training",
    body: "Curriculum, workshops, and digital hygiene programs that scale defensive literacy across the country.",
    icon: (
      <>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </>
    ),
  },
  {
    title: "Critical-Asset Hardening",
    body: "Advisory and operational support for institutions defending public infrastructure and digital sovereignty.",
    icon: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "CSF's coordinated response gave us a clear playbook within hours of detection. Their discipline is on par with the best teams I've seen.",
    name: "Anonymized SOC Lead",
    role: "Financial Sector, Dhaka",
  },
  {
    quote:
      "When our journalist colleagues were targeted, CSF moved fast — takedowns, hardening, and quiet reassurance. They protect people, not just systems.",
    name: "Newsroom Editor",
    role: "Independent Media",
  },
  {
    quote:
      "A rare blend of patriotism and rigor. Their threat advisories are precise, their conduct exemplary. We rely on them.",
    name: "University CISO",
    role: "Public Institution",
  },
] as const;

const TRUST = [
  "Confidential by Default",
  "Coordinated Disclosure",
  "Volunteer Operated",
  "Bangladesh First",
];

export default function IndexPage() {
  useScrollReveal();
  useEffect(() => {
    document.title = "Cyber Strike Force — Enterprise-grade Cyber Defense for Bangladesh";
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate overflow-hidden px-6 pt-12 pb-24 sm:pt-20 sm:pb-32">
        <CyberBackground />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="reveal">
                <span className="eyebrow">Defending Bangladesh's Digital Frontier</span>
              </div>
              <h1 className="display-h1 reveal mt-6" style={{ transitionDelay: "60ms" }}>
                Enterprise-grade cyber defense,
                <br className="hidden sm:block" /> built for a{" "}
                <span className="gradient-text">sovereign</span> nation.
              </h1>
              <p
                className="reveal mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
                style={{ transitionDelay: "120ms" }}
              >
                Cyber Strike Force is a mission-driven, volunteer-operated initiative protecting
                Bangladesh's institutions, infrastructure, and people from advanced digital
                threats — with the discipline of a top-tier security team.
              </p>
              <div
                className="reveal mt-9 flex flex-wrap items-center gap-3"
                style={{ transitionDelay: "180ms" }}
              >
                <Link to="/join" className="btn btn-primary">
                  Join the Team
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  Learn more
                </Link>
              </div>

              <div
                className="reveal mt-10 flex flex-wrap items-center gap-2.5"
                style={{ transitionDelay: "240ms" }}
              >
                {TRUST.map((t) => (
                  <span key={t} className="trust-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal lg:col-span-5" style={{ transitionDelay: "240ms" }}>
              <div className="relative mx-auto aspect-square w-full max-w-md">
                <div
                  className="absolute inset-0 rounded-full opacity-60 blur-3xl"
                  style={{ background: "var(--gradient-brand)" }}
                  aria-hidden
                />
                <div className="glass-strong absolute inset-6 flex items-center justify-center rounded-full">
                  <div className="relative h-44 w-44 sm:h-52 sm:w-52">
                    <div
                      aria-hidden
                      className="absolute inset-0 animate-pulse rounded-full opacity-50 blur-2xl"
                      style={{ background: "var(--gradient-brand)" }}
                    />
                    <img
                      src={logo}
                      alt="Cyber Strike Force emblem"
                      loading="eager"
                      decoding="async"
                      className="relative h-full w-full rounded-full border border-white/15 object-cover shadow-2xl"
                    />
                  </div>
                </div>
                {/* Orbiting markers */}
                <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300 backdrop-blur">
                  Live
                </span>
                <span className="absolute bottom-3 left-4 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300 backdrop-blur">
                  SOC v2
                </span>
                <span className="absolute right-3 top-1/3 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300 backdrop-blur">
                  TLP:Green
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className="stat-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="stat-number">
                  <StatCounter value={s.value} suffix={s.suffix} decimals={(s as any).decimals ?? 0} />
                </p>
                <p className="mt-2 font-display text-sm font-semibold text-white">{s.label}</p>
                <p className="mt-1 text-xs text-slate-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow">Capabilities</span>
            <h2 className="display-h2 mt-5">
              A full-spectrum, <span className="gradient-text">defensive</span> operation
            </h2>
            <p className="mt-4 text-base text-slate-300">
              From intelligence to incident response, our capabilities are organized around the threats
              that matter most to Bangladesh — delivered with discipline, transparency, and care.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc, i) => (
              <article
                key={svc.title}
                className="feature-card reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="icon-chip">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {svc.icon}
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{svc.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{svc.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="eyebrow">Trusted by the field</span>
            <h2 className="display-h2 mt-5">
              What partners <span className="gradient-text">say</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                className="quote-card reveal"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-violet-300/80">
                  <path d="M7 7h4v4H7c0 2 1 4 4 4v3c-4 0-7-3-7-7V7zm9 0h4v4h-4c0 2 1 4 4 4v3c-4 0-7-3-7-7V7z" fill="currentColor" />
                </svg>
                <blockquote className="mt-4 text-sm leading-relaxed text-slate-200">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div
                    aria-hidden
                    className="h-9 w-9 rounded-full"
                    style={{ background: "var(--gradient-brand)" }}
                  />
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-24 pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="glass-strong relative overflow-hidden p-10 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(167,139,250,0.5), transparent 70%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(125,211,252,0.5), transparent 70%)" }}
            />
            <div className="relative grid items-center gap-8 md:grid-cols-12">
              <div className="md:col-span-8">
                <span className="eyebrow">Enlist</span>
                <h2 className="display-h2 mt-4">
                  Stand with Bangladesh.
                  <br className="hidden sm:block" />
                  <span className="gradient-text">Become a Cyber Warrior.</span>
                </h2>
                <p className="mt-4 max-w-xl text-base text-slate-300">
                  Join a disciplined, mission-first community defending the country's digital frontier.
                  Training, mentorship, and a shared sense of purpose.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:col-span-4 md:justify-end">
                <Link to="/join" className="btn btn-primary">Join the Team</Link>
                <Link to="/contact" className="btn btn-secondary">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
