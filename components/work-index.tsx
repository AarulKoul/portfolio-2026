"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import ArrowIcon from "./arrow-icon";
import Reveal from "./reveal";
import RollLabel from "./roll-label";

export default function WorkIndex() {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-rule">
      {projects.map((project, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={project.name} delay={i * 70}>
            <article className="border-b border-rule">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`project-panel-${i}`}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-7 text-left md:grid-cols-[4rem_1fr_auto_3rem] md:gap-x-8 md:py-9"
              >
                <span
                  className={`font-mono text-xs tracking-[0.2em] transition-colors duration-300 ${
                    isOpen ? "text-blue" : "text-ink-soft"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`text-[clamp(1.9rem,4.6vw,4rem)] font-extrabold leading-none tracking-[-0.035em] transition-all duration-500 ${
                    isOpen ? "text-blue" : "group-hover:translate-x-2"
                  }`}
                >
                  {project.name}
                </h3>
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft md:block">
                  {project.tagline}
                </span>
                <span
                  aria-hidden
                  className={`justify-self-end text-2xl font-light leading-none transition-transform duration-500 md:text-3xl ${
                    isOpen ? "rotate-45 text-blue" : "group-hover:rotate-90"
                  }`}
                >
                  +
                </span>
              </button>

              <div
                id={`project-panel-${i}`}
                className={`acc-panel ${isOpen ? "open" : ""}`}
              >
                <div>
                  <div className="acc-inner grid gap-x-8 gap-y-8 pb-10 md:grid-cols-[4rem_1fr] md:pb-12">
                    <span className="hidden md:block" aria-hidden />
                    <div className="grid gap-x-8 gap-y-8 md:grid-cols-12">
                      <p className="max-w-md leading-relaxed text-ink-soft md:col-span-6">
                        <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink md:hidden">
                          {project.tagline}
                        </span>
                        {project.description}
                      </p>
                      <ul className="flex flex-col gap-1.5 md:col-span-3">
                        {project.stack.map((tech) => (
                          <li
                            key={tech}
                            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <div className="md:col-span-3 md:justify-self-end">
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em]"
                        >
                          <RollLabel text="Open repository" />
                          <ArrowIcon />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
