"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { stats, type Stat } from "@/lib/data";

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function format(value: number, kind: Stat["kind"]) {
  switch (kind) {
    case "percent":
      return `${Math.round(value)}%`;
    case "decimal-percent":
      return `${value.toFixed(1)}%`;
    case "compact":
      return value >= 1_000_000
        ? `${(value / 1_000_000).toFixed(0)}M+`
        : `${Math.round(value / 1000)}K`;
  }
}

/* Procedural mini-visualizations — every number gets a picture */

function ArcViz() {
  return (
    <svg viewBox="0 0 72 72" className="viz-arc h-16 w-16" aria-hidden>
      <circle cx="36" cy="36" r="28" fill="none" stroke="var(--line)" strokeWidth="4" />
      <circle
        className="val"
        cx="36"
        cy="36"
        r="28"
        fill="none"
        stroke="var(--blue)"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={1}
        transform="rotate(-90 36 36)"
        style={{ "--target": 1 - 0.94 } as CSSProperties}
      />
    </svg>
  );
}

function DotsViz() {
  const cells = Array.from({ length: 40 }, (_, i) => i);
  return (
    <svg viewBox="0 0 130 62" className="viz-dots h-16 w-auto" aria-hidden>
      {cells.map((i) => (
        <rect
          key={i}
          className="on"
          x={(i % 10) * 13}
          y={Math.floor(i / 10) * 15}
          width="7"
          height="9"
          rx="1.5"
          fill="var(--blue)"
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </svg>
  );
}

function BarsViz() {
  const widths = [104, 76, 118, 58, 92];
  return (
    <svg viewBox="0 0 130 62" className="viz-bars h-16 w-auto" aria-hidden>
      {widths.map((w, i) => (
        <rect
          key={i}
          x="0"
          y={i * 13}
          width={w}
          height="7"
          rx="1.5"
          fill={i === 2 ? "var(--blue)" : "var(--line)"}
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </svg>
  );
}

function CurveViz() {
  return (
    <svg viewBox="0 0 130 62" className="viz-curve h-16 w-auto" aria-hidden>
      <path
        className="curve"
        d="M4 56 C 30 56 40 10 62 10 C 84 10 94 56 126 56"
        fill="none"
        stroke="var(--muted)"
        strokeWidth="1.6"
        pathLength={1}
      />
      <g className="marker">
        <line x1="108" y1="10" x2="108" y2="58" stroke="var(--blue)" strokeWidth="1.6" />
        <circle cx="108" cy="44" r="3.2" fill="var(--blue)" />
      </g>
    </svg>
  );
}

const vizByIndex = [ArcViz, DotsViz, BarsViz, CurveViz];

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(() => format(0, stat.kind));
  const Viz = vizByIndex[index % vizByIndex.length];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("go");
      setDisplay(format(stat.value, stat.kind));
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.classList.add("go");
        const start = performance.now();
        const duration = 1600;
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setDisplay(format(stat.value * easeOutExpo(t), stat.kind));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stat]);

  return (
    <div ref={ref} className="border-l border-line pl-6">
      <p className="font-mono text-[11px] tracking-[0.25em] text-blue">
        {stat.label}
      </p>
      <div className="mt-6">
        <Viz />
      </div>
      <p className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em]">
        <span className="tabular-nums">
          {stat.kind === "decimal-percent" && (
            <span className="mr-2 align-[0.5em] font-mono text-xs uppercase tracking-[0.25em] text-muted">
              Top
            </span>
          )}
          {display}
        </span>
      </p>
      <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted">
        {stat.caption}
      </p>
    </div>
  );
}

export default function Metrics() {
  return (
    <div className="grid gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCell key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  );
}
