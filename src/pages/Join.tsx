import { useState, useEffect } from "react";
import { SiteHeader, SiteFooter, BackToTop } from "@/components/SiteHeader";
import { CyberBackground } from "@/components/CyberBackground";
import { Toaster } from "@/components/ui/sonner";
import { JoinForm } from "@/components/JoinForm";
import { RulesDialog } from "@/components/RulesDialog";

export default function JoinPage() {
  const [rulesOpen, setRulesOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  useEffect(() => { document.title = "Join the Team — Cyber Strike Force"; }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
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

      <section className="relative isolate overflow-hidden px-6 pt-16 pb-12 sm:pt-24">
        <CyberBackground />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="reveal"><span className="eyebrow">Application</span></div>
          <h1 className="display-h1 reveal mt-6" style={{ transitionDelay: "60ms" }}>
            Become a <span className="gradient-text">Cyber Warrior</span>.
          </h1>
          <p className="reveal mt-5 text-base text-slate-300 sm:text-lg" style={{ transitionDelay: "120ms" }}>
            Join a disciplined, mission-first community defending Bangladesh's digital frontier.
          </p>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-8 flex flex-col items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/8 p-5 text-center backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-red-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
              Notice
            </span>
            <p className="font-display text-base font-semibold text-white sm:text-lg">
              Applications are currently closed.
            </p>
            <p className="font-bangla max-w-md text-sm leading-relaxed text-slate-300">
              নতুন আবেদন গ্রহণ আপাতত বন্ধ রয়েছে। পরবর্তী রিক্রুটমেন্ট চালু হলে অফিসিয়াল পেজে ঘোষণা দেওয়া হবে।
            </p>
          </div>

          <div className="glass-strong p-6 sm:p-10">
            {accepted ? (
              <JoinForm />
            ) : (
              <div className="flex flex-col items-center gap-5 text-center">
                <h2 className="font-display text-xl font-semibold text-white">
                  Application Form
                </h2>
                <p className="max-w-md text-sm text-slate-400">
                  Please review the rules before opening the form.
                </p>
                <button onClick={() => setRulesOpen(true)} className="btn btn-primary">
                  Review Rules
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
