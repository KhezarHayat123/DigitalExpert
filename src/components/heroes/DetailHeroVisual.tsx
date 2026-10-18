"use client";

import Image from "next/image";
import { Laptop, Search, Share2, Target, Video, Youtube, GraduationCap } from "lucide-react";

interface DetailHeroVisualProps {
  iconType: string;
  tools: string[];
  themeColor?: "green" | "amber";
}

export default function DetailHeroVisual({ iconType, tools, themeColor = "green" }: DetailHeroVisualProps) {
  const isGreen = themeColor === "green";
  const radius = 135;
  const imageSrc = isGreen ? "/brand/digital-academy.jpg" : "/brand/digital-ads-seo.jpg";

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center p-4">
      {/* Moving Ambient Grid */}
      <div
        className={`absolute inset-0 [background-size:20px_20px] opacity-25 pointer-events-none ${
          isGreen
            ? "bg-[radial-gradient(#6A9A00_1px,transparent_1px)]"
            : "bg-[radial-gradient(#FFAA1D_1px,transparent_1px)]"
        }`}
      />

      {/* Dashed Orbit Ring */}
      <div
        className="absolute rounded-full border-2 border-dashed border-de-black/40 animate-[spin_50s_linear_infinite]"
        style={{ width: radius * 2 + 50, height: radius * 2 + 50 }}
      />

      {/* Orbit Container for Tool Badges (Self-Animating loop) */}
      <div className="absolute inset-0 flex items-center justify-center animate-[spin_40s_linear_infinite]">
        {tools.slice(0, 6).map((tool, idx) => {
          const total = Math.min(tools.length, 6);
          const angle = (idx * 360) / total;
          const rad = (angle * Math.PI) / 180;
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
              {/* Reverse spin to keep pill text upright */}
              <div className="animate-[spin_40s_linear_infinite_reverse]">
                <div className="px-3.5 py-1.5 rounded-full bg-white border-2 border-de-black shadow-hard-sm text-xs font-heading font-extrabold text-de-black whitespace-nowrap hover:bg-de-amber transition-colors">
                  {tool}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Digital Marketing / Course Generated 3D Illustration Hub */}
      <div className="relative z-10 w-36 h-36 sm:w-40 sm:h-40 rounded-3xl border-3 border-de-black shadow-hard overflow-hidden bg-white">
        <Image
          src={imageSrc}
          alt={isGreen ? "Digital Skills Mastery" : "Digital Marketing Agency Performance"}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-2 inset-x-0 text-center">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-heading font-extrabold border shadow-sm ${
              isGreen
                ? "bg-de-green text-white border-de-black"
                : "bg-de-amber text-de-black border-de-black"
            }`}
          >
            {isGreen ? "Masterclass Lab" : "Agency Strategy"}
          </span>
        </div>
      </div>
    </div>
  );
}
