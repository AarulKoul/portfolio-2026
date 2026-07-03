"use client";

import { useEffect, useRef, useState } from "react";
import { education } from "@/lib/data";

type TermLine = { text: string; kind: "cmd" | "out" | "accent" };

const SCRIPT: TermLine[] = [
  { text: "$ whoami", kind: "cmd" },
  { text: "aarul.koul — software development engineer, pune (utc+5:30)", kind: "out" },
  { text: "$ ls ./experience", kind: "cmd" },
  {
    text: "borderline-genius/  portway-solutions/  go-digit/  deepcytes/  tata-tech/",
    kind: "out",
  },
  { text: "$ cat highlights.txt", kind: "cmd" },
  { text: "· 94% faster video pipeline (ffmpeg, rebuilt)", kind: "out" },
  { text: "· 1M+ records analyzed, 760K rows cleaned", kind: "out" },
  { text: "· top 3.5% of 1,800+ teams — reply code challenge", kind: "out" },
  { text: "$ status", kind: "cmd" },
  { text: "● open to work", kind: "accent" },
];

const facts = [
  { key: "Location", value: "Pune, India — UTC+5:30" },
  { key: "Education", value: `B.Tech CSE — ${education.detail}` },
  { key: "Currently", value: "SDE @ Borderline Genius" },
  { key: "Distinction", value: "Top 3.5% — Reply Code Challenge" },
];

/**
 * The bio delivered the way an engineer would ask for it: a terminal
 * types `whoami` when scrolled into view; commands type character by
 * character, output prints in blocks.
 */
export default function AboutTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ line: -1, chars: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress({ line: SCRIPT.length, chars: 0 });
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    const play = (line: number, chars: number) => {
      if (line >= SCRIPT.length) {
        setProgress({ line, chars: 0 });
        return;
      }
      const current = SCRIPT[line];
      if (current.kind === "cmd") {
        if (chars < current.text.length) {
          setProgress({ line, chars: chars + 1 });
          timeout = setTimeout(() => play(line, chars + 1), 26);
        } else {
          setProgress({ line: line + 1, chars: 0 });
          timeout = setTimeout(() => play(line + 1, 0), 160);
        }
      } else {
        setProgress({ line: line + 1, chars: 0 });
        timeout = setTimeout(() => play(line + 1, 0), 110);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timeout = setTimeout(() => play(0, 0), 300);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const visibleLines = SCRIPT.slice(0, Math.max(progress.line, 0)).map(
    (line) => line.text
  );
  const typingLine =
    progress.line >= 0 && progress.line < SCRIPT.length && progress.chars > 0
      ? SCRIPT[progress.line].text.slice(0, progress.chars)
      : null;
  const done = progress.line >= SCRIPT.length;

  return (
    <div ref={ref} className="grid gap-x-8 gap-y-12 md:grid-cols-12">
      <div className="md:col-span-6">
        <div className="term overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              aarul@pune: ~
            </span>
          </div>
          <div className="min-h-[19rem] px-5 py-4 font-mono text-[12.5px] leading-6 md:text-[13px]">
            {SCRIPT.slice(0, visibleLines.length).map((line, i) => (
              <p
                key={i}
                className={
                  line.kind === "cmd"
                    ? "text-fg"
                    : line.kind === "accent"
                      ? "text-blue"
                      : "text-muted"
                }
              >
                {line.text}
              </p>
            ))}
            {typingLine !== null && <p className="text-fg">{typingLine}</p>}
            <p>
              {done && <span className="text-fg">$ </span>}
              <span className="term-caret" />
            </p>
          </div>
        </div>
      </div>

      <div className="md:col-span-5 md:col-start-8">
        <p className="text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
          Five roles in two years. The through-line: I care about{" "}
          <span className="rounded bg-blue px-1 text-void">
            the pixel and the pipeline
          </span>{" "}
          — the interface a person touches, and the data that makes it honest.
        </p>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
          Off the clock it&apos;s the same instinct pointed elsewhere — a
          recommendation engine here, a document-chat SaaS there. I treat
          typography, latency, and dataset hygiene as the same discipline:
          details someone else will feel even if they never see them.
        </p>

        <dl className="mt-10 divide-y divide-line border-y border-line">
          {facts.map((fact) => (
            <div key={fact.key} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5">
              <dt className="font-mono text-[10px] uppercase leading-5 tracking-[0.2em] text-muted">
                {fact.key}
              </dt>
              <dd className="text-sm leading-5">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
