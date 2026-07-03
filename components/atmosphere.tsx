"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

/**
 * The environment behind everything: a blueprint grid, three aurora
 * fields drifting on slow sine paths, and a spotlight that follows the
 * cursor so the grid feels lit rather than printed.
 */
export default function Atmosphere() {
  const root = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const blobs = root.current?.querySelectorAll(".aurora");
    if (!blobs) return;

    const tweens: gsap.core.Tween[] = [];
    blobs.forEach((blob, i) => {
      tweens.push(
        gsap.to(blob, {
          xPercent: () => gsap.utils.random(-22, 22),
          yPercent: () => gsap.utils.random(-18, 18),
          scale: () => gsap.utils.random(0.85, 1.2),
          duration: 16 + i * 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        })
      );
    });

    let setX: ((v: number) => void) | null = null;
    let setY: ((v: number) => void) | null = null;
    if (spot.current && window.matchMedia("(pointer: fine)").matches) {
      setX = gsap.quickTo(spot.current, "x", { duration: 0.6, ease: "power3" }) as unknown as (v: number) => void;
      setY = gsap.quickTo(spot.current, "y", { duration: 0.6, ease: "power3" }) as unknown as (v: number) => void;
    }
    const onMove = (e: PointerEvent) => {
      setX?.(e.clientX);
      setY?.(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      tweens.forEach((tween) => tween.kill());
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="blueprint absolute inset-0" />
      <div
        className="aurora left-[-15%] top-[-20%] h-[55vw] w-[55vw] opacity-[0.13]"
        style={{ background: "radial-gradient(closest-side, #3b5bfd, transparent 70%)" }}
      />
      <div
        className="aurora right-[-18%] top-[25%] h-[48vw] w-[48vw] opacity-[0.09]"
        style={{ background: "radial-gradient(closest-side, #7c5bfa, transparent 70%)" }}
      />
      <div
        className="aurora bottom-[-25%] left-[20%] h-[50vw] w-[50vw] opacity-[0.07]"
        style={{ background: "radial-gradient(closest-side, #2dd4bf, transparent 70%)" }}
      />
      {/* Cursor spotlight over the grid */}
      <div
        ref={spot}
        className="absolute left-0 top-0 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(91,123,250,0.07), transparent 70%)",
          marginLeft: "-350px",
          marginTop: "-350px",
        }}
      />
    </div>
  );
}
