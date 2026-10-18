"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck } from "lucide-react";

interface ChatMessage {
  id: number;
  text: string;
  sender: "client" | "expert";
  time: string;
}

const ALL_MESSAGES: ChatMessage[] = [
  { id: 1, text: "Hi, I need a website for my business.", sender: "client", time: "10:14 AM" },
  { id: 2, text: "Welcome! Tell us a little about it.", sender: "expert", time: "10:14 AM" },
  { id: 3, text: "A 4 page website. What is the price?", sender: "client", time: "10:15 AM" },
  { id: 4, text: "Our Basic Package is Rs 30,000. Shall we start?", sender: "expert", time: "10:15 AM" },
];

export default function ContactHeroVisual() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (visibleCount < ALL_MESSAGES.length) {
      setIsTyping(true);
      timeout = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount((prev) => prev + 1);
      }, 1800);
    } else {
      // Finished all messages, pause on typing dots and loop
      setIsTyping(true);
      timeout = setTimeout(() => {
        setVisibleCount(1);
        setIsTyping(false);
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [visibleCount]);

  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      {/* Moving Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#25D366_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

      {/* WhatsApp Chat Phone Frame */}
      <div className="relative z-10 bg-[#EFEAE2] rounded-3xl border-3 border-de-black overflow-hidden shadow-hard flex flex-col">
        {/* WhatsApp Top Bar */}
        <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between border-b border-black/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-white p-1 border-2 border-white/80 overflow-hidden">
              <Image
                src="/brand/digital-expert-logo.png"
                alt="DigitalExpert"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-extrabold text-sm leading-tight">DigitalExpert Official</p>
              <p className="text-[11px] text-[#25D366] font-bold">Online &bull; 03124051296</p>
            </div>
          </div>
          <span className="text-[11px] bg-black/20 px-2.5 py-1 rounded-full font-bold">University Chowk, Bahawalpur</span>
        </div>

        {/* Chat Body */}
        <div className="p-4 space-y-3 min-h-[310px] flex flex-col justify-end">
          <AnimatePresence>
            {ALL_MESSAGES.slice(0, visibleCount).map((msg) => {
              const isClient = msg.sender === "client";
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${isClient ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-sm text-xs sm:text-sm font-semibold border ${
                      isClient
                        ? "bg-white text-de-body border-de-border rounded-tl-none"
                        : "bg-[#DCF8C6] text-de-black border-[#b2e297] rounded-tr-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-de-muted">
                      <span>{msg.time}</span>
                      {!isClient && <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <div className="bg-[#DCF8C6] border border-[#b2e297] rounded-2xl rounded-tr-none px-3.5 py-2 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-de-green animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-de-green animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-de-green animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
