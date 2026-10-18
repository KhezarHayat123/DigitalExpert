"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Courses", href: "/courses" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Completed Projects", href: "/projects" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Don't render public header on /admin or /lms routes (they have dedicated shells)
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/lms")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border-b border-de-border"
          : "bg-white/80 backdrop-blur-sm py-5 border-b border-de-border/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-11 w-44 sm:h-12 sm:w-48 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/brand/digital-expert-logo.png"
                alt="DigitalExpert Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Center: Desktop Navigation with Sliding Pill */}
          <nav
            className="hidden lg:flex items-center bg-[#F7F5EF] p-1.5 rounded-full border border-de-border relative"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isHovered = hoveredIdx === idx;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className="relative px-4 py-2 text-sm font-heading font-extrabold transition-colors select-none nav-link inline-flex items-center justify-center"
                >
                  {/* Sliding Black Pill Highlight */}
                  {isHovered && (
                    <motion.div
                      layoutId="menu-pill"
                      className="absolute inset-0 bg-de-black rounded-full z-0 shadow-sm"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}

                  {/* Active Page Green Indicator */}
                  {isActive && !isHovered && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-de-green rounded-full z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Clean, High-Contrast Text (Amber on Hover, Green when Active, Dark by default) */}
                  <span
                    className={`relative z-10 whitespace-nowrap transition-colors duration-200 ${
                      isHovered
                        ? "text-de-amber font-extrabold"
                        : isActive
                        ? "text-de-green font-extrabold"
                        : "text-de-body font-bold hover:text-de-black"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Student Portal & Free Consultation */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/lms/login"
              className="inline-flex items-center justify-center px-4 py-2 rounded-btn font-heading font-bold text-xs bg-white text-de-black border-2 border-de-black shadow-hard-sm transition-all duration-200 hover:bg-de-green hover:text-white"
            >
              <span>Student LMS</span>
            </Link>

            <Link
              href="/contact"
              className="relative group inline-flex items-center justify-center px-4 py-2 rounded-btn font-heading font-extrabold text-xs bg-de-amber text-de-black border-2 border-de-black shadow-hard-sm transition-all duration-200 hover:bg-de-black hover:text-de-amber hover:-translate-y-0.5 hover:shadow-hard"
            >
              <span>Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="https://wa.me/923124051296"
              target="_blank"
              className="p-2 rounded-btn bg-[#25D366] text-white border-2 border-de-black"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-btn bg-white border-2 border-de-black text-de-black shadow-hard-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b-2 border-de-black px-4 pt-3 pb-6 mt-3 shadow-hard"
          >
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3 rounded-btn text-base font-bold transition-all ${
                      isActive
                        ? "bg-de-green text-white border-2 border-de-black"
                        : "text-de-body hover:bg-de-warm"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 pt-4 border-t border-de-border flex flex-col gap-2">
              <Link
                href="/lms/login"
                className="w-full text-center py-2.5 rounded-btn font-extrabold text-sm bg-white text-de-black border-2 border-de-black shadow-hard-sm hover:bg-de-green hover:text-white"
              >
                🎓 Student LMS Login
              </Link>
              <Link
                href="/contact"
                className="w-full text-center py-3 rounded-btn font-extrabold text-sm bg-de-amber text-de-black border-2 border-de-black shadow-hard-sm hover:bg-de-black hover:text-de-amber"
              >
                Free Consultation &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
