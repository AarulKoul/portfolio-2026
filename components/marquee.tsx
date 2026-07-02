import { marqueeItems } from "@/lib/data";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {marqueeItems.map((item) => (
        <span
          key={item}
          className="flex items-center font-mono text-xs uppercase tracking-[0.28em] text-bone-dim"
        >
          <span className="px-6">{item}</span>
          <span className="text-ember">✳</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line py-4">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
