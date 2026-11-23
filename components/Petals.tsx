"use client";
import { useEffect, useState } from "react";
export default function Petals({ n = 22 }: { n?: number }) {
  const [p, setP] = useState<any[]>([]);
  useEffect(() => setP(Array.from({ length: n }, () => ({
    l: Math.random() * 100, s: 8 + Math.random() * 12, d: 9 + Math.random() * 10,
    dl: -Math.random() * 18, dx: (Math.random() - .5) * 160, c: ["#F29A1F", "#D4A64A", "#B3201F"][Math.floor(Math.random() * 3)],
  }))), [n]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {p.map((x, i) => (
        <span key={i} className="absolute top-0 animate-fall rounded-[60%_0_60%_0] opacity-80"
          style={{ left: `${x.l}%`, width: x.s, height: x.s * 1.2, background: x.c, animationDelay: `${x.dl}s`, ["--d" as any]: `${x.d}s`, ["--dx" as any]: `${x.dx}px` }} />
      ))}
    </div>
  );
}
