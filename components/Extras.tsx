"use client";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { WEDDING as W, RSVP_WHATSAPP } from "@/lib/data";

export function ScrollBar() {
  const { scrollYProgress } = useScroll(); const s = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX: s }} className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-sindoor via-gold to-marigold" />;
}

export function Sparkles() {
  const [s, setS] = useState<{ id: number; x: number; y: number }[]>([]);
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    let last = 0, id = 0;
    const mv = (e: PointerEvent) => {
      if (Date.now() - last < 45) return; last = Date.now(); const k = id++;
      setS((a) => [...a.slice(-14), { id: k, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setS((a) => a.filter((q) => q.id !== k)), 800);
    };
    window.addEventListener("pointermove", mv); return () => window.removeEventListener("pointermove", mv);
  }, []);
  return (<div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
    {s.map((p) => (<motion.span key={p.id} initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }} animate={{ opacity: 0, scale: 0, y: p.y + 24, rotate: 120 }}
      transition={{ duration: .8 }} className="absolute -ml-2 -mt-2 text-sm text-gold">✦</motion.span>))}</div>);
}

export function Mandala() {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <motion.svg aria-hidden viewBox="-200 -200 400 400" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      className="pointer-events-none absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 opacity-[.14]" fill="none" stroke="#D4A64A" strokeWidth=".7">
      {[190, 150, 100, 50].map((r) => <circle key={r} r={r} strokeDasharray={r % 100 ? "2 5" : undefined} />)}
      {petals.map((a) => (<g key={a} transform={`rotate(${a})`}>
        <path d="M0 -100 C 22 -140 22 -170 0 -190 C -22 -170 -22 -140 0 -100Z" /><path d="M0 -50 C 10 -70 10 -85 0 -100 C -10 -85 -10 -70 0 -50Z" /></g>))}
    </motion.svg>);
}

export function Actions() {
  const ics = () => {
    const f = "20270212T133000Z", e = "20270212T180000Z";
    const t = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Shubho Bibaho - ${W.bride} & ${W.groom}\nDTSTART:${f}\nDTEND:${e}\nLOCATION:${W.venue}, ${W.address}\nEND:VEVENT\nEND:VCALENDAR`;
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([t], { type: "text/calendar" })); a.download = "wedding.ics"; a.click();
  };
  const share = () => window.open(`https://wa.me/?text=${encodeURIComponent(`You're invited to ${W.bride} & ${W.groom}'s wedding on 12 Feb 2027 💍 ${location.href}`)}`, "_blank");
  const b = "rounded-full border border-gold/60 px-6 py-3 text-gold transition hover:bg-gold hover:text-maroon";
  return (<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 flex flex-wrap justify-center gap-3">
    <motion.button whileTap={{ scale: .94 }} whileHover={{ y: -3 }} onClick={ics} className={b}>Add to calendar</motion.button>
    <motion.button whileTap={{ scale: .94 }} whileHover={{ y: -3 }} onClick={share} className={b}>Share on WhatsApp</motion.button></motion.div>);
}

export function RSVP() {
  const [name, setName] = useState(""); const [n, setN] = useState(1); const [yes, setYes] = useState(true); const [sent, setSent] = useState(false);
  const submit = () => {
    if (!name.trim()) return; setSent(true);
    const msg = `${yes ? "✅ Joyfully accepting" : "💌 Regretfully declining"}: ${name} (${yes ? n + " guest(s)" : "with blessings"})`;
    setTimeout(() => window.open(`https://wa.me/${RSVP_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank"), 1400);
  };
  return (
    <section id="rsvp" className="relative mx-auto max-w-xl px-5 py-24 text-center">
      <p className="italic text-gold">Will you join us?</p><h2 className="font-bangla text-5xl">Uttor</h2>
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-gold/50 bg-wine/50 p-8 backdrop-blur">
        <AnimatePresence mode="wait">{!sent ? (
          <motion.div key="f" exit={{ opacity: 0, y: -20 }} className="space-y-6">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name"
              className="w-full border-b border-gold/60 bg-transparent py-2 text-center text-xl placeholder:text-ivory/40 focus:outline-none" />
            <div className="relative mx-auto grid max-w-xs grid-cols-2 rounded-full border border-gold/50 p-1">
              <motion.span layout className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-gold" animate={{ left: yes ? 4 : "50%" }} />
              {[["Joyfully yes", true], ["Sadly no", false]].map(([l, v]) => (
                <button key={String(l)} onClick={() => setYes(v as boolean)} className={`relative z-10 py-2 transition ${yes === v ? "text-maroon" : "text-ivory/70"}`}>{l as string}</button>))}
            </div>
            {yes && (<div className="flex items-center justify-center gap-5">
              <button onClick={() => setN(Math.max(1, n - 1))} className="h-10 w-10 rounded-full border border-gold/60 text-xl" aria-label="Fewer guests">−</button>
              <motion.span key={n} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-24 text-xl">{n} guest{n > 1 && "s"}</motion.span>
              <button onClick={() => setN(Math.min(8, n + 1))} className="h-10 w-10 rounded-full border border-gold/60 text-xl" aria-label="More guests">+</button></div>)}
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .95 }} onClick={submit} className="rounded-full bg-sindoor px-10 py-3 shadow-lg">Send reply</motion.button>
          </motion.div>
        ) : (
          <motion.div key="t" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} className="relative py-10">
            {Array.from({ length: 18 }, (_, i) => (<motion.span key={i} initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: Math.cos(i * .35) * (90 + (i % 3) * 30), y: Math.sin(i * .35) * (90 + (i % 3) * 30) - 20, opacity: 0, rotate: 200 }}
              transition={{ duration: 1.3, ease: "easeOut" }} className="absolute left-1/2 top-1/2 text-gold">{i % 2 ? "✦" : "❀"}</motion.span>))}
            <p className="font-bangla text-3xl text-gold">ধন্যবাদ</p>
            <p className="mt-3 text-ivory/80">Thank you, {name}. Opening WhatsApp to send your reply…</p></motion.div>)}</AnimatePresence>
      </div>
      <Actions />
    </section>);
}
