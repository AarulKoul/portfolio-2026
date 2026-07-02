import type { CSSProperties } from "react";
import { identity } from "@/lib/data";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-10 pt-28 md:px-10"
    >
      {/* Faint column grid, like layout guides left visible on the page */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, var(--line) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 6) 100%",
          opacity: 0.4,
        }}
      />

      <div className="relative">
        <div className="fade-in flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim" style={delay(900)}>
          <span>Engineering Journal — Vol. 01</span>
          <span className="hidden sm:inline">{identity.coordinates} — Pune, India</span>
          <span>Issue: 2026</span>
        </div>

        <p className="fade-in mt-10 font-mono text-xs uppercase tracking-[0.3em] text-ember md:mt-16" style={delay(500)}>
          N°01 — Software Development Engineer
        </p>

        <h1 className="mt-4 font-serif leading-[0.88] tracking-[-0.02em]">
          <span className="mask">
            <span className="text-[clamp(4.25rem,16vw,15rem)] font-light" style={delay(120)}>
              Aarul
            </span>
          </span>
          <span className="mask">
            <span className="text-outline text-[clamp(4.25rem,16vw,15rem)] italic" style={delay(260)}>
              Koul<span className="text-ember [-webkit-text-stroke:0]">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col justify-between gap-8 border-t border-line pt-6 md:mt-16 md:flex-row md:items-end">
          <p className="fade-in max-w-xl text-lg leading-relaxed text-bone-dim md:text-xl" style={delay(700)}>
            Building SaaS in{" "}
            <em className="font-serif italic text-bone">Next.js</em> by trade,
            taming{" "}
            <em className="font-serif italic text-bone">million-row datasets</em>{" "}
            by habit. An engineer&apos;s record of interfaces built, data tamed,
            and details obsessed over.
          </p>
          <p className="fade-in shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim" style={delay(1000)}>
            Scroll to read ↓
          </p>
        </div>
      </div>
    </section>
  );
}
