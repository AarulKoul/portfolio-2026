import { capabilities, education } from "@/lib/data";
import Reveal from "./reveal";

const facts = [
  { key: "Location", value: "Pune, India — UTC+5:30" },
  { key: "Education", value: `B.Tech CSE — ${education.detail}` },
  { key: "Currently", value: "SDE @ Borderline Genius" },
  { key: "Distinction", value: "Top 3.5% — Reply Code Challenge" },
];

export default function About() {
  return (
    <div>
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="text-[clamp(1.5rem,2.8vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
            Five roles in two years — Tata Technologies, a UK cyber lab,
            insurance analytics at Go Digit, and now a production SaaS
            platform. The through-line: I care about{" "}
            <span className="hl">the pixel and the pipeline</span> — the
            interface a person touches, and the data that makes it honest.
          </p>
          <p className="mt-8 max-w-xl leading-relaxed text-ink-soft">
            Off the clock it&apos;s the same instinct pointed elsewhere — a
            recommendation engine here, a document-chat SaaS there. I treat
            typography, latency, and dataset hygiene as the same discipline:
            details someone else will feel even if they never see them.
          </p>
        </Reveal>

        <Reveal delay={120} className="md:col-span-4 md:col-start-9">
          <dl className="divide-y divide-rule border-y border-rule">
            {facts.map((fact) => (
              <div key={fact.key} className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                <dt className="font-mono text-[10px] uppercase leading-5 tracking-[0.2em] text-ink-soft">
                  {fact.key}
                </dt>
                <dd className="text-sm leading-5">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <div className="mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((group) => (
            <div key={group.heading}>
              <h3 className="border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
