"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/data";
import { gsap, reducedMotion, ScrollTrigger } from "@/lib/gsap";
import ProjectFigure from "./project-figures";

/**
 * Project cards as instruments: a border light tracks the cursor, the
 * card tilts in 3D under the pointer, and each one carries a living
 * schematic that draws itself on entry and keeps a heartbeat after.
 */
export default function WorkCards() {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = grid.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".glow-card"));

    if (reducedMotion()) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          batch.forEach((el) => el.classList.add("is-visible"));
          gsap.from(batch, {
            y: 64,
            opacity: 0,
            rotationX: 6,
            transformPerspective: 900,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.12,
          });
        },
      });
    }, root);

    // 3D tilt + border-light tracking (fine pointers only)
    const cleanups: (() => void)[] = [];
    if (window.matchMedia("(pointer: fine)").matches) {
      cards.forEach((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
        gsap.set(card, { transformPerspective: 900 });

        const onMove = (e: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
          card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
          ry((px - 0.5) * 7);
          rx((0.5 - py) * 7);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", onMove, { passive: true });
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={grid} className="grid gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <article key={project.name} className="glow-card rounded-2xl p-7 md:p-8">
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="text-blue">{String(i + 1).padStart(2, "0")}</span>
            <span>{project.tagline}</span>
          </div>

          <div className="my-7 md:my-8">
            <ProjectFigure index={i} />
          </div>

          <h3 className="text-2xl font-extrabold tracking-[-0.03em] md:text-3xl">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-fg"
            >
              Source ↗
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
