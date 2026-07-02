"use client";

import { useEffect, useRef, useState } from "react";
import { stats, type Stat } from "@/lib/data";
import Reveal from "./reveal";

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

function StatValue({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => format(0, stat.kind));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(format(stat.value, stat.kind));
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
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
    <span ref={ref} className="tabular-nums">
      {stat.kind === "decimal-percent" && (
        <span className="mr-2 align-[0.5em] font-mono text-xs uppercase tracking-[0.25em] text-ink-soft md:text-sm">
          Top
        </span>
      )}
      {display}
    </span>
  );
}

export default function Metrics() {
  return (
    <Reveal>
      <div className="grid gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-l border-rule pl-6">
            <p className="font-mono text-[11px] tracking-[0.25em] text-blue">
              {stat.label}
            </p>
            <p className="mt-6 text-[clamp(2.75rem,5.5vw,5rem)] font-extrabold leading-none tracking-[-0.04em]">
              <StatValue stat={stat} />
            </p>
            <p className="mt-5 max-w-[24ch] text-sm leading-relaxed text-ink-soft">
              {stat.caption}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
