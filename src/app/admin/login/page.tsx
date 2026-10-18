"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@digitalexpert.pk");
  const [password, setPassword] = useState("DigitalExpertAdmin2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to sign in.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F1] flex flex-col items-center justify-center p-4">
      {/* Login Card */}
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl border-2 border-de-black shadow-hard space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative h-12 w-48 mb-2">
            <Image
              src="/brand/digital-expert-logo.png"
              alt="DigitalExpert Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-de-muted">
            WordPress-Style Control Panel
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@digitalexpert.pk"
                className="w-full px-4 py-2.5 pl-10 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
              />
              <Mail className="w-4 h-4 text-de-muted absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-extrabold uppercase text-de-black mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 pl-10 rounded-btn border-2 border-de-border bg-de-warm/50 text-sm font-semibold text-de-body focus:border-de-black focus:outline-none"
              />
              <Lock className="w-4 h-4 text-de-muted absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-btn font-heading font-extrabold text-sm bg-de-black text-white hover:bg-de-green transition-all duration-200 border-2 border-de-black shadow-hard-sm hover:shadow-hard flex items-center justify-center gap-2 group disabled:opacity-60"
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Log In to Dashboard</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-de-border text-center">
          <p className="text-[11px] font-bold text-de-muted flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-de-green" />
            Protected by Brute-Force Rate Limiting
          </p>
        </div>
      </div>

      <p className="mt-6 text-xs text-de-muted text-center">
        &larr; <a href="/" className="font-bold hover:underline">Back to DigitalExpert Public Site</a>
      </p>
    </div>
  );
}
