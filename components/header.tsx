"use client";

import { useEffect, useState } from "react";
import RollLabel from "./roll-label";
import ScrollProgress from "./scroll-progress";

const links = [
  { label: "Index", href: "#index" },
  { label: "Changelog", href: "#changelog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * The header retreats while reading (scroll down) and returns when
 * summoned (scroll up); the active section is tracked and marked blue.
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
      className={`site-header fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md ${
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
              className={`whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                active === link.href
                  ? "text-blue"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              <RollLabel text={link.label} />
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

        <p className="hidden items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft lg:flex">
          <span className="beat inline-block size-1.5 rounded-full bg-blue" />
          Open to work
        </p>
      </div>
      <ScrollProgress />
    </header>
  );
}
