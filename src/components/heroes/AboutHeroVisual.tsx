"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Globe, Users } from "lucide-react";

export default function AboutHeroVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center p-4">
      {/* Moving Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      {/* Slowly Rotating Outer Dashed Ring */}
      <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-de-black/40 animate-[spin_50s_linear_infinite]" />

      {/* Founder Center Photo Circle */}
      <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-de-black overflow-hidden shadow-hard bg-[#0B1528]">
        <Image
          src="/brand/khezar-hayat.png"
          alt="Khezar Hayat - Founder of DigitalExpert"
          fill
          priority
          className="object-cover object-top scale-105"
        />
      </div>

      {/* Floating Badge 1: 300+ UAE clients */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="absolute top-2 left-2 z-20 bg-white text-de-black px-3.5 py-2 rounded-xl border-2 border-de-black shadow-hard-sm flex items-center gap-2"
      >
        <div className="p-1.5 bg-de-amber rounded-lg border border-de-black">
          <Users className="w-4 h-4 text-de-black" />
        </div>
        <div>
          <p className="text-xs font-heading font-extrabold text-de-black">300+ Clients</p>
          <p className="text-[10px] font-bold text-de-muted">UAE & Gulf Region</p>
        </div>
      </motion.div>

      {/* Floating Badge 2: 5+ Years Experience */}
      <motion.div
        animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-4 right-2 z-20 bg-de-black text-white px-3.5 py-2 rounded-xl border-2 border-de-black shadow-hard-sm flex items-center gap-2"
      >
        <div className="p-1.5 bg-de-green rounded-lg border border-de-black">
          <Award className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-heading font-extrabold text-de-amber">5+ Years</p>
          <p className="text-[10px] font-bold text-white/80">Digital Marketing Exp.</p>
        </div>
      </motion.div>

      {/* Floating Badge 3: 4 Countries */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-2 left-8 z-20 bg-de-green text-white px-3 py-1.5 rounded-full border-2 border-de-black shadow-hard-sm flex items-center gap-1.5"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="text-xs font-extrabold">4 Countries Served</span>
      </motion.div>
    </div>
  );
}
