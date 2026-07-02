"use client";

import { useEffect, useRef } from "react";
import DrawRule from "./draw-rule";

const SEGMENTS: { t: string; hl?: boolean }[] = [
  { t: "I build" },
  { t: "interfaces that ship", hl: true },
  {
    t: "— SaaS platforms in Next.js by trade, million-row datasets for sport. Design-grade on the surface, engineering-grade underneath.",
  },
];

const WORDS = SEGMENTS.flatMap((segment) =>
  segment.t
    .split(" ")
    .filter(Boolean)
    .map((word) => ({ word, hl: segment.hl }))
);

/**
 * Pinned scroll story: the section is 220vh tall, the statement sticks to
 * the viewport, and scroll progress ignites the words one by one — the
 * reader's own scroll sets the pace of the positioning statement.
 */
export default function Brief() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-st]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((span) => span.classList.add("on"));
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      const activeCount = Math.floor(progress * (spans.length + 2));
      spans.forEach((span, i) => span.classList.toggle("on", i < activeCount));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="brief" className="relative px-5 md:px-10">
      <div className="absolute inset-x-5 top-0 md:inset-x-10">
        <DrawRule className="text-rule" />
      </div>
      <div ref={wrap} className="relative h-[220vh]">
        <div className="sticky top-0 grid min-h-svh content-center gap-y-10 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
              <span className="text-blue">01</span> — Brief
            </p>
          </div>
          <p className="text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.12] tracking-[-0.03em] md:col-span-9">
            {WORDS.map(({ word, hl }, i) => (
              <span key={i} data-st className={`st-word ${hl ? "hl-w" : ""}`}>
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
