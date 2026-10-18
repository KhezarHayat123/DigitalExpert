"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, CheckCircle2, AlertCircle, ArrowRight, Clock, ShieldCheck } from "lucide-react";

const COURSES = [
  { slug: "wordpress", title: "WordPress Web Development Mastery" },
  { slug: "social-media", title: "Social Media Marketing Mastery" },
  { slug: "google-tiktok-ads", title: "Google & TikTok Paid Ads Mastery" },
  { slug: "video-ads", title: "Video Ads Creation Mastery" },
  { slug: "seo", title: "Search Engine Optimization (SEO) Mastery" },
  { slug: "youtube-automation", title: "YouTube Automation & Cash Cow Mastery" },
];

export default function StudentSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    requestedCourse: "wordpress",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lms/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to register.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
      <div className="text-center mb-8 space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-de-green text-white flex items-center justify-center mx-auto border-2 border-de-black shadow-hard-sm">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black">
          Student LMS <span className="text-de-amber">Registration</span>
        </h1>
        <p className="text-sm text-de-muted font-semibold">
          Create your student account to access live class recordings, lectures, and assignments.
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-white p-8 rounded-2xl border-2 border-de-black shadow-hard text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-de-amber flex items-center justify-center mx-auto border-2 border-de-black">
            <Clock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-extrabold text-2xl text-de-black">
              Account Registered — Approval Pending
            </h2>
            <p className="text-sm text-de-muted font-semibold leading-relaxed">
              Welcome, <strong>{formData.name}</strong>! Your account with <strong>{formData.email}</strong> has been registered.
            </p>
          </div>

          <div className="p-4 bg-de-warm rounded-xl border-2 border-de-black text-left text-xs font-semibold space-y-2">
            <div className="flex items-center gap-2 font-heading font-extrabold text-de-black">
              <ShieldCheck className="w-4 h-4 text-de-green" />
              <span>Admin Verification Policy:</span>
            </div>
            <p className="text-de-body">
              To protect proprietary student material, our administrative staff must approve your registration before you can log in. Once verified (usually within 15–30 minutes), you will have full access.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/923124051296?text=${encodeURIComponent(
                `Hi DigitalExpert, I just signed up for LMS with email ${formData.email} for the ${formData.requestedCourse} course. Please approve my access.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-btn font-heading font-extrabold text-sm bg-[#25D366] text-white hover:bg-de-black transition-all border-2 border-de-black shadow-hard-sm flex items-center justify-center gap-2"
            >
              <span>Notify Admin on WhatsApp</span>
            </a>

            <Link
              href="/lms/login"
              className="w-full py-3 px-4 rounded-btn font-heading font-extrabold text-sm bg-white text-de-black hover:bg-de-warm transition-all border-2 border-de-black"
            >
              Go to Login Page &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-de-black shadow-hard space-y-4"
        >
          {status === "error" && (
            <div className="p-4 bg-red-50 border-2 border-red-500 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Student Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ali Raza"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
            />
          </div>

          {/* Email / Gmail */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Gmail / Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="student@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
            />
            <p className="text-[11px] text-de-muted mt-1 font-semibold">
              Use the exact Gmail address you provided during admission.
            </p>
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              WhatsApp Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="03124051296"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
            />
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Enrolled Course Batch <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.requestedCourse}
              onChange={(e) => setFormData({ ...formData, requestedCourse: e.target.value })}
              className="w-full px-4 py-3 rounded-btn border-2 border-de-black bg-de-warm font-heading font-extrabold text-sm text-de-black focus:outline-none cursor-pointer"
            >
              {COURSES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Create Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 px-6 rounded-btn font-heading font-extrabold text-sm bg-de-black text-white hover:bg-de-green transition-all duration-200 border-2 border-de-black shadow-hard-sm hover:shadow-hard flex items-center justify-center gap-2 group disabled:opacity-60 pt-3"
          >
            {status === "loading" ? (
              <span>Registering Account...</span>
            ) : (
              <>
                <span>Register for LMS Approval</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-de-muted font-bold pt-2">
            Already have an approved account?{" "}
            <Link href="/lms/login" className="text-de-green hover:underline">
              Sign In here &rarr;
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
