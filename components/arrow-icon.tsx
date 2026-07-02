/**
 * Diagonal arrow that exits the way it points on hover while its twin
 * arrives from behind — works inside any `a` or `.group` parent.
 */
function Glyph() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2.5 9.5 L9.5 2.5 M4 2.5 H9.5 V8" />
    </svg>
  );
}

export default function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`arrow-swap ${className}`} aria-hidden>
      <Glyph />
      <Glyph />
    </span>
  );
}
