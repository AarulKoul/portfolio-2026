"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, reducedMotion, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger and the
 * scroll position always agree. Anchor clicks are routed through Lenis
 * for eased in-page travel. Disabled under reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1 });
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href") ?? "");
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
