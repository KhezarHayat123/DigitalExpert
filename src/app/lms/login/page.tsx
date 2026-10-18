"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, AlertCircle, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setIsPending(false);

    try {
      const res = await fetch("/api/lms/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.isPending) {
          setIsPending(true);
        }
        throw new Error(data.error || "Failed to log in.");
      }

      // Successful login
      router.push("/lms/dashboard");
      router.refresh();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Invalid credentials.");
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
      <div className="text-center mb-8 space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-de-black text-de-amber flex items-center justify-center mx-auto border-2 border-de-black shadow-hard-sm">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-de-black">
          Student LMS <span className="text-de-green">Login</span>
        </h1>
        <p className="text-sm text-de-muted font-semibold">
          Sign in to your approved classroom account.
        </p>
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-de-black shadow-hard space-y-5"
      >
        {status === "error" && (
          <div
            className={`p-4 rounded-xl border-2 text-xs font-bold space-y-2 ${
              isPending
                ? "bg-amber-50 border-de-amber text-amber-900"
                : "bg-red-50 border-red-500 text-red-700"
            }`}
          >
            <div className="flex items-center gap-2">
              {isPending ? (
                <Clock className="w-4 h-4 shrink-0 text-de-amber" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span className="font-heading font-extrabold text-sm">
                {isPending ? "Approval Pending" : "Login Failed"}
              </span>
            </div>
            <p className="leading-relaxed font-semibold">{errorMessage}</p>

            {isPending && (
              <a
                href={`https://wa.me/923124051296?text=${encodeURIComponent(
                  `Hi DigitalExpert, my email is ${email}. Please approve my LMS student account.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-extrabold text-[11px] mt-1"
              >
                <span>Contact Admin on WhatsApp &rarr;</span>
              </a>
            )}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
            Registered Email / Gmail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="student@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3.5 px-6 rounded-btn font-heading font-extrabold text-sm bg-de-black text-white hover:bg-de-green transition-all duration-200 border-2 border-de-black shadow-hard-sm hover:shadow-hard flex items-center justify-center gap-2 group disabled:opacity-60"
        >
          {status === "loading" ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In to Classroom</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <div className="pt-2 text-center text-xs text-de-muted font-bold space-y-2">
          <p>
            New student without an account?{" "}
            <Link href="/lms/signup" className="text-de-green hover:underline">
              Register here &rarr;
            </Link>
          </p>
          <p className="text-[11px] text-de-muted/80">
            Approved demo account: <code className="bg-de-warm px-1 py-0.5 rounded">student@digitalexpert.pk</code> / <code className="bg-de-warm px-1 py-0.5 rounded">StudentPass2026!</code>
          </p>
        </div>
      </form>
    </div>
  );
}
