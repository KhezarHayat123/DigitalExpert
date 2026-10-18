"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/lib/types";
import Card3DTilt from "@/components/Card3DTilt";
import { ExternalLink, ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "WordPress", "SEO", "Social Media", "Ads", "Video", "YouTube"];

export default function ProjectsFilterClient({ initialProjects }: { initialProjects: Project[] }) {
  const [selectedCat, setSelectedCat] = useState("All");

  const filtered = initialProjects.filter(
    (p) => selectedCat === "All" || p.category.toLowerCase() === selectedCat.toLowerCase()
  );

  return (
    <div className="space-y-10">
      {/* Category Pills Filter */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-5 py-2.5 rounded-btn font-heading font-extrabold text-xs transition-all duration-200 border-2 ${
              selectedCat === cat
                ? "bg-de-black text-white border-de-black shadow-hard-sm"
                : "bg-white text-de-body border-de-border hover:border-de-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((proj) => (
          <Card3DTilt key={proj.id} className="flex flex-col h-full bg-white">
            {/* Image & Sample Tag */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-de-warm border-b-2 border-de-black">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-de-black text-white text-[11px] font-heading font-extrabold px-3 py-1 rounded-full border border-white/20">
                {proj.category}
              </div>
              {proj.isSample && (
                <div className="absolute top-3 right-3 bg-de-amber text-de-black text-[10px] font-heading font-extrabold px-2.5 py-0.5 rounded-full border border-de-black">
                  Sample Project
                </div>
              )}

              {/* Hover Result Overlay */}
              <div className="absolute inset-0 bg-de-black/85 text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center">
                <span className="text-xs font-bold text-de-amber uppercase tracking-wider mb-2">
                  Key Result Delivered
                </span>
                <p className="text-sm font-semibold leading-relaxed">
                  {proj.resultText}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
              <div>
                <p className="text-xs font-bold text-de-green uppercase tracking-wide">{proj.clientType}</p>
                <h3 className="font-heading font-extrabold text-xl text-de-black group-hover:text-de-green transition-colors mt-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-de-muted font-medium mt-2 line-clamp-3">
                  {proj.resultText}
                </p>
              </div>

              <div className="pt-3 border-t border-de-border flex items-center justify-between text-xs font-bold text-de-body">
                <span className="text-de-muted">Executed by DigitalExpert</span>
                <a
                  href="https://wa.me/923124051296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-de-green font-extrabold hover:underline flex items-center gap-1"
                >
                  <span>Inquire Similar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Card3DTilt>
        ))}
      </div>
    </div>
  );
}
