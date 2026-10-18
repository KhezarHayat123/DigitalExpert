"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <div className="mr-3 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 pointer-events-none">
        <div className="bg-de-black text-white text-xs font-bold py-1.5 px-3 rounded-md shadow-hard-sm border border-de-border flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          Chat on WhatsApp (03124051296)
        </div>
      </div>

      {/* Floating Button with Pulse Ring */}
      <a
        href="https://wa.me/923124051296"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full border-2 border-de-black shadow-hard hover:bg-de-black hover:text-[#25D366] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {/* Animated Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 relative z-10 fill-current" />
      </a>
    </div>
  );
}
