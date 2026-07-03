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
    <section id={id} className="relative border-t border-line px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-3">
          <p className="sticky top-24 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            <span className="text-blue">{index}</span> — {label}
          </p>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
