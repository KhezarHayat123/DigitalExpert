"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "High-Converting Websites",
  "Google Page 1 SEO",
  "Viral Social Media Growth",
  "Google & TikTok Paid Ads",
  "High-Retention Video Ads",
  "YouTube Cash-Cow Automation",
];

export default function RotatingHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2.5 text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-de-black py-1">
      <span className="text-de-muted">We specialise in:</span>
      <div className="relative inline-flex items-center min-h-[44px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={WORDS[index]}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-flex items-center"
          >
            <span className="bg-de-amber px-3.5 py-1.5 rounded-xl border-2 border-de-black text-de-black shadow-hard-sm whitespace-nowrap">
              {WORDS[index]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
