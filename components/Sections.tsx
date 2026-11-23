"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Countdown from "./Countdown";
import { Mandala } from "./Extras";
import { WEDDING as W, STORY, EVENTS, DRESS } from "@/lib/data";

const reveal = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: .8, ease: [.22, 1, .36, 1] } } as const;

export function Head({ k, t }: { k: string; t: string }) {
  return (<motion.div {...reveal} className="mb-12 text-center">
    <p className="italic text-gold">{k}</p>
    <h2 className="font-bangla text-5xl text-ivory sm:text-6xl">{t}</h2>
    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: .3, duration: .9 }}
      className="mx-auto mt-4 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
  </motion.div>);
}
const Sec = ({ id, children, cls = "" }: any) => <section id={id} className={`relative mx-auto max-w-5xl px-5 py-24 ${cls}`}>{children}</section>;

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]); const o = useTransform(scrollYProgress, [0, .8], [1, 0]);
  return (
    <header ref={ref} className="relative grid min-h-screen place-items-center overflow-hidden alpona text-center">
      <Mandala />
      <motion.div style={{ y, opacity: o }} className="px-5">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4, duration: 1.2 }} className="font-bangla text-xl text-gold">শুভ বিবাহ</motion.p>
        <h1 className="mt-4 text-6xl font-medium leading-[1.15] sm:text-8xl md:text-9xl">
          {[W.bride, "&", W.groom].map((w, i) => (
            <motion.span key={w} initial={{ opacity: 0, y: 60, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: .6 + i * .35, duration: 1, ease: [.22, 1, .36, 1] }}
              className={`block ${i === 1 ? "my-2 text-4xl italic text-gold" : "gold-text animate-shimmer"}`}>{w}</motion.span>))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} className="mt-8 text-xl tracking-wide text-ivory/80">
          12 February 2027 · Kolkata</motion.p>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-14 text-gold">⌄</motion.div>
      </motion.div>
    </header>);
}

export function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 80, damping: 20 });
  return (<Sec id="golpo"><Head k="Our Story" t="Golpo" />
    <div ref={ref} className="relative mx-auto max-w-2xl pl-10 sm:pl-0">
      <div className="absolute bottom-0 left-3 top-0 w-px bg-gold/20 sm:left-1/2" />
      <motion.div style={{ height: h }} className="absolute left-3 top-0 w-px bg-gold sm:left-1/2" />
      {STORY.map((s, i) => (
        <motion.div key={s.year} initial={{ opacity: 0, x: i % 2 ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: .8 }}
          className={`relative mb-14 sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right"}`}>
          <span className={`absolute top-2 -left-[34px] h-3 w-3 rounded-full bg-gold ring-4 ring-maroon sm:top-2 ${i % 2 ? "sm:-left-[6px]" : "sm:-right-[6px] sm:left-auto"}`} />
          <p className="text-3xl text-gold">{s.year}</p><h3 className="font-bangla text-2xl">{s.title}</h3>
          <p className="mt-2 text-lg leading-relaxed text-ivory/75">{s.text}</p>
        </motion.div>))}
    </div></Sec>);
}

export function Days() {
  return (<Sec id="shubho-din" cls="text-center"><Head k="The Countdown" t="Shubho Din" />
    <motion.p {...reveal} className="italic text-ivory/70">Every heartbeat of the dhak brings us closer.</motion.p><Countdown /></Sec>);
}

export function Events() {
  const ref = useRef<HTMLDivElement>(null);
  return (<Sec id="utsab"><Head k="Celebrations" t="Utsab" />
    <p className="-mt-6 mb-8 text-center italic text-ivory/60">Swipe through four days of joy</p>
    <div ref={ref} className="overflow-hidden"><motion.div drag="x" dragConstraints={ref} dragElastic={.12} className="flex cursor-grab gap-5 active:cursor-grabbing">
      {EVENTS.map((e, i) => (
        <motion.article key={e.name} {...reveal} transition={{ ...reveal.transition, delay: i * .1 }} whileHover={{ y: -8 }}
          className="relative w-[78vw] max-w-xs shrink-0 select-none overflow-hidden rounded-t-[8rem] rounded-b-2xl border border-gold/50 bg-gradient-to-b from-wine to-maroon px-7 pb-8 pt-16 text-center">
          <div className="text-5xl">{e.icon}</div>
          <p className="mt-5 text-gold">{e.day} · {e.time}</p>
          <h3 className="mt-1 font-bangla text-3xl">{e.name}</h3>
          <p className="mt-3 leading-relaxed text-ivory/70">{e.note}</p>
        </motion.article>))}
    </motion.div></div></Sec>);
}

export function Gallery() {
  const tiles = ["#B3201F", "#D4A64A", "#4A1119", "#F29A1F", "#8f1717", "#9c7425"];
  return (<Sec id="chobi"><Head k="Moments" t="Chobi" />
    <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:grid-cols-3 sm:auto-rows-[200px]">
      {tiles.map((c, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: .85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
          whileHover={{ scale: 1.04, rotate: i % 2 ? 1.5 : -1.5 }}
          className={`group relative overflow-hidden rounded-xl ${i === 0 || i === 4 ? "row-span-2" : ""}`}
          style={{ background: `linear-gradient(135deg,${c},#2B0A10)` }}>
          {/* Replace with <Image src="/photos/1.jpg" fill className="object-cover" alt="" /> */}
          <span className="absolute inset-0 grid place-items-center text-4xl text-ivory/30 transition group-hover:text-ivory/70">✦</span>
        </motion.div>))}
    </div></Sec>);
}

export function Venue() {
  return (<Sec id="rajbari" cls="text-center"><Head k="The Venue" t="Rajbari" />
    <motion.div {...reveal} className="mx-auto max-w-xl rounded-2xl border border-gold/50 bg-wine/50 p-10">
      <p className="text-2xl">{W.venue}</p><p className="mt-1 text-ivory/70">{W.address}</p>
      <p className="mt-5 italic text-ivory/60">Where our story becomes forever.</p>
      <motion.a href={W.mapUrl} target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
        className="mt-7 inline-block rounded-full bg-gold px-8 py-3 font-medium text-maroon">Open in Maps</motion.a>
    </motion.div></Sec>);
}

export function Dress() {
  return (<Sec id="poshak"><Head k="Dress Code" t="Poshak" />
    <div className="grid gap-6 sm:grid-cols-2">
      {DRESS.map((d, i) => (
        <motion.div key={d.who} initial={{ opacity: 0, rotateY: 70 }} whileInView={{ opacity: 1, rotateY: 0 }} viewport={{ once: true }} transition={{ delay: i * .2, duration: .8 }}
          className="rounded-2xl border border-gold/40 bg-wine/40 p-8 text-center">
          <h3 className="text-2xl text-gold">{d.who}</h3><p className="mt-3 text-ivory/75">{d.text}</p>
          <div className="mt-5 flex justify-center gap-2">{d.c.map((c) => <motion.span key={c} whileHover={{ scale: 1.3 }} className="h-8 w-8 rounded-full border border-ivory/30" style={{ background: c }} />)}</div>
        </motion.div>))}
    </div>
    <p className="mt-20 text-center font-bangla text-gold">আপনারা সবাই আমন্ত্রিত</p>
    <p className="mt-2 text-center text-sm text-ivory/50">Designed with love · {W.bride} &amp; {W.groom}</p></Sec>);
}
