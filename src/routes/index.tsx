import { createFileRoute, Link } from "@tanstack/react-router";
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
    <div className="min-h-screen bg-background text-foreground font-rajdhani">
      <Toaster position="top-center" richColors />
      <div className="scan-line" />

      <SiteHeader />

      {/* HERO */}
      <section className="hex-grid relative z-10 flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-20 text-center">
        <CyberBackground />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(0,212,255,0.10) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 80% 70%, rgba(0,100,180,0.07) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mb-9 float-slow">
          <div className="relative mx-auto h-[180px] w-[180px] sm:h-[210px] sm:w-[210px]">
            <span className="pulse-ring" />
            <span className="pulse-ring delay-1" />
            <span className="pulse-ring delay-2" />
            <div className="logo-cyber-ring relative z-10 h-full w-full overflow-hidden rounded-full">
              <img src={logo} alt="Cyber Strike Force Logo" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        <h1
          className="relative z-10 font-orbitron font-black text-white animate-fade-up delay-100"
          style={{
            fontSize: "clamp(30px, 7.5vw, 64px)",
            letterSpacing: "5px",
            lineHeight: 1.1,
            textShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(0,212,255,0.15)",
          }}
        >
          CYBER STRIKE
          <br />
          FORCE
        </h1>

        <p
          className="relative z-10 mt-4 font-rajdhani font-semibold uppercase text-[#00d4ff] animate-fade-up delay-200"
          style={{ fontSize: "clamp(15px, 3vw, 20px)", letterSpacing: "5px" }}
        >
          We fight for Bangladesh
        </p>
        <p className="relative z-10 mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground animate-fade-up delay-300">
          Defending the Digital Frontier — Standing United
        </p>

      </section>

      {/* MISSION */}
      <section className="relative border-y border-[rgba(0,212,255,0.2)] bg-[#0a0d18] px-6 py-20">
        <div className="mx-auto max-w-3xl reveal">
          <p className="font-orbitron text-[11px] uppercase tracking-[0.3em] text-[#00d4ff]">
            // Mission Briefing
          </p>
          <h2 className="font-orbitron mt-3 text-2xl font-bold text-white sm:text-3xl">
            Defending the Digital Frontier
          </h2>
          <div className="mt-5 mb-10 h-[2px] w-14 bg-gradient-to-r from-[#00d4ff] to-transparent" />
          <div className="mission-box">
            <p className="text-[17px] leading-[1.9] text-[#aab4cc]">
              <strong className="text-[#00d4ff]">Cyber Strike Force</strong> is an independent,
              mission-driven cybersecurity initiative committed to protecting Bangladesh's digital
              frontier. We safeguard <strong className="text-[#00d4ff]">vulnerable communities</strong>{" "}
              from cyber threats, online harassment, misinformation, and targeted digital attacks —
              standing united for a safer national cyberspace.
              <br />
              <br />
              We fight for <strong className="text-[#00d4ff]">Bangladesh</strong>. We protect the
              innocent. We stand against digital darkness.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-10">
            <p className="font-orbitron text-[11px] uppercase tracking-[0.3em] text-[#00d4ff]">
              // What We Stand For
            </p>
            <h2 className="font-orbitron mt-3 text-2xl font-bold text-white sm:text-3xl">
              Three Pillars
            </h2>
            <div className="mt-5 h-[2px] w-14 bg-gradient-to-r from-[#00d4ff] to-transparent" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "DEFENSE",
                d: "Protecting Bangladesh's digital infrastructure from emerging threats and targeted cyber attacks.",
                icon: (
                  <>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </>
                ),
              },
              {
                t: "INTELLIGENCE",
                d: "Continuous monitoring, research and threat intelligence operations across the digital landscape.",
                icon: (
                  <>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </>
                ),
              },
              {
                t: "COMMUNITY",
                d: "A united team of patriotic cyber warriors trained and ready for the challenges of tomorrow.",
                icon: (
                  <>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </>
                ),
              },
            ].map((p, i) => (
              <div
                key={p.t}
                className="pillar-card reveal"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="pillar-num">0{i + 1}</div>
                <div className="pillar-icon-wrap">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {p.icon}
                  </svg>
                </div>
                <h3 className="font-orbitron text-[13px] font-bold tracking-[2px] text-white">
                  {p.t}
                </h3>
                <p className="mt-3 text-sm leading-[1.75] text-[#aab4cc]">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section className="relative border-t border-[rgba(0,212,255,0.2)] bg-[#0a0d18] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="reveal mb-10">
            <p className="font-orbitron text-[11px] uppercase tracking-[0.3em] text-[#00d4ff]">
              // Contact &amp; Connect
            </p>
            <h2 className="font-orbitron mt-3 text-2xl font-bold text-white sm:text-3xl">
              Get in Touch
            </h2>
            <div className="mt-5 h-[2px] w-14 bg-gradient-to-r from-[#00d4ff] to-transparent" />
          </div>

          <div
            className="grid gap-3.5"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
          >
            {[
              {
                label: "FACEBOOK PAGE",
                href: "https://facebook.com/cyberstrikeforceCSF",
                icon: (
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                ),
              },
              {
                label: "TELEGRAM CHANNEL",
                href: "https://t.me/cyberstrikeforce",
                icon: (
                  <path d="M21.5 4.5 2.5 12l6 2 2 6 4-4 5 4 2-15.5z" />
                ),
              },
              {
                label: "EMAIL",
                href: "mailto:CyberStrikeforce@outlook.com",
                icon: (
                  <>
                    <rect x="3" y="5" width="18" height="14" rx="1" />
                    <path d="m3 7 9 6 9-6" />
                  </>
                ),
              },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="con-btn reveal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {l.icon}
                </svg>
                {l.label}
              </a>
            ))}
          </div>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground/70">
            <a href="mailto:CyberStrikeforce@outlook.com" className="text-[#00d4ff] hover:underline">CyberStrikeforce@outlook.com</a>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
