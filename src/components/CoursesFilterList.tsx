"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/lib/types";
import Card3DTilt from "@/components/Card3DTilt";
import { Search, Clock, ArrowRight } from "lucide-react";

export default function CoursesFilterList({ initialCourses }: { initialCourses: Course[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");

  const filtered = initialCourses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tools.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLevel =
      selectedLevel === "All" ||
      c.level.toLowerCase() === selectedLevel.toLowerCase() ||
      c.level === "All Levels";

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-8">
      {/* Search & Level Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-de-warm p-4 rounded-2xl border-2 border-de-black shadow-hard-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search courses or tools (e.g., SEO, Ads, WordPress)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 rounded-btn border-2 border-de-border bg-white text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
          />
          <Search className="w-4 h-4 text-de-muted absolute left-3.5 top-3.5" />
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["All", "Beginner", "Intermediate", "All Levels"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-btn font-heading font-extrabold text-xs transition-all duration-200 border-2 whitespace-nowrap ${
                selectedLevel === level
                  ? "bg-de-black text-white border-de-black shadow-hard-sm"
                  : "bg-white text-de-body border-de-border hover:border-de-black"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-de-warm rounded-2xl border-2 border-dashed border-de-border">
          <p className="text-base font-bold text-de-muted">No courses match your search criteria.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedLevel("All");
            }}
            className="mt-3 px-4 py-2 rounded-btn bg-de-black text-white text-xs font-bold hover:bg-de-green transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((course) => (
            <Card3DTilt key={course.id} className="flex flex-col h-full bg-white">
              {/* Generated 16:10 illustration */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-de-warm border-b-2 border-de-black">
                <Image
                  src={course.image}
                  alt={`${course.title} illustration`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-de-black text-white text-[11px] font-heading font-extrabold px-3 py-1 rounded-full border border-white/20">
                  {course.level}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-heading font-extrabold text-xl text-de-black group-hover:text-de-green transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-de-muted leading-relaxed line-clamp-2">
                    {course.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-bold text-de-muted pt-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-de-green" />
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* Fee & View Details Button */}
                <div className="pt-4 border-t border-de-border flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-de-muted">Course Fee</p>
                    <p className="font-heading font-extrabold text-xl text-de-black">
                      {course.fee.toLocaleString()}{" "}
                      <span className="text-xs font-bold text-de-green">PKR</span>
                    </p>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-4 py-2.5 rounded-btn font-heading font-extrabold text-xs bg-de-black text-white hover:bg-de-green hover:text-white transition-all duration-200 border-2 border-de-black shadow-hard-sm hover:shadow-hard inline-flex items-center gap-1.5 group"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      )}
    </div>
  );
}
