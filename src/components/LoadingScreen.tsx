import { useEffect, useState } from "react";

/**
 * One-shot premium boot splash. Mounts on first paint and fades out after the
 * window load event (or a short timeout fallback).
 */
export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Remove the static boot div from index.html immediately — we render our own.
    const boot = document.getElementById("csf-boot");
    if (boot) boot.remove();

    const hide = () => setHidden(true);
    if (document.readyState === "complete") {
      const t = setTimeout(hide, 250);
      return () => clearTimeout(t);
    }
    const onLoad = () => setTimeout(hide, 200);
    window.addEventListener("load", onLoad);
    const fallback = setTimeout(hide, 1400);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const t = setTimeout(() => setRemoved(true), 600);
    return () => clearTimeout(t);
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#070912] transition-opacity duration-500 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-2 border-white/5" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "#7dd3fc",
              borderRightColor: "#a78bfa",
              animation: "csf-spin 0.95s linear infinite",
            }}
          />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-sky-400/30 to-violet-500/30 blur-md" />
        </div>
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-400">
          Cyber Strike Force
        </p>
      </div>
      <style>{`@keyframes csf-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
