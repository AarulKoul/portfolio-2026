"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Adds `is-visible` when scrolled into view. `variant="default"` animates
 * itself (rise + focus pull); `variant="group"` stays static and lets its
 * `.sk` children stagger in via `--i` (see globals.css) — used where a
 * single fade would be repetitive.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "group";
}) {
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${variant === "group" ? "reveal-group" : "reveal"} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
