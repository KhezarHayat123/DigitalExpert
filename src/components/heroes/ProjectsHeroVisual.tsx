"use client";

import { motion } from "framer-motion";

export default function ProjectsHeroVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] flex items-center justify-center p-4">
      {/* Moving Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

      {/* Floating Window 1 (Back left) */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-2 left-2 w-56 h-36 bg-white rounded-xl border-2 border-de-black shadow-hard-sm p-3 z-10"
      >
        <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-de-border">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="text-[9px] font-bold text-de-muted ml-1">realestate-portal.ae</span>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-3/4 bg-de-green rounded-md" />
          <div className="h-2 w-full bg-de-warm rounded-md" />
          <div className="flex gap-1.5 pt-1">
            <div className="h-10 flex-1 bg-de-warm rounded-md border border-de-border" />
            <div className="h-10 flex-1 bg-de-warm rounded-md border border-de-border" />
          </div>
        </div>
      </motion.div>

      {/* Floating Window 2 (Back right) */}
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-2 right-2 w-60 h-40 bg-white rounded-xl border-2 border-de-black shadow-hard-sm p-3 z-10"
      >
        <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-de-border">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="text-[9px] font-bold text-de-muted ml-1">analytics.google.com</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-end justify-between h-14 pt-2 gap-1.5 px-2">
            {[30, 55, 40, 85, 70, 95].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [`${h}%`, `${Math.min(100, h + 20)}%`, `${h}%`] }}
                transition={{ repeat: Infinity, duration: 3 + i * 0.3, ease: "easeInOut" }}
                className="w-4 bg-de-amber rounded-t-sm border border-de-black"
              />
            ))}
          </div>
          <div className="h-2.5 w-1/2 bg-de-black rounded-md" />
        </div>
      </motion.div>

      {/* Main Center Floating Window (Front) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="relative z-20 w-72 h-48 bg-white rounded-2xl border-3 border-de-black shadow-hard p-4"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-de-border">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400 border border-de-black" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 border border-de-black" />
            <span className="w-3 h-3 rounded-full bg-green-400 border border-de-black" />
          </div>
          <span className="text-[10px] font-heading font-extrabold text-de-green bg-de-green/10 px-2 py-0.5 rounded-md">
            Lighthouse 98
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="h-4 w-4/5 bg-de-black rounded-md" />
          <div className="h-2.5 w-full bg-de-warm rounded-md" />
          <div className="h-2.5 w-2/3 bg-de-warm rounded-md" />
          <div className="pt-2 flex items-center justify-between">
            <div className="h-7 w-24 bg-de-amber rounded-btn border border-de-black" />
            <span className="text-xs font-extrabold text-de-black">450+ Leads</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
