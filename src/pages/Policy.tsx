import { SiteHeader, SiteFooter, BackToTop } from "@/components/SiteHeader";
import { CyberBackground } from "@/components/CyberBackground";
import { useScrollReveal } from "@/hooks/useReveal";
import { useEffect } from "react";

const sections = [
  { t: "Mission Integrity", d: "Members operate strictly within the law and the team's defensive mandate. Any offensive activity, vigilantism, or unauthorized access is forbidden and grounds for immediate removal." },
  { t: "Confidentiality", d: "Internal channels, intelligence, member identities, and operational details are confidential. Sharing internal materials publicly without approval is a violation." },
  { t: "Privacy of Applicants", d: "Personal information submitted through the Join form (name, NID, photos, contact details) is used only for verification by authorized admins and is never sold or shared with third parties." },
  { t: "Conduct", d: "Respect for fellow members, the public, and the nation is mandatory. Harassment, hate speech, communalism, and political partisanship inside team channels are not tolerated." },
  { t: "Account & Data", d: "You may request removal of your application data at any time by contacting the admin team. Approved members may request deactivation; some operational logs may be retained for audit." },
  { t: "Updates", d: "This policy may be updated as the team evolves. Continued participation implies acceptance of the latest version." },
];

export default function PolicyPage() {
  useScrollReveal();
  useEffect(() => { document.title = "Policy — Cyber Strike Force"; }, []);
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative isolate overflow-hidden px-6 pt-16 pb-16 sm:pt-24">
        <CyberBackground />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="reveal"><span className="eyebrow">Operational Policy</span></div>
          <h1 className="display-h1 reveal mt-6" style={{ transitionDelay: "60ms" }}>
            Our <span className="gradient-text">code</span> of honor.
          </h1>
          <p className="reveal mx-auto mt-5 max-w-xl text-base text-slate-300" style={{ transitionDelay: "120ms" }}>
            We fight for Bangladesh — under strict ethical, legal, and operational standards.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl space-y-5">
          {sections.map((s, i) => (
            <article key={s.t} className="feature-card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <h2 className="flex items-start gap-3 font-display text-lg font-semibold text-white">
                <span className="gradient-text font-mono text-sm tracking-wider">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{s.t}</span>
              </h2>
              <p
                className="mt-4 text-[15px] text-slate-300"
                style={{ lineHeight: 1.8, letterSpacing: "normal", wordSpacing: "normal", textAlign: "left", hyphens: "none" }}
              >
                {s.d}
              </p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
