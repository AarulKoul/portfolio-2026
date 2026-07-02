"use client";

import { useEffect, useRef, useState } from "react";
import { stats, type Stat } from "@/lib/data";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

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
        const duration = 1800;
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
        <span className="mr-3 align-middle font-mono text-sm uppercase tracking-[0.3em] text-bone-dim md:text-base">
          Top
        </span>
      )}
      {display}
    </span>
  );
}

export default function Figures() {
  return (
    <section id="figures" className="px-5 pt-24 md:px-10 md:pt-36">
      <SectionHeading
        index="03"
        title="The Figures"
        note="Measured, not estimated"
      />

      <Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex h-full flex-col justify-between gap-10 border-b border-line py-12 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
            >
              <p className="font-mono text-xs tracking-[0.3em] text-ember">
                {stat.label}
              </p>
              <div>
                <p className="font-serif text-[clamp(3.25rem,7vw,5.5rem)] leading-none tracking-tight">
                  <StatValue stat={stat} />
                </p>
                <p className="mt-6 max-w-[26ch] text-sm leading-relaxed text-bone-dim">
                  {stat.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
