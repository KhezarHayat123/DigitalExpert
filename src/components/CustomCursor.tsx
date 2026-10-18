"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "hover" | "menu">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isMenu = !!target.closest("header nav") || !!target.closest(".nav-link");
      const isInteractive = !!target.closest("a, button, input, textarea, select, [data-tilt-card], .cursor-pointer");

      if (isMenu) {
        setCursorType("menu");
      } else if (isInteractive) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Central Small Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        animate={{
          x: mousePosition.x - (cursorType === "menu" ? 3 : 4),
          y: mousePosition.y - (cursorType === "menu" ? 3 : 4),
          width: cursorType === "menu" ? 6 : 8,
          height: cursorType === "menu" ? 6 : 8,
          backgroundColor: cursorType === "menu" ? "#FFFFFF" : "#0B0B09",
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 50 }}
      />

      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border"
        animate={{
          x: mousePosition.x - (cursorType === "hover" ? 22 : cursorType === "menu" ? 14 : 16),
          y: mousePosition.y - (cursorType === "hover" ? 22 : cursorType === "menu" ? 14 : 16),
          width: cursorType === "hover" ? 44 : cursorType === "menu" ? 28 : 32,
          height: cursorType === "hover" ? 44 : cursorType === "menu" ? 28 : 32,
          borderColor: cursorType === "hover" ? "#6A9A00" : cursorType === "menu" ? "#FFAA1D" : "#FFAA1D",
          backgroundColor:
            cursorType === "hover"
              ? "rgba(106, 154, 0, 0.15)"
              : cursorType === "menu"
              ? "rgba(255, 170, 29, 0.2)"
              : "transparent",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </div>
  );
}
