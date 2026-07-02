import type { CSSProperties } from "react";
import { identity } from "@/lib/data";
import CursorCoords from "./cursor-coords";
import DrawRule from "./draw-rule";
import HeroName from "./hero-name";
import Parallax from "./parallax";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-end px-5 pb-8 pt-24 md:px-10"
    >
      <div
        className="fade-in mb-auto grid gap-y-1 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft sm:grid-cols-3"
        style={delay(1400)}
      >
        <span>Portfolio — 2026 edition</span>
        <span className="sm:text-center">Frontend / Data</span>
        <span className="sm:text-right">{identity.location} (UTC+5:30)</span>
      </div>

      {/* The name scrolls heavier than the page — display type has mass */}
      <Parallax anchor="top" speed={0.16}>
        <HeroName />
      </Parallax>

      <div className="mt-10 md:mt-14">
        <DrawRule className="text-rule" />
        <div className="grid gap-x-8 gap-y-6 pt-6 md:grid-cols-12">
          <p
            className="fade-in font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft md:col-span-3"
            style={delay(1600)}
          >
            Scroll <span className="drift">↓</span>
          </p>
          <p
            className="fade-in max-w-md text-base leading-relaxed text-ink-soft md:col-span-5 md:text-lg"
            style={delay(1300)}
          >
            Software engineer at Borderline Genius — building SaaS platforms in
            Next.js with a data engineer&apos;s reflexes. The name above is a
            variable font; go ahead, push it around.
          </p>
          <p
            className="fade-in flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft md:col-span-4 md:items-end"
            style={delay(1700)}
          >
            <span className="flex items-center gap-2">
              <span className="beat inline-block size-1.5 rounded-full bg-blue" />
              Open to work
            </span>
            <span className="hidden [@media(pointer:fine)]:inline">
              <CursorCoords />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
