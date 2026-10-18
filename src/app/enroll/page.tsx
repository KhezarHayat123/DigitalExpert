import { Suspense } from "react";
import { getCourses, getSettings } from "@/lib/db";
import EnrollHeroVisual from "@/components/heroes/EnrollHeroVisual";
import Marquee from "@/components/Marquee";
import EnrollFormClient from "./EnrollFormClient";

export const metadata = {
  title: "Enroll in Courses | DigitalExpert Bahawalpur",
  description: "Official enrollment and admission form for DigitalExpert courses. Submit your application and payment receipt.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EnrollPage() {
  const courses = getCourses(true);
  const settings = getSettings();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#6A9A00]/15 via-[#6A9A00]/5 to-white border-b border-de-border">
        <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-de-green/10 border border-de-green text-de-green text-xs font-heading font-extrabold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-de-green animate-pulse" />
                Admission & Seat Reservation
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-de-black tracking-tight leading-[1.15]">
                How to Enroll in <span className="text-de-amber">DigitalExpert Courses</span>
              </h1>

              <p className="text-base sm:text-lg text-de-muted max-w-xl leading-relaxed font-semibold">
                Follow our streamlined 4-step admission process. Reserve your physical workstation at our University Chowk, Bahawalpur campus by submitting your details and payment screenshot below.
              </p>

              <div className="p-4 bg-white rounded-xl border-2 border-de-black shadow-hard-sm flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-de-green animate-ping shrink-0" />
                <p className="text-xs sm:text-sm font-extrabold text-de-black">
                  Rule: Submitting the form initiates verification. Admission is confirmed once payment is verified by our administrative team.
                </p>
              </div>
            </div>

            {/* Right: Looping 4-Step Visual */}
            <div className="lg:col-span-5">
              <EnrollHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE */}
      <Marquee bg="bg-de-black" text="text-white" />

      {/* 3. ENROLLMENT FORM & STICKY SUMMARY */}
      <section className="py-20 lg:py-28 bg-de-warm border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="p-12 rounded-2xl bg-white border-2 border-de-black shadow-hard animate-pulse text-center">
                <p className="font-heading font-bold text-de-muted">Loading admission & seat reservation form...</p>
              </div>
            }
          >
            <EnrollFormClient courses={courses} settings={settings} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
