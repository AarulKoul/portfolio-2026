"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const LINES = ["AARUL", "KOUL"];

/**
 * The hero headline is set in a variable font (Inter Tight, wght 100–900).
 * Each letter's weight is driven per-frame: near the cursor letters swell
 * toward 900, far letters relax toward 280. With no cursor activity the
 * weights breathe in a slow wave, so the name is alive on load and on touch
 * devices. Reduced motion pins everything at 800.
 */
export default function HeroName() {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const letters = Array.from(
      el.querySelectorAll<HTMLSpanElement>("[data-letter]")
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      letters.forEach((letter) => (letter.style.fontWeight = "800"));
      return;
    }

    const weights = letters.map(() => 320);
    let mouse: { x: number; y: number } | null = null;
    let lastMove = 0;
    let inView = true;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      lastMove = performance.now();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    observer.observe(el);

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!inView) return;
      const cursorActive = mouse !== null && now - lastMove < 2500;
      const reach = Math.max(240, window.innerWidth * 0.22);
      letters.forEach((letter, i) => {
        let target: number;
        if (cursorActive && mouse) {
          const rect = letter.getBoundingClientRect();
          const dist = Math.hypot(
            mouse.x - (rect.left + rect.width / 2),
            mouse.y - (rect.top + rect.height / 2)
          );
          target = 900 - Math.min(dist / reach, 1) * 620;
        } else {
          target = 480 + 320 * Math.sin(now / 700 + i * 0.55);
        }
        weights[i] += (target - weights[i]) * 0.14;
        letter.style.fontWeight = String(Math.round(weights[i]));
      });
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <h1 ref={root} aria-label="Aarul Koul" className="select-none">
      {LINES.map((line, lineIndex) => (
        <span
          key={line}
          aria-hidden
          className={`mask ${lineIndex === 1 ? "pl-[9vw]" : ""}`}
        >
          <span
            className="block text-[clamp(4.5rem,16vw,15.5rem)] leading-[0.86] tracking-[-0.045em]"
            style={{ "--d": `${150 + lineIndex * 130}ms` } as CSSProperties}
          >
            {line.split("").map((char, i) => (
              <span
                key={i}
                data-letter
                className="inline-block"
                style={{ fontWeight: 320 }}
              >
                {char}
              </span>
            ))}
            {lineIndex === 1 && (
              <span className="caret ml-[0.07em] inline-block h-[0.74em] w-[0.06em] bg-blue" />
            )}
          </span>
        </span>
      ))}
    </h1>
  );
}
