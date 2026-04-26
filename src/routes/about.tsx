import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border px-6 py-20">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-50" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="animate-fade-up font-display text-4xl font-bold sm:text-5xl">
            About <span className="text-gold">CSF</span>
          </h1>
          <div className="animate-fade-up delay-100 mx-auto my-5 gold-divider" />
          <p className="animate-fade-up delay-200 font-bangla mx-auto max-w-2xl text-lg text-muted-foreground">
            Cyber Strike Force is a volunteer-driven cyber defense initiative dedicated to safeguarding
            Bangladesh's digital sovereignty.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {[
            {
              t: "Our Mission",
              d: "To build a resilient cyber defense ecosystem in Bangladesh by training, mobilizing, and coordinating skilled volunteers.",
            },
            {
              t: "Our Vision",
              d: "A digitally secure Bangladesh, defended by a generation of capable, ethical and patriotic cyber warriors.",
            },
            {
              t: "Our Values",
              d: "Integrity, discipline, continuous learning, and an unwavering commitment to national interest.",
            },
            {
              t: "Our Approach",
              d: "Education, threat research, coordinated response and community-led capacity building.",
            },
          ].map((c, i) => (
            <div
              key={c.t}
              className={`lift-card rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] animate-fade-up delay-${(i + 1) * 100}`}
            >
              <h2 className="font-display text-xl font-bold">{c.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <Link
            to="/join"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-9 py-3.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(212,175,55,0.55)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--gradient-gold)] transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Join the Team</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
