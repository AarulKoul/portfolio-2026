"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion, ScrollTrigger } from "@/lib/gsap";

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

const FLOW_PATH = "M104 190 C 170 190 170 110 235 110 C 300 110 285 230 328 230";

/**
 * The thesis, staged: the section pins while scroll drives one scene —
 * a database drains through a drawn pipeline into a browser wireframe
 * that assembles itself, while the statement ignites word by word.
 * When the pipe completes, data packets begin flowing through it.
 */
export default function Pipeline() {
  const section = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root) return;

    if (reducedMotion()) {
      root.querySelectorAll<HTMLElement>(".pw").forEach((w) => {
        w.style.color = "var(--fg)";
        if (w.classList.contains("hl-w")) {
          w.style.background = "var(--blue)";
          w.style.color = "var(--void)";
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=170%",
          scrub: 0.6,
          pin: true,
          onUpdate: (self) => {
            svgRef.current?.classList.toggle("flow", self.progress > 0.78);
          },
        },
      });

      // The scene draws itself…
      tl.to(q(".pipe-db"), { strokeDashoffset: 0, duration: 0.7, stagger: 0.06 }, 0.1)
        .to(q(".pipe-flow"), { strokeDashoffset: 0, duration: 1.3 }, 0.6)
        .to(q(".pipe-frame"), { strokeDashoffset: 0, duration: 0.8, stagger: 0.08 }, 1.6)
        .to(q(".pipe-ui"), { strokeDashoffset: 0, duration: 0.5, stagger: 0.1 }, 2.3)
        .to(q(".pipe-glow"), { opacity: 1, duration: 0.4 }, 3.0);

      // …while the words ignite in step.
      tl.to(
        q(".pw"),
        { color: "#e9ecf5", duration: 0.25, stagger: 0.085 },
        0.2
      ).to(
        q(".pw.hl-w"),
        {
          backgroundColor: "#5b7bfa",
          color: "#07080d",
          duration: 0.25,
          stagger: 0.085,
        },
        0.37
      );

      tl.to({}, { duration: 0.5 }); // hold the finished scene a beat
    }, root);

    // Pin geometry is measured while the boot overlay still locks the
    // body — re-measure once the site is actually interactive.
    const onBooted = () => ScrollTrigger.refresh();
    window.addEventListener("ak:booted", onBooted);

    return () => {
      window.removeEventListener("ak:booted", onBooted);
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section ref={section} id="brief" className="relative border-t border-line">
      <div className="grid min-h-svh content-center gap-y-12 px-5 py-24 md:grid-cols-12 md:gap-x-8 md:px-10">
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            <span className="text-blue">01</span> — Thesis
          </p>
        </div>

        <p className="text-[clamp(1.8rem,3.6vw,3.3rem)] font-semibold leading-[1.15] tracking-[-0.03em] md:col-span-9 lg:col-span-5">
          {WORDS.map(({ word, hl }, i) => (
            <span key={i} className={`pw mr-[0.27em] inline-block ${hl ? "hl-w" : ""}`}>
              {word}
            </span>
          ))}
        </p>

        <div className="md:col-span-9 md:col-start-4 lg:col-span-4 lg:col-start-9">
          <svg
            ref={svgRef}
            viewBox="0 0 520 380"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            className="pipe w-full text-muted"
            aria-hidden
          >
            {/* database */}
            <ellipse className="pipe-db" cx="62" cy="122" rx="40" ry="13" pathLength={1} />
            <path className="pipe-db" d="M22 122 V 244" pathLength={1} />
            <path className="pipe-db" d="M102 122 V 244" pathLength={1} />
            <path className="pipe-db" d="M22 244 A 40 13 0 0 0 102 244" pathLength={1} />
            <path className="pipe-db" d="M22 163 A 40 13 0 0 0 102 163" pathLength={1} />
            <path className="pipe-db" d="M22 204 A 40 13 0 0 0 102 204" pathLength={1} />

            {/* the pipe */}
            <path className="pipe-flow text-blue" d={FLOW_PATH} pathLength={1} stroke="currentColor" />

            {/* browser frame */}
            <rect className="pipe-frame" x="328" y="92" width="170" height="206" rx="10" pathLength={1} />
            <path className="pipe-frame" d="M328 124 H 498" pathLength={1} />
            <circle className="pipe-frame" cx="346" cy="108" r="3" pathLength={1} />
            <circle className="pipe-frame" cx="360" cy="108" r="3" pathLength={1} />
            <circle className="pipe-frame" cx="374" cy="108" r="3" pathLength={1} />

            {/* interface assembling inside */}
            <rect className="pipe-ui" x="346" y="142" width="92" height="12" rx="3" pathLength={1} />
            <path className="pipe-ui" d="M346 172 H 480" pathLength={1} />
            <path className="pipe-ui" d="M346 188 H 458" pathLength={1} />
            <rect className="pipe-ui text-blue" x="346" y="208" width="64" height="20" rx="4" pathLength={1} stroke="currentColor" />
            <polyline className="pipe-ui" points="346,272 372,254 398,262 424,240 450,246 480,226" pathLength={1} />

            {/* packets, released once the pipe is complete */}
            <g className="text-cyan">
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  className="packet"
                  r="3.2"
                  fill="currentColor"
                  stroke="none"
                  style={{
                    offsetPath: `path('${FLOW_PATH}')`,
                    ["--pd" as string]: `${i * 1.05}s`,
                  }}
                />
              ))}
            </g>

            {/* completion glow on the button */}
            <rect
              className="pipe-glow"
              x="346"
              y="208"
              width="64"
              height="20"
              rx="4"
              fill="rgba(91,123,250,0.25)"
              stroke="none"
              opacity="0"
            />
          </svg>
          <p className="mt-4 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            Fig. 00 — data becomes interface, live
          </p>
        </div>
      </div>
    </section>
  );
}
