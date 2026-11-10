"use client";

import { useState } from "react";
import Image from "next/image";
import { Testimonial } from "@/lib/types";
import Card3DTilt from "@/components/Card3DTilt";
import { Star, CheckCircle2, MessageCircle, UserCheck, GraduationCap, Briefcase } from "lucide-react";

export default function FeedbackClientList({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [filter, setFilter] = useState<"all" | "client" | "student">("all");

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

                {/* Review Message */}
                <p className="text-sm sm:text-base text-de-body font-semibold leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
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
    </div>
  );
}
