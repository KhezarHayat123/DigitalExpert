"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, MessageCircle, Copy, Check } from "lucide-react";

const OPTIONS = [
  "WordPress Website Development",
  "Search Engine Optimization (SEO)",
  "Social Media Marketing",
  "Google & TikTok Ads Management",
  "Commercial Video Ads Creation",
  "YouTube Automation",
  "WordPress Course Admission",
  "SEO Course Admission",
  "Social Media Course Admission",
  "Google & TikTok Ads Course Admission",
  "Video Ads Course Admission",
  "YouTube Automation Course Admission",
  "General Consultation",
];

export default function ContactFormClient({ initialService }: { initialService?: string }) {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || initialService || "";

  // Map slug to readable name if provided
  let defaultInterest = "General Consultation";
  if (serviceParam.includes("wordpress")) defaultInterest = "WordPress Website Development";
  else if (serviceParam.includes("seo")) defaultInterest = "Search Engine Optimization (SEO)";
  else if (serviceParam.includes("social")) defaultInterest = "Social Media Marketing";
  else if (serviceParam.includes("ads")) defaultInterest = "Google & TikTok Ads Management";
  else if (serviceParam.includes("video")) defaultInterest = "Commercial Video Ads Creation";
  else if (serviceParam.includes("youtube")) defaultInterest = "YouTube Automation";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interestedIn: defaultInterest,
    message: "",
    honeypot: "", // Bot prevention field
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If bot filled hidden honeypot
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage("Please provide your name and WhatsApp/phone number.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again or WhatsApp us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white p-8 rounded-2xl border-2 border-de-black shadow-hard text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-de-green text-white flex items-center justify-center mx-auto border-2 border-de-black shadow-hard-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-heading font-extrabold text-2xl text-de-black">Message Sent Successfully!</h3>
          <p className="text-sm text-de-muted max-w-md mx-auto font-semibold">
            Thank you, <strong>{formData.name}</strong>. We have received your message and sent a copy to{" "}
            <strong>info@digitalexpert.pk</strong>. Founder Khezar Hayat will review your request shortly.
          </p>
        </div>

        <div className="pt-4 border-t border-de-border flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/923124051296?text=${encodeURIComponent(`Hi DigitalExpert, I just submitted an inquiry on your website: ${formData.interestedIn}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-btn font-heading font-extrabold text-sm bg-[#25D366] text-white hover:bg-de-black transition-all border-2 border-de-black shadow-hard-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat on WhatsApp Instead</span>
          </a>
          <button
            onClick={() => {
              setFormData({
                name: "",
                email: "",
                phone: "",
                interestedIn: "General Consultation",
                message: "",
                honeypot: "",
              });
              setStatus("idle");
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-btn font-heading font-extrabold text-sm bg-de-warm text-de-black hover:bg-white transition-all border-2 border-de-black"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-de-black shadow-hard space-y-5">
      <div>
        <h3 className="font-heading font-extrabold text-2xl text-de-black">
          Send Us a <span className="text-de-green">Direct Message</span>
        </h3>
        <p className="text-sm text-de-muted mt-1 font-semibold">
          Fill out this form and we will get back to you within 2 hours.
        </p>
      </div>

      {status === "error" && (
        <div className="p-4 bg-red-50 border-2 border-red-500 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hidden Honeypot Field */}
      <input
        type="text"
        name="company_website_hp"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Full Name */}
      <div>
        <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
          Your Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Muhammad Ali"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
        />
      </div>

      {/* WhatsApp / Phone & Email in 2 Cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
            WhatsApp / Phone <span className="text-red-500">*</span>
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

        <div>
          <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
            Email Address (Optional)
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
          />
        </div>
      </div>



      {/* Message */}
      <div>
        <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
          Project Brief or Question
        </label>
        <textarea
          rows={4}
          required
          placeholder="Tell us about your project requirements or the course you want to join..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 px-6 rounded-btn font-heading font-extrabold text-sm bg-de-black text-white hover:bg-de-green transition-all duration-200 border-2 border-de-black shadow-hard-sm hover:shadow-hard flex items-center justify-center gap-2 group disabled:opacity-60"
      >
        {status === "loading" ? (
          <span>Sending Message...</span>
        ) : (
          <>
            <span>Send Enquiry to DigitalExpert</span>
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
