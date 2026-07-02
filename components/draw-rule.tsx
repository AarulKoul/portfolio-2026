"use client";

import { useEffect, useRef } from "react";

/** A section rule that draws itself left-to-right when scrolled to. */
export default function DrawRule({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden
      className={`draw-rule block h-px w-full ${className}`}
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      fill="none"
    >
      <path d="M0 0.5 H100" pathLength={1} stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
