"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export type Segment = { t: string; hl?: boolean };

/**
 * Splits text into words and rises them out of line-masks, one by one,
 * when scrolled into view. Segments with `hl` render as permanently
 * "selected" text (blue highlight).
 */
export default function Words({
  segments,
  className = "",
  stagger = 36,
}: {
  segments: Segment[];
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

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

  const words = segments.flatMap((segment) =>
    segment.t
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, hl: segment.hl }))
  );

  return (
    <p ref={ref} className={`words ${className}`}>
      {words.map(({ word, hl }, i) => (
        <span key={i} className="w">
          <span
            className={hl ? "hl" : undefined}
            style={{ "--d": `${i * stagger}ms` } as CSSProperties}
          >
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}
