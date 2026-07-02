import DrawRule from "./draw-rule";
import Parallax from "./parallax";

export default function Section({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative px-5 py-24 md:px-10 md:py-36">
      <div className="absolute inset-x-5 top-0 md:inset-x-10">
        <DrawRule className="text-rule" />
      </div>

      {/* Ghost numeral drifting slower than the page — background wayfinding */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax speed={0.25} className="absolute -right-[2vw] top-10">
          <span className="numeral block text-[clamp(9rem,24vw,20rem)]">
            {index}
          </span>
        </Parallax>
      </div>

      <div className="relative grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-3">
          <p className="sticky top-24 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
            <span className="text-blue">{index}</span> — {label}
          </p>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
