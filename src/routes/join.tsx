import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import { JoinForm } from "@/components/JoinForm";
import { RulesDialog } from "@/components/RulesDialog";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join the Team — Cyber Strike Force" },
      {
        name: "description",
        content:
          "Apply to join Cyber Strike Force, Bangladesh's elite cyber defense team. Submit your application online.",
      },
      { property: "og:title", content: "Join the Team — Cyber Strike Force" },
      {
        property: "og:description",
        content: "Apply to join Bangladesh's elite cyber defense team.",
      },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  const [rulesOpen, setRulesOpen] = useState(true);
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <SiteHeader />

      <RulesDialog
        open={rulesOpen}
        onOpenChange={setRulesOpen}
        onContinue={() => {
          setAccepted(true);
          setRulesOpen(false);
        }}
      />

      <section className="relative overflow-hidden border-b border-border px-6 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-50" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="font-bangla animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold-soft)]/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold-deep)]" />
            Application
          </span>
          <h1 className="animate-fade-up delay-100 font-display mt-2 text-4xl font-bold sm:text-5xl">
            Join <span className="text-gold">CSF</span>
          </h1>
          <div className="animate-fade-up delay-200 mx-auto my-5 gold-divider" />
          <p className="animate-fade-up delay-300 font-bangla text-muted-foreground">
            We fight for Bangladesh
          </p>
        </div>
      </section>

      <section className="bg-secondary/30 px-6 py-16">
        <div className="mx-auto w-full max-w-2xl animate-fade-up">
          <div className="lift-card rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10">
            {accepted ? (
              <JoinForm />
            ) : (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <p className="font-bangla text-muted-foreground">
                  ফর্ম দেখতে আবেদনের নিয়মাবলী পড়ুন এবং Continue ক্লিক করুন।
                </p>
                <button
                  type="button"
                  onClick={() => setRulesOpen(true)}
                  className="font-bangla rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
                >
                  নিয়মাবলী দেখুন
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
