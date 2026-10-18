"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Globe, ArrowUpRight, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on /admin and /lms (LMS has its own dedicated shell)
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/lms")) {
    return null;
  }

  return (
    <footer className="bg-de-warm border-t-2 border-de-black relative overflow-hidden">
      {/* Decorative top green accent strip */}
      <div className="h-2 bg-gradient-to-r from-de-green via-de-amber to-de-green w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand Info & Location */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block relative h-12 w-48 mb-2">
              <Image
                src="/brand/digital-expert-logo.png"
                alt="DigitalExpert Logo"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-sm text-de-muted leading-relaxed">
              Bahawalpur&apos;s premier Digital Marketing Agency and Training Institute. We build high-converting websites, run scalable ad campaigns, and mentor the next generation of digital marketing professionals.
            </p>

            {/* Location Card */}
            <div className="p-4 bg-white rounded-xl border border-de-border shadow-sm flex items-start gap-3 mt-2">
              <div className="p-2 bg-de-warm rounded-lg text-de-green shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-de-muted">Campus & Agency Office</p>
                <p className="text-sm font-extrabold text-de-body">University Chowk, Bahawalpur</p>
              </div>
            </div>

            {/* Countries Served Badges */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase text-de-muted mb-2 tracking-wide">Serving Businesses In:</p>
              <div className="flex flex-wrap gap-1.5">
                {["UAE", "Saudi Arabia", "United Kingdom", "Pakistan"].map((country) => (
                  <span
                    key={country}
                    className="text-xs font-bold px-2.5 py-1 bg-white border border-de-border rounded-md text-de-body"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h3 className="font-heading font-extrabold text-base text-de-black uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-de-green"></span>
              Company
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold text-de-muted">
              <li>
                <Link href="/" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>Home</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>Services</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>Courses</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>About Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>Completed Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Student Policies */}
          <div>
            <h3 className="font-heading font-extrabold text-base text-de-black uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-de-amber"></span>
              Policies & Terms
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold text-de-muted">
              <li>
                <Link href="/legal/privacy" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>Privacy Policy</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>Terms of Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
              <li>
                <Link href="/legal/refund" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>Refund Policy</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
              <li>
                <Link href="/legal/fee-payment" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>Fee Payment Policy</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
              <li>
                <Link href="/legal/code-of-conduct" className="hover:text-de-green transition-colors flex items-center justify-between group">
                  <span>Student Code of Conduct</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-de-green" />
                </Link>
              </li>
            </ul>

            {/* Payment Methods Badges */}
            <div className="pt-4 mt-4 border-t border-de-border/60">
              <p className="text-[11px] font-extrabold uppercase text-de-muted tracking-wide mb-2">Accepted Payment Channels:</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded bg-white border border-de-border text-[11px] font-extrabold text-de-black">
                  JazzCash
                </span>
                <span className="px-2.5 py-1 rounded bg-white border border-de-border text-[11px] font-extrabold text-de-black">
                  EasyPaisa
                </span>
                <span className="px-2.5 py-1 rounded bg-white border border-de-border text-[11px] font-extrabold text-de-black">
                  Faysal Bank
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Connect With Us */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-heading font-extrabold text-base text-de-black uppercase tracking-wider mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
              Direct Support
            </h3>

            {/* WhatsApp Highlight Card */}
            <a
              href="https://wa.me/923124051296"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-[#25D366] text-white rounded-2xl border-2 border-de-black shadow-hard-sm transition-all duration-200 hover:bg-de-black hover:shadow-hard flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-90">WhatsApp Support Desk</p>
                <p className="text-base font-heading font-extrabold">0312 4051296</p>
              </div>
              <div className="p-2 bg-white/20 rounded-xl group-hover:bg-[#25D366] transition-colors">
                <Phone className="w-5 h-5 text-white" />
              </div>
            </a>

            {/* Campus Working Hours */}
            <div className="p-3 bg-white rounded-xl border border-de-border text-xs font-bold text-de-body space-y-1">
              <p className="font-extrabold text-de-black">⏰ Campus Lab Hours:</p>
              <p className="text-de-muted font-semibold">Monday – Saturday: 9:00 AM – 9:00 PM PKT</p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-1.5 pt-1 text-xs font-semibold text-de-body">
              <a
                href="mailto:info@digitalexpert.pk"
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white transition-colors"
              >
                <Mail className="w-4 h-4 text-de-green shrink-0" />
                <span className="truncate">info@digitalexpert.pk</span>
              </a>
              <a
                href="https://digitalexpert.pk"
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white transition-colors"
              >
                <Globe className="w-4 h-4 text-de-amber shrink-0" />
                <span>https://digitalexpert.pk</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase text-de-muted mb-2 tracking-wide">Official Channels:</p>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com/digitalexpertpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-de-border flex items-center justify-center text-de-body hover:bg-de-black hover:text-white hover:border-de-black transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/digitalexpertpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-de-border flex items-center justify-center text-de-body hover:bg-de-black hover:text-white hover:border-de-black transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/digitalexpertpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-de-border flex items-center justify-center text-de-body hover:bg-de-black hover:text-white hover:border-de-black transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@digitalexpertpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-de-border flex items-center justify-center text-de-body hover:bg-de-black hover:text-white hover:border-de-black transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Black Bottom Bar */}
      <div className="bg-de-black text-white py-5 border-t-2 border-de-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 gap-3 text-center sm:text-left">
          <p>&copy; 2026 DigitalExpert. All rights reserved.</p>
          <p className="font-semibold text-white/95">
            Digital Marketing Agency & Skills Training Academy &bull; University Chowk, Bahawalpur
          </p>
        </div>
      </div>
    </footer>
  );
}
