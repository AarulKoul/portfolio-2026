"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

const LINES = [
  "$ aarul --init",
  "  loading modules: react next.js typescript ... ok",
  "  hydrating experience ... ok",
  "  ready.",
];

declare global {
  interface Window {
    __booted?: boolean;
  }
}

const finish = () => {
  window.__booted = true;
  window.dispatchEvent(new Event("ak:booted"));
};

/**
 * A terminal boots the site on first visit, then the overlay lifts.
 * Skipped for the rest of the session, on reduced motion, and on click.
 */
export default function BootIntro() {
  const overlay = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (reducedMotion() || sessionStorage.getItem("ak-booted")) {
      setGone(true);
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    const text = LINES.join("\n");
    let i = 0;
    let lift: gsap.core.Tween | null = null;
    let done = false;

    const leave = () => {
      if (done) return;
      done = true;
      sessionStorage.setItem("ak-booted", "1");
      lift = gsap.to(overlay.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onStart: finish,
        onComplete: () => setGone(true),
      });
    };

    const interval = setInterval(() => {
      i += 3;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(leave, 350);
      }
    }, 24);

    const skip = () => leave();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    return () => {
      clearInterval(interval);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      lift?.kill();
    };
  }, []);

  useEffect(() => {
    if (gone) document.body.style.overflow = "";
  }, [gone]);

  if (gone) return null;

  return (
    <div
      ref={overlay}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center bg-void px-6 md:px-[18vw]"
    >
      <pre className="whitespace-pre-wrap font-mono text-[13px] leading-7 text-muted md:text-sm">
        {typed}
        <span className="term-caret ml-1" />
      </pre>
      <p className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/60">
        Click to skip
      </p>
    </div>
  );
}
