"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareCourseButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `DigitalExpert: ${title}`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard if share cancelled/unsupported
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`w-full py-2.5 rounded-btn border font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 ${
        copied
          ? "bg-de-green text-white border-de-black shadow-hard-sm"
          : "bg-de-warm border-de-border text-de-body hover:bg-white hover:border-de-black"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-white" />
          <span>Course Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" />
          <span>Share This Course</span>
        </>
      )}
    </button>
  );
}
