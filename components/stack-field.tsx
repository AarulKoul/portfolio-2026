"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { capabilities } from "@/lib/data";
import { gsap, reducedMotion, ScrollTrigger } from "@/lib/gsap";

const GROUP_COLORS = ["#5b7bfa", "#67e8f9", "#a78bfa", "#4ade80"];

// Deterministic scatter per chip index
const seeded = (n: number) => {
  const x = Math.sin(n * 91.7 + 47.3) * 24631.4;
  return x - Math.floor(x);
};

/**
 * The toolkit starts as debris: chips scattered across the section,
 * floating on their own sine rhythms. Scroll is the assembly force —
 * a scrubbed timeline springs each chip (with a little overshoot) into
 * grouped, ruled rows while the category headers slide in and the
 * float amplitude damps from 9px to a calm 2.5px. Scroll back up and
 * it all comes apart again.
 *
 * Three layers per chip so nothing fights: outer = GSAP scatter/assemble,
 * middle = CSS float (amplitude via --fa), inner = hover lift.
 */
export default function StackField() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (reducedMotion()) return;
    const chips = el.querySelectorAll<HTMLElement>(".sf-chip");
    const heads = el.querySelectorAll<HTMLElement>(".sf-head");

    const ctx = gsap.context(() => {
      gsap.set(chips, {
        x: (i) =>
          (seeded(i * 2 + 1) - 0.5) *
          Math.min(640, window.innerWidth * 0.55),
        y: (i) => (seeded(i * 2 + 2) - 0.5) * 280,
        rotation: (i) => (seeded(i * 3 + 1) - 0.5) * 50,
        scale: 0.92,
      });
      gsap.set(heads, { opacity: 0, x: -16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "top 18%",
          scrub: 0.6,
        },
      });
      tl.to(
        chips,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.4)",
          stagger: { each: 0.018, from: "random" },
        },
        0
      )
        .to(el, { "--fa": "2.5px", duration: 1, ease: "none" }, 0)
        .to(
          heads,
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.07, ease: "power2.out" },
          0.6
        );
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={root} style={{ "--fa": "9px" } as CSSProperties}>
      {capabilities.map((group, gi) => (
        <div
          key={group.heading}
          className="flex flex-col gap-4 border-t border-line py-7 first:border-t-0 first:pt-0 md:flex-row"
        >
          <div className="sf-head w-full shrink-0 md:w-56">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fg">
              <span
                aria-hidden
                className="inline-block size-1.5 rounded-full"
                style={{ background: GROUP_COLORS[gi] }}
              />
              {group.heading}
            </p>
            <p className="mt-1 pl-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {String(group.items.length).padStart(2, "0")} tools
            </p>
          </div>

          <div className="flex flex-wrap content-start gap-3">
            {group.items.map((item, i) => (
              <div key={`${group.heading}-${item}`} className="sf-chip will-change-transform">
                <span
                  className="sf-float"
                  style={
                    {
                      "--fd": `${(seeded(gi * 31 + i) * -4).toFixed(2)}s`,
                      "--fdur": `${(3 + seeded(gi * 7 + i * 3) * 1.8).toFixed(2)}s`,
                    } as CSSProperties
                  }
                >
                  <span className="chip font-mono text-[11px] uppercase tracking-[0.14em] text-fg">
                    <span
                      aria-hidden
                      className="inline-block size-1.5 rounded-full"
                      style={{ background: GROUP_COLORS[gi] }}
                    />
                    {item}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
