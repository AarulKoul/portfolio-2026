"use client";

import { useEffect, useRef } from "react";

const LINES = ["AARUL", "KOUL"];
const GLYPHS = "ABCDEFGHIKMNORSTUVX#$%&<>/*+=?";

/**
 * The name arrives as signal resolving from noise: letters cycle random
 * glyphs and lock in left to right (after the boot sequence). Once
 * decoded, each letter's variable-font weight tracks the cursor — heavy
 * under the pointer, light at distance — with an idle breathing wave.
 */
export default function DecodeName() {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const letters = Array.from(
      el.querySelectorAll<HTMLSpanElement>("[data-letter]"),
    );
    const finals = letters.map((l) => l.dataset.letter ?? "");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      letters.forEach((letter) => (letter.style.fontWeight = "800"));
      return;
    }

    let frame = 0;
    let decodeStart = 0;
    let phase: "waiting" | "decoding" | "kinetic" = "waiting";
    const weights = letters.map(() => 420);
    let mouse: { x: number; y: number } | null = null;
    let lastMove = 0;
    let inView = true;

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

      if (phase === "decoding") {
        let allDone = true;
        letters.forEach((letter, i) => {
          const resolveAt = decodeStart + 350 + i * 95;
          if (now < resolveAt) {
            allDone = false;
            letter.textContent =
              GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            letter.style.fontWeight = String(300 + Math.random() * 500);
          } else {
            letter.textContent = finals[i];
          }
        });
        if (allDone) phase = "kinetic";
        return;
      }

      if (phase === "kinetic") {
        const cursorActive = mouse !== null && now - lastMove < 2500;
        const reach = Math.max(240, window.innerWidth * 0.22);
        letters.forEach((letter, i) => {
          let target: number;
          if (cursorActive && mouse) {
            const rect = letter.getBoundingClientRect();
            const dist = Math.hypot(
              mouse.x - (rect.left + rect.width / 2),
              mouse.y - (rect.top + rect.height / 2),
            );
            target = 900 - Math.min(dist / reach, 1) * 620;
          } else {
            target = 480 + 320 * Math.sin(now / 700 + i * 0.55);
          }
          weights[i] += (target - weights[i]) * 0.14;
          letter.style.fontWeight = String(Math.round(weights[i]));
        });
      }
    };

    const begin = () => {
      if (phase !== "waiting") return;
      phase = "decoding";
      decodeStart = performance.now();
    };
    if (window.__booted) begin();
    window.addEventListener("ak:booted", begin);

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("ak:booted", begin);
      observer.disconnect();
    };
  }, []);

  return (
    <h1 ref={root} aria-label="Aarul Koul" className="relative select-none">
      {LINES.map((line, lineIndex) => (
        <span
          key={line}
          aria-hidden
          className={`block ${lineIndex === 1 ? "pl-[9vw]" : ""}`}
        >
          <span className="block text-[clamp(4.5rem,16vw,15.5rem)] leading-[0.86] tracking-[-0.045em]">
            {line.split("").map((char, i) => (
              <span
                key={i}
                data-letter={char}
                className="inline-block"
                style={{ fontWeight: 420 }}
              >
                {char}
              </span>
            ))}
            {lineIndex === 1 && (
              <span className="caret ml-24 inline-block h-[0.74em] w-[0.03em] bg-blue" />
            )}
          </span>
        </span>
      ))}
    </h1>
  );
}
