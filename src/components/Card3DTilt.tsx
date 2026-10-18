"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card3DTilt({ children, className = "", onClick }: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      data-tilt-card
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -6 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative group bg-white rounded-2xl border-2 border-de-black overflow-hidden shadow-hard-sm transition-shadow duration-300 hover:shadow-hard ${className}`}
    >
      {/* Animated Green Line Drawing across the top on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1.5 bg-de-green z-20 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      {children}
    </motion.div>
  );
}
