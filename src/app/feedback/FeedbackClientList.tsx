"use client";

import { useState } from "react";
import Image from "next/image";
import { Testimonial } from "@/lib/types";
import Card3DTilt from "@/components/Card3DTilt";
import { Star, CheckCircle2, GraduationCap, Briefcase, ZoomIn, X } from "lucide-react";

export default function FeedbackClientList({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [filter, setFilter] = useState<"all" | "client" | "student">("all");
  const [zoomedItem, setZoomedItem] = useState<Testimonial | null>(null);

  const filtered = initialTestimonials.filter((t) => {
    if (filter === "all") return true;
    if (filter === "student") {
      return t.type === "student" || (t.role && (t.role.toLowerCase().includes("student") || t.role.toLowerCase().includes("batch") || t.role.toLowerCase().includes("graduate")));
    }
    if (filter === "client") {
      return t.type !== "student" && !(t.role && (t.role.toLowerCase().includes("student") || t.role.toLowerCase().includes("batch") || t.role.toLowerCase().includes("graduate")));
    }
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2.5 rounded-full font-heading font-extrabold text-xs sm:text-sm border-2 border-de-black transition-all ${
            filter === "all"
              ? "bg-de-black text-white shadow-hard"
              : "bg-white text-de-body hover:bg-de-warm"
          }`}
        >
          All Feedback ({initialTestimonials.length})
        </button>
        <button
          onClick={() => setFilter("client")}
          className={`px-5 py-2.5 rounded-full font-heading font-extrabold text-xs sm:text-sm border-2 border-de-black transition-all flex items-center gap-2 ${
            filter === "client"
              ? "bg-de-amber text-de-black shadow-hard"
              : "bg-white text-de-body hover:bg-de-warm"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Client Reviews (UAE & Global)</span>
        </button>
        <button
          onClick={() => setFilter("student")}
          className={`px-5 py-2.5 rounded-full font-heading font-extrabold text-xs sm:text-sm border-2 border-de-black transition-all flex items-center gap-2 ${
            filter === "student"
              ? "bg-de-green text-white shadow-hard"
              : "bg-white text-de-body hover:bg-de-warm"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Student Stories</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => {
          const isStudent =
            item.type === "student" ||
            (item.role && (item.role.toLowerCase().includes("student") || item.role.toLowerCase().includes("batch") || item.role.toLowerCase().includes("graduate")));

          return (
            <Card3DTilt key={item.id} className="flex flex-col h-full bg-white p-7 justify-between">
              <div className="space-y-4">
                {/* Header: Tag + Rating */}
                <div className="flex items-center justify-between pb-3 border-b border-de-border">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-heading font-extrabold border uppercase tracking-wider ${
                      isStudent
                        ? "bg-de-green/15 text-de-green border-de-green"
                        : "bg-de-amber/25 text-de-black border-de-amber"
                    }`}
                  >
                    {isStudent ? <GraduationCap className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                    <span>{isStudent ? "Student Feedback" : "Client Review"}</span>
                  </span>

                  <div className="flex items-center gap-1 text-de-amber">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-de-amber text-de-amber" />
                    ))}
                  </div>
                </div>

                {/* Screenshot Showcase (primary) or Text Fallback */}
                {item.screenshot ? (
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setZoomedItem(item)}
                      className="group relative block w-full aspect-[4/3] rounded-xl border-2 border-de-black overflow-hidden bg-de-warm shadow-hard-sm focus:outline-none"
                      aria-label={`View full feedback screenshot from ${item.name}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.screenshot}
                        alt={`${item.name} feedback screenshot`}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-end justify-end p-2.5">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 border border-de-black text-[10px] font-heading font-extrabold text-de-black flex items-center gap-1 shadow-sm opacity-90 group-hover:opacity-100">
                          <ZoomIn className="w-3 h-3 text-de-green" />
                          <span>Zoom Screenshot</span>
                        </span>
                      </div>
                    </button>

                    {item.text && (
                      <p className="text-xs text-de-muted font-semibold leading-relaxed line-clamp-2 italic">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm sm:text-base text-de-body font-semibold leading-relaxed italic">
                    &ldquo;{item.text}&rdquo;
                  </p>
                )}
              </div>

              {/* Author Footer */}
              <div className="pt-5 mt-4 border-t border-de-border flex items-center gap-3.5">
                {/* Avatar with fallback */}
                <div className="relative w-12 h-12 rounded-full border-2 border-de-black overflow-hidden bg-de-warm shrink-0 flex items-center justify-center font-heading font-extrabold text-base text-de-black">
                  {item.photo ? (
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      unoptimized={item.photo.startsWith("data:")}
                      className="object-cover"
                    />
                  ) : (
                    <span>{item.name.charAt(0)}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-heading font-extrabold text-sm text-de-black truncate">
                      {item.name}
                    </p>
                    <CheckCircle2 className="w-3.5 h-3.5 text-de-green shrink-0" />
                  </div>
                  <p className="text-xs text-de-muted font-semibold truncate">
                    {item.role}
                  </p>
                  <p className="text-[10px] text-de-green font-bold uppercase tracking-wider">
                    {item.country}
                  </p>
                </div>
              </div>
            </Card3DTilt>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-de-warm rounded-2xl border-2 border-de-black shadow-hard p-8">
          <p className="font-heading font-extrabold text-lg text-de-black">No feedback found in this category.</p>
          <p className="text-xs text-de-muted mt-1">Check back soon or select &apos;All Feedback&apos; above.</p>
        </div>
      )}

      {/* Lightbox Modal for Full Screenshot View */}
      {zoomedItem && zoomedItem.screenshot && (
        <div
          className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setZoomedItem(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl border-3 border-de-black shadow-hard-lg overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-de-warm border-b-2 border-de-black flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-de-black truncate">
                  {zoomedItem.name} &bull; Verified Feedback
                </h3>
                <p className="text-xs text-de-muted font-semibold truncate">
                  {zoomedItem.role} ({zoomedItem.country})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setZoomedItem(null)}
                className="p-1.5 rounded-lg bg-white border border-de-black text-de-black hover:bg-de-amber transition-colors shrink-0"
                aria-label="Close Screenshot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-[#F4F1EA] overflow-y-auto flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={zoomedItem.screenshot}
                alt={`${zoomedItem.name} feedback screenshot`}
                className="max-h-[68vh] w-auto object-contain rounded-xl border-2 border-de-black shadow-md"
              />
            </div>
            {zoomedItem.text && (
              <div className="p-4 bg-white border-t border-de-border text-xs sm:text-sm text-de-body font-semibold italic text-center">
                &ldquo;{zoomedItem.text}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
