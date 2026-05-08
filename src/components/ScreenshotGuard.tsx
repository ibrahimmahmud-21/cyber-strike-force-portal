import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function ScreenshotGuard() {
  const { pathname } = useLocation();
  const [blackout, setBlackout] = useState(false);
  const exempt = pathname.startsWith("/join");

  useEffect(() => {
    if (exempt) {
      document.body.classList.remove("ss-protected");
      return;
    }
    document.body.classList.add("ss-protected");

    const flash = (ms = 2000) => {
      setBlackout(true);
      window.setTimeout(() => setBlackout(false), ms);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        try { navigator.clipboard?.writeText(""); } catch {}
        flash(2000);
      }
    };
    const onCtx = (e: MouseEvent) => e.preventDefault();
    const onVis = () => { if (document.hidden) flash(800); };

    window.addEventListener("keyup", onKey);
    window.addEventListener("keydown", onKey);
    window.addEventListener("contextmenu", onCtx);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("contextmenu", onCtx);
      document.removeEventListener("visibilitychange", onVis);
      document.body.classList.remove("ss-protected");
    };
  }, [exempt]);

  if (exempt || !blackout) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 2147483647,
        pointerEvents: "all",
      }}
      aria-hidden
    />
  );
}
