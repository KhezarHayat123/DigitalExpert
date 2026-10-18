import { getCourses } from "@/lib/db";
import CoursesHeroVisual from "@/components/heroes/CoursesHeroVisual";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import CoursesFilterList from "@/components/CoursesFilterList";
import { Award, Laptop, Users, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Digital Marketing Courses in Bahawalpur | DigitalExpert",
  description: "Join practical digital marketing training at University Chowk, Bahawalpur. WordPress, SEO, Paid Ads, Video Ads, Social Media, and YouTube Automation.",
};

export default function CoursesPage() {
  const courses = getCourses(true);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#6A9A00]/15 via-[#6A9A00]/5 to-white border-b border-de-border">
        <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-de-green/10 border border-de-green/30 text-de-green text-xs font-heading font-extrabold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-de-green animate-pulse" />
                Practical Skills Academy &bull; University Chowk, Bahawalpur
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-de-black tracking-tight leading-[1.15]">
                Practical Digital Marketing Courses with <span className="text-de-amber">Live Mentorship</span>
              </h1>

              <p className="text-base sm:text-lg text-de-muted max-w-xl leading-relaxed font-semibold">
                Gain job-ready skills under senior practitioner Khezar Hayat at our University Chowk, Bahawalpur campus. Small batches, live client projects, and freelance portfolio building.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton href="#courses-catalog" variant="black">
                  Explore All 6 Courses
                </MagneticButton>
                <MagneticButton href="/enroll" variant="amber">
                  Apply for Admission
                </MagneticButton>
              </div>
            </div>

            {/* Right: Courses Fees Board Visual */}
            <div className="lg:col-span-5">
              <CoursesHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE */}
      <Marquee bg="bg-de-black" text="text-white" />

      {/* 3. COURSES CATALOG WITH SEARCH & LEVEL FILTER */}
      <section id="courses-catalog" className="py-20 lg:py-28 bg-white border-b border-de-border scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Practical Curriculum"
            title="Choose Your Learning Track &"
            highlight="Master High-Income Skills"
            description="All courses feature physical hands-on classroom lab sessions at University Chowk, Bahawalpur and completion certification."
          />

          {/* Interactive Filter and Grid Component */}
          <CoursesFilterList initialCourses={courses} />
        </div>
      </section>

      {/* 4. WHY LEARN WITH DIGITALEXPERT */}
      <section className="py-20 lg:py-28 bg-de-warm border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Student Journey"
            title="Why Students in Bahawalpur"
            highlight="Choose Our Institute"
            description="We believe in zero-theory training. You launch live ads and build real websites from week two."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Laptop,
                title: "Live Lab Workstations",
                desc: "High-speed fiber connectivity and dedicated workstations in our physical Bahawalpur campus.",
              },
              {
                icon: Users,
                title: "Small Batch Sizes",
                desc: "Strictly limited students per batch so every individual receives 1-on-1 feedback on assignments.",
              },
              {
                icon: Award,
                title: "Verified Certificate",
                desc: "Receive an official DigitalExpert completion certificate to bolster your freelance resume and LinkedIn.",
              },
              {
                icon: ShieldCheck,
                title: "Lifetime Support Group",
                desc: "Exclusive access to our private WhatsApp student community for ongoing client consultation and project leads.",
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard-sm hover:shadow-hard transition-all flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-xl bg-de-green text-white flex items-center justify-center border-2 border-de-black shadow-hard-sm mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-de-black">{f.title}</h3>
                    <p className="mt-2 text-sm text-de-muted font-semibold leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-de-black text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Ready to Begin Your <span className="text-de-amber">Digital Skills Journey</span>?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Reserve your seat for the upcoming batch. Class seats are filled strictly on a first-come, first-verified basis.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <MagneticButton href="/enroll" variant="amber">
              Enroll Now & Secure Seat
            </MagneticButton>
            <MagneticButton href="https://wa.me/923124051296" variant="whatsapp" target="_blank">
              WhatsApp Support: 03124051296
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
