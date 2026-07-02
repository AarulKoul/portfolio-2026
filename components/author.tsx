import { capabilities } from "@/lib/data";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

export default function Author() {
  return (
    <section id="author" className="px-5 pt-24 md:px-10 md:pt-36">
      <SectionHeading
        index="04"
        title="The Author"
        note="Pune, India — UTC +5:30"
      />

      <div className="grid gap-14 py-14 md:grid-cols-12 md:py-20">
        <Reveal className="md:col-span-7">
          <p className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] leading-snug tracking-tight">
            I write software the way a typesetter sets a page —{" "}
            <em className="italic text-ember">
              nothing placed without reason.
            </em>
          </p>
          <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-bone-dim">
            <p>
              Five roles in two years: address data at Tata Technologies, a
              confidential project for a UK cyber lab, insurance analytics at
              Go Digit, and now shipping a production SaaS platform at
              Borderline Genius. The through-line is range — I care about the
              pixel <em className="font-serif italic text-bone">and</em> the
              pipeline: the interface a person touches, and the data that makes
              it honest.
            </p>
            <p>
              Off the clock it&apos;s the same instinct pointed elsewhere — a
              recommendation engine here, a document-chat SaaS there, and a
              standing top-3.5% finish against 1,800+ teams in the Reply Code
              Challenge.
            </p>
          </div>
        </Reveal>

        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {capabilities.map((group, i) => (
              <Reveal key={group.heading} delay={i * 80}>
                <div>
                  <h3 className="border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
                    {group.heading}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-bone-dim">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
