import { education, records } from "@/lib/data";
import Reveal from "./reveal";

export default function Changelog() {
  return (
    <div className="relative border-l border-rule pl-8 md:pl-14">
      <div className="space-y-16 md:space-y-20">
        {records.map((record, i) => {
          const version = `v${records.length - i}.0`;
          return (
            <Reveal key={version} delay={i * 50}>
              <article className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-8 top-1.5 size-2 -translate-x-1/2 rounded-full md:-left-14 ${
                    record.active ? "bg-blue" : "bg-ink"
                  }`}
                />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  <span className="border border-rule px-2 py-0.5 text-ink">
                    {version}
                  </span>
                  <span>{record.period}</span>
                  <span>{record.location}</span>
                  {record.active && (
                    <span className="flex items-center gap-1.5 text-blue">
                      <span className="beat inline-block size-1.5 rounded-full bg-blue" />
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                  {record.role}
                </h3>
                <p className="mt-1 text-ink-soft">{record.company}</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                  {record.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                  {record.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}

        <Reveal delay={100}>
          <article className="relative">
            <span
              aria-hidden
              className="absolute -left-8 top-1.5 size-2 -translate-x-1/2 rounded-full border border-ink bg-paper md:-left-14"
            />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              <span className="border border-rule px-2 py-0.5 text-ink">v0.9</span>
              <span>{education.period}</span>
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
              {education.degree}
            </h3>
            <p className="mt-1 text-ink-soft">
              {education.school} — {education.detail}
            </p>
          </article>
        </Reveal>
      </div>
    </div>
  );
}
