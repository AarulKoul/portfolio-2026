import { projects } from "@/lib/data";
import FigureArt from "./figures-art";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

export default function Work() {
  return (
    <section id="work" className="px-5 pt-24 md:px-10 md:pt-36">
      <SectionHeading
        index="01"
        title="Selected Work"
        note="Four projects, personally typeset"
      />

      {projects.map((project, i) => (
        <Reveal key={project.name}>
          <article className="group grid gap-10 border-b border-line py-14 md:grid-cols-12 md:gap-14 md:py-20">
            <div
              className={`flex flex-col justify-between md:col-span-7 ${
                i % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <div>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs tracking-[0.3em] text-ember">
                    {project.index}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim">
                    {project.tagline}
                  </span>
                </div>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block"
                >
                  <h3 className="font-serif text-[clamp(2.25rem,5.5vw,4.25rem)] leading-none tracking-tight transition-colors duration-500 group-hover:text-ember">
                    {project.name}
                  </h3>
                </a>
                <p className="mt-6 max-w-lg leading-relaxed text-bone-dim">
                  {project.description}
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-rule font-mono text-[11px] uppercase tracking-[0.22em] text-bone"
                >
                  Read the source ↗
                </a>
              </div>
            </div>

            <figure
              className={`self-center md:col-span-5 ${
                i % 2 === 1 ? "md:order-1" : ""
              }`}
            >
              <FigureArt kind={project.figure} />
              <figcaption className="mt-4 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim">
                Fig. {String(i + 1).padStart(2, "0")} — {project.figureCaption}
              </figcaption>
            </figure>
          </article>
        </Reveal>
      ))}
    </section>
  );
}
