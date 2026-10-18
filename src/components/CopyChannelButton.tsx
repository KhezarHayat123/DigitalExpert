"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyChannelButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 rounded-btn border text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
        copied
          ? "bg-de-green text-white border-de-black"
          : "bg-de-warm text-de-body border-de-border hover:bg-white hover:border-de-black"
      }`}
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-de-muted" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
