"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Letter-by-letter masked rise, triggered on scroll. Accent characters
 * (default: the period) render in blue.
 */
export default function Letters({
  lines,
  className = "",
  accent = ".",
}: {
  lines: string[];
  className?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

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
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let charIndex = 0;
  return (
    <span ref={ref} className={`chars ${className}`}>
      {lines.map((line, li) => (
        <span key={li} className="line">
          {line.split("").map((char, i) => {
            const style = { "--i": charIndex++ } as CSSProperties;
            return (
              <span
                key={i}
                className={`c ${char === accent ? "text-blue" : ""}`}
                style={style}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
