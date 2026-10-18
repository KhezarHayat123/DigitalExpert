import Link from "next/link";
import Image from "next/image";
import { getCourses, getServices, getProjects, getTestimonials, getFaqs } from "@/lib/db";
import HomeHeroVisual from "@/components/heroes/HomeHeroVisual";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import MagneticButton from "@/components/MagneticButton";
import Card3DTilt from "@/components/Card3DTilt";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  Laptop,
  Search,
  Share2,
  Target,
  Video,
  Youtube,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  Globe2,
  Star,
  ChevronRight,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

export const revalidate = 60; // On-demand ISR

const SERVICE_ICONS: Record<string, any> = {
  wordpress: Laptop,
  seo: Search,
  "social-media": Share2,
  "google-tiktok-ads": Target,
  "video-ads": Video,
  "youtube-automation": Youtube,
};

export default async function HomePage() {
  const courses = getCourses(true);
  const services = getServices(true);
  const projects = getProjects().slice(0, 4);
  const testimonials = getTestimonials();
  const faqs = getFaqs().slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#6A9A00]/15 via-[#6A9A00]/5 to-white border-b border-de-border">
        {/* Moving grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#6A9A00_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Green Label with animated indicator */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-de-green/10 border border-de-green/30 text-de-green text-xs font-heading font-extrabold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-de-green animate-pulse" />
                Premier Agency & Academy &bull; University Chowk, Bahawalpur
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-de-black tracking-tight leading-[1.12]">
                Grow Your Brand. <span className="text-de-amber">Master Digital Skills.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-de-muted max-w-xl leading-relaxed">
                Transform your business with high-ROI web development, SEO, and paid performance advertising. Or join our practical masterclasses at University Chowk, Bahawalpur to launch a high-income digital career.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton href="/services" variant="black">
                  Explore Services
                </MagneticButton>
                <MagneticButton href="/courses" variant="amber">
                  Browse Courses
                </MagneticButton>
              </div>

              {/* Micro Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-bold text-de-muted border-t border-de-border/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-de-green" />
                  <span>300+ UAE & Global Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-de-amber" />
                  <span>5+ Years Industry Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-de-green" />
                  <span>Practical Hands-on Training</span>
                </div>
              </div>
            </div>

            {/* Right: Live Self-animating Visual */}
            <div className="lg:col-span-5">
              <HomeHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE */}
      <Marquee bg="bg-de-black" text="text-white" />

      {/* 3. STATS COUNTERS */}
      <section className="py-14 bg-de-warm border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard-sm text-center">
              <p className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-de-black">
                <AnimatedCounter value={300} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm font-extrabold uppercase text-de-green mt-1 tracking-wider">
                Clients in the UAE
              </p>
              <p className="text-xs text-de-muted mt-1 font-semibold">Real Estate, Clinics & Retail</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard-sm text-center">
              <p className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-de-black">
                <AnimatedCounter value={5} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm font-extrabold uppercase text-de-amber mt-1 tracking-wider">
                Years Experience
              </p>
              <p className="text-xs text-de-muted mt-1 font-semibold">Led by Khezar Hayat</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard-sm text-center">
              <p className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-de-black">
                <AnimatedCounter value={4} />
              </p>
              <p className="text-xs sm:text-sm font-extrabold uppercase text-de-green mt-1 tracking-wider">
                Countries Served
              </p>
              <p className="text-xs text-de-muted mt-1 font-semibold">UAE, Saudi Arabia, UK, PK</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard-sm text-center">
              <p className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-de-black">
                <AnimatedCounter value={6} />
              </p>
              <p className="text-xs sm:text-sm font-extrabold uppercase text-de-amber mt-1 tracking-wider">
                Courses & Services
              </p>
              <p className="text-xs text-de-muted mt-1 font-semibold">Specialized & In-Demand</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (Cards do NOT show prices) */}
      <section className="py-20 lg:py-28 bg-white border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Agency Solutions"
            title="Full-Stack Marketing Services for"
            highlight="Real Growth"
            description="We build digital infrastructure that drives revenue. Transparent reporting, no fluff, and proven results across international markets."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComp = SERVICE_ICONS[service.slug] || Laptop;
              return (
                <Card3DTilt key={service.id} className="flex flex-col h-full">
                  {/* Generated 16:10 Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-de-warm border-b-2 border-de-black">
                    <Image
                      src={service.image}
                      alt={`${service.name} illustration`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Floating Round Icon Badge */}
                    <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-white border-2 border-de-black shadow-hard-sm flex items-center justify-center text-de-green group-hover:rotate-12 transition-transform duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div>
                      <h3 className="font-heading font-extrabold text-xl text-de-black group-hover:text-de-green transition-colors">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-de-muted leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-de-border">
                      <MagneticButton
                        href={`/services/${service.slug}`}
                        variant="black"
                        className="w-full text-center"
                      >
                        View Details
                      </MagneticButton>
                    </div>
                  </div>
                </Card3DTilt>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <MagneticButton href="/services" variant="amber">
              View All 6 Services
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 5. COURSES SECTION (Shows Exact Fees) */}
      <section className="py-20 lg:py-28 bg-de-warm border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Training Institute"
            title="Master High-Income Skills with"
            highlight="Live Classes"
            description="Taught directly by Khezar Hayat at our University Chowk, Bahawalpur campus. Practical real-world projects, live batch sessions, and completion certificates."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card3DTilt key={course.id} className="flex flex-col h-full bg-white">
                {/* Generated 16:10 Image with Level Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-de-warm border-b-2 border-de-black">
                  <Image
                    src={course.image}
                    alt={`${course.title} illustration`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-de-black text-white text-[11px] font-heading font-extrabold px-3 py-1 rounded-full border border-white/20">
                    {course.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading font-extrabold text-xl text-de-black group-hover:text-de-green transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-de-muted leading-relaxed line-clamp-2">
                      {course.shortDescription}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-bold text-de-muted pt-2">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-de-green" />
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  {/* Fee & Action */}
                  <div className="pt-4 border-t border-de-border flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-de-muted">Course Fee</p>
                      <p className="font-heading font-extrabold text-xl text-de-black">
                        {course.fee.toLocaleString()}{" "}
                        <span className="text-xs font-bold text-de-green">PKR</span>
                      </p>
                    </div>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="px-4 py-2.5 rounded-btn font-heading font-extrabold text-xs bg-de-black text-white hover:bg-de-green hover:text-white transition-all duration-200 border-2 border-de-black shadow-hard-sm hover:shadow-hard inline-flex items-center gap-1.5 group"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>

          <div className="mt-12 text-center">
            <MagneticButton href="/courses" variant="black">
              Browse All Courses & Syllabi
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE DIGITALEXPERT */}
      <section className="py-20 lg:py-28 bg-white border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="The DigitalExpert Advantage"
            title="Why Leaders & Students"
            highlight="Trust Us"
            description="We bridge the gap between academic theory and real-world high-ticket commercial execution."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "100% Practical Focus",
                desc: "No boring slides. You work on live websites, real ad spend budgets, and actual client accounts.",
                color: "bg-de-green",
              },
              {
                icon: ShieldCheck,
                title: "300+ Proven Track Record",
                desc: "Real results delivered for corporate clients in Dubai, Riyadh, London, and nationwide.",
                color: "bg-de-amber",
              },
              {
                icon: Zap,
                title: "Direct Founder Mentorship",
                desc: "Learn directly from Khezar Hayat with 5+ years of daily high-stakes digital marketing practice.",
                color: "bg-de-black",
              },
              {
                icon: Globe2,
                title: "Modern Tech Lab & Campus",
                desc: "Equipped with dedicated workstation labs, high-speed fiber internet, and direct practitioner support.",
                color: "bg-de-green",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-de-warm border-2 border-de-black shadow-hard-sm hover:shadow-hard hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-xl border-2 border-de-black flex items-center justify-center text-white mb-4 shadow-hard-sm bg-de-black">
                    <Icon className="w-6 h-6 text-de-amber" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-de-black">{feature.title}</h3>
                    <p className="mt-2 text-sm text-de-muted leading-relaxed font-semibold">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. HOW WE WORK (4 Animated Process Steps) */}
      <section className="py-20 lg:py-28 bg-de-warm border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Proven Methodology"
            title="How We Deliver"
            highlight="Results"
            description="A systematic four-phase framework engineered to minimize risk and accelerate your digital growth."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                step: "01",
                title: "Discover & Audit",
                desc: "We analyze your audience, competitor weaknesses, and existing metrics to identify the highest-leverage growth opportunities.",
              },
              {
                step: "02",
                title: "Plan & Wireframe",
                desc: "We build a strategic action plan, define creative hooks, map keywords, and design conversion-first user funnels.",
              },
              {
                step: "03",
                title: "Execute & Launch",
                desc: "Our specialists develop the website, launch paid campaigns, optimize on-page signals, and push campaigns live.",
              },
              {
                step: "04",
                title: "Scale & Report",
                desc: "We continuously A/B test creatives, cut wasteful ad spend, scale winning funnels, and provide transparent weekly reporting.",
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="relative bg-white p-6 rounded-2xl border-2 border-de-black shadow-hard-sm flex flex-col justify-between group hover:shadow-hard transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-extrabold text-3xl text-de-green group-hover:text-de-amber transition-colors">
                      {s.step}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-de-black" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-de-black">{s.title}</h3>
                  <p className="mt-2 text-sm text-de-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COMPLETED PROJECTS PREVIEW */}
      <section className="py-20 lg:py-28 bg-white border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Real Case Studies"
            title="Featured"
            highlight="Completed Projects"
            description="Explore our recent client implementations across eCommerce, real estate, healthcare, and corporate web engineering."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <Card3DTilt key={proj.id} className="flex flex-col bg-white">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-de-warm border-b-2 border-de-black">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-de-black text-white text-xs font-heading font-extrabold px-3 py-1 rounded-full border border-white/20">
                    {proj.category}
                  </div>
                  {proj.isSample && (
                    <div className="absolute top-3 right-3 bg-de-amber text-de-black text-[10px] font-heading font-extrabold px-2.5 py-0.5 rounded-full border border-de-black">
                      Sample Project
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-xs font-bold text-de-green uppercase tracking-wide">{proj.clientType}</p>
                  <h3 className="font-heading font-extrabold text-xl text-de-black group-hover:text-de-green transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-de-muted leading-relaxed">{proj.resultText}</p>
                </div>
              </Card3DTilt>
            ))}
          </div>

          <div className="mt-12 text-center">
            <MagneticButton href="/projects" variant="amber">
              View All Completed Projects
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 9. COUNTRIES WE WORK WITH */}
      <section className="py-16 bg-de-black text-white border-b border-de-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="font-heading font-extrabold text-xs uppercase tracking-widest text-de-amber">
            Global Footprint & Clients
          </p>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Trusted by Companies Across <span className="text-de-amber">4 Global Markets</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto pt-4">
            {[
              { country: "United Arab Emirates", desc: "300+ Projects in Dubai & Abu Dhabi", flag: "🇦🇪" },
              { country: "Saudi Arabia", desc: "Clinics, Trading & Riyadh Enterprises", flag: "🇸🇦" },
              { country: "United Kingdom", desc: "Local Services & E-Commerce Brands", flag: "🇬🇧" },
              { country: "Pakistan", desc: "National Leaders & Institute Students", flag: "🇵🇰" },
            ].map((c, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-de-green transition-colors text-center"
              >
                <div className="text-3xl mb-2">{c.flag}</div>
                <h3 className="font-heading font-extrabold text-base text-white">{c.country}</h3>
                <p className="text-xs text-white/70 mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-20 lg:py-28 bg-white border-b border-de-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Client Feedback"
            title="What Clients & Founders"
            highlight="Say About Us"
            description="Real feedback from corporate partners and training graduates."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-de-warm p-6 rounded-2xl border-2 border-de-black shadow-hard-sm hover:shadow-hard flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-de-amber">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-de-amber" />
                    ))}
                  </div>
                  <p className="text-sm text-de-body leading-relaxed font-semibold italic">
                    &ldquo;{test.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-de-border flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-de-black">{test.name}</h4>
                    <p className="text-xs text-de-muted font-bold">{test.role}</p>
                    <p className="text-[11px] text-de-green font-extrabold">{test.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="py-20 lg:py-28 bg-de-warm border-b border-de-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Frequently Asked Questions"
            title="Everything You Need to"
            highlight="Know"
            description="Clear answers about our campus admissions, client agency deliverables, and pricing."
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group bg-white rounded-xl border-2 border-de-black p-5 shadow-hard-sm open:shadow-hard transition-all cursor-pointer"
              >
                <summary className="flex items-center justify-between font-heading font-extrabold text-base text-de-black list-none">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-de-green shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-200 group-open:rotate-90 text-de-muted" />
                </summary>
                <div className="mt-4 pt-3 border-t border-de-border text-sm text-de-muted leading-relaxed font-semibold pl-8">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/faq" className="text-sm font-extrabold text-de-green hover:underline">
              View All Questions & Answers &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FINAL CALL TO ACTION */}
      <section className="py-20 bg-de-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#FFAA1D_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-de-amber text-xs font-heading font-extrabold uppercase tracking-widest border border-white/20">
            Let&apos;s Build Together
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Ready to Accelerate Your Brand or <span className="text-de-amber">Master Digital Skills?</span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Visit our office at University Chowk, Bahawalpur or message us directly on WhatsApp for an immediate consultation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MagneticButton
              href="https://wa.me/923124051296"
              variant="whatsapp"
              target="_blank"
            >
              <MessageCircle className="w-5 h-5 mr-1" />
              Chat on WhatsApp (03124051296)
            </MagneticButton>
            <MagneticButton href="/contact" variant="amber">
              Request a Free Quote
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
