import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCourseBySlug, getCourses } from "@/lib/db";
import DetailHeroVisual from "@/components/heroes/DetailHeroVisual";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import ShareCourseButton from "@/components/ShareCourseButton";
import {
  GraduationCap,
  Clock,
  BookOpen,
  User,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Share2,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export async function generateStaticParams() {
  const courses = getCourses(true);
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const allCourses = getCourses(true);
  const relatedCourses = allCourses.filter((c) => c.slug !== course.slug).slice(0, 3);
  const totalLectures = course.modules.reduce((acc, m) => acc + m.lectures.length, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. GREEN HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#6A9A00]/20 via-[#6A9A00]/5 to-white border-b border-de-border">
        <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-bold text-de-muted mb-6">
            <Link href="/" className="hover:text-de-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-de-black transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-de-green">{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-de-green/20 border border-de-green text-de-black text-xs font-heading font-extrabold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-de-green" />
                {course.level} Level &bull; Physical & Live Classes
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-de-black tracking-tight leading-[1.15]">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-de-muted leading-relaxed font-semibold">
                {course.shortDescription}
              </p>

              {/* Meta Pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-extrabold text-de-body pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-de-border">
                  <Clock className="w-4 h-4 text-de-green" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-de-border">
                  <BookOpen className="w-4 h-4 text-de-amber" />
                  <span>{totalLectures} Practical Lectures</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-de-border">
                  <User className="w-4 h-4 text-de-black" />
                  <span>Instructor: {course.instructor}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton href={`/enroll?course=${course.slug}`} variant="amber">
                  Enroll Now ({course.fee.toLocaleString()} PKR)
                </MagneticButton>
                <MagneticButton href="#syllabus" variant="black">
                  View Syllabus
                </MagneticButton>
              </div>
            </div>

            {/* Right: Orbiting Tools Visual */}
            <div className="lg:col-span-5">
              <DetailHeroVisual iconType="graduation" tools={course.tools} themeColor="green" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SYLLABUS + STICKY SIDEBAR */}
      <section className="py-16 lg:py-24 bg-white border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column (8 cols): Overview, What You Will Learn, Modules Accordion */}
            <div className="lg:col-span-8 space-y-16">
              {/* Course Overview */}
              <div>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mb-4">
                  About This Masterclass
                </h2>
                <p className="text-base sm:text-lg text-de-muted leading-relaxed font-medium">
                  {course.description}
                </p>
                <div className="mt-6 p-4 bg-de-warm rounded-xl border-2 border-de-black flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-de-green shrink-0" />
                  <span className="text-sm font-extrabold text-de-body">
                    Schedule: {course.scheduleText} &bull; In-Person Practical Batches
                  </span>
                </div>
              </div>

              {/* What You Will Learn (2 Columns) */}
              <div className="bg-de-warm p-8 rounded-2xl border-2 border-de-black shadow-hard-sm">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-de-black mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-de-amber" />
                  What You Will Learn
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-de-green shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base font-bold text-de-body">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content / Modules Accordion */}
              <div id="syllabus" className="scroll-mt-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="font-heading font-extrabold text-xs uppercase tracking-widest text-de-green">
                      Full Syllabus
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black mt-1">
                      Course Curriculum & Lectures
                    </h3>
                  </div>
                  <span className="text-xs font-extrabold text-de-muted bg-de-warm px-3 py-1.5 rounded-lg border border-de-border">
                    {course.modules.length} Modules &bull; {totalLectures} Lectures
                  </span>
                </div>

                <div className="space-y-4">
                  {course.modules.map((module, mIdx) => (
                    <details
                      key={module.id}
                      open={mIdx === 0}
                      className="group bg-white rounded-2xl border-2 border-de-black p-5 shadow-hard-sm open:shadow-hard transition-all cursor-pointer"
                    >
                      <summary className="flex items-center justify-between font-heading font-extrabold text-base text-de-black list-none">
                        <span className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-de-black text-white text-xs flex items-center justify-center font-bold">
                            0{mIdx + 1}
                          </span>
                          <span>{module.title}</span>
                        </span>
                        <div className="flex items-center gap-3 text-xs font-bold text-de-muted">
                          <span>{module.duration}</span>
                          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                        </div>
                      </summary>

                      <div className="mt-4 pt-4 border-t border-de-border space-y-2.5 pl-10">
                        {module.lectures.map((lec, lIdx) => (
                          <div
                            key={lIdx}
                            className="flex items-center justify-between text-sm py-1.5 border-b border-de-border/50 last:border-0"
                          >
                            <span className="font-semibold text-de-body flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-de-green" />
                              {lec.title}
                            </span>
                            <span className="text-xs font-bold text-de-muted whitespace-nowrap">
                              {lec.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Tools Taught */}
              <div>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-de-black mb-4">
                  Software & Platforms Mastered
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {course.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-de-warm rounded-lg border-2 border-de-black font-heading font-extrabold text-sm text-de-black shadow-hard-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): STICKY SIDEBAR */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-2xl border-2 border-de-black p-6 shadow-hard space-y-6">
                {/* Course Image Preview */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border-2 border-de-black">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Course Fee Display */}
                <div className="flex items-baseline justify-between pb-3 border-b border-de-border">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-de-muted">Total Admission Fee</p>
                    <p className="font-heading font-extrabold text-3xl text-de-black">
                      {course.fee.toLocaleString()}{" "}
                      <span className="text-sm font-bold text-de-green">PKR</span>
                    </p>
                  </div>
                  {course.oldFee && (
                    <span className="text-sm font-bold text-de-muted line-through">
                      {course.oldFee.toLocaleString()} PKR
                    </span>
                  )}
                </div>

                {/* PROMINENT ENROLL NOW BUTTON (WhatsApp removed as requested) */}
                <div className="pt-2">
                  <Link
                    href={`/enroll?course=${course.slug}`}
                    className="w-full py-4 px-6 rounded-btn font-heading font-extrabold text-base bg-de-amber text-de-black hover:bg-de-black hover:text-de-amber transition-all duration-200 border-2 border-de-black shadow-hard hover:shadow-hard-lg flex items-center justify-center gap-3 group text-center"
                  >
                    <span>Enroll Now & Secure Seat</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <p className="text-center text-[11px] font-bold text-de-muted mt-2">
                    ⚡ Physical campus seats strictly limited to 20 students per batch.
                  </p>
                </div>

                {/* This Course Includes Checklist */}
                <div className="pt-4 border-t border-de-border space-y-3">
                  <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-de-black">
                    This Course Includes:
                  </h4>
                  <ul className="space-y-2 text-xs font-bold text-de-muted">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-de-green shrink-0" />
                      <span>Live In-Person & Practical Lab Classes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-de-green shrink-0" />
                      <span>{totalLectures} Interactive Lectures & Assignments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-de-green shrink-0" />
                      <span>Live Client Case Studies & Projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-de-green shrink-0" />
                      <span>Direct Mentorship from Khezar Hayat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-de-green shrink-0" />
                      <span>Official DigitalExpert Certificate</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-de-green shrink-0" />
                      <span>Student WhatsApp Support Group</span>
                    </li>
                  </ul>
                </div>

                {/* Share Button */}
                <div className="pt-3 border-t border-de-border">
                  <ShareCourseButton title={course.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED COURSES */}
      {relatedCourses.length > 0 && (
        <section className="py-16 bg-de-warm border-b border-de-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-heading font-extrabold text-2xl text-de-black mb-8">
              Other Popular Courses You Might Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCourses.map((rc) => (
                <div
                  key={rc.id}
                  className="bg-white p-5 rounded-2xl border-2 border-de-black shadow-hard-sm hover:shadow-hard transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold text-de-green bg-de-green/10 px-2.5 py-0.5 rounded-full uppercase">
                      {rc.level}
                    </span>
                    <h4 className="font-heading font-extrabold text-base text-de-black">{rc.title}</h4>
                    <p className="text-xs text-de-muted line-clamp-2">{rc.shortDescription}</p>
                  </div>
                  <div className="pt-4 border-t border-de-border flex items-center justify-between mt-4">
                    <span className="font-heading font-extrabold text-base text-de-black">
                      {rc.fee.toLocaleString()} PKR
                    </span>
                    <Link
                      href={`/courses/${rc.slug}`}
                      className="text-xs font-bold text-de-green hover:underline flex items-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. FINAL CTA BANNER */}
      <section className="py-20 bg-de-black text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Secure Your Seat in <span className="text-de-amber">{course.title}</span>
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Batch size is strictly capped. Complete your enrollment online to reserve your seat before registration closes.
          </p>
          <div className="flex justify-center pt-2">
            <MagneticButton href={`/enroll?course=${course.slug}`} variant="amber">
              Complete Enrollment Online &rarr;
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
