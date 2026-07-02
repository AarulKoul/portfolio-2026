import type { Project } from "@/lib/data";

/**
 * Line-art schematics drawn per project — every shape carries pathLength={1}
 * so globals.css can animate stroke-dashoffset and "draw" the figure in
 * when its Reveal wrapper becomes visible.
 */

const svgProps = {
  viewBox: "0 0 420 300",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  className: "figure h-auto w-full text-bone-dim",
  "aria-hidden": true,
} as const;

function EditoolsFigure() {
  return (
    <svg {...svgProps}>
      {/* Source document */}
      <rect x="34" y="58" width="98" height="128" rx="2" pathLength={1} />
      <line x1="50" y1="84" x2="116" y2="84" pathLength={1} />
      <line x1="50" y1="102" x2="116" y2="102" pathLength={1} />
      <line x1="50" y1="120" x2="100" y2="120" pathLength={1} />
      <line x1="50" y1="138" x2="116" y2="138" pathLength={1} />
      <line x1="50" y1="156" x2="88" y2="156" pathLength={1} />
      {/* Into the vector space */}
      <line x1="146" y1="122" x2="188" y2="122" pathLength={1} />
      <polyline points="180,116 188,122 180,128" pathLength={1} />
      <circle cx="232" cy="86" r="6" pathLength={1} />
      <circle cx="272" cy="128" r="6" pathLength={1} />
      <circle cx="226" cy="166" r="6" pathLength={1} />
      <circle cx="292" cy="72" r="6" pathLength={1} />
      <line x1="236" y1="91" x2="267" y2="123" pathLength={1} />
      <line x1="231" y1="160" x2="268" y2="133" pathLength={1} />
      <line x1="238" y1="83" x2="286" y2="74" pathLength={1} />
      {/* The question finds its answer */}
      <g className="text-ember">
        <circle className="dot" cx="255" cy="120" r="3.5" fill="currentColor" />
        <path d="M262 126 C 290 150, 300 160, 316 172" pathLength={1} />
      </g>
      <rect x="306" y="172" width="86" height="52" rx="10" pathLength={1} />
      <path d="M322 224 l-7 16 18 -16" pathLength={1} />
      <line x1="322" y1="190" x2="378" y2="190" pathLength={1} />
      <line x1="322" y1="205" x2="362" y2="205" pathLength={1} />
    </svg>
  );
}

function KamaoFigure() {
  return (
    <svg {...svgProps}>
      {/* Axes */}
      <polyline points="46,44 46,244 388,244" pathLength={1} />
      {/* The business, in bars */}
      <rect x="76" y="192" width="30" height="52" pathLength={1} />
      <rect x="126" y="164" width="30" height="80" pathLength={1} />
      <rect x="176" y="178" width="30" height="66" pathLength={1} />
      <rect x="226" y="130" width="30" height="114" pathLength={1} />
      <rect x="276" y="104" width="30" height="140" pathLength={1} />
      {/* The investor's line of sight */}
      <g className="text-ember">
        <polyline
          points="60,208 91,180 141,152 191,166 241,116 291,88 356,58"
          pathLength={1}
        />
        <polyline points="344,58 356,58 354,70" pathLength={1} />
        <circle className="dot" cx="291" cy="88" r="3.5" fill="currentColor" />
      </g>
      {/* Pitch and capital, exchanged */}
      <circle cx="352" cy="196" r="24" pathLength={1} />
      <path d="M345 196 a7 7 0 1 1 7 7 v6" pathLength={1} />
      <circle className="dot text-ember" cx="352" cy="215" r="1.8" fill="currentColor" />
    </svg>
  );
}

function PolytalksFigure() {
  return (
    <svg {...svgProps}>
      {/* The globe between speakers */}
      <circle cx="210" cy="152" r="78" pathLength={1} />
      <ellipse cx="210" cy="152" rx="78" ry="28" pathLength={1} />
      <ellipse cx="210" cy="152" rx="28" ry="78" pathLength={1} />
      {/* Speaker one */}
      <rect x="34" y="44" width="92" height="54" rx="10" pathLength={1} />
      <path d="M52 98 l-8 16 20 -16" pathLength={1} />
      <line x1="50" y1="63" x2="110" y2="63" pathLength={1} />
      <line x1="50" y1="79" x2="94" y2="79" pathLength={1} />
      {/* Speaker two */}
      <rect x="294" y="200" width="92" height="54" rx="10" pathLength={1} />
      <path d="M368 254 l8 16 -20 -16" pathLength={1} />
      <line x1="310" y1="219" x2="370" y2="219" pathLength={1} />
      <line x1="310" y1="235" x2="354" y2="235" pathLength={1} />
      {/* The conversation crossing it */}
      <g className="text-ember">
        <path d="M126 86 C 180 110, 250 180, 300 212" pathLength={1} />
        <circle className="dot" cx="176" cy="118" r="3" fill="currentColor" />
        <circle className="dot" cx="248" cy="180" r="3" fill="currentColor" />
      </g>
      <circle cx="150" cy="152" r="4" pathLength={1} />
      <circle cx="270" cy="152" r="4" pathLength={1} />
      <circle cx="210" cy="76" r="4" pathLength={1} />
    </svg>
  );
}

function RecommenderFigure() {
  return (
    <svg {...svgProps}>
      {/* The similarity matrix */}
      <line x1="60" y1="52" x2="60" y2="172" pathLength={1} />
      <line x1="100" y1="52" x2="100" y2="172" pathLength={1} />
      <line x1="140" y1="52" x2="140" y2="172" pathLength={1} />
      <line x1="180" y1="52" x2="180" y2="172" pathLength={1} />
      <line x1="220" y1="52" x2="220" y2="172" pathLength={1} />
      <line x1="60" y1="52" x2="220" y2="52" pathLength={1} />
      <line x1="60" y1="92" x2="220" y2="92" pathLength={1} />
      <line x1="60" y1="132" x2="220" y2="132" pathLength={1} />
      <line x1="60" y1="172" x2="220" y2="172" pathLength={1} />
      <g className="text-ember">
        <circle className="dot" cx="120" cy="72" r="4" fill="currentColor" />
        <circle className="dot" cx="200" cy="112" r="4" fill="currentColor" />
        <circle className="dot" cx="80" cy="152" r="4" fill="currentColor" />
      </g>
      {/* Two tastes, one angle */}
      <line x1="86" y1="252" x2="304" y2="140" pathLength={1} />
      <line x1="86" y1="252" x2="356" y2="216" pathLength={1} />
      <circle cx="304" cy="140" r="5" pathLength={1} />
      <circle cx="356" cy="216" r="5" pathLength={1} />
      <g className="text-ember">
        <path d="M146 222 A 62 62 0 0 1 141 224" pathLength={1} />
        <path d="M86 252 m54 -28 a 62 62 0 0 1 8 21" pathLength={1} />
      </g>
    </svg>
  );
}

const figures: Record<Project["figure"], () => React.ReactElement> = {
  editools: EditoolsFigure,
  kamao: KamaoFigure,
  polytalks: PolytalksFigure,
  recommender: RecommenderFigure,
};

export default function FigureArt({ kind }: { kind: Project["figure"] }) {
  const Figure = figures[kind];
  return <Figure />;
}
