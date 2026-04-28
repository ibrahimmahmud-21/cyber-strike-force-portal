import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/csf-logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/join", label: "Join" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="rounded-full bg-foreground p-1 ring-1 ring-[var(--gold)]/40 transition group-hover:ring-[var(--gold)]">
            <img src={logo} alt="CSF" className="h-9 w-9 rounded-full object-cover" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-sm font-bold tracking-wide sm:text-base">
              CYBER STRIKE <span className="text-gold">FORCE</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              We fight for Bangladesh
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-foreground after:scale-x-100" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="relative px-4 py-2 text-sm font-medium transition after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:bg-[var(--gradient-gold)] after:transition-transform after:duration-300 after:scale-x-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/join"
            className="group relative ml-3 inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:shadow-[0_10px_24px_-10px_rgba(212,175,55,0.6)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--gradient-gold)] transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Join Team</span>
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-border p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} Cyber Strike Force
        </p>
        <p className="text-xs text-muted-foreground">We fight for Bangladesh</p>
      </div>
    </footer>
  );
}
