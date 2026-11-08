"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  primaryPhone?: string;
  primaryName?: string;
  secondaryPhone?: string;
  secondaryName?: string;
}

export default function FloatingWhatsApp({
  primaryPhone = "03124051296",
  primaryName = "Khezar Hayat",
  secondaryPhone = "03276159167",
  secondaryName = "Umar Farooq",
}: FloatingWhatsAppProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  const cleanNum1 = (primaryPhone || "03124051296").replace(/[^0-9]/g, "");
  const num1 = cleanNum1.startsWith("92") ? cleanNum1 : cleanNum1.startsWith("0") ? "92" + cleanNum1.slice(1) : "92" + cleanNum1;

  const cleanNum2 = (secondaryPhone || "03276159167").replace(/[^0-9]/g, "");
  const num2 = cleanNum2.startsWith("92") ? cleanNum2 : cleanNum2.startsWith("0") ? "92" + cleanNum2.slice(1) : "92" + cleanNum2;

  return (
    <aside aria-label="WhatsApp Contacts" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* 1. Khezar Hayat WhatsApp Button */}
      <div className="flex items-center group pointer-events-auto">
        <div className="mr-3 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 pointer-events-none">
          <div className="bg-de-black text-white text-xs font-bold py-1.5 px-3 rounded-md shadow-hard-sm border border-de-border flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            WhatsApp: {primaryName} ({primaryPhone})
          </div>
        </div>

        <a
          href={"https://wa.me/" + num1}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={"Chat with " + primaryName + " on WhatsApp"}
          className="relative flex items-center justify-center w-13 h-13 p-3.5 bg-[#25D366] text-white rounded-full border-2 border-de-black shadow-hard hover:bg-de-black hover:text-[#25D366] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
          <MessageCircle className="w-6 h-6 relative z-10 fill-current" />
          <span className="absolute -bottom-1 -right-1 bg-de-black text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-white leading-none">
            KH
          </span>
        </a>
      </div>

      {/* 2. Umar Farooq WhatsApp Button */}
      <div className="flex items-center group pointer-events-auto">
        <div className="mr-3 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 pointer-events-none">
          <div className="bg-de-black text-white text-xs font-bold py-1.5 px-3 rounded-md shadow-hard-sm border border-de-border flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-de-amber animate-pulse" />
            WhatsApp: {secondaryName} ({secondaryPhone})
          </div>
        </div>

        <a
          href={"https://wa.me/" + num2}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={"Chat with " + secondaryName + " on WhatsApp"}
          className="relative flex items-center justify-center w-13 h-13 p-3.5 bg-[#128C7E] text-white rounded-full border-2 border-de-black shadow-hard hover:bg-de-black hover:text-de-amber hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <MessageCircle className="w-6 h-6 relative z-10 fill-current" />
          <span className="absolute -bottom-1 -right-1 bg-de-black text-de-amber text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-white leading-none">
            UF
          </span>
        </a>
      </div>
    </aside>
  );
}
