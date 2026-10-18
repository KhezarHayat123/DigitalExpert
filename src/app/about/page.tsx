import Image from "next/image";
import Link from "next/link";
import { getTeam } from "@/lib/db";
import AboutHeroVisual from "@/components/heroes/AboutHeroVisual";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import Card3DTilt from "@/components/Card3DTilt";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  Award,
  Globe2,
  Users,
  Target,
  CheckCircle2,
  Heart,
  TrendingUp,
  Briefcase,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "About DigitalExpert | Founder Khezar Hayat & Team in Bahawalpur",
  description: "Learn about DigitalExpert, founded by Khezar Hayat. Over 5 years of digital marketing expertise serving 300+ clients in the UAE, Saudi Arabia, UK and Pakistan.",
};

export default function AboutPage() {
  const team = getTeam();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#6A9A00]/15 via-[#6A9A00]/5 to-white border-b border-de-border">
        <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-de-green/10 border border-de-green text-de-green text-xs font-heading font-extrabold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-de-green animate-pulse" />
                Agency Story & Leadership
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-de-black tracking-tight leading-[1.15]">
                Empowering Brands Globally. <span className="text-de-amber">Training Future Leaders.</span>
              </h1>

              <p className="text-base sm:text-lg text-de-muted max-w-xl leading-relaxed font-semibold">
                DigitalExpert is a premier digital marketing agency and skills training institute. Over 5 years of international performance marketing experience channeled into real-world business results and hands-on education.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton href="#founder-story" variant="black">
                  Read Founder Story
                </MagneticButton>
                <MagneticButton href="#team" variant="amber">
                  Meet Our Leadership
                </MagneticButton>
              </div>
            </div>

            {/* Right: Animated Founder Visual */}
            <div className="lg:col-span-5">
              <AboutHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE */}
      <Marquee bg="bg-de-black" text="text-white" />

      {/* 3. FOUNDER SECTION */}
      <section id="founder-story" className="py-20 lg:py-28 bg-white border-b border-de-border scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Large Framed Photo with "5+ YEARS EXP." Tag */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <div className="relative aspect-[4/5] w-full rounded-2xl border-3 border-de-black overflow-hidden shadow-hard bg-[#0B1528]">
                  <Image
                    src="/brand/khezar-hayat.png"
                    alt="Khezar Hayat - Founder of DigitalExpert"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 bg-de-amber text-de-black px-4 py-1.5 rounded-full border-2 border-de-black shadow-hard-sm font-heading font-extrabold text-xs uppercase tracking-wider">
                    5+ YEARS EXP.
                  </div>
                  {/* Bottom Name Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border-2 border-de-black shadow-hard-sm">
                    <p className="font-heading font-extrabold text-lg text-de-black">Khezar Hayat</p>
                    <p className="text-xs font-bold text-de-green uppercase tracking-wide">
                      Founder & Lead Strategist, DigitalExpert
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="h-1 w-7 bg-de-green rounded-full inline-block" />
                <span className="font-heading font-extrabold text-xs tracking-widest uppercase text-de-green">
                  Founder&apos;s Message
                </span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-de-black tracking-tight leading-tight">
                &ldquo;Building Lasting Brands Through Relentless Focus on Quality & Measurable ROI.&rdquo;
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-de-body font-medium leading-relaxed">
                <p>
                  My name is <strong>Khezar Hayat</strong> and I have 5 years of hands-on experience in digital marketing, web development, and performance advertising. I have been running my own agency, <strong>DigitalExpert</strong>, for the last 3 years, Alhamdulillah.
                </p>
                <p>
                  Over these years, we have worked with <strong>300+ clients in the United Arab Emirates (UAE)</strong>, helping businesses in real estate, clinics, retail, and corporate sectors scale their revenue. We have also had the privilege of partnering with companies and business owners across <strong>Saudi Arabia, the United Kingdom, and India</strong>.
                </p>
                <p>
                  My mission with DigitalExpert in Bahawalpur is two-fold: to provide global-grade digital services to businesses worldwide, and to empower the ambitious youth of Pakistan with practical, high-income digital marketing skills that unlock life-changing freelance and remote career opportunities.
                </p>
              </div>

              {/* Founder Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-de-border">
                <div className="p-4 bg-de-warm rounded-xl border-2 border-de-black text-center">
                  <p className="font-heading font-extrabold text-2xl text-de-green">300+</p>
                  <p className="text-xs font-bold text-de-muted uppercase mt-0.5">UAE Clients</p>
                </div>
                <div className="p-4 bg-de-warm rounded-xl border-2 border-de-black text-center">
                  <p className="font-heading font-extrabold text-2xl text-de-amber">3+ Years</p>
                  <p className="text-xs font-bold text-de-muted uppercase mt-0.5">Agency Run</p>
                </div>
                <div className="p-4 bg-de-warm rounded-xl border-2 border-de-black text-center">
                  <p className="font-heading font-extrabold text-2xl text-de-black">4</p>
                  <p className="text-xs font-bold text-de-muted uppercase mt-0.5">Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="py-20 lg:py-24 bg-de-warm border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Core Philosophy"
            title="Our Guiding Mission &"
            highlight="Long-Term Vision"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border-2 border-de-black shadow-hard-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-de-green text-white flex items-center justify-center border-2 border-de-black shadow-hard-sm">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-de-black">Our Mission</h3>
              <p className="text-base text-de-muted leading-relaxed font-semibold">
                To eliminate guesswork from digital marketing by engineering transparent, data-driven web and advertising systems that consistently generate tangible revenue for our clients, while fostering practical digital literacy in Southern Punjab.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border-2 border-de-black shadow-hard-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-de-amber text-de-black flex items-center justify-center border-2 border-de-black shadow-hard-sm">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-de-black">Our Vision</h3>
              <p className="text-base text-de-muted leading-relaxed font-semibold">
                To become Pakistan&apos;s most respected digital growth agency and skills institute, recognized internationally for excellence, unmatched integrity, and for creating 1,000+ financially independent freelance professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. JOURNEY TIMELINE */}
      <section className="py-20 lg:py-28 bg-white border-b border-de-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Milestones"
            title="The Journey of"
            highlight="DigitalExpert"
            description="How 5 years of continuous dedication shaped an internationally trusted brand."
          />

          <div className="space-y-6">
            {[
              {
                year: "2021",
                title: "The Freelance Foundation",
                desc: "Khezar Hayat begins providing performance marketing, SEO, and web development to international clients on freelance platforms, earning top-rated status.",
              },
              {
                year: "2023",
                title: "DigitalExpert Agency Founded",
                desc: "Formal agency incorporation. DigitalExpert crosses 100+ projects across Dubai and Abu Dhabi, specializing in real estate and service websites.",
              },
              {
                year: "2024",
                title: "Expansion to Saudi Arabia & UK",
                desc: "Client portfolio reaches 300+ businesses across UAE, KSA, and London. Team expands into dedicated creative video ads and SEO departments.",
              },
              {
                year: "2025 - 2026",
                title: "University Chowk, Bahawalpur Institute Launch",
                desc: "Physical institute established at University Chowk, Bahawalpur. Launch of 6 practical certification courses with direct student mentorship.",
              },
            ].map((milestone, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-de-warm border-2 border-de-black shadow-hard-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-de-green bg-white px-4 py-2 rounded-xl border-2 border-de-black shadow-hard-sm">
                    {milestone.year}
                  </span>
                  <div>
                    <h4 className="font-heading font-extrabold text-lg text-de-black">{milestone.title}</h4>
                    <p className="text-sm text-de-muted font-semibold mt-1">{milestone.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TEAM SECTION (MOVED HERE FROM CONTACT US) */}
      <section id="team" className="py-20 lg:py-28 bg-de-warm border-b border-de-border scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Leadership Team"
            title="Meet the Minds Behind"
            highlight="DigitalExpert"
            description="Dedicated leadership driving agency execution and student success every single day."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {team.map((member) => (
              <Card3DTilt key={member.id} className="flex flex-col bg-white">
                {/* Photo with Badge */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0B1528] border-b-2 border-de-black">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {member.experienceBadge && (
                    <div className="absolute top-4 left-4 bg-de-amber text-de-black font-heading font-extrabold text-xs px-3.5 py-1 rounded-full border-2 border-de-black shadow-hard-sm">
                      {member.experienceBadge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-de-black">{member.name}</h3>
                    <p className="text-sm font-extrabold text-de-green uppercase tracking-wide mt-0.5">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-sm text-de-muted font-medium leading-relaxed">
                    {member.description}
                  </p>

                  {/* Social links (shown ONLY if links exist) */}
                  {member.socialLinks && Object.values(member.socialLinks).some((l) => Boolean(l)) && (
                    <div className="pt-3 border-t border-de-border flex items-center gap-2">
                      {member.socialLinks.linkedin && (
                        <a
                          href={member.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-de-warm border border-de-border flex items-center justify-center text-de-black hover:bg-de-black hover:text-white transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.socialLinks.facebook && (
                        <a
                          href={member.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-de-warm border border-de-border flex items-center justify-center text-de-black hover:bg-de-black hover:text-white transition-colors"
                          aria-label="Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}
                      {member.socialLinks.instagram && (
                        <a
                          href={member.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-de-warm border border-de-border flex items-center justify-center text-de-black hover:bg-de-black hover:text-white transition-colors"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {member.socialLinks.youtube && (
                        <a
                          href={member.socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-de-warm border border-de-border flex items-center justify-center text-de-black hover:bg-de-black hover:text-white transition-colors"
                          aria-label="YouTube"
                        >
                          <Youtube className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-20 bg-de-black text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Let&apos;s Start <span className="text-de-amber">Working Together</span>
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Whether you need agency services for your business or practical training for your career, we are here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <MagneticButton href="/contact" variant="amber">
              Contact Us Today
            </MagneticButton>
            <MagneticButton href="https://wa.me/923124051296" variant="whatsapp" target="_blank">
              Chat on WhatsApp: 03124051296
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
