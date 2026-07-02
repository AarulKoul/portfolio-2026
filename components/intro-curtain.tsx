"use client";

import { useState, type AnimationEvent } from "react";

/** Page-entrance transition: an ink curtain lifts to reveal the paper. */
export default function IntroCurtain() {
  const [gone, setGone] = useState(false);
  if (gone) return null;

  const onEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setGone(true);
  };

  return (
    <div
      aria-hidden
      onAnimationEnd={onEnd}
      className="curtain fixed inset-0 z-[100] bg-ink"
    >
      <div className="flex h-full items-end justify-between px-5 pb-6 md:px-10">
        <span className="curtain-label font-mono text-[11px] uppercase tracking-[0.25em] text-paper/70">
          A.Koul — Portfolio
        </span>
        <span className="curtain-label font-mono text-[11px] uppercase tracking-[0.25em] text-paper/70">
          2026
        </span>
      </div>
    </div>
  );
}
