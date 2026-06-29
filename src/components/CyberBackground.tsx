import { useEffect, useRef } from "react";

/**
 * Premium ambient background:
 *  - Slow drifting node network (blue + purple)
 *  - Two soft aurora orbs that breathe
 *  - Honors prefers-reduced-motion (renders a single static frame)
 *  - Auto-pauses when off-screen / tab hidden
 */
export function CyberBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let running = true;

    type P = { x: number; y: number; vx: number; vy: number; hue: number };
    let particles: P[] = [];

    const isSmall = () => window.innerWidth < 640;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = isSmall() ? 22 : Math.min(60, Math.floor((width * height) / 28000));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        hue: Math.random() > 0.55 ? 260 : 205, // purple or blue
      }));
    };

    const linkDist = () => (isSmall() ? 90 : 140);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const ld = linkDist();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < ld * ld) {
            const alpha = 1 - Math.sqrt(d2) / ld;
            const hue = (a.hue + b.hue) / 2;
            ctx.strokeStyle = `hsla(${hue}, 90%, 70%, ${alpha * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of particles) {
        ctx.fillStyle = `hsla(${p.hue}, 95%, 72%, 0.85)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(tick);
    };

    resize();
    if (reduce) {
      draw();
    } else {
      tick();
    }

    const onResize = () => resize();
    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduce) tick();
      else cancelAnimationFrame(raf);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="aurora aurora--blue" />
      <div className="aurora aurora--purple" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      <div className="absolute inset-0 grid-fade" />
    </div>
  );
}
