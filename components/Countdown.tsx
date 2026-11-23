"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WEDDING } from "@/lib/data";
const calc = () => { const t = Math.max(0, +new Date(WEDDING.date) - Date.now());
  return [["Din", t / 864e5], ["Ghonta", (t / 36e5) % 24], ["Minit", (t / 6e4) % 60], ["Second", (t / 1e3) % 60]].map(([l, v]) => [l as string, Math.floor(v as number)] as const); };
export default function Countdown() {
  const [t, setT] = useState<ReturnType<typeof calc> | null>(null);
  useEffect(() => { setT(calc()); const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-5">
      {(t ?? [["Din", 0], ["Ghonta", 0], ["Minit", 0], ["Second", 0]] as const).map(([l, v]) => (
        <div key={l} className="rounded-xl border border-gold/40 bg-wine/60 py-5 backdrop-blur">
          <div className="relative h-12 overflow-hidden text-4xl font-semibold text-gold sm:h-16 sm:text-6xl">
            <AnimatePresence mode="popLayout">
              <motion.span key={v} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: .35 }} className="absolute inset-0 grid place-items-center">{String(v).padStart(2, "0")}</motion.span>
            </AnimatePresence>
          </div>
          <p className="mt-2 font-bangla text-sm text-ivory/70">{l}</p>
        </div>))}
    </div>);
}
