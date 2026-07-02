"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The child leans toward the cursor while hovered and springs back on
 * leave. Lerped in rAF so both directions feel weighted, not snapped.
 * No-ops for touch pointers and reduced motion.
 */
export default function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    let active = false;

    const loop = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (active || Math.abs(cx) > 0.15 || Math.abs(cy) > 0.15) {
        frame = requestAnimationFrame(loop);
      } else {
        el.style.transform = "";
        frame = 0;
      }
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      tx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      ty = (e.clientY - (rect.top + rect.height / 2)) * strength;
      start();
    };
    const onEnter = (e: PointerEvent) => {
      active = true;
      window.addEventListener("pointermove", onMove, { passive: true });
      onMove(e);
    };
    const onLeave = () => {
      active = false;
      tx = 0;
      ty = 0;
      window.removeEventListener("pointermove", onMove);
      start();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
