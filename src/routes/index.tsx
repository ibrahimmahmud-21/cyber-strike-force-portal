import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { JoinForm } from "@/components/JoinForm";
import logo from "@/assets/csf-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  function scrollToForm() {
    document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.92_0.06_88/0.35),transparent_60%)]" />

        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
          <div className="mb-10">
            <div className="rounded-full bg-foreground p-4 shadow-[0_20px_60px_-20px_rgba(212,175,55,0.5)] ring-1 ring-[var(--gold)]/40">
              <img
                src={logo}
                alt="Cyber Strike Force Logo"
                className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"
              />
            </div>
          </div>

          <span className="font-bangla mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold-soft)]/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold-deep)]" />
            Cyber Strike Force
          </span>

          <h1 className="font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
            JOIN <span className="text-gold">TEAM</span>
          </h1>

          <div className="my-6 gold-divider" />

          <p className="font-bangla max-w-xl text-lg text-muted-foreground sm:text-xl">
            Become a Cyber Warrior of Bangladesh
          </p>

          <button
            onClick={scrollToForm}
            className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-10 py-4 text-base font-semibold tracking-wide text-primary-foreground shadow-[0_12px_32px_-12px_rgba(0,0,0,0.4)] transition hover:shadow-[0_18px_40px_-12px_rgba(212,175,55,0.55)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--gradient-gold)] transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Join Now</span>
            <svg
              className="relative h-4 w-4 transition-transform group-hover:translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* Form */}
      <section id="join-form" className="border-t border-border bg-secondary/30 px-6 py-20">
        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10">
            <JoinForm />
          </div>
          <p className="mt-8 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} Cyber Strike Force
          </p>
        </div>
      </section>
    </div>
  );
}
