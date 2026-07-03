"use client";

import { useEffect, useRef } from "react";
import { education, records } from "@/lib/data";
import { gsap, reducedMotion } from "@/lib/gsap";

/**
 * The career as a repository history: scroll draws a blue line down the
 * timeline with a HEAD marker riding its tip; version dots pop as the
 * line reaches them, and entries surface as they're reached.
 */
export default function Changelog() {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const head = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = wrap.current;
    const lineEl = line.current;
    const headEl = head.current;
    if (!root || !lineEl || !headEl) return;
    const dots = Array.from(root.querySelectorAll<HTMLElement>("[data-dot]"));
    const entries = Array.from(root.querySelectorAll<HTMLElement>("article"));

    if (reducedMotion()) {
      lineEl.style.transform = "scaleY(1)";
      headEl.style.opacity = "0";
      dots.forEach((dot) => dot.classList.add("on"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(entries, {
        y: 44,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      gsap.to(lineEl, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          end: "bottom 55%",
          scrub: 0.4,
          onUpdate: (self) => {
            const rect = root.getBoundingClientRect();
            const tip = rect.top + self.progress * rect.height;
            gsap.set(headEl, { y: self.progress * rect.height });
            headEl.style.opacity = self.progress > 0.01 && self.progress < 0.99 ? "1" : "0";
            dots.forEach((dot) => {
              dot.classList.toggle(
                "on",
                dot.getBoundingClientRect().top + 4 <= tip
              );
            });
          },
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="relative pl-8 md:pl-14">
      <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-line" />
      <span
        ref={line}
        aria-hidden
        className="absolute left-0 top-0 h-full w-px origin-top bg-blue"
        style={{ transform: "scaleY(0)" }}
      />
      <span
        ref={head}
        aria-hidden
        className="absolute -left-[3px] top-0 z-10 opacity-0"
      >
        <span className="block size-[7px] rounded-full bg-cyan shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 rounded border border-line bg-panel px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan">
          HEAD
        </span>
      </span>

      <div className="space-y-16 md:space-y-20">
        {records.map((record, i) => {
          const version = `v${records.length - i}.0`;
          return (
            <article key={version} className="relative">
              <span
                aria-hidden
                data-dot
                className={`clog-dot absolute -left-8 top-1.5 size-2 rounded-full md:-left-14 ${
                  record.active ? "bg-blue" : "bg-fg"
                }`}
              />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span className="rounded border border-line bg-panel px-2 py-0.5 text-fg">
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
              <p className="mt-1 text-muted">{record.company}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                {record.summary}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {record.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}

        <article className="relative">
          <span
            aria-hidden
            data-dot
            className="clog-dot absolute -left-8 top-1.5 size-2 rounded-full border border-fg bg-void md:-left-14"
          />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="rounded border border-line bg-panel px-2 py-0.5 text-fg">
              v0.9
            </span>
            <span>{education.period}</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            {education.degree}
          </h3>
          <p className="mt-1 text-muted">
            {education.school} — {education.detail}
          </p>
        </article>
      </div>
    </div>
  );
}
