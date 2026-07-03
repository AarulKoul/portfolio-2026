import type { CSSProperties } from "react";

/**
 * Each project card hosts a miniature of the actual product — a framed
 * mini-app built from HTML/SVG. Elements boot in staggered when the card
 * enters (.pm .in / .grow / .draw, driven by the card's .is-visible),
 * then ambient micro-loops keep each UI alive: typing indicators, live
 * tickers, a language toggle, a pulsing citation.
 */

const st = (i: number, sx?: number) =>
  ({ "--i": i, ...(sx !== undefined ? { "--sx": sx } : {}) }) as CSSProperties;

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pm overflow-hidden rounded-xl border border-line bg-[rgba(8,10,15,0.72)]">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2 rounded-full bg-[#febc2e]/80" />
        <span className="size-2 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          {title}
        </span>
      </div>
      <div className="h-44 p-3">{children}</div>
    </div>
  );
}

/* EDITools — a live chat-with-your-PDF session */
function EditoolsMock() {
  return (
    <Frame title="editools — workspace/lease.pdf">
      <div className="grid h-full grid-cols-5 gap-2.5">
        {/* the document */}
        <div className="col-span-2 flex flex-col rounded-md border border-line bg-[rgba(233,236,245,0.03)] p-2">
          <p className="in mb-2 font-mono text-[8px] uppercase tracking-[0.16em] text-muted" style={st(0)}>
            lease.pdf · p.14
          </p>
          <div className="space-y-1.5">
            <div className="in h-1 w-11/12 rounded bg-line" style={st(0)} />
            <div className="in h-1 w-full rounded bg-line" style={st(0)} />
            <div className="in h-1 w-4/5 rounded bg-line" style={st(1)} />
            <div className="in border-l-2 border-blue bg-blue/15 py-1 pl-1.5" style={st(2)}>
              <div className="pm-pulse space-y-1">
                <div className="h-1 w-11/12 rounded bg-blue/70" />
                <div className="h-1 w-3/5 rounded bg-blue/70" />
              </div>
            </div>
            <div className="in h-1 w-full rounded bg-line" style={st(3)} />
            <div className="in h-1 w-2/3 rounded bg-line" style={st(3)} />
          </div>
        </div>
        {/* the conversation */}
        <div className="col-span-3 flex flex-col gap-1.5">
          <div className="in ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-blue px-2 py-1 text-[9.5px] leading-snug text-void" style={st(1)}>
            What&apos;s the termination clause?
          </div>
          <div className="in max-w-[90%] rounded-lg rounded-bl-sm border border-line bg-panel px-2 py-1 text-[9.5px] leading-snug text-fg/90" style={st(3)}>
            30-day written notice — Section 12.3.{" "}
            <span className="ml-0.5 rounded border border-cyan/40 px-1 font-mono text-[7.5px] uppercase tracking-wide text-cyan">
              p.14
            </span>
          </div>
          <div className="flex-1" />
          <div className="in flex items-center justify-between rounded-md border border-line px-2 py-1.5" style={st(4)}>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted">
              Ask your document…
            </span>
            <span className="term-caret" style={{ height: "0.7rem", width: "0.22rem" }} />
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* Kamao — the pitch room: video pitch, live revenue, funding progress */
function KamaoMock() {
  return (
    <Frame title="kamao — pitch room">
      <div className="grid h-full grid-cols-5 gap-2.5">
        <div className="col-span-2 flex flex-col gap-2">
          {/* video pitch */}
          <div className="in relative flex-1 overflow-hidden rounded-md border border-line bg-gradient-to-br from-[#141a2c] to-[#0b0e17]" style={st(0)}>
            <span className="absolute left-1/2 top-1/2 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fg/50">
              <span className="ml-0.5 border-y-[3.5px] border-l-[6px] border-y-transparent border-l-fg/80" />
            </span>
            <span className="absolute left-1.5 top-1.5 font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
              pitch.mp4
            </span>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
              <span className="pm-progress absolute inset-0 bg-blue" />
            </span>
          </div>
          {/* funding */}
          <div className="in" style={st(1)}>
            <div className="flex justify-between font-mono text-[8px] uppercase tracking-[0.12em]">
              <span className="text-fg">₹4.2L raised</span>
              <span className="text-muted">of ₹6L</span>
            </div>
            <div className="relative mt-1 h-1.5 overflow-hidden rounded-full bg-line">
              <span
                className="grow absolute inset-0 rounded-full bg-gradient-to-r from-blue to-cyan"
                style={st(1, 0.7)}
              />
              <span className="pm-shimmer absolute inset-y-0 w-1/3 -skew-x-12 bg-white/15" />
            </div>
          </div>
          {/* investors */}
          <div className="in flex items-center" style={st(2)}>
            <span className="size-4 rounded-full border border-void bg-[#3b5bfd]" />
            <span className="-ml-1.5 size-4 rounded-full border border-void bg-[#7c5bfa]" />
            <span className="-ml-1.5 size-4 rounded-full border border-void bg-[#2dd4bf]" />
            <span className="ml-2 font-mono text-[7.5px] uppercase tracking-[0.14em] text-muted">
              +2 interested
            </span>
          </div>
        </div>
        {/* live revenue chart */}
        <div className="col-span-3 flex flex-col rounded-md border border-line p-2">
          <div className="in flex items-center justify-between" style={st(1)}>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
              Revenue
            </span>
            <span className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.16em] text-cyan">
              <span className="pm-pulse size-1 rounded-full bg-cyan" />
              live
            </span>
          </div>
          <svg viewBox="0 0 150 84" className="mt-1 w-full flex-1" fill="none" aria-hidden>
            {[
              { x: 8, h: 22 },
              { x: 36, h: 34 },
              { x: 64, h: 28 },
              { x: 92, h: 48 },
              { x: 120, h: 60 },
            ].map((bar, i) => (
              <rect
                key={i}
                className="in"
                style={st(i * 0.5 + 2)}
                x={bar.x}
                y={78 - bar.h}
                width="18"
                height={bar.h}
                rx="1.5"
                fill="rgba(148,158,190,0.16)"
              />
            ))}
            <polyline
              className="draw"
              points="10,62 44,50 72,54 100,34 128,16 144,10"
              stroke="#5b7bfa"
              strokeWidth="1.6"
              pathLength={1}
            />
            <circle className="pm-pulse" cx="144" cy="10" r="2.6" fill="#67e8f9" />
          </svg>
        </div>
      </div>
    </Frame>
  );
}

/* PolyTalks — a live bilingual exchange */
function PolytalksMock() {
  return (
    <Frame title="polytalks — live session">
      <div className="flex h-full flex-col gap-1.5">
        <div className="in flex items-center justify-between" style={st(0)}>
          <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
            <span className="size-1.5 rounded-full bg-violet" />
            Ana · es
          </span>
          {/* language toggle */}
          <span className="relative h-4 w-12 rounded-full border border-line bg-panel">
            <span className="absolute inset-y-0 left-1 flex items-center font-mono text-[6.5px] text-muted">
              EN
            </span>
            <span className="absolute inset-y-0 right-1 flex items-center font-mono text-[6.5px] text-muted">
              ES
            </span>
            <span className="pm-toggle absolute left-0.5 top-0.5 h-3 w-[22px] rounded-full bg-blue/80" />
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
            Dev · en
            <span className="size-1.5 rounded-full bg-cyan" />
          </span>
        </div>

        <div className="in max-w-[75%] rounded-lg rounded-bl-sm border border-line bg-panel px-2 py-1 text-[9.5px] leading-snug text-fg/90" style={st(1)}>
          ¡Hola! ¿Listo para practicar?
        </div>
        <div className="in ml-auto max-w-[75%] rounded-lg rounded-br-sm bg-blue px-2 py-1 text-[9.5px] leading-snug text-void" style={st(2)}>
          Sí! Corrígeme por favor
        </div>
        <div className="in max-w-[75%] rounded-lg rounded-bl-sm border border-line bg-panel px-2 py-1 text-[9.5px] leading-snug" style={st(3)}>
          <span className="text-cyan">✓ perfecto</span>
          <span className="text-fg/90"> — that was flawless</span>
        </div>
        <div className="pm-type in flex w-fit items-center gap-1 rounded-lg rounded-bl-sm border border-line bg-panel px-2 py-1.5" style={st(4)}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1 rounded-full bg-muted"
              style={{ "--i": i } as CSSProperties}
            />
          ))}
        </div>
        <div className="flex-1" />
        <p className="in text-center font-mono text-[7.5px] uppercase tracking-[0.2em] text-muted" style={st(5)}>
          matched · b2 ⇄ native · firestore live
        </p>
      </div>
    </Frame>
  );
}

/* Movie Recommender — seed film in, ranked similarity out */
function RecommenderMock() {
  const results = [
    { rank: "01", title: "Interstellar", pct: 92, sx: 0.92 },
    { rank: "02", title: "Tenet", pct: 87, sx: 0.87 },
    { rank: "03", title: "Memento", pct: 81, sx: 0.81 },
  ];
  return (
    <Frame title="recommender — top-k results">
      <div className="grid h-full grid-cols-5 gap-2.5">
        {/* the seed film */}
        <div className="in relative col-span-2 flex flex-col justify-between rounded-md border border-blue/40 bg-gradient-to-br from-[#131a30] to-[#0b0e17] p-2" style={st(0)}>
          <span className="pm-pulse pointer-events-none absolute -inset-px rounded-md border border-blue/50" />
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-blue">seed</p>
            <p className="mt-1 text-[11px] font-bold tracking-tight">INCEPTION</p>
            <p className="mt-0.5 font-mono text-[8px] text-muted">★ 8.8 · sci-fi</p>
          </div>
          <div className="in flex flex-wrap gap-1" style={st(1)}>
            {["dreams", "heist", "nolan"].map((tag) => (
              <span
                key={tag}
                className="rounded border border-line px-1 py-px font-mono text-[6.5px] uppercase tracking-wide text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* ranked output */}
        <div className="col-span-3 flex flex-col gap-1.5">
          <p className="in font-mono text-[8px] uppercase tracking-[0.16em] text-muted" style={st(1)}>
            cosine similarity · top-3
          </p>
          {results.map((r, i) => (
            <div key={r.title} className="in flex items-center gap-2" style={st(i + 2)}>
              <span className="font-mono text-[8px] text-muted">{r.rank}</span>
              <span className="w-20 truncate text-[9.5px] font-semibold">{r.title}</span>
              <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-line">
                <span
                  className="grow absolute inset-0 rounded-full bg-gradient-to-r from-blue to-cyan"
                  style={st(i + 2, r.sx)}
                />
              </span>
              <span className="font-mono text-[8px] text-cyan">{r.pct}%</span>
            </div>
          ))}
          <div className="flex-1" />
          <p className="in font-mono text-[7.5px] uppercase tracking-[0.18em] text-muted" style={st(5)}>
            pandas · scikit-learn · 5,000+ films
          </p>
        </div>
      </div>
    </Frame>
  );
}

const mockups = [EditoolsMock, KamaoMock, PolytalksMock, RecommenderMock];

export default function ProjectFigure({ index }: { index: number }) {
  const Mockup = mockups[index % mockups.length];
  return <Mockup />;
}
