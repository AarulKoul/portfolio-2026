"use client";

import { useEffect, useRef } from "react";
import { identity } from "@/lib/data";
import { gsap, reducedMotion, ScrollTrigger } from "@/lib/gsap";
import LocalTime from "./local-time";

/**
 * The finale: the call-to-action assembles letter by letter, and the
 * email is a magnetic instrument that leans toward the hand reaching
 * for it.
 */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const magnet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(".ct-char", {
        yPercent: 120,
        duration: 1,
        ease: "expo.out",
        stagger: 0.045,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
      gsap.from(".ct-item", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 55%", once: true },
      });
    }, el);

    // magnetic email
    const m = magnet.current;
    let cleanupMagnet = () => {};
    if (m && window.matchMedia("(pointer: fine)").matches) {
      const toX = gsap.quickTo(m, "x", { duration: 0.4, ease: "power3" });
      const toY = gsap.quickTo(m, "y", { duration: 0.4, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const rect = m.getBoundingClientRect();
        toX((e.clientX - (rect.left + rect.width / 2)) * 0.22);
        toY((e.clientY - (rect.top + rect.height / 2)) * 0.22);
      };
      const onLeave = () => {
        toX(0);
        toY(0);
      };
      m.addEventListener("pointermove", onMove, { passive: true });
      m.addEventListener("pointerleave", onLeave);
      cleanupMagnet = () => {
        m.removeEventListener("pointermove", onMove);
        m.removeEventListener("pointerleave", onLeave);
      };
    }

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
      cleanupMagnet();
    };
  }, []);

  const heading = ["LET'S", "BUILD."];

  return (
    <footer ref={root} id="contact" className="relative border-t border-line">
      <div className="px-5 py-24 md:px-10 md:py-36">
        <p className="ct-item font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          <span className="text-blue">07</span> — Contact
        </p>

        <h2 className="mt-10 text-[clamp(3.5rem,13vw,12rem)] font-extrabold leading-[0.88] tracking-[-0.05em]">
          {heading.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="block">
                {line.split("").map((char, i) => (
                  <span
                    key={i}
                    className={`ct-char inline-block ${char === "." ? "text-blue" : ""}`}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h2>

        <div ref={magnet} className="ct-item mt-14 inline-block md:mt-20">
          <a
            href={`mailto:${identity.email}`}
            className="group relative inline-flex items-center gap-3 rounded-full border border-line bg-panel px-7 py-4 text-base font-medium tracking-[-0.01em] transition-colors duration-300 hover:border-blue/60 hover:shadow-[0_0_40px_rgba(91,123,250,0.25)] md:px-9 md:py-5 md:text-xl"
          >
            <span className="beat inline-block size-2 rounded-full bg-blue" />
            {identity.email}
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </div>

        <div className="ct-item mt-16 grid gap-y-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          <a
            href={identity.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule w-fit transition-colors duration-300 hover:text-fg"
          >
            GitHub ↗
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule w-fit transition-colors duration-300 hover:text-fg"
          >
            LinkedIn ↗
          </a>
          <p className="flex items-center gap-2">
            <span className="beat inline-block size-1.5 rounded-full bg-blue" />
            Open to work
          </p>
          <p className="lg:text-right">
            <LocalTime />
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-line px-5 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted/70 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 Aarul Koul — Pixel / Pipeline</p>
        <p className="hidden lg:block">Inter Tight · Geist Mono</p>
        <p>Next.js 16 · GSAP · Lenis · Canvas · SVG</p>
      </div>
    </footer>
  );
}
