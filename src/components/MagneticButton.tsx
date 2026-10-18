"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "black" | "amber" | "whatsapp" | "outline";
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "black",
  className = "",
  showArrow = true,
  type = "button",
  disabled = false,
  target,
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  let variantStyles = "";
  if (variant === "black") {
    // Black button turning green on hover
    variantStyles = "bg-de-black text-white hover:bg-de-green hover:text-white border-2 border-de-black shadow-hard-sm hover:shadow-hard";
  } else if (variant === "amber") {
    // Amber button turning black with amber text
    variantStyles = "bg-de-amber text-de-black hover:bg-de-black hover:text-de-amber border-2 border-de-black shadow-hard-sm hover:shadow-hard";
  } else if (variant === "whatsapp") {
    // WhatsApp button turning black
    variantStyles = "bg-[#25D366] text-white hover:bg-de-black hover:text-[#25D366] border-2 border-de-black shadow-hard-sm hover:shadow-hard";
  } else if (variant === "outline") {
    variantStyles = "bg-white text-de-black hover:bg-de-warm border-2 border-de-black shadow-hard-sm hover:shadow-hard";
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="inline-block"
    >
      <div
        className={`group relative inline-flex items-center justify-center font-heading font-extrabold text-sm px-6 py-3.5 rounded-btn transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 select-none ${variantStyles} ${className} ${
          disabled ? "opacity-60 cursor-not-allowed hover:translate-y-0" : "cursor-pointer"
        }`}
      >
        <span className="flex items-center gap-2">{children}</span>
        {showArrow && (
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} target={target} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block bg-transparent border-0 p-0">
      {content}
    </button>
  );
}
