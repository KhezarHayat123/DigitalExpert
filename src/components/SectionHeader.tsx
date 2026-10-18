"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  align = "center",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`mb-12 sm:mb-16 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}`}>
      {/* Self-drawing green section line and label */}
      <div className={`inline-flex items-center gap-2 mb-3.5 ${isCenter ? "justify-center" : "justify-start"}`}>
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 28 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-1 bg-de-green rounded-full inline-block"
        />
        <span className="font-heading font-extrabold text-xs tracking-widest uppercase text-de-green">
          {badge}
        </span>
        {isCenter && (
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 28 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-1 bg-de-green rounded-full inline-block"
          />
        )}
      </div>

      {/* Main Heading with Sora font and Amber Highlight */}
      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-de-black tracking-tight leading-tight">
        {title}{" "}
        {highlight && (
          <span className="text-de-amber">{highlight}</span>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-de-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
