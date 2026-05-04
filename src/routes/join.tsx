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
  const [rulesOpen, setRulesOpen] = useState(false);
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

      <section className="px-6 py-10">
        <div className="mx-auto w-full max-w-3xl">
          {/* Closed notice banner */}
          <div className="mb-8 flex flex-col items-center gap-3 border border-red-500/40 bg-red-500/10 p-5 text-center shadow-[0_0_24px_-8px_rgba(239,68,68,0.5)]">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">
              <span className="h-2 w-2 animate-pulse bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              Notice
            </span>
            <p className="font-orbitron text-sm font-bold uppercase tracking-[2px] text-white sm:text-base">
              Applications are currently closed.
            </p>
            <p className="font-bangla max-w-md text-xs leading-relaxed text-muted-foreground">
              নতুন আবেদন গ্রহণ আপাতত বন্ধ রয়েছে। পরবর্তী রিক্রুটমেন্ট চালু হলে অফিসিয়াল পেজে ঘোষণা দেওয়া হবে।
            </p>
          </div>

          {/* Form (read-only / disabled visual) */}
          <div className="glass-card p-6 sm:p-10">
            {accepted ? (
              <JoinForm />
            ) : (
              <div className="flex flex-col items-center gap-5 text-center">
                <h2 className="font-orbitron text-lg font-bold uppercase tracking-[2px] text-white">
                  Application Form
                </h2>
                <p className="text-sm text-muted-foreground">
                  Please review the rules before opening the form.
                </p>
                <button onClick={() => setRulesOpen(true)} className="btn-cyber">
                  REVIEW RULES
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
