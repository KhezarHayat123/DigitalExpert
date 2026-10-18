"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, Upload, UserCheck } from "lucide-react";

const STEPS = [
  { num: 1, title: "Choose Your Course", desc: "Select your desired batch & level", icon: UserCheck },
  { num: 2, title: "Pay the Course Fee", desc: "Via JazzCash, EasyPaisa, or Bank", icon: CreditCard },
  { num: 3, title: "Upload Screenshot", desc: "Attach receipt (JPG/PNG/PDF)", icon: Upload },
  { num: 4, title: "Admission Confirmed", desc: "Official seat confirmation via WhatsApp", icon: CheckCircle2 },
];

export default function EnrollHeroVisual() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      {/* Moving Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

      {/* Main Steps Box */}
      <div className="relative z-10 bg-white rounded-3xl border-3 border-de-black p-5 sm:p-6 shadow-hard space-y-4">
        {/* Course Admission Illustration Banner */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-de-black bg-de-warm">
          <Image
            src="/brand/digital-academy.jpg"
            alt="DigitalExpert Course Admission"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2.5 left-3 px-3 py-1 bg-de-green rounded-lg border border-de-black text-white text-[11px] font-heading font-extrabold">
            University Chowk, Bahawalpur Campus &bull; Batch Admissions Open
          </div>
        </div>

        <div className="flex items-center justify-between pb-3 border-b-2 border-de-border">
          <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-de-black">
            Simple 4-Step Enrollment
          </span>
          <span className="text-xs font-extrabold text-de-green bg-de-green/15 px-2.5 py-0.5 rounded-full border border-de-green/30">
            Step {activeStep + 1} of 4
          </span>
        </div>

        <div className="space-y-3">
          {STEPS.map((step, idx) => {
            const isCurrent = activeStep === idx;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.num}
                animate={{
                  scale: isCurrent ? 1.02 : 1,
                  backgroundColor: isCurrent ? "#F7F5EF" : "#FFFFFF",
                  borderColor: isCurrent ? "#6A9A00" : "#E5E0D2",
                }}
                transition={{ duration: 0.3 }}
                className={`p-3.5 rounded-xl border-2 flex items-center gap-3.5 transition-shadow ${
                  isCurrent ? "shadow-hard-sm" : ""
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isCurrent
                      ? "bg-de-green text-white border-de-black shadow-hard-sm"
                      : "bg-white text-de-muted border-de-border"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-de-muted">0{step.num}</span>
                    <p className="text-sm font-extrabold text-de-body truncate">{step.title}</p>
                  </div>
                  <p className="text-xs text-de-muted font-semibold truncate">{step.desc}</p>
                </div>
                {isCurrent && (
                  <span className="w-2.5 h-2.5 rounded-full bg-de-amber animate-pulse shrink-0" />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-5 pt-3.5 border-t border-de-border text-center">
          <p className="text-xs font-bold text-de-muted">
            Payment screenshot is verified by Admin within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
