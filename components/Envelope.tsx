"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { WEDDING as W } from "@/lib/data";

export default function Envelope({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<"closed" | "open" | "letter">("closed");
  const tap = () => {
    if (stage !== "closed") return;
    setStage("open");
    setTimeout(() => setStage("letter"), 1400);
  };
  return (
    <motion.div exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.9 }}
      className="fixed inset-0 z-50 grid place-items-center bg-maroon alpona overflow-hidden px-4">
      <AnimatePresence mode="wait">
        {stage !== "letter" ? (
          <motion.div key="env" exit={{ y: 80, opacity: 0 }} className="text-center">
            <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}
              className="font-bangla text-3xl gold-text animate-shimmer mb-2">সাদর আমন্ত্রণ</motion.p>
            <p className="italic text-ivory/70 mb-10">A letter is waiting for you. Tap the envelope to open it.</p>
            <motion.button onClick={tap} aria-label="Open invitation" whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}
              animate={stage === "closed" ? { y: [0, -8, 0] } : {}} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative mx-auto h-56 w-80 max-w-[85vw] sm:h-64 sm:w-96 [perspective:900px]">
              <div className="absolute inset-0 rounded-md bg-sindoor shadow-[0_30px_80px_rgba(0,0,0,.6)]" />
              {/* letter peeking */}
              <motion.div animate={stage === "open" ? { y: -90 } : { y: 0 }} transition={{ delay: .5, duration: .8 }}
                className="absolute inset-x-4 top-3 h-40 rounded bg-ivory" />
              {/* pocket */}
              <div className="absolute inset-0 rounded-md" style={{ background: "linear-gradient(135deg,#8f1717 50%,transparent 50%),linear-gradient(225deg,#8f1717 50%,transparent 50%)" }} />
              <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-md bg-[#9d1b1b]" style={{ clipPath: "polygon(0 100%,50% 0,100% 100%)" }} />
              {/* flap */}
              <motion.div animate={{ rotateX: stage === "open" ? 180 : 0 }} transition={{ duration: .8 }}
                style={{ transformOrigin: "top", clipPath: "polygon(0 0,100% 0,50% 100%)", backfaceVisibility: "hidden" }}
                className="absolute inset-x-0 top-0 h-3/5 bg-[#c42a28]" />
              <motion.div animate={{ scale: stage === "open" ? 0 : 1, opacity: stage === "open" ? 0 : 1 }}
                className="absolute left-1/2 top-[52%] grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold font-bangla text-2xl text-maroon shadow-lg">শু</motion.div>
            </motion.button>
            <p className="mt-10 font-bangla text-gold">খামটি খুলুন</p>
          </motion.div>
        ) : (
          <motion.article key="letter" initial={{ y: 120, opacity: 0, rotate: -2 }} animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 18 }}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border-4 border-double border-gold/70 bg-ivory p-7 text-center text-maroon shadow-2xl sm:p-10">
            <button onClick={onDone} aria-label="Close" className="absolute right-4 top-3 text-2xl text-sindoor">✕</button>
            <p className="font-bangla text-sindoor">শ্রীশ্রী প্রজাপতয়ে নমঃ</p>
            <p className="my-3 text-gold">❖ ✦ ❖</p>
            <h2 className="font-bangla text-4xl text-sindoor">সাদর আমন্ত্রণ</h2>
            <div className="mt-5 space-y-4 font-bangla leading-8">
              <p>মহাশয় / মহাশয়া,</p>
              <p>আগামী <b>১২ ফেব্রুয়ারি ২০২৭, শুক্রবার</b> সন্ধ্যা ৭টায় আমাদের স্নেহের <b className="text-sindoor">{W.brideBn}</b>-র সহিত <b className="text-sindoor">{W.groomBn}</b>-এর শুভ বিবাহ অনুষ্ঠিত হইবে।</p>
              <p>এই আনন্দের শুভক্ষণে আপনি সপরিবারে উপস্থিত থাকিয়া নবদম্পতিকে আশীর্বাদ করিয়া আমাদের অনুষ্ঠানকে সর্বাঙ্গসুন্দর করিবেন।</p>
              <p className="text-sm">স্থান: রাজবাড়ি প্যালেস, হেরিটেজ এস্টেট রোড, কলকাতা</p>
            </div>
            <p className="my-3 text-gold">❖ ✦ ❖</p>
            <p className="font-bangla text-sm">বিনীত নিবেদক · দুই পরিবারের সকল সদস্যবৃন্দ</p>
            <motion.button onClick={onDone} whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
              className="mt-6 rounded-full bg-sindoor px-8 py-3 text-ivory shadow-lg">Enter the celebration</motion.button>
          </motion.article>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
