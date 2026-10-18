"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "WordPress Web Development",
  "Google & TikTok Ads",
  "SEO Optimization",
  "Social Media Marketing",
  "Commercial Video Ads",
  "YouTube Automation",
  "Bahawalpur Digital Institute",
  "300+ UAE & Global Clients",
];

export default function Marquee({ bg = "bg-de-black", text = "text-white" }: { bg?: string; text?: string }) {
  const fullList = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className={`py-3.5 ${bg} overflow-hidden border-y-2 border-de-black select-none group`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap cursor-default"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {fullList.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span
              className={`text-sm sm:text-base font-heading font-extrabold tracking-wider uppercase ${text} transition-colors duration-200 group-hover:drop-shadow-[0_0_8px_rgba(255,170,29,0.7)]`}
            >
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-de-amber shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
