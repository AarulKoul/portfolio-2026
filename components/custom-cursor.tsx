"use client";

import { useEffect, useRef } from "react";

/**
 * A lagging ring that trails the native cursor (which stays visible) and
 * inflates over interactive elements. Skipped for touch and reduced motion.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let tx = -100;
    let ty = -100;
    let cx = -100;
    let cy = -100;
    let frame = 0;

    const loop = () => {
      frame = requestAnimationFrame(loop);
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!frame) {
        cx = tx;
        cy = ty;
        el.style.opacity = "1";
        frame = requestAnimationFrame(loop);
      }
    };
    const onOver = (e: PointerEvent) => {
      const interactive = (e.target as HTMLElement).closest?.(
        "a, button, [data-cursor]"
      );
      el.classList.toggle("is-link", Boolean(interactive));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} aria-hidden className="cursor-ring opacity-0" />;
}
