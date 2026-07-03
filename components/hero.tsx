import type { CSSProperties } from "react";
import { identity } from "@/lib/data";
import Constellation from "./constellation";
import CursorCoords from "./cursor-coords";
import DecodeName from "./decode-name";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-8 pt-24 md:px-10"
    >
      <Constellation />

      <div
        className="fade-in relative mb-auto grid gap-y-1 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:grid-cols-3"
        style={delay(700)}
      >
        <span>Portfolio — 2026 edition</span>
        <span className="sm:text-center">Pixel / Pipeline</span>
        <span className="sm:text-right">{identity.location} (UTC+5:30)</span>
      </div>

      <div className="relative">
        <p
          className="fade-in mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-blue"
          style={delay(500)}
        >
          Software Development Engineer
        </p>
        <DecodeName />
      </div>

      <div className="relative mt-10 grid gap-x-8 gap-y-6 border-t border-line pt-6 md:mt-14 md:grid-cols-12">
        <p
          className="fade-in font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:col-span-3"
          style={delay(1000)}
        >
          Scroll <span className="drift">↓</span>
        </p>
        <p
          className="fade-in max-w-md text-base leading-relaxed text-muted md:col-span-5 md:text-lg"
          style={delay(850)}
        >
          Engineer at Borderline Genius — building SaaS platforms in Next.js
          with a data engineer&apos;s reflexes. The constellation behind this
          text is my stack; the name above answers to your cursor.
        </p>
        <p
          className="fade-in flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:col-span-4 md:items-end"
          style={delay(1150)}
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
    </section>
  );
}
