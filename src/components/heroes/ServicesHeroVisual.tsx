"use client";

import Image from "next/image";
import { Laptop, Search, Share2, Target, Video, Youtube } from "lucide-react";

const ICONS = [
  { icon: Laptop, label: "WordPress", angle: 0 },
  { icon: Search, label: "SEO", angle: 60 },
  { icon: Share2, label: "Social", angle: 120 },
  { icon: Target, label: "Paid Ads", angle: 180 },
  { icon: Video, label: "Video Ads", angle: 240 },
  { icon: Youtube, label: "YouTube", angle: 300 },
];

export default function ServicesHeroVisual() {
  const radius = 135; // orbit distance

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
      {/* Moving Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#FFAA1D_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      {/* Orbit Track: Dashed Ring */}
      <div
        className="absolute rounded-full border-2 border-dashed border-de-black/30 animate-[spin_40s_linear_infinite]"
        style={{ width: radius * 2 + 60, height: radius * 2 + 60 }}
      />

      {/* Orbit Container with Reverse Spin so Icons Stay Upright */}
      <div className="absolute inset-0 flex items-center justify-center animate-[spin_35s_linear_infinite]">
        {ICONS.map((item, idx) => {
          const IconComp = item.icon;
          const rad = (item.angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <div
              key={idx}
              className="absolute"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {/* Counter-rotation to keep icon strictly upright */}
              <div className="animate-[spin_35s_linear_infinite_reverse]">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-de-black shadow-hard-sm flex flex-col items-center justify-center text-de-black hover:bg-de-green hover:text-white transition-colors duration-200 group">
                  <IconComp className="w-6 h-6 text-de-green group-hover:text-white transition-colors" />
                  <span className="text-[9px] font-extrabold uppercase mt-0.5 tracking-tighter">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Agency Visual Hub */}
      <div className="relative z-10 w-32 h-32 rounded-3xl bg-white border-3 border-de-black shadow-hard overflow-hidden">
        <Image
          src="/brand/digital-ads-seo.jpg"
          alt="Digital Marketing Agency Performance"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
