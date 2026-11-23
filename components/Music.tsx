"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
export default function Music() {
  const a = useRef<HTMLAudioElement>(null); const [on, setOn] = useState(false);
  const toggle = () => { if (!a.current) return; on ? a.current.pause() : a.current.play().catch(() => {}); setOn(!on); };
  return (<>
    <audio ref={a} src="/music.mp3" loop preload="none" />
    <motion.button onClick={toggle} aria-label={on ? "Pause music" : "Play music"} whileTap={{ scale: .9 }}
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-gold/60 bg-maroon/80 text-gold backdrop-blur">
      <motion.span animate={on ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>♪</motion.span>
    </motion.button></>);
}
