"use client";

import { useEffect, useRef } from "react";

export default function CursorCoords() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (ref.current) {
        const x = String(Math.round(e.clientX)).padStart(4, "0");
        const y = String(Math.round(e.clientY)).padStart(4, "0");
        ref.current.textContent = `X ${x} · Y ${y}`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <span ref={ref} className="tabular-nums">
      X 0000 · Y 0000
    </span>
  );
}
