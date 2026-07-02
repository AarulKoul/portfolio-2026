import { identity } from "@/lib/data";
import LocalTime from "./local-time";
import Reveal from "./reveal";

export default function Contact() {
  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className="px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50">
            <span className="text-blue">06</span> — Contact
          </p>
          <h2 className="mt-10 text-[clamp(3.5rem,13vw,13rem)] font-extrabold leading-[0.86] tracking-[-0.05em]">
            LET&apos;S
            <br />
            BUILD<span className="text-blue">.</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <a
            href={`mailto:${identity.email}`}
            className="mt-14 inline-block break-all text-[clamp(1.3rem,3.5vw,2.6rem)] font-medium tracking-[-0.02em] transition-colors duration-400 hover:text-blue md:mt-20"
          >
            {identity.email} <span aria-hidden>↗</span>
          </a>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-16 grid gap-y-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50 sm:grid-cols-2 lg:grid-cols-4 md:mt-24">
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule w-fit transition-colors duration-300 hover:text-paper"
            >
              GitHub ↗
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule w-fit transition-colors duration-300 hover:text-paper"
            >
              LinkedIn ↗
            </a>
            <p className="flex items-center gap-2">
              <span className="beat inline-block size-1.5 rounded-full bg-blue" />
              Open to work
            </p>
            <p className="lg:text-right">
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
