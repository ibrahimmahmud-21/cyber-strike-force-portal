import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { CyberBackground } from "@/components/CyberBackground";
import { useScrollReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Cyber Strike Force" },
      {
        name: "description",
        content:
          "Learn about Cyber Strike Force — Bangladesh's volunteer cyber defense team protecting national digital assets.",
      },
      { property: "og:title", content: "About — Cyber Strike Force" },
      {
        property: "og:description",
        content: "Bangladesh's volunteer cyber defense team. Learn our mission.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground font-rajdhani">
      <SiteHeader />

      <section className="hex-grid relative overflow-hidden border-b border-[rgba(0,212,255,0.2)] px-6 py-20">
        <CyberBackground />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-orbitron text-[11px] uppercase tracking-[0.3em] text-[#00d4ff]">
            // About Us
          </p>
          <h1 className="font-orbitron mt-4 text-3xl font-black text-white sm:text-5xl" style={{ letterSpacing: "3px" }}>
            ABOUT <span className="text-[#00d4ff]">CSF</span>
          </h1>
          <div className="mx-auto mt-5 h-[2px] w-14 bg-gradient-to-r from-[#00d4ff] to-transparent" />
          <p className="mt-5 mx-auto max-w-2xl text-base text-[#aab4cc]">
            Cyber Strike Force is a volunteer-driven cyber defense initiative dedicated to safeguarding
            Bangladesh's digital sovereignty.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          {[
            { t: "Our Mission", d: "To build a resilient cyber defense ecosystem in Bangladesh by training, mobilizing, and coordinating skilled volunteers." },
            { t: "Our Vision", d: "A digitally secure Bangladesh, defended by a generation of capable, ethical and patriotic cyber warriors." },
            { t: "Our Values", d: "Integrity, discipline, continuous learning, and an unwavering commitment to national interest." },
            { t: "Our Approach", d: "Education, threat research, coordinated response and community-led capacity building." },
          ].map((c, i) => (
            <div key={c.t} className="pillar-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <h2 className="font-orbitron text-[14px] font-bold tracking-[2px] text-white">{c.t.toUpperCase()}</h2>
              <p className="mt-3 text-sm leading-[1.75] text-[#aab4cc]">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <Link to="/join" className="btn-cyber">JOIN THE TEAM</Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
