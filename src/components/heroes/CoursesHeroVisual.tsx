"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const COURSES_PREVIEW = [
  { name: "WordPress Course", fee: "20,000 PKR", tag: "2 Months" },
  { name: "Social Media Marketing", fee: "10,000 PKR", tag: "1.5 Months" },
  { name: "Google & TikTok Ads", fee: "15,000 PKR", tag: "2 Months" },
  { name: "Video Ads Creation", fee: "7,000 PKR", tag: "1 Month" },
  { name: "SEO Optimization", fee: "15,000 PKR", tag: "2 Months" },
  { name: "YouTube Automation", fee: "15,000 PKR", tag: "1.5 Months" },
];

export default function CoursesHeroVisual() {
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % COURSES_PREVIEW.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

      {/* Main Course Fees Board */}
      <div className="relative z-10 bg-white rounded-2xl border-2 border-de-black p-5 shadow-hard">
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-de-border">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-de-amber rounded-lg border border-de-black text-de-black shadow-hard-sm">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-heading font-extrabold text-sm text-de-black">Practical IT Curriculum</span>
          </div>
          <span className="text-[11px] font-bold text-de-green bg-de-green/10 px-2.5 py-1 rounded-full uppercase">
            6 Official Courses
          </span>
        </div>

        {/* Course Rows with Moving Highlight */}
        <div className="space-y-2">
          {COURSES_PREVIEW.map((item, idx) => {
            const isHighlighted = activeRow === idx;
            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isHighlighted ? 1.02 : 1,
                  backgroundColor: isHighlighted ? "#F7F5EF" : "#FFFFFF",
                  borderColor: isHighlighted ? "#6A9A00" : "#E5E0D2",
                }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-xl border-2 flex items-center justify-between transition-shadow ${
                  isHighlighted ? "shadow-hard-sm" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold border ${
                      isHighlighted
                        ? "bg-de-green text-white border-de-black"
                        : "bg-de-warm text-de-muted border-de-border"
                    }`}
                  >
                    {isHighlighted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-de-body">{item.name}</p>
                    <p className="text-[10px] text-de-muted font-bold">{item.tag}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs sm:text-sm font-heading font-extrabold px-2 py-0.5 rounded-md ${
                      isHighlighted ? "bg-de-amber text-de-black border border-de-black" : "text-de-body"
                    }`}
                  >
                    {item.fee}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-de-border text-center">
          <p className="text-xs font-bold text-de-muted">
            All courses include Live practical sessions &bull; Certificate upon completion
          </p>
        </div>
      </div>
    </div>
  );
}
