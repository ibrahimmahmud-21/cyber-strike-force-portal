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
    <div className="min-h-screen bg-background text-foreground font-rajdhani">
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

      <section className="relative overflow-hidden border-b border-[rgba(0,212,255,0.2)] px-6 py-14">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-40" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-orbitron text-[11px] uppercase tracking-[0.3em] text-[#00d4ff]">
            // Application
          </p>
          <h1 className="font-orbitron mt-3 text-3xl font-black text-white sm:text-4xl" style={{ letterSpacing: "3px" }}>
            JOIN <span className="text-[#00d4ff]">CSF</span>
          </h1>
          <div className="mx-auto mt-4 h-[2px] w-14 bg-gradient-to-r from-[#00d4ff] to-transparent" />
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            We fight for Bangladesh
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto w-full max-w-2xl">
          <div className="glass-card rounded-2xl p-6 sm:p-10">
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
                  className="btn-cyber font-bangla"
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
