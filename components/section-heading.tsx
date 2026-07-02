import Reveal from "./reveal";

export default function SectionHeading({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note: string;
}) {
  return (
    <Reveal>
      <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember">
            SEC. {index}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-tight">
            {title}
          </h2>
        </div>
        <p className="hidden pb-2 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim md:block">
          {note}
        </p>
      </div>
    </Reveal>
  );
}
