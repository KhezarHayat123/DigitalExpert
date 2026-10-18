"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Student, Course, Lecture } from "@/lib/types";
import {
  GraduationCap,
  Play,
  BookOpen,
  Calendar,
  MessageCircle,
  Plus,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface DashboardClientProps {
  student: Student;
  allCourses: Course[];
  enrolledCourses: Course[];
  allLectures: Lecture[];
}

export default function DashboardClient({
  student,
  allCourses,
  enrolledCourses,
  allLectures,
}: DashboardClientProps) {
  // Modal for course selection/request if student has 0 courses or clicks "Add Course"
  const [showCourseModal, setShowCourseModal] = useState(enrolledCourses.length === 0);
  const [selectedSlug, setSelectedSlug] = useState(allCourses[0]?.slug || "wordpress");
  const [requestStatus, setRequestStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleRequestCourse = async () => {
    setRequestStatus("loading");
    try {
      // Notify admin
      const course = allCourses.find((c) => c.slug === selectedSlug);
      window.open(
        `https://wa.me/923124051296?text=${encodeURIComponent(
          `Hi DigitalExpert, I am approved student ${student.name} (${student.email}). Please grant me access to the ${course?.title || selectedSlug} video classroom.`
        )}`,
        "_blank"
      );
      setRequestStatus("success");
      setTimeout(() => setShowCourseModal(false), 2000);
    } catch {
      setRequestStatus("idle");
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. WELCOME HERO BANNER */}
      <div className="bg-de-black text-white p-6 sm:p-10 rounded-3xl border-3 border-de-black shadow-hard flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-de-green/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-de-green text-de-black text-xs font-heading font-extrabold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Verified Student Portal
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            Welcome back, {student.name}!
          </h1>
          <p className="text-sm text-white/80 max-w-xl font-medium">
            Campus: University Chowk, Bahawalpur &bull; Lead Instructor: Khezar Hayat. Watch your class lecture recordings and complete assignments below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10">
          <button
            onClick={() => setShowCourseModal(true)}
            className="px-5 py-3 rounded-btn font-heading font-extrabold text-xs bg-de-amber text-de-black hover:bg-white transition-all border-2 border-de-black shadow-hard-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll in New Course</span>
          </button>
          <a
            href="https://wa.me/923124051296"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-btn font-heading font-extrabold text-xs bg-[#25D366] text-white hover:bg-de-black transition-all border-2 border-de-black shadow-hard-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Class WhatsApp Group</span>
          </a>
        </div>
      </div>

      {/* 2. ENROLLED COURSES (CLASSROOMS) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-de-black">
              Your Active Classrooms
            </h2>
            <p className="text-xs text-de-muted font-bold mt-0.5">
              You have access to {enrolledCourses.length} approved masterclass batch(es).
            </p>
          </div>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border-2 border-de-black shadow-hard text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-de-warm text-de-muted flex items-center justify-center mx-auto border-2 border-de-black">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-de-black">
              No Course Classroom Assigned Yet
            </h3>
            <p className="text-sm text-de-muted max-w-md mx-auto font-semibold">
              You are an approved student, but your specific course classroom has not been linked yet. Select your course batch below.
            </p>
            <button
              onClick={() => setShowCourseModal(true)}
              className="px-6 py-3 rounded-btn font-heading font-extrabold text-sm bg-de-green text-white hover:bg-de-black transition-all border-2 border-de-black shadow-hard-sm"
            >
              Select Your Enrolled Course &rarr;
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => {
              const lectures = allLectures.filter((l) => l.courseSlug === course.slug);
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border-2 border-de-black shadow-hard-sm hover:shadow-hard transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full border-b-2 border-de-black overflow-hidden bg-de-warm">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-de-black text-white text-[10px] font-heading font-extrabold uppercase">
                        {course.level}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-heading font-extrabold text-lg text-de-black line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-de-muted line-clamp-2 font-semibold">
                        {course.shortDescription}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs font-bold text-de-body">
                        <span className="flex items-center gap-1.5 text-de-green">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{lectures.length > 0 ? `${lectures.length} Video Lessons` : "Lessons Uploaded"}</span>
                        </span>
                        <span className="text-de-muted">{course.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/lms/courses/${course.slug}`}
                      className="w-full py-3 px-4 rounded-btn font-heading font-extrabold text-sm bg-de-green text-white hover:bg-de-black transition-all border-2 border-de-black shadow-hard-sm flex items-center justify-center gap-2 group text-center"
                    >
                      <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                      <span>Enter Video Classroom &rarr;</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. COURSE SELECTION MODAL (As requested by user: popup where student selects course) */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border-3 border-de-black shadow-hard-lg max-w-lg w-full p-6 space-y-5 relative">
            <button
              onClick={() => setShowCourseModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-de-warm text-de-muted"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-de-amber/20 text-de-black text-xs font-heading font-extrabold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-de-amber fill-current" />
                Select Your Class Batch
              </div>
              <h3 className="font-heading font-extrabold text-xl text-de-black">
                Which Course Are You Enrolled In?
              </h3>
              <p className="text-xs text-de-muted font-semibold">
                Select your admitted course to unlock all lecture recordings, assignments, and practical masterclass videos.
              </p>
            </div>

            {requestStatus === "success" ? (
              <div className="p-5 bg-de-green/10 border-2 border-de-green rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-de-green mx-auto" />
                <p className="font-heading font-extrabold text-sm text-de-black">
                  Request Sent to Administration!
                </p>
                <p className="text-xs text-de-muted font-semibold">
                  Administrator will verify your batch and activate your classroom.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {allCourses.map((c) => (
                    <label
                      key={c.slug}
                      onClick={() => setSelectedSlug(c.slug)}
                      className={`p-3 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                        selectedSlug === c.slug
                          ? "bg-de-warm border-de-black shadow-hard-sm"
                          : "border-de-border hover:border-de-black/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="courseChoice"
                          checked={selectedSlug === c.slug}
                          onChange={() => setSelectedSlug(c.slug)}
                          className="accent-de-green"
                        />
                        <div>
                          <p className="font-heading font-extrabold text-sm text-de-black">{c.title}</p>
                          <p className="text-[11px] text-de-muted font-bold">
                            Fee: {c.fee.toLocaleString()} PKR &bull; {c.duration}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleRequestCourse}
                  disabled={requestStatus === "loading"}
                  className="w-full py-3.5 px-4 rounded-btn font-heading font-extrabold text-sm bg-de-black text-white hover:bg-de-green transition-all border-2 border-de-black shadow-hard-sm flex items-center justify-center gap-2"
                >
                  <span>Confirm Course Selection & Contact Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
