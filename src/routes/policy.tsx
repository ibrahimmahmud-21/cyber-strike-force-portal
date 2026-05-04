import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { CyberBackground } from "@/components/CyberBackground";
import { useScrollReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/policy")({
  head: () => ({
    meta: [
      { title: "Policy — Cyber Strike Force" },
      {
        name: "description",
        content:
          "Cyber Strike Force policy: code of conduct, privacy, and operational rules for members and applicants.",
      },
      { property: "og:title", content: "Policy — Cyber Strike Force" },
      {
        property: "og:description",
        content: "Code of conduct, privacy, and operational rules for Cyber Strike Force.",
      },
    ],
  }),
  component: PolicyPage,
});

const sections = [
  {
    t: "Mission Integrity",
    d: "Members operate strictly within the law and the team's defensive mandate. Any offensive activity, vigilantism, or unauthorized access is forbidden and grounds for immediate removal.",
  },
  {
    t: "Confidentiality",
    d: "Internal channels, intelligence, member identities, and operational details are confidential. Sharing internal materials publicly without approval is a violation.",
  },
  {
    t: "Privacy of Applicants",
    d: "Personal information submitted through the Join form (name, NID, photos, contact details) is used only for verification by authorized admins and is never sold or shared with third parties.",
  },
  {
    t: "Conduct",
    d: "Respect for fellow members, the public, and the nation is mandatory. Harassment, hate speech, communalism, and political partisanship inside team channels are not tolerated.",
  },
  {
    t: "Account & Data",
    d: "You may request removal of your application data at any time by contacting the admin team. Approved members may request deactivation; some operational logs may be retained for audit.",
  },
  {
    t: "Updates",
    d: "This policy may be updated as the team evolves. Continued participation implies acceptance of the latest version.",
  },
];

function PolicyPage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground font-rajdhani">
      <SiteHeader />
      <section className="relative overflow-hidden px-6 py-20">
        <CyberBackground />
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl">
          <div className="text-center reveal">
            <p className="font-orbitron text-[11px] uppercase tracking-[0.3em] text-[#00d4ff]">
              // Operational Rules
            </p>
            <h1
              className="font-orbitron mt-4 text-3xl font-black text-white sm:text-4xl"
              style={{ letterSpacing: "3px" }}
            >
              TEAM <span className="text-[#00d4ff]">POLICY</span>
            </h1>
            <div className="mx-auto mt-5 h-[2px] w-14 bg-gradient-to-r from-[#00d4ff] to-transparent" />
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              We fight for Bangladesh — under a strict code of honor.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {sections.map((s, i) => (
              <article
                key={s.t}
                className="reveal pillar-card"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <h2 className="font-orbitron text-[15px] font-bold uppercase tracking-[2px] text-white">
                  <span className="text-[#00d4ff]">{String(i + 1).padStart(2, "0")} // </span>
                  {s.t}
                </h2>
                <p
                  className="mt-4 text-[15px] text-[#cbd3e1]"
                  style={{
                    lineHeight: 1.85,
                    letterSpacing: "normal",
                    wordSpacing: "normal",
                    textAlign: "left",
                    hyphens: "none",
                  }}
                >
                  {s.d}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
