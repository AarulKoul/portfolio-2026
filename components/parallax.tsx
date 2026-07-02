"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Moves its child slower than the page scroll to create depth.
 * `speed` is the fraction of scroll speed given up (0.2 = moves at 80%).
 * `anchor: "top"` is for elements living in the first viewport (offset is
 * derived from scrollY); `anchor: "center"` for elements mid-page (offset is
 * derived from distance to the viewport center).
 */
export default function Parallax({
  children,
  speed = 0.15,
  anchor = "center",
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  anchor?: "top" | "center";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let frame = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -300 || rect.top > window.innerHeight + 300) return;
      if (anchor === "top") {
        offset = window.scrollY * speed;
      } else {
        const baseCenter = rect.top + rect.height / 2 - offset;
        offset = -(baseCenter - window.innerHeight / 2) * speed;
      }
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed, anchor]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
