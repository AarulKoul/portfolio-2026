"use client";

import { useEffect, useRef } from "react";

const LABELS = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Node.js",
  "Tailwind",
  "PostgreSQL",
  "Docker",
  "Firebase",
  "GCP",
  "Pandas",
  "Java",
];

const ANON_COUNT = 16;
const LINK_DIST = 150;
const CURSOR_DIST = 170;

// Deterministic pseudo-random so layout is stable across mounts
const seeded = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label?: string;
};

/**
 * The hero's living background: the stack as a drifting constellation.
 * Edges form between nearby nodes; near the cursor, nodes are pushed
 * aside and their edges glow cyan — the system reacts to being touched.
 */
export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    const nodes: Node[] = [...LABELS, ...Array(ANON_COUNT).fill(null)].map(
      (label, i) => ({
        x: seeded(i * 2 + 1),
        y: seeded(i * 2 + 2),
        vx: (seeded(i * 3 + 1) - 0.5) * 0.35,
        vy: (seeded(i * 3 + 2) - 0.5) * 0.35,
        label: label ?? undefined,
      })
    );
    let scaled = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!scaled) {
        nodes.forEach((node) => {
          node.x *= rect.width;
          node.y *= rect.height;
        });
        scaled = true;
      }
      width = rect.width;
      height = rect.height;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DIST) continue;
          const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
          const mDist = Math.hypot(mouse.x - mid.x, mouse.y - mid.y);
          const near = Math.max(0, 1 - mDist / CURSOR_DIST);
          const alpha = (1 - dist / LINK_DIST) * (0.14 + near * 0.45);
          ctx.strokeStyle = near > 0.25
            ? `rgba(103, 232, 249, ${alpha})`
            : `rgba(120, 140, 210, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes + labels
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      nodes.forEach((node) => {
        const mDist = Math.hypot(mouse.x - node.x, mouse.y - node.y);
        const near = Math.max(0, 1 - mDist / CURSOR_DIST);
        const r = node.label ? 2.8 + near * 1.6 : 1.6 + near;
        ctx.fillStyle = node.label
          ? `rgba(122, 148, 255, ${0.75 + near * 0.25})`
          : `rgba(140, 155, 200, ${0.4 + near * 0.4})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
        if (node.label) {
          ctx.fillStyle = `rgba(160, 172, 205, ${0.5 + near * 0.5})`;
          ctx.fillText(node.label, node.x + 8, node.y - 7);
        }
      });
    };

    const step = () => {
      frame = requestAnimationFrame(step);
      if (!running) return;
      nodes.forEach((node) => {
        // gentle drift
        node.x += node.vx;
        node.y += node.vy;
        // cursor repulsion
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0.01) {
          const force = ((110 - dist) / 110) * 1.4;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }
        // wrap around edges
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      });
      draw();
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
    });
    observer.observe(canvas);

    if (reduced) {
      draw();
    } else {
      frame = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-90"
    />
  );
}
