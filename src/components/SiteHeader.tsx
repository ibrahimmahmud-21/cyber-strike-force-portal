import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/csf-logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/join", label: "Join With Us" },
  { to: "/policy", label: "Policy" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="rounded-full bg-foreground/10 p-1 ring-1 ring-[#00d4ff]/60 transition group-hover:ring-[#00d4ff] group-hover:shadow-[0_0_18px_-2px_rgba(0,212,255,0.55)]">
            <img src={logo} alt="CSF" className="h-9 w-9 rounded-full object-cover" />
          </div>
          <div className="leading-tight">
            <p className="font-orbitron text-[12px] font-bold tracking-[2px] text-[#00d4ff] sm:text-[13px]">
              CYBER STRIKE FORCE
            </p>
            <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
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
              activeProps={{ className: "text-[#00d4ff] after:scale-x-100" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-[#00d4ff]" }}
              className="font-orbitron relative px-4 py-2 text-[10px] tracking-[2px] uppercase transition after:absolute after:bottom-1 after:left-1/2 after:h-px after:w-6 after:-translate-x-1/2 after:bg-[#00d4ff] after:transition-transform after:duration-300 after:scale-x-0"
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
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
    <footer className="border-t border-[rgba(0,212,255,0.2)] bg-[#030508]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-9 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-orbitron text-[12px] font-bold tracking-[3px] text-[#00d4ff]">
          CYBER STRIKE FORCE
        </p>
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          We fight for Bangladesh
        </p>
        <p className="text-[11px] tracking-[1px] text-muted-foreground/60">
          © 2026 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
