"use client";

import { useEffect, useRef } from "react";
import { education, records } from "@/lib/data";
import Reveal from "./reveal";

/**
 * The career timeline draws itself: a blue line grows down the rule as the
 * reader scrolls, and each version dot pops when the line reaches it —
 * scroll progress literally traverses the career.
 */
export default function Changelog() {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const lineEl = line.current;
    if (!el || !lineEl) return;
    const dots = Array.from(el.querySelectorAll<HTMLElement>("[data-dot]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lineEl.style.transform = "scaleY(1)";
      dots.forEach((dot) => dot.classList.add("on"));
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(
        Math.max((window.innerHeight * 0.72 - rect.top) / rect.height, 0),
        1
      );
      lineEl.style.transform = `scaleY(${progress.toFixed(4)})`;
      const tip = rect.top + progress * rect.height;
      dots.forEach((dot) => {
        dot.classList.toggle("on", dot.getBoundingClientRect().top + 4 <= tip);
      });
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
    <div ref={wrap} className="relative pl-8 md:pl-14">
      <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-rule" />
      <span
        ref={line}
        aria-hidden
        className="clog-line absolute left-0 top-0 h-full w-px bg-blue"
        style={{ transform: "scaleY(0)" }}
      />

      <div className="space-y-16 md:space-y-20">
        {records.map((record, i) => {
          const version = `v${records.length - i}.0`;
          return (
            <Reveal key={version} delay={i * 50}>
              <article className="relative">
                <span
                  aria-hidden
                  data-dot
                  className={`clog-dot absolute -left-8 top-1.5 size-2 rounded-full md:-left-14 ${
                    record.active ? "bg-blue" : "bg-ink"
                  }`}
                />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  <span className="border border-rule px-2 py-0.5 text-ink">
                    {version}
                  </span>
                  <span>{record.period}</span>
                  <span>{record.location}</span>
                  {record.active && (
                    <span className="flex items-center gap-1.5 text-blue">
                      <span className="beat inline-block size-1.5 rounded-full bg-blue" />
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                  {record.role}
                </h3>
                <p className="mt-1 text-ink-soft">{record.company}</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                  {record.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                  {record.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}

        <Reveal delay={100}>
          <article className="relative">
            <span
              aria-hidden
              data-dot
              className="clog-dot absolute -left-8 top-1.5 size-2 rounded-full border border-ink bg-paper md:-left-14"
            />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              <span className="border border-rule px-2 py-0.5 text-ink">v0.9</span>
              <span>{education.period}</span>
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
              {education.degree}
            </h3>
            <p className="mt-1 text-ink-soft">
              {education.school} — {education.detail}
            </p>
          </article>
        </Reveal>
      </div>
    </div>
  );
}
