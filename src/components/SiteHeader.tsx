import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "@/assets/csf-logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/join", label: "Join With Us" },
  { to: "/policy", label: "Policy" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl transition-all duration-300 ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="logo-circle-glow overflow-hidden bg-foreground/10 p-0.5">
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
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `font-orbitron relative px-4 py-2 text-[10px] tracking-[2px] uppercase transition after:absolute after:bottom-1 after:left-1/2 after:h-px after:w-6 after:-translate-x-1/2 after:bg-[#00d4ff] after:transition-transform after:duration-300 ${isActive ? "text-[#00d4ff] after:scale-x-100" : "text-muted-foreground hover:text-[#00d4ff] after:scale-x-0"}`
              }
            >
              {item.label.toUpperCase()}
            </NavLink>
          ))}
        </nav>


        <button
          onClick={() => setOpen((v) => !v)}
          className="border border-[#00d4ff]/40 bg-[#00d4ff]/5 p-2 text-[#00d4ff] transition hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 hover:shadow-[0_0_16px_-2px_rgba(0,212,255,0.55)] md:hidden"
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
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-orbitron border-l-2 border-transparent px-3 py-3 text-[11px] uppercase tracking-[2px] hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 hover:text-[#00d4ff] ${isActive ? "text-foreground" : "text-muted-foreground"}`
                }
              >
                {item.label}
              </NavLink>
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
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-9 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-orbitron text-[12px] font-bold tracking-[3px] text-[#00d4ff]">
          CYBER STRIKE FORCE
        </p>
        <div className="flex items-center gap-3">
          {[
            { href: "https://facebook.com/cyberstrikeforceCSF", label: "Facebook", icon: (<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />) },
            { href: "https://t.me/cyberstrikeforce72", label: "Telegram", icon: (<path d="M21.5 4.5 2.5 12l6 2 2 6 4-4 5 4 2-15.5z" />) },
            { href: "mailto:CyberStrikeforce@outlook.com", label: "Email", icon: (<><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></>) },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(0,212,255,0.35)] text-[#00d4ff] transition hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 hover:shadow-[0_0_18px_rgba(0,212,255,0.55)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {s.icon}
              </svg>
            </a>
          ))}
        </div>
        <p className="text-[11px] tracking-[1px] text-muted-foreground/60">
          © 2026 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`back-to-top ${visible ? "visible" : ""}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
