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
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden px-6 py-24">
        <CyberBackground />
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-40" />
        <div className="relative mx-auto max-w-3xl">
          <div className="text-center reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80">
              // Operational Rules
            </p>
            <h1 className="font-display mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              Team{" "}
              <span className="bg-[var(--gradient-neon)] bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="mt-4 text-sm text-muted-foreground/80">
              We fight for Bangladesh — under a strict code of honor.
            </p>
          </div>

          <div className="mt-14 space-y-5">
            {sections.map((s, i) => (
              <article
                key={s.t}
                className="reveal glass-card rounded-2xl p-7"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <h2 className="font-display text-xl font-bold tracking-tight">
                  <span className="text-gold">// </span>
                  {s.t}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
