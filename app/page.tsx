"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "@/components/Envelope";
import Petals from "@/components/Petals";
import { ScrollBar, Sparkles, RSVP } from "@/components/Extras";
import Music from "@/components/Music";
import { Hero, Story, Days, Events, Gallery, Venue, Dress } from "@/components/Sections";

export default function Page() {
  const [opened, setOpened] = useState(false);
  return (
    <main className="bg-maroon">
      <AnimatePresence>{!opened && <Envelope key="env" onDone={() => setOpened(true)} />}</AnimatePresence>
      {opened && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        <ScrollBar /><Sparkles /><Petals /><Music /><Hero /><Story /><Days /><Events /><Gallery /><Venue /><RSVP /><Dress />
      </motion.div>)}
    </main>);
}
