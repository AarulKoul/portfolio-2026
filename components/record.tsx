import { education, records } from "@/lib/data";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

export default function RecordSection() {
  return (
    <section id="record" className="px-5 pt-24 md:px-10 md:pt-36">
      <SectionHeading
        index="02"
        title="The Record"
        note="Five roles — 2024 to present"
      />

      <div>
        {records.map((record, i) => (
          <Reveal key={record.index} delay={i * 60}>
            <article className="grid gap-x-8 gap-y-4 border-b border-line px-2 py-10 transition-colors duration-500 hover:bg-ink-raised md:grid-cols-12 md:px-4">
              <div className="md:col-span-3">
                <p className="font-mono text-xs tracking-[0.3em] text-ember">
                  {record.index}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
                  {record.period}
                </p>
                {record.active && (
                  <p className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
                    <span className="beat inline-block size-1.5 rounded-full bg-ember" />
                    Active
                  </p>
                )}
              </div>

              <div className="md:col-span-5">
                <h3 className="font-serif text-2xl tracking-tight md:text-3xl">
                  {record.role}
                </h3>
                <p className="mt-2 text-bone-dim">{record.company}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
                  {record.location}
                </p>
              </div>

              <div className="md:col-span-4">
                <p className="text-sm leading-relaxed text-bone-dim">
                  {record.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                  {record.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal delay={120}>
          <div className="flex flex-col justify-between gap-2 px-2 py-8 md:flex-row md:items-baseline md:px-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim">
              Prior — {education.period}
            </p>
            <p className="text-sm text-bone-dim">
              <span className="font-serif text-base italic text-bone">
                {education.degree}
              </span>
              {" — "}
              {education.school} · {education.detail}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
