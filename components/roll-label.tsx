/** Hover label that rolls up and is replaced by its twin from below. */
export default function RollLabel({ text }: { text: string }) {
  return (
    <span className="roll">
      <span className="roll-inner">
        <span>{text}</span>
        <span aria-hidden>{text}</span>
      </span>
    </span>
  );
}
