"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Course, SiteSettings } from "@/lib/types";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  CreditCard,
  MessageCircle,
  Building,
  Smartphone,
  Info,
} from "lucide-react";
import confetti from "canvas-confetti";

interface EnrollFormClientProps {
  courses: Course[];
  settings: SiteSettings;
}

export default function EnrollFormClient({ courses, settings }: EnrollFormClientProps) {
  const searchParams = useSearchParams();
  const courseParam = searchParams.get("course") || "";

  // Find initial course from slug
  const initialCourse =
    courses.find((c) => c.slug.toLowerCase() === courseParam.toLowerCase()) || courses[0];

  const [selectedCourseSlug, setSelectedCourseSlug] = useState(initialCourse?.slug || "");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("Bahawalpur");
  const [paymentMethod, setPaymentMethod] = useState("JazzCash");
  const [transactionId, setTransactionId] = useState("");
  const [notes, setNotes] = useState("");

  // Screenshot upload state
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const activeCourse = courses.find((c) => c.slug === selectedCourseSlug) || courses[0];

  // Update selected course if query parameter changes
  useEffect(() => {
    if (courseParam) {
      const match = courses.find((c) => c.slug.toLowerCase() === courseParam.toLowerCase());
      if (match) setSelectedCourseSlug(match.slug);
    }
  }, [courseParam, courses]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Screenshot file size must be less than 5 MB.");
      return;
    }

    // Validate type (JPG, PNG, PDF)
    const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Please upload a valid image (JPG, PNG, WebP) or PDF file.");
      return;
    }

    setErrorMessage("");
    setScreenshotFile(file);

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setScreenshotPreview(url);
    } else {
      setScreenshotPreview(null);
    }
  };

  const removeFile = () => {
    setScreenshotFile(null);
    if (screenshotPreview) {
      URL.revokeObjectURL(screenshotPreview);
      setScreenshotPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentName.trim() || !whatsapp.trim()) {
      setErrorMessage("Full Name and WhatsApp number are required.");
      return;
    }

    if (!screenshotFile) {
      setErrorMessage("Payment screenshot is required to submit your enrollment.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("studentName", studentName);
      formData.append("email", email);
      formData.append("whatsapp", whatsapp);
      formData.append("city", city);
      formData.append("courseSlug", activeCourse.slug);
      formData.append("courseTitle", activeCourse.title);
      formData.append("feeAtTime", activeCourse.fee.toString());
      formData.append("paymentMethod", paymentMethod);
      formData.append("transactionId", transactionId);
      formData.append("notes", notes);
      formData.append("screenshot", screenshotFile);

      const res = await fetch("/api/enroll", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enrollment request.");
      }

      setStatus("success");
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#6A9A00", "#FFAA1D", "#0B0B09"],
        });
      } catch {}
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit enrollment. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-2xl border-3 border-de-black shadow-hard text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-de-green text-white flex items-center justify-center mx-auto border-3 border-de-black shadow-hard-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <div className="inline-block px-3.5 py-1 rounded-full bg-de-amber/20 border border-de-amber text-de-black font-heading font-extrabold text-xs uppercase tracking-wider">
            Application Received
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black">
            Request Received for {activeCourse.title}
          </h2>
          <div className="max-w-xl mx-auto p-4 bg-de-warm rounded-xl border-2 border-de-black text-left text-sm font-semibold space-y-2">
            <p className="flex items-center gap-2 text-de-black font-extrabold">
              <Info className="w-5 h-5 text-de-green shrink-0" />
              Admission Rule & What Happens Next:
            </p>
            <p className="text-de-muted">
              Submitting this form does <strong>not</strong> immediately confirm your admission seat. Your admission is officially confirmed after our administration verifies your payment screenshot in our accounts desk (usually within 24 hours).
            </p>
            <p className="text-de-muted">
              You will receive confirmation via WhatsApp on <strong>{whatsapp}</strong> and by email.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-de-border flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/923124051296?text=${encodeURIComponent(`Hi DigitalExpert, I have just submitted my enrollment request and payment screenshot for ${activeCourse.title}. Student name: ${studentName}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-btn font-heading font-extrabold text-sm bg-[#25D366] text-white hover:bg-de-black transition-all border-2 border-de-black shadow-hard-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Notify Administration on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left Column (7 cols): Enrollment Form */}
      <div className="lg:col-span-7">
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-de-black shadow-hard space-y-5">
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-de-black">
              Online Admission <span className="text-de-green">Form</span>
            </h2>
            <p className="text-sm text-de-muted mt-1 font-semibold">
              Fill in your details, select your payment method, and attach your deposit receipt.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 border-2 border-red-500 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Student Full Name */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Muhammad Usman"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
            />
          </div>

          {/* WhatsApp & Email (2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="03124051296"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Your City
            </label>
            <input
              type="text"
              placeholder="e.g. Bahawalpur, Lodhran, Multan"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
            />
          </div>

          {/* Interested In: ONLY COURSES with Fee shown */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Select Course (Showing Exact Fees) <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedCourseSlug}
              onChange={(e) => setSelectedCourseSlug(e.target.value)}
              className="w-full px-4 py-3 rounded-btn border-2 border-de-black bg-de-warm font-heading font-extrabold text-sm text-de-black focus:outline-none cursor-pointer"
            >
              {courses.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title} — {c.fee.toLocaleString()} PKR ({c.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Payment Method Used <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {settings.acceptedPaymentMethods.map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-3 px-2 rounded-btn font-heading font-extrabold text-xs transition-all border-2 text-center ${
                    paymentMethod === method
                      ? "bg-de-black text-white border-de-black shadow-hard-sm"
                      : "bg-de-warm text-de-body border-de-border hover:border-de-black"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction ID */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Transaction ID / Reference Number (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. TID-982341 or Bank Reference"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
            />
          </div>

          {/* PAYMENT SCREENSHOT: REQUIRED WITH PREVIEW */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Payment Screenshot (Receipt) <span className="text-red-500">* REQUIRED</span>
            </label>
            <p className="text-xs text-de-muted mb-2 font-semibold">
              Attach a clear screenshot of your JazzCash, EasyPaisa, or Bank confirmation screen (JPG, PNG, or PDF, max 5 MB).
            </p>

            {!screenshotFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-de-black/60 rounded-xl p-6 text-center bg-de-warm/60 hover:bg-de-warm transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-de-green mx-auto mb-2" />
                <p className="font-heading font-extrabold text-sm text-de-black">
                  Click to Upload Payment Screenshot
                </p>
                <p className="text-xs text-de-muted mt-1 font-semibold">JPG, PNG, or PDF up to 5 MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  required
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="p-4 bg-de-warm rounded-xl border-2 border-de-black flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  {screenshotPreview ? (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-de-black shrink-0">
                      <Image
                        src={screenshotPreview}
                        alt="Screenshot Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-de-black text-white flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-xs font-extrabold text-de-black truncate">{screenshotFile.name}</p>
                    <p className="text-[10px] text-de-muted font-bold">
                      {(screenshotFile.size / 1024).toFixed(1)} KB &bull; Verified Format
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1.5 rounded-full hover:bg-white text-de-muted hover:text-red-500 transition-colors"
                  aria-label="Remove screenshot"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Additional Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Any questions or special batch timing preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 px-6 rounded-btn font-heading font-extrabold text-sm bg-de-black text-white hover:bg-de-green transition-all duration-200 border-2 border-de-black shadow-hard-sm hover:shadow-hard flex items-center justify-center gap-2 group disabled:opacity-60"
          >
            {status === "loading" ? (
              <span>Submitting Enrollment...</span>
            ) : (
              <>
                <span>Submit Enrollment for Verification</span>
                <CheckCircle2 className="w-4 h-4 transition-transform group-hover:scale-110" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Right Column (5 cols): STICKY SIDE SUMMARY & PAYMENT ACCOUNTS */}
      <div className="lg:col-span-5">
        <div className="sticky top-28 space-y-6">
          {/* Selected Course Summary Box */}
          <div className="bg-white rounded-2xl border-2 border-de-black p-6 shadow-hard space-y-4">
            <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-de-green">
              Selected Course Summary
            </span>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-de-black">{activeCourse.title}</h3>
                <p className="text-xs text-de-muted mt-1 font-bold">{activeCourse.duration}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] font-bold uppercase text-de-muted">Payable Fee</p>
                <p className="font-heading font-extrabold text-2xl text-de-black">
                  {activeCourse.fee.toLocaleString()} <span className="text-xs text-de-green">PKR</span>
                </p>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="p-4 bg-de-warm rounded-xl border border-de-border space-y-2 text-xs font-semibold text-de-muted">
              <p className="font-extrabold text-de-black uppercase tracking-wide">What Happens Next:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Submit form with your payment screenshot.</li>
                <li>Our administration verifies the transaction.</li>
                <li>Admission confirmed on WhatsApp and email.</li>
                <li>Join the upcoming batch orientation.</li>
              </ol>
            </div>
          </div>

          {/* OFFICIAL PAYMENT ACCOUNTS CARD */}
          <div className="bg-de-warm rounded-2xl border-2 border-de-black p-6 shadow-hard space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-de-green" />
              <h3 className="font-heading font-extrabold text-base text-de-black">
                Official Payment Accounts
              </h3>
            </div>
            <p className="text-xs text-de-muted font-semibold">
              Please transfer the course fee of <strong>{activeCourse.fee.toLocaleString()} PKR</strong> to any of the following accounts:
            </p>

            {/* JazzCash */}
            <div className="p-3.5 bg-white rounded-xl border border-de-border space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-de-muted">
                <span className="flex items-center gap-1.5 text-de-black font-extrabold">
                  <Smartphone className="w-4 h-4 text-red-600" /> JazzCash
                </span>
                <span>Title: {settings.paymentAccounts.jazzcash.accountTitle}</span>
              </div>
              <p className="font-heading font-extrabold text-base text-de-black">
                {settings.paymentAccounts.jazzcash.number}
              </p>
            </div>

            {/* EasyPaisa */}
            <div className="p-3.5 bg-white rounded-xl border border-de-border space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-de-muted">
                <span className="flex items-center gap-1.5 text-de-black font-extrabold">
                  <Smartphone className="w-4 h-4 text-green-600" /> EasyPaisa
                </span>
                <span>Title: {settings.paymentAccounts.easypaisa.accountTitle}</span>
              </div>
              <p className="font-heading font-extrabold text-base text-de-black">
                {settings.paymentAccounts.easypaisa.number}
              </p>
            </div>

            {/* Bank Transfer */}
            <div className="p-3.5 bg-white rounded-xl border border-de-border space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-de-muted">
                <span className="flex items-center gap-1.5 text-de-black font-extrabold">
                  <Building className="w-4 h-4 text-blue-600" /> {settings.paymentAccounts.bank.bankName}
                </span>
                <span>Title: {settings.paymentAccounts.bank.accountTitle}</span>
              </div>
              <p className="font-heading font-extrabold text-sm text-de-black">
                Account: {settings.paymentAccounts.bank.accountNumber}
              </p>
              <p className="font-mono text-[11px] text-de-muted">
                IBAN: {settings.paymentAccounts.bank.iban}
              </p>
            </div>

            {/* WhatsApp Help Button */}
            <a
              href={`https://wa.me/923124051296?text=${encodeURIComponent(`Hi DigitalExpert, I need help with payment for ${activeCourse.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-btn font-heading font-extrabold text-xs bg-[#25D366] text-white hover:bg-de-black transition-all border-2 border-de-black shadow-hard-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Need Help with Payment? Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
