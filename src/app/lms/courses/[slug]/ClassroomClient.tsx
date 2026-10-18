"use client";

import { useState } from "react";
import Link from "next/link";
import { Student, Course, Lecture, StudentAssignment } from "@/lib/types";
import {
  Play,
  CheckCircle2,
  BookOpen,
  Download,
  Send,
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Sparkles,
  FileText,
  AlertCircle,
} from "lucide-react";

interface ClassroomClientProps {
  student: Student;
  course: Course;
  lectures: Lecture[];
  initialSubmissions: StudentAssignment[];
}

export default function ClassroomClient({
  student,
  course,
  lectures,
  initialSubmissions,
}: ClassroomClientProps) {
  // If no lectures exist in DB yet, create a default placeholder lecture
  const effectiveLectures =
    lectures.length > 0
      ? lectures
      : [
          {
            id: "lec-welcome",
            courseSlug: course.slug,
            moduleTitle: "Module 1: Orientation & Foundations",
            title: `Welcome & Introduction to ${course.title}`,
            duration: "45 mins",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            order: 1,
            description: `Welcome to the official masterclass for ${course.title} at DigitalExpert Bahawalpur. In this lecture, Instructor Khezar Hayat introduces the curriculum, software tools, live client project expectations, and freelance career roadmap.`,
            assignmentPrompt: "Set up your workspace and submit your local environment screenshot or link.",
          },
        ];

  const [activeLectureId, setActiveLectureId] = useState(effectiveLectures[0].id);
  const [activeTab, setActiveTab] = useState<"overview" | "assignment">("overview");

  // Assignment submission state
  const [submissionText, setSubmissionText] = useState("");
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submissions, setSubmissions] = useState<StudentAssignment[]>(initialSubmissions);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const activeLecture =
    effectiveLectures.find((l) => l.id === activeLectureId) || effectiveLectures[0];

  // Helper to format YouTube / video embeds safely
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/lms/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lectureId: activeLecture.id,
          lectureTitle: activeLecture.title,
          courseSlug: course.slug,
          submissionText,
          submissionUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit assignment.");
      }

      setSubmissions([data.submission, ...submissions]);
      setSubmitStatus("success");
      setStatusMessage("Assignment submitted successfully! The instructor will review your work.");
      setSubmissionText("");
      setSubmissionUrl("");
    } catch (err: any) {
      setSubmitStatus("error");
      setStatusMessage(err.message || "Failed to submit assignment.");
    }
  };

  const currentSubmission = submissions.find((s) => s.lectureId === activeLecture.id);

  return (
    <div className="space-y-6">
      {/* Top Header Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-de-border">
        <div className="flex items-center gap-3">
          <Link
            href="/lms/dashboard"
            className="p-2 rounded-xl bg-white border border-de-border hover:border-de-black text-de-body transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <nav className="text-xs font-bold text-de-muted">
              <span>LMS</span> &bull; <span>Classroom</span> &bull;{" "}
              <span className="text-de-green">{course.title}</span>
            </nav>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-de-black mt-0.5">
              {activeLecture.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/923124051296?text=${encodeURIComponent(
              `Hi Khezar Hayat, I have a question regarding ${course.title} lecture: ${activeLecture.title}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-btn font-heading font-extrabold text-xs bg-[#25D366] text-white hover:bg-de-black transition-all border-2 border-de-black shadow-hard-sm"
          >
            Ask Instructor on WhatsApp
          </a>
        </div>
      </div>

      {/* Main Classroom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Video Player & Assignment Tabs */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. VIDEO PLAYER CONTAINER */}
          <div className="bg-black rounded-2xl border-2 border-de-black shadow-hard overflow-hidden relative aspect-video w-full">
            {activeLecture.videoUrl ? (
              <iframe
                src={getEmbedUrl(activeLecture.videoUrl)}
                title={activeLecture.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white text-center space-y-3 bg-de-black">
                <div className="w-16 h-16 rounded-full bg-de-amber/20 border-2 border-de-amber flex items-center justify-center">
                  <Play className="w-8 h-8 text-de-amber fill-current" />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-white">
                  Recording In Processing
                </h3>
                <p className="text-xs text-white/70 max-w-sm">
                  The high-definition recording for this live lecture is being processed by the instructor and will appear here shortly.
                </p>
              </div>
            )}
          </div>

          {/* 2. TAB CONTROLS (Overview vs Assignment) */}
          <div className="bg-white rounded-2xl border-2 border-de-black shadow-hard p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-de-border pb-3">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-btn font-heading font-extrabold text-xs transition-all ${
                  activeTab === "overview"
                    ? "bg-de-black text-white"
                    : "text-de-body hover:bg-de-warm"
                }`}
              >
                Lecture Notes & Details
              </button>
              <button
                onClick={() => setActiveTab("assignment")}
                className={`px-4 py-2 rounded-btn font-heading font-extrabold text-xs transition-all relative ${
                  activeTab === "assignment"
                    ? "bg-de-black text-white"
                    : "text-de-body hover:bg-de-warm"
                }`}
              >
                <span>Practical Assignment</span>
                {currentSubmission && (
                  <span className="w-2 h-2 rounded-full bg-de-green ml-1.5 inline-block" />
                )}
              </button>
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-de-muted">
                  <span className="flex items-center gap-1.5 text-de-black font-extrabold">
                    <User className="w-4 h-4 text-de-green" />
                    <span>Instructor: {course.instructor}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-de-amber" />
                    <span>Duration: {activeLecture.duration}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-de-black" />
                    <span>{activeLecture.moduleTitle}</span>
                  </span>
                </div>

                <div className="prose prose-sm max-w-none text-de-body leading-relaxed font-medium">
                  <p>{activeLecture.description || course.description}</p>
                </div>

                {/* Practical Tools for this lecture */}
                <div className="pt-3 border-t border-de-border">
                  <h4 className="font-heading font-extrabold text-xs uppercase text-de-muted mb-2">
                    Tools Covered in this Lesson:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tools.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-de-warm border border-de-border text-xs font-bold text-de-black"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ASSIGNMENT */}
            {activeTab === "assignment" && (
              <div className="space-y-5">
                <div className="p-4 bg-de-warm rounded-xl border-2 border-de-black space-y-2">
                  <h4 className="font-heading font-extrabold text-sm text-de-black flex items-center gap-2">
                    <FileText className="w-4 h-4 text-de-green" />
                    <span>Assignment Instructions:</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-de-body font-semibold leading-relaxed">
                    {activeLecture.assignmentPrompt ||
                      `Complete the hands-on exercise demonstrated in ${activeLecture.title} and submit your work or live link below for review by Khezar Hayat.`}
                  </p>
                </div>

                {/* Previous submission if any */}
                {currentSubmission && (
                  <div className="p-4 bg-de-green/10 border-2 border-de-green rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-heading font-extrabold text-de-green flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Already Submitted</span>
                      </span>
                      <span className="text-[11px] text-de-muted font-bold">
                        {new Date(currentSubmission.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {currentSubmission.submissionUrl && (
                      <p className="text-xs font-bold text-de-black truncate">
                        Project Link:{" "}
                        <a
                          href={currentSubmission.submissionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-de-green underline"
                        >
                          {currentSubmission.submissionUrl}
                        </a>
                      </p>
                    )}
                    {currentSubmission.submissionText && (
                      <p className="text-xs text-de-muted font-medium bg-white p-2 rounded border border-de-border">
                        {currentSubmission.submissionText}
                      </p>
                    )}
                    {currentSubmission.grade && (
                      <div className="p-2 bg-de-amber/20 rounded border border-de-amber text-xs font-extrabold text-de-black">
                        Instructor Grade: {currentSubmission.grade} &bull; Feedback:{" "}
                        {currentSubmission.feedback || "Good effort!"}
                      </div>
                    )}
                  </div>
                )}

                {/* Submission Form */}
                <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                  {submitStatus === "error" && (
                    <div className="p-3 bg-red-50 border border-red-500 rounded-lg text-red-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  {submitStatus === "success" && (
                    <div className="p-3 bg-de-green/20 border border-de-green rounded-lg text-de-black text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-de-green" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1">
                      Live Project / Google Drive / GitHub URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourwebsite.com or Google Drive Share Link"
                      value={submissionUrl}
                      onChange={(e) => setSubmissionUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-btn border-2 border-de-border bg-de-warm/50 text-xs font-semibold text-de-body focus:border-de-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1">
                      Notes or Explanations for the Instructor
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe what you built or any questions you faced..."
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-btn border-2 border-de-border bg-de-warm/50 text-xs font-semibold text-de-body focus:border-de-black focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === "loading"}
                    className="px-6 py-3 rounded-btn font-heading font-extrabold text-xs bg-de-black text-white hover:bg-de-green transition-all border-2 border-de-black shadow-hard-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitStatus === "loading" ? "Submitting..." : "Submit Assignment"}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Playlist / Modules Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border-2 border-de-black shadow-hard p-5 space-y-4 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-de-border">
              <div>
                <h3 className="font-heading font-extrabold text-base text-de-black">
                  Class Curriculum
                </h3>
                <p className="text-[11px] text-de-muted font-bold">
                  {effectiveLectures.length} Recorded Lecture(s)
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-de-green/15 text-de-green text-[10px] font-heading font-extrabold uppercase">
                Active Batch
              </span>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {effectiveLectures.map((lec, idx) => {
                const isActive = lec.id === activeLecture.id;
                const isDone = submissions.some((s) => s.lectureId === lec.id);

                return (
                  <button
                    key={lec.id}
                    onClick={() => setActiveLectureId(lec.id)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 ${
                      isActive
                        ? "bg-de-black text-white border-de-black shadow-hard-sm"
                        : "bg-de-warm text-de-body border-de-border hover:border-de-black hover:bg-white"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-extrabold mt-0.5 ${
                        isActive
                          ? "bg-de-amber text-de-black"
                          : isDone
                          ? "bg-de-green text-white"
                          : "bg-white text-de-black border border-de-border"
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-heading font-extrabold truncate ${
                          isActive ? "text-white" : "text-de-black"
                        }`}
                      >
                        {lec.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] font-bold">
                        <span className={isActive ? "text-de-amber" : "text-de-muted"}>
                          {lec.duration}
                        </span>
                        <span className={isActive ? "text-white/60" : "text-de-muted"}>
                          &bull; {lec.moduleTitle.split(":")[0]}
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-de-green shrink-0 mt-2 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
