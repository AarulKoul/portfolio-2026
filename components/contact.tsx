import { identity } from "@/lib/data";
import LocalTime from "./local-time";
import Reveal from "./reveal";

export default function Contact() {
  return (
    <footer id="contact" className="mt-24 border-t border-line px-5 md:mt-36 md:px-10">
      <div className="py-20 md:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember">
            SEC. 05 — Correspondence
          </p>
          <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-tight">
            Let&apos;s set something{" "}
            <em className="italic">worth reading twice.</em>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <a
            href={`mailto:${identity.email}`}
            className="group mt-14 inline-block break-all font-serif text-[clamp(1.4rem,4.5vw,3.25rem)] italic leading-none tracking-tight md:mt-20"
          >
            <span className="transition-colors duration-500 group-hover:text-ember">
              {identity.email}
            </span>
            <span className="ml-3 inline-block text-ember transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 md:mt-20">
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim transition-colors duration-300 hover:text-bone"
            >
              GitHub ↗
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-rule font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim transition-colors duration-300 hover:text-bone"
            >
              LinkedIn ↗
            </a>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim">
              Currently — SDE @ Borderline Genius
            </p>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col gap-2 border-t border-line py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim md:flex-row md:items-center md:justify-between">
        <p>© 2026 Aarul Koul — Engineering Journal, Vol. 01</p>
        <p className="hidden lg:block">
          Set in Fraunces, Archivo & JetBrains Mono
        </p>
        <p>
          <LocalTime />
        </p>
      </div>
    </footer>
  );
}
