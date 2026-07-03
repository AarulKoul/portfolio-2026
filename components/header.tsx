"use client";

import { useEffect, useState } from "react";
import ScrollProgress from "./scroll-progress";

const links = [
  { label: "Work", href: "#index" },
  { label: "Career", href: "#changelog" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Retreats while reading, returns on scroll-up; tracks the active
 * section and marks it blue.
 */
export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 120) setHidden(false);
      else if (y > last + 6) setHidden(true);
      else if (y < last - 6) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    links.forEach((link) => {
      const target = document.querySelector(link.href);
      if (target) observer.observe(target);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 border-b border-line bg-void/75 backdrop-blur-md ${
        hidden ? "hidden-bar" : ""
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <a
          href="#top"
          className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.02em]"
          aria-label="Back to top"
        >
          A.KOUL<span className="text-blue">©</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`link-rule whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                active === link.href ? "text-blue" : "text-muted hover:text-fg"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] md:hidden"
        >
          <span className="beat inline-block size-1.5 rounded-full bg-blue" />
          Contact
        </a>

        <p className="hidden items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-muted lg:flex">
          <span className="beat inline-block size-1.5 rounded-full bg-blue" />
          Open to work
        </p>
      </div>
      <ScrollProgress />
    </header>
  );
}
