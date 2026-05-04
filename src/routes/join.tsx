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
          <div className="glass-card rounded-2xl p-8 sm:p-12">
            <div className="flex flex-col items-center gap-5 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-red-400 shadow-[0_0_18px_-4px_rgba(239,68,68,0.55)]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                CLOSED
              </span>
              <h2 className="font-orbitron text-xl font-bold uppercase tracking-[2px] text-white sm:text-2xl">
                Applications are currently closed
              </h2>
              <p className="font-bangla max-w-md text-sm leading-relaxed text-muted-foreground">
                নতুন আবেদন গ্রহণ আপাতত বন্ধ রয়েছে। পরবর্তী রিক্রুটমেন্ট চালু হলে আমাদের অফিসিয়াল
                পেজে ঘোষণা দেওয়া হবে।
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/70">
                Follow our official Facebook page for updates
              </p>
              <a
                href="https://facebook.com/cyberstrikeforceCSF"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber mt-2"
              >
                FACEBOOK PAGE
              </a>
            </div>
          </div>
          {/* Hidden suppressed references to avoid unused warnings */}
          <div className="hidden">
            {accepted ? <JoinForm /> : null}
            <button onClick={() => setRulesOpen(true)} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
