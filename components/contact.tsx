import type { CSSProperties } from "react";
import { identity } from "@/lib/data";
import ArrowIcon from "./arrow-icon";
import Letters from "./letters";
import LocalTime from "./local-time";
import Magnetic from "./magnetic";
import Reveal from "./reveal";
import RollLabel from "./roll-label";

export default function Contact() {
  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className="px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50">
            <span className="text-blue">06</span> — Contact
          </p>
        </Reveal>
        <h2 className="mt-10 text-[clamp(3.5rem,13vw,13rem)] font-extrabold leading-[0.86] tracking-[-0.05em]">
          <Letters lines={["LET'S", "BUILD."]} />
        </h2>

        <Reveal delay={150}>
          <Magnetic strength={0.18} className="mt-14 md:mt-20">
            <a
              href={`mailto:${identity.email}`}
              className="group inline-flex items-center gap-3 break-all text-[clamp(1.3rem,3.5vw,2.6rem)] font-medium tracking-[-0.02em] transition-colors duration-400 hover:text-blue"
            >
              {identity.email}
              <ArrowIcon />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal variant="group" delay={250}>
          <div className="mt-16 grid gap-y-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
            <div className="sk" style={{ "--i": 0 } as CSSProperties}>
              <Magnetic strength={0.3}>
                <a
                  href={identity.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors duration-300 hover:text-paper"
                >
                  <RollLabel text="GitHub" />
                  <ArrowIcon />
                </a>
              </Magnetic>
            </div>
            <div className="sk" style={{ "--i": 1 } as CSSProperties}>
              <Magnetic strength={0.3}>
                <a
                  href={identity.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors duration-300 hover:text-paper"
                >
                  <RollLabel text="LinkedIn" />
                  <ArrowIcon />
                </a>
              </Magnetic>
            </div>
            <p
              className="sk flex items-center gap-2"
              style={{ "--i": 2 } as CSSProperties}
            >
              <span className="beat inline-block size-1.5 rounded-full bg-blue" />
              Open to work
            </p>
            <p className="sk lg:text-right" style={{ "--i": 3 } as CSSProperties}>
              <LocalTime />
            </p>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col gap-2 border-t border-rule-inv px-5 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 Aarul Koul</p>
        <p className="hidden lg:block">Set in Inter Tight & Geist Mono</p>
        <p>Built with Next.js 16 — no animation libraries</p>
      </div>
    </footer>
  );
}
