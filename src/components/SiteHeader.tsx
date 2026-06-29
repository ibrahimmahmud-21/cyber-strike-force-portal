import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "@/assets/csf-logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/join", label: "Join" },
  { to: "/contact", label: "Contact" },
  { to: "/policy", label: "Policy" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#070912]/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full opacity-70 blur-md"
              style={{ background: "var(--gradient-brand)" }}
            />
            <img
              src={logo}
              alt="CSF"
              className="relative h-9 w-9 rounded-full border border-white/15 object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="font-display text-[13px] font-bold tracking-tight text-white sm:text-sm">
              Cyber Strike Force
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
              We fight for Bangladesh
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 font-display text-sm font-medium transition ${
                  isActive
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/5"
                    />
                  )}
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
          <Link to="/join" className="btn btn-primary ml-3 h-10 px-5 text-sm">
            Get Started
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-white/15 bg-white/5 p-2 text-white transition hover:border-white/30 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
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
        <div className="border-t border-white/10 bg-[#070912]/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-3" aria-label="Mobile">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-l-2 px-3 py-3 font-display text-sm transition ${
                    isActive
                      ? "border-sky-400 text-white"
                      : "border-transparent text-slate-300 hover:border-violet-400/60 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/join"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-3 w-full"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#06080f]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hr-glow" aria-hidden />
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full opacity-70 blur-md"
                  style={{ background: "var(--gradient-brand)" }}
                />
                <img src={logo} alt="" className="relative h-10 w-10 rounded-full border border-white/15 object-cover" />
              </div>
              <p className="font-display text-base font-bold text-white">Cyber Strike Force</p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              A mission-driven cyber defense initiative protecting Bangladesh's digital frontier
              through intelligence, response, and community-led security operations.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:border-violet-400/50 hover:bg-white/10 hover:text-white hover:shadow-[0_8px_28px_-10px_rgba(167,139,250,0.55)]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">Navigate</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/join", label: "Join the Team" },
                { to: "/contact", label: "Contact" },
                { to: "/policy", label: "Policy" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a className="transition hover:text-white" href="mailto:CyberStrikeforce@outlook.com">
                  CyberStrikeforce@outlook.com
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href="https://t.me/cyberstrikeforce72" target="_blank" rel="noopener noreferrer">
                  t.me/cyberstrikeforce72
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href="https://facebook.com/cyberstrikeforceCSF" target="_blank" rel="noopener noreferrer">
                  facebook.com/cyberstrikeforceCSF
                </a>
              </li>
              <li className="text-slate-500">Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 hr-glow" />
        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Cyber Strike Force. All rights reserved.</p>
          <p className="font-display tracking-[0.18em] uppercase">We fight for Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/cyberstrikeforceCSF",
    icon: (<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />),
  },
  {
    label: "Telegram",
    href: "https://t.me/cyberstrikeforce72",
    icon: (<path d="M21.5 4.5 2.5 12l6 2 2 6 4-4 5 4 2-15.5z" />),
  },
  {
    label: "Email",
    href: "mailto:CyberStrikeforce@outlook.com",
    icon: (<><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></>),
  },
] as const;

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
      className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-100 backdrop-blur-md transition-all duration-300 hover:border-violet-400/50 hover:bg-white/10 hover:shadow-[0_8px_28px_-8px_rgba(167,139,250,0.6)] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
