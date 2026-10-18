"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X, User } from "lucide-react";

export default function WelcomePopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [inputName, setInputName] = useState("");
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    // Only run on public pages
    if (pathname.startsWith("/admin")) return;

    // Check if shown in this session
    const sessionSeen = sessionStorage.getItem("de_welcome_seen");
    if (sessionSeen) return;

    // Check localStorage for saved name from previous visits
    const savedName = localStorage.getItem("de_visitor_name");
    if (savedName) {
      setVisitorName(savedName);
      setIsReturning(true);
    }

    // Try Google Identity Services (One Tap) if client ID is configured
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (googleClientId && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // @ts-ignore
        if (window.google?.accounts?.id) {
          // @ts-ignore
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: (response: any) => {
              try {
                // Decode JWT payload
                const base64Url = response.credential.split(".")[1];
                const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                const jsonPayload = decodeURIComponent(
                  atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
                );
                const data = JSON.parse(jsonPayload);
                if (data.name) {
                  setVisitorName(data.name);
                  localStorage.setItem("de_visitor_name", data.name);
                }
              } catch (e) {
                console.error("Error decoding Google credential:", e);
              }
            },
          });
          // @ts-ignore
          window.google.accounts.id.prompt();
        }
      };
      document.body.appendChild(script);
    }

    // Show popup after brief delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClose = () => {
    if (inputName.trim()) {
      localStorage.setItem("de_visitor_name", inputName.trim());
      setVisitorName(inputName.trim());
    }
    sessionStorage.setItem("de_welcome_seen", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-white rounded-2xl border-3 border-de-black shadow-hard-lg overflow-hidden p-6 sm:p-8"
        >
          {/* Top Amber Brand Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-de-green via-de-amber to-de-green" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-de-warm text-de-muted hover:text-de-black transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="relative h-12 w-48">
              <Image
                src="/brand/digital-expert-logo.png"
                alt="DigitalExpert Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Greeting */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-de-green/10 text-de-green font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {isReturning ? "Welcome Back!" : "Welcome to DigitalExpert"}
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-de-black">
              {visitorName ? (
                <span>
                  Welcome, <span className="text-de-amber">{visitorName}</span>!
                </span>
              ) : (
                <span>Grow Your Brand. Master Digital Skills.</span>
              )}
            </h3>

            <p className="text-sm text-de-muted">
              University Chowk, Bahawalpur&apos;s leading Digital Marketing Agency & Practical IT Training Academy.
            </p>
          </div>

          {/* Optional Name Input if name is unknown */}
          {!visitorName && (
            <div className="mt-5">
              <label htmlFor="visitor-name" className="block text-xs font-bold uppercase text-de-muted mb-1.5">
                How should we address you? (Optional)
              </label>
              <div className="relative">
                <input
                  id="visitor-name"
                  type="text"
                  placeholder="Enter your name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 rounded-btn border-2 border-de-border focus:border-de-black focus:outline-none text-sm text-de-body bg-de-warm/50"
                />
                <User className="w-4 h-4 text-de-muted absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          {/* Enter Website CTA */}
          <div className="mt-6">
            <button
              onClick={handleClose}
              className="w-full py-3.5 px-6 rounded-btn font-extrabold text-sm bg-de-black text-white hover:bg-de-green transition-all duration-200 border-2 border-de-black shadow-hard-sm hover:shadow-hard flex items-center justify-center gap-2 group"
            >
              <span>Enter Website</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
