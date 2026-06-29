import { useEffect } from "react";
import { SiteHeader, SiteFooter, BackToTop } from "@/components/SiteHeader";
import { CyberBackground } from "@/components/CyberBackground";
import { useScrollReveal } from "@/hooks/useReveal";

const ITEMS = [
  {
    label: "Email",
    value: "CyberStrikeforce@outlook.com",
    href: "mailto:CyberStrikeforce@outlook.com",
    icon: (<><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3 7 9 6 9-6" /></>),
  },
  {
    label: "Facebook",
    value: "facebook.com/cyberstrikeforceCSF",
    href: "https://facebook.com/cyberstrikeforceCSF",
    icon: (<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />),
  },
  {
    label: "Telegram",
    value: "t.me/cyberstrikeforce72",
    href: "https://t.me/cyberstrikeforce72",
    icon: (<path d="M21.5 4.5 2.5 12l6 2 2 6 4-4 5 4 2-15.5z" />),
  },
] as const;

export default function ContactPage() {
  useScrollReveal();
  useEffect(() => { document.title = "Contact — Cyber Strike Force"; }, []);
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative isolate overflow-hidden px-6 pt-16 pb-20 sm:pt-24">
        <CyberBackground />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="reveal"><span className="eyebrow">Contact</span></div>
          <h1 className="display-h1 reveal mt-6" style={{ transitionDelay: "60ms" }}>
            Get in <span className="gradient-text">touch</span>.
          </h1>
          <p className="reveal mx-auto mt-6 max-w-xl text-base text-slate-300 sm:text-lg" style={{ transitionDelay: "120ms" }}>
            For inquiries, partnerships, or media — reach out through any of the channels below.
            We respond promptly and treat every message with discretion.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
          {ITEMS.map((it, i) => (
            <a
              key={it.label}
              href={it.href}
              target={it.href.startsWith("http") ? "_blank" : undefined}
              rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="feature-card reveal block"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="icon-chip">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {it.icon}
                </svg>
              </div>
              <p className="mt-5 font-display text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                {it.label}
              </p>
              <p className="mt-2 font-display text-base font-semibold text-white">
                {it.value}
              </p>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
