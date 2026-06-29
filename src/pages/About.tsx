import { Link } from "react-router-dom";
import { useEffect } from "react";
import { SiteHeader, SiteFooter, BackToTop } from "@/components/SiteHeader";
import { CyberBackground } from "@/components/CyberBackground";
import { useScrollReveal } from "@/hooks/useReveal";

const PILLARS = [
  { t: "Our Mission", d: "To build a resilient cyber defense ecosystem in Bangladesh by training, mobilizing, and coordinating skilled volunteers." },
  { t: "Our Vision", d: "A digitally secure Bangladesh, defended by a generation of capable, ethical and patriotic cyber operators." },
  { t: "Our Values", d: "Integrity, discipline, continuous learning, and an unwavering commitment to the national interest." },
  { t: "Our Approach", d: "Education, threat research, coordinated response, and community-led capacity building." },
] as const;

export default function AboutPage() {
  useScrollReveal();
  useEffect(() => { document.title = "About — Cyber Strike Force"; }, []);
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative isolate overflow-hidden px-6 pt-16 pb-20 sm:pt-24">
        <CyberBackground />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="reveal"><span className="eyebrow">About Us</span></div>
          <h1 className="display-h1 reveal mt-6" style={{ transitionDelay: "60ms" }}>
            A patriotic team of <span className="gradient-text">cyber defenders</span>.
          </h1>
          <p className="reveal mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg" style={{ transitionDelay: "120ms" }}>
            Cyber Strike Force is a volunteer-driven cyber defense initiative dedicated to safeguarding
            Bangladesh's digital sovereignty. We bring discipline, transparency, and care to every operation.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          {PILLARS.map((c, i) => (
            <article key={c.t} className="feature-card reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <h2 className="font-display text-lg font-semibold text-white">{c.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{c.d}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <Link to="/join" className="btn btn-primary">Join the Team</Link>
        </div>
      </section>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
