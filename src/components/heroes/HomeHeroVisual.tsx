"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target, ArrowUpRight, BarChart3, Image as ImageIcon } from "lucide-react";

export default function HomeHeroVisual() {
  const [activeTab, setActiveTab] = useState<"results" | "workspace">("results");

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square sm:aspect-[4/3] flex items-center justify-center p-2 sm:p-4">
      {/* Moving Ambient Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

      {/* Floating Outline Shape behind card */}
      <div className="absolute -top-3 -right-3 w-48 h-48 rounded-3xl border-2 border-de-black/20 pointer-events-none -rotate-3" />

      {/* Main Campaign Results Card (Matches Official Flow & Screenshot 2) */}
      <div className="relative z-10 w-full bg-white rounded-3xl border-3 border-de-black p-5 sm:p-6 shadow-hard space-y-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-de-border">
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-de-black">
              Campaign results
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher: Live Results vs Official Workspace */}
            <div className="flex items-center bg-de-warm p-1 rounded-lg border border-de-border text-[11px] font-bold">
              <button
                onClick={() => setActiveTab("results")}
                className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                  activeTab === "results"
                    ? "bg-de-black text-white shadow-sm"
                    : "text-de-muted hover:text-de-black"
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                <span>Analytics</span>
              </button>
              <button
                onClick={() => setActiveTab("workspace")}
                className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                  activeTab === "workspace"
                    ? "bg-de-black text-white shadow-sm"
                    : "text-de-muted hover:text-de-black"
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>Workspace</span>
              </button>
            </div>

            {/* LIVE Pulse Tag */}
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-[10px] font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              LIVE
            </span>
          </div>
        </div>

        {activeTab === "results" ? (
          /* Live Analytics Flow (Clean Google Flow & Campaign Metrics) */
          <div className="relative py-2">
            {/* Trendline Curve overlay */}
            <div className="relative h-44 sm:h-48 w-full bg-[#FAFAF8] rounded-2xl border-2 border-de-border p-4 flex flex-col justify-end overflow-hidden">
              {/* Upward SVG Trendline */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 180"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFAA1D" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FFAA1D" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 145 Q 120 130 200 90 T 390 25"
                  fill="none"
                  stroke="#FFAA1D"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 145 Q 120 130 200 90 T 390 25 L 390 180 L 10 180 Z"
                  fill="url(#trendGradient)"
                />
                {/* Accent point at top */}
                <circle cx="390" cy="25" r="5" fill="#6A9A00" stroke="#000" strokeWidth="2" />
              </svg>

              {/* Bar Columns Container */}
              <div className="relative z-10 grid grid-cols-3 gap-6 sm:gap-8 items-end h-32 px-4 pb-2">
                {/* Column 1: Traffic */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="flex items-end gap-1.5 h-24">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "45%" }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="w-4 sm:w-5 bg-de-green rounded-t-md"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "70%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="w-4 sm:w-5 bg-de-black rounded-t-md"
                    />
                  </div>
                  <span className="text-xs font-extrabold text-de-black flex items-center gap-0.5">
                    Traffic <ArrowUpRight className="w-3 h-3 text-de-green" />
                  </span>
                </div>

                {/* Column 2: Leads */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="flex items-end gap-1.5 h-24">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "55%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="w-4 sm:w-5 bg-de-green rounded-t-md"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "85%" }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="w-4 sm:w-5 bg-de-black rounded-t-md"
                    />
                  </div>
                  <span className="text-xs font-extrabold text-de-black flex items-center gap-0.5">
                    Leads <ArrowUpRight className="w-3 h-3 text-de-green" />
                  </span>
                </div>

                {/* Column 3: Sales */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="flex items-end gap-1.5 h-24">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "40%" }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="w-4 sm:w-5 bg-de-green rounded-t-md"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "95%" }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="w-4 sm:w-5 bg-de-amber rounded-t-md shadow-sm"
                    />
                  </div>
                  <span className="text-xs font-extrabold text-de-black flex items-center gap-0.5">
                    Sales <ArrowUpRight className="w-3 h-3 text-de-amber" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Official Marketing Agency Workspace Photograph */
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-de-black bg-de-warm">
            <Image
              src="/brand/digital-marketing-workspace.png"
              alt="Digital Marketing Workspace & Analytics"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-extrabold">
              <span className="bg-de-black/80 px-2.5 py-1 rounded border border-white/20">
                Official Agency Operations
              </span>
              <span className="bg-de-green px-2 py-0.5 rounded text-white">
                Live Client Campaigns
              </span>
            </div>
          </div>
        )}

        {/* Bottom Metrics Bar */}
        <div className="pt-1 flex items-center justify-between text-xs font-bold text-de-muted">
          <span className="text-de-black font-extrabold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-de-green" /> +420% Average Client ROI
          </span>
          <span className="text-de-muted font-bold">Verified Analytics Flow</span>
        </div>
      </div>

      {/* Floating Tag 1: SEO -> Page 1 (Top Left) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -top-3 left-4 sm:left-6 z-20 bg-de-black text-white px-3.5 py-1.5 rounded-full border-2 border-de-black shadow-hard-sm text-xs font-extrabold flex items-center gap-1.5"
      >
        <span className="w-2 h-2 rounded-full bg-de-amber" />
        <span>SEO &rarr; Page 1</span>
      </motion.div>

      {/* Floating Tag 2: Ads -> Leads (Right) */}
      <motion.div
        animate={{ x: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 bg-de-amber text-de-black px-4 py-1.5 rounded-full border-2 border-de-black shadow-hard-sm text-xs font-extrabold flex items-center gap-1.5"
      >
        <Target className="w-3.5 h-3.5 text-de-black" />
        <span>Ads &rarr; Leads</span>
      </motion.div>

      {/* Floating Tag 3: Social -> Growth (Bottom Left) */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-3 left-8 z-20 bg-white text-de-black px-4 py-1.5 rounded-full border-2 border-de-black shadow-hard-sm text-xs font-extrabold flex items-center gap-1.5"
      >
        <Users className="w-3.5 h-3.5 text-de-green" />
        <span>Social &rarr; Growth</span>
      </motion.div>
    </div>
  );
}
